package com.sentinelrisk.backend.controller;

import com.sentinelrisk.backend.service.DashboardService;
import com.sentinelrisk.dto.DashboardSummaryDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.HashMap;
import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(DashboardController.class)
class DashboardControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private DashboardService dashboardService;

    @Test
    @WithMockUser(roles = "admin")
    void testGetRiskSummary() throws Exception {
        // Arrange
        Map<String, Long> risksByLevel = new HashMap<>();
        risksByLevel.put("HIGH", 5L);
        
        Map<String, Long> risksByCategory = new HashMap<>();
        risksByCategory.put("OPERATIONAL", 10L);
        
        DashboardSummaryDto.RiskSummary mockSummary = new DashboardSummaryDto.RiskSummary(
            15L, risksByLevel, risksByCategory, 12L, 3L
        );
        
        when(dashboardService.getRiskSummary(any(), any(), anyString())).thenReturn(mockSummary);

        // Act & Assert
        mockMvc.perform(get("/api/dashboard/summary/risks"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalRisks").value(15))
                .andExpect(jsonPath("$.openRisks").value(12))
                .andExpect(jsonPath("$.closedRisks").value(3));
    }

    @Test
    @WithMockUser(roles = "compliance_officer")
    void testGetComplianceSummary() throws Exception {
        // Arrange
        Map<String, Long> controlsByFramework = new HashMap<>();
        controlsByFramework.put("ISO 27001", 25L);
        
        Map<String, Long> controlsByStatus = new HashMap<>();
        controlsByStatus.put("COMPLIANT", 20L);
        
        DashboardSummaryDto.ComplianceSummary mockSummary = new DashboardSummaryDto.ComplianceSummary(
            30L, 20L, 10L, 66.7, controlsByFramework, controlsByStatus
        );
        
        when(dashboardService.getComplianceSummary(any(), any(), anyString())).thenReturn(mockSummary);

        // Act & Assert
        mockMvc.perform(get("/api/dashboard/summary/compliance"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalControls").value(30))
                .andExpect(jsonPath("$.complianceRate").value(66.7));
    }

    @Test
    @WithMockUser(roles = "risk_manager")
    void testGetSnmpSummary() throws Exception {
        // Arrange
        Map<String, Long> assetsByType = new HashMap<>();
        assetsByType.put("SERVER", 10L);
        
        Map<String, Long> assetsByStatus = new HashMap<>();
        assetsByStatus.put("ACTIVE", 8L);
        
        DashboardSummaryDto.SnmpSummary mockSummary = new DashboardSummaryDto.SnmpSummary(
            10L, 8L, 2L, assetsByType, assetsByStatus, 5L, 1L, 80.0
        );
        
        when(dashboardService.getSnmpSummary(any(), any(), anyString())).thenReturn(mockSummary);

        // Act & Assert
        mockMvc.perform(get("/api/dashboard/summary/snmp"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalAssets").value(10))
                .andExpect(jsonPath("$.successRate").value(80.0));
    }

    @Test
    @WithMockUser(roles = "compliance_officer")
    void testGetActionPlansSummary() throws Exception {
        // Arrange
        Map<String, Long> plansByStatus = new HashMap<>();
        plansByStatus.put("ACTIVE", 5L);
        
        DashboardSummaryDto.ActionPlansSummary mockSummary = new DashboardSummaryDto.ActionPlansSummary(
            10L, 5L, 3L, 2L, plansByStatus, 50.0
        );
        
        when(dashboardService.getActionPlansSummary(any(), any(), anyString())).thenReturn(mockSummary);

        // Act & Assert
        mockMvc.perform(get("/api/dashboard/summary/plans"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalPlans").value(10))
                .andExpect(jsonPath("$.completionRate").value(50.0));
    }

    @Test
    void testUnauthorizedAccess() throws Exception {
        // Test sans authentification - doit retourner 401
        mockMvc.perform(get("/api/dashboard/summary/risks"))
                .andExpect(status().isUnauthorized());
    }
} 