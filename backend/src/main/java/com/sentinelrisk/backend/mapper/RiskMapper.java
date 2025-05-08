package com.sentinelrisk.backend.mapper;

import com.sentinelrisk.backend.dto.ControlDTO;
import com.sentinelrisk.backend.dto.RiskRequest;
import com.sentinelrisk.backend.dto.RiskResponse;
import com.sentinelrisk.backend.model.Category;
import com.sentinelrisk.backend.model.Control;
import com.sentinelrisk.backend.model.Risk;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Mapper pour convertir entre entités Risk et DTO RiskResponse
 */
@Component
public class RiskMapper {

    public Risk toEntity(RiskRequest riskRequest, Category category) {
        Risk risk = new Risk();
        risk.setName(riskRequest.getName());
        risk.setDescription(riskRequest.getDescription());
        risk.setCategory(category);
        risk.setImpactLevel(riskRequest.getImpactLevel());
        risk.setProbabilityLevel(riskRequest.getProbabilityLevel());
        risk.setStatus(riskRequest.getStatus());
        risk.setMitigationPlan(riskRequest.getMitigationPlan());
        return risk;
    }

    public void updateEntityFromRequest(Risk risk, RiskRequest riskRequest, Category category) {
        risk.setName(riskRequest.getName());
        risk.setDescription(riskRequest.getDescription());
        risk.setCategory(category);
        risk.setImpactLevel(riskRequest.getImpactLevel());
        risk.setProbabilityLevel(riskRequest.getProbabilityLevel());
        risk.setStatus(riskRequest.getStatus());
        risk.setMitigationPlan(riskRequest.getMitigationPlan());
    }

    /**
     * Convertit une entité Risk en DTO RiskResponse
     */
    public RiskResponse toResponse(Risk risk) {
        if (risk == null) {
            return null;
        }
        
        RiskResponse response = new RiskResponse();
        response.setId(risk.getId());
        response.setName(risk.getName());
        response.setDescription(risk.getDescription());
        response.setImpactLevel(risk.getImpactLevel());
        response.setProbabilityLevel(risk.getProbabilityLevel());
        response.setRiskScore(risk.getRiskScore());
        response.setStatus(risk.getStatus());
        response.setMitigationPlan(risk.getMitigationPlan());
        response.setCreatedAt(risk.getCreatedAt());
        response.setUpdatedAt(risk.getUpdatedAt());
        
        // Ajouter uniquement les infos de base de la catégorie, pas l'objet complet
        if (risk.getCategory() != null) {
            response.setCategoryId(risk.getCategory().getId());
            response.setCategoryName(risk.getCategory().getName());
        }
        
        // Ajouter les IDs des contrôles
        if (risk.getControls() != null) {
            Set<Long> controlIds = risk.getControls().stream()
                .map(Control::getId)
                .collect(Collectors.toSet());
            response.setControlIds(controlIds);
            
            // Ajouter également les contrôles complets
            Set<ControlDTO> controls = risk.getControls().stream()
                .map(this::mapControlToDTO)
                .collect(Collectors.toSet());
            response.setControls(controls);
        }
        
        return response;
    }
    
    /**
     * Convertit un Control en ControlDTO simplifié
     */
    private ControlDTO mapControlToDTO(Control control) {
        ControlDTO dto = new ControlDTO();
        dto.setId(control.getId());
        dto.setName(control.getName());
        dto.setDescription(control.getDescription());
        dto.setType(control.getType());
        dto.setStatus(control.getStatus());
        dto.setFrequency(control.getFrequency());
        return dto;
    }
    
    /**
     * Convertit une liste d'entités Risk en liste de DTOs RiskResponse
     */
    public List<RiskResponse> toResponseList(List<Risk> risks) {
        if (risks == null) {
            return null;
        }
        
        return risks.stream()
            .map(this::toResponse)
            .collect(Collectors.toList());
    }
} 