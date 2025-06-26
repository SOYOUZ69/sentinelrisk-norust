package com.sentinelrisk.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.sentinelrisk.backend.dto.SnmpScanTargetDto;
import com.sentinelrisk.backend.model.SnmpScanHistory;
import com.sentinelrisk.backend.model.SnmpScanHistoryResult;
import com.sentinelrisk.backend.model.SnmpScanHistoryResult.SnmpResultStatus;
import com.sentinelrisk.backend.repository.SnmpScanHistoryRepository;
import com.sentinelrisk.client.ZabbixClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Service pour l'automatisation des scans SNMP via Zabbix
 * 
 * Ce service récupère les données des hôtes et items Zabbix et les convertit
 * en format SnmpScanHistory pour une vue unifiée avec les scans manuels.
 * 
 * MISE À JOUR TÂCHE 3: Ne scanne que les assets configurés et activés
 */
@Service
public class SnmpZabbixAutomationService {

    private static final Logger logger = LoggerFactory.getLogger(SnmpZabbixAutomationService.class);

    private final ZabbixClient zabbixClient;
    private final SnmpScanHistoryRepository scanHistoryRepository;
    private final OidInterpretationService oidInterpretationService;
    private final SnmpScanTargetService scanTargetService;

    @Autowired
    public SnmpZabbixAutomationService(ZabbixClient zabbixClient,
                                     SnmpScanHistoryRepository scanHistoryRepository,
                                     OidInterpretationService oidInterpretationService,
                                     SnmpScanTargetService scanTargetService) {
        this.zabbixClient = zabbixClient;
        this.scanHistoryRepository = scanHistoryRepository;
        this.oidInterpretationService = oidInterpretationService;
        this.scanTargetService = scanTargetService;
    }

    /**
     * Synchronise tous les scans automatiques depuis Zabbix
     * Cette méthode est appelée périodiquement par le scheduler
     * 
     * MISE À JOUR TÂCHE 3: Ne traite que les assets configurés et activés
     */
    @Transactional
    public void synchronizeAllAutomaticScans() {
        logger.info("🔄 Début de la synchronisation des scans automatiques Zabbix");
        
        try {
            // 1. Récupérer les assets activés pour les scans automatiques
            List<SnmpScanTargetDto> enabledTargets = scanTargetService.getEnabledTargets();
            
            if (enabledTargets.isEmpty()) {
                logger.info("ℹ️ Aucun asset configuré pour les scans automatiques - synchronisation annulée");
                return;
            }

            logger.info("📋 {} assets activés trouvés pour les scans automatiques", enabledTargets.size());

            int processedScans = 0;
            int successfulScans = 0;

            // 2. Traiter chaque asset configuré
            for (SnmpScanTargetDto target : enabledTargets) {
                try {
                    if (target.isValidForScan()) {
                        int scansForTarget = processTargetAutomaticScans(target);
                        processedScans += scansForTarget;
                        if (scansForTarget > 0) {
                            successfulScans++;
                        }
                    } else {
                        logger.warn("⚠️ Asset {} non valide pour scan - ignoré", target.getEffectiveDisplayName());
                    }
                } catch (Exception e) {
                    logger.error("❌ Erreur lors du traitement de l'asset {}: {}", 
                               target.getEffectiveDisplayName(), e.getMessage(), e);
                }
            }

            logger.info("✅ Synchronisation terminée - {} assets traités, {} scans créés", 
                       successfulScans, processedScans);

        } catch (Exception e) {
            logger.error("❌ Erreur lors de la synchronisation automatique: {}", e.getMessage(), e);
            throw new RuntimeException("Échec de la synchronisation automatique", e);
        }
    }

