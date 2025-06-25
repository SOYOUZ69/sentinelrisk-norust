package com.sentinelrisk.backend.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Entité pour l'historique des scans SNMP manuels
 */
@Entity
@Table(name = "snmp_scan_history")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class SnmpScanHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "target_ip", nullable = false)
    private String targetIp;

    @Column(name = "target_port", nullable = false)
    private Integer targetPort;

    @Column(name = "community_string", nullable = false)
    private String community;

    @Column(name = "snmp_version", nullable = false)
    private String snmpVersion;

    @Column(name = "scan_success", nullable = false)
    private Boolean success;

    @Column(name = "error_message", columnDefinition = "TEXT")
    private String errorMessage;

    @Column(name = "duration_ms", nullable = false)
    private Long durationMs;

    @Column(name = "timeout_ms", nullable = false)
    private Integer timeoutMs;

    @Column(name = "retries", nullable = false)
    private Integer retries;

    @Column(name = "oids_count", nullable = false)
    private Integer oidsCount;

    @Column(name = "successful_oids_count", nullable = false)
    private Integer successfulOidsCount;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdAt;

    @Column(name = "username", length = 255)
    private String username;

    @OneToMany(mappedBy = "scanHistory", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<SnmpScanHistoryResult> results = new ArrayList<>();

    // Constructeurs
    public SnmpScanHistory() {}

    public SnmpScanHistory(String targetIp, Integer targetPort, String community, 
                          String snmpVersion, Boolean success, Long durationMs,
                          Integer timeoutMs, Integer retries, Integer oidsCount, 
                          Integer successfulOidsCount) {
        this.targetIp = targetIp;
        this.targetPort = targetPort;
        this.community = community;
        this.snmpVersion = snmpVersion;
        this.success = success;
        this.durationMs = durationMs;
        this.timeoutMs = timeoutMs;
        this.retries = retries;
        this.oidsCount = oidsCount;
        this.successfulOidsCount = successfulOidsCount;
    }

    public SnmpScanHistory(String targetIp, Integer targetPort, String community, 
                          String snmpVersion, Boolean success, Long durationMs,
                          Integer timeoutMs, Integer retries, Integer oidsCount, 
                          Integer successfulOidsCount, String username) {
        this(targetIp, targetPort, community, snmpVersion, success, durationMs, 
             timeoutMs, retries, oidsCount, successfulOidsCount);
        this.username = username;
    }

    // Getters et Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTargetIp() {
        return targetIp;
    }

    public void setTargetIp(String targetIp) {
        this.targetIp = targetIp;
    }

    public Integer getTargetPort() {
        return targetPort;
    }

    public void setTargetPort(Integer targetPort) {
        this.targetPort = targetPort;
    }

    public String getCommunity() {
        return community;
    }

    public void setCommunity(String community) {
        this.community = community;
    }

    public String getSnmpVersion() {
        return snmpVersion;
    }

    public void setSnmpVersion(String snmpVersion) {
        this.snmpVersion = snmpVersion;
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

    public Long getDurationMs() {
        return durationMs;
    }

    public void setDurationMs(Long durationMs) {
        this.durationMs = durationMs;
    }

    public Integer getTimeoutMs() {
        return timeoutMs;
    }

    public void setTimeoutMs(Integer timeoutMs) {
        this.timeoutMs = timeoutMs;
    }

    public Integer getRetries() {
        return retries;
    }

    public void setRetries(Integer retries) {
        this.retries = retries;
    }

    public Integer getOidsCount() {
        return oidsCount;
    }

    public void setOidsCount(Integer oidsCount) {
        this.oidsCount = oidsCount;
    }

    public Integer getSuccessfulOidsCount() {
        return successfulOidsCount;
    }

    public void setSuccessfulOidsCount(Integer successfulOidsCount) {
        this.successfulOidsCount = successfulOidsCount;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<SnmpScanHistoryResult> getResults() {
        return results;
    }

    public void setResults(List<SnmpScanHistoryResult> results) {
        this.results = results;
        // Assurer la relation bidirectionnelle
        if (results != null) {
            results.forEach(result -> result.setScanHistory(this));
        }
    }

    // Méthodes utilitaires
    public void addResult(SnmpScanHistoryResult result) {
        this.results.add(result);
        result.setScanHistory(this);
    }

    public double getSuccessRate() {
        if (oidsCount == null || oidsCount == 0) return 0.0;
        return (double) successfulOidsCount / oidsCount * 100;
    }

    public String getTarget() {
        return targetIp + ":" + targetPort;
    }

    @Override
    public String toString() {
        return "SnmpScanHistory{" +
                "id=" + id +
                ", targetIp='" + targetIp + '\'' +
                ", targetPort=" + targetPort +
                ", success=" + success +
                ", durationMs=" + durationMs +
                ", createdAt=" + createdAt +
                '}';
    }
} 