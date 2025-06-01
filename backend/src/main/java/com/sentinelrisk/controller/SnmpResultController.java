package com.sentinelrisk.controller;

import com.sentinelrisk.model.SnmpScanResult;
import com.sentinelrisk.service.SnmpScanResultService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/snmp/results")
@RequiredArgsConstructor
@Tag(name = "SNMP Results", description = "API de gestion des résultats de scan SNMP")
public class SnmpResultController {

    private final SnmpScanResultService resultService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER')")
    @Operation(summary = "Récupérer tous les résultats de scan avec pagination")
    public ResponseEntity<Page<SnmpScanResult>> getAllResults(Pageable pageable) {
        return ResponseEntity.ok(resultService.getAllResults(pageable));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER')")
    @Operation(summary = "Récupérer un résultat par son ID")
    public ResponseEntity<SnmpScanResult> getResultById(@PathVariable Long id) {
        return resultService.getResultById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/asset/{assetId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER')")
    @Operation(summary = "Récupérer les résultats par asset")
    public ResponseEntity<List<SnmpScanResult>> getResultsByAsset(
            @PathVariable Long assetId,
            Pageable pageable) {
        Page<SnmpScanResult> results = resultService.getResultsByAssetId(assetId, pageable);
        return ResponseEntity.ok(results.getContent());
    }

    @GetMapping("/config/{configId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER')")
    @Operation(summary = "Récupérer les résultats par configuration")
    public ResponseEntity<List<SnmpScanResult>> getResultsByConfig(
            @PathVariable Long configId,
            Pageable pageable) {
        Page<SnmpScanResult> results = resultService.getResultsByConfigId(configId, pageable);
        return ResponseEntity.ok(results.getContent());
    }

    @GetMapping("/status/{status}")
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER')")
    @Operation(summary = "Récupérer les résultats par statut")
    public ResponseEntity<List<SnmpScanResult>> getResultsByStatus(
            @PathVariable SnmpScanResult.ScanStatus status,
            Pageable pageable) {
        Page<SnmpScanResult> results = resultService.getResultsByStatus(status, pageable);
        return ResponseEntity.ok(results.getContent());
    }

    @GetMapping("/period")
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER')")
    @Operation(summary = "Récupérer les résultats par période")
    public ResponseEntity<List<SnmpScanResult>> getResultsByPeriod(
            @RequestParam LocalDateTime startDate,
            @RequestParam LocalDateTime endDate,
            Pageable pageable) {
        Page<SnmpScanResult> results = resultService.getResultsByPeriod(startDate, endDate, pageable);
        return ResponseEntity.ok(results.getContent());
    }

    @GetMapping("/latest/asset/{assetId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER')")
    @Operation(summary = "Récupérer le dernier résultat pour un asset")
    public ResponseEntity<SnmpScanResult> getLatestResultByAsset(@PathVariable Long assetId) {
        return resultService.getLatestResultByAssetId(assetId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/latest/config/{configId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER')")
    @Operation(summary = "Récupérer le dernier résultat pour une configuration")
    public ResponseEntity<SnmpScanResult> getLatestResultByConfig(@PathVariable Long configId) {
        return resultService.getLatestResultByConfigId(configId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/statistics/success-rate")
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER')")
    @Operation(summary = "Statistiques du taux de succès des scans")
    public ResponseEntity<Double> getSuccessRate() {
        return ResponseEntity.ok(resultService.getSuccessRate());
    }

    @GetMapping("/statistics/by-status")
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER')")
    @Operation(summary = "Statistiques des résultats par statut")
    public ResponseEntity<List<Object[]>> getResultStatisticsByStatus() {
        return ResponseEntity.ok(resultService.countResultsByStatus());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Supprimer un résultat de scan")
    public ResponseEntity<Void> deleteResult(@PathVariable Long id) {
        try {
            resultService.deleteResult(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/cleanup")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Nettoyer les anciens résultats")
    public ResponseEntity<Integer> cleanupOldResults(@RequestParam(defaultValue = "30") int daysToKeep) {
        int deletedCount = resultService.cleanupOldResults(daysToKeep);
        return ResponseEntity.ok(deletedCount);
    }
} 