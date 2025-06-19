package com.sentinelrisk.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.sentinelrisk.backend.dto.SnmpAssetRequest;
import com.sentinelrisk.backend.model.SnmpAsset;
import com.sentinelrisk.backend.repository.SnmpAssetRepository;
import com.sentinelrisk.client.ZabbixClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional
public class SnmpAssetService {
    private static final Logger logger = LoggerFactory.getLogger(SnmpAssetService.class);

    private final ZabbixClient zabbixClient;
    private final ObjectMapper objectMapper;
    private final SnmpAssetRepository snmpAssetRepository;
    
    // Variable pour tracker le statut de la dernière connexion Zabbix
    private volatile boolean lastZabbixConnectionStatus = false;

    @Autowired
    public SnmpAssetService(ZabbixClient zabbixClient, ObjectMapper objectMapper, SnmpAssetRepository snmpAssetRepository) {
        this.zabbixClient = zabbixClient;
        this.objectMapper = objectMapper;
        this.snmpAssetRepository = snmpAssetRepository;
    }

    /**
     * Récupère tous les assets SNMP depuis Zabbix et synchronise avec la base de données
     */
    public List<Map<String, Object>> getAllAssets() {
        logger.info("Récupération de tous les assets SNMP depuis Zabbix");
        
        try {
            // Récupérer les hôtes depuis Zabbix
            JsonNode zabbixResponse = zabbixClient.getHosts();
            
            if (zabbixResponse != null && zabbixResponse.has("result")) {
                JsonNode hosts = zabbixResponse.get("result");
                
                // Synchroniser avec la base de données locale
                synchronizeAssetsWithDatabase(hosts);
                
                // Convertir JsonNode en List<Map<String, Object>>
                List<Map<String, Object>> hostsList = convertJsonNodeToList(hosts);
                
                // Marquer la connexion comme réussie
                lastZabbixConnectionStatus = true;
                
                logger.info("Récupéré {} assets depuis Zabbix", hostsList.size());
                return hostsList;
            } else {
                logger.warn("Réponse Zabbix invalide ou vide");
                lastZabbixConnectionStatus = false;
                return Collections.emptyList();
            }
            
        } catch (Exception e) {
            logger.error("Erreur lors de la récupération des assets depuis Zabbix: {}", e.getMessage());
            logger.warn("Retour d'une liste vide car Zabbix n'est pas disponible");
            
            // Marquer la connexion comme échouée
            lastZabbixConnectionStatus = false;
            
            return Collections.emptyList();
        }
    }

    /**
     * Convertit un JsonNode en List<Map<String, Object>>
     */
    private List<Map<String, Object>> convertJsonNodeToList(JsonNode jsonNode) {
        List<Map<String, Object>> result = new ArrayList<>();
        
        if (jsonNode.isArray()) {
            for (JsonNode node : jsonNode) {
                Map<String, Object> map = new HashMap<>();
                node.fields().forEachRemaining(entry -> {
                    String key = entry.getKey();
                    JsonNode value = entry.getValue();
                    if (value.isTextual()) {
                        map.put(key, value.asText());
                    } else if (value.isNumber()) {
                        map.put(key, value.asLong());
                    } else if (value.isBoolean()) {
                        map.put(key, value.asBoolean());
                    } else {
                        map.put(key, value.toString());
                    }
                });
                result.add(map);
            }
        }
        
        return result;
    }

    /**
     * Récupère un asset spécifique par son ID Zabbix
     */
    public JsonNode getAssetById(String hostId) {
        logger.info("Récupération de l'asset avec ID Zabbix: {}", hostId);
        
        try {
            // Chercher d'abord dans la base de données locale
            Optional<SnmpAsset> localAsset = snmpAssetRepository.findByZabbixHostId(hostId);
            
            // Récupérer les données fraîches depuis Zabbix
            JsonNode allHosts = zabbixClient.getHosts();
            
            if (allHosts != null && allHosts.has("result")) {
                for (JsonNode host : allHosts.get("result")) {
                    if (host.get("hostid").asText().equals(hostId)) {
                        // Mettre à jour les données locales si nécessaire
                        updateLocalAssetFromZabbix(host);
                        
                        // Enrichir les données Zabbix avec les informations locales
                        return enrichSingleHostData(host, localAsset.orElse(null));
                    }
                }
            }
            
            logger.warn("Asset avec ID {} non trouvé dans Zabbix", hostId);
            return null;
            
        } catch (Exception e) {
            logger.error("Erreur lors de la récupération de l'asset {}: {}", hostId, e.getMessage(), e);
            throw new RuntimeException("Impossible de récupérer l'asset SNMP depuis Zabbix", e);
        }
    }

