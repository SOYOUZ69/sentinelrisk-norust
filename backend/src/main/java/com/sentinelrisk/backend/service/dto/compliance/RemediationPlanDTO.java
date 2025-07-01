package com.sentinelrisk.backend.service.dto.compliance;

import com.sentinelrisk.backend.domain.compliance.RemediationPlan;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * DTO pour la communication des données de plans de remédiation entre le service et le client
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RemediationPlanDTO {
    
    /**
     * Identifiant unique du plan
     */
    private Long id;
    
    /**
     * Identifiant du mapping risque-conformité associé
     */
    @NotNull(message = "L'identifiant du mapping est obligatoire")
    private Long mappingId;
    
    /**
     * Titre du plan de remédiation
     */
    @NotBlank(message = "Le titre est obligatoire")
    private String title;
    
    /**
     * Description détaillée du plan
     */
    private String description;
    
    /**
     * Identifiant de l'utilisateur responsable
     */
    private String ownerId;
    
    /**
     * Nom de l'utilisateur responsable (lecture seule)
     */
    private String ownerName;
    
    /**
     * Date d'échéance
     */
    private LocalDate dueDate;
    
    /**
     * Statut du plan
     */
    @NotNull(message = "Le statut est obligatoire")
    private RemediationPlan.Status status;
    
    /**
     * Date de création
     */
    private LocalDateTime createdAt;
    
    /**
     * Date de dernière mise à jour
     */
    private LocalDateTime updatedAt;

    /**
     * Taux d'efficacité ou de réalisation du plan (0 à 100 %)
     */
    @Min(value = 0, message = "L'efficacité ne peut pas être négative")
    @Max(value = 100, message = "L'efficacité ne peut pas dépasser 100%")
    private Integer efficacite = 0;

    /**
     * Informations résumées sur le mapping (lecture seule)
     */
    private String mappingSummary;
} 