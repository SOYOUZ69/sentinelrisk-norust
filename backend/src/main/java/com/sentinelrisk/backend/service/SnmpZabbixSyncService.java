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
            Map<String, Object> creationResult = createHostOnZabbixWithDetails(asset);
            
            if ((Boolean) creationResult.get("success")) {
                String newHostId = (String) creationResult.get("hostId");
                
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
                // Erreur de création, retourner les détails
                result.put("success", false);
                result.put("error", creationResult.get("errorCode"));
                result.put("message", creationResult.get("message"));
                result.put("zabbixError", creationResult.get("zabbixError"));
                result.put("zabbixErrorCode", creationResult.get("zabbixErrorCode"));
                result.put("zabbixErrorData", creationResult.get("zabbixErrorData"));
                
                logger.error("Échec de synchronisation pour l'asset {}: {} - Erreur Zabbix: {}", 
                           assetId, creationResult.get("message"), creationResult.get("zabbixError"));
            }
            
        } catch (Exception e) {
            logger.error("Erreur lors de la synchronisation de l'asset {}: {}", assetId, e.getMessage(), e);
            result.put("success", false);
            result.put("error", "SYNC_FAILED");
            result.put("message", "Erreur lors de la synchronisation: " + e.getMessage());
            result.put("exception", e.getClass().getSimpleName());
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
     * Crée un nouvel hôte sur Zabbix avec gestion détaillée des erreurs
     */
    private Map<String, Object> createHostOnZabbixWithDetails(SnmpAsset asset) {
        Map<String, Object> result = new HashMap<>();
        
        // Tentative avec le nom original
        String originalName = asset.getName();
        String hostName = originalName;
        int attempt = 1;
        int maxAttempts = 5;
        
        // Validation préliminaire des données
        logger.info("🔍 Validation des données de l'asset ID {} avant création Zabbix:", asset.getId());
        logger.info("   - Nom: '{}' (longueur: {})", hostName, hostName.length());
        logger.info("   - IP: '{}'", asset.getIpAddress());
        logger.info("   - Port SNMP: {}", asset.getSnmpPort());
        logger.info("   - Communauté: '{}'", asset.getSnmpCommunity());
        
        // Vérifier les caractères problématiques dans le nom
        if (hostName.contains("'") || hostName.contains("\"") || hostName.contains("\\")) {
            logger.warn("⚠️ Le nom d'hôte contient des caractères spéciaux qui peuvent poser problème: {}", hostName);
        }
        
        while (attempt <= maxAttempts) {
            try {
                logger.info("🔄 Création d'un nouvel hôte Zabbix pour l'asset: '{}' ({}) - Tentative {}/{}", 
                           hostName, asset.getIpAddress(), attempt, maxAttempts);
                
                // Log des paramètres exacts envoyés
                Integer snmpPort = asset.getSnmpPort() != null ? asset.getSnmpPort() : 161;
                String snmpCommunity = asset.getSnmpCommunity() != null ? asset.getSnmpCommunity() : "public";
                
                logger.info("📤 Paramètres envoyés à ZabbixClient.createHost():");
                logger.info("   - hostName: '{}'", hostName);
                logger.info("   - ipAddress: '{}'", asset.getIpAddress());
                logger.info("   - snmpPort: {}", snmpPort);
                logger.info("   - snmpCommunity: '{}'", snmpCommunity);
                
                JsonNode response = zabbixClient.createHost(hostName, asset.getIpAddress(), snmpPort, snmpCommunity);
                
                logger.info("📥 Réponse brute de Zabbix: {}", response);
                
                if (response != null && response.has("result") && 
                    response.get("result").has("hostids") &&
                    response.get("result").get("hostids").isArray() &&
                    response.get("result").get("hostids").size() > 0) {
                    
                    String newHostId = response.get("result").get("hostids").get(0).asText();
                    logger.info("✅ Hôte Zabbix créé avec succès. ID: {}, Nom: '{}'", newHostId, hostName);
                    
                    // Si le nom a été modifié, mettre à jour l'asset local
                    if (!hostName.equals(originalName)) {
                        asset.setName(hostName);
                        snmpAssetRepository.save(asset);
                        logger.info("📝 Nom de l'asset mis à jour: '{}' -> '{}'", originalName, hostName);
                    }
                    
                    result.put("success", true);
                    result.put("hostId", newHostId);
                    result.put("message", hostName.equals(originalName) ? 
                              "Hôte créé avec succès sur Zabbix" : 
                              String.format("Hôte créé avec succès sur Zabbix (nom modifié: %s -> %s)", originalName, hostName));
                    result.put("nameChanged", !hostName.equals(originalName));
                    result.put("originalName", originalName);
                    result.put("finalName", hostName);
                    result.put("zabbixResponse", response.toString());
                    return result;
                    
                } else {
                    logger.error("❌ Réponse inattendue lors de la création de l'hôte:");
                    logger.error("   - Réponse complète: {}", response);
                    logger.error("   - Has 'result': {}", response != null ? response.has("result") : "response is null");
                    if (response != null && response.has("result")) {
                        logger.error("   - Result content: {}", response.get("result"));
                        logger.error("   - Has 'hostids': {}", response.get("result").has("hostids"));
                    }
                    
                    result.put("success", false);
                    result.put("errorCode", "UNEXPECTED_RESPONSE");
                    result.put("message", "Réponse inattendue de Zabbix lors de la création");
                    result.put("zabbixResponse", response != null ? response.toString() : "null");
                    result.put("zabbixError", "Réponse Zabbix invalide ou incomplète");
                    result.put("zabbixErrorCode", null);
                    result.put("zabbixErrorData", response != null ? response.toString() : null);
                    return result;
                }
                
            } catch (RuntimeException e) {
                // Capture complète de l'exception
                String errorMessage = e.getMessage();
                String exceptionType = e.getClass().getSimpleName();
                
                logger.error("❌ Exception {} lors de la création de l'hôte Zabbix pour l'asset {} (tentative {}):", 
                            exceptionType, asset.getId(), attempt);
                logger.error("   - Message: {}", errorMessage);
                logger.error("   - Exception complète:", e);
                
                // Analyser différents types d'exceptions
                if (e.getCause() != null) {
                    logger.error("   - Cause racine: {} - {}", e.getCause().getClass().getSimpleName(), e.getCause().getMessage());
                }
                
                // Vérifier si c'est un conflit de nom d'hôte et si on peut le corriger
                if (isHostNameConflict(errorMessage) && attempt < maxAttempts) {
                    hostName = generateUniqueHostName(originalName, attempt);
                    logger.info("🔄 Conflit de nom détecté, tentative avec un nouveau nom: '{}'", hostName);
                    attempt++;
                    continue; // Réessayer avec le nouveau nom
                }
                
                // Traiter l'erreur normalement si pas de conflit ou max tentatives atteint
                result.put("success", false);
                result.put("exception", exceptionType);
                result.put("attemptsUsed", attempt);
                
                // Parser les erreurs Zabbix spécifiques avec plus de détails
                if (errorMessage != null && errorMessage.contains("Erreur API Zabbix")) {
                    logger.info("🔍 Analyse détaillée de l'erreur API Zabbix:");
                    logger.info("   - Message complet: {}", errorMessage);
                    
                    // Extraction plus robuste des codes d'erreur
                    String zabbixErrorCode = null;
                    String zabbixMessage = null;
                    String zabbixData = null;
                    
                    // Pattern pour extraire [code]: "message"
                    java.util.regex.Pattern pattern = java.util.regex.Pattern.compile("\\[([^\\]]+)\\]:\\s*\"([^\"]+)\"");
                    java.util.regex.Matcher matcher = pattern.matcher(errorMessage);
                    
                    if (matcher.find()) {
                        zabbixErrorCode = matcher.group(1);
                        zabbixMessage = matcher.group(2);
                        
                        logger.info("   - Code extrait: '{}'", zabbixErrorCode);
                        logger.info("   - Message extrait: '{}'", zabbixMessage);
                    } else {
                        // Fallback: essayer de parser différemment
                        String[] parts = errorMessage.split("\\[|\\]|:");
                        if (parts.length >= 3) {
                            zabbixErrorCode = parts[1].trim();
                            zabbixMessage = parts[2].replace("\"", "").trim();
                            
                            logger.info("   - Code (fallback): '{}'", zabbixErrorCode);
                            logger.info("   - Message (fallback): '{}'", zabbixMessage);
                        }
                    }
                    
                    // Extraire les données supplémentaires
                    if (errorMessage.contains(" - ")) {
                        String[] dataParts = errorMessage.split(" - ");
                        if (dataParts.length > 1) {
                            zabbixData = dataParts[dataParts.length - 1];
                            logger.info("   - Données supplémentaires: '{}'", zabbixData);
                        }
                    }
                    
                    result.put("zabbixErrorCode", zabbixErrorCode);
                    result.put("zabbixError", zabbixMessage);
                    result.put("zabbixErrorData", zabbixData);
                    
                    // Analyser les erreurs courantes
                    if (zabbixMessage != null) {
                        String friendlyMessage = analyzeLabbixError(zabbixErrorCode != null ? zabbixErrorCode : "", zabbixMessage, asset);
                        result.put("errorCode", getErrorCodeFromZabbix(zabbixErrorCode != null ? zabbixErrorCode : "", zabbixMessage));
                        result.put("message", friendlyMessage);
                        
                        logger.error("🔍 Diagnostic final:");
                        logger.error("   - Code d'erreur: {}", result.get("errorCode"));
                        logger.error("   - Message utilisateur: {}", friendlyMessage);
                    } else {
                        result.put("errorCode", "ZABBIX_API_ERROR");
                        result.put("message", "Erreur API Zabbix: " + errorMessage);
                        result.put("zabbixError", errorMessage);
                    }
                } else {
                    // Erreur non-Zabbix ou format inattendu
                    result.put("errorCode", "CREATION_FAILED");
                    result.put("message", String.format("Échec de création de l'hôte sur Zabbix (%s): %s", exceptionType, errorMessage));
                    result.put("zabbixError", errorMessage);
                    result.put("zabbixErrorCode", null);
                    result.put("zabbixErrorData", null);
                    
                    logger.error("🔍 Erreur non-API Zabbix:");
                    logger.error("   - Type: {}", exceptionType);
                    logger.error("   - Message: {}", errorMessage);
                }
                
                return result;
                
            } catch (Exception e) {
                String exceptionType = e.getClass().getSimpleName();
                logger.error("❌ Exception inattendue {} lors de la création de l'hôte Zabbix pour l'asset {}:", 
                            exceptionType, asset.getId());
                logger.error("   - Message: {}", e.getMessage());
                logger.error("   - Stacktrace complète:", e);
                
                if (e.getCause() != null) {
                    logger.error("   - Cause racine: {} - {}", e.getCause().getClass().getSimpleName(), e.getCause().getMessage());
                }
                
                result.put("success", false);
                result.put("errorCode", "UNEXPECTED_ERROR");
                result.put("message", String.format("Erreur inattendue lors de la création (%s): %s", exceptionType, e.getMessage()));
                result.put("exception", exceptionType);
                result.put("zabbixError", e.getMessage());
                result.put("zabbixErrorCode", null);
                result.put("zabbixErrorData", null);
                result.put("attemptsUsed", attempt);
                
                return result;
            }
        }
        
        // Si on arrive ici, toutes les tentatives ont échoué
        logger.error("❌ Toutes les tentatives ({}) ont échoué pour l'asset {}", maxAttempts, asset.getId());
        result.put("success", false);
        result.put("errorCode", "MAX_ATTEMPTS_REACHED");
        result.put("message", String.format("Impossible de créer l'hôte après %d tentatives (conflits de nom)", maxAttempts));
        result.put("attemptsUsed", maxAttempts);
        result.put("zabbixError", "Nombre maximum de tentatives atteint");
        result.put("zabbixErrorCode", null);
        result.put("zabbixErrorData", null);
        return result;
    }
    
    /**
     * Vérifie si l'erreur indique un conflit de nom d'hôte
     */
    private boolean isHostNameConflict(String errorMessage) {
        String lowerMessage = errorMessage.toLowerCase();
        return lowerMessage.contains("host") && lowerMessage.contains("already exists") ||
               lowerMessage.contains("duplicate") && lowerMessage.contains("host") ||
               lowerMessage.contains("hostname") && lowerMessage.contains("exists");
    }
    
    /**
     * Génère un nom d'hôte unique en ajoutant un suffixe
     */
    private String generateUniqueHostName(String originalName, int attempt) {
        return String.format("%s-%03d", originalName, attempt);
    }

    /**
     * Analyse les erreurs Zabbix pour fournir des messages explicites
     */
    private String analyzeLabbixError(String errorCode, String zabbixMessage, SnmpAsset asset) {
        String lowerMessage = zabbixMessage.toLowerCase();
        
        // Erreurs courantes avec solutions
        if (lowerMessage.contains("host") && lowerMessage.contains("already exists")) {
            return String.format("❌ Le nom d'hôte '%s' existe déjà dans Zabbix. Choisissez un nom unique.", asset.getName());
        }
        
        if (lowerMessage.contains("ip") && lowerMessage.contains("already") && lowerMessage.contains("used")) {
            return String.format("❌ L'adresse IP '%s' est déjà utilisée par un autre hôte dans Zabbix.", asset.getIpAddress());
        }
        
        if (lowerMessage.contains("interface") && lowerMessage.contains("ip") && lowerMessage.contains("already")) {
            return String.format("❌ Une interface avec l'IP '%s' existe déjà dans Zabbix.", asset.getIpAddress());
        }
        
        if (lowerMessage.contains("group") && lowerMessage.contains("not found")) {
            return "❌ Le groupe d'hôtes spécifié n'existe pas dans Zabbix. Vérifiez la configuration des groupes.";
        }
        
        if (lowerMessage.contains("permission") || lowerMessage.contains("access")) {
            return "❌ Permissions insuffisantes pour créer un hôte dans Zabbix. Vérifiez les droits utilisateur.";
        }
        
        if (lowerMessage.contains("template") && lowerMessage.contains("not found")) {
            return "❌ Le template spécifié n'existe pas dans Zabbix.";
        }
        
        if (lowerMessage.contains("invalid") && lowerMessage.contains("ip")) {
            return String.format("❌ L'adresse IP '%s' n'est pas valide selon Zabbix.", asset.getIpAddress());
        }
        
        if (lowerMessage.contains("port") && lowerMessage.contains("invalid")) {
            return String.format("❌ Le port SNMP '%d' n'est pas valide.", asset.getSnmpPort());
        }
        
        if (lowerMessage.contains("community") && lowerMessage.contains("invalid")) {
            return String.format("❌ La communauté SNMP '%s' n'est pas valide.", asset.getSnmpCommunity());
        }
        
        // Message générique si aucune correspondance
        return String.format("❌ Erreur Zabbix lors de la création de l'hôte '%s': %s", asset.getName(), zabbixMessage);
    }
    
    /**
     * Détermine le code d'erreur approprié basé sur l'erreur Zabbix
     */
    private String getErrorCodeFromZabbix(String zabbixErrorCode, String zabbixMessage) {
        String lowerMessage = zabbixMessage.toLowerCase();
        
        if (lowerMessage.contains("already exists") || lowerMessage.contains("already used")) {
            return "DUPLICATE_RESOURCE";
        }
        
        if (lowerMessage.contains("permission") || lowerMessage.contains("access")) {
            return "INSUFFICIENT_PERMISSIONS";
        }
        
        if (lowerMessage.contains("not found")) {
            return "RESOURCE_NOT_FOUND";
        }
        
        if (lowerMessage.contains("invalid")) {
            return "INVALID_PARAMETER";
        }
        
        return "ZABBIX_ERROR_" + zabbixErrorCode;
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

    /**
     * Synchronise tous les assets SNMP locaux avec Zabbix
     */
    public Map<String, Object> syncAllAssets() {
        logger.info("Début de synchronisation en lot de tous les assets SNMP");
        
        List<SnmpAsset> allAssets = snmpAssetRepository.findAll();
        
        Map<String, Object> result = new HashMap<>();
        result.put("startedAt", LocalDateTime.now());
        result.put("totalAssets", allAssets.size());
        
        int syncCount = 0;
        int skipped = 0;
        int failed = 0;
        List<Map<String, Object>> details = new ArrayList<>();
        
        for (SnmpAsset asset : allAssets) {
            try {
                logger.debug("Traitement de l'asset {} - {}", asset.getId(), asset.getName());
                
                Map<String, Object> assetResult = new HashMap<>();
                assetResult.put("assetId", asset.getId());
                assetResult.put("assetName", asset.getName());
                
                // Vérifier si déjà synchronisé
                if (asset.getZabbixHostId() != null && !asset.getZabbixHostId().isEmpty()) {
                    boolean existsOnZabbix = checkHostExistsOnZabbix(asset.getZabbixHostId());
                    
                    if (existsOnZabbix) {
                        assetResult.put("status", "SKIPPED");
                        assetResult.put("reason", "Already synchronized");
                        assetResult.put("zabbixHostId", asset.getZabbixHostId());
                        skipped++;
                        details.add(assetResult);
                        continue;
                    }
                }
                
                // Tenter la synchronisation
                Map<String, Object> syncResult = syncAssetWithZabbix(asset.getId());
                boolean success = (Boolean) syncResult.get("success");
                
                if (success) {
                    assetResult.put("status", "SUCCESS");
                    assetResult.put("zabbixHostId", syncResult.get("zabbixHostId"));
                    syncCount++;
                } else {
                    assetResult.put("status", "FAILED");
                    assetResult.put("error", syncResult.get("error"));
                    assetResult.put("message", syncResult.get("message"));
                    failed++;
                }
                
                details.add(assetResult);
                
            } catch (Exception e) {
                logger.error("Erreur lors de la synchronisation de l'asset {}: {}", 
                           asset.getId(), e.getMessage());
                
                Map<String, Object> assetResult = new HashMap<>();
                assetResult.put("assetId", asset.getId());
                assetResult.put("assetName", asset.getName());
                assetResult.put("status", "FAILED");
                assetResult.put("error", "EXCEPTION");
                assetResult.put("message", e.getMessage());
                details.add(assetResult);
                failed++;
            }
        }
        
        result.put("synchronized", syncCount);
        result.put("skipped", skipped);
        result.put("failed", failed);
        result.put("details", details);
        result.put("completedAt", LocalDateTime.now());
        result.put("message", String.format("Synchronisation en lot terminée: %d assets traités, %d synchronisés, %d ignorés, %d échecs", 
                                           allAssets.size(), syncCount, skipped, failed));
        
        logger.info("Synchronisation en lot terminée: {} assets traités, {} synchronisés, {} ignorés, {} échecs", 
                   allAssets.size(), syncCount, skipped, failed);
        
        return result;
    }

    /**
     * Test de connexion Zabbix
     */
    public boolean testZabbixConnection() {
        try {
            return zabbixClient.testConnection();
        } catch (Exception e) {
            logger.error("Erreur lors du test de connexion Zabbix: {}", e.getMessage(), e);
            return false;
        }
    }
    
    /**
     * Test de recherche d'hôte par IP
     */
    public String findHostByIpTest(String ipAddress) {
        try {
            return findHostByIpOnZabbix(ipAddress);
        } catch (Exception e) {
            logger.error("Erreur lors du test de recherche par IP {}: {}", ipAddress, e.getMessage(), e);
            throw e;
        }
    }
} 