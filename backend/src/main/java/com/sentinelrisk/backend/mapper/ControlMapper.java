package com.sentinelrisk.backend.mapper;

import com.sentinelrisk.backend.dto.ControlRequest;
import com.sentinelrisk.backend.dto.ControlResponse;
import com.sentinelrisk.backend.model.Control;
import com.sentinelrisk.backend.model.Risk;
import com.sentinelrisk.backend.repository.RiskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ControlMapper {
    
    private final RiskRepository riskRepository;
    
    /**
     * Convertit une entité Control en DTO ControlResponse
     */
    public ControlResponse toResponse(Control control) {
        if (control == null) {
            return null;
        }
        
        ControlResponse response = new ControlResponse();
        response.setId(control.getId());
        response.setName(control.getName());
        response.setDescription(control.getDescription());
        response.setType(control.getType());
        response.setStatus(control.getStatus());
        response.setFrequency(control.getFrequency());
        response.setImplementationDetails(control.getImplementationDetails());
        response.setImplementationDate(control.getImplementationDate());
        response.setLastTestedDate(control.getLastTestedDate());
        response.setEffectivenessScore(control.getEffectivenessScore());
        response.setOwner(control.getOwner());
        response.setDocumentation(control.getDocumentation());
        response.setCreatedAt(control.getCreatedAt());
        response.setUpdatedAt(control.getUpdatedAt());
        
        // Mapper les risques associés
        if (control.getRisks() != null && !control.getRisks().isEmpty()) {
            List<ControlResponse.RiskBasicResponse> riskResponses = control.getRisks().stream()
                .map(risk -> {
                    ControlResponse.RiskBasicResponse riskResponse = new ControlResponse.RiskBasicResponse();
                    riskResponse.setId(risk.getId());
                    riskResponse.setName(risk.getName());
                    riskResponse.setDescription(risk.getDescription());
                    return riskResponse;
                })
                .collect(Collectors.toList());
            
            response.setRisks(riskResponses);
        } else {
            response.setRisks(new ArrayList<>());
        }
        
        return response;
    }
    
    /**
     * Met à jour une entité Control avec les données d'un ControlRequest
     */
    public void updateControlFromRequest(Control control, ControlRequest request) {
        control.setName(request.getName());
        control.setDescription(request.getDescription());
        control.setType(request.getType());
        control.setStatus(request.getStatus());
        control.setFrequency(request.getFrequency());
        control.setImplementationDetails(request.getImplementationDetails());
        control.setImplementationDate(request.getImplementationDate());
        control.setLastTestedDate(request.getLastTestedDate());
        control.setEffectivenessScore(request.getEffectivenessScore());
        control.setOwner(request.getOwner());
        control.setDocumentation(request.getDocumentation());
    }
    
    /**
     * Associe les risques à un contrôle à partir de leurs ID
     */
    public void setRisksFromIds(Control control, List<Long> riskIds) {
        if (riskIds == null || riskIds.isEmpty()) {
            // Si aucun risque n'est spécifié, on vide la liste de risques
            control.getRisks().clear();
            return;
        }
        
        // Récupérer tous les risques demandés
        List<Risk> risks = riskRepository.findAllById(riskIds);
        
        // Supprimer les risques qui ne sont plus associés
        List<Risk> risksToRemove = control.getRisks().stream()
            .filter(existingRisk -> !riskIds.contains(existingRisk.getId()))
            .collect(Collectors.toList());
        
        for (Risk risk : risksToRemove) {
            risk.getControls().remove(control);
            control.getRisks().remove(risk);
        }
        
        // Ajouter les nouveaux risques
        for (Risk risk : risks) {
            if (!control.getRisks().contains(risk)) {
                control.getRisks().add(risk);
                risk.getControls().add(control);
            }
        }
    }
    
    /**
     * Crée une nouvelle entité Control à partir d'un ControlRequest
     */
    public Control toEntity(ControlRequest request) {
        if (request == null) {
            return null;
        }
        
        Control control = new Control();
        updateControlFromRequest(control, request);
        return control;
    }
} 