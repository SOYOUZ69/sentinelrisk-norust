package com.sentinelrisk.backend.controller;

import com.sentinelrisk.backend.dto.ControlRequest;
import com.sentinelrisk.backend.dto.ControlResponse;
import com.sentinelrisk.backend.model.Control;
import com.sentinelrisk.backend.service.ControlService;
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
@RequestMapping("/api/controls")
@RequiredArgsConstructor
@Tag(name = "Control Management", description = "Endpoints pour la gestion des contrôles de risque")
public class ControlController {

    private final ControlService controlService;

    @GetMapping
    @Operation(summary = "Lister tous les contrôles",
            description = "Récupère la liste complète des contrôles de risque")
    @ApiResponse(responseCode = "200", description = "Liste des contrôles récupérée avec succès")
    public List<ControlResponse> getAllControls() {
        return controlService.getAllControls();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtenir un contrôle par ID",
            description = "Récupère les détails d'un contrôle spécifique via son ID")
    @ApiResponse(responseCode = "200", description = "Contrôle trouvé")
    @ApiResponse(responseCode = "404", description = "Contrôle non trouvé")
    public ResponseEntity<ControlResponse> getControlById(
            @Parameter(description = "ID du contrôle à récupérer") 
            @PathVariable Long id) {
        return ResponseEntity.ok(controlService.getControlById(id));
    }

    @PostMapping
    @Operation(summary = "Créer un contrôle",
            description = "Crée un nouveau contrôle de risque")
    @ApiResponse(responseCode = "201", description = "Contrôle créé avec succès")
    @ApiResponse(responseCode = "400", description = "Données du contrôle invalides")
    public ResponseEntity<ControlResponse> createControl(
            @Parameter(description = "Données du contrôle à créer") 
            @Valid @RequestBody ControlRequest controlRequest) {
        return ResponseEntity.ok(controlService.createControl(controlRequest));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Mettre à jour un contrôle",
            description = "Met à jour les informations d'un contrôle existant")
    @ApiResponse(responseCode = "200", description = "Contrôle mis à jour avec succès")
    @ApiResponse(responseCode = "404", description = "Contrôle non trouvé")
    public ResponseEntity<ControlResponse> updateControl(
            @Parameter(description = "ID du contrôle à mettre à jour") 
            @PathVariable Long id,
            @Parameter(description = "Nouvelles données du contrôle") 
            @Valid @RequestBody ControlRequest controlRequest) {
        return ResponseEntity.ok(controlService.updateControl(id, controlRequest));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Supprimer un contrôle",
            description = "Supprime un contrôle de risque")
    @ApiResponse(responseCode = "204", description = "Contrôle supprimé avec succès")
    @ApiResponse(responseCode = "404", description = "Contrôle non trouvé")
    public ResponseEntity<Void> deleteControl(
            @Parameter(description = "ID du contrôle à supprimer") 
            @PathVariable Long id) {
        controlService.deleteControl(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/by-risk/{id}")
    @Operation(summary = "Lister les contrôles par risque",
            description = "Récupère la liste des contrôles associés à un risque spécifique")
    @ApiResponse(responseCode = "200", description = "Liste des contrôles du risque récupérée avec succès")
    @ApiResponse(responseCode = "404", description = "Risque non trouvé")
    public List<ControlResponse> getControlsByRisk(
            @Parameter(description = "ID du risque") 
            @PathVariable Long id) {
        return controlService.getControlsByRisk(id);
    }
} 