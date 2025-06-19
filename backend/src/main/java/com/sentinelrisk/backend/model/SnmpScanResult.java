package com.sentinelrisk.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Map;

@Entity
@Table(name = "snmp_scan_results")
public class SnmpScanResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "asset_id", nullable = false)
    private SnmpAsset asset;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "config_id", nullable = false)
    private SnmpScanConfig config;

    @Column(name = "scan_timestamp", nullable = false)
    private LocalDateTime scanTimestamp;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private ScanStatus status;

    @Column(name = "error_message")
    private String errorMessage;

    @ElementCollection
    @CollectionTable(name = "snmp_scan_result_data", joinColumns = @JoinColumn(name = "result_id"))
    @MapKeyColumn(name = "oid")
    @Column(name = "value")
    private Map<String, String> scannedData;

    @Column(name = "response_time_ms")
    private Long responseTimeMs;

    @Column(name = "items_scanned")
    private Integer itemsScanned;

    @Column(name = "zabbix_item_id")
    private String zabbixItemId;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public enum ScanStatus {
        PENDING,
        RUNNING,
        COMPLETED,
        FAILED,
        TIMEOUT
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (scanTimestamp == null) {
            scanTimestamp = LocalDateTime.now();
        }
    }

    // Constructeurs
    public SnmpScanResult() {}

    public SnmpScanResult(SnmpAsset asset, SnmpScanConfig config) {
        this.asset = asset;
        this.config = config;
        this.scanTimestamp = LocalDateTime.now();
        this.status = ScanStatus.PENDING;
    }

    // Getters et Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public SnmpAsset getAsset() {
        return asset;
    }

    public void setAsset(SnmpAsset asset) {
        this.asset = asset;
    }

    public SnmpScanConfig getConfig() {
        return config;
    }

    public void setConfig(SnmpScanConfig config) {
        this.config = config;
    }

    public LocalDateTime getScanTimestamp() {
        return scanTimestamp;
    }

    public void setScanTimestamp(LocalDateTime scanTimestamp) {
        this.scanTimestamp = scanTimestamp;
    }

    public ScanStatus getStatus() {
        return status;
    }

    public void setStatus(ScanStatus status) {
        this.status = status;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public Map<String, String> getScannedData() {
        return scannedData;
    }

    public void setScannedData(Map<String, String> scannedData) {
        this.scannedData = scannedData;
    }

    public Long getResponseTimeMs() {
        return responseTimeMs;
    }

    public void setResponseTimeMs(Long responseTimeMs) {
        this.responseTimeMs = responseTimeMs;
    }

    public Integer getItemsScanned() {
        return itemsScanned;
    }

    public void setItemsScanned(Integer itemsScanned) {
        this.itemsScanned = itemsScanned;
    }

    public String getZabbixItemId() {
        return zabbixItemId;
    }

    public void setZabbixItemId(String zabbixItemId) {
        this.zabbixItemId = zabbixItemId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
} 