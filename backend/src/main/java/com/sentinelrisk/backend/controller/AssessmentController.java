package com.sentinelrisk.backend.controller;

import com.sentinelrisk.backend.dto.AssessmentDTO;
import com.sentinelrisk.backend.model.Assessment;
import com.sentinelrisk.backend.model.Risk;
import com.sentinelrisk.backend.model.User;
import com.sentinelrisk.backend.service.AssessmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/assessments")
@Tag(name = "Assessment Management", description = "Endpoints pour la gestion des évaluations de risque")
public class AssessmentController {

    private final AssessmentService assessmentService;
    
    @Autowired
    public AssessmentController(AssessmentService assessmentService) {
        this.assessmentService = assessmentService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Lister toutes les évaluations",
            description = "Récupère la liste complète des évaluations de risque")
    @ApiResponse(responseCode = "200", description = "Liste des évaluations récupérée avec succès")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_COMPLIANCE_OFFICER', 'ROLE_RISK_MANAGER', 'ROLE_AUDITOR')")
    public ResponseEntity<List<Map<String, Object>>> getAllAssessments() {
        List<Assessment> assessments = assessmentService.getAllAssessments();
        List<Map<String, Object>> responseList = new ArrayList<>();
        
        for (Assessment assessment : assessments) {
            Map<String, Object> assessmentMap = convertAssessmentToMap(assessment);
            responseList.add(assessmentMap);
        }
        
        return ResponseEntity.ok(responseList);
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Obtenir une évaluation par ID",
            description = "Récupère les détails d'une évaluation spécifique via son ID")
    @ApiResponse(responseCode = "200", description = "Évaluation trouvée")
    @ApiResponse(responseCode = "404", description = "Évaluation non trouvée")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_COMPLIANCE_OFFICER', 'ROLE_RISK_MANAGER', 'ROLE_AUDITOR', 'ROLE_USER')")
    public ResponseEntity<Map<String, Object>> getAssessmentById(
            @Parameter(description = "ID de l'évaluation à récupérer") 
            @PathVariable Long id) {
        Assessment assessment = assessmentService.getAssessmentById(id);
        Map<String, Object> responseMap = convertAssessmentToMap(assessment);
        return ResponseEntity.ok(responseMap);
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Créer une évaluation",
            description = "Crée une nouvelle évaluation de risque")
    @ApiResponse(responseCode = "201", description = "Évaluation créée avec succès")
    @ApiResponse(responseCode = "400", description = "Données d'évaluation invalides")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_COMPLIANCE_OFFICER')")
    public ResponseEntity<Map<String, Object>> createAssessment(
            @Parameter(description = "Données de l'évaluation à créer") 
            @Valid @RequestBody Assessment assessment) {
        Assessment createdAssessment = assessmentService.createAssessment(assessment);
        Map<String, Object> responseMap = convertAssessmentToMap(createdAssessment);
        return ResponseEntity.ok(responseMap);
    }

    @PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Mettre à jour une évaluation",
            description = "Met à jour les informations d'une évaluation existante")
    @ApiResponse(responseCode = "200", description = "Évaluation mise à jour avec succès")
    @ApiResponse(responseCode = "404", description = "Évaluation non trouvée")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_COMPLIANCE_OFFICER')")
    public ResponseEntity<Map<String, Object>> updateAssessment(
            @Parameter(description = "ID de l'évaluation à mettre à jour") 
            @PathVariable Long id,
            @Parameter(description = "Nouvelles données de l'évaluation") 
            @Valid @RequestBody Assessment assessment) {
        Assessment updatedAssessment = assessmentService.updateAssessment(id, assessment);
        Map<String, Object> responseMap = convertAssessmentToMap(updatedAssessment);
        return ResponseEntity.ok(responseMap);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Supprimer une évaluation",
            description = "Supprime une évaluation de risque")
    @ApiResponse(responseCode = "204", description = "Évaluation supprimée avec succès")
    @ApiResponse(responseCode = "404", description = "Évaluation non trouvée")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_COMPLIANCE_OFFICER')")
    public ResponseEntity<Void> deleteAssessment(
            @Parameter(description = "ID de l'évaluation à supprimer") 
            @PathVariable Long id) {
        assessmentService.deleteAssessment(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping(value = "/user/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Lister les évaluations par utilisateur",
            description = "Récupère la liste des évaluations assignées à un utilisateur spécifique")
    @ApiResponse(responseCode = "200", description = "Liste des évaluations de l'utilisateur récupérée avec succès")
    @ApiResponse(responseCode = "404", description = "Utilisateur non trouvé")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_COMPLIANCE_OFFICER', 'ROLE_RISK_MANAGER', 'ROLE_AUDITOR', 'ROLE_USER')")
    public ResponseEntity<List<Map<String, Object>>> getAssessmentsByUser(
            @Parameter(description = "ID de l'utilisateur") 
            @PathVariable String userId) {
        List<Assessment> assessments = assessmentService.getAssessmentsByUser(userId);
        List<Map<String, Object>> responseList = new ArrayList<>();
        
        for (Assessment assessment : assessments) {
            Map<String, Object> assessmentMap = convertAssessmentToMap(assessment);
            responseList.add(assessmentMap);
        }
        
        return ResponseEntity.ok(responseList);
    }

    @GetMapping(value = "/risk/{riskId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Lister les évaluations par risque",
            description = "Récupère la liste des évaluations liées à un risque spécifique")
    @ApiResponse(responseCode = "200", description = "Liste des évaluations du risque récupérée avec succès")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_COMPLIANCE_OFFICER', 'ROLE_RISK_MANAGER', 'ROLE_AUDITOR', 'ROLE_USER')")
    public ResponseEntity<List<Map<String, Object>>> getAssessmentsByRisk(
            @Parameter(description = "ID du risque") 
            @PathVariable Long riskId) {
        List<Assessment> assessments = assessmentService.getAssessmentsByRisk(riskId);
        List<Map<String, Object>> responseList = new ArrayList<>();
        
        for (Assessment assessment : assessments) {
            Map<String, Object> assessmentMap = convertAssessmentToMap(assessment);
            responseList.add(assessmentMap);
        }
        
        return ResponseEntity.ok(responseList);
    }
    
    /**
     * Convertit une entité Assessment en Map pour éviter les problèmes de sérialisation
     */
    private Map<String, Object> convertAssessmentToMap(Assessment assessment) {
        Map<String, Object> map = new HashMap<>();
        
        map.put("id", assessment.getId());
        
        // Ajouter les informations sur le risque, sans référence circulaire
        if (assessment.getRisk() != null) {
            Risk risk = assessment.getRisk();
            Map<String, Object> riskMap = new HashMap<>();
            riskMap.put("id", risk.getId());
            riskMap.put("name", risk.getName());
            map.put("risk", riskMap);
        }
        
        // Ajouter les informations sur l'utilisateur, sans référence circulaire
        if (assessment.getAssignedTo() != null) {
            User user = assessment.getAssignedTo();
            Map<String, Object> userMap = new HashMap<>();
            userMap.put("id", user.getId());
            userMap.put("firstName", user.getFirstName());
            userMap.put("lastName", user.getLastName());
            map.put("assignedTo", userMap);
        }
        
        map.put("status", assessment.getStatus());
        map.put("assessmentDate", assessment.getAssessmentDate());
        map.put("findings", assessment.getFindings());
        map.put("recommendations", assessment.getRecommendations());
        map.put("nextReviewDate", assessment.getNextReviewDate());
        map.put("createdAt", assessment.getCreatedAt());
        map.put("updatedAt", assessment.getUpdatedAt());
        
        return map;
    }
} 