package com.sentinelrisk.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "risk_status_history")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class RiskStatusHistory {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "risk_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Risk risk;

    @Enumerated(EnumType.STRING)
    @Column(name = "previous_status")
    private Risk.Status previousStatus;

    @Enumerated(EnumType.STRING)
    @Column(name = "new_status", nullable = false)
    private Risk.Status newStatus;

    @Column(name = "transition_reason", length = 500)
    private String transitionReason;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "changed_by_user_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User changedByUser;

    @Column(name = "changed_at", nullable = false)
    private LocalDateTime changedAt;

    @PrePersist
    protected void onCreate() {
        changedAt = LocalDateTime.now();
    }

    // Constructeur utilitaire
    public RiskStatusHistory(Risk risk, Risk.Status previousStatus, Risk.Status newStatus, 
                           String transitionReason, User changedByUser) {
        this.risk = risk;
        this.previousStatus = previousStatus;
        this.newStatus = newStatus;
        this.transitionReason = transitionReason;
        this.changedByUser = changedByUser;
        this.changedAt = LocalDateTime.now();
    }
} 