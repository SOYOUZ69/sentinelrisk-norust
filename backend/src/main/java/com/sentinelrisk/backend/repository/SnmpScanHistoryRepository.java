package com.sentinelrisk.backend.repository;

import com.sentinelrisk.backend.model.SnmpScanHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Repository pour l'historique des scans SNMP manuels
 */
@Repository
public interface SnmpScanHistoryRepository extends JpaRepository<SnmpScanHistory, Long> {

    /**
     * Trouve tous les scans pour une IP donnée, triés par date décroissante
     */
    List<SnmpScanHistory> findByTargetIpOrderByCreatedAtDesc(String targetIp);

    /**
     * Trouve les scans pour une IP après une date donnée (pour détection de doublons)
     */
    List<SnmpScanHistory> findByTargetIpAndCreatedAtAfter(String targetIp, LocalDateTime since);

    /**
     * Trouve tous les scans pour une cible (IP:Port), triés par date décroissante
     */
    List<SnmpScanHistory> findByTargetIpAndTargetPortOrderByCreatedAtDesc(String targetIp, Integer targetPort);

    /**
     * Trouve tous les scans réussis ou échoués
     */
    List<SnmpScanHistory> findBySuccessOrderByCreatedAtDesc(Boolean success);

    /**
     * Trouve les scans dans une période donnée
     */
    List<SnmpScanHistory> findByCreatedAtBetweenOrderByCreatedAtDesc(LocalDateTime start, LocalDateTime end);

    /**
     * Trouve tous les scans avec pagination, triés par date décroissante
     */
    Page<SnmpScanHistory> findAllByOrderByCreatedAtDesc(Pageable pageable);

    /**
     * Trouve les scans par IP avec pagination
     */
    Page<SnmpScanHistory> findByTargetIpContainingIgnoreCaseOrderByCreatedAtDesc(String targetIp, Pageable pageable);

    /**
     * Trouve le dernier scan pour une cible donnée
     */
    Optional<SnmpScanHistory> findFirstByTargetIpAndTargetPortOrderByCreatedAtDesc(String targetIp, Integer targetPort);

    /**
     * Compte le nombre de scans réussis
     */
    long countBySuccess(Boolean success);

    /**
     * Statistiques des scans dans une période
     */
    @Query("SELECT COUNT(s) FROM SnmpScanHistory s WHERE s.createdAt >= :since")
    long countScansAfter(@Param("since") LocalDateTime since);

    @Query("SELECT COUNT(s) FROM SnmpScanHistory s WHERE s.success = :success AND s.createdAt >= :since")
    long countScansAfterBySuccess(@Param("since") LocalDateTime since, @Param("success") Boolean success);

    /**
     * Moyenne des durées de scan
     */
    @Query("SELECT AVG(s.durationMs) FROM SnmpScanHistory s WHERE s.success = true")
    Double getAverageDurationForSuccessfulScans();

    /**
     * Trouve les scans les plus récents (dernières 24h par défaut)
     */
    @Query("SELECT s FROM SnmpScanHistory s WHERE s.createdAt >= :since ORDER BY s.createdAt DESC")
    List<SnmpScanHistory> findRecentScans(@Param("since") LocalDateTime since);

    /**
     * Trouve les cibles les plus scannées
     */
    @Query("SELECT s.targetIp, COUNT(s) as scanCount FROM SnmpScanHistory s " +
           "GROUP BY s.targetIp ORDER BY scanCount DESC")
    List<Object[]> findMostScannedTargets();

    /**
     * Supprime les scans plus anciens qu'une date donnée
     */
    void deleteByCreatedAtBefore(LocalDateTime before);

    /**
     * Recherche textuelle dans les IPs
     */
    @Query("SELECT s FROM SnmpScanHistory s WHERE " +
           "LOWER(s.targetIp) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "CAST(s.targetPort AS string) LIKE CONCAT('%', :search, '%') " +
           "ORDER BY s.createdAt DESC")
    List<SnmpScanHistory> searchScans(@Param("search") String search);

    /**
     * Compte les scans par version SNMP
     */
    @Query("SELECT s.snmpVersion, COUNT(s) FROM SnmpScanHistory s GROUP BY s.snmpVersion")
    List<Object[]> countBySnmpVersion();
} 