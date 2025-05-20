package com.sentinelrisk.backend.domain.compliance;

import com.sentinelrisk.backend.model.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Entité représentant un plan de remédiation pour un écart de conformité.
 * Permet de définir les actions correctives à entreprendre pour résoudre un écart.
 */
@Entity
@Table(name = "remediation_plan")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RemediationPlan {

    /**
     * Statut possible d'un plan de remédiation
     */
    public enum Status {
        TODO,       // À faire
        IN_PROGRESS, // En cours
        DONE        // Terminé
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Le mapping risque-conformité associé à ce plan
     */
    @ManyToOne(optional = false)
    @JoinColumn(name = "mapping_id", nullable = false)
    private RiskComplianceMapping mapping;

    /**
     * Titre du plan de remédiation
     */
    @NotBlank
    @Column(nullable = false)
    private String title;

    /**
     * Description détaillée du plan
     */
    @Column(length = 2000)
    private String description;

    /**
     * Utilisateur responsable de l'exécution du plan
     */
    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

    /**
     * Date d'échéance pour la réalisation du plan
     */
    @Column(name = "due_date")
    private LocalDate dueDate;

    /**
     * Statut actuel du plan
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.TODO;

    /**
     * Date de création du plan
     */
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    /**
     * Date de dernière mise à jour du plan
     */
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    /**
     * Initialise les dates de création et de mise à jour avant la persistence
     */
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    /**
     * Met à jour la date de dernière modification avant la mise à jour
     */
    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
} 