package com.sentinelrisk.backend.controller;

import com.sentinelrisk.backend.dto.SnmpAssetRequest;
import com.sentinelrisk.backend.model.SnmpAsset;
import com.sentinelrisk.backend.service.SnmpAssetService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Contrôleur pour la gestion CRUD des assets SNMP locaux
 */
@RestController
@RequestMapping("/snmp/local/assets")
@Tag(name = "SNMP Assets Management", description = "Gestion des assets SNMP en base locale")
public class SnmpAssetCrudController {

    private static final Logger logger = LoggerFactory.getLogger(SnmpAssetCrudController.class);

    private final SnmpAssetService snmpAssetService;

    @Autowired
    public SnmpAssetCrudController(SnmpAssetService snmpAssetService) {
        this.snmpAssetService = snmpAssetService;
    }

    @PostMapping
    @Operation(
        summary = "Créer un nouvel asset SNMP",
        description = "Crée un nouvel asset SNMP dans la base de données locale. " +
                     "L'asset pourra ensuite être utilisé pour des scans Zabbix ou SNMP directs."
    )
    @ApiResponses({
        @ApiResponse(
            responseCode = "201", 
            description = "Asset créé avec succès",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = SnmpAsset.class),
                examples = @ExampleObject(value = """
                    {
                      "id": 1,
                      "name": "Router-Principal-01",
                      "ipAddress": "192.168.1.1",
                      "snmpPort": 161,
                      "snmpCommunity": "public",
                      "snmpVersion": "2c",
                      "description": "Routeur principal du réseau",
                      "location": "Salle serveur - Rack A1",
                      "deviceType": "router",
                      "status": "active",
                      "createdAt": "2025-06-19T10:30:00",
                      "updatedAt": "2025-06-19T10:30:00"
                    }
                    """)
            )
        ),
        @ApiResponse(responseCode = "400", description = "Données invalides"),
        @ApiResponse(responseCode = "409", description = "Asset avec cette IP existe déjà")
    })
    public ResponseEntity<SnmpAsset> createAsset(
            @Valid @RequestBody 
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                description = "Données de l'asset SNMP à créer",
                required = true,
                content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = SnmpAssetRequest.class),
                    examples = @ExampleObject(value = """
                        {
                          "name": "Router-Principal-01",
                          "ipAddress": "192.168.1.1",
                          "snmpPort": 161,
                          "snmpCommunity": "public",
                          "snmpVersion": "2c",
                          "description": "Routeur principal du réseau",
                          "location": "Salle serveur - Rack A1",
                          "deviceType": "router",
                          "status": "active",
                          "snmpProperties": {
                            "1.3.6.1.2.1.1.5.0": "sysName",
                            "1.3.6.1.2.1.1.1.0": "sysDescr"
                          }
                        }
                        """)
                )
            ) SnmpAssetRequest request) {
        
        logger.info("Demande de création d'asset SNMP: {}", request.getName());
        
        try {
            SnmpAsset createdAsset = snmpAssetService.createLocalAsset(request);
            logger.info("Asset SNMP créé avec succès: ID {}", createdAsset.getId());
            
            return ResponseEntity.status(HttpStatus.CREATED).body(createdAsset);
            
        } catch (RuntimeException e) {
            logger.error("Erreur lors de la création de l'asset: {}", e.getMessage());
            if (e.getMessage().contains("existe déjà")) {
                return ResponseEntity.status(HttpStatus.CONFLICT).build();
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PutMapping("/{id}")
    @Operation(
        summary = "Modifier un asset SNMP existant",
        description = "Met à jour les informations d'un asset SNMP existant dans la base de données locale."
    )
    @ApiResponses({
        @ApiResponse(
            responseCode = "200", 
            description = "Asset modifié avec succès",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = SnmpAsset.class)
            )
        ),
        @ApiResponse(responseCode = "400", description = "Données invalides"),
        @ApiResponse(responseCode = "404", description = "Asset non trouvé"),
        @ApiResponse(responseCode = "409", description = "Conflit avec une autre IP")
    })
    public ResponseEntity<SnmpAsset> updateAsset(
            @Parameter(description = "ID de l'asset à modifier", required = true, example = "1")
            @PathVariable Long id,
            
            @Valid @RequestBody 
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                description = "Nouvelles données de l'asset SNMP",
                required = true,
                content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = SnmpAssetRequest.class),
                    examples = @ExampleObject(value = """
                        {
                          "name": "Router-Principal-01-Updated",
                          "ipAddress": "192.168.1.1",
                          "snmpPort": 161,
                          "snmpCommunity": "private",
                          "snmpVersion": "2c",
                          "description": "Routeur principal du réseau - mis à jour",
                          "location": "Salle serveur - Rack A2",
                          "deviceType": "router",
                          "status": "maintenance"
                        }
                        """)
                )
            ) SnmpAssetRequest request) {
        
        logger.info("Demande de modification de l'asset SNMP ID: {}", id);
        
        try {
            SnmpAsset updatedAsset = snmpAssetService.updateLocalAsset(id, request);
            logger.info("Asset SNMP modifié avec succès: {}", updatedAsset.getName());
            
            return ResponseEntity.ok(updatedAsset);
            
        } catch (RuntimeException e) {
            logger.error("Erreur lors de la modification de l'asset {}: {}", id, e.getMessage());
            if (e.getMessage().contains("non trouvé")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            if (e.getMessage().contains("existe déjà")) {
                return ResponseEntity.status(HttpStatus.CONFLICT).build();
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @DeleteMapping("/{id}")
    @Operation(
        summary = "Supprimer un asset SNMP",
        description = "Supprime définitivement un asset SNMP de la base de données locale. " +
                     "Cette action est irréversible."
    )
    @ApiResponses({
        @ApiResponse(
            responseCode = "200", 
            description = "Asset supprimé avec succès",
            content = @Content(
                mediaType = "application/json",
                examples = @ExampleObject(value = """
                    {
                      "message": "Asset SNMP supprimé avec succès",
                      "id": 1
                    }
                    """)
            )
        ),
        @ApiResponse(responseCode = "404", description = "Asset non trouvé")
    })
    public ResponseEntity<Map<String, Object>> deleteAsset(
            @Parameter(description = "ID de l'asset à supprimer", required = true, example = "1")
            @PathVariable Long id) {
        
        logger.info("Demande de suppression de l'asset SNMP ID: {}", id);
        
        try {
            snmpAssetService.deleteLocalAsset(id);
            logger.info("Asset SNMP supprimé avec succès: ID {}", id);
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Asset SNMP supprimé avec succès");
            response.put("id", id);
            
            return ResponseEntity.ok(response);
            
        } catch (RuntimeException e) {
            logger.error("Erreur lors de la suppression de l'asset {}: {}", id, e.getMessage());
            if (e.getMessage().contains("non trouvé")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    @Operation(
        summary = "Récupérer un asset SNMP par ID",
        description = "Récupère les détails d'un asset SNMP spécifique depuis la base de données locale."
    )
    @ApiResponses({
        @ApiResponse(
            responseCode = "200", 
            description = "Asset trouvé",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = SnmpAsset.class)
            )
        ),
        @ApiResponse(responseCode = "404", description = "Asset non trouvé")
    })
    public ResponseEntity<SnmpAsset> getAssetById(
            @Parameter(description = "ID de l'asset à récupérer", required = true, example = "1")
            @PathVariable Long id) {
        
        logger.debug("Récupération de l'asset SNMP ID: {}", id);
        
        try {
            SnmpAsset asset = snmpAssetService.getLocalAssetById(id);
            return ResponseEntity.ok(asset);
            
        } catch (RuntimeException e) {
            logger.error("Asset non trouvé: ID {}", id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping
    @Operation(
        summary = "Lister tous les assets SNMP locaux",
        description = "Récupère la liste de tous les assets SNMP stockés dans la base de données locale."
    )
    @ApiResponse(
        responseCode = "200", 
        description = "Liste des assets retournée avec succès",
        content = @Content(
            mediaType = "application/json",
            examples = @ExampleObject(value = """
                [
                  {
                    "id": 1,
                    "name": "Router-Principal-01",
                    "ipAddress": "192.168.1.1",
                    "snmpPort": 161,
                    "snmpCommunity": "public",
                    "snmpVersion": "2c",
                    "description": "Routeur principal du réseau",
                    "location": "Salle serveur - Rack A1",
                    "deviceType": "router",
                    "status": "active",
                    "createdAt": "2025-06-19T10:30:00",
                    "updatedAt": "2025-06-19T10:30:00"
                  }
                ]
                """)
        )
    )
    public ResponseEntity<List<SnmpAsset>> getAllLocalAssets() {
        logger.debug("Récupération de tous les assets SNMP locaux");
        
        List<SnmpAsset> assets = snmpAssetService.getAllLocalAssets();
        logger.debug("Trouvé {} assets SNMP locaux", assets.size());
        
        return ResponseEntity.ok(assets);
    }

    @GetMapping("/status/{status}")
    @Operation(
        summary = "Lister les assets SNMP par statut",
        description = "Récupère la liste des assets SNMP ayant un statut spécifique."
    )
    @ApiResponse(
        responseCode = "200", 
        description = "Liste des assets retournée avec succès"
    )
    public ResponseEntity<List<SnmpAsset>> getAssetsByStatus(
            @Parameter(
                description = "Statut des assets à récupérer", 
                required = true, 
                example = "active",
                schema = @Schema(allowableValues = {"active", "inactive", "maintenance"})
            )
            @PathVariable String status) {
        
        logger.debug("Récupération des assets SNMP avec statut: {}", status);
        
        List<SnmpAsset> assets = snmpAssetService.getLocalAssetsByStatus(status);
        logger.debug("Trouvé {} assets SNMP avec statut {}", assets.size(), status);
        
        return ResponseEntity.ok(assets);
    }
} 