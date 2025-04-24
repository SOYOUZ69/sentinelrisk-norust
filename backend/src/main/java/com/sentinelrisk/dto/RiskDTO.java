package com.sentinelrisk.dto;

import com.sentinelrisk.model.RiskLevel;
import com.sentinelrisk.model.RiskCategory;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class RiskDTO {
    private Long id;
    private String name;
    private String description;
    private RiskLevel level;
    private RiskCategory category;
    private Double probability;
    private Double impact;
    private Long ownerId;
    private String ownerName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Champ calculé pour le score de risque
    private Double riskScore;
    
    public Double getRiskScore() {
        return probability * impact;
    }
} 