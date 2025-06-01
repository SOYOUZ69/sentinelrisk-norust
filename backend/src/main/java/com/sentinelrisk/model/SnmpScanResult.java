package com.sentinelrisk.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.Map;

@Entity
@Table(name = "snmp_scan_results")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class SnmpScanResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "config_id", nullable = false)
    @NotNull(message = "La configuration associée est obligatoire")
    private SnmpScanConfig config;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "asset_id", nullable = false)
    @NotNull(message = "L'asset associé est obligatoire")
    private Asset asset;

    @Column(name = "timestamp", nullable = false)
    @NotNull(message = "Le timestamp est obligatoire")
    private LocalDateTime timestamp;

    @Column(name = "values", columnDefinition = "TEXT")
    @JdbcTypeCode(SqlTypes.JSON)
    private Map<String, Object> values;

    @Column(name = "global_score")
    private Double globalScore;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private ScanStatus status = ScanStatus.SUCCESS;

    @Column(name = "error_message")
    private String errorMessage;

    @Column(name = "execution_time_ms")
    private Long executionTimeMs;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public enum ScanStatus {
        SUCCESS("Succès"),
        PARTIAL_SUCCESS("Succès partiel"),
        FAILURE("Échec"),
        TIMEOUT("Timeout"),
        CONNECTION_ERROR("Erreur de connexion");

        private final String displayName;

        ScanStatus(String displayName) {
            this.displayName = displayName;
        }

        public String getDisplayName() {
            return displayName;
        }
    }

    // Méthodes utilitaires
    public boolean isSuccessful() {
        return status == ScanStatus.SUCCESS || status == ScanStatus.PARTIAL_SUCCESS;
    }

    public boolean hasErrors() {
        return status == ScanStatus.FAILURE || 
               status == ScanStatus.TIMEOUT || 
               status == ScanStatus.CONNECTION_ERROR;
    }

    public Object getValue(String oid) {
        return values != null ? values.get(oid) : null;
    }

    public void addValue(String oid, Object value) {
        if (values != null) {
            values.put(oid, value);
        }
    }
} 