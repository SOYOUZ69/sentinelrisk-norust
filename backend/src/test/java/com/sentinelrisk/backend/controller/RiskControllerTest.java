package com.sentinelrisk.backend.controller;

import com.sentinelrisk.backend.dto.RiskResponse;
import com.sentinelrisk.backend.service.RiskService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class RiskControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private RiskService riskService;

    @Test
    @WithMockUser(roles = {"RISK_MANAGER"})
    public void shouldReturnRisks() throws Exception {
        // Préparation d'une réponse simulée
        RiskResponse mockRisk = new RiskResponse();
        mockRisk.setId(1L);
        mockRisk.setName("Risque de test");
        mockRisk.setDescription("Description du risque de test");

        List<RiskResponse> mockRisks = Collections.singletonList(mockRisk);
        when(riskService.getAllRisks()).thenReturn(mockRisks);

        // Exécution et vérification
        mockMvc.perform(get("/api/risks")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[0].name", is("Risque de test")))
                .andExpect(jsonPath("$[0].description", is("Description du risque de test")));
    }
} 