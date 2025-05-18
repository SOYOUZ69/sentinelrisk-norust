package com.sentinelrisk.backend.service.dto.compliance;

import com.sentinelrisk.backend.domain.compliance.RiskComplianceMapping.ComplianceStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

/**
 * DTO pour la réponse d'analyse d'écarts, contenant à la fois 
 * le comptage des mappings par statut et la liste des exigences non couvertes
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GapAnalysisResponse {
    
    /**
     * Comptage des mappings par statut de conformité
     */
    private Map<ComplianceStatus, Long> counts;
    
    /**
     * Liste des exigences de conformité non mappées
     */
    private List<ComplianceRequirementDTO> gaps;
    
    /**
     * Pourcentage global de conformité
     */
    private Double compliancePercentage;
} 