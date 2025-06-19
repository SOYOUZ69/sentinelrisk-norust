package com.sentinelrisk.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.util.Map;

/**
 * DTO pour les requêtes de création et modification d'assets SNMP
 */
@Schema(description = "Données pour créer ou modifier un asset SNMP")
public class SnmpAssetRequest {

    @NotBlank(message = "Le nom de l'asset est obligatoire")
    @Size(min = 1, max = 100, message = "Le nom doit faire entre 1 et 100 caractères")
    @Schema(description = "Nom de l'asset SNMP", example = "Router-Principal-01", required = true)
    private String name;

    @NotBlank(message = "L'adresse IP est obligatoire")
    @Pattern(regexp = "^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$", 
             message = "Format d'adresse IP invalide")
    @Schema(description = "Adresse IP de l'asset", example = "192.168.1.1", required = true)
    private String ipAddress;

    @NotNull(message = "Le port SNMP est obligatoire")
    @Schema(description = "Port SNMP (généralement 161)", example = "161", required = true)
    private Integer snmpPort = 161;

    @NotBlank(message = "La communauté SNMP est obligatoire")
    @Size(min = 1, max = 50, message = "La communauté doit faire entre 1 et 50 caractères")
    @Schema(description = "Communauté SNMP", example = "public", required = true)
    private String snmpCommunity;

    @Schema(description = "Version SNMP (1, 2c, 3)", example = "2c", allowableValues = {"1", "2c", "3"})
    private String snmpVersion = "2c";

    @Schema(description = "Description de l'asset", example = "Routeur principal du réseau")
    private String description;

    @Schema(description = "Emplacement physique", example = "Salle serveur - Rack A1")
    private String location;

    @Schema(description = "Type d'équipement", example = "router", allowableValues = {"router", "switch", "server", "printer", "other"})
    private String deviceType;

    @Schema(description = "Statut de l'asset", example = "active", allowableValues = {"active", "inactive", "maintenance"})
    private String status = "active";

    @Schema(description = "Propriétés SNMP personnalisées (OID -> nom)", 
            example = "{\"1.3.6.1.2.1.1.5.0\": \"sysName\", \"1.3.6.1.2.1.1.1.0\": \"sysDescr\"}")
    private Map<String, String> snmpProperties;

    // Constructeurs
    public SnmpAssetRequest() {}

    public SnmpAssetRequest(String name, String ipAddress, Integer snmpPort, String snmpCommunity) {
        this.name = name;
        this.ipAddress = ipAddress;
        this.snmpPort = snmpPort;
        this.snmpCommunity = snmpCommunity;
    }

    // Getters et Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public Integer getSnmpPort() {
        return snmpPort;
    }

    public void setSnmpPort(Integer snmpPort) {
        this.snmpPort = snmpPort;
    }

    public String getSnmpCommunity() {
        return snmpCommunity;
    }

    public void setSnmpCommunity(String snmpCommunity) {
        this.snmpCommunity = snmpCommunity;
    }

    public String getSnmpVersion() {
        return snmpVersion;
    }

    public void setSnmpVersion(String snmpVersion) {
        this.snmpVersion = snmpVersion;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDeviceType() {
        return deviceType;
    }

    public void setDeviceType(String deviceType) {
        this.deviceType = deviceType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Map<String, String> getSnmpProperties() {
        return snmpProperties;
    }

    public void setSnmpProperties(Map<String, String> snmpProperties) {
        this.snmpProperties = snmpProperties;
    }

    @Override
    public String toString() {
        return "SnmpAssetRequest{" +
                "name='" + name + '\'' +
                ", ipAddress='" + ipAddress + '\'' +
                ", snmpPort=" + snmpPort +
                ", snmpCommunity='" + snmpCommunity + '\'' +
                ", snmpVersion='" + snmpVersion + '\'' +
                ", description='" + description + '\'' +
                ", location='" + location + '\'' +
                ", deviceType='" + deviceType + '\'' +
                ", status='" + status + '\'' +
                '}';
    }
} 