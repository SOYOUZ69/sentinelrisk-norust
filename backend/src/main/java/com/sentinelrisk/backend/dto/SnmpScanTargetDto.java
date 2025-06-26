package com.sentinelrisk.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.time.LocalDateTime;

/**
 * DTO pour les assets configurés pour les scans SNMP automatiques
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SnmpScanTargetDto {

    private Long id;
    private String zabbixHostId;
    private String hostname;
    private String displayName;
    private String ipAddress;
    private Integer snmpPort;
    private String description;
    private Boolean enabled;
    private Integer priority;
    private LocalDateTime lastSync;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String configuredBy;

    // Champs additionnels pour l'affichage
    private Boolean isOnline;
    private String status;
    private Integer itemCount;
    private LocalDateTime lastScanDate;

    /**
     * Constructeur pour création depuis les données Zabbix
     */
    public SnmpScanTargetDto(String zabbixHostId, String hostname, String displayName, String ipAddress, String description) {
        this.zabbixHostId = zabbixHostId;
        this.hostname = hostname;
        this.displayName = displayName;
        this.ipAddress = ipAddress;
        this.description = description;
        this.enabled = false; // Désactivé par défaut
        this.priority = 3;
        this.snmpPort = 161;
        this.isOnline = true;
        this.status = "AVAILABLE";
    }

    /**
     * Vérifie si l'asset est valide pour un scan
     */
    public boolean isValidForScan() {
        return enabled != null && enabled &&
               zabbixHostId != null && !zabbixHostId.trim().isEmpty() &&
               ipAddress != null && !ipAddress.trim().isEmpty();
    }

    /**
     * Retourne un nom d'affichage approprié
     */
    public String getEffectiveDisplayName() {
        if (displayName != null && !displayName.trim().isEmpty()) {
            return displayName;
        }
        return hostname != null ? hostname : "Asset " + zabbixHostId;
    }

    /**
     * Retourne le statut formaté pour l'affichage
     */
    public String getFormattedStatus() {
        if (!Boolean.TRUE.equals(enabled)) {
            return "DÉSACTIVÉ";
        }
        if (!Boolean.TRUE.equals(isOnline)) {
            return "HORS LIGNE";
        }
        return status != null ? status : "DISPONIBLE";
    }

    /**
     * Retourne la priorité formatée
     */
    public String getFormattedPriority() {
        if (priority == null) return "NORMALE";
        
        switch (priority) {
            case 1: return "TRÈS HAUTE";
            case 2: return "HAUTE";
            case 3: return "NORMALE";
            case 4: return "BASSE";
            case 5: return "TRÈS BASSE";
            default: return "NORMALE";
        }
    }

    /**
     * Retourne la classe CSS pour la priorité
     */
    public String getPriorityClass() {
        if (priority == null) return "priority-normal";
        
        switch (priority) {
            case 1: return "priority-very-high";
            case 2: return "priority-high";
            case 3: return "priority-normal";
            case 4: return "priority-low";
            case 5: return "priority-very-low";
            default: return "priority-normal";
        }
    }
} 