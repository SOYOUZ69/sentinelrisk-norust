package com.sentinelrisk.backend.repository;

import com.sentinelrisk.backend.model.SnmpScanTarget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository pour la gestion des assets configurés pour les scans SNMP automatiques
 */
@Repository
public interface SnmpScanTargetRepository extends JpaRepository<SnmpScanTarget, Long> {

    /**
     * Trouve un asset par son ID Zabbix
     */
    Optional<SnmpScanTarget> findByZabbixHostId(String zabbixHostId);

    /**
     * Récupère tous les assets activés pour les scans automatiques
     */
    List<SnmpScanTarget> findByEnabledTrueOrderByPriorityAscCreatedAtAsc();

    /**
     * Récupère tous les assets activés avec une priorité spécifique
     */
    List<SnmpScanTarget> findByEnabledTrueAndPriorityOrderByCreatedAtAsc(Integer priority);

    /**
     * Compte le nombre d'assets activés
     */
    @Query("SELECT COUNT(s) FROM SnmpScanTarget s WHERE s.enabled = true")
    long countEnabledTargets();

    /**
     * Récupère tous les assets par ordre de priorité et date de création
     */
    List<SnmpScanTarget> findAllByOrderByPriorityAscCreatedAtAsc();

    /**
     * Trouve les assets par hostname (recherche partielle)
     */
    @Query("SELECT s FROM SnmpScanTarget s WHERE LOWER(s.hostname) LIKE LOWER(CONCAT('%', :hostname, '%')) OR LOWER(s.displayName) LIKE LOWER(CONCAT('%', :hostname, '%'))")
    List<SnmpScanTarget> findByHostnameContainingIgnoreCase(@Param("hostname") String hostname);

    /**
     * Trouve les assets par adresse IP
     */
    List<SnmpScanTarget> findByIpAddressContaining(String ipAddress);

    /**
     * Récupère les assets qui n'ont pas été synchronisés récemment
     */
    @Query("SELECT s FROM SnmpScanTarget s WHERE s.lastSync IS NULL OR s.lastSync < :cutoffDate")
    List<SnmpScanTarget> findTargetsNeedingSync(@Param("cutoffDate") java.time.LocalDateTime cutoffDate);

    /**
     * Désactive tous les assets
     */
    @Modifying
    @Query("UPDATE SnmpScanTarget s SET s.enabled = false")
    int disableAllTargets();

    /**
     * Active/désactive un asset par son ID Zabbix
     */
    @Modifying
    @Query("UPDATE SnmpScanTarget s SET s.enabled = :enabled WHERE s.zabbixHostId = :zabbixHostId")
    int updateEnabledStatus(@Param("zabbixHostId") String zabbixHostId, @Param("enabled") Boolean enabled);

    /**
     * Vérifie si un asset existe par son ID Zabbix
     */
    boolean existsByZabbixHostId(String zabbixHostId);

    /**
     * Supprime les assets qui ne sont plus dans Zabbix
     */
    @Modifying
    @Query("DELETE FROM SnmpScanTarget s WHERE s.zabbixHostId NOT IN :zabbixHostIds")
    int deleteTargetsNotInZabbix(@Param("zabbixHostIds") List<String> zabbixHostIds);

    /**
     * Récupère les statistiques des assets configurés
     */
    @Query("SELECT " +
           "COUNT(s) as total, " +
           "SUM(CASE WHEN s.enabled = true THEN 1 ELSE 0 END) as enabled, " +
           "SUM(CASE WHEN s.enabled = false THEN 1 ELSE 0 END) as disabled " +
           "FROM SnmpScanTarget s")
    List<Object[]> getTargetStatistics();
} 