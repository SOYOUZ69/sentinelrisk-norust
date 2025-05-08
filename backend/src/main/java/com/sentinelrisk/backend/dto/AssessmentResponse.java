package com.sentinelrisk.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sentinelrisk.backend.model.Assessment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * DTO pour représenter les réponses d'évaluation (assessment) dans l'API
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssessmentResponse {
    private Long id;
    
    private String riskId;
    private String riskName;
    
    private String userId;
    private String userFullName;
    
    private Assessment.Status status;
    
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime assessmentDate;
    
    private String findings;
    private String recommendations;
    
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime nextReviewDate;
    
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdAt;
    
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime updatedAt;
    
    /**
     * Crée un AssessmentResponse à partir d'une entité Assessment
     */
    public static AssessmentResponse fromEntity(Assessment assessment) {
        if (assessment == null) {
            return null;
        }
        
        AssessmentResponse response = new AssessmentResponse();
        response.setId(assessment.getId());
        
        // Informations sur le risque
        if (assessment.getRisk() != null) {
            response.setRiskId(assessment.getRisk().getId().toString());
            response.setRiskName(assessment.getRisk().getName());
        }
        
        // Informations sur l'utilisateur
        if (assessment.getAssignedTo() != null) {
            response.setUserId(assessment.getAssignedTo().getId());
            String firstName = assessment.getAssignedTo().getFirstName() != null ? assessment.getAssignedTo().getFirstName() : "";
            String lastName = assessment.getAssignedTo().getLastName() != null ? assessment.getAssignedTo().getLastName() : "";
            response.setUserFullName(firstName + " " + lastName);
        }
        
        response.setStatus(assessment.getStatus());
        response.setAssessmentDate(assessment.getAssessmentDate());
        response.setFindings(assessment.getFindings());
        response.setRecommendations(assessment.getRecommendations());
        response.setNextReviewDate(assessment.getNextReviewDate());
        response.setCreatedAt(assessment.getCreatedAt());
        response.setUpdatedAt(assessment.getUpdatedAt());
        
        return response;
    }
} 