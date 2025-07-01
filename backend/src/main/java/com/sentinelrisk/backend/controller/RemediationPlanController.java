package com.sentinelrisk.backend.controller;

import com.sentinelrisk.backend.service.compliance.RemediationPlanService;
import com.sentinelrisk.backend.service.dto.compliance.RemediationPlanDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/remediation-plans")
@RequiredArgsConstructor
@Tag(name = "Remediation Plan Management", description = "Endpoints pour la gestion des plans de remédiation")
public class RemediationPlanController {

    private final RemediationPlanService remediationPlanService;

    @GetMapping
    @Operation(summary = "Lister tous les plans de remédiation", description = "Récupère la liste complète des plans de remédiation")
    @ApiResponse(responseCode = "200", description = "Liste des plans récupérée avec succès")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_RISK_MANAGER', 'ROLE_COMPLIANCE_OFFICER', 'ROLE_AUDITOR', 'ROLE_USER')")
    public ResponseEntity<List<RemediationPlanDTO>> getAllRemediationPlans() {
        return ResponseEntity.ok(remediationPlanService.getAllPlans());
    }

    
    @GetMapping("/{id}")
    @Operation(summary = "Obtenir un plan de remédiation par ID", description = "Récupère les détails d'un plan spécifique via son ID")
    @ApiResponse(responseCode = "200", description = "Plan trouvé")
    @ApiResponse(responseCode = "404", description = "Plan non trouvé")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_RISK_MANAGER', 'ROLE_COMPLIANCE_OFFICER', 'ROLE_AUDITOR', 'ROLE_USER')")
    public ResponseEntity<RemediationPlanDTO> getRemediationPlanById(
            @Parameter(description = "ID du plan à récupérer") 
            @PathVariable Long id) {
        return ResponseEntity.ok(remediationPlanService.getPlanById(id));
    }

    @PostMapping
    @Operation(summary = "Créer un plan de remédiation", description = "Crée un nouveau plan de remédiation")
    @ApiResponse(responseCode = "201", description = "Plan créé avec succès")
    @ApiResponse(responseCode = "400", description = "Données du plan invalides")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_RISK_MANAGER', 'ROLE_COMPLIANCE_OFFICER')")
    public ResponseEntity<RemediationPlanDTO> createRemediationPlan(
            @Parameter(description = "Données du plan à créer") 
            @Valid @RequestBody RemediationPlanDTO planDTO) {
        RemediationPlanDTO createdPlan = remediationPlanService.createPlan(planDTO);
        return ResponseEntity.ok(createdPlan);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Mettre à jour un plan de remédiation", description = "Met à jour les informations d'un plan existant")
    @ApiResponse(responseCode = "200", description = "Plan mis à jour avec succès")
    @ApiResponse(responseCode = "404", description = "Plan non trouvé")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_RISK_MANAGER', 'ROLE_COMPLIANCE_OFFICER')")
    public ResponseEntity<RemediationPlanDTO> updateRemediationPlan(
            @Parameter(description = "ID du plan à mettre à jour") 
            @PathVariable Long id,
            @Parameter(description = "Nouvelles données du plan") 
            @Valid @RequestBody RemediationPlanDTO planDTO) {
        return ResponseEntity.ok(remediationPlanService.updatePlan(id, planDTO));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Supprimer un plan de remédiation", description = "Supprime un plan de remédiation")
    @ApiResponse(responseCode = "204", description = "Plan supprimé avec succès")
    @ApiResponse(responseCode = "404", description = "Plan non trouvé")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_RISK_MANAGER', 'ROLE_COMPLIANCE_OFFICER')")
    public ResponseEntity<Void> deleteRemediationPlan(
            @Parameter(description = "ID du plan à supprimer") 
            @PathVariable Long id) {
        remediationPlanService.deletePlan(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/mapping/{mappingId}")
    @Operation(summary = "Lister les plans par mapping", description = "Récupère la liste des plans associés à un mapping spécifique")
    @ApiResponse(responseCode = "200", description = "Liste des plans du mapping récupérée avec succès")
    @ApiResponse(responseCode = "404", description = "Mapping non trouvé")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_RISK_MANAGER', 'ROLE_COMPLIANCE_OFFICER', 'ROLE_AUDITOR', 'ROLE_USER')")
    public ResponseEntity<List<RemediationPlanDTO>> getPlansByMapping(
            @Parameter(description = "ID du mapping") 
            @PathVariable Long mappingId) {
        return ResponseEntity.ok(remediationPlanService.getPlansByMapping(mappingId));
    }

    @GetMapping("/owner/{ownerId}")
    @Operation(summary = "Lister les plans par propriétaire", description = "Récupère la liste des plans assignés à un utilisateur spécifique")
    @ApiResponse(responseCode = "200", description = "Liste des plans de l'utilisateur récupérée avec succès")
    @ApiResponse(responseCode = "404", description = "Utilisateur non trouvé")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_RISK_MANAGER', 'ROLE_COMPLIANCE_OFFICER', 'ROLE_AUDITOR', 'ROLE_USER')")
    public ResponseEntity<List<RemediationPlanDTO>> getPlansByOwner(
            @Parameter(description = "ID de l'utilisateur") 
            @PathVariable String ownerId) {
        return ResponseEntity.ok(remediationPlanService.getPlansByOwner(ownerId));
    }
} 