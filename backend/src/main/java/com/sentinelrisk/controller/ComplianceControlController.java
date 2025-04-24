package com.sentinelrisk.controller;

import com.sentinelrisk.dto.ComplianceControlDTO;
import com.sentinelrisk.model.ControlStatus;
import com.sentinelrisk.service.ComplianceControlService;
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
@RequestMapping("/compliance-controls")
@RequiredArgsConstructor
@Tag(name = "Compliance Controls", description = "API de gestion des contrôles de conformité")
public class ComplianceControlController {
    private final ComplianceControlService complianceControlService;

    @PostMapping
    @PreAuthorize("hasRole('COMPLIANCE_MANAGER')")
    @Operation(summary = "Créer un nouveau contrôle de conformité")
    public ResponseEntity<ComplianceControlDTO> createControl(@Valid @RequestBody ComplianceControlDTO controlDTO) {
        return ResponseEntity.ok(complianceControlService.createControl(controlDTO));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('COMPLIANCE_MANAGER')")
    @Operation(summary = "Mettre à jour un contrôle de conformité")
    public ResponseEntity<ComplianceControlDTO> updateControl(
            @PathVariable Long id,
            @Valid @RequestBody ComplianceControlDTO controlDTO) {
        return ResponseEntity.ok(complianceControlService.updateControl(id, controlDTO));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('COMPLIANCE_MANAGER')")
    @Operation(summary = "Supprimer un contrôle de conformité")
    public ResponseEntity<Void> deleteControl(@PathVariable Long id) {
        complianceControlService.deleteControl(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('COMPLIANCE_MANAGER', 'COMPLIANCE_VIEWER')")
    @Operation(summary = "Obtenir un contrôle de conformité par son ID")
    public ResponseEntity<ComplianceControlDTO> getControl(@PathVariable Long id) {
        return ResponseEntity.ok(complianceControlService.getControl(id));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('COMPLIANCE_MANAGER', 'COMPLIANCE_VIEWER')")
    @Operation(summary = "Obtenir tous les contrôles de conformité")
    public ResponseEntity<List<ComplianceControlDTO>> getAllControls() {
        return ResponseEntity.ok(complianceControlService.getAllControls());
    }

    @GetMapping("/by-status/{status}")
    @PreAuthorize("hasAnyRole('COMPLIANCE_MANAGER', 'COMPLIANCE_VIEWER')")
    @Operation(summary = "Obtenir les contrôles par statut")
    public ResponseEntity<List<ComplianceControlDTO>> getControlsByStatus(@PathVariable ControlStatus status) {
        return ResponseEntity.ok(complianceControlService.getControlsByStatus(status));
    }

    @GetMapping("/by-framework/{framework}")
    @PreAuthorize("hasAnyRole('COMPLIANCE_MANAGER', 'COMPLIANCE_VIEWER')")
    @Operation(summary = "Obtenir les contrôles par framework")
    public ResponseEntity<List<ComplianceControlDTO>> getControlsByFramework(@PathVariable String framework) {
        return ResponseEntity.ok(complianceControlService.getControlsByFramework(framework));
    }

    @GetMapping("/due-for-assessment")
    @PreAuthorize("hasAnyRole('COMPLIANCE_MANAGER', 'COMPLIANCE_VIEWER')")
    @Operation(summary = "Obtenir les contrôles qui nécessitent une évaluation")
    public ResponseEntity<List<ComplianceControlDTO>> getControlsDueForAssessment() {
        return ResponseEntity.ok(complianceControlService.getControlsDueForAssessment());
    }

    @GetMapping("/statistics/by-framework")
    @PreAuthorize("hasAnyRole('COMPLIANCE_MANAGER', 'COMPLIANCE_VIEWER')")
    @Operation(summary = "Obtenir les statistiques des contrôles par framework")
    public ResponseEntity<Map<String, Long>> getControlStatisticsByFramework() {
        return ResponseEntity.ok(complianceControlService.getControlsByFrameworkStats());
    }

    @GetMapping("/statistics/by-status")
    @PreAuthorize("hasAnyRole('COMPLIANCE_MANAGER', 'COMPLIANCE_VIEWER')")
    @Operation(summary = "Obtenir les statistiques des contrôles par statut")
    public ResponseEntity<Map<ControlStatus, Long>> getControlStatisticsByStatus() {
        return ResponseEntity.ok(complianceControlService.getControlsByStatusStats());
    }
} 