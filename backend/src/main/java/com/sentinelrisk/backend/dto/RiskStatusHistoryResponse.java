package com.sentinelrisk.backend.dto;

import com.sentinelrisk.backend.model.Risk;
import com.sentinelrisk.backend.model.RiskStatusHistory;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class RiskStatusHistoryResponse {
    
    private Long id;
    private Long riskId;
    private String previousStatus;
    private String newStatus;
    private String transitionReason;
    private String changedByUser;
    private LocalDateTime changedAt;

    public static RiskStatusHistoryResponse fromEntity(RiskStatusHistory history) {
        RiskStatusHistoryResponse response = new RiskStatusHistoryResponse();
        response.setId(history.getId());
        response.setRiskId(history.getRisk().getId());
        response.setPreviousStatus(history.getPreviousStatus() != null ? history.getPreviousStatus().name() : null);
        response.setNewStatus(history.getNewStatus().name());
        response.setTransitionReason(history.getTransitionReason());
        response.setChangedAt(history.getChangedAt());
        
        if (history.getChangedByUser() != null) {
            response.setChangedByUser(history.getChangedByUser().getFirstName() + " " + history.getChangedByUser().getLastName());
        }
        
        return response;
    }
} 