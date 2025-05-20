package com.sentinelrisk.backend.service.mapper;

import com.sentinelrisk.backend.domain.compliance.RemediationPlan;
import com.sentinelrisk.backend.domain.compliance.RiskComplianceMapping;
import com.sentinelrisk.backend.model.User;
import com.sentinelrisk.backend.repository.compliance.RiskComplianceMappingRepository;
import com.sentinelrisk.backend.service.dto.compliance.RemediationPlanDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Mapper pour convertir les entités RemediationPlan en DTO et vice-versa
 */
@Component
@RequiredArgsConstructor
public class RemediationPlanMapper {

    private final RiskComplianceMappingRepository mappingRepository;

    /**
     * Convertit un RemediationPlan en RemediationPlanDTO
     * @param entity L'entité à convertir
     * @return Le DTO correspondant
     */
    public RemediationPlanDTO toDto(RemediationPlan entity) {
        if (entity == null) {
            return null;
        }

        RemediationPlanDTO dto = new RemediationPlanDTO();
        dto.setId(entity.getId());
        
        if (entity.getMapping() != null) {
            dto.setMappingId(entity.getMapping().getId());
            
            // Générer un résumé du mapping (ex: "Risk XYZ - Requirement ABC")
            RiskComplianceMapping mapping = entity.getMapping();
            String riskName = mapping.getRisk() != null ? mapping.getRisk().getName() : "N/A";
            String reqCode = mapping.getRequirement() != null ? mapping.getRequirement().getCode() : "N/A";
            dto.setMappingSummary(riskName + " - " + reqCode);
        }
        
        dto.setTitle(entity.getTitle());
        dto.setDescription(entity.getDescription());
        
        if (entity.getOwner() != null) {
            dto.setOwnerId(entity.getOwner().getId());
            dto.setOwnerName(entity.getOwner().getFirstName() + " " + entity.getOwner().getLastName());
        }
        
        dto.setDueDate(entity.getDueDate());
        dto.setStatus(entity.getStatus());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());
        
        return dto;
    }

    /**
     * Convertit un RemediationPlanDTO en RemediationPlan
     * @param dto Le DTO à convertir
     * @return L'entité correspondante
     */
    public RemediationPlan toEntity(RemediationPlanDTO dto) {
        if (dto == null) {
            return null;
        }

        RemediationPlan entity = new RemediationPlan();
        
        // Ne pas modifier l'id lors de la création
        if (dto.getId() != null) {
            entity.setId(dto.getId());
        }
        
        if (dto.getMappingId() != null) {
            RiskComplianceMapping mapping = new RiskComplianceMapping();
            mapping.setId(dto.getMappingId());
            entity.setMapping(mapping);
        }
        
        entity.setTitle(dto.getTitle());
        entity.setDescription(dto.getDescription());
        
        if (dto.getOwnerId() != null) {
            User owner = new User();
            owner.setId(dto.getOwnerId());
            entity.setOwner(owner);
        }
        
        entity.setDueDate(dto.getDueDate());
        entity.setStatus(dto.getStatus());
        
        // Les dates sont gérées par les callbacks @PrePersist et @PreUpdate
        
        return entity;
    }

    /**
     * Convertit une liste d'entités en liste de DTOs
     * @param entities La liste d'entités à convertir
     * @return La liste de DTOs correspondante
     */
    public List<RemediationPlanDTO> toDtoList(List<RemediationPlan> entities) {
        if (entities == null) {
            return List.of();
        }
        
        return entities.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }
} 