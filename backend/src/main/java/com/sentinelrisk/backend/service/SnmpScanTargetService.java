package com.sentinelrisk.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.sentinelrisk.backend.dto.SnmpScanTargetDto;
import com.sentinelrisk.backend.model.SnmpScanTarget;
import com.sentinelrisk.backend.repository.SnmpScanTargetRepository;
import com.sentinelrisk.client.ZabbixClient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Service pour la gestion des assets configurés pour les scans SNMP automatiques
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class SnmpScanTargetService {

    private final SnmpScanTargetRepository scanTargetRepository;
    private final ZabbixClient zabbixClient;

    /**
     * Récupère tous les assets disponibles (Zabbix + configurés)
     */
    @Transactional(readOnly = true)
    public List<SnmpScanTargetDto> getAllAvailableTargets() {
        log.debug("🔍 Récupération de tous les assets disponibles");
        
        try {
            // Récupérer les hôtes depuis Zabbix
            JsonNode zabbixResponse = zabbixClient.getHosts();
            JsonNode zabbixHosts = zabbixResponse.get("result");
            log.debug("📡 Récupéré {} hôtes depuis Zabbix", zabbixHosts != null ? zabbixHosts.size() : 0);
            
            // Récupérer les targets configurés
            List<SnmpScanTarget> configuredTargets = scanTargetRepository.findAll();
            Map<String, SnmpScanTarget> configuredMap = configuredTargets.stream()
                .collect(Collectors.toMap(SnmpScanTarget::getZabbixHostId, t -> t));
            
            List<SnmpScanTargetDto> result = new ArrayList<>();
            
            // Traiter chaque hôte Zabbix
            if (zabbixHosts != null && zabbixHosts.isArray()) {
                for (JsonNode host : zabbixHosts) {
                    String hostId = host.get("hostid").asText();
                    String hostname = host.get("host").asText();
                    String displayName = host.get("name").asText();
                    
                    // Extraire l'IP depuis les interfaces
                    String ipAddress = extractIpFromInterfaces(host);
                    
                    // Vérifier si c'est un hôte SNMP
                    if (isSnmpHost(host)) {
                        SnmpScanTarget configured = configuredMap.get(hostId);
                        
                        if (configured != null) {
                            // Asset déjà configuré
                            result.add(convertToDto(configured, true));
                        } else {
                            // Nouvel asset disponible
                            SnmpScanTargetDto dto = new SnmpScanTargetDto(
                                hostId, hostname, displayName, ipAddress, 
                                "Asset détecté depuis Zabbix"
                            );
                            dto.setIsOnline(true);
                            dto.setStatus("DISPONIBLE");
                            result.add(dto);
                        }
                    }
                }
            }
            
            log.info("✅ {} assets disponibles récupérés", result.size());
            return result.stream()
                .sorted(Comparator.comparing(SnmpScanTargetDto::getEffectiveDisplayName))
                .collect(Collectors.toList());
                
        } catch (Exception e) {
            log.error("❌ Erreur lors de la récupération des assets disponibles", e);
            // Retourner au moins les assets configurés en cas d'erreur Zabbix
            return scanTargetRepository.findAll().stream()
                .map(target -> convertToDto(target, false))
                .collect(Collectors.toList());
        }
    }

    /**
     * Récupère uniquement les assets activés pour les scans
     */
    @Transactional(readOnly = true)
    public List<SnmpScanTargetDto> getEnabledTargets() {
        log.debug("🔍 Récupération des assets activés pour les scans");
        
        List<SnmpScanTarget> enabledTargets = scanTargetRepository.findByEnabledTrueOrderByPriorityAscCreatedAtAsc();
        List<SnmpScanTargetDto> result = enabledTargets.stream()
            .map(target -> convertToDto(target, true))
            .collect(Collectors.toList());
            
        log.info("✅ {} assets activés récupérés", result.size());
        return result;
    }

    /**
     * Configure un asset pour les scans automatiques
     */
    @Transactional
    public SnmpScanTargetDto configureTarget(String zabbixHostId, boolean enabled, Integer priority, String configuredBy) {
        log.debug("⚙️ Configuration de l'asset {} - activé: {}, priorité: {}", zabbixHostId, enabled, priority);
        
        try {
            // Récupérer les informations depuis Zabbix
            JsonNode hostInfo = getHostInfoFromZabbix(zabbixHostId);
            if (hostInfo == null) {
                throw new IllegalArgumentException("Asset non trouvé dans Zabbix: " + zabbixHostId);
            }
            
            // Chercher ou créer l'asset configuré
            SnmpScanTarget target = scanTargetRepository.findByZabbixHostId(zabbixHostId)
                .orElse(createNewTarget(hostInfo));
            
            // Mettre à jour la configuration
            target.setEnabled(enabled);
            target.setPriority(priority != null ? priority : 3);
            target.setConfiguredBy(configuredBy);
            target.updateFromZabbix(
                hostInfo.get("name").asText(),
                extractIpFromInterfaces(hostInfo),
                "Asset configuré pour les scans automatiques"
            );
            
            SnmpScanTarget saved = scanTargetRepository.save(target);
            log.info("✅ Asset {} configuré avec succès", zabbixHostId);
            
            return convertToDto(saved, true);
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de la configuration de l'asset {}", zabbixHostId, e);
            throw new RuntimeException("Erreur lors de la configuration de l'asset", e);
        }
    }

    /**
     * Met à jour le statut d'activation d'un asset
     */
    @Transactional
    public boolean updateTargetStatus(String zabbixHostId, boolean enabled) {
        log.debug("🔄 Mise à jour du statut de l'asset {} - activé: {}", zabbixHostId, enabled);
        
        int updated = scanTargetRepository.updateEnabledStatus(zabbixHostId, enabled);
        boolean success = updated > 0;
        
        if (success) {
            log.info("✅ Statut de l'asset {} mis à jour", zabbixHostId);
        } else {
            log.warn("⚠️ Asset {} non trouvé pour mise à jour du statut", zabbixHostId);
        }
        
        return success;
    }

    /**
     * Synchronise les assets avec Zabbix
     */
    @Transactional
    public int synchronizeWithZabbix() {
        log.info("🔄 Synchronisation des assets avec Zabbix");
        
        try {
            JsonNode zabbixResponse = zabbixClient.getHosts();
            JsonNode zabbixHosts = zabbixResponse.get("result");
            
            Set<String> zabbixHostIds = new HashSet<>();
            if (zabbixHosts != null && zabbixHosts.isArray()) {
                for (JsonNode host : zabbixHosts) {
                    if (isSnmpHost(host)) {
                        zabbixHostIds.add(host.get("hostid").asText());
                    }
                }
            }
            
            // Supprimer les assets qui ne sont plus dans Zabbix
            int deleted = scanTargetRepository.deleteTargetsNotInZabbix(new ArrayList<>(zabbixHostIds));
            
            // Mettre à jour les assets existants
            int updated = 0;
            if (zabbixHosts != null && zabbixHosts.isArray()) {
                for (JsonNode host : zabbixHosts) {
                    if (isSnmpHost(host)) {
                        String hostId = host.get("hostid").asText();
                        Optional<SnmpScanTarget> existing = scanTargetRepository.findByZabbixHostId(hostId);
                        
                        if (existing.isPresent()) {
                            SnmpScanTarget target = existing.get();
                            target.updateFromZabbix(
                                host.get("name").asText(),
                                extractIpFromInterfaces(host),
                                "Asset synchronisé avec Zabbix"
                            );
                            scanTargetRepository.save(target);
                            updated++;
                        }
                    }
                }
            }
            
            log.info("✅ Synchronisation terminée - {} supprimés, {} mis à jour", deleted, updated);
            return updated;
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de la synchronisation avec Zabbix", e);
            throw new RuntimeException("Erreur lors de la synchronisation", e);
        }
    }

    /**
     * Récupère les statistiques des assets configurés
     */
    @Transactional(readOnly = true)
    public Map<String, Object> getTargetStatistics() {
        log.debug("📊 Récupération des statistiques des assets");
        
        List<Object[]> stats = scanTargetRepository.getTargetStatistics();
        Map<String, Object> result = new HashMap<>();
        
        if (!stats.isEmpty()) {
            Object[] row = stats.get(0);
            result.put("total", ((Number) row[0]).longValue());
            result.put("enabled", ((Number) row[1]).longValue());
            result.put("disabled", ((Number) row[2]).longValue());
        } else {
            result.put("total", 0L);
            result.put("enabled", 0L);
            result.put("disabled", 0L);
        }
        
        return result;
    }

    // === MÉTHODES PRIVÉES ===

    private SnmpScanTargetDto convertToDto(SnmpScanTarget target, boolean checkOnlineStatus) {
        SnmpScanTargetDto dto = SnmpScanTargetDto.builder()
            .id(target.getId())
            .zabbixHostId(target.getZabbixHostId())
            .hostname(target.getHostname())
            .displayName(target.getDisplayName())
            .ipAddress(target.getIpAddress())
            .snmpPort(target.getSnmpPort())
            .description(target.getDescription())
            .enabled(target.getEnabled())
            .priority(target.getPriority())
            .lastSync(target.getLastSync())
            .createdAt(target.getCreatedAt())
            .updatedAt(target.getUpdatedAt())
            .configuredBy(target.getConfiguredBy())
            .build();
        
        // Statut par défaut
        dto.setIsOnline(true);
        dto.setStatus("DISPONIBLE");
        
        return dto;
    }

    private SnmpScanTarget createNewTarget(JsonNode hostInfo) {
        String hostId = hostInfo.get("hostid").asText();
        String hostname = hostInfo.get("host").asText();
        String displayName = hostInfo.get("name").asText();
        String ipAddress = extractIpFromInterfaces(hostInfo);
        
        return new SnmpScanTarget(hostId, hostname, displayName, ipAddress);
    }

    private JsonNode getHostInfoFromZabbix(String hostId) {
        try {
            JsonNode response = zabbixClient.getHosts();
            JsonNode hosts = response.get("result");
            
            if (hosts != null && hosts.isArray()) {
                for (JsonNode host : hosts) {
                    if (hostId.equals(host.get("hostid").asText())) {
                        return host;
                    }
                }
            }
            return null;
        } catch (Exception e) {
            log.error("❌ Erreur lors de la récupération des informations de l'hôte {}", hostId, e);
            return null;
        }
    }

    private String extractIpFromInterfaces(JsonNode host) {
        try {
            JsonNode interfaces = host.get("interfaces");
            
            if (interfaces != null && interfaces.isArray()) {
                for (JsonNode iface : interfaces) {
                    String type = iface.get("type").asText();
                    if ("2".equals(type)) { // Type 2 = SNMP
                        return iface.get("ip").asText();
                    }
                }
                // Si pas d'interface SNMP, prendre la première
                if (interfaces.size() > 0) {
                    return interfaces.get(0).get("ip").asText();
                }
            }
        } catch (Exception e) {
            log.warn("⚠️ Erreur lors de l'extraction de l'IP pour l'hôte", e);
        }
        return null;
    }

    private boolean isSnmpHost(JsonNode host) {
        try {
            JsonNode interfaces = host.get("interfaces");
            
            if (interfaces != null && interfaces.isArray()) {
                for (JsonNode iface : interfaces) {
                    String type = iface.get("type").asText();
                    if ("2".equals(type)) { // Type 2 = SNMP
                        return true;
                    }
                }
            }
        } catch (Exception e) {
            log.debug("Erreur lors de la vérification SNMP pour l'hôte", e);
        }
        return false;
    }
} 