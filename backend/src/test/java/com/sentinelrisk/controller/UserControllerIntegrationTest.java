package com.sentinelrisk.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sentinelrisk.dto.UserDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.HashSet;
import java.util.Set;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class UserControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testCreateUser() throws Exception {
        // Créer un utilisateur de test
        UserDTO userDTO = new UserDTO();
        userDTO.setUsername("testuser");
        userDTO.setEmail("test@example.com");
        userDTO.setFirstName("Test");
        userDTO.setLastName("User");
        userDTO.setEnabled(true);
        Set<String> roles = new HashSet<>();
        roles.add("user");
        userDTO.setRoles(roles);

        // Envoyer la requête de création
        MvcResult result = mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(userDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value(userDTO.getUsername()))
                .andExpect(jsonPath("$.email").value(userDTO.getEmail()))
                .andReturn();

        // Extraire l'ID de l'utilisateur créé
        String responseContent = result.getResponse().getContentAsString();
        UserDTO createdUser = objectMapper.readValue(responseContent, UserDTO.class);
        assertNotNull(createdUser.getId(), "User ID should not be null");

        // Vérifier que l'utilisateur existe dans Keycloak
        mockMvc.perform(get("/api/users/" + createdUser.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(createdUser.getId()))
                .andExpect(jsonPath("$.username").value(userDTO.getUsername()));
    }
} 