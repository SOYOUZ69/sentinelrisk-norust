package com.sentinelrisk.backend.controller;

import com.sentinelrisk.backend.service.SnmpAssetService;
import com.fasterxml.jackson.databind.JsonNode;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Tag(name = "SNMP", description = "API de supervision SNMP via Zabbix")
@RestController
@RequestMapping("/api/snmp/history")
public class SnmpScanResultController {
    private static final Logger logger = LoggerFactory.getLogger(SnmpScanResultController.class);

    private final SnmpAssetService snmpAssetService;

    @Autowired
    public SnmpScanResultController(SnmpAssetService snmpAssetService) {
        this.snmpAssetService = snmpAssetService;
    }

    @Operation(
        summary = "Historique des scans SNMP",
        description = "Récupère l'historique des scans SNMP pour un hôte donné. Si les paramètres start et end ne sont pas fournis, retourne les données des 24 dernières heures."
    )
    @ApiResponse(responseCode = "200", description = "Historique retourné avec succès",
        content = @Content(mediaType = "application/json",
            examples = @ExampleObject(value = """
                {
                  "result": [
                    {
                      "itemid": "23456",
                      "clock": "1625097600",
                      "value": "45.2",
                      "ns": "123456789"
                    }
                  ]
                }
                """)))
    @ApiResponse(responseCode = "404", description = "Hôte non trouvé")
    @ApiResponse(responseCode = "400", description = "Paramètres invalides")
    @ApiResponse(responseCode = "401", description = "Non authentifié")
    @ApiResponse(responseCode = "500", description = "Erreur serveur")
    @GetMapping("/{hostId}")
    public ResponseEntity<JsonNode> getHistory(
            @Parameter(description = "ID de l'hôte Zabbix", required = true, example = "10123")
            @PathVariable String hostId,
            @Parameter(description = "Timestamp de début (Unix timestamp)", required = false, example = "1625097600")
            @RequestParam(required = false) Long start,
            @Parameter(description = "Timestamp de fin (Unix timestamp)", required = false, example = "1625184000")
            @RequestParam(required = false) Long end) {
        
        logger.debug("Récupération de l'historique SNMP pour l'hôte {} de {} à {}", hostId, start, end);
        
        try {
            // Si start et end ne sont pas fournis, utiliser les 24 dernières heures
            if (start == null) {
                start = System.currentTimeMillis() / 1000 - 86400; // 24 heures en secondes
            }
            if (end == null) {
                end = System.currentTimeMillis() / 1000;
            }

            JsonNode history = snmpAssetService.getHistory(hostId, start, end);
            return ResponseEntity.ok(history);
        } catch (Exception e) {
            logger.error("Erreur lors de la récupération de l'historique SNMP", e);
            return ResponseEntity.internalServerError().build();
        }
    }
} 