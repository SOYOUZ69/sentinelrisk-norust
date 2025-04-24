package com.sentinelrisk.backend.controller;

import com.sentinelrisk.backend.model.Category;
import com.sentinelrisk.backend.service.CategoryService;
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
@RequestMapping("/api/categories")
@RequiredArgsConstructor
@Tag(name = "Category Management", description = "Endpoints pour la gestion des catégories de risque")
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    @Operation(summary = "Lister les catégories",
            description = "Récupère la liste complète des catégories de risque")
    @ApiResponse(responseCode = "200", description = "Liste des catégories récupérée avec succès")
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtenir une catégorie par ID",
            description = "Récupère les détails d'une catégorie spécifique via son ID")
    @ApiResponse(responseCode = "200", description = "Catégorie trouvée")
    @ApiResponse(responseCode = "404", description = "Catégorie non trouvée")
    public ResponseEntity<Category> getCategoryById(
            @Parameter(description = "ID de la catégorie à récupérer") 
            @PathVariable Long id) {
        return ResponseEntity.ok(categoryService.getCategoryById(id));
    }

    @PostMapping
    @Operation(summary = "Créer une catégorie",
            description = "Crée une nouvelle catégorie de risque")
    @ApiResponse(responseCode = "201", description = "Catégorie créée avec succès")
    @ApiResponse(responseCode = "400", description = "Données de catégorie invalides")
    public ResponseEntity<Category> createCategory(
            @Parameter(description = "Données de la catégorie à créer") 
            @Valid @RequestBody Category category) {
        return ResponseEntity.ok(categoryService.createCategory(category));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Mettre à jour une catégorie",
            description = "Met à jour les informations d'une catégorie existante")
    @ApiResponse(responseCode = "200", description = "Catégorie mise à jour avec succès")
    @ApiResponse(responseCode = "404", description = "Catégorie non trouvée")
    public ResponseEntity<Category> updateCategory(
            @Parameter(description = "ID de la catégorie à mettre à jour") 
            @PathVariable Long id,
            @Parameter(description = "Nouvelles données de la catégorie") 
            @Valid @RequestBody Category category) {
        return ResponseEntity.ok(categoryService.updateCategory(id, category));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Supprimer une catégorie",
            description = "Supprime une catégorie de risque")
    @ApiResponse(responseCode = "204", description = "Catégorie supprimée avec succès")
    @ApiResponse(responseCode = "404", description = "Catégorie non trouvée")
    public ResponseEntity<Void> deleteCategory(
            @Parameter(description = "ID de la catégorie à supprimer") 
            @PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }
} 