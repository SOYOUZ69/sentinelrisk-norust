package com.sentinelrisk.backend.web.rest.compliance;

import com.sentinelrisk.backend.domain.compliance.ComplianceRequirement;
import com.sentinelrisk.backend.domain.compliance.RiskComplianceMapping;
import com.sentinelrisk.backend.domain.compliance.RiskComplianceMapping.ComplianceStatus;
import com.sentinelrisk.backend.model.Risk;
import com.sentinelrisk.backend.service.compliance.RiskComplianceMappingService;
import com.sentinelrisk.backend.service.dto.compliance.ComplianceRequirementDTO;
import com.sentinelrisk.backend.service.dto.compliance.GapAnalysisResponse;
import com.sentinelrisk.backend.service.dto.compliance.RiskComplianceMappingDTO;
import com.sentinelrisk.backend.service.mapper.ComplianceMapper;
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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/api/risk-compliance-mappings")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Risk Compliance Mappings", description = "API pour la gestion des mappings entre risques et exigences de conformité")
public class RiskComplianceMappingResource {

    private static final Logger logger = LoggerFactory.getLogger(RiskComplianceMappingResource.class);

    private final RiskComplianceMappingService mappingService;
    private final ComplianceMapper complianceMapper;

    /**
     * GET /api/risk-compliance-mappings : Récupère tous les mappings de conformité
     * Avec filtrage optionnel par risque ou framework
     *
     * @param riskId ID du risque pour filtrer (optionnel)
     * @param frameworkId ID du framework pour filtrer (optionnel)
     * @return ResponseEntity avec statut 200 (OK) et la liste des mappings dans le body
     */
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER', 'COMPLIANCE_OFFICER', 'AUDITOR')")
    @Operation(summary = "Récupère les mappings de conformité, avec filtrage optionnel par risque ou framework")
    @ApiResponse(responseCode = "200", description = "Liste des mappings récupérée avec succès",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = RiskComplianceMappingDTO.class)))
    public ResponseEntity<List<RiskComplianceMappingDTO>> getMappings(
            @Parameter(description = "ID du risque pour filtrer (optionnel)") @RequestParam(required = false) Long riskId,
            @Parameter(description = "ID du framework pour filtrer (optionnel)") @RequestParam(required = false) Long frameworkId) {
        
        logger.debug("REST request pour récupérer les mappings de conformité avec riskId: {} et frameworkId: {}", riskId, frameworkId);
        
        List<RiskComplianceMapping> mappings;
        
        if (riskId != null) {
            // Filtre par risque
            mappings = mappingService.getMappingsByRisk(riskId);
        } else if (frameworkId != null) {
            // Filtre par framework
            mappings = mappingService.getMappingsByFramework(frameworkId);
        } else {
            // Pas de filtre, récupérer tous les mappings
            mappings = mappingService.getAllMappings();
        }
        
        List<RiskComplianceMappingDTO> mappingDTOs = complianceMapper.mappingsToDto(mappings);
        return ResponseEntity.ok().body(mappingDTOs);
    }

    /**
     * GET /api/risk-compliance-mappings/{id} : Récupère un mapping par son ID
     *
     * @param id l'ID du mapping à récupérer
     * @return ResponseEntity avec statut 200 (OK) et le mapping dans le body, ou statut 404 (Not Found)
     */
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER', 'COMPLIANCE_OFFICER', 'AUDITOR')")
    @Operation(summary = "Récupère un mapping de conformité par son ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Mapping trouvé",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = RiskComplianceMappingDTO.class))),
            @ApiResponse(responseCode = "404", description = "Mapping non trouvé", content = @Content)
    })
    public ResponseEntity<RiskComplianceMappingDTO> getMapping(
            @Parameter(description = "ID du mapping à récupérer", required = true) @PathVariable Long id) {
        logger.debug("REST request pour récupérer le mapping : {}", id);
        RiskComplianceMapping mapping = mappingService.getMappingById(id);
        RiskComplianceMappingDTO mappingDTO = complianceMapper.toMappingDto(mapping);
        return ResponseEntity.ok().body(mappingDTO);
    }

    /**
     * POST /api/risk-compliance-mappings : Crée un nouveau mapping de conformité
     *
     * @param mappingDTO le DTO contenant les données du mapping à créer
     * @return ResponseEntity avec statut 201 (Created) et le nouveau mapping dans le body
     * @throws URISyntaxException si l'URI est incorrecte
     */
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER', 'COMPLIANCE_OFFICER')")
    @Operation(summary = "Crée un nouveau mapping de conformité")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Mapping créé avec succès",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = RiskComplianceMappingDTO.class))),
            @ApiResponse(responseCode = "400", description = "Données invalides ou mapping déjà existant", content = @Content)
    })
    public ResponseEntity<RiskComplianceMappingDTO> createMapping(
            @Parameter(description = "DTO du mapping à créer", required = true) 
            @Valid @RequestBody RiskComplianceMappingDTO mappingDTO) throws URISyntaxException {
        logger.debug("REST request pour créer un mapping depuis DTO: {}", mappingDTO);
        
        // Vérifier les données essentielles
        if (mappingDTO.getRiskId() == null) {
            throw new BadRequestAlertException("Le riskId est obligatoire", "riskComplianceMapping", "idnull");
        }
        
        if (mappingDTO.getRequirementId() == null) {
            throw new BadRequestAlertException("Le requirementId est obligatoire", "riskComplianceMapping", "idnull");
        }
        
        // Créer une nouvelle instance de mapping
        RiskComplianceMapping mapping = new RiskComplianceMapping();
        
        // Associer les identifiants au lieu des entités complètes
        // Les entités seront chargées par le service
        Risk risk = new Risk();
        risk.setId(mappingDTO.getRiskId());
        mapping.setRisk(risk);
        
        ComplianceRequirement requirement = new ComplianceRequirement();
        requirement.setId(mappingDTO.getRequirementId());
        mapping.setRequirement(requirement);
        
        // Copier les autres propriétés
        mapping.setStatus(mappingDTO.getStatus());
        mapping.setEvidence(mappingDTO.getEvidence());
        mapping.setRemediationPlan(mappingDTO.getRemediationPlan());
        mapping.setComment(mappingDTO.getComment());
        
        RiskComplianceMapping result = mappingService.createMapping(mapping);
        RiskComplianceMappingDTO resultDTO = complianceMapper.toMappingDto(result);
        
        return ResponseEntity
                .created(new URI("/api/risk-compliance-mappings/" + result.getId()))
                .body(resultDTO);
    }

    /**
     * PUT /api/risk-compliance-mappings/{id} : Met à jour un mapping existant
     *
     * @param id l'ID du mapping à mettre à jour
     * @param mappingDTO les données mises à jour
     * @return ResponseEntity avec statut 200 (OK) et le mapping mis à jour dans le body
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER', 'COMPLIANCE_OFFICER')")
    @Operation(summary = "Met à jour un mapping de conformité")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Mapping mis à jour avec succès",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = RiskComplianceMappingDTO.class))),
            @ApiResponse(responseCode = "400", description = "Données invalides", content = @Content),
            @ApiResponse(responseCode = "404", description = "Mapping non trouvé", content = @Content)
    })
    public ResponseEntity<RiskComplianceMappingDTO> updateMapping(
            @Parameter(description = "ID du mapping à mettre à jour", required = true) @PathVariable Long id,
            @Parameter(description = "DTO avec les données mises à jour", required = true) @Valid @RequestBody RiskComplianceMappingDTO mappingDTO) {
        logger.debug("REST request pour mettre à jour le mapping : {}", mappingDTO);
        
        // Récupérer le mapping existant
        RiskComplianceMapping existingMapping = mappingService.getMappingById(id);
        
        // Mettre à jour uniquement les champs modifiables
        existingMapping.setStatus(mappingDTO.getStatus());
        existingMapping.setEvidence(mappingDTO.getEvidence());
        existingMapping.setRemediationPlan(mappingDTO.getRemediationPlan());
        existingMapping.setComment(mappingDTO.getComment());
        
        RiskComplianceMapping result = mappingService.updateMapping(id, existingMapping);
        RiskComplianceMappingDTO resultDTO = complianceMapper.toMappingDto(result);
        return ResponseEntity.ok().body(resultDTO);
    }

    /**
     * PATCH /api/risk-compliance-mappings/{id}/status : Met à jour uniquement le statut d'un mapping
     *
     * @param id l'ID du mapping à mettre à jour
     * @param status le nouveau statut de conformité
     * @return ResponseEntity avec statut 200 (OK) et le mapping mis à jour dans le body
     */
    @PatchMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER', 'COMPLIANCE_OFFICER')")
    @Operation(summary = "Met à jour le statut d'un mapping de conformité")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Statut mis à jour avec succès",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = RiskComplianceMappingDTO.class))),
            @ApiResponse(responseCode = "400", description = "Statut invalide", content = @Content),
            @ApiResponse(responseCode = "404", description = "Mapping non trouvé", content = @Content)
    })
    public ResponseEntity<RiskComplianceMappingDTO> updateMappingStatus(
            @Parameter(description = "ID du mapping à mettre à jour", required = true) @PathVariable Long id,
            @Parameter(description = "Nouveau statut de conformité", required = true) @RequestParam ComplianceStatus status) {
        logger.debug("REST request pour mettre à jour le statut du mapping {} vers {}", id, status);
        RiskComplianceMapping result = mappingService.updateMappingStatus(id, status);
        RiskComplianceMappingDTO resultDTO = complianceMapper.toMappingDto(result);
        return ResponseEntity.ok().body(resultDTO);
    }

    /**
     * DELETE /api/risk-compliance-mappings/{id} : Supprime un mapping par son ID
     *
     * @param id l'ID du mapping à supprimer
     * @return ResponseEntity avec statut 204 (NO_CONTENT)
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'COMPLIANCE_OFFICER')")
    @Operation(summary = "Supprime un mapping de conformité")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Mapping supprimé avec succès"),
            @ApiResponse(responseCode = "404", description = "Mapping non trouvé", content = @Content)
    })
    public ResponseEntity<Void> deleteMapping(
            @Parameter(description = "ID du mapping à supprimer", required = true) @PathVariable Long id) {
        logger.debug("REST request pour supprimer le mapping : {}", id);
        mappingService.deleteMapping(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * GET /api/risk-compliance-mappings/gap-analysis : Réalise une analyse des écarts pour un risque donné
     * par rapport à un framework spécifié
     *
     * @param riskId ID du risque
     * @param frameworkId ID du framework
     * @return Liste des exigences du framework qui ne sont pas encore mappées à ce risque
     */
    @GetMapping("/gap-analysis")
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER', 'COMPLIANCE_OFFICER')")
    @Operation(summary = "Réalise une analyse des écarts (gap analysis) pour un risque par rapport à un framework")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Analyse réalisée avec succès",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = GapAnalysisResponse.class))),
            @ApiResponse(responseCode = "400", description = "Paramètres manquants", content = @Content),
            @ApiResponse(responseCode = "404", description = "Risque ou framework non trouvé", content = @Content)
    })
    public ResponseEntity<GapAnalysisResponse> getGapAnalysis(
            @Parameter(description = "ID du risque", required = true) @RequestParam Long riskId,
            @Parameter(description = "ID du framework", required = true) @RequestParam Long frameworkId) {
        
        logger.debug("REST request pour l'analyse d'écarts entre le risque {} et le framework {}", riskId, frameworkId);
        
        GapAnalysisResponse response = mappingService.findGapAnalysis(riskId, frameworkId);
        return ResponseEntity.ok(response);
    }

    /**
     * GET /api/risk-compliance-mappings/compliance-percentage : Calcule le pourcentage de conformité
     * d'un risque par rapport à un framework
     *
     * @param riskId ID du risque
     * @param frameworkId ID du framework
     * @return Pourcentage de conformité
     */
    @GetMapping("/compliance-percentage")
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER', 'COMPLIANCE_OFFICER', 'AUDITOR')")
    @Operation(summary = "Calcule le pourcentage de conformité d'un risque par rapport à un framework")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Calcul réalisé avec succès"),
            @ApiResponse(responseCode = "400", description = "Paramètres manquants", content = @Content),
            @ApiResponse(responseCode = "404", description = "Risque ou framework non trouvé", content = @Content)
    })
    public ResponseEntity<Double> getCompliancePercentage(
            @Parameter(description = "ID du risque", required = true) @RequestParam Long riskId,
            @Parameter(description = "ID du framework", required = true) @RequestParam Long frameworkId) {
        logger.debug("REST request pour calculer le pourcentage de conformité entre le risque {} et le framework {}", riskId, frameworkId);
        double percentage = mappingService.calculateCompliancePercentage(riskId, frameworkId);
        return ResponseEntity.ok().body(percentage);
    }
} 