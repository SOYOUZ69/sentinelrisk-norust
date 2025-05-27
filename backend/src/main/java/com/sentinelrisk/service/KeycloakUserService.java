package com.sentinelrisk.service;

import com.sentinelrisk.dto.UserDTO;
import com.sentinelrisk.util.CreatedResponseUtil;
import jakarta.ws.rs.core.Response;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class KeycloakUserService {
    private static final Logger logger = LoggerFactory.getLogger(KeycloakUserService.class);

    private final Keycloak keycloak;
    private final String realm;

    public KeycloakUserService(Keycloak keycloak, @Value("${keycloak.realm}") String realm) {
        this.keycloak = keycloak;
        this.realm = realm;
        logger.info("KeycloakUserService initialized with realm: {}", realm);
    }

    private RealmResource getRealmResource() {
        return keycloak.realm(realm);
    }

    public UserDTO createUser(UserDTO userDTO) {
        logger.debug("Creating user in Keycloak: {}", userDTO);
        UsersResource usersResource = getRealmResource().users();
        
        try {
            // Créer l'utilisateur
            UserRepresentation user = new UserRepresentation();
            user.setEnabled(true);
            user.setUsername(userDTO.getUsername());
            user.setEmail(userDTO.getEmail());
            user.setFirstName(userDTO.getFirstName());
            user.setLastName(userDTO.getLastName());
            
            logger.debug("Sending user creation request to Keycloak: {}", user);
            Response response = usersResource.create(user);
            
            if (response.getStatus() != 201) {
                logger.error("Failed to create user in Keycloak. Status: {}, Response: {}", 
                    response.getStatus(), response.readEntity(String.class));
                throw new RuntimeException("Failed to create user in Keycloak");
            }
            
            String userId = CreatedResponseUtil.getCreatedId(response);
            logger.info("User created successfully in Keycloak with ID: {}", userId);
            
            // Définir le mot de passe
            CredentialRepresentation credential = new CredentialRepresentation();
            credential.setType(CredentialRepresentation.PASSWORD);
            credential.setValue(userDTO.getUsername()); // Utiliser le username comme mot de passe par défaut
            credential.setTemporary(true);
            
            UserResource userResource = usersResource.get(userId);
            userResource.resetPassword(credential);
            logger.debug("Password set for user: {}", userId);
            
            // Assigner les rôles
            if (userDTO.getRoles() != null && !userDTO.getRoles().isEmpty()) {
                logger.debug("Assigning roles to user {}: {}", userId, userDTO.getRoles());
                List<RoleRepresentation> roles = userDTO.getRoles().stream()
                    .map(roleName -> getRealmResource().roles().get(roleName).toRepresentation())
                    .collect(Collectors.toList());
                userResource.roles().realmLevel().add(roles);
                logger.debug("Roles assigned successfully");
            }
            
            return getUserById(userId);
        } catch (Exception e) {
            logger.error("Error creating user in Keycloak", e);
            throw new RuntimeException("Failed to create user in Keycloak: " + e.getMessage(), e);
        }
    }

    public UserDTO updateUser(String id, UserDTO userDTO) {
        UserResource userResource = getRealmResource().users().get(id);
        UserRepresentation user = userResource.toRepresentation();
        
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setEnabled(userDTO.isEnabled());
        
        userResource.update(user);
        
        // Mettre à jour les rôles
        if (userDTO.getRoles() != null) {
            List<RoleRepresentation> currentRoles = userResource.roles().realmLevel().listAll();
            List<RoleRepresentation> newRoles = userDTO.getRoles().stream()
                .map(roleName -> getRealmResource().roles().get(roleName).toRepresentation())
                .collect(Collectors.toList());
            
            // Supprimer les rôles qui ne sont plus présents
            currentRoles.stream()
                .filter(role -> !userDTO.getRoles().contains(role.getName()))
                .forEach(role -> userResource.roles().realmLevel().remove(Collections.singletonList(role)));
            
            // Ajouter les nouveaux rôles
            newRoles.stream()
                .filter(role -> !currentRoles.stream().anyMatch(r -> r.getName().equals(role.getName())))
                .forEach(role -> userResource.roles().realmLevel().add(Collections.singletonList(role)));
        }
        
        return getUserById(id);
    }

    public void deleteUser(String id) {
        getRealmResource().users().get(id).remove();
    }

    public List<UserDTO> listUsers() {
        return getRealmResource().users().list().stream()
            .map(this::mapToDTO)
            .collect(Collectors.toList());
    }

    public UserDTO getUserById(String id) {
        UserRepresentation user = getRealmResource().users().get(id).toRepresentation();
        return mapToDTO(user);
    }

    private UserDTO mapToDTO(UserRepresentation user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEnabled(user.isEnabled());
        
        // Récupérer les rôles
        List<RoleRepresentation> roles = getRealmResource().users().get(user.getId()).roles().realmLevel().listAll();
        dto.setRoles(roles.stream().map(RoleRepresentation::getName).collect(Collectors.toSet()));
        
        return dto;
    }
} 