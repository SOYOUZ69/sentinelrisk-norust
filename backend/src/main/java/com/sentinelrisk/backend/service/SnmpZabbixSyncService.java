package com.sentinelrisk.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sentinelrisk.backend.model.SnmpAsset;
import com.sentinelrisk.backend.repository.SnmpAssetRepository;
import com.sentinelrisk.client.ZabbixClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

/**
 * Service pour la synchronisation des assets SNMP avec Zabbix
 */
@Service
public class SnmpZabbixSyncService {

    private static final Logger logger = LoggerFactory.getLogger(SnmpZabbixSyncService.class);

    private final SnmpAssetRepository snmpAssetRepository;
    private final ZabbixClient zabbixClient;
    private final ObjectMapper objectMapper;

    @Autowired
    public SnmpZabbixSyncService(SnmpAssetRepository snmpAssetRepository, 
                                ZabbixClient zabbixClient, 
                                ObjectMapper objectMapper) {
        this.snmpAssetRepository = snmpAssetRepository;
        this.zabbixClient = zabbixClient;
        this.objectMapper = objectMapper;
    }

    /**
     * Vérifie le statut de synchronisation d'un asset avec Zabbix
     */
    public Map<String, Object> checkSyncStatus(Long assetId) {
        logger.debug("Vérification du statut de synchronisation pour l'asset ID: {}", assetId);
        
        SnmpAsset asset = snmpAssetRepository.findById(assetId)
                .orElseThrow(() -> new RuntimeException("Asset SNMP non trouvé avec l'ID: " + assetId));
        
        Map<String, Object> result = new HashMap<>();
        result.put("assetId", assetId);
        result.put("lastChecked", LocalDateTime.now());
        
        try {
            // Si l'asset a déjà un zabbixHostId, vérifier qu'il existe toujours sur Zabbix
            if (asset.getZabbixHostId() != null && !asset.getZabbixHostId().isEmpty()) {
                boolean existsOnZabbix = checkHostExistsOnZabbix(asset.getZabbixHostId());
                
                if (existsOnZabbix) {
                    result.put("synchronized", true);
                    result.put("zabbixHostId", asset.getZabbixHostId());
                    result.put("message", "Asset synchronisé avec Zabbix");
                } else {
                    // L'host n'existe plus sur Zabbix, nettoyer l'ID local
                    asset.setZabbixHostId(null);
                    snmpAssetRepository.save(asset);
                    
                    result.put("synchronized", false);
                    result.put("message", "Host supprimé de Zabbix, synchronisation perdue");
                }
            } else {
                // Pas de zabbixHostId, vérifier s'il existe un host avec la même IP
                String existingHostId = findHostByIpOnZabbix(asset.getIpAddress());
                
                if (existingHostId != null) {
                    // Un host avec cette IP existe déjà, mettre à jour l'asset local
                    asset.setZabbixHostId(existingHostId);
                    snmpAssetRepository.save(asset);
                    
                    result.put("synchronized", true);
                    result.put("zabbixHostId", existingHostId);
                    result.put("message", "Asset trouvé sur Zabbix et lié automatiquement");
                } else {
                    result.put("synchronized", false);
                    result.put("message", "Asset non synchronisé avec Zabbix");
                }
            }
            
        } catch (Exception e) {
            logger.error("Erreur lors de la vérification du statut de synchronisation: {}", e.getMessage());
            result.put("synchronized", false);
            result.put("error", e.getMessage());
            result.put("message", "Erreur lors de la vérification: " + e.getMessage());
        }
        
        return result;
    }

