package com.sentinelrisk.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "control_effectiveness_history")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class ControlEffectivenessHistory {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "control_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Control control;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "risk_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Risk risk;

    @Column(name = "old_score")
    private Integer oldScore;

    @Column(name = "new_score")
    private Integer newScore;

    @Column(name = "old_probability_level")
    @Enumerated(EnumType.STRING)
    private Risk.ProbabilityLevel oldProbabilityLevel;

    @Column(name = "new_probability_level")
    @Enumerated(EnumType.STRING)
    private Risk.ProbabilityLevel newProbabilityLevel;

    @Column(name = "old_impact_level")
    @Enumerated(EnumType.STRING)
    private Risk.ImpactLevel oldImpactLevel;

    @Column(name = "new_impact_level")
    @Enumerated(EnumType.STRING)
    private Risk.ImpactLevel newImpactLevel;

    @Column(name = "control_type")
    @Enumerated(EnumType.STRING)
    private Control.Type controlType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "changed_by_user_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User changedByUser;

    @Column(name = "changed_at")
    private java.time.LocalDateTime changedAt;

    @PrePersist
    protected void onCreate() {
        changedAt = java.time.LocalDateTime.now();
    }
} 