    /**
     * Traite les scans automatiques pour un asset configuré spécifique
     */
    @Transactional
    public int processTargetAutomaticScans(SnmpScanTargetDto target) {
        String hostId = target.getZabbixHostId();
        String displayName = target.getEffectiveDisplayName();
        
        logger.debug("🔍 Traitement des scans pour l'asset configuré: {} (Zabbix ID: {})", displayName, hostId);

        try {
            // 1. Récupérer les informations de l'hôte depuis Zabbix
            JsonNode hostResponse = zabbixClient.getHostById(hostId);
            
            if (!hostResponse.has("result") || hostResponse.get("result").isEmpty()) {
                logger.warn("⚠️ Hôte {} non trouvé dans Zabbix - ignoré", hostId);
                return 0;
            }

            JsonNode host = hostResponse.get("result").get(0);

            // 2. Vérifier que l'hôte est actif
            if (!isHostActive(host)) {
                logger.debug("Hôte {} inactif dans Zabbix - ignoré", displayName);
                return 0;
            }

            // 3. Récupérer les items SNMP actifs de l'hôte
            JsonNode itemsResponse = zabbixClient.getItemsByHost(hostId);
            
            if (!itemsResponse.has("result")) {
                logger.debug("Aucun item trouvé pour l'hôte {}", displayName);
                return 0;
            }

            JsonNode items = itemsResponse.get("result");
            List<JsonNode> snmpItems = filterSnmpItems(items);
            
            if (snmpItems.isEmpty()) {
                logger.debug("Aucun item SNMP actif pour l'hôte {}", displayName);
                return 0;
            }

            logger.debug("📊 {} items SNMP trouvés pour l'asset {}", snmpItems.size(), displayName);

            // 4. Créer un scan automatique groupé pour cet asset
            SnmpScanHistory automaticScan = createAutomaticScanFromTarget(target, host, snmpItems);
            
            // 5. Enregistrer le scan
            SnmpScanHistory savedScan = scanHistoryRepository.save(automaticScan);
            
            logger.info("✅ Scan automatique créé pour l'asset {} - ID: {}, {} OIDs", 
                       displayName, savedScan.getId(), snmpItems.size());

            return 1;

        } catch (Exception e) {
            logger.error("❌ Erreur lors du traitement de l'asset {}: {}", displayName, e.getMessage(), e);
            return 0;
        }
    }

    /**
     * Traite les scans automatiques pour un hôte spécifique (méthode legacy)
     * Conservée pour compatibilité mais utilise maintenant la logique des targets
     */
    @Transactional
    public int processHostAutomaticScans(JsonNode host) {
        String hostId = host.get("hostid").asText();
        String hostName = host.get("name").asText();
        
        logger.debug("🔍 Traitement legacy des scans pour l'hôte: {} (ID: {})", hostName, hostId);

        // Vérifier si cet hôte est configuré comme target
        try {
            List<SnmpScanTargetDto> enabledTargets = scanTargetService.getEnabledTargets();
            SnmpScanTargetDto matchingTarget = enabledTargets.stream()
                .filter(target -> hostId.equals(target.getZabbixHostId()))
                .findFirst()
                .orElse(null);

            if (matchingTarget == null) {
                logger.debug("Hôte {} non configuré pour les scans automatiques - ignoré", hostName);
                return 0;
            }

            // Déléguer au traitement des targets configurés
            return processTargetAutomaticScans(matchingTarget);

        } catch (Exception e) {
            logger.error("❌ Erreur lors du traitement legacy de l'hôte {}: {}", hostName, e.getMessage(), e);
            return 0;
        }
    }

    /**
     * Crée un scan automatique depuis un asset configuré et les données Zabbix
     */
    private SnmpScanHistory createAutomaticScanFromTarget(SnmpScanTargetDto target, JsonNode host, List<JsonNode> snmpItems) {
        // Extraire les informations de l'asset configuré
        String displayName = target.getEffectiveDisplayName();
        String hostId = target.getZabbixHostId();
        
        // Utiliser l'IP configurée ou extraire depuis Zabbix
        String targetIp = target.getIpAddress();
        if (targetIp == null || targetIp.trim().isEmpty()) {
            targetIp = extractHostIp(host);
        }
        
        Integer targetPort = target.getSnmpPort();
        if (targetPort == null) {
            targetPort = extractSnmpPort(host);
            if (targetPort == null) {
                targetPort = 161; // Port SNMP par défaut
            }
        }
        
        // Créer le scan principal
        SnmpScanHistory scan = new SnmpScanHistory();
        scan.setTargetIp(targetIp);
        scan.setTargetPort(targetPort);
        scan.setCommunity("zabbix-managed"); // Indicateur que c'est géré par Zabbix
        scan.setSnmpVersion("2c"); // Version par défaut
        scan.setSuccess(true); // On considère que Zabbix a déjà validé la connectivité
        scan.setDurationMs(0L); // Zabbix gère sa propre temporisation
        scan.setTimeoutMs(30000); // Timeout par défaut
        scan.setRetries(3); // Retries par défaut
        scan.setOidsCount(snmpItems.size());
        scan.setUsername("zabbix-automation"); // Utilisateur automatique
        
        // Ajouter des métadonnées spécifiques à l'asset configuré
        scan.setNotes(String.format("Scan automatique - Asset: %s (Priorité: %s)", 
                     displayName, target.getFormattedPriority()));
        
        // Traiter chaque item SNMP
        List<SnmpScanHistoryResult> results = new ArrayList<>();
        int successfulOids = 0;

        for (JsonNode item : snmpItems) {
            try {
                SnmpScanHistoryResult result = createResultFromZabbixItem(item);
                if (result != null) {
                    result.setScanHistory(scan);
                    results.add(result);
                    if (result.getSuccess()) {
                        successfulOids++;
                    }
                }
            } catch (Exception e) {
                logger.warn("⚠️ Erreur lors du traitement de l'item {}: {}", 
                           item.get("itemid").asText(), e.getMessage());
            }
        }

        scan.setSuccessfulOidsCount(successfulOids);
        scan.setResults(results);

        return scan;
    }