    /**
     * Récupère l'historique d'un asset depuis Zabbix
     */
    public JsonNode getHistory(String hostId, long start, long end) {
        logger.info("Récupération de l'historique pour l'hôte {} de {} à {}", hostId, start, end);
        
        try {
            // D'abord, récupérer les items de l'hôte
            JsonNode items = zabbixClient.getItemsByHost(hostId);
            
            if (items == null || !items.has("result") || items.get("result").size() == 0) {
                logger.warn("Aucun item trouvé pour l'hôte {}", hostId);
                return createEmptyResponse();
            }
            
            // Prendre le premier item pour l'historique (vous pouvez modifier cette logique)
            String itemId = items.get("result").get(0).get("itemid").asText();
            
            // Récupérer l'historique depuis Zabbix
            JsonNode history = zabbixClient.getHistory(itemId, start, end);
            
            if (history != null && history.has("result")) {
                logger.info("Récupéré {} points d'historique pour l'hôte {}", 
                    history.get("result").size(), hostId);
                return history;
            } else {
                logger.warn("Aucune donnée d'historique trouvée pour l'hôte {}", hostId);
                return createEmptyResponse();
            }
            
        } catch (Exception e) {
            logger.error("Erreur lors de la récupération de l'historique pour l'hôte {}: {}", 
                hostId, e.getMessage(), e);
            throw new RuntimeException("Impossible de récupérer l'historique depuis Zabbix", e);
        }
    }

    /**
     * Synchronise les assets Zabbix avec la base de données locale
     */
    private void synchronizeAssetsWithDatabase(JsonNode zabbixHosts) {
        logger.debug("Synchronisation des assets avec la base de données");
        
        for (JsonNode host : zabbixHosts) {
            String zabbixHostId = host.get("hostid").asText();
            String hostName = host.get("host").asText();
            String displayName = host.has("name") ? host.get("name").asText() : hostName;
            String status = host.has("status") ? host.get("status").asText() : "unknown";
            
            Optional<SnmpAsset> existingAsset = snmpAssetRepository.findByZabbixHostId(zabbixHostId);
            
            if (existingAsset.isPresent()) {
                // Mettre à jour l'asset existant
                SnmpAsset asset = existingAsset.get();
                asset.setHostName(hostName);
                asset.setDisplayName(displayName);
                asset.setStatus(status);
                asset.setLastDiscovered(LocalDateTime.now());
                snmpAssetRepository.save(asset);
                
                logger.debug("Asset mis à jour: {}", zabbixHostId);
            } else {
                // Créer un nouvel asset
                SnmpAsset newAsset = new SnmpAsset(zabbixHostId, hostName, displayName);
                newAsset.setStatus(status);
                snmpAssetRepository.save(newAsset);
                
                logger.debug("Nouvel asset créé: {}", zabbixHostId);
            }
        }
    }

    /**
     * Enrichit les données Zabbix avec les informations de la base de données
     */
    private JsonNode enrichZabbixDataWithDatabase(JsonNode zabbixResponse) {
        ObjectNode enrichedResponse = objectMapper.createObjectNode();
        enrichedResponse.set("jsonrpc", zabbixResponse.get("jsonrpc"));
        enrichedResponse.set("id", zabbixResponse.get("id"));
        
        ArrayNode enrichedResult = enrichedResponse.putArray("result");
        
        for (JsonNode host : zabbixResponse.get("result")) {
            String zabbixHostId = host.get("hostid").asText();
            Optional<SnmpAsset> localAsset = snmpAssetRepository.findByZabbixHostId(zabbixHostId);
            
            ObjectNode enrichedHost = (ObjectNode) host.deepCopy();
            
            if (localAsset.isPresent()) {
                SnmpAsset asset = localAsset.get();
                enrichedHost.put("ip_address", asset.getIpAddress());
                enrichedHost.put("snmp_version", asset.getSnmpVersion());
                enrichedHost.put("snmp_port", asset.getSnmpPort());
                enrichedHost.put("last_discovered", asset.getLastDiscovered().toString());
                
                if (asset.getProperties() != null && !asset.getProperties().isEmpty()) {
                    ObjectNode properties = enrichedHost.putObject("properties");
                    asset.getProperties().forEach(properties::put);
                }
            }
            
            enrichedResult.add(enrichedHost);
        }
        
        return enrichedResponse;
    }

