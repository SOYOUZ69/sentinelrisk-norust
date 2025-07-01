package com.sentinelrisk.backend.dto;

import com.sentinelrisk.backend.domain.compliance.RemediationPlan;
import com.sentinelrisk.backend.model.Risk;
import com.sentinelrisk.backend.model.User;
import com.sentinelrisk.backend.model.RiskImpactHistory;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * DTO pour l'historique d'impact des risques causés par les plans de remédiation
 */
@Data
@Schema(description = "Historique d'impact d'un risque")
public class RiskImpactHistoryDTO {

    @Schema(description = "ID de l'entrée d'historique")
    private Long id;

    @Schema(description = "ID du risque")
    private Long riskId;

    @Schema(description = "Titre du risque")
    private String riskTitle;

    @Schema(description = "ID du plan de remédiation")
    private Long planId;

    @Schema(description = "Titre du plan de remédiation")
    private String planTitle;

    @Schema(description = "Ancien niveau d'impact")
    private Risk.ImpactLevel oldImpactLevel;

    @Schema(description = "Nouveau niveau d'impact")
    private Risk.ImpactLevel newImpactLevel;

    @Schema(description = "Efficacité du plan au moment du changement")
    private Integer planEfficacite;

    @Schema(description = "Statut du plan au moment du changement")
    private RemediationPlan.Status planStatus;

    @Schema(description = "ID de l'utilisateur qui a effectué le changement")
    private String changedByUserId;

    @Schema(description = "Nom de l'utilisateur qui a effectué le changement")
    private String changedByUserName;

    @Schema(description = "Raison du changement")
    private String changeReason;

    @Schema(description = "Date et heure du changement")
    private LocalDateTime changedAt;

    public static RiskImpactHistoryDTO fromEntity(RiskImpactHistory entity) {
        if (entity == null) return null;
        RiskImpactHistoryDTO dto = new RiskImpactHistoryDTO();
        dto.setId(entity.getId());
        if (entity.getRisk() != null) {
            dto.setRiskId(entity.getRisk().getId());
            dto.setRiskTitle(entity.getRisk().getName());
        }
        if (entity.getPlan() != null) {
            dto.setPlanId(entity.getPlan().getId());
            dto.setPlanTitle(entity.getPlan().getTitle());
        }
        dto.setOldImpactLevel(entity.getOldImpactLevel());
        dto.setNewImpactLevel(entity.getNewImpactLevel());
        dto.setPlanEfficacite(entity.getPlanEfficacite());
        dto.setPlanStatus(entity.getPlanStatus());
        if (entity.getChangedByUser() != null) {
            dto.setChangedByUserId(entity.getChangedByUser().getId());
            dto.setChangedByUserName(entity.getChangedByUser().getFirstName() + " " + entity.getChangedByUser().getLastName());
        }
        dto.setChangeReason(entity.getChangeReason());
        dto.setChangedAt(entity.getChangedAt());
        return dto;
    }
} 