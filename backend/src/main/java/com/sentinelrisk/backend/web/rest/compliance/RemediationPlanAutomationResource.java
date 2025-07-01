package com.sentinelrisk.backend.web.rest.compliance;

import com.sentinelrisk.backend.domain.compliance.RemediationPlan;
import com.sentinelrisk.backend.model.User;
import com.sentinelrisk.backend.service.compliance.RemediationPlanService;
import com.sentinelrisk.backend.service.dto.compliance.RemediationPlanDTO;
import com.sentinelrisk.backend.web.rest.errors.BadRequestAlertException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Contrôleur REST pour l'automatisation des plans de remédiation.
 * Gère les mises à jour d'efficacité et de statut avec application automatique de la logique métier.
 */
@RestController
@RequestMapping("/api/remediation-plans/automation")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Remediation Plan Automation", description = "API pour l'automatisation des plans de remédiation")
public class RemediationPlanAutomationResource {

    private final RemediationPlanService remediationPlanService;

    /**
     * PUT /api/remediation-plans/automation/{id}/efficacite : Met à jour l'efficacité d'un plan
     * et applique automatiquement la logique d'impact sur le risque
     *
     * @param id ID du plan à mettre à jour
     * @param request DTO contenant la nouvelle efficacité et la raison du changement
     * @return ResponseEntity avec statut 200 (OK) et le plan mis à jour dans le body
     */
    @PutMapping("/{id}/efficacite")
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER', 'COMPLIANCE_OFFICER')")
    @Operation(summary = "Met à jour l'efficacité d'un plan et applique la logique d'impact sur le risque")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Efficacité mise à jour avec succès",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = RemediationPlanDTO.class))),
            @ApiResponse(responseCode = "400", description = "Données invalides", content = @Content),
            @ApiResponse(responseCode = "404", description = "Plan non trouvé", content = @Content)
    })
    public ResponseEntity<RemediationPlanDTO> updatePlanEfficacite(
            @Parameter(description = "ID du plan à mettre à jour", required = true) @PathVariable Long id,
            @Parameter(description = "Données de mise à jour", required = true) 
            @Valid @RequestBody EfficaciteUpdateRequest request) {
        
        log.debug("REST request pour mettre à jour l'efficacité du plan : {} avec efficacité : {}", id, request.getEfficacite());
        
        // TODO: Récupérer l'utilisateur connecté depuis le contexte de sécurité
        User currentUser = getCurrentUser();
        
        RemediationPlanDTO updatedPlan = remediationPlanService.updatePlanEfficacite(
            id, request.getEfficacite(), currentUser, request.getChangeReason()
        );
        
        return ResponseEntity.ok().body(updatedPlan);
    }

    /**
     * PUT /api/remediation-plans/automation/{id}/status : Met à jour le statut d'un plan
     * et applique automatiquement la logique d'impact sur le risque
     *
     * @param id ID du plan à mettre à jour
     * @param request DTO contenant le nouveau statut et la raison du changement
     * @return ResponseEntity avec statut 200 (OK) et le plan mis à jour dans le body
     */
    @PutMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER', 'COMPLIANCE_OFFICER')")
    @Operation(summary = "Met à jour le statut d'un plan et applique la logique d'impact sur le risque")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Statut mis à jour avec succès",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = RemediationPlanDTO.class))),
            @ApiResponse(responseCode = "400", description = "Données invalides", content = @Content),
            @ApiResponse(responseCode = "404", description = "Plan non trouvé", content = @Content)
    })
    public ResponseEntity<RemediationPlanDTO> updatePlanStatus(
            @Parameter(description = "ID du plan à mettre à jour", required = true) @PathVariable Long id,
            @Parameter(description = "Données de mise à jour", required = true) 
            @Valid @RequestBody StatusUpdateRequest request) {
        
        log.debug("REST request pour mettre à jour le statut du plan : {} avec statut : {}", id, request.getStatus());
        
        // TODO: Récupérer l'utilisateur connecté depuis le contexte de sécurité
        User currentUser = getCurrentUser();
        
        RemediationPlanDTO updatedPlan = remediationPlanService.updatePlanStatus(
            id, request.getStatus(), currentUser, request.getChangeReason()
        );
        
        return ResponseEntity.ok().body(updatedPlan);
    }

    /**
     * POST /api/remediation-plans/automation/{id}/complete : Marque un plan comme terminé
     * avec une efficacité donnée et applique automatiquement la logique d'impact
     *
     * @param id ID du plan à terminer
     * @param request DTO contenant l'efficacité finale et la raison
     * @return ResponseEntity avec statut 200 (OK) et le plan mis à jour dans le body
     */
    @PostMapping("/{id}/complete")
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER', 'COMPLIANCE_OFFICER')")
    @Operation(summary = "Termine un plan avec une efficacité donnée et applique la logique d'impact")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Plan terminé avec succès",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = RemediationPlanDTO.class))),
            @ApiResponse(responseCode = "400", description = "Données invalides", content = @Content),
            @ApiResponse(responseCode = "404", description = "Plan non trouvé", content = @Content)
    })
    public ResponseEntity<RemediationPlanDTO> completePlan(
            @Parameter(description = "ID du plan à terminer", required = true) @PathVariable Long id,
            @Parameter(description = "Données de finalisation", required = true) 
            @Valid @RequestBody PlanCompletionRequest request) {
        
        log.debug("REST request pour terminer le plan : {} avec efficacité : {}", id, request.getEfficacite());
        
        // TODO: Récupérer l'utilisateur connecté depuis le contexte de sécurité
        User currentUser = getCurrentUser();
        
        // Mettre à jour l'efficacité
        RemediationPlanDTO planWithEfficacite = remediationPlanService.updatePlanEfficacite(
            id, request.getEfficacite(), currentUser, request.getChangeReason()
        );
        
        // Mettre à jour le statut à DONE
        RemediationPlanDTO completedPlan = remediationPlanService.updatePlanStatus(
            id, RemediationPlan.Status.DONE, currentUser, "Plan marqué comme terminé"
        );
        
        return ResponseEntity.ok().body(completedPlan);
    }

    /**
     * GET /api/remediation-plans/automation/rules : Récupère les règles métier d'automatisation
     *
     * @return ResponseEntity avec statut 200 (OK) et les règles dans le body
     */
    @GetMapping("/rules")
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER', 'COMPLIANCE_OFFICER', 'AUDITOR')")
    @Operation(summary = "Récupère les règles métier d'automatisation des plans d'action")
    @ApiResponse(responseCode = "200", description = "Règles récupérées avec succès")
    public ResponseEntity<Map<String, Object>> getAutomationRules() {
        Map<String, Object> rules = Map.of(
            "efficaciteSeuil", Map.of(
                "minimum", 0,
                "maximum", 100,
                "seuilReductionImpact", 70,
                "seuilAucunEffet", 30
            ),
            "statutReductionImpact", "DONE",
            "impactReduction", "Réduction d'un niveau (ex: SEVERE -> MAJOR)",
            "conditions", Map.of(
                "reductionImpact", "Efficacité ≥ 70% ET statut = DONE",
                "aucunEffet", "Efficacité < 30% OU statut ≠ DONE",
                "zoneNeutre", "30% ≤ Efficacité < 70% ET statut = DONE"
            )
        );
        
        return ResponseEntity.ok().body(rules);
    }

    /**
     * Méthode temporaire pour récupérer l'utilisateur connecté.
     * TODO: Implémenter la récupération depuis le contexte de sécurité
     */
    private User getCurrentUser() {
        // TODO: Récupérer l'utilisateur connecté depuis le contexte de sécurité
        // Pour l'instant, on retourne un utilisateur par défaut
        User defaultUser = new User();
        defaultUser.setId("system");
        defaultUser.setFirstName("System");
        defaultUser.setLastName("User");
        return defaultUser;
    }

    /**
     * DTO pour la mise à jour d'efficacité
     */
    public static class EfficaciteUpdateRequest {
        private Integer efficacite;
        private String changeReason;

        public Integer getEfficacite() { return efficacite; }
        public void setEfficacite(Integer efficacite) { this.efficacite = efficacite; }
        public String getChangeReason() { return changeReason; }
        public void setChangeReason(String changeReason) { this.changeReason = changeReason; }
    }

    /**
     * DTO pour la mise à jour de statut
     */
    public static class StatusUpdateRequest {
        private RemediationPlan.Status status;
        private String changeReason;

        public RemediationPlan.Status getStatus() { return status; }
        public void setStatus(RemediationPlan.Status status) { this.status = status; }
        public String getChangeReason() { return changeReason; }
        public void setChangeReason(String changeReason) { this.changeReason = changeReason; }
    }

    /**
     * DTO pour la finalisation d'un plan
     */
    public static class PlanCompletionRequest {
        private Integer efficacite;
        private String changeReason;

        public Integer getEfficacite() { return efficacite; }
        public void setEfficacite(Integer efficacite) { this.efficacite = efficacite; }
        public String getChangeReason() { return changeReason; }
        public void setChangeReason(String changeReason) { this.changeReason = changeReason; }
    }
} 