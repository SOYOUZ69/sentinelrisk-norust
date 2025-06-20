package com.sentinelrisk.backend.controller;

import com.sentinelrisk.backend.service.SnmpZabbixSyncService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Contrôleur pour la synchronisation des assets SNMP avec Zabbix
 */
@RestController
@RequestMapping("/snmp/zabbix")
@Tag(name = "SNMP Zabbix Sync", description = "Synchronisation des assets SNMP avec Zabbix")
public class SnmpZabbixSyncController {

    private static final Logger logger = LoggerFactory.getLogger(SnmpZabbixSyncController.class);

    private final SnmpZabbixSyncService syncService;

    @Autowired
    public SnmpZabbixSyncController(SnmpZabbixSyncService syncService) {
        this.syncService = syncService;
    }

    @GetMapping("/test")
    @Operation(summary = "Test endpoint pour déboguer la sécurité")
    public ResponseEntity<Map<String, Object>> testEndpoint() {
        logger.info("Test endpoint appelé avec succès");
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Test endpoint fonctionne");
        response.put("timestamp", java.time.LocalDateTime.now());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/sync-status/{id}")
    @Operation(
        summary = "Vérifier le statut de synchronisation d'un asset",
        description = "Vérifie si un asset SNMP local est synchronisé avec Zabbix (host créé avec la même IP)"
    )
    @ApiResponses({
        @ApiResponse(
            responseCode = "200", 
            description = "Statut de synchronisation retourné avec succès",
            content = @Content(
                mediaType = "application/json",
                examples = @ExampleObject(value = """
                    {
                      "assetId": 1,
                      "synchronized": true,
                      "zabbixHostId": "10123",
                      "message": "Asset synchronisé avec Zabbix",
                      "lastChecked": "2025-06-20T10:30:00"
                    }
                    """)
            )
        ),
        @ApiResponse(responseCode = "404", description = "Asset non trouvé"),
        @ApiResponse(responseCode = "500", description = "Erreur lors de la vérification")
    })
    public ResponseEntity<Map<String, Object>> getSyncStatus(
            @Parameter(description = "ID de l'asset local à vérifier", required = true, example = "1")
            @PathVariable Long id) {
        
        logger.info("Vérification du statut de synchronisation pour l'asset ID: {}", id);
        
        try {
            Map<String, Object> syncStatus = syncService.checkSyncStatus(id);
            logger.info("Statut de synchronisation pour l'asset {}: {}", id, 
                       syncStatus.get("synchronized"));
            
            return ResponseEntity.ok(syncStatus);
            
        } catch (RuntimeException e) {
            logger.error("Erreur lors de la vérification du statut de synchronisation pour l'asset {}: {}", 
                        id, e.getMessage());
            
            if (e.getMessage().contains("non trouvé")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("assetId", id);
            errorResponse.put("synchronized", false);
            errorResponse.put("error", e.getMessage());
            errorResponse.put("lastChecked", java.time.LocalDateTime.now());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @PostMapping("/sync/{id}")
    @Operation(
        summary = "Synchroniser un asset avec Zabbix",
        description = "Crée l'hôte correspondant sur Zabbix via JSON-RPC et met à jour l'asset local"
    )
    @ApiResponses({
        @ApiResponse(
            responseCode = "200", 
            description = "Synchronisation réussie",
            content = @Content(
                mediaType = "application/json",
                examples = @ExampleObject(value = """
                    {
                      "assetId": 1,
                      "success": true,
                      "zabbixHostId": "10124",
                      "message": "Asset synchronisé avec succès sur Zabbix",
                      "syncedAt": "2025-06-20T10:30:00",
                      "details": {
                        "hostName": "Router-Test-01",
                        "ipAddress": "192.168.1.100",
                        "zabbixUrl": "http://localhost:8082"
                      }
                    }
                    """)
            )
        ),
        @ApiResponse(
            responseCode = "409", 
            description = "Asset déjà synchronisé ou conflit",
            content = @Content(
                mediaType = "application/json",
                examples = @ExampleObject(value = """
                    {
                      "assetId": 1,
                      "success": false,
                      "error": "ALREADY_SYNCHRONIZED",
                      "message": "Asset déjà synchronisé avec Zabbix",
                      "existingZabbixHostId": "10123"
                    }
                    """)
            )
        ),
        @ApiResponse(responseCode = "404", description = "Asset non trouvé"),
        @ApiResponse(responseCode = "500", description = "Erreur lors de la synchronisation")
    })
    public ResponseEntity<Map<String, Object>> syncAsset(
            @Parameter(description = "ID de l'asset local à synchroniser", required = true, example = "1")
            @PathVariable Long id) {
        
        logger.info("Demande de synchronisation pour l'asset ID: {}", id);
        
        try {
            Map<String, Object> syncResult = syncService.syncAssetWithZabbix(id);
            
            boolean success = (Boolean) syncResult.get("success");
            if (success) {
                logger.info("Synchronisation réussie pour l'asset {}: Zabbix Host ID = {}", 
                           id, syncResult.get("zabbixHostId"));
                return ResponseEntity.ok(syncResult);
            } else {
                String error = (String) syncResult.get("error");
                logger.warn("Échec de synchronisation pour l'asset {}: {}", id, error);
                
                if ("ALREADY_SYNCHRONIZED".equals(error)) {
                    return ResponseEntity.status(HttpStatus.CONFLICT).body(syncResult);
                } else {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(syncResult);
                }
            }
            
        } catch (RuntimeException e) {
            logger.error("Erreur lors de la synchronisation de l'asset {}: {}", id, e.getMessage(), e);
            
            if (e.getMessage().contains("non trouvé")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("assetId", id);
            errorResponse.put("success", false);
            errorResponse.put("error", "SYNC_FAILED");
            errorResponse.put("message", "Erreur lors de la synchronisation: " + e.getMessage());
            errorResponse.put("syncedAt", java.time.LocalDateTime.now());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @PostMapping("/sync-all")
    @Operation(
        summary = "Synchroniser tous les assets avec Zabbix",
        description = "Lance la synchronisation en lot de tous les assets SNMP locaux non synchronisés avec Zabbix"
    )
    @ApiResponses({
        @ApiResponse(
            responseCode = "200", 
            description = "Synchronisation en lot terminée",
            content = @Content(
                mediaType = "application/json",
                examples = @ExampleObject(value = """
                    {
                      "totalAssets": 5,
                      "synchronized": 3,
                      "skipped": 1,
                      "failed": 1,
                      "message": "Synchronisation en lot terminée",
                      "startedAt": "2025-06-20T10:30:00",
                      "completedAt": "2025-06-20T10:32:15",
                      "details": [
                        {
                          "assetId": 1,
                          "status": "SUCCESS",
                          "zabbixHostId": "10124"
                        },
                        {
                          "assetId": 2,
                          "status": "SKIPPED",
                          "reason": "Already synchronized"
                        }
                      ]
                    }
                    """)
            )
        ),
        @ApiResponse(responseCode = "500", description = "Erreur lors de la synchronisation en lot")
    })
    public ResponseEntity<Map<String, Object>> syncAllAssets() {
        
        logger.info("Demande de synchronisation en lot de tous les assets");
        
        try {
            Map<String, Object> syncResult = syncService.syncAllAssets();
            
            int totalAssets = (Integer) syncResult.get("totalAssets");
            int syncCount = (Integer) syncResult.get("synchronized");
            int failed = (Integer) syncResult.get("failed");
            
            logger.info("Synchronisation en lot terminée: {} assets traités, {} synchronisés, {} échecs", 
                       totalAssets, syncCount, failed);
            
            return ResponseEntity.ok(syncResult);
            
        } catch (Exception e) {
            logger.error("Erreur lors de la synchronisation en lot: {}", e.getMessage(), e);
            
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("error", "BATCH_SYNC_FAILED");
            errorResponse.put("message", "Erreur lors de la synchronisation en lot: " + e.getMessage());
            errorResponse.put("completedAt", java.time.LocalDateTime.now());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/debug-zabbix")
    @Operation(summary = "Test debug des appels Zabbix")
    public ResponseEntity<Map<String, Object>> debugZabbix() {
        logger.info("Test debug Zabbix appelé");
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Test 1: Vérifier la connexion
            boolean connected = syncService.testZabbixConnection();
            response.put("connectionTest", connected);
            
            // Test 2: Rechercher un hôte par IP
            String hostId = syncService.findHostByIpTest("192.168.1.99");
            response.put("hostSearchTest", hostId != null ? "Trouvé: " + hostId : "Non trouvé");
            
            response.put("status", "SUCCESS");
            response.put("timestamp", java.time.LocalDateTime.now());
            
        } catch (Exception e) {
            response.put("status", "ERROR");
            response.put("error", e.getMessage());
            response.put("exception", e.getClass().getSimpleName());
            response.put("timestamp", java.time.LocalDateTime.now());
            logger.error("Erreur lors du test debug Zabbix:", e);
        }
        
        return ResponseEntity.ok(response);
    }
} 