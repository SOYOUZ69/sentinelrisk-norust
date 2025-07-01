package com.sentinelrisk.backend.domain.compliance;

import com.sentinelrisk.backend.model.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

/**
 * Entité pour l'historique des changements d'efficacité des plans de remédiation.
 * Trace chaque modification du taux d'efficacité d'un plan d'action.
 */
@Entity
@Table(name = "remediation_plan_efficacite_history")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RemediationPlanEfficaciteHistory {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Le plan de remédiation concerné
     */
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "plan_id", nullable = false)
    private RemediationPlan plan;

    /**
     * Le risque associé au plan (via le mapping)
     */
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "risk_id", nullable = false)
    private com.sentinelrisk.backend.model.Risk risk;

    /**
     * Ancien score d'efficacité
     */
    @Column(name = "old_score")
    private Integer oldScore;

    /**
     * Nouveau score d'efficacité
     */
    @Column(name = "new_score")
    private Integer newScore;

    /**
     * Utilisateur qui a effectué le changement
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "changed_by_user_id")
    private User changedByUser;

    /**
     * Date et heure du changement
     */
    @Column(name = "changed_at", nullable = false)
    private LocalDateTime changedAt;

    /**
     * Raison du changement (optionnel)
     */
    @Column(name = "change_reason")
    private String changeReason;

    /**
     * Indique si ce changement a eu un impact sur le niveau d'impact du risque
     */
    @Column(name = "impacted_risk_level")
    private Boolean impactedRiskLevel = false;

    /**
     * Ancien niveau d'impact du risque (si impacté)
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "old_risk_impact_level")
    private com.sentinelrisk.backend.model.Risk.ImpactLevel oldRiskImpactLevel;

    /**
     * Nouveau niveau d'impact du risque (si impacté)
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "new_risk_impact_level")
    private com.sentinelrisk.backend.model.Risk.ImpactLevel newRiskImpactLevel;

    @PrePersist
    protected void onCreate() {
        changedAt = LocalDateTime.now();
    }
} 