package com.sentinelrisk.backend.dto;

import com.sentinelrisk.backend.model.Risk.ImpactLevel;
import com.sentinelrisk.backend.model.Risk.ProbabilityLevel;
import com.sentinelrisk.backend.model.Risk.Status;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO pour l'import en masse de risques, avec support pour la catégorie par nom
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BulkRiskRequest {
    @NotBlank(message = "Le nom est obligatoire")
    @Size(max = 100, message = "Le nom ne peut pas dépasser 100 caractères")
    private String name;

    @Size(max = 1000, message = "La description ne peut pas dépasser 1000 caractères")
    private String description;

    // Possibilité de spécifier soit l'ID, soit le nom de la catégorie
    private Long categoryId;
    private String categoryName;

    private ImpactLevel impactLevel;
    private ProbabilityLevel probabilityLevel;
    private Status status;

    @Size(max = 2000, message = "Le plan de mitigation ne peut pas dépasser 2000 caractères")
    private String mitigationPlan;
} 