    /**
     * Crée un scan automatique depuis les données Zabbix d'un hôte (méthode legacy)
     */
    private SnmpScanHistory createAutomaticScanFromHost(JsonNode host, List<JsonNode> snmpItems) {
        // Extraire les informations de l'hôte
        String hostName = host.get("name").asText();
        String hostId = host.get("hostid").asText();
        
        // Déterminer l'IP depuis les interfaces
        String targetIp = extractHostIp(host);
        Integer targetPort = extractSnmpPort(host);
        
        // Créer le scan principal
        SnmpScanHistory scan = new SnmpScanHistory();
        scan.setTargetIp(targetIp);
        scan.setTargetPort(targetPort != null ? targetPort : 161);
        scan.setCommunity("zabbix-managed"); // Indicateur que c'est géré par Zabbix
        scan.setSnmpVersion("2c"); // Version par défaut
        scan.setSuccess(true); // On considère que Zabbix a déjà validé la connectivité
        scan.setDurationMs(0L); // Zabbix gère sa propre temporisation
        scan.setTimeoutMs(30000); // Timeout par défaut
        scan.setRetries(3); // Retries par défaut
        scan.setOidsCount(snmpItems.size());
        scan.setUsername("zabbix-automation"); // Utilisateur automatique
        
        // Traiter chaque item SNMP
        List<SnmpScanHistoryResult> results = new ArrayList<>();
        int successfulOids = 0;

        for (JsonNode item : snmpItems) {
            try {
                SnmpScanHistoryResult result = createResultFromZabbixItem(item);
                if (result != null) {
                    result.setScanHistory(scan);
                    results.add(result);
                    if (result.getSuccess()) {
                        successfulOids++;
                    }
                }
            } catch (Exception e) {
                logger.warn("⚠️ Erreur lors du traitement de l'item {}: {}", 
                           item.get("itemid").asText(), e.getMessage());
            }
        }

        scan.setSuccessfulOidsCount(successfulOids);
        scan.setResults(results);

        return scan;
    }

    /**
     * Crée un résultat depuis un item Zabbix
     */
    private SnmpScanHistoryResult createResultFromZabbixItem(JsonNode item) {
        String itemId = item.get("itemid").asText();
        String itemName = item.get("name").asText();
        String itemKey = item.get("key_").asText();
        String lastValue = item.has("lastvalue") ? item.get("lastvalue").asText() : null;

        // Extraire l'OID depuis la clé de l'item
        String oid = extractOidFromItemKey(itemKey);
        if (oid == null) {
            logger.warn("⚠️ Impossible d'extraire l'OID depuis la clé: {}", itemKey);
            return null;
        }

        // Créer le résultat
        SnmpScanHistoryResult result = new SnmpScanHistoryResult();
        result.setOid(oid);
        result.setValue(lastValue);
        result.setSuccess(lastValue != null && !lastValue.trim().isEmpty());
        result.setSnmpType(determineSnmpTypeFromZabbix(item));
        result.setOidName(itemName);

        // Interpréter la valeur si possible
        if (result.getSuccess() && lastValue != null) {
            try {
                // Utiliser l'ancien service d'interprétation existant
                result.setFormattedValue(lastValue);
                result.setInterpretation("Valeur Zabbix automatique");
                result.setOidDescription("Item Zabbix: " + itemName);
                result.setOidCategory("zabbix-auto");
                result.setStatus(SnmpResultStatus.NORMAL);
                
            } catch (Exception e) {
                logger.debug("Erreur lors de l'interprétation de l'OID {}: {}", oid, e.getMessage());
                result.setFormattedValue(lastValue);
                result.setInterpretation("Interprétation non disponible");
                result.setStatus(SnmpResultStatus.ERROR);
            }
        } else {
            result.setFormattedValue("N/A");
            result.setInterpretation("Aucune donnée disponible depuis Zabbix");
            result.setStatus(SnmpResultStatus.ERROR);
        }

        return result;
    }

