package com.sentinelrisk.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;

import java.util.List;

/**
 * DTO pour les requêtes de scan SNMP manuel
 */
@Schema(description = "Requête pour effectuer un scan SNMP manuel")
public class SnmpManualScanRequest {

    @NotBlank(message = "L'adresse IP est obligatoire")
    @Pattern(regexp = "^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$", 
             message = "Format d'adresse IP invalide")
    @Schema(description = "Adresse IP de l'équipement à scanner", example = "192.168.1.10", required = true)
    private String ip;

    @NotNull(message = "Le port SNMP est obligatoire")
    @Min(value = 1, message = "Le port doit être supérieur à 0")
    @Max(value = 65535, message = "Le port doit être inférieur à 65536")
    @Schema(description = "Port SNMP (généralement 161)", example = "161", required = true)
    private Integer port = 161;

    @NotBlank(message = "La communauté SNMP est obligatoire")
    @Schema(description = "Communauté SNMP", example = "public", required = true)
    private String community;

    @Schema(description = "Version SNMP", example = "2c", allowableValues = {"1", "2c", "3"})
    private String version = "2c";

    @NotEmpty(message = "La liste des OIDs ne peut pas être vide")
    @Schema(description = "Liste des OIDs à scanner", 
            example = "[\"1.3.6.1.2.1.1.1.0\", \"1.3.6.1.2.1.1.5.0\"]", 
            required = true)
    private List<String> oids;

    @Schema(description = "Timeout en millisecondes", example = "5000")
    private Integer timeout = 5000;

    @Schema(description = "Nombre de tentatives", example = "3")
    private Integer retries = 3;

    @Schema(description = "Nom d'utilisateur qui effectue le scan", example = "admin")
    private String username;

    // Constructeurs
    public SnmpManualScanRequest() {}

    public SnmpManualScanRequest(String ip, Integer port, String community, String version, List<String> oids) {
        this.ip = ip;
        this.port = port;
        this.community = community;
        this.version = version;
        this.oids = oids;
    }

    // Getters et Setters
    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public Integer getPort() {
        return port;
    }

    public void setPort(Integer port) {
        this.port = port;
    }

    public String getCommunity() {
        return community;
    }

    public void setCommunity(String community) {
        this.community = community;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public List<String> getOids() {
        return oids;
    }

    public void setOids(List<String> oids) {
        this.oids = oids;
    }

    public Integer getTimeout() {
        return timeout;
    }

    public void setTimeout(Integer timeout) {
        this.timeout = timeout;
    }

    public Integer getRetries() {
        return retries;
    }

    public void setRetries(Integer retries) {
        this.retries = retries;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String toString() {
        return "SnmpManualScanRequest{" +
                "ip='" + ip + '\'' +
                ", port=" + port +
                ", community='" + community + '\'' +
                ", version='" + version + '\'' +
                ", oids=" + oids +
                ", timeout=" + timeout +
                ", retries=" + retries +
                ", username='" + username + '\'' +
                '}';
    }
} 