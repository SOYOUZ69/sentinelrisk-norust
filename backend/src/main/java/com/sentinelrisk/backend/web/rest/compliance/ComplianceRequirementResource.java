package com.sentinelrisk.backend.web.rest.compliance;

import com.sentinelrisk.backend.domain.compliance.ComplianceRequirement;
import com.sentinelrisk.backend.domain.compliance.ComplianceRequirement.RequirementType;
import com.sentinelrisk.backend.service.compliance.ComplianceRequirementService;
import com.sentinelrisk.backend.service.dto.compliance.ComplianceRequirementDTO;
import com.sentinelrisk.backend.service.mapper.ComplianceMapper;
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

@RestController
@RequestMapping("/api/compliance-requirements")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Compliance Requirements", description = "API pour la gestion des exigences de conformité")
public class ComplianceRequirementResource {

    private static final Logger logger = LoggerFactory.getLogger(ComplianceRequirementResource.class);

    private final ComplianceRequirementService requirementService;
    private final ComplianceMapper complianceMapper;

    /**
     * GET /api/compliance-requirements : Récupère toutes les exigences de conformité
     * Filtrage optionnel par ID de framework
     *
     * @param frameworkId ID du framework pour filtrer les exigences (optionnel)
     * @return ResponseEntity avec statut 200 (OK) et la liste des exigences dans le body
     */
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER', 'COMPLIANCE_OFFICER', 'AUDITOR')")
    @Operation(summary = "Récupère les exigences de conformité, avec filtrage optionnel par framework")
    @ApiResponse(responseCode = "200", description = "Liste des exigences récupérée avec succès",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ComplianceRequirementDTO.class)))
    public ResponseEntity<List<ComplianceRequirementDTO>> getRequirements(
            @Parameter(description = "ID du framework pour filtrer les exigences (optionnel)")
            @RequestParam(required = false) Long frameworkId,
            @Parameter(description = "Type d'exigence pour filtrer (optionnel)")
            @RequestParam(required = false) RequirementType type) {
        
        logger.debug("REST request pour récupérer les exigences de conformité avec frameworkId: {} et type: {}", frameworkId, type);
        
        List<ComplianceRequirement> requirements;
        
        if (frameworkId != null && type != null) {
            // Filtre par framework et type
            requirements = requirementService.getRequirementsByTypeAndFramework(type, frameworkId);
        } else if (frameworkId != null) {
            // Filtre par framework uniquement
            requirements = requirementService.getRequirementsByFramework(frameworkId);
        } else {
            // Pas de filtre, récupérer toutes les exigences
            requirements = requirementService.getAllRequirements();
        }
        
        List<ComplianceRequirementDTO> requirementDTOs = complianceMapper.requirementsToDto(requirements);
        return ResponseEntity.ok().body(requirementDTOs);
    }

    /**
     * GET /api/compliance-requirements/{id} : Récupère une exigence par son ID
     *
     * @param id l'ID de l'exigence à récupérer
     * @return ResponseEntity avec statut 200 (OK) et l'exigence dans le body, ou statut 404 (Not Found)
     */
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER', 'COMPLIANCE_OFFICER', 'AUDITOR')")
    @Operation(summary = "Récupère une exigence de conformité par son ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Exigence trouvée",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ComplianceRequirementDTO.class))),
            @ApiResponse(responseCode = "404", description = "Exigence non trouvée", content = @Content)
    })
    public ResponseEntity<ComplianceRequirementDTO> getRequirement(
            @Parameter(description = "ID de l'exigence à récupérer", required = true) @PathVariable Long id) {
        logger.debug("REST request pour récupérer l'exigence : {}", id);
        ComplianceRequirement requirement = requirementService.getRequirementById(id);
        ComplianceRequirementDTO requirementDTO = complianceMapper.toRequirementDto(requirement);
        return ResponseEntity.ok().body(requirementDTO);
    }

    /**
     * POST /api/compliance-requirements : Crée une nouvelle exigence de conformité
     *
     * @param requirement l'exigence à créer
     * @return ResponseEntity avec statut 201 (Created) et la nouvelle exigence dans le body
     * @throws URISyntaxException si l'URI est incorrecte
     */
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'COMPLIANCE_OFFICER')")
    @Operation(summary = "Crée une nouvelle exigence de conformité")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Exigence créée avec succès",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ComplianceRequirementDTO.class))),
            @ApiResponse(responseCode = "400", description = "Données invalides ou exigence déjà existante", content = @Content)
    })
    public ResponseEntity<ComplianceRequirementDTO> createRequirement(
            @Parameter(description = "Exigence à créer", required = true) @Valid @RequestBody ComplianceRequirement requirement) throws URISyntaxException {
        logger.debug("REST request pour créer une exigence : {}", requirement);
        ComplianceRequirement result = requirementService.createRequirement(requirement);
        ComplianceRequirementDTO resultDTO = complianceMapper.toRequirementDto(result);
        return ResponseEntity
                .created(new URI("/api/compliance-requirements/" + result.getId()))
                .body(resultDTO);
    }

    /**
     * PUT /api/compliance-requirements/{id} : Met à jour une exigence existante
     *
     * @param id l'ID de l'exigence à mettre à jour
     * @param requirement les données mises à jour
     * @return ResponseEntity avec statut 200 (OK) et l'exigence mise à jour dans le body
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'COMPLIANCE_OFFICER')")
    @Operation(summary = "Met à jour une exigence de conformité")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Exigence mise à jour avec succès",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ComplianceRequirementDTO.class))),
            @ApiResponse(responseCode = "400", description = "Données invalides", content = @Content),
            @ApiResponse(responseCode = "404", description = "Exigence non trouvée", content = @Content)
    })
    public ResponseEntity<ComplianceRequirementDTO> updateRequirement(
            @Parameter(description = "ID de l'exigence à mettre à jour", required = true) @PathVariable Long id,
            @Parameter(description = "Exigence avec les données mises à jour", required = true) @Valid @RequestBody ComplianceRequirement requirement) {
        logger.debug("REST request pour mettre à jour l'exigence : {}", requirement);
        ComplianceRequirement result = requirementService.updateRequirement(id, requirement);
        ComplianceRequirementDTO resultDTO = complianceMapper.toRequirementDto(result);
        return ResponseEntity.ok().body(resultDTO);
    }

    /**
     * DELETE /api/compliance-requirements/{id} : Supprime une exigence par son ID
     *
     * @param id l'ID de l'exigence à supprimer
     * @return ResponseEntity avec statut 204 (NO_CONTENT)
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Supprime une exigence de conformité")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Exigence supprimée avec succès"),
            @ApiResponse(responseCode = "404", description = "Exigence non trouvée", content = @Content)
    })
    public ResponseEntity<Void> deleteRequirement(
            @Parameter(description = "ID de l'exigence à supprimer", required = true) @PathVariable Long id) {
        logger.debug("REST request pour supprimer l'exigence : {}", id);
        requirementService.deleteRequirement(id);
        return ResponseEntity.noContent().build();
    }
} 