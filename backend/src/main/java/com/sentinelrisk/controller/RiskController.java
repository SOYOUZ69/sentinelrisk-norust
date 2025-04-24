package com.sentinelrisk.controller;

import com.sentinelrisk.dto.RiskDTO;
import com.sentinelrisk.model.RiskLevel;
import com.sentinelrisk.model.RiskCategory;
import com.sentinelrisk.service.RiskService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/risks")
@RequiredArgsConstructor
@Tag(name = "Risks", description = "API de gestion des risques")
public class RiskController {
    private final RiskService riskService;

    @PostMapping
    @PreAuthorize("hasRole('RISK_MANAGER')")
    @Operation(summary = "Créer un nouveau risque")
    public ResponseEntity<RiskDTO> createRisk(@Valid @RequestBody RiskDTO riskDTO) {
        return ResponseEntity.ok(riskService.createRisk(riskDTO));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('RISK_MANAGER')")
    @Operation(summary = "Mettre à jour un risque existant")
    public ResponseEntity<RiskDTO> updateRisk(@PathVariable Long id, @Valid @RequestBody RiskDTO riskDTO) {
        return ResponseEntity.ok(riskService.updateRisk(id, riskDTO));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('RISK_MANAGER')")
    @Operation(summary = "Supprimer un risque")
    public ResponseEntity<Void> deleteRisk(@PathVariable Long id) {
        riskService.deleteRisk(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('RISK_MANAGER', 'RISK_VIEWER')")
    @Operation(summary = "Obtenir un risque par son ID")
    public ResponseEntity<RiskDTO> getRisk(@PathVariable Long id) {
        return ResponseEntity.ok(riskService.getRisk(id));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('RISK_MANAGER', 'RISK_VIEWER')")
    @Operation(summary = "Obtenir tous les risques")
    public ResponseEntity<List<RiskDTO>> getAllRisks() {
        return ResponseEntity.ok(riskService.getAllRisks());
    }

    @GetMapping("/by-level/{level}")
    @PreAuthorize("hasAnyRole('RISK_MANAGER', 'RISK_VIEWER')")
    @Operation(summary = "Obtenir les risques par niveau")
    public ResponseEntity<List<RiskDTO>> getRisksByLevel(@PathVariable RiskLevel level) {
        return ResponseEntity.ok(riskService.getRisksByLevel(level));
    }

    @GetMapping("/by-category/{category}")
    @PreAuthorize("hasAnyRole('RISK_MANAGER', 'RISK_VIEWER')")
    @Operation(summary = "Obtenir les risques par catégorie")
    public ResponseEntity<List<RiskDTO>> getRisksByCategory(@PathVariable RiskCategory category) {
        return ResponseEntity.ok(riskService.getRisksByCategory(category));
    }

    @GetMapping("/high-impact")
    @PreAuthorize("hasAnyRole('RISK_MANAGER', 'RISK_VIEWER')")
    @Operation(summary = "Obtenir les risques à fort impact")
    public ResponseEntity<List<RiskDTO>> getHighImpactRisks(@RequestParam(defaultValue = "0.7") double threshold) {
        return ResponseEntity.ok(riskService.getHighImpactRisks(threshold));
    }

    @GetMapping("/statistics/by-category")
    @PreAuthorize("hasAnyRole('RISK_MANAGER', 'RISK_VIEWER')")
    @Operation(summary = "Obtenir les statistiques des risques par catégorie")
    public ResponseEntity<Map<RiskCategory, Long>> getRiskStatisticsByCategory() {
        return ResponseEntity.ok(riskService.getRisksByCategories());
    }
} 