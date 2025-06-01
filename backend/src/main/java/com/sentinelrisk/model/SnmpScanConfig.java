package com.sentinelrisk.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Entity
@Table(name = "snmp_scan_configs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class SnmpScanConfig {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    @NotBlank(message = "Le nom de la configuration est obligatoire")
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "asset_id", nullable = false)
    @NotNull(message = "L'asset associé est obligatoire")
    private Asset asset;

    @Column(name = "cron_expression")
    private String cronExpression;

    @Column(name = "interval_minutes")
    private Integer intervalMinutes;

    @Column(name = "oids", columnDefinition = "TEXT")
    @JdbcTypeCode(SqlTypes.JSON)
    private List<String> oids;

    @Column(name = "severity_thresholds", columnDefinition = "TEXT")
    @JdbcTypeCode(SqlTypes.JSON)
    private Map<String, SeverityThreshold> severityThresholds;

    @Column(name = "active", nullable = false)
    private Boolean active = true;

    @Column(name = "description")
    private String description;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    @PreUpdate
    private void validateConfig() {
        if (cronExpression == null && intervalMinutes == null) {
            throw new IllegalArgumentException("Une expression cron ou un intervalle en minutes doit être spécifié");
        }
        if (cronExpression != null && intervalMinutes != null) {
            throw new IllegalArgumentException("Seule une expression cron OU un intervalle peut être spécifié, pas les deux");
        }
        if (oids == null || oids.isEmpty()) {
            throw new IllegalArgumentException("Au moins un OID doit être spécifié");
        }
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SeverityThreshold {
        private Double minValue;
        private Double maxValue;
        private SeverityLevel severity;
        private String description;

        public enum SeverityLevel {
            LOW("Faible"),
            MEDIUM("Moyen"),
            HIGH("Élevé"),
            CRITICAL("Critique");

            private final String displayName;

            SeverityLevel(String displayName) {
                this.displayName = displayName;
            }

            public String getDisplayName() {
                return displayName;
            }
        }

        public boolean isInRange(Double value) {
            if (value == null) return false;
            
            boolean aboveMin = (minValue == null) || (value >= minValue);
            boolean belowMax = (maxValue == null) || (value <= maxValue);
            
            return aboveMin && belowMax;
        }
    }
} 