package com.sentinelrisk.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "risk_score_history")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class RiskScoreHistory {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "risk_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Risk risk;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assessment_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Assessment assessment;

    @Column(name = "old_score")
    private Integer oldScore;

    @Column(name = "new_score")
    private Integer newScore;

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