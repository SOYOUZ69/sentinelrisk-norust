package com.sentinelrisk.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * DTO pour les résultats détaillés d'un scan SNMP
 */
@Schema(description = "Résultat détaillé d'un OID dans un scan SNMP")
public class SnmpScanHistoryResultDto {

    @Schema(description = "Identifiant unique du résultat", example = "1")
    private Long id;

    @Schema(description = "OID scanné", example = "1.3.6.1.2.1.1.1.0")
    private String oid;

    @Schema(description = "Valeur brute retournée par SNMP", example = "Linux server01 5.4.0-74-generic")
    private String value;

    @Schema(description = "Type SNMP de la valeur", example = "OctetString")
    private String snmpType;

    @Schema(description = "Succès de la récupération de cet OID", example = "true")
    private Boolean success;

    @Schema(description = "Message d'erreur pour cet OID (si échec)")
    private String errorMessage;

    @Schema(description = "Nom descriptif de l'OID", example = "Description du système")
    private String oidName;

    @Schema(description = "Description détaillée de l'OID", example = "Description complète du système d'exploitation")
    private String oidDescription;

    @Schema(description = "Catégorie de l'OID", example = "system")
    private String oidCategory;

    @Schema(description = "Valeur formatée pour l'affichage", example = "Linux server01 (5.4.0-74)")
    private String formattedValue;

    @Schema(description = "Interprétation de la valeur", example = "Système Linux avec kernel 5.4")
    private String interpretation;

    @Schema(description = "Statut de santé du résultat", example = "NORMAL")
    private String status;

    // Constructeurs
    public SnmpScanHistoryResultDto() {}

    public SnmpScanHistoryResultDto(String oid, String value, String snmpType, Boolean success) {
        this.oid = oid;
        this.value = value;
        this.snmpType = snmpType;
        this.success = success;
        this.status = success ? "NORMAL" : "ERROR";
    }

    public SnmpScanHistoryResultDto(String oid, String value, String snmpType, Boolean success,
                                   String oidName, String oidDescription, String oidCategory,
                                   String formattedValue, String interpretation, String status) {
        this.oid = oid;
        this.value = value;
        this.snmpType = snmpType;
        this.success = success;
        this.oidName = oidName;
        this.oidDescription = oidDescription;
        this.oidCategory = oidCategory;
        this.formattedValue = formattedValue;
        this.interpretation = interpretation;
        this.status = status != null ? status : (success ? "NORMAL" : "ERROR");
    }

    // Getters et Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "SnmpScanHistoryResultDto{" +
                "id=" + id +
                ", oid='" + oid + '\'' +
                ", success=" + success +
                ", status='" + status + '\'' +
                '}';
    }
} 