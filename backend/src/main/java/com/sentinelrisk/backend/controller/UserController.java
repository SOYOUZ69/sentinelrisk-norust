package com.sentinelrisk.backend.controller;

import com.sentinelrisk.backend.model.User;
import com.sentinelrisk.backend.service.UserService;
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
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Tag(name = "User Management", description = "Endpoints pour la gestion des utilisateurs")
public class UserController {

    private final UserService userService;

    @GetMapping
    @Operation(summary = "Lister tous les utilisateurs",
            description = "Récupère la liste complète des utilisateurs du système")
    @ApiResponse(responseCode = "200", description = "Liste des utilisateurs récupérée avec succès")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtenir un utilisateur par ID",
            description = "Récupère les détails d'un utilisateur spécifique via son ID")
    @ApiResponse(responseCode = "200", description = "Utilisateur trouvé")
    @ApiResponse(responseCode = "404", description = "Utilisateur non trouvé")
    public ResponseEntity<User> getUserById(
            @Parameter(description = "ID de l'utilisateur à récupérer") 
            @PathVariable String id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PostMapping
    @Operation(summary = "Créer un utilisateur",
            description = "Crée un nouvel utilisateur dans le système")
    @ApiResponse(responseCode = "201", description = "Utilisateur créé avec succès")
    @ApiResponse(responseCode = "400", description = "Données d'utilisateur invalides")
    public ResponseEntity<User> createUser(
            @Parameter(description = "Données de l'utilisateur à créer") 
            @Valid @RequestBody User user) {
        return ResponseEntity.ok(userService.createUser(user));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Mettre à jour un utilisateur",
            description = "Met à jour les informations d'un utilisateur existant")
    @ApiResponse(responseCode = "200", description = "Utilisateur mis à jour avec succès")
    @ApiResponse(responseCode = "404", description = "Utilisateur non trouvé")
    public ResponseEntity<User> updateUser(
            @Parameter(description = "ID de l'utilisateur à mettre à jour") 
            @PathVariable String id,
            @Parameter(description = "Nouvelles données de l'utilisateur") 
            @Valid @RequestBody User user) {
        return ResponseEntity.ok(userService.updateUser(id, user));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Supprimer un utilisateur",
            description = "Supprime un utilisateur du système")
    @ApiResponse(responseCode = "204", description = "Utilisateur supprimé avec succès")
    @ApiResponse(responseCode = "404", description = "Utilisateur non trouvé")
    public ResponseEntity<Void> deleteUser(
            @Parameter(description = "ID de l'utilisateur à supprimer") 
            @PathVariable String id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/active")
    @Operation(summary = "Lister les utilisateurs actifs",
            description = "Récupère la liste des utilisateurs actifs avec des évaluations en attente")
    @ApiResponse(responseCode = "200", description = "Liste des utilisateurs actifs récupérée avec succès")
    public List<User> getActiveUsers() {
        return userService.getActiveUsersWithPendingAssessments();
    }
} 