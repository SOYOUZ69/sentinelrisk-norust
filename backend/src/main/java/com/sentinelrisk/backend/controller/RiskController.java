package com.sentinelrisk.backend.controller;

import com.sentinelrisk.backend.model.Risk;
import com.sentinelrisk.backend.service.RiskService;
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
@RequestMapping("/api/risks")
@RequiredArgsConstructor
@Tag(name = "Risk Management", description = "Endpoints pour la gestion des risques")
public class RiskController {

    private final RiskService riskService;

    @GetMapping
    @Operation(summary = "Lister tous les risques",
            description = "Récupère la liste complète des risques du système")
    @ApiResponse(responseCode = "200", description = "Liste des risques récupérée avec succès")
    public List<Risk> getAllRisks() {
        return riskService.getAllRisks();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtenir un risque par ID",
            description = "Récupère les détails d'un risque spécifique via son ID")
    @ApiResponse(responseCode = "200", description = "Risque trouvé")
    @ApiResponse(responseCode = "404", description = "Risque non trouvé")
    public ResponseEntity<Risk> getRiskById(
            @Parameter(description = "ID du risque à récupérer") 
            @PathVariable Long id) {
        return ResponseEntity.ok(riskService.getRiskById(id));
    }

    @PostMapping
    @Operation(summary = "Créer un risque",
            description = "Crée un nouveau risque dans le système")
    @ApiResponse(responseCode = "201", description = "Risque créé avec succès")
    @ApiResponse(responseCode = "400", description = "Données du risque invalides")
    public ResponseEntity<Risk> createRisk(
            @Parameter(description = "Données du risque à créer") 
            @Valid @RequestBody Risk risk) {
        return ResponseEntity.ok(riskService.createRisk(risk));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Mettre à jour un risque",
            description = "Met à jour les informations d'un risque existant")
    @ApiResponse(responseCode = "200", description = "Risque mis à jour avec succès")
    @ApiResponse(responseCode = "404", description = "Risque non trouvé")
    public ResponseEntity<Risk> updateRisk(
            @Parameter(description = "ID du risque à mettre à jour") 
            @PathVariable Long id,
            @Parameter(description = "Nouvelles données du risque") 
            @Valid @RequestBody Risk risk) {
        return ResponseEntity.ok(riskService.updateRisk(id, risk));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Supprimer un risque",
            description = "Supprime un risque du système")
    @ApiResponse(responseCode = "204", description = "Risque supprimé avec succès")
    @ApiResponse(responseCode = "404", description = "Risque non trouvé")
    public ResponseEntity<Void> deleteRisk(
            @Parameter(description = "ID du risque à supprimer") 
            @PathVariable Long id) {
        riskService.deleteRisk(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/high-score")
    @Operation(summary = "Lister les risques à score élevé",
            description = "Récupère la liste des risques ayant un score supérieur à un seuil défini")
    @ApiResponse(responseCode = "200", description = "Liste des risques à score élevé récupérée avec succès")
    public List<Risk> getHighScoreRisks(
            @Parameter(description = "Score minimum pour filtrer les risques") 
            @RequestParam(defaultValue = "75") int minScore) {
        return riskService.getHighRisks(minScore);
    }

    @GetMapping("/category/{id}")
    @Operation(summary = "Lister les risques par catégorie",
            description = "Récupère la liste des risques appartenant à une catégorie spécifique")
    @ApiResponse(responseCode = "200", description = "Liste des risques de la catégorie récupérée avec succès")
    @ApiResponse(responseCode = "404", description = "Catégorie non trouvée")
    public List<Risk> getRisksByCategory(
            @Parameter(description = "ID de la catégorie") 
            @PathVariable Long id) {
        return riskService.getRisksByCategory(id);
    }
} 