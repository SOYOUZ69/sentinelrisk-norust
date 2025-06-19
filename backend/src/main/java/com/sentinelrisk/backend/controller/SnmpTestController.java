package com.sentinelrisk.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sentinelrisk.backend.service.SnmpAssetService;
import com.sentinelrisk.client.ZabbixClient;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/snmp/test")
@Tag(name = "SNMP Test", description = "Endpoints de test pour l'intégration SNMP/Zabbix")
public class SnmpTestController {
    
    private static final Logger logger = LoggerFactory.getLogger(SnmpTestController.class);
    
    private final ZabbixClient zabbixClient;
    private final SnmpAssetService snmpAssetService;
    
    @Autowired
    public SnmpTestController(ZabbixClient zabbixClient, SnmpAssetService snmpAssetService) {
        this.zabbixClient = zabbixClient;
        this.snmpAssetService = snmpAssetService;
    }
    
    @GetMapping("/connection")
    @Operation(summary = "Test de connexion Zabbix", 
               description = "Teste la connexion à l'API Zabbix et retourne le statut")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Test réussi"),
        @ApiResponse(responseCode = "500", description = "Erreur de connexion")
    })
    public ResponseEntity<Map<String, Object>> testZabbixConnection() {
        logger.info("Test de connexion Zabbix demandé");
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            boolean connected = zabbixClient.testConnection();
            
            response.put("connected", connected);
            response.put("message", connected ? "Connexion Zabbix réussie" : "Connexion Zabbix échouée");
            response.put("timestamp", System.currentTimeMillis());
            
            if (connected) {
                logger.info("Test de connexion Zabbix réussi");
                return ResponseEntity.ok(response);
            } else {
                logger.warn("Test de connexion Zabbix échoué");
                return ResponseEntity.status(503).body(response);
            }
            
        } catch (Exception e) {
            logger.error("Erreur lors du test de connexion Zabbix: {}", e.getMessage(), e);
            
            response.put("connected", false);
            response.put("message", "Erreur: " + e.getMessage());
            response.put("timestamp", System.currentTimeMillis());
            
            return ResponseEntity.status(500).body(response);
        }
    }
    
    @GetMapping("/assets/sync")
    @Operation(summary = "Test de synchronisation des assets", 
               description = "Force la synchronisation des assets depuis Zabbix")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Synchronisation réussie"),
        @ApiResponse(responseCode = "500", description = "Erreur de synchronisation")
    })
    public ResponseEntity<Map<String, Object>> testAssetSync() {
        logger.info("Test de synchronisation des assets demandé");
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Forcer la récupération des assets depuis Zabbix
            var assets = snmpAssetService.getAllAssets();
            
            int assetCount = assets.size();
            
            response.put("success", true);
            response.put("message", "Synchronisation réussie");
            response.put("asset_count", assetCount);
            response.put("timestamp", System.currentTimeMillis());
            
            logger.info("Synchronisation des assets réussie: {} assets récupérés", assetCount);
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            logger.error("Erreur lors de la synchronisation des assets: {}", e.getMessage(), e);
            
            response.put("success", false);
            response.put("message", "Erreur: " + e.getMessage());
            response.put("timestamp", System.currentTimeMillis());
            
            return ResponseEntity.status(500).body(response);
        }
    }
    
    @GetMapping("/health")
    @Operation(summary = "Santé du système SNMP", 
               description = "Retourne l'état de santé du système SNMP/Zabbix")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Système en bonne santé"),
        @ApiResponse(responseCode = "503", description = "Système dégradé")
    })
    public ResponseEntity<Map<String, Object>> healthCheck() {
        logger.debug("Vérification de santé du système SNMP");
        
        Map<String, Object> response = new HashMap<>();
        boolean healthy = true;
        
        // Test de connexion Zabbix
        try {
            boolean zabbixConnected = zabbixClient.testConnection();
            response.put("zabbix_connection", zabbixConnected);
            
            if (!zabbixConnected) {
                healthy = false;
            }
            
        } catch (Exception e) {
            response.put("zabbix_connection", false);
            response.put("zabbix_error", e.getMessage());
            healthy = false;
        }
        
        // Statistiques de la base de données
        try {
            var localAssets = snmpAssetService.getAllLocalAssets();
            response.put("local_assets_count", localAssets.size());
            
        } catch (Exception e) {
            response.put("database_error", e.getMessage());
            healthy = false;
        }
        
        response.put("healthy", healthy);
        response.put("timestamp", System.currentTimeMillis());
        
        if (healthy) {
            logger.debug("Système SNMP en bonne santé");
            return ResponseEntity.ok(response);
        } else {
            logger.warn("Système SNMP dégradé");
            return ResponseEntity.status(503).body(response);
        }
    }
} 