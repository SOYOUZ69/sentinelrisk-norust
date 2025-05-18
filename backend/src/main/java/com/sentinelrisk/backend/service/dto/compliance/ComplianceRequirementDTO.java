package com.sentinelrisk.backend.service.dto.compliance;

import com.sentinelrisk.backend.domain.compliance.ComplianceRequirement.RequirementType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * DTO pour l'entité ComplianceRequirement.
 * Version simplifiée sans récursion pour l'API.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ComplianceRequirementDTO {
    
    private Long id;
    private String code;
    private String description;
    private RequirementType type;
} 