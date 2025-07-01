package com.sentinelrisk.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sentinelrisk.backend.domain.compliance.RemediationPlan;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

/**
 * Entité pour l'historique des changements d'impact des risques causés par les plans d'action.
 * Trace chaque modification du niveau d'impact d'un risque due à l'efficacité d'un plan de remédiation.
 */
@Entity
@Table(name = "risk_impact_history")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class RiskImpactHistory {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Le risque concerné
     */
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "risk_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Risk risk;

    /**
     * Le plan de remédiation qui a causé le changement
     */
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "plan_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private RemediationPlan plan;

    /**
     * Ancien niveau d'impact
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "old_impact_level")
    private Risk.ImpactLevel oldImpactLevel;

    /**
     * Nouveau niveau d'impact
     */
    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "new_impact_level")
    private Risk.ImpactLevel newImpactLevel;

    /**
     * Efficacité du plan qui a causé le changement
     */
    @Column(name = "plan_efficacite")
    private Integer planEfficacite;

    /**
     * Statut du plan au moment du changement
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "plan_status")
    private RemediationPlan.Status planStatus;

    /**
     * Utilisateur qui a effectué le changement
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "changed_by_user_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User changedByUser;

    /**
     * Date et heure du changement
     */
    @Column(name = "changed_at", nullable = false)
    private LocalDateTime changedAt;

    /**
     * Raison du changement (généralement automatique)
     */
    @Column(name = "change_reason")
    private String changeReason;

    @PrePersist
    protected void onCreate() {
        changedAt = LocalDateTime.now();
    }
} 