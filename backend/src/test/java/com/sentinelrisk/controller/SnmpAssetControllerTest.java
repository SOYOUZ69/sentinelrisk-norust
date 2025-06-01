package com.sentinelrisk.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sentinelrisk.dto.AssetCreateRequest;
import com.sentinelrisk.model.Asset;
import com.sentinelrisk.service.AssetService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = SnmpAssetController.class)
class SnmpAssetControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AssetService assetService;

    @Autowired
    private ObjectMapper objectMapper;

    private Asset testAsset;
    private AssetCreateRequest testRequest;

    @BeforeEach
    void setUp() {
        testAsset = new Asset();
        testAsset.setId(1L);
        testAsset.setHostname("test-server");
        testAsset.setIpAddress("192.168.1.100");
        testAsset.setType(Asset.AssetType.SERVER);
        testAsset.setSnmpVersion(Asset.SnmpVersion.V2C);
        testAsset.setPort(161);
        testAsset.setCommunity("public");
        testAsset.setActive(true);

        testRequest = new AssetCreateRequest();
        testRequest.setHostname("test-server");
        testRequest.setIpAddress("192.168.1.100");
        testRequest.setType(Asset.AssetType.SERVER);
        testRequest.setSnmpVersion(Asset.SnmpVersion.V2C);
        testRequest.setPort(161);
        testRequest.setCommunity("public");
        testRequest.setActive(true);
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void getAllAssets_ShouldReturnAssetsList() throws Exception {
        // Given
        List<Asset> assets = Arrays.asList(testAsset);
        when(assetService.getAllAssets()).thenReturn(assets);

        // When & Then
        mockMvc.perform(get("/api/snmp/assets"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].hostname").value("test-server"))
                .andExpect(jsonPath("$[0].type").value("SERVER"));

        verify(assetService).getAllAssets();
    }

    @Test
    @WithMockUser(roles = "RISK_MANAGER")
    void getAssetById_WhenExists_ShouldReturnAsset() throws Exception {
        // Given
        when(assetService.getAssetById(1L)).thenReturn(Optional.of(testAsset));

        // When & Then
        mockMvc.perform(get("/api/snmp/assets/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.hostname").value("test-server"));

        verify(assetService).getAssetById(1L);
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void getAssetById_WhenNotExists_ShouldReturn404() throws Exception {
        // Given
        when(assetService.getAssetById(999L)).thenReturn(Optional.empty());

        // When & Then
        mockMvc.perform(get("/api/snmp/assets/999"))
                .andExpect(status().isNotFound());

        verify(assetService).getAssetById(999L);
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void createAsset_WithValidData_ShouldReturnCreatedAsset() throws Exception {
        // Given
        when(assetService.saveAsset(any(Asset.class))).thenReturn(testAsset);

        // When & Then
        mockMvc.perform(post("/api/snmp/assets")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(testRequest)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.hostname").value("test-server"));

        verify(assetService).saveAsset(any(Asset.class));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void createAsset_WithInvalidData_ShouldReturn400() throws Exception {
        // Given
        AssetCreateRequest invalidRequest = new AssetCreateRequest();
        // Pas de type ni de version SNMP (champs obligatoires)

        // When & Then
        mockMvc.perform(post("/api/snmp/assets")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidRequest)))
                .andExpect(status().isBadRequest());

        verify(assetService, never()).saveAsset(any(Asset.class));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void testConnection_WithValidAsset_ShouldReturnSuccess() throws Exception {
        // Given
        when(assetService.testSnmpConnection(any(Asset.class))).thenReturn(true);

        // When & Then
        mockMvc.perform(post("/api/snmp/assets/test-connection")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(testRequest)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.success").value(true));

        verify(assetService).testSnmpConnection(any(Asset.class));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void testConnection_WithConnectionFailure_ShouldReturnFailure() throws Exception {
        // Given
        when(assetService.testSnmpConnection(any(Asset.class))).thenReturn(false);

        // When & Then
        mockMvc.perform(post("/api/snmp/assets/test-connection")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(testRequest)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.error").exists());

        verify(assetService).testSnmpConnection(any(Asset.class));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void deleteAsset_WhenExists_ShouldReturn204() throws Exception {
        // Given
        doNothing().when(assetService).deleteAsset(1L);

        // When & Then
        mockMvc.perform(delete("/api/snmp/assets/1")
                        .with(csrf()))
                .andExpect(status().isNoContent());

        verify(assetService).deleteAsset(1L);
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void deleteAsset_WhenNotExists_ShouldReturn404() throws Exception {
        // Given
        doThrow(new IllegalArgumentException("Asset non trouvé"))
                .when(assetService).deleteAsset(999L);

        // When & Then
        mockMvc.perform(delete("/api/snmp/assets/999")
                        .with(csrf()))
                .andExpect(status().isNotFound());

        verify(assetService).deleteAsset(999L);
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void toggleAssetStatus_ShouldReturnUpdatedAsset() throws Exception {
        // Given
        Asset updatedAsset = new Asset();
        updatedAsset.setId(1L);
        updatedAsset.setHostname("test-server");
        updatedAsset.setActive(false); // Statut inversé
        
        when(assetService.toggleAssetStatus(1L)).thenReturn(updatedAsset);

        // When & Then
        mockMvc.perform(patch("/api/snmp/assets/1/toggle-status")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.active").value(false));

        verify(assetService).toggleAssetStatus(1L);
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void getAssetsByType_ShouldReturnFilteredAssets() throws Exception {
        // Given
        List<Asset> serverAssets = Arrays.asList(testAsset);
        when(assetService.getAssetsByType(Asset.AssetType.SERVER)).thenReturn(serverAssets);

        // When & Then
        mockMvc.perform(get("/api/snmp/assets/type/SERVER"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].type").value("SERVER"));

        verify(assetService).getAssetsByType(Asset.AssetType.SERVER);
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void getAssetStatistics_ShouldReturnStatistics() throws Exception {
        // Given
        List<Object[]> stats = Arrays.asList(
                new Object[]{"SERVER", 5L},
                new Object[]{"SWITCH", 3L}
        );
        when(assetService.countAssetsByType()).thenReturn(stats);

        // When & Then
        mockMvc.perform(get("/api/snmp/assets/statistics/by-type"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray());

        verify(assetService).countAssetsByType();
    }

    @Test
    void getAllAssets_WithoutAuthentication_ShouldReturn401() throws Exception {
        // When & Then
        mockMvc.perform(get("/api/snmp/assets"))
                .andExpect(status().isUnauthorized());

        verify(assetService, never()).getAllAssets();
    }

    @Test
    @WithMockUser(roles = "USER") // Rôle insuffisant
    void createAsset_WithInsufficientRole_ShouldReturn403() throws Exception {
        // When & Then
        mockMvc.perform(post("/api/snmp/assets")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(testRequest)))
                .andExpect(status().isForbidden());

        verify(assetService, never()).saveAsset(any(Asset.class));
    }
} 