    /**
     * Synchronise un asset local avec Zabbix en créant l'hôte correspondant
     */
    public Map<String, Object> syncAssetWithZabbix(Long assetId) {
        logger.info("Début de synchronisation pour l'asset ID: {}", assetId);
        
        SnmpAsset asset = snmpAssetRepository.findById(assetId)
                .orElseThrow(() -> new RuntimeException("Asset SNMP non trouvé avec l'ID: " + assetId));
        
        Map<String, Object> result = new HashMap<>();
        result.put("assetId", assetId);
        result.put("syncedAt", LocalDateTime.now());
        
        try {
            // Vérifier d'abord si l'asset est déjà synchronisé
            if (asset.getZabbixHostId() != null && !asset.getZabbixHostId().isEmpty()) {
                boolean existsOnZabbix = checkHostExistsOnZabbix(asset.getZabbixHostId());
                
                if (existsOnZabbix) {
                    result.put("success", false);
                    result.put("error", "ALREADY_SYNCHRONIZED");
                    result.put("message", "Asset déjà synchronisé avec Zabbix");
                    result.put("existingZabbixHostId", asset.getZabbixHostId());
                    return result;
                }
            }
            
            // Vérifier qu'aucun host avec la même IP n'existe déjà
            String existingHostId = findHostByIpOnZabbix(asset.getIpAddress());
            if (existingHostId != null) {
                // Lier l'asset existant
                asset.setZabbixHostId(existingHostId);
                snmpAssetRepository.save(asset);
                
                result.put("success", true);
                result.put("zabbixHostId", existingHostId);
                result.put("message", "Asset lié à un hôte Zabbix existant");
                result.put("details", createAssetDetails(asset, "http://localhost:8082"));
                return result;
            }
            
            // Créer un nouvel hôte sur Zabbix
            String newHostId = createHostOnZabbix(asset);
            
            if (newHostId != null) {
                // Mettre à jour l'asset local
                asset.setZabbixHostId(newHostId);
                asset.setLastUpdated(LocalDateTime.now());
                snmpAssetRepository.save(asset);
                
                result.put("success", true);
                result.put("zabbixHostId", newHostId);
                result.put("message", "Asset synchronisé avec succès sur Zabbix");
                result.put("details", createAssetDetails(asset, "http://localhost:8082"));
                
                logger.info("Asset {} synchronisé avec succès. Nouveau Zabbix Host ID: {}", 
                           assetId, newHostId);
            } else {
                result.put("success", false);
                result.put("error", "CREATION_FAILED");
                result.put("message", "Échec de création de l'hôte sur Zabbix");
            }
            
        } catch (Exception e) {
            logger.error("Erreur lors de la synchronisation de l'asset {}: {}", assetId, e.getMessage(), e);
            result.put("success", false);
            result.put("error", "SYNC_FAILED");
            result.put("message", "Erreur lors de la synchronisation: " + e.getMessage());
        }
        
        return result;
    }

    /**
     * Vérifie si un hôte existe sur Zabbix par son ID
     */
    private boolean checkHostExistsOnZabbix(String hostId) {
        try {
            JsonNode response = zabbixClient.getHostById(hostId);
            return response != null && response.has("result") && 
                   response.get("result").isArray() && 
                   response.get("result").size() > 0;
        } catch (Exception e) {
            logger.warn("Erreur lors de la vérification de l'existence de l'hôte {}: {}", hostId, e.getMessage());
            return false;
        }
    }

    /**
     * Trouve un hôte sur Zabbix par son adresse IP
     */
    private String findHostByIpOnZabbix(String ipAddress) {
        try {
            JsonNode response = zabbixClient.getHostByIP(ipAddress);
            
            if (response != null && response.has("result") && 
                response.get("result").isArray() && 
                response.get("result").size() > 0) {
                
                JsonNode host = response.get("result").get(0);
                return host.get("hostid").asText();
            }
            
        } catch (Exception e) {
            logger.warn("Erreur lors de la recherche de l'hôte par IP {}: {}", ipAddress, e.getMessage());
        }
        
        return null;
    }

    /**
     * Crée un nouvel hôte sur Zabbix
     */
    private String createHostOnZabbix(SnmpAsset asset) {
        try {
            logger.info("Création d'un nouvel hôte Zabbix pour l'asset: {} ({})", 
                       asset.getName(), asset.getIpAddress());
            
            JsonNode response = zabbixClient.createHost(
                asset.getName(),
                asset.getIpAddress(),
                asset.getSnmpPort() != null ? asset.getSnmpPort() : 161,
                asset.getSnmpCommunity() != null ? asset.getSnmpCommunity() : "public"
            );
            
            if (response != null && response.has("result") && 
                response.get("result").has("hostids") &&
                response.get("result").get("hostids").isArray() &&
                response.get("result").get("hostids").size() > 0) {
                
                String newHostId = response.get("result").get("hostids").get(0).asText();
                logger.info("Hôte Zabbix créé avec succès. ID: {}", newHostId);
                return newHostId;
            } else {
                logger.error("Réponse inattendue lors de la création de l'hôte: {}", response);
            }
            
        } catch (Exception e) {
            logger.error("Erreur lors de la création de l'hôte Zabbix pour l'asset {}: {}", 
                        asset.getId(), e.getMessage(), e);
        }
        
        return null;
    }

    /**
     * Crée les détails de l'asset pour la réponse
     */
    private Map<String, Object> createAssetDetails(SnmpAsset asset, String zabbixUrl) {
        Map<String, Object> details = new HashMap<>();
        details.put("hostName", asset.getName());
        details.put("ipAddress", asset.getIpAddress());
        details.put("snmpPort", asset.getSnmpPort());
        details.put("snmpCommunity", asset.getSnmpCommunity());
        details.put("zabbixUrl", zabbixUrl);
        return details;
    }
} 