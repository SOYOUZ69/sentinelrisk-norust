package com.sentinelrisk.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sentinelrisk.backend.model.Risk;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * DTO pour représenter l'historique des statuts de risque
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RiskStatusHistoryDTO {
    
    private Long id;
    
    private Long riskId;
    private String riskName;
    
    private Risk.Status previousStatus;
    private Risk.Status newStatus;
    
    private String changedByUserId;
    private String changedByUserName;
    
    private String changeReason;
    
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime changeDate;
    
    /**
     * Crée un RiskStatusHistoryDTO à partir d'une entité RiskStatusHistory
     */
    public static RiskStatusHistoryDTO fromEntity(com.sentinelrisk.backend.model.RiskStatusHistory entity) {
        RiskStatusHistoryDTO dto = new RiskStatusHistoryDTO();
        dto.setId(entity.getId());
        dto.setRiskId(entity.getRisk().getId());
        dto.setRiskName(entity.getRisk().getName());
        dto.setPreviousStatus(entity.getPreviousStatus());
        dto.setNewStatus(entity.getNewStatus());
        
        if (entity.getChangedByUser() != null) {
            dto.setChangedByUserId(entity.getChangedByUser().getId());
            dto.setChangedByUserName(entity.getChangedByUser().getFirstName() + " " + 
                                   entity.getChangedByUser().getLastName());
        }
        
        dto.setChangeReason(entity.getChangeReason());
        dto.setChangeDate(entity.getChangeDate());
        
        return dto;
    }
} 