package com.sentinelrisk.backend.service.dto.compliance;

import com.sentinelrisk.backend.domain.compliance.RiskComplianceMapping.ComplianceStatus;
import com.sentinelrisk.backend.model.Risk;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * DTO pour l'entité RiskComplianceMapping.
 * Version simplifiée sans récursion pour l'API.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RiskComplianceMappingDTO {
    
    private Long id;
    private Long riskId;
    private Long requirementId;
    private ComplianceStatus status;
    private String evidence;
    private String remediationPlan;
    private String comment;
    
    // Objets complets pour l'affichage dans le frontend
    private Risk risk;
    private ComplianceRequirementDTO requirement;
} 