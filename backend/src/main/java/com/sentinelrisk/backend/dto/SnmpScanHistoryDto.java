package com.sentinelrisk.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;
import java.util.List;

/**
 * DTO pour l'historique des scans SNMP
 */
@Schema(description = "Historique d'un scan SNMP manuel")
public class SnmpScanHistoryDto {

    @Schema(description = "Identifiant unique du scan", example = "1")
    private Long id;

    @Schema(description = "Adresse IP cible", example = "192.168.1.10")
    private String targetIp;

    @Schema(description = "Port SNMP cible", example = "161")
    private Integer targetPort;

    @Schema(description = "Cible complète (IP:Port)", example = "192.168.1.10:161")
    private String target;

    @Schema(description = "Communauté SNMP utilisée", example = "public")
    private String community;

    @Schema(description = "Version SNMP utilisée", example = "2c")
    private String snmpVersion;

    @Schema(description = "Succès du scan", example = "true")
    private Boolean success;

    @Schema(description = "Message d'erreur en cas d'échec")
    private String errorMessage;

    @Schema(description = "Durée du scan en millisecondes", example = "1250")
    private Long durationMs;

    @Schema(description = "Timeout configuré en millisecondes", example = "5000")
    private Integer timeoutMs;

    @Schema(description = "Nombre de tentatives configurées", example = "3")
    private Integer retries;

    @Schema(description = "Nombre total d'OIDs scannés", example = "5")
    private Integer oidsCount;

    @Schema(description = "Nombre d'OIDs récupérés avec succès", example = "4")
    private Integer successfulOidsCount;

    @Schema(description = "Taux de succès des OIDs (%)", example = "80.0")
    private Double successRate;

    @Schema(description = "Date et heure du scan", example = "2025-06-23T14:30:00")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdAt;

    @Schema(description = "Nom d'utilisateur qui a effectué le scan", example = "admin")
    private String username;

    @Schema(description = "Résultats détaillés (optionnel, chargé à la demande)")
    private List<SnmpScanHistoryResultDto> results;

    // Constructeurs
    public SnmpScanHistoryDto() {}

    public SnmpScanHistoryDto(Long id, String targetIp, Integer targetPort, 
                             String community, String snmpVersion, Boolean success,
                             Long durationMs, Integer oidsCount, Integer successfulOidsCount,
                             LocalDateTime createdAt) {
        this.id = id;
        this.targetIp = targetIp;
        this.targetPort = targetPort;
        this.target = targetIp + ":" + targetPort;
        this.community = community;
        this.snmpVersion = snmpVersion;
        this.success = success;
        this.durationMs = durationMs;
        this.oidsCount = oidsCount;
        this.successfulOidsCount = successfulOidsCount;
        this.successRate = oidsCount > 0 ? (double) successfulOidsCount / oidsCount * 100 : 0.0;
        this.createdAt = createdAt;
    }

    public SnmpScanHistoryDto(Long id, String targetIp, Integer targetPort, 
                             String community, String snmpVersion, Boolean success,
                             Long durationMs, Integer oidsCount, Integer successfulOidsCount,
                             LocalDateTime createdAt, String username) {
        this(id, targetIp, targetPort, community, snmpVersion, success, 
             durationMs, oidsCount, successfulOidsCount, createdAt);
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
        updateTarget();
    }

    public Integer getTargetPort() {
        return targetPort;
    }

    public void setTargetPort(Integer targetPort) {
        this.targetPort = targetPort;
        updateTarget();
    }

    public String getTarget() {
        return target;
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
        updateSuccessRate();
    }

    public Integer getSuccessfulOidsCount() {
        return successfulOidsCount;
    }

    public void setSuccessfulOidsCount(Integer successfulOidsCount) {
        this.successfulOidsCount = successfulOidsCount;
        updateSuccessRate();
    }

    public Double getSuccessRate() {
        return successRate;
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

    public List<SnmpScanHistoryResultDto> getResults() {
        return results;
    }

    public void setResults(List<SnmpScanHistoryResultDto> results) {
        this.results = results;
    }

    // Méthodes utilitaires
    private void updateTarget() {
        if (targetIp != null && targetPort != null) {
            this.target = targetIp + ":" + targetPort;
        }
    }

    private void updateSuccessRate() {
        if (oidsCount != null && oidsCount > 0 && successfulOidsCount != null) {
            this.successRate = (double) successfulOidsCount / oidsCount * 100;
        } else {
            this.successRate = 0.0;
        }
    }

    @Override
    public String toString() {
        return "SnmpScanHistoryDto{" +
                "id=" + id +
                ", target='" + target + '\'' +
                ", success=" + success +
                ", successRate=" + successRate +
                ", createdAt=" + createdAt +
                '}';
    }
} 