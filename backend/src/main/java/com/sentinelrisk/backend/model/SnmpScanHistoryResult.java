package com.sentinelrisk.backend.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * Entité pour stocker les résultats détaillés de chaque OID dans l'historique des scans SNMP
 */
@Entity
@Table(name = "snmp_scan_history_result")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class SnmpScanHistoryResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "scan_history_id", nullable = false)
    @JsonIgnore
    private SnmpScanHistory scanHistory;

    @Column(name = "oid", nullable = false, length = 500)
    private String oid;

    @Column(name = "value", columnDefinition = "TEXT")
    private String value;

    @Column(name = "snmp_type", nullable = false, length = 100)
    private String snmpType;

    @Column(name = "success", nullable = false)
    private Boolean success;

    @Column(name = "error_message", columnDefinition = "TEXT")
    private String errorMessage;

    @Column(name = "oid_name", length = 500)
    private String oidName;

    @Column(name = "oid_description", columnDefinition = "TEXT")
    private String oidDescription;

    @Column(name = "oid_category", length = 100)
    private String oidCategory;

    @Column(name = "formatted_value", length = 1000)
    private String formattedValue;

    @Column(name = "interpretation", length = 1000)
    private String interpretation;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private SnmpResultStatus status;

    // Constructeurs
    public SnmpScanHistoryResult() {}

    public SnmpScanHistoryResult(String oid, String value, String snmpType, Boolean success) {
        this.oid = oid;
        this.value = value;
        this.snmpType = snmpType;
        this.success = success;
        this.status = success ? SnmpResultStatus.NORMAL : SnmpResultStatus.ERROR;
    }

    public SnmpScanHistoryResult(String oid, String value, String snmpType, Boolean success, 
                                String oidName, String oidDescription, String oidCategory,
                                String formattedValue, String interpretation, SnmpResultStatus status) {
        this.oid = oid;
        this.value = value;
        this.snmpType = snmpType;
        this.success = success;
        this.oidName = oidName;
        this.oidDescription = oidDescription;
        this.oidCategory = oidCategory;
        this.formattedValue = formattedValue;
        this.interpretation = interpretation;
        this.status = status != null ? status : (success ? SnmpResultStatus.NORMAL : SnmpResultStatus.ERROR);
    }

    // Getters et Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public SnmpScanHistory getScanHistory() {
        return scanHistory;
    }

    public void setScanHistory(SnmpScanHistory scanHistory) {
        this.scanHistory = scanHistory;
    }

    public String getOid() {
        return oid;
    }

    public void setOid(String oid) {
        this.oid = oid;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getSnmpType() {
        return snmpType;
    }

    public void setSnmpType(String snmpType) {
        this.snmpType = snmpType;
    }

    public Boolean getSuccess() {
        return success;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public String getOidName() {
        return oidName;
    }

    public void setOidName(String oidName) {
        this.oidName = oidName;
    }

    public String getOidDescription() {
        return oidDescription;
    }

    public void setOidDescription(String oidDescription) {
        this.oidDescription = oidDescription;
    }

    public String getOidCategory() {
        return oidCategory;
    }

    public void setOidCategory(String oidCategory) {
        this.oidCategory = oidCategory;
    }

    public String getFormattedValue() {
        return formattedValue;
    }

    public void setFormattedValue(String formattedValue) {
        this.formattedValue = formattedValue;
    }

    public String getInterpretation() {
        return interpretation;
    }

    public void setInterpretation(String interpretation) {
        this.interpretation = interpretation;
    }

    public SnmpResultStatus getStatus() {
        return status;
    }

    public void setStatus(SnmpResultStatus status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "SnmpScanHistoryResult{" +
                "id=" + id +
                ", oid='" + oid + '\'' +
                ", value='" + value + '\'' +
                ", success=" + success +
                ", status=" + status +
                '}';
    }

    /**
     * Enumération pour le statut du résultat SNMP
     */
    public enum SnmpResultStatus {
        NORMAL,     // Valeur normale
        WARNING,    // Valeur nécessitant attention
        CRITICAL,   // Valeur critique
        ERROR       // Erreur lors de la récupération
    }
} 