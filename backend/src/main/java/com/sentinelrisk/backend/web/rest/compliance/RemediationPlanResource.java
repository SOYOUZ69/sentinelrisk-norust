package com.sentinelrisk.backend.web.rest.compliance;

import com.sentinelrisk.backend.service.compliance.RemediationPlanService;
import com.sentinelrisk.backend.service.dto.compliance.RemediationPlanDTO;
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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

/**
 * REST controller pour gérer les plans de remédiation (RemediationPlan).
 */
@RestController
@RequestMapping("/api/remediation-plans")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Remediation Plans", description = "API pour la gestion des plans de remédiation des écarts de conformité")
public class RemediationPlanResource {

    private static final Logger logger = LoggerFactory.getLogger(RemediationPlanResource.class);

    private final RemediationPlanService remediationPlanService;

    /**
     * GET /api/remediation-plans : Récupère tous les plans de remédiation
     * Avec filtrage optionnel par mapping
     *
     * @param mappingId ID du mapping pour filtrer (optionnel)
     * @param ownerId ID de l'utilisateur responsable pour filtrer (optionnel)
     * @return ResponseEntity avec statut 200 (OK) et la liste des plans dans le body
     */
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER', 'COMPLIANCE_OFFICER', 'AUDITOR')")
    @Operation(summary = "Récupère les plans de remédiation, avec filtrage optionnel par mapping ou propriétaire")
    @ApiResponse(responseCode = "200", description = "Liste des plans récupérée avec succès",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = RemediationPlanDTO.class)))
    public ResponseEntity<List<RemediationPlanDTO>> getPlans(
            @Parameter(description = "ID du mapping pour filtrer (optionnel)") @RequestParam(required = false) Long mappingId,
            @Parameter(description = "ID de l'utilisateur responsable pour filtrer (optionnel)") @RequestParam(required = false) String ownerId) {
        
        logger.debug("REST request pour récupérer les plans de remédiation avec mappingId: {} et ownerId: {}", mappingId, ownerId);
        
        List<RemediationPlanDTO> plans;
        
        if (mappingId != null) {
            // Filtre par mapping
            plans = remediationPlanService.getPlansByMapping(mappingId);
        } else if (ownerId != null) {
            // Filtre par utilisateur responsable
            plans = remediationPlanService.getPlansByOwner(ownerId);
        } else {
            // Pas de filtre, récupérer tous les plans
            plans = remediationPlanService.getAllPlans();
        }
        
        return ResponseEntity.ok().body(plans);
    }

    /**
     * GET /api/remediation-plans/{id} : Récupère un plan par son ID
     *
     * @param id l'ID du plan à récupérer
     * @return ResponseEntity avec statut 200 (OK) et le plan dans le body, ou statut 404 (Not Found)
     */
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER', 'COMPLIANCE_OFFICER', 'AUDITOR')")
    @Operation(summary = "Récupère un plan de remédiation par son ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Plan trouvé",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = RemediationPlanDTO.class))),
            @ApiResponse(responseCode = "404", description = "Plan non trouvé", content = @Content)
    })
    public ResponseEntity<RemediationPlanDTO> getPlan(
            @Parameter(description = "ID du plan à récupérer", required = true) @PathVariable Long id) {
        logger.debug("REST request pour récupérer le plan de remédiation : {}", id);
        RemediationPlanDTO plan = remediationPlanService.getPlanById(id);
        return ResponseEntity.ok().body(plan);
    }

    /**
     * POST /api/remediation-plans : Crée un nouveau plan de remédiation
     *
     * @param planDTO le DTO contenant les données du plan à créer
     * @return ResponseEntity avec statut 201 (Created) et le nouveau plan dans le body
     * @throws URISyntaxException si l'URI est incorrecte
     */
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER', 'COMPLIANCE_OFFICER')")
    @Operation(summary = "Crée un nouveau plan de remédiation")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Plan créé avec succès",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = RemediationPlanDTO.class))),
            @ApiResponse(responseCode = "400", description = "Données invalides", content = @Content)
    })
    public ResponseEntity<RemediationPlanDTO> createPlan(
            @Parameter(description = "DTO du plan à créer", required = true) 
            @Valid @RequestBody RemediationPlanDTO planDTO) throws URISyntaxException {
        logger.debug("REST request pour créer un plan de remédiation : {}", planDTO);
        logger.debug("Création plan : mappingId reçu = {}", planDTO.getMappingId());
        
        RemediationPlanDTO result = remediationPlanService.createPlan(planDTO);
        
        return ResponseEntity
                .created(new URI("/api/remediation-plans/" + result.getId()))
                .body(result);
    }

    /**
     * PUT /api/remediation-plans/{id} : Met à jour un plan existant
     *
     * @param id l'ID du plan à mettre à jour
     * @param planDTO les données mises à jour
     * @return ResponseEntity avec statut 200 (OK) et le plan mis à jour dans le body
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER', 'COMPLIANCE_OFFICER')")
    @Operation(summary = "Met à jour un plan de remédiation")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Plan mis à jour avec succès",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = RemediationPlanDTO.class))),
            @ApiResponse(responseCode = "400", description = "Données invalides", content = @Content),
            @ApiResponse(responseCode = "404", description = "Plan non trouvé", content = @Content)
    })
    public ResponseEntity<RemediationPlanDTO> updatePlan(
            @Parameter(description = "ID du plan à mettre à jour", required = true) @PathVariable Long id,
            @Parameter(description = "DTO avec les données mises à jour", required = true) @Valid @RequestBody RemediationPlanDTO planDTO) {
        logger.debug("REST request pour mettre à jour le plan de remédiation : {}", planDTO);
        
        RemediationPlanDTO result = remediationPlanService.updatePlan(id, planDTO);
        
        return ResponseEntity.ok().body(result);
    }

    /**
     * DELETE /api/remediation-plans/{id} : Supprime un plan par son ID
     *
     * @param id l'ID du plan à supprimer
     * @return ResponseEntity avec statut 204 (NO_CONTENT)
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'COMPLIANCE_OFFICER')")
    @Operation(summary = "Supprime un plan de remédiation")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Plan supprimé avec succès"),
            @ApiResponse(responseCode = "404", description = "Plan non trouvé", content = @Content)
    })
    public ResponseEntity<Void> deletePlan(
            @Parameter(description = "ID du plan à supprimer", required = true) @PathVariable Long id) {
        logger.debug("REST request pour supprimer le plan de remédiation : {}", id);
        remediationPlanService.deletePlan(id);
        return ResponseEntity.noContent().build();
    }
} 