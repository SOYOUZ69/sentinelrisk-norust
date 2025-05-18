package com.sentinelrisk.backend.service.dto.compliance;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

/**
 * DTO pour l'entité ComplianceFramework.
 * Version simplifiée sans récursion pour l'API.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ComplianceFrameworkDTO {
    
    private Long id;
    private String name;
    private String version;
    private String description;
    private List<ComplianceRequirementDTO> requirements = new ArrayList<>();
} 