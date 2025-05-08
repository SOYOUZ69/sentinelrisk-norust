package com.sentinelrisk.backend.mapper;

import com.sentinelrisk.backend.dto.AssessmentDTO;
import com.sentinelrisk.backend.model.Assessment;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Mapper pour la conversion entre entité Assessment et DTO
 */
@Component
public class AssessmentMapper {

    /**
     * Convertit une entité Assessment en DTO
     */
    public AssessmentDTO toDto(Assessment assessment) {
        if (assessment == null) {
            return null;
        }

        AssessmentDTO dto = new AssessmentDTO();
        dto.setId(assessment.getId());
        
        // Mapper le risque
        if (assessment.getRisk() != null) {
            AssessmentDTO.RiskDTO riskDto = new AssessmentDTO.RiskDTO(
                assessment.getRisk().getId(),
                assessment.getRisk().getName()
            );
            dto.setRisk(riskDto);
        }
        
        // Mapper l'utilisateur assigné
        if (assessment.getAssignedTo() != null) {
            AssessmentDTO.UserDTO userDto = new AssessmentDTO.UserDTO(
                assessment.getAssignedTo().getId(),
                assessment.getAssignedTo().getFirstName(),
                assessment.getAssignedTo().getLastName()
            );
            dto.setAssignedTo(userDto);
        }
        
        dto.setStatus(assessment.getStatus());
        dto.setAssessmentDate(assessment.getAssessmentDate());
        dto.setFindings(assessment.getFindings());
        dto.setRecommendations(assessment.getRecommendations());
        dto.setNextReviewDate(assessment.getNextReviewDate());
        dto.setCreatedAt(assessment.getCreatedAt());
        dto.setUpdatedAt(assessment.getUpdatedAt());
        
        return dto;
    }
    
    /**
     * Convertit une liste d'entités Assessment en liste de DTOs
     */
    public List<AssessmentDTO> toDtoList(List<Assessment> assessments) {
        if (assessments == null) {
            return null;
        }
        
        return assessments.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }
} 