package com.sentinelrisk.backend.dto;

import com.sentinelrisk.backend.model.Risk.ImpactLevel;
import com.sentinelrisk.backend.model.Risk.ProbabilityLevel;
import com.sentinelrisk.backend.model.Risk.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * DTO pour représenter un risque sans boucle de référence
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RiskResponse {
    private Long id;
    private String name;
    private String description;
    
    // Référence simplifiée à la catégorie
    private Long categoryId;
    private String categoryName;
    
    // IDs des contrôles associés (pour compatibilité)
    private Set<Long> controlIds = new HashSet<>();
    
    // Objets contrôles complets
    private Set<ControlDTO> controls = new HashSet<>();
    
    private ImpactLevel impactLevel;
    private ProbabilityLevel probabilityLevel;
    private Integer riskScore;
    private Status status;
    private String mitigationPlan;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
} 