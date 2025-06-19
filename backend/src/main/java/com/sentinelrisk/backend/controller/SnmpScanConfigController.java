package com.sentinelrisk.backend.controller;

import com.sentinelrisk.client.ZabbixClient;
import com.sentinelrisk.backend.model.SnmpScanConfig;
import com.sentinelrisk.backend.service.SnmpScanConfigService;
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

@Tag(name = "SNMP", description = "API de supervision SNMP via Zabbix")
@RestController
@RequestMapping("/api/snmp/configs")
public class SnmpScanConfigController {
    private static final Logger logger = LoggerFactory.getLogger(SnmpScanConfigController.class);

    private final SnmpScanConfigService configService;
    private final ZabbixClient zabbixClient;

    @Autowired
    public SnmpScanConfigController(SnmpScanConfigService configService, ZabbixClient zabbixClient) {
        this.configService = configService;
        this.zabbixClient = zabbixClient;
    }

    @Operation(
        summary = "Lister les configurations de scan SNMP",
        description = "Récupère la liste de toutes les configurations de scan SNMP"
    )
    @ApiResponse(responseCode = "200", description = "Liste des configurations retournée avec succès",
        content = @Content(mediaType = "application/json",
            examples = @ExampleObject(value = """
                [
                  {
                    "id": 1,
                    "name": "CPU Usage",
                    "oid": "1.3.6.1.4.1.2021.11.9.0",
                    "interval": 60,
                    "status": "active"
                  }
                ]
                """)))
    @ApiResponse(responseCode = "401", description = "Non authentifié")
    @ApiResponse(responseCode = "500", description = "Erreur serveur")
    @GetMapping
    public ResponseEntity<Iterable<SnmpScanConfig>> getAllConfigs() {
        return ResponseEntity.ok(configService.findAll());
    }

    @Operation(
        summary = "Détails d'une configuration SNMP",
        description = "Récupère les détails d'une configuration de scan SNMP par son ID"
    )
    @ApiResponse(responseCode = "200", description = "Configuration retournée avec succès")
    @ApiResponse(responseCode = "404", description = "Configuration non trouvée")
    @ApiResponse(responseCode = "401", description = "Non authentifié")
    @ApiResponse(responseCode = "500", description = "Erreur serveur")
    @GetMapping("/{id}")
    public ResponseEntity<SnmpScanConfig> getConfigById(
            @Parameter(description = "ID de la configuration", required = true, example = "1")
            @PathVariable Long id) {
        return configService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(
        summary = "Créer une configuration SNMP",
        description = "Crée une nouvelle configuration de scan SNMP"
    )
    @ApiResponse(responseCode = "200", description = "Configuration créée avec succès")
    @ApiResponse(responseCode = "400", description = "Données invalides")
    @ApiResponse(responseCode = "401", description = "Non authentifié")
    @ApiResponse(responseCode = "500", description = "Erreur serveur")
    @PostMapping
    public ResponseEntity<SnmpScanConfig> createConfig(
            @Parameter(description = "Configuration SNMP à créer", required = true)
            @Schema(example = """
                {
                  "name": "Memory Usage",
                  "oid": "1.3.6.1.4.1.2021.4.6.0",
                  "interval": 300,
                  "status": "active"
                }
                """)
            @RequestBody SnmpScanConfig config) {
        return ResponseEntity.ok(configService.save(config));
    }

    @Operation(
        summary = "Mettre à jour une configuration SNMP",
        description = "Met à jour une configuration de scan SNMP existante"
    )
    @ApiResponse(responseCode = "200", description = "Configuration mise à jour avec succès")
    @ApiResponse(responseCode = "404", description = "Configuration non trouvée")
    @ApiResponse(responseCode = "400", description = "Données invalides")
    @ApiResponse(responseCode = "401", description = "Non authentifié")
    @ApiResponse(responseCode = "500", description = "Erreur serveur")
    @PutMapping("/{id}")
    public ResponseEntity<SnmpScanConfig> updateConfig(
            @Parameter(description = "ID de la configuration", required = true, example = "1")
            @PathVariable Long id, 
            @Parameter(description = "Configuration SNMP mise à jour", required = true)
            @RequestBody SnmpScanConfig config) {
        return configService.findById(id)
                .map(existingConfig -> {
                    // Copier les propriétés depuis config vers existingConfig
                    existingConfig.setName(config.getName());
                    existingConfig.setOid(config.getOid());
                    existingConfig.setInterval(config.getInterval());
                    existingConfig.setStatus(config.getStatus());
                    return ResponseEntity.ok(configService.save(existingConfig));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(
        summary = "Supprimer une configuration SNMP",
        description = "Supprime une configuration de scan SNMP"
    )
    @ApiResponse(responseCode = "200", description = "Configuration supprimée avec succès")
    @ApiResponse(responseCode = "404", description = "Configuration non trouvée")
    @ApiResponse(responseCode = "401", description = "Non authentifié")
    @ApiResponse(responseCode = "500", description = "Erreur serveur")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteConfig(
            @Parameter(description = "ID de la configuration", required = true, example = "1")
            @PathVariable Long id) {
        return configService.findById(id)
                .map(config -> {
                    configService.deleteById(id);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(
        summary = "Exécuter un scan SNMP",
        description = "Lance un scan SNMP pour une configuration donnée sur un hôte spécifique"
    )
    @ApiResponse(responseCode = "200", description = "Scan lancé avec succès",
        content = @Content(mediaType = "application/json",
            examples = @ExampleObject(value = """
                {
                  "itemid": "23456",
                  "name": "CPU Usage",
                  "key_": "snmp.get[1.3.6.1.4.1.2021.11.9.0]",
                  "status": "active"
                }
                """)))
    @ApiResponse(responseCode = "404", description = "Configuration non trouvée")
    @ApiResponse(responseCode = "400", description = "Paramètres invalides")
    @ApiResponse(responseCode = "401", description = "Non authentifié")
    @ApiResponse(responseCode = "500", description = "Erreur serveur")
    @PostMapping("/{id}/run")
    public ResponseEntity<JsonNode> runScan(
            @Parameter(description = "ID de la configuration", required = true, example = "1")
            @PathVariable Long id, 
            @Parameter(description = "ID de l'hôte Zabbix", required = true, example = "10123")
            @RequestParam String hostId) {
        logger.debug("Lancement du scan SNMP pour la config {} sur l'hôte {}", id, hostId);
        try {
            return configService.findById(id)
                    .map(config -> {
                        try {
                            JsonNode result = zabbixClient.runScan(hostId, config);
                            return ResponseEntity.ok(result);
                        } catch (Exception e) {
                            logger.error("Erreur lors de l'exécution du scan SNMP", e);
                            return ResponseEntity.internalServerError().<JsonNode>build();
                        }
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            logger.error("Erreur lors de la récupération de la configuration", e);
            return ResponseEntity.internalServerError().build();
        }
    }
} 