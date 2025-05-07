package com.sentinelrisk.backend.controller;

import com.sentinelrisk.backend.dto.RiskRequest;
import com.sentinelrisk.backend.dto.RiskResponse;
import com.sentinelrisk.backend.model.Risk;
import com.sentinelrisk.backend.service.RiskService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<List<RiskResponse>> getAllRisks() {
        return ResponseEntity.ok(riskService.getAllRisks());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtenir un risque par ID",
            description = "Récupère les détails d'un risque spécifique via son ID")
    @ApiResponse(responseCode = "200", description = "Risque trouvé")
    @ApiResponse(responseCode = "404", description = "Risque non trouvé")
    public ResponseEntity<RiskResponse> getRiskById(
            @Parameter(description = "ID du risque à récupérer") 
            @PathVariable Long id) {
        return ResponseEntity.ok(riskService.getRiskById(id));
    }

    @PostMapping
    @Operation(summary = "Créer un risque",
            description = "Crée un nouveau risque dans le système")
    @ApiResponse(responseCode = "201", description = "Risque créé avec succès")
    @ApiResponse(responseCode = "400", description = "Données du risque invalides")
    public ResponseEntity<RiskResponse> createRisk(
            @Parameter(description = "Données du risque à créer") 
            @Valid @RequestBody RiskRequest riskRequest) {
        RiskResponse createdRisk = riskService.createRisk(riskRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdRisk);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Mettre à jour un risque",
            description = "Met à jour les informations d'un risque existant")
    @ApiResponse(responseCode = "200", description = "Risque mis à jour avec succès")
    @ApiResponse(responseCode = "404", description = "Risque non trouvé")
    public ResponseEntity<RiskResponse> updateRisk(
            @Parameter(description = "ID du risque à mettre à jour") 
            @PathVariable Long id,
            @Parameter(description = "Nouvelles données du risque") 
            @Valid @RequestBody RiskRequest riskRequest) {
        return ResponseEntity.ok(riskService.updateRisk(id, riskRequest));
    }

    @PutMapping("/{id}/controls")
    @Operation(summary = "Mettre à jour les contrôles associés à un risque",
            description = "Met à jour la liste des contrôles associés à un risque existant")
    @ApiResponse(responseCode = "200", description = "Contrôles du risque mis à jour avec succès")
    @ApiResponse(responseCode = "404", description = "Risque non trouvé")
    public ResponseEntity<RiskResponse> updateRiskControls(
            @Parameter(description = "ID du risque à mettre à jour") 
            @PathVariable Long id,
            @Parameter(description = "IDs des contrôles à associer") 
            @RequestBody List<Long> controlIds) {
        
        // Ajout de logs détaillés
        System.out.println("===========================================");
        System.out.println("ENDPOINT APPELÉ: PUT /risks/{id}/controls");
        System.out.println("ID du risque: " + id);
        System.out.println("IDs des contrôles reçus: " + controlIds);
        try {
            RiskResponse result = riskService.updateRiskControls(id, controlIds);
            System.out.println("Contrôles mis à jour avec succès pour le risque " + id);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            System.err.println("ERREUR lors de la mise à jour des contrôles du risque " + id);
            e.printStackTrace();
            throw e;
        }
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
    public ResponseEntity<List<RiskResponse>> getHighScoreRisks(
            @Parameter(description = "Score minimum pour filtrer les risques") 
            @RequestParam(defaultValue = "75") int minScore) {
        return ResponseEntity.ok(riskService.getHighRisks(minScore));
    }

    @GetMapping("/category/{id}")
    @Operation(summary = "Lister les risques par catégorie",
            description = "Récupère la liste des risques appartenant à une catégorie spécifique")
    @ApiResponse(responseCode = "200", description = "Liste des risques de la catégorie récupérée avec succès")
    @ApiResponse(responseCode = "404", description = "Catégorie non trouvée")
    public ResponseEntity<List<RiskResponse>> getRisksByCategory(
            @Parameter(description = "ID de la catégorie") 
            @PathVariable Long id) {
        return ResponseEntity.ok(riskService.getRisksByCategory(id));
    }
} 