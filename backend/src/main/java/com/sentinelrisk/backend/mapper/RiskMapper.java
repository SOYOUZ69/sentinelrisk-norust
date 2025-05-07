package com.sentinelrisk.backend.mapper;

import com.sentinelrisk.backend.dto.RiskRequest;
import com.sentinelrisk.backend.dto.RiskResponse;
import com.sentinelrisk.backend.model.Category;
import com.sentinelrisk.backend.model.Control;
import com.sentinelrisk.backend.model.Risk;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

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

    public RiskResponse toResponse(Risk risk) {
        RiskResponse response = new RiskResponse();
        response.setId(risk.getId());
        response.setName(risk.getName());
        response.setDescription(risk.getDescription());
        
        // Map category
        if (risk.getCategory() != null) {
            RiskResponse.CategoryDto categoryDto = new RiskResponse.CategoryDto(
                risk.getCategory().getId(),
                risk.getCategory().getName(),
                risk.getCategory().getDescription()
            );
            response.setCategory(categoryDto);
        }
        
        response.setImpactLevel(risk.getImpactLevel());
        response.setProbabilityLevel(risk.getProbabilityLevel());
        response.setRiskScore(risk.getRiskScore());
        response.setStatus(risk.getStatus());
        response.setMitigationPlan(risk.getMitigationPlan());
        
        // Map controls
        if (risk.getControls() != null && !risk.getControls().isEmpty()) {
            List<RiskResponse.ControlDto> controlDtos = risk.getControls().stream()
                .map(this::mapControlToDto)
                .collect(Collectors.toList());
            response.setControls(controlDtos);
        }
        
        response.setCreatedAt(risk.getCreatedAt());
        response.setUpdatedAt(risk.getUpdatedAt());
        
        return response;
    }
    
    private RiskResponse.ControlDto mapControlToDto(Control control) {
        return new RiskResponse.ControlDto(
            control.getId(),
            control.getName(),
            control.getType().toString(),
            control.getStatus().toString()
        );
    }
    
    public List<RiskResponse> toResponseList(List<Risk> risks) {
        return risks.stream()
            .map(this::toResponse)
            .collect(Collectors.toList());
    }
} 