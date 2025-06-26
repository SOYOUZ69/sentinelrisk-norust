package com.sentinelrisk.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

/**
 * Entité représentant un asset configuré pour les scans SNMP automatiques
 */
@Entity
@Table(name = "snmp_scan_targets")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SnmpScanTarget {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * ID de l'hôte dans Zabbix
     */
    @Column(name = "zabbix_host_id", nullable = false, unique = true)
    private String zabbixHostId;

    /**
     * Nom de l'hôte dans Zabbix
     */
    @Column(name = "hostname", nullable = false)
    private String hostname;

    /**
     * Nom d'affichage de l'hôte
     */
    @Column(name = "display_name")
    private String displayName;

    /**
     * Adresse IP de l'asset
     */
    @Column(name = "ip_address")
    private String ipAddress;

    /**
     * Port SNMP (par défaut 161)
     */
    @Column(name = "snmp_port")
    private Integer snmpPort = 161;

    /**
     * Description de l'asset
     */
    @Column(name = "description", length = 1000)
    private String description;

    /**
     * Statut d'activation pour les scans automatiques
     */
    @Column(name = "enabled", nullable = false)
    private Boolean enabled = true;

    /**
     * Priorité de scan (1 = haute, 5 = basse)
     */
    @Column(name = "priority")
    private Integer priority = 3;

    /**
     * Dernière synchronisation avec Zabbix
     */
    @Column(name = "last_sync")
    private LocalDateTime lastSync;

    /**
     * Date de création
     */
    @CreationTimestamp
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    /**
     * Date de dernière modification
     */
    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    /**
     * Utilisateur qui a configuré cet asset
     */
    @Column(name = "configured_by")
    private String configuredBy;

    /**
     * Constructeur pour création rapide depuis les données Zabbix
     */
    public SnmpScanTarget(String zabbixHostId, String hostname, String displayName, String ipAddress) {
        this.zabbixHostId = zabbixHostId;
        this.hostname = hostname;
        this.displayName = displayName;
        this.ipAddress = ipAddress;
        this.enabled = false; // Désactivé par défaut
        this.priority = 3;
        this.snmpPort = 161;
    }

    /**
     * Vérifie si l'asset est valide pour un scan
     */
    public boolean isValidForScan() {
        return enabled && 
               zabbixHostId != null && 
               !zabbixHostId.trim().isEmpty() &&
               ipAddress != null && 
               !ipAddress.trim().isEmpty();
    }

    /**
     * Met à jour les informations depuis Zabbix
     */
    public void updateFromZabbix(String newDisplayName, String newIpAddress, String newDescription) {
        this.displayName = newDisplayName;
        this.ipAddress = newIpAddress;
        this.description = newDescription;
        this.lastSync = LocalDateTime.now();
    }
} 