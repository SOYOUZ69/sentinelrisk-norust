package com.sentinelrisk.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

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

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "risk_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Risk risk;

    @Enumerated(EnumType.STRING)
    @Column(name = "previous_status")
    private Risk.Status previousStatus;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "new_status")
    private Risk.Status newStatus;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "changed_by_user_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User changedByUser;

    @Column(name = "change_reason")
    private String changeReason;

    @Column(name = "change_date")
    private java.time.LocalDateTime changeDate;

    @PrePersist
    protected void onCreate() {
        changeDate = java.time.LocalDateTime.now();
    }
} 