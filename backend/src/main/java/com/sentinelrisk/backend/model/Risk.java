package com.sentinelrisk.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "risks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Risk {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 100)
    private String name;

    @Size(max = 1000)
    private String description;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    @JsonBackReference
    private Category category;

    @ManyToMany
    @JoinTable(
        name = "risk_controls",
        joinColumns = @JoinColumn(name = "risk_id"),
        inverseJoinColumns = @JoinColumn(name = "control_id")
    )
    private Set<Control> controls = new HashSet<>();

    @Enumerated(EnumType.STRING)
    @Column(name = "impact_level")
    private ImpactLevel impactLevel;

    @Enumerated(EnumType.STRING)
    @Column(name = "probability_level")
    private ProbabilityLevel probabilityLevel;

    @Column(name = "risk_score")
    private Integer riskScore;

    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(name = "mitigation_plan")
    @Size(max = 2000)
    private String mitigationPlan;

    @Column(name = "created_at")
    private java.time.LocalDateTime createdAt;

    @Column(name = "updated_at")
    private java.time.LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = java.time.LocalDateTime.now();
        updatedAt = createdAt;
        calculateRiskScore();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = java.time.LocalDateTime.now();
        calculateRiskScore();
    }

    private void calculateRiskScore() {
        if (impactLevel != null && probabilityLevel != null) {
            riskScore = impactLevel.getValue() * probabilityLevel.getValue();
        }
    }

    // Helper methods for managing the bidirectional relationship
    public void addControl(Control control) {
        controls.add(control);
        control.getRisks().add(this);
    }

    public void removeControl(Control control) {
        controls.remove(control);
        control.getRisks().remove(this);
    }

    public enum Status {
        IDENTIFIED,
        IN_ASSESSMENT,
        MITIGATED,
        ACCEPTED,
        CLOSED
    }

    public enum ImpactLevel {
        NEGLIGIBLE(1),
        MINOR(2),
        MODERATE(3),
        MAJOR(4),
        SEVERE(5);

        private final int value;

        ImpactLevel(int value) {
            this.value = value;
        }

        public int getValue() {
            return value;
        }
    }

    public enum ProbabilityLevel {
        RARE(1),
        UNLIKELY(2),
        POSSIBLE(3),
        LIKELY(4),
        ALMOST_CERTAIN(5);

        private final int value;

        ProbabilityLevel(int value) {
            this.value = value;
        }

        public int getValue() {
            return value;
        }
    }
} 