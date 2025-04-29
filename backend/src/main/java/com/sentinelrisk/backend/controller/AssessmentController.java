package com.sentinelrisk.backend.controller;

import com.sentinelrisk.backend.model.Assessment;
import com.sentinelrisk.backend.service.AssessmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assessments")
@RequiredArgsConstructor
@Tag(name = "Assessment Management", description = "Endpoints pour la gestion des évaluations de risque")
public class AssessmentController {

        private final AssessmentService assessmentService;

    @GetMapping
    @Operation(summary = "Lister toutes les évaluations",
            description = "Récupère la liste complète des évaluations de risque")
    @ApiResponse(responseCode = "200", description = "Liste des évaluations récupérée avec succès")
    public List<Assessment> getAllAssessments() {
        return assessmentService.getAllAssessments();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtenir une évaluation par ID",
            description = "Récupère les détails d'une évaluation spécifique via son ID")
    @ApiResponse(responseCode = "200", description = "Évaluation trouvée")
    @ApiResponse(responseCode = "404", description = "Évaluation non trouvée")
    public ResponseEntity<Assessment> getAssessmentById(
            @Parameter(description = "ID de l'évaluation à récupérer") 
            @PathVariable Long id) {
        return ResponseEntity.ok(assessmentService.getAssessmentById(id));
    }

    @PostMapping
    @Operation(summary = "Créer une évaluation",
            description = "Crée une nouvelle évaluation de risque")
    @ApiResponse(responseCode = "201", description = "Évaluation créée avec succès")
    @ApiResponse(responseCode = "400", description = "Données d'évaluation invalides")
    public ResponseEntity<Assessment> createAssessment(
            @Parameter(description = "Données de l'évaluation à créer") 
            @Valid @RequestBody Assessment assessment) {
        return ResponseEntity.ok(assessmentService.createAssessment(assessment));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Mettre à jour une évaluation",
            description = "Met à jour les informations d'une évaluation existante")
    @ApiResponse(responseCode = "200", description = "Évaluation mise à jour avec succès")
    @ApiResponse(responseCode = "404", description = "Évaluation non trouvée")
    public ResponseEntity<Assessment> updateAssessment(
            @Parameter(description = "ID de l'évaluation à mettre à jour") 
            @PathVariable Long id,
            @Parameter(description = "Nouvelles données de l'évaluation") 
            @Valid @RequestBody Assessment assessment) {
        return ResponseEntity.ok(assessmentService.updateAssessment(id, assessment));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Supprimer une évaluation",
            description = "Supprime une évaluation de risque")
    @ApiResponse(responseCode = "204", description = "Évaluation supprimée avec succès")
    @ApiResponse(responseCode = "404", description = "Évaluation non trouvée")
    public ResponseEntity<Void> deleteAssessment(
            @Parameter(description = "ID de l'évaluation à supprimer") 
            @PathVariable Long id) {
        assessmentService.deleteAssessment(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{userId}")
    @Operation(summary = "Lister les évaluations par utilisateur",
            description = "Récupère la liste des évaluations assignées à un utilisateur spécifique")
    @ApiResponse(responseCode = "200", description = "Liste des évaluations de l'utilisateur récupérée avec succès")
    @ApiResponse(responseCode = "404", description = "Utilisateur non trouvé")
    public List<Assessment> getAssessmentsByUser(
            @Parameter(description = "ID de l'utilisateur") 
            @PathVariable String userId) {
        return assessmentService.getAssessmentsByUser(userId);
    }
} 