    /**
     * Filtre les items pour ne garder que ceux qui sont SNMP et actifs
     */
    private List<JsonNode> filterSnmpItems(JsonNode items) {
        List<JsonNode> snmpItems = new ArrayList<>();
        
        for (JsonNode item : items) {
            String key = item.get("key_").asText();
            if (isSnmpItem(key) && isItemActive(item)) {
                snmpItems.add(item);
            }
        }
        
        return snmpItems;
    }

    /**
     * Vérifie si un item est de type SNMP
     */
    private boolean isSnmpItem(String itemKey) {
        return itemKey != null && (
            itemKey.startsWith("snmp.get[") ||
            itemKey.startsWith("snmp.walk[") ||
            itemKey.startsWith("snmp.discovery[")
        );
    }

    /**
     * Vérifie si un item est actif
     */
    private boolean isItemActive(JsonNode item) {
        return "0".equals(item.get("status").asText()); // 0 = actif, 1 = inactif
    }

    /**
     * Vérifie si un hôte est actif
     */
    private boolean isHostActive(JsonNode host) {
        return "0".equals(host.get("status").asText()); // 0 = surveillé, 1 = non surveillé
    }

    /**
     * Extrait l'OID depuis la clé d'un item Zabbix
     */
    private String extractOidFromItemKey(String itemKey) {
        if (itemKey == null) return null;
        
        // Format: snmp.get[1.3.6.1.2.1.1.1.0] ou snmp.walk[1.3.6.1.2.1.2.2.1.2]
        if (itemKey.startsWith("snmp.get[") || itemKey.startsWith("snmp.walk[")) {
            int start = itemKey.indexOf('[') + 1;
            int end = itemKey.indexOf(']');
            if (start > 0 && end > start) {
                String content = itemKey.substring(start, end);
                // Prendre la première partie (avant la virgule s'il y en a une)
                return content.split(",")[0].trim();
            }
        }
        
        return null;
    }

    /**
     * Extrait l'IP principale d'un hôte depuis ses interfaces
     */
    private String extractHostIp(JsonNode host) {
        try {
            JsonNode interfaces = host.get("interfaces");
            if (interfaces != null && interfaces.isArray() && interfaces.size() > 0) {
                // Prendre la première interface disponible
                JsonNode firstInterface = interfaces.get(0);
                return firstInterface.get("ip").asText();
            }
        } catch (Exception e) {
            logger.debug("Erreur lors de l'extraction de l'IP pour l'hôte", e);
        }
        return "unknown";
    }

    /**
     * Extrait le port SNMP d'un hôte depuis ses interfaces
     */
    private Integer extractSnmpPort(JsonNode host) {
        try {
            JsonNode interfaces = host.get("interfaces");
            if (interfaces != null && interfaces.isArray()) {
                for (JsonNode iface : interfaces) {
                    // Type 2 = SNMP
                    if ("2".equals(iface.get("type").asText())) {
                        String portStr = iface.get("port").asText();
                        return Integer.parseInt(portStr);
                    }
                }
            }
        } catch (Exception e) {
            logger.debug("Erreur lors de l'extraction du port SNMP", e);
        }
        return null;
    }

    /**
     * Détermine le type SNMP depuis les informations Zabbix
     */
    private String determineSnmpTypeFromZabbix(JsonNode item) {
        try {
            String valueType = item.get("value_type").asText();
            switch (valueType) {
                case "0": return "FLOAT";      // Numérique (float)
                case "1": return "STRING";     // Caractère
                case "2": return "LOG";        // Log
                case "3": return "INTEGER";    // Numérique (entier non signé)
                case "4": return "STRING";     // Texte
                default: return "UNKNOWN";
            }
        } catch (Exception e) {
            return "UNKNOWN";
        }
    }

    /**
     * Obtient un identifiant lisible pour un hôte
     */
    private String getHostIdentifier(JsonNode host) {
        String name = host.get("name").asText();
        String hostId = host.get("hostid").asText();
        return String.format("%s (ID: %s)", name, hostId);
    }

    /**
     * Mappe le statut d'interprétation vers l'enum
     */
    private SnmpResultStatus mapInterpretationStatusToEnum(String status) {
        if (status == null) return SnmpResultStatus.UNAVAILABLE;
        
        switch (status.toUpperCase()) {
            case "SUCCESS": return SnmpResultStatus.NORMAL;
            case "WARNING": return SnmpResultStatus.WARNING;
            case "ERROR": return SnmpResultStatus.ERROR;
            case "CRITICAL": return SnmpResultStatus.CRITICAL;
            default: return SnmpResultStatus.UNAVAILABLE;
        }
    }

    /**
     * Synchronise un hôte spécifique (utilisé pour les tests)
     */
    @Transactional
    public SnmpScanHistory synchronizeSpecificHost(String hostId) {
        logger.info("🔄 Synchronisation spécifique de l'hôte: {}", hostId);
        
        try {
            JsonNode hostResponse = zabbixClient.getHostById(hostId);
            
            if (!hostResponse.has("result") || hostResponse.get("result").isEmpty()) {
                throw new RuntimeException("Hôte non trouvé: " + hostId);
            }

            JsonNode host = hostResponse.get("result").get(0);
            
            // Vérifier si l'hôte est configuré pour les scans automatiques
            List<SnmpScanTargetDto> enabledTargets = scanTargetService.getEnabledTargets();
            SnmpScanTargetDto matchingTarget = enabledTargets.stream()
                .filter(target -> hostId.equals(target.getZabbixHostId()))
                .findFirst()
                .orElse(null);

            if (matchingTarget == null) {
                throw new RuntimeException("Hôte " + hostId + " non configuré pour les scans automatiques");
            }

            processTargetAutomaticScans(matchingTarget);
            
            // Récupérer le scan le plus récent pour cet hôte
            List<SnmpScanHistory> recentScans = scanHistoryRepository.findByTargetIpOrderByCreatedAtDesc(
                matchingTarget.getIpAddress() != null ? matchingTarget.getIpAddress() : extractHostIp(host));
            
            return recentScans.isEmpty() ? null : recentScans.get(0);
            
        } catch (Exception e) {
            logger.error("❌ Erreur lors de la synchronisation de l'hôte {}: {}", hostId, e.getMessage(), e);
            throw new RuntimeException("Échec de la synchronisation de l'hôte " + hostId, e);
        }
    }

    /**
     * Teste la connectivité avec Zabbix
     */
    public boolean testZabbixConnectivity() {
        try {
            JsonNode response = zabbixClient.getHosts();
            return response.has("result");
        } catch (Exception e) {
            logger.error("❌ Erreur de connectivité Zabbix: {}", e.getMessage());
            return false;
        }
    }

    /**
     * Récupère les statistiques d'automatisation
     * MISE À JOUR TÂCHE 3: Inclut les statistiques des assets configurés
     */
    public Map<String, Object> getAutomationStatistics() {
        Map<String, Object> stats = new HashMap<>();
        
        try {
            // Statistiques des assets configurés
            Map<String, Object> targetStats = scanTargetService.getTargetStatistics();
            stats.put("configuredTargets", targetStats);
            
            // Statistiques des scans automatiques
            long totalAutomaticScans = scanHistoryRepository.countByUsername("zabbix-automation");
            long recentAutomaticScans = scanHistoryRepository.countByUsernameAndCreatedAtAfter(
                "zabbix-automation", LocalDateTime.now().minusDays(1));
            long successfulAutomaticScans = scanHistoryRepository.countByUsernameAndSuccess(
                "zabbix-automation", true);
            
            stats.put("totalAutomaticScans", totalAutomaticScans);
            stats.put("recentAutomaticScans", recentAutomaticScans);
            stats.put("successfulAutomaticScans", successfulAutomaticScans);
            
            // Connectivité Zabbix
            boolean zabbixConnected = testZabbixConnectivity();
            stats.put("zabbixConnected", zabbixConnected);
            
            if (zabbixConnected) {
                try {
                    JsonNode hostsResponse = zabbixClient.getHosts();
                    stats.put("totalZabbixHosts", hostsResponse.get("result").size());
                } catch (Exception e) {
                    stats.put("totalZabbixHosts", 0);
                }
            } else {
                stats.put("totalZabbixHosts", 0);
            }
            
        } catch (Exception e) {
            logger.error("❌ Erreur lors de la récupération des statistiques: {}", e.getMessage(), e);
            stats.put("error", e.getMessage());
        }
        
        return stats;
    }
} 