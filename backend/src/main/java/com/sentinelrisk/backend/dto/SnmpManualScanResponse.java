package com.sentinelrisk.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;
import java.util.List;

/**
 * DTO pour les réponses de scan SNMP manuel
 */
@Schema(description = "Réponse d'un scan SNMP manuel")
public class SnmpManualScanResponse {

    @Schema(description = "Indique si le scan a réussi", example = "true")
    private boolean success;

    @Schema(description = "Adresse IP scannée", example = "192.168.1.10")
    private String ip;

    @Schema(description = "Port SNMP utilisé", example = "161")
    private Integer port;

    @Schema(description = "Résultats du scan SNMP")
    private List<SnmpResult> results;

    @Schema(description = "Message d'erreur en cas d'échec")
    private String error;

    @Schema(description = "Timestamp du scan", example = "2025-06-20T14:30:00")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime timestamp;

    @Schema(description = "Durée du scan en millisecondes", example = "1250")
    private Long duration;

    // Constructeurs
    public SnmpManualScanResponse() {
        this.timestamp = LocalDateTime.now();
    }

    public SnmpManualScanResponse(boolean success, String ip, Integer port) {
        this();
        this.success = success;
        this.ip = ip;
        this.port = port;
    }

    // Classe interne pour les résultats SNMP
    @Schema(description = "Résultat d'une requête SNMP pour un OID")
    public static class SnmpResult {
        @Schema(description = "OID interrogé", example = "1.3.6.1.2.1.1.1.0")
        private String oid;

        @Schema(description = "Valeur retournée", example = "Linux device - Router")
        private String value;

        @Schema(description = "Type de données SNMP", example = "OctetString")
        private String type;

        @Schema(description = "Indique si la requête pour cet OID a réussi", example = "true")
        private boolean success;

        @Schema(description = "Message d'erreur pour cet OID spécifique")
        private String error;

        // Constructeurs
        public SnmpResult() {}

        public SnmpResult(String oid, String value, String type) {
            this.oid = oid;
            this.value = value;
            this.type = type;
            this.success = true;
        }

        public SnmpResult(String oid, String error) {
            this.oid = oid;
            this.error = error;
            this.success = false;
        }

        // Getters et Setters
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

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        public boolean isSuccess() {
            return success;
        }

        public void setSuccess(boolean success) {
            this.success = success;
        }

        public String getError() {
            return error;
        }

        public void setError(String error) {
            this.error = error;
        }
    }

    // Getters et Setters
    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

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

    public List<SnmpResult> getResults() {
        return results;
    }

    public void setResults(List<SnmpResult> results) {
        this.results = results;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public Long getDuration() {
        return duration;
    }

    public void setDuration(Long duration) {
        this.duration = duration;
    }

    @Override
    public String toString() {
        return "SnmpManualScanResponse{" +
                "success=" + success +
                ", ip='" + ip + '\'' +
                ", port=" + port +
                ", results=" + results +
                ", error='" + error + '\'' +
                ", timestamp=" + timestamp +
                ", duration=" + duration +
                '}';
    }
} 