    /**
     * Enrichit les données d'un seul hôte
     */
    private JsonNode enrichSingleHostData(JsonNode zabbixHost, SnmpAsset localAsset) {
        ObjectNode enrichedHost = (ObjectNode) zabbixHost.deepCopy();
        
        if (localAsset != null) {
            enrichedHost.put("ip_address", localAsset.getIpAddress());
            enrichedHost.put("snmp_version", localAsset.getSnmpVersion());
            enrichedHost.put("snmp_port", localAsset.getSnmpPort());
            enrichedHost.put("last_discovered", localAsset.getLastDiscovered().toString());
            
            if (localAsset.getProperties() != null && !localAsset.getProperties().isEmpty()) {
                ObjectNode properties = enrichedHost.putObject("properties");
                localAsset.getProperties().forEach(properties::put);
            }
        }
        
        return enrichedHost;
    }

    /**
     * Met à jour un asset local avec les données Zabbix
     */
    private void updateLocalAssetFromZabbix(JsonNode zabbixHost) {
        String zabbixHostId = zabbixHost.get("hostid").asText();
        String hostName = zabbixHost.get("host").asText();
        String displayName = zabbixHost.has("name") ? zabbixHost.get("name").asText() : hostName;
        String status = zabbixHost.has("status") ? zabbixHost.get("status").asText() : "unknown";
        
        Optional<SnmpAsset> existingAsset = snmpAssetRepository.findByZabbixHostId(zabbixHostId);
        
        if (existingAsset.isPresent()) {
            SnmpAsset asset = existingAsset.get();
            asset.setHostName(hostName);
            asset.setDisplayName(displayName);
            asset.setStatus(status);
            asset.setLastDiscovered(LocalDateTime.now());
            snmpAssetRepository.save(asset);
        } else {
            SnmpAsset newAsset = new SnmpAsset(zabbixHostId, hostName, displayName);
            newAsset.setStatus(status);
            snmpAssetRepository.save(newAsset);
        }
    }

    /**
     * Crée une réponse vide au format Zabbix
     */
    private JsonNode createEmptyResponse() {
        ObjectNode response = objectMapper.createObjectNode();
        response.put("jsonrpc", "2.0");
        response.put("id", 1);
        response.putArray("result");
        return response;
    }

    /**
     * Méthodes pour la gestion des assets locaux
     */
    public List<SnmpAsset> getAllLocalAssets() {
        logger.debug("Récupération de tous les assets SNMP locaux");
        
        return snmpAssetRepository.findAll();
    }

    public Optional<SnmpAsset> getLocalAssetByZabbixId(String zabbixHostId) {
        return snmpAssetRepository.findByZabbixHostId(zabbixHostId);
    }

    public SnmpAsset saveAsset(SnmpAsset asset) {
        return snmpAssetRepository.save(asset);
    }

    public void deleteAssetByZabbixId(String zabbixHostId) {
        snmpAssetRepository.deleteByZabbixHostId(zabbixHostId);
    }

         /**
      * Nettoie les assets obsolètes (non découverts depuis X jours)
      */
     public void cleanupStaleAssets(int retentionDays) {
         LocalDateTime cutoffDate = LocalDateTime.now().minusDays(retentionDays);
         List<SnmpAsset> staleAssets = snmpAssetRepository.findStaleAssets(cutoffDate);
         
         logger.info("Suppression de {} assets obsolètes", staleAssets.size());
         snmpAssetRepository.deleteAll(staleAssets);
     }

    /**
     * Vérifie si Zabbix était connecté lors de la dernière tentative
     */
    public boolean isZabbixConnected() {
        return lastZabbixConnectionStatus;
    }

    /**
     * Test actif de la connexion Zabbix
     */
    public boolean testZabbixConnection() {
        try {
            boolean connected = zabbixClient.testConnection();
            lastZabbixConnectionStatus = connected;
            return connected;
        } catch (Exception e) {
            logger.warn("Test de connexion Zabbix échoué: {}", e.getMessage());
            lastZabbixConnectionStatus = false;
            return false;
        }
    }

    /**
     * Crée un nouvel asset SNMP local
     */
    public SnmpAsset createLocalAsset(SnmpAssetRequest request) {
        logger.info("Création d'un nouvel asset SNMP local: {}", request.getName());
        
        // Vérifier si un asset avec la même IP existe déjà
        if (snmpAssetRepository.existsByIpAddress(request.getIpAddress())) {
            throw new RuntimeException("Un asset avec l'adresse IP " + request.getIpAddress() + " existe déjà");
        }
        
        SnmpAsset asset = new SnmpAsset();
        mapRequestToAsset(request, asset);
        asset.setCreatedAt(LocalDateTime.now());
        asset.setUpdatedAt(LocalDateTime.now());
        
        SnmpAsset savedAsset = snmpAssetRepository.save(asset);
        logger.info("Asset SNMP créé avec l'ID: {}", savedAsset.getId());
        
        return savedAsset;
    }
    
    /**
     * Met à jour un asset SNMP local existant
     */
    public SnmpAsset updateLocalAsset(Long id, SnmpAssetRequest request) {
        logger.info("Mise à jour de l'asset SNMP ID: {}", id);
        
        SnmpAsset existingAsset = snmpAssetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Asset SNMP non trouvé avec l'ID: " + id));
        
        // Vérifier si l'IP a changé et si elle n'est pas déjà utilisée
        if (!existingAsset.getIpAddress().equals(request.getIpAddress()) && 
            snmpAssetRepository.existsByIpAddress(request.getIpAddress())) {
            throw new RuntimeException("Un asset avec l'adresse IP " + request.getIpAddress() + " existe déjà");
        }
        
        mapRequestToAsset(request, existingAsset);
        existingAsset.setUpdatedAt(LocalDateTime.now());
        
        SnmpAsset updatedAsset = snmpAssetRepository.save(existingAsset);
        logger.info("Asset SNMP mis à jour: {}", updatedAsset.getName());
        
        return updatedAsset;
    }
    
    /**
     * Supprime un asset SNMP local
     */
    public void deleteLocalAsset(Long id) {
        logger.info("Suppression de l'asset SNMP ID: {}", id);
        
        SnmpAsset asset = snmpAssetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Asset SNMP non trouvé avec l'ID: " + id));
        
        // Supprimer les propriétés associées en cascade (si configuré dans l'entité)
        snmpAssetRepository.delete(asset);
        logger.info("Asset SNMP supprimé: {}", asset.getName());
    }
    
    /**
     * Récupère un asset SNMP local par son ID
     */
    public SnmpAsset getLocalAssetById(Long id) {
        logger.debug("Récupération de l'asset SNMP ID: {}", id);
        
        return snmpAssetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Asset SNMP non trouvé avec l'ID: " + id));
    }
    
    /**
     * Récupère les assets SNMP locaux par statut
     */
    public List<SnmpAsset> getLocalAssetsByStatus(String status) {
        logger.debug("Récupération des assets SNMP locaux avec statut: {}", status);
        
        return snmpAssetRepository.findByStatus(status);
    }
    
    /**
     * Mappe les données de la requête vers l'entité SnmpAsset
     */
    private void mapRequestToAsset(SnmpAssetRequest request, SnmpAsset asset) {
        asset.setName(request.getName());
        asset.setIpAddress(request.getIpAddress());
        asset.setSnmpPort(request.getSnmpPort());
        asset.setSnmpCommunity(request.getSnmpCommunity());
        asset.setSnmpVersion(request.getSnmpVersion());
        asset.setDescription(request.getDescription());
        asset.setLocation(request.getLocation());
        asset.setDeviceType(request.getDeviceType());
        asset.setStatus(request.getStatus());
        
        // Gérer les propriétés SNMP personnalisées
        if (request.getSnmpProperties() != null && !request.getSnmpProperties().isEmpty()) {
            // Pour l'instant, on stocke les propriétés comme JSON dans un champ texte
            // Plus tard, on pourra utiliser la table snmp_asset_properties
            try {
                String propertiesJson = objectMapper.writeValueAsString(request.getSnmpProperties());
                // Note: Il faudra ajouter un champ customProperties dans SnmpAsset ou utiliser la table de liaison
                logger.debug("Propriétés SNMP personnalisées: {}", propertiesJson);
            } catch (Exception e) {
                logger.warn("Erreur lors de la sérialisation des propriétés SNMP: {}", e.getMessage());
            }
        }
    }
} 