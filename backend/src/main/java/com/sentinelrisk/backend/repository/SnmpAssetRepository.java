package com.sentinelrisk.backend.repository;

import com.sentinelrisk.backend.model.SnmpAsset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface SnmpAssetRepository extends JpaRepository<SnmpAsset, Long> {
    
    Optional<SnmpAsset> findByZabbixHostId(String zabbixHostId);
    
    List<SnmpAsset> findByStatus(String status);
    
    List<SnmpAsset> findBySnmpVersion(String snmpVersion);
    
    @Query("SELECT sa FROM SnmpAsset sa WHERE sa.lastDiscovered < :cutoffDate")
    List<SnmpAsset> findStaleAssets(@Param("cutoffDate") LocalDateTime cutoffDate);
    
    @Query("SELECT sa FROM SnmpAsset sa WHERE sa.hostName LIKE %:searchTerm% OR sa.displayName LIKE %:searchTerm% OR sa.ipAddress LIKE %:searchTerm%")
    List<SnmpAsset> searchAssets(@Param("searchTerm") String searchTerm);
    
    boolean existsByZabbixHostId(String zabbixHostId);
    
    void deleteByZabbixHostId(String zabbixHostId);
    
    /**
     * Vérifie si un asset existe avec l'adresse IP donnée
     */
    boolean existsByIpAddress(String ipAddress);
    
    /**
     * Trouve les assets par type d'équipement
     */
    List<SnmpAsset> findByDeviceType(String deviceType);
    
    /**
     * Trouve un asset par adresse IP
     */
    SnmpAsset findByIpAddress(String ipAddress);
} 