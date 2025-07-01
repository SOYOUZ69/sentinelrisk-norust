package com.sentinelrisk.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sentinelrisk.backend.model.Control;
import com.sentinelrisk.backend.model.ControlEffectivenessHistory;
import com.sentinelrisk.backend.model.Risk;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * DTO pour représenter l'historique des changements d'efficacité des contrôles
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ControlEffectivenessHistoryDTO {
    
    private Long id;
    
    private Long controlId;
    private String controlName;
    
    private Long riskId;
    private String riskName;
    
    private Integer oldScore;
    private Integer newScore;
    
    private String oldProbabilityLevel;
    private String newProbabilityLevel;
    
    private String oldImpactLevel;
    private String newImpactLevel;
    
    private String controlType;
    
    private String changedByUserId;
    private String changedByUserName;
    
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime changedAt;
    
    /**
     * Crée un ControlEffectivenessHistoryDTO à partir d'une entité ControlEffectivenessHistory
     */
    public static ControlEffectivenessHistoryDTO fromEntity(ControlEffectivenessHistory entity) {
        ControlEffectivenessHistoryDTO dto = new ControlEffectivenessHistoryDTO();
        dto.setId(entity.getId());
        
        // Informations sur le contrôle
        if (entity.getControl() != null) {
            dto.setControlId(entity.getControl().getId());
            dto.setControlName(entity.getControl().getName());
        }
        
        // Informations sur le risque
        if (entity.getRisk() != null) {
            dto.setRiskId(entity.getRisk().getId());
            dto.setRiskName(entity.getRisk().getName());
        }
        
        dto.setOldScore(entity.getOldScore());
        dto.setNewScore(entity.getNewScore());
        
        // Niveaux de probabilité
        if (entity.getOldProbabilityLevel() != null) {
            dto.setOldProbabilityLevel(entity.getOldProbabilityLevel().name());
        }
        if (entity.getNewProbabilityLevel() != null) {
            dto.setNewProbabilityLevel(entity.getNewProbabilityLevel().name());
        }
        
        // Niveaux d'impact
        if (entity.getOldImpactLevel() != null) {
            dto.setOldImpactLevel(entity.getOldImpactLevel().name());
        }
        if (entity.getNewImpactLevel() != null) {
            dto.setNewImpactLevel(entity.getNewImpactLevel().name());
        }
        
        // Type de contrôle
        if (entity.getControlType() != null) {
            dto.setControlType(entity.getControlType().name());
        }
        
        // Informations sur l'utilisateur
        if (entity.getChangedByUser() != null) {
            dto.setChangedByUserId(entity.getChangedByUser().getId());
            String firstName = entity.getChangedByUser().getFirstName() != null ? entity.getChangedByUser().getFirstName() : "";
            String lastName = entity.getChangedByUser().getLastName() != null ? entity.getChangedByUser().getLastName() : "";
            dto.setChangedByUserName(firstName + " " + lastName);
        }
        
        dto.setChangedAt(entity.getChangedAt());
        
        return dto;
    }
} 