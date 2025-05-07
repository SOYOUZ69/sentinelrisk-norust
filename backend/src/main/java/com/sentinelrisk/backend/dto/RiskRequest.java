package com.sentinelrisk.backend.dto;

import com.sentinelrisk.backend.model.Risk.ImpactLevel;
import com.sentinelrisk.backend.model.Risk.ProbabilityLevel;
import com.sentinelrisk.backend.model.Risk.Status;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RiskRequest {
    
    @NotBlank(message = "Le nom ne peut pas être vide")
    @Size(max = 100, message = "Le nom ne peut pas dépasser 100 caractères")
    private String name;
    
    @Size(max = 1000, message = "La description ne peut pas dépasser 1000 caractères")
    private String description;
    
    @NotNull(message = "La catégorie est obligatoire")
    private Long categoryId;
    
    @NotNull(message = "Le niveau d'impact est obligatoire")
    private ImpactLevel impactLevel;
    
    @NotNull(message = "Le niveau de probabilité est obligatoire")
    private ProbabilityLevel probabilityLevel;
    
    @NotNull(message = "Le statut est obligatoire")
    private Status status;
    
    @Size(max = 2000, message = "Le plan de mitigation ne peut pas dépasser 2000 caractères")
    private String mitigationPlan;
} 