package com.sentinelrisk.dto;

import com.sentinelrisk.model.ControlStatus;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ComplianceControlDTO {
    private Long id;
    private String name;
    private String description;
    private String framework;
    private String controlReference;
    private ControlStatus status;
    private LocalDateTime lastAssessment;
    private LocalDateTime nextAssessment;
    private Long responsibleId;
    private String responsibleName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Champ calculé pour indiquer si une évaluation est en retard
    private boolean isOverdue;
    
    public boolean getIsOverdue() {
        if (nextAssessment == null) {
            return false;
        }
        return LocalDateTime.now().isAfter(nextAssessment);
    }
} 