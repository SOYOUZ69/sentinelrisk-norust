package com.sentinelrisk.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sentinelrisk.backend.model.Risk;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * DTO pour représenter l'historique des scores de risque
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RiskScoreHistoryDTO {
    
    private Long id;
    
    private Long riskId;
    private String riskName;
    
    private Long assessmentId;
    private String assessmentTitle;
    
    private Integer oldScore;
    private Integer newScore;
    
    private String changedByUserId;
    private String changedByUserName;
    
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime changedAt;
    
    /**
     * Crée un RiskScoreHistoryDTO à partir d'une entité RiskScoreHistory
     */
    public static RiskScoreHistoryDTO fromEntity(com.sentinelrisk.backend.model.RiskScoreHistory entity) {
        RiskScoreHistoryDTO dto = new RiskScoreHistoryDTO();
        dto.setId(entity.getId());
        dto.setRiskId(entity.getRisk().getId());
        dto.setRiskName(entity.getRisk().getName());
        
        if (entity.getAssessment() != null) {
            dto.setAssessmentId(entity.getAssessment().getId());
            dto.setAssessmentTitle("Assessment #" + entity.getAssessment().getId());
        }
        
        dto.setOldScore(entity.getOldScore());
        dto.setNewScore(entity.getNewScore());
        
        if (entity.getChangedByUser() != null) {
            dto.setChangedByUserId(entity.getChangedByUser().getId());
            dto.setChangedByUserName(entity.getChangedByUser().getFirstName() + " " + 
                                   entity.getChangedByUser().getLastName());
        }
        
        dto.setChangedAt(entity.getChangedAt());
        
        return dto;
    }
} 