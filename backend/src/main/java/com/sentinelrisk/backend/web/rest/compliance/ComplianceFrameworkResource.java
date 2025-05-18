package com.sentinelrisk.backend.web.rest.compliance;

import com.sentinelrisk.backend.domain.compliance.ComplianceFramework;
import com.sentinelrisk.backend.service.compliance.ComplianceFrameworkService;
import com.sentinelrisk.backend.service.dto.compliance.ComplianceFrameworkDTO;
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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/api/compliance-frameworks")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Compliance Frameworks", description = "API pour la gestion des référentiels normatifs de conformité")
public class ComplianceFrameworkResource {

    private static final Logger logger = LoggerFactory.getLogger(ComplianceFrameworkResource.class);

    private final ComplianceFrameworkService frameworkService;
    private final ComplianceMapper complianceMapper;

    /**
     * GET /api/compliance-frameworks : Récupère tous les frameworks de conformité
     *
     * @return ResponseEntity avec statut 200 (OK) et la liste des frameworks dans le body
     */
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER', 'COMPLIANCE_OFFICER', 'AUDITOR')")
    @Operation(summary = "Récupère tous les frameworks de conformité")
    @ApiResponse(responseCode = "200", description = "Liste des frameworks de conformité récupérée avec succès", 
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ComplianceFrameworkDTO.class)))
    public ResponseEntity<List<ComplianceFrameworkDTO>> getAllFrameworks() {
        logger.debug("REST request pour récupérer tous les frameworks de conformité");
        List<ComplianceFramework> frameworks = frameworkService.getAllFrameworks();
        List<ComplianceFrameworkDTO> frameworkDTOs = complianceMapper.frameworksToDto(frameworks);
        return ResponseEntity.ok().body(frameworkDTOs);
    }

    /**
     * GET /api/compliance-frameworks/{id} : Récupère un framework par son ID
     *
     * @param id l'ID du framework à récupérer
     * @return ResponseEntity avec statut 200 (OK) et le framework dans le body, ou statut 404 (Not Found)
     */
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER', 'COMPLIANCE_OFFICER', 'AUDITOR')")
    @Operation(summary = "Récupère un framework de conformité par son ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Framework trouvé", 
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ComplianceFrameworkDTO.class))),
            @ApiResponse(responseCode = "404", description = "Framework non trouvé", content = @Content)
    })
    public ResponseEntity<ComplianceFrameworkDTO> getFramework(
            @Parameter(description = "ID du framework à récupérer", required = true) @PathVariable Long id) {
        logger.debug("REST request pour récupérer le framework : {}", id);
        ComplianceFramework framework = frameworkService.getFrameworkById(id);
        ComplianceFrameworkDTO frameworkDTO = complianceMapper.toFrameworkDto(framework);
        return ResponseEntity.ok().body(frameworkDTO);
    }

    /**
     * POST /api/compliance-frameworks : Crée un nouveau framework de conformité
     *
     * @param framework le framework à créer
     * @return ResponseEntity avec statut 201 (Created) et le nouveau framework dans le body
     * @throws URISyntaxException si l'URI est incorrecte
     */
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'COMPLIANCE_OFFICER')")
    @Operation(summary = "Crée un nouveau framework de conformité")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Framework créé avec succès", 
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ComplianceFrameworkDTO.class))),
            @ApiResponse(responseCode = "400", description = "Données invalides ou framework déjà existant", content = @Content)
    })
    public ResponseEntity<ComplianceFrameworkDTO> createFramework(
            @Parameter(description = "Framework à créer", required = true) @Valid @RequestBody ComplianceFramework framework) throws URISyntaxException {
        logger.debug("REST request pour créer un framework : {}", framework);
        ComplianceFramework result = frameworkService.createFramework(framework);
        ComplianceFrameworkDTO resultDTO = complianceMapper.toFrameworkDto(result);
        return ResponseEntity
                .created(new URI("/api/compliance-frameworks/" + result.getId()))
                .body(resultDTO);
    }

    /**
     * PUT /api/compliance-frameworks/{id} : Met à jour un framework existant
     *
     * @param id l'ID du framework à mettre à jour
     * @param framework les données mises à jour
     * @return ResponseEntity avec statut 200 (OK) et le framework mis à jour dans le body
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'COMPLIANCE_OFFICER')")
    @Operation(summary = "Met à jour un framework de conformité")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Framework mis à jour avec succès", 
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ComplianceFrameworkDTO.class))),
            @ApiResponse(responseCode = "400", description = "Données invalides", content = @Content),
            @ApiResponse(responseCode = "404", description = "Framework non trouvé", content = @Content)
    })
    public ResponseEntity<ComplianceFrameworkDTO> updateFramework(
            @Parameter(description = "ID du framework à mettre à jour", required = true) @PathVariable Long id,
            @Parameter(description = "Framework avec les données mises à jour", required = true) @Valid @RequestBody ComplianceFramework framework) {
        logger.debug("REST request pour mettre à jour le framework : {}", framework);
        ComplianceFramework result = frameworkService.updateFramework(id, framework);
        ComplianceFrameworkDTO resultDTO = complianceMapper.toFrameworkDto(result);
        return ResponseEntity.ok().body(resultDTO);
    }

    /**
     * DELETE /api/compliance-frameworks/{id} : Supprime un framework par son ID
     *
     * @param id l'ID du framework à supprimer
     * @return ResponseEntity avec statut 204 (NO_CONTENT)
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Supprime un framework de conformité")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Framework supprimé avec succès"),
            @ApiResponse(responseCode = "404", description = "Framework non trouvé", content = @Content)
    })
    public ResponseEntity<Void> deleteFramework(
            @Parameter(description = "ID du framework à supprimer", required = true) @PathVariable Long id) {
        logger.debug("REST request pour supprimer le framework : {}", id);
        frameworkService.deleteFramework(id);
        return ResponseEntity.noContent().build();
    }
} 