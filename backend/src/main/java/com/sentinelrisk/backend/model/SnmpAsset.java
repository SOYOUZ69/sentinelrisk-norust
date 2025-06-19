package com.sentinelrisk.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Map;

@Entity
@Table(name = "snmp_assets")
public class SnmpAsset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "zabbix_host_id", unique = true)
    private String zabbixHostId;

    @Column(name = "host_name", nullable = false)
    private String hostName;

    @Column(name = "display_name")
    private String displayName;
    
    // Nouveau champ pour le nom utilisé dans l'API CRUD
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "ip_address", nullable = false, unique = true)
    private String ipAddress;

    @Column(name = "status")
    private String status = "active";

    @Column(name = "snmp_version")
    private String snmpVersion = "2c";

    @Column(name = "snmp_community")
    private String snmpCommunity = "public";

    @Column(name = "snmp_port")
    private Integer snmpPort = 161;
    
    // Nouveaux champs pour l'API CRUD
    @Column(name = "description", length = 500)
    private String description;
    
    @Column(name = "location", length = 200)
    private String location;
    
    @Column(name = "device_type", length = 50)
    private String deviceType;

    @ElementCollection
    @CollectionTable(name = "snmp_asset_properties", joinColumns = @JoinColumn(name = "asset_id"))
    @MapKeyColumn(name = "property_key")
    @Column(name = "property_value")
    private Map<String, String> properties;

    @Column(name = "last_discovered")
    private LocalDateTime lastDiscovered;

    @Column(name = "last_updated")
    private LocalDateTime lastUpdated;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        lastUpdated = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
        lastUpdated = LocalDateTime.now();
    }

    // Constructeurs
    public SnmpAsset() {}

    public SnmpAsset(String zabbixHostId, String hostName, String displayName) {
        this.zabbixHostId = zabbixHostId;
        this.hostName = hostName;
        this.displayName = displayName;
        this.name = hostName; // Par défaut, name = hostName
        this.lastDiscovered = LocalDateTime.now();
    }
    
    public SnmpAsset(String name, String ipAddress, Integer snmpPort, String snmpCommunity) {
        this.name = name;
        this.hostName = name; // Par défaut, hostName = name
        this.ipAddress = ipAddress;
        this.snmpPort = snmpPort;
        this.snmpCommunity = snmpCommunity;
    }

    // Getters et Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getZabbixHostId() {
        return zabbixHostId;
    }

    public void setZabbixHostId(String zabbixHostId) {
        this.zabbixHostId = zabbixHostId;
    }

    public String getHostName() {
        return hostName;
    }

    public void setHostName(String hostName) {
        this.hostName = hostName;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }
    
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
        // Synchroniser avec hostName si pas déjà défini
        if (this.hostName == null) {
            this.hostName = name;
        }
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getSnmpVersion() {
        return snmpVersion;
    }

    public void setSnmpVersion(String snmpVersion) {
        this.snmpVersion = snmpVersion;
    }

    public String getSnmpCommunity() {
        return snmpCommunity;
    }

    public void setSnmpCommunity(String snmpCommunity) {
        this.snmpCommunity = snmpCommunity;
    }

    public Integer getSnmpPort() {
        return snmpPort;
    }

    public void setSnmpPort(Integer snmpPort) {
        this.snmpPort = snmpPort;
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

    public Map<String, String> getProperties() {
        return properties;
    }

    public void setProperties(Map<String, String> properties) {
        this.properties = properties;
    }

    public LocalDateTime getLastDiscovered() {
        return lastDiscovered;
    }

    public void setLastDiscovered(LocalDateTime lastDiscovered) {
        this.lastDiscovered = lastDiscovered;
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(LocalDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    @Override
    public String toString() {
        return "SnmpAsset{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", ipAddress='" + ipAddress + '\'' +
                ", snmpPort=" + snmpPort +
                ", status='" + status + '\'' +
                ", deviceType='" + deviceType + '\'' +
                '}';
    }
} 