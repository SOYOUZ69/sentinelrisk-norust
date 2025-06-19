package com.sentinelrisk.backend.repository;

import com.sentinelrisk.backend.model.SnmpScanResult;
import com.sentinelrisk.backend.model.SnmpAsset;
import com.sentinelrisk.backend.model.SnmpScanConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SnmpScanResultRepository extends JpaRepository<SnmpScanResult, Long> {
    
    List<SnmpScanResult> findByAssetOrderByScanTimestampDesc(SnmpAsset asset);
    
    List<SnmpScanResult> findByAssetZabbixHostIdOrderByScanTimestampDesc(String zabbixHostId);
    
    List<SnmpScanResult> findByConfigOrderByScanTimestampDesc(SnmpScanConfig config);
    
    List<SnmpScanResult> findByStatus(SnmpScanResult.ScanStatus status);
    
    @Query("SELECT sr FROM SnmpScanResult sr WHERE sr.asset.zabbixHostId = :hostId AND sr.scanTimestamp >= :startTime AND sr.scanTimestamp <= :endTime ORDER BY sr.scanTimestamp DESC")
    List<SnmpScanResult> findByHostIdAndTimeRange(@Param("hostId") String hostId, 
                                                  @Param("startTime") LocalDateTime startTime, 
                                                  @Param("endTime") LocalDateTime endTime);
    
    @Query("SELECT sr FROM SnmpScanResult sr WHERE sr.scanTimestamp < :cutoffDate")
    List<SnmpScanResult> findOldResults(@Param("cutoffDate") LocalDateTime cutoffDate);
    
    @Query("SELECT sr FROM SnmpScanResult sr WHERE sr.status = 'RUNNING' AND sr.scanTimestamp < :timeoutDate")
    List<SnmpScanResult> findTimedOutScans(@Param("timeoutDate") LocalDateTime timeoutDate);
    
    @Query("SELECT COUNT(sr) FROM SnmpScanResult sr WHERE sr.asset = :asset AND sr.status = 'COMPLETED'")
    Long countSuccessfulScansByAsset(@Param("asset") SnmpAsset asset);
    
    @Query("SELECT COUNT(sr) FROM SnmpScanResult sr WHERE sr.config = :config AND sr.status = 'COMPLETED'")
    Long countSuccessfulScansByConfig(@Param("config") SnmpScanConfig config);
    
    void deleteByAsset(SnmpAsset asset);
    
    void deleteByConfig(SnmpScanConfig config);
} 