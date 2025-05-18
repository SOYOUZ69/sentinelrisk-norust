package com.sentinelrisk.backend.domain.compliance;

import com.sentinelrisk.backend.model.Risk;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "risk_compliance_mappings", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"risk_id", "requirement_id"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RiskComplianceMapping {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "risk_id", nullable = false)
    private Risk risk;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "requirement_id", nullable = false)
    private ComplianceRequirement requirement;
    
    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ComplianceStatus status;
    
    @Size(max = 1000)
    @Column(length = 1000)
    private String evidence;
    
    @Size(max = 1000)
    @Column(name = "remediation_plan", length = 1000)
    private String remediationPlan;
    
    @Size(max = 500)
    @Column(length = 500)
    private String comment;
    
    @CreationTimestamp
    @Column(name = "mapped_at", nullable = false, updatable = false)
    private LocalDateTime mappedAt;
    
    // Énumération pour le statut de conformité
    public enum ComplianceStatus {
        COMPLIANT, NON_COMPLIANT, PARTIALLY_COMPLIANT, NOT_APPLICABLE
    }
} 