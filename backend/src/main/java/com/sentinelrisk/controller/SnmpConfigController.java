package com.sentinelrisk.controller;

import com.sentinelrisk.model.SnmpScanConfig;
import com.sentinelrisk.model.SnmpScanResult;
import com.sentinelrisk.service.SnmpScanConfigService;
import com.sentinelrisk.service.SnmpScanService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/snmp/configs")
@RequiredArgsConstructor
@Tag(name = "SNMP Configurations", description = "API de gestion des configurations de scan SNMP")
public class SnmpConfigController {

    private final SnmpScanConfigService configService;
    private final SnmpScanService scanService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER')")
    @Operation(summary = "Récupérer toutes les configurations de scan")
    public ResponseEntity<List<SnmpScanConfig>> getAllConfigs() {
        return ResponseEntity.ok(configService.getAllConfigs());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER')")
    @Operation(summary = "Récupérer une configuration par son ID")
    public ResponseEntity<SnmpScanConfig> getConfigById(@PathVariable Long id) {
        return configService.getConfigById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/active")
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER')")
    @Operation(summary = "Récupérer toutes les configurations actives")
    public ResponseEntity<List<SnmpScanConfig>> getActiveConfigs() {
        return ResponseEntity.ok(configService.getActiveConfigs());
    }

    @GetMapping("/asset/{assetId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER')")
    @Operation(summary = "Récupérer les configurations par asset")
    public ResponseEntity<List<SnmpScanConfig>> getConfigsByAsset(@PathVariable Long assetId) {
        return ResponseEntity.ok(configService.getConfigsByAssetId(assetId));
    }

    @GetMapping("/ready-for-execution")
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER')")
    @Operation(summary = "Récupérer les configurations prêtes pour l'exécution")
    public ResponseEntity<List<SnmpScanConfig>> getConfigsReadyForExecution() {
        return ResponseEntity.ok(configService.getConfigsReadyForExecution());
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER')")
    @Operation(summary = "Créer ou mettre à jour une configuration de scan")
    public ResponseEntity<SnmpScanConfig> createOrUpdateConfig(@Valid @RequestBody SnmpScanConfig config) {
        try {
            SnmpScanConfig savedConfig = configService.saveConfig(config);
            return ResponseEntity.ok(savedConfig);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER')")
    @Operation(summary = "Mettre à jour une configuration existante")
    public ResponseEntity<SnmpScanConfig> updateConfig(@PathVariable Long id, @Valid @RequestBody SnmpScanConfig config) {
        if (!configService.getConfigById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        try {
            SnmpScanConfig savedConfig = configService.saveConfig(config);
            return ResponseEntity.ok(savedConfig);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER')")
    @Operation(summary = "Supprimer une configuration de scan")
    public ResponseEntity<Void> deleteConfig(@PathVariable Long id) {
        try {
            configService.deleteConfig(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}/run")
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER')")
    @Operation(summary = "Lancer un scan manuel pour une configuration")
    public ResponseEntity<SnmpScanResult> runManualScan(@PathVariable Long id) {
        try {
            SnmpScanConfig config = configService.getConfigById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Configuration non trouvée"));
            
            SnmpScanResult result = scanService.executeScan(config);
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PatchMapping("/{id}/toggle-status")
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER')")
    @Operation(summary = "Activer/désactiver une configuration")
    public ResponseEntity<SnmpScanConfig> toggleConfigStatus(@PathVariable Long id) {
        try {
            SnmpScanConfig updatedConfig = configService.toggleConfigStatus(id);
            return ResponseEntity.ok(updatedConfig);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/statistics/by-asset")
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER')")
    @Operation(summary = "Statistiques des configurations par asset")
    public ResponseEntity<List<Object[]>> getConfigStatisticsByAsset() {
        return ResponseEntity.ok(configService.countConfigsByAsset());
    }
} 