package com.sentinelrisk.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.HashSet;
import java.util.Set;
import java.time.LocalDate;

@Entity
@Table(name = "controls")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Control {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 100)
    private String name;

    @Size(max = 1000)
    private String description;

    @Enumerated(EnumType.STRING)
    private Type type;

    @Enumerated(EnumType.STRING)
    private Frequency frequency;

    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(name = "implementation_details")
    @Size(max = 2000)
    private String implementationDetails;
    
    @Column(name = "implementation_date")
    private LocalDate implementationDate;
    
    @Column(name = "last_tested_date")
    private LocalDate lastTestedDate;
    
    @Column(name = "effectiveness_score")
    private Integer effectivenessScore;
    
    @Column(name = "owner")
    private String owner;
    
    @Column(name = "documentation")
    private String documentation;

    @ManyToMany(mappedBy = "controls")
    private Set<Risk> risks = new HashSet<>();

    @Column(name = "created_at")
    private java.time.LocalDateTime createdAt;

    @Column(name = "updated_at")
    private java.time.LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = java.time.LocalDateTime.now();
        updatedAt = createdAt;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = java.time.LocalDateTime.now();
    }

    public enum Type {
        PREVENTIVE,
        DETECTIVE,
        CORRECTIVE,
        COMPENSATING
    }

    public enum Frequency {
        CONTINUOUS,
        DAILY,
        WEEKLY,
        MONTHLY,
        QUARTERLY,
        ANNUALLY,
        ON_DEMAND
    }

    public enum Status {
        PLANNED,
        IN_PROGRESS,
        IMPLEMENTED,
        UNDER_REVIEW,
        EFFECTIVE,
        INEFFECTIVE
    }
} 