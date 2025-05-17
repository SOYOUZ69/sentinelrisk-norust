package com.sentinelrisk.backend.controller;

import com.sentinelrisk.backend.dto.CategoryResponse;
import com.sentinelrisk.backend.mapper.CategoryMapper;
import com.sentinelrisk.backend.model.Category;
import com.sentinelrisk.backend.service.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
@Tag(name = "Category Management", description = "Endpoints pour la gestion des catégories de risque")
public class CategoryController {

    private final CategoryService categoryService;
    private final CategoryMapper categoryMapper;

    @GetMapping
    @Operation(summary = "Lister les catégories",
            description = "Récupère la liste complète des catégories de risque")
    @ApiResponse(responseCode = "200", description = "Liste des catégories récupérée avec succès")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_RISK_MANAGER', 'ROLE_COMPLIANCE_OFFICER', 'ROLE_AUDITOR', 'ROLE_USER')")
    public List<CategoryResponse> getAllCategories() {
        List<Category> categories = categoryService.getAllCategories();
        return categoryMapper.toResponseList(categories);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtenir une catégorie par ID",
            description = "Récupère les détails d'une catégorie spécifique via son ID")
    @ApiResponse(responseCode = "200", description = "Catégorie trouvée")
    @ApiResponse(responseCode = "404", description = "Catégorie non trouvée")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_RISK_MANAGER', 'ROLE_COMPLIANCE_OFFICER', 'ROLE_AUDITOR', 'ROLE_USER')")
    public ResponseEntity<CategoryResponse> getCategoryById(
            @Parameter(description = "ID de la catégorie à récupérer") 
            @PathVariable Long id) {
        Category category = categoryService.getCategoryById(id);
        return ResponseEntity.ok(categoryMapper.toResponse(category));
    }

    @PostMapping
    @Operation(summary = "Créer une catégorie",
            description = "Crée une nouvelle catégorie de risque")
    @ApiResponse(responseCode = "201", description = "Catégorie créée avec succès")
    @ApiResponse(responseCode = "400", description = "Données de catégorie invalides")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_RISK_MANAGER')")
    public ResponseEntity<CategoryResponse> createCategory(
            @Parameter(description = "Données de la catégorie à créer") 
            @Valid @RequestBody Category category) {
        Category createdCategory = categoryService.createCategory(category);
        return ResponseEntity.ok(categoryMapper.toResponse(createdCategory));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Mettre à jour une catégorie",
            description = "Met à jour les informations d'une catégorie existante")
    @ApiResponse(responseCode = "200", description = "Catégorie mise à jour avec succès")
    @ApiResponse(responseCode = "404", description = "Catégorie non trouvée")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_RISK_MANAGER')")
    public ResponseEntity<CategoryResponse> updateCategory(
            @Parameter(description = "ID de la catégorie à mettre à jour") 
            @PathVariable Long id,
            @Parameter(description = "Nouvelles données de la catégorie") 
            @Valid @RequestBody Category category) {
        Category updatedCategory = categoryService.updateCategory(id, category);
        return ResponseEntity.ok(categoryMapper.toResponse(updatedCategory));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Supprimer une catégorie",
            description = "Supprime une catégorie de risque")
    @ApiResponse(responseCode = "204", description = "Catégorie supprimée avec succès")
    @ApiResponse(responseCode = "404", description = "Catégorie non trouvée")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_RISK_MANAGER')")
    public ResponseEntity<Void> deleteCategory(
            @Parameter(description = "ID de la catégorie à supprimer") 
            @PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }
} 