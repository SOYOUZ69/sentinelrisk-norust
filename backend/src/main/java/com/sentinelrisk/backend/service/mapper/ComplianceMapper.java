package com.sentinelrisk.backend.service.mapper;

import com.sentinelrisk.backend.domain.compliance.ComplianceFramework;
import com.sentinelrisk.backend.domain.compliance.ComplianceRequirement;
import com.sentinelrisk.backend.domain.compliance.RiskComplianceMapping;
import com.sentinelrisk.backend.service.dto.compliance.ComplianceFrameworkDTO;
import com.sentinelrisk.backend.service.dto.compliance.ComplianceRequirementDTO;
import com.sentinelrisk.backend.service.dto.compliance.RiskComplianceMappingDTO;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Mapper pour convertir les entités du module de conformité en DTO et vice-versa.
 */
@Component
public class ComplianceMapper {

    /**
     * Convertit une entité ComplianceFramework en DTO.
     */
    public ComplianceFrameworkDTO toFrameworkDto(ComplianceFramework entity) {
        if (entity == null) {
            return null;
        }

        ComplianceFrameworkDTO dto = new ComplianceFrameworkDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setVersion(entity.getVersion());
        dto.setDescription(entity.getDescription());
        
        // Convertir les requirements en DTO
        if (entity.getRequirements() != null) {
            dto.setRequirements(requirementsToDto(entity.getRequirements()));
        }
        
        return dto;
    }
    
    /**
     * Convertit une liste d'entités ComplianceFramework en liste de DTO.
     */
    public List<ComplianceFrameworkDTO> frameworksToDto(List<ComplianceFramework> entities) {
        if (entities == null) {
            return new ArrayList<>();
        }
        
        return entities.stream()
                .map(this::toFrameworkDto)
                .collect(Collectors.toList());
    }

    /**
     * Convertit une entité ComplianceRequirement en DTO.
     */
    public ComplianceRequirementDTO toRequirementDto(ComplianceRequirement entity) {
        if (entity == null) {
            return null;
        }

        ComplianceRequirementDTO dto = new ComplianceRequirementDTO();
        dto.setId(entity.getId());
        dto.setCode(entity.getCode());
        dto.setDescription(entity.getDescription());
        dto.setType(entity.getType());
        
        return dto;
    }
    
    /**
     * Convertit une liste d'entités ComplianceRequirement en liste de DTO.
     */
    public List<ComplianceRequirementDTO> requirementsToDto(List<ComplianceRequirement> entities) {
        if (entities == null) {
            return new ArrayList<>();
        }
        
        return entities.stream()
                .map(this::toRequirementDto)
                .collect(Collectors.toList());
    }
    
    /**
     * Convertit un ensemble d'entités ComplianceRequirement en liste de DTO.
     */
    private List<ComplianceRequirementDTO> requirementsToDto(Set<ComplianceRequirement> entities) {
        if (entities == null) {
            return new ArrayList<>();
        }
        
        return entities.stream()
                .map(this::toRequirementDto)
                .collect(Collectors.toList());
    }
    
    /**
     * Convertit une entité RiskComplianceMapping en DTO.
     */
    public RiskComplianceMappingDTO toMappingDto(RiskComplianceMapping entity) {
        if (entity == null) {
            return null;
        }

        RiskComplianceMappingDTO dto = new RiskComplianceMappingDTO();
        dto.setId(entity.getId());
        
        // Définir les IDs
        if (entity.getRisk() != null) {
            dto.setRiskId(entity.getRisk().getId());
            dto.setRisk(entity.getRisk()); // Objet Risk complet
        }
        
        if (entity.getRequirement() != null) {
            dto.setRequirementId(entity.getRequirement().getId());
            // Convertir en DTO pour éviter la récursion infinie
            ComplianceRequirementDTO requirementDTO = toRequirementDto(entity.getRequirement());
            dto.setRequirement(requirementDTO);
        }
        
        dto.setStatus(entity.getStatus());
        dto.setEvidence(entity.getEvidence());
        dto.setRemediationPlan(entity.getRemediationPlan());
        dto.setComment(entity.getComment());
        
        return dto;
    }
    
    /**
     * Convertit une liste d'entités RiskComplianceMapping en liste de DTO.
     */
    public List<RiskComplianceMappingDTO> mappingsToDto(List<RiskComplianceMapping> entities) {
        if (entities == null) {
            return new ArrayList<>();
        }
        
        return entities.stream()
                .map(this::toMappingDto)
                .collect(Collectors.toList());
    }
} 