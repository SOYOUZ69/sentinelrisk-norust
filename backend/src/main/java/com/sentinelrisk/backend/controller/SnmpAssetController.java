package com.sentinelrisk.backend.controller;

import com.sentinelrisk.backend.service.SnmpAssetService;
import com.fasterxml.jackson.databind.JsonNode;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Tag(name = "SNMP", description = "API de supervision SNMP via Zabbix")
@RestController
@RequestMapping("/api/snmp/assets")
public class SnmpAssetController {
    private static final Logger logger = LoggerFactory.getLogger(SnmpAssetController.class);

    private final SnmpAssetService snmpAssetService;

    @Autowired
    public SnmpAssetController(SnmpAssetService snmpAssetService) {
        this.snmpAssetService = snmpAssetService;
    }

    @Operation(
        summary = "Lister les hôtes SNMP",
        description = "Récupère la liste de tous les hôtes SNMP configurés dans Zabbix avec le statut de connexion"
    )
    @ApiResponse(responseCode = "200", description = "Liste des hôtes retournée avec succès",
        content = @Content(mediaType = "application/json",
            examples = @ExampleObject(value = """
                {
                  "result": [
                    {
                      "hostid": "10123",
                      "host": "router-01",
                      "name": "Router Principal",
                      "status": "0"
                    }
                  ],
                  "zabbix_connected": true,
                  "status": "connected",
                  "message": "Données récupérées depuis Zabbix"
                }
                """)))
    @ApiResponse(responseCode = "401", description = "Non authentifié")
    @ApiResponse(responseCode = "500", description = "Erreur serveur")
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllAssets() {
        logger.debug("Récupération de tous les hôtes SNMP");
        try {
            List<Map<String, Object>> hosts = snmpAssetService.getAllAssets();
            Map<String, Object> response = new HashMap<>();
            response.put("result", hosts);
            
            // Ajouter le statut de connexion Zabbix
            boolean zabbixConnected = snmpAssetService.isZabbixConnected();
            response.put("zabbix_connected", zabbixConnected);
            response.put("status", zabbixConnected ? "connected" : "disconnected");
            response.put("message", zabbixConnected ? 
                "Données récupérées depuis Zabbix" : 
                "Zabbix indisponible - liste vide retournée");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Erreur lors de la récupération des hôtes SNMP", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @Operation(
        summary = "Détails d'un hôte SNMP",
        description = "Récupère les détails d'un hôte SNMP spécifique par son ID"
    )
    @ApiResponse(responseCode = "200", description = "Détails de l'hôte retournés avec succès",
        content = @Content(mediaType = "application/json",
            examples = @ExampleObject(value = """
                {
                  "hostid": "10123",
                  "host": "router-01",
                  "name": "Router Principal",
                  "status": "0"
                }
                """)))
    @ApiResponse(responseCode = "404", description = "Hôte non trouvé")
    @ApiResponse(responseCode = "401", description = "Non authentifié")
    @ApiResponse(responseCode = "500", description = "Erreur serveur")
    @GetMapping("/{hostId}")
    public ResponseEntity<JsonNode> getAssetById(
            @Parameter(description = "ID de l'hôte Zabbix", required = true, example = "10123")
            @PathVariable String hostId) {
        logger.debug("Récupération de l'hôte SNMP avec l'ID: {}", hostId);
        try {
            JsonNode host = snmpAssetService.getAssetById(hostId);
            if (host != null) {
                return ResponseEntity.ok(host);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            logger.error("Erreur lors de la récupération de l'hôte SNMP", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @Operation(
        summary = "Test de connexion Zabbix",
        description = "Teste activement la connexion à Zabbix et retourne le statut détaillé"
    )
    @ApiResponse(responseCode = "200", description = "Test effectué avec succès",
        content = @Content(mediaType = "application/json",
            examples = @ExampleObject(value = """
                {
                  "connected": true,
                  "status": "connected",
                  "message": "Connexion Zabbix active",
                  "timestamp": 1640995200000
                }
                """)))
    @ApiResponse(responseCode = "503", description = "Service indisponible")
    @GetMapping("/connection/test")
    public ResponseEntity<Map<String, Object>> testConnection() {
        logger.debug("Test de connexion Zabbix demandé");
        
        Map<String, Object> response = new HashMap<>();
        response.put("timestamp", System.currentTimeMillis());
        
        try {
            boolean connected = snmpAssetService.testZabbixConnection();
            
            response.put("connected", connected);
            response.put("status", connected ? "connected" : "disconnected");
            response.put("message", connected ? 
                "Connexion Zabbix active" : 
                "Impossible de se connecter à Zabbix");
            
            if (connected) {
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(503).body(response);
            }
            
        } catch (Exception e) {
            logger.error("Erreur lors du test de connexion Zabbix", e);
            
            response.put("connected", false);
            response.put("status", "error");
            response.put("message", "Erreur: " + e.getMessage());
            
            return ResponseEntity.status(500).body(response);
        }
    }
} 