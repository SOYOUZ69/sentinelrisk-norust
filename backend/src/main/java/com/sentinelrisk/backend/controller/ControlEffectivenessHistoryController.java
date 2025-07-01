package com.sentinelrisk.backend.controller;

import com.sentinelrisk.backend.dto.ControlEffectivenessHistoryDTO;
import com.sentinelrisk.backend.model.ControlEffectivenessHistory;
import com.sentinelrisk.backend.service.ControlImpactService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/control-effectiveness-history")
@Tag(name = "Control Effectiveness History", description = "Endpoints pour l'historique des changements d'efficacité des contrôles")
@RequiredArgsConstructor
public class ControlEffectivenessHistoryController {

    private final ControlImpactService controlImpactService;

    @GetMapping("/control/{controlId}")
    @Operation(summary = "Obtenir l'historique d'efficacité d'un contrôle",
            description = "Récupère l'historique des changements d'efficacité pour un contrôle spécifique")
    @ApiResponse(responseCode = "200", description = "Historique récupéré avec succès")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_COMPLIANCE_OFFICER', 'ROLE_RISK_MANAGER', 'ROLE_AUDITOR')")
    public ResponseEntity<List<ControlEffectivenessHistoryDTO>> getControlEffectivenessHistory(
            @Parameter(description = "ID du contrôle") 
            @PathVariable Long controlId) {
        
        List<ControlEffectivenessHistory> history = controlImpactService.getControlEffectivenessHistory(controlId);
        List<ControlEffectivenessHistoryDTO> dtoList = history.stream()
                .map(ControlEffectivenessHistoryDTO::fromEntity)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(dtoList);
    }

    @GetMapping("/risk/{riskId}")
    @Operation(summary = "Obtenir l'historique d'efficacité pour un risque",
            description = "Récupère l'historique des changements d'efficacité des contrôles impactant un risque spécifique")
    @ApiResponse(responseCode = "200", description = "Historique récupéré avec succès")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_COMPLIANCE_OFFICER', 'ROLE_RISK_MANAGER', 'ROLE_AUDITOR')")
    public ResponseEntity<List<ControlEffectivenessHistoryDTO>> getRiskEffectivenessHistory(
            @Parameter(description = "ID du risque") 
            @PathVariable Long riskId) {
        
        List<ControlEffectivenessHistory> history = controlImpactService.getRiskEffectivenessHistory(riskId);
        List<ControlEffectivenessHistoryDTO> dtoList = history.stream()
                .map(ControlEffectivenessHistoryDTO::fromEntity)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(dtoList);
    }
} 