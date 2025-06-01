package com.sentinelrisk.repository;

import com.sentinelrisk.model.Asset;
import com.sentinelrisk.model.SnmpScanConfig;
import com.sentinelrisk.model.SnmpScanResult;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface SnmpScanResultRepository extends JpaRepository<SnmpScanResult, Long> {

    /**
     * Recherche des résultats par configuration
     */
    List<SnmpScanResult> findByConfig(SnmpScanConfig config);

    /**
     * Recherche des résultats par asset
     */
    List<SnmpScanResult> findByAsset(Asset asset);

    /**
     * Recherche des résultats par configuration ID
     */
    List<SnmpScanResult> findByConfigId(Long configId);

    /**
     * Recherche des résultats par configuration ID avec pagination
     */
    Page<SnmpScanResult> findByConfigId(Long configId, Pageable pageable);

    /**
     * Recherche des résultats par asset ID
     */
    List<SnmpScanResult> findByAssetId(Long assetId);

    /**
     * Recherche des résultats par asset ID avec pagination
     */
    Page<SnmpScanResult> findByAssetId(Long assetId, Pageable pageable);

    /**
     * Recherche des résultats par statut
     */
    List<SnmpScanResult> findByStatus(SnmpScanResult.ScanStatus status);

    /**
     * Recherche des résultats par statut avec pagination
     */
    Page<SnmpScanResult> findByStatus(SnmpScanResult.ScanStatus status, Pageable pageable);

    /**
     * Recherche des résultats dans une plage de dates
     */
    List<SnmpScanResult> findByTimestampBetween(LocalDateTime start, LocalDateTime end);

    /**
     * Recherche des résultats dans une plage de dates avec pagination
     */
    Page<SnmpScanResult> findByTimestampBetween(LocalDateTime start, LocalDateTime end, Pageable pageable);

    /**
     * Recherche des résultats par asset dans une plage de dates
     */
    List<SnmpScanResult> findByAssetAndTimestampBetween(Asset asset, LocalDateTime start, LocalDateTime end);

    /**
     * Recherche des résultats par configuration dans une plage de dates
     */
    List<SnmpScanResult> findByConfigAndTimestampBetween(SnmpScanConfig config, LocalDateTime start, LocalDateTime end);

    /**
     * Recherche le dernier résultat pour une configuration donnée
     */
    Optional<SnmpScanResult> findFirstByConfigOrderByTimestampDesc(SnmpScanConfig config);

    /**
     * Recherche le dernier résultat pour un asset donné
     */
    Optional<SnmpScanResult> findFirstByAssetOrderByTimestampDesc(Asset asset);

    /**
     * Recherche le dernier résultat pour un asset ID
     */
    @Query("SELECT r FROM SnmpScanResult r WHERE r.asset.id = :assetId ORDER BY r.timestamp DESC LIMIT 1")
    Optional<SnmpScanResult> findLatestByAssetId(@Param("assetId") Long assetId);

    /**
     * Recherche le dernier résultat pour une configuration ID
     */
    @Query("SELECT r FROM SnmpScanResult r WHERE r.config.id = :configId ORDER BY r.timestamp DESC LIMIT 1")
    Optional<SnmpScanResult> findLatestByConfigId(@Param("configId") Long configId);

    /**
     * Recherche des résultats avec un score global supérieur à un seuil
     */
    List<SnmpScanResult> findByGlobalScoreGreaterThan(Double threshold);

    /**
     * Recherche des résultats avec erreurs
     */
    @Query("SELECT r FROM SnmpScanResult r WHERE r.status IN ('FAILURE', 'TIMEOUT', 'CONNECTION_ERROR')")
    List<SnmpScanResult> findResultsWithErrors();

    /**
     * Recherche des résultats réussis
     */
    @Query("SELECT r FROM SnmpScanResult r WHERE r.status IN ('SUCCESS', 'PARTIAL_SUCCESS')")
    List<SnmpScanResult> findSuccessfulResults();

    /**
     * Recherche des résultats récents (dernières 24h)
     */
    @Query("SELECT r FROM SnmpScanResult r WHERE r.timestamp >= :since ORDER BY r.timestamp DESC")
    List<SnmpScanResult> findRecentResults(@Param("since") LocalDateTime since);

    /**
     * Recherche des résultats récents pour un asset avec limite
     */
    @Query("SELECT r FROM SnmpScanResult r WHERE r.asset.id = :assetId ORDER BY r.timestamp DESC LIMIT :limit")
    List<SnmpScanResult> findRecentByAssetId(@Param("assetId") Long assetId, @Param("limit") int limit);

    /**
     * Recherche paginée des résultats par asset
     */
    Page<SnmpScanResult> findByAssetOrderByTimestampDesc(Asset asset, Pageable pageable);

    /**
     * Recherche paginée des résultats par configuration
     */
    Page<SnmpScanResult> findByConfigOrderByTimestampDesc(SnmpScanConfig config, Pageable pageable);

    /**
     * Recherche des résultats par statuts multiples avec pagination
     */
    Page<SnmpScanResult> findByStatusIn(List<SnmpScanResult.ScanStatus> statuses, Pageable pageable);

    /**
     * Compte les résultats par statut
     */
    long countByStatus(SnmpScanResult.ScanStatus status);

    /**
     * Statistiques par statut
     */
    @Query("SELECT r.status, COUNT(r) FROM SnmpScanResult r GROUP BY r.status")
    List<Object[]> countResultsByStatus();

    /**
     * Moyenne des scores globaux par asset
     */
    @Query("SELECT r.asset.id, AVG(r.globalScore) FROM SnmpScanResult r " +
           "WHERE r.globalScore IS NOT NULL AND r.status = 'SUCCESS' " +
           "GROUP BY r.asset.id")
    List<Object[]> averageScoreByAsset();

    /**
     * Recherche des résultats avec un temps d'exécution élevé
     */
    @Query("SELECT r FROM SnmpScanResult r WHERE r.executionTimeMs > :threshold ORDER BY r.executionTimeMs DESC")
    List<SnmpScanResult> findSlowExecutions(@Param("threshold") Long thresholdMs);

    /**
     * Supprime les anciens résultats (plus anciens que la date spécifiée)
     */
    @Modifying
    @Query("DELETE FROM SnmpScanResult r WHERE r.timestamp < :cutoffDate")
    int deleteByTimestampBefore(@Param("cutoffDate") LocalDateTime cutoffDate);

    /**
     * Compte le nombre de résultats par asset dans une période
     */
    @Query("SELECT r.asset.id, COUNT(r) FROM SnmpScanResult r " +
           "WHERE r.timestamp >= :since GROUP BY r.asset.id")
    List<Object[]> countResultsByAssetSince(@Param("since") LocalDateTime since);

    /**
     * Statistiques de performance
     */
    @Query("SELECT " +
           "AVG(r.executionTimeMs) as avgExecutionTime, " +
           "MIN(r.executionTimeMs) as minExecutionTime, " +
           "MAX(r.executionTimeMs) as maxExecutionTime, " +
           "COUNT(r) as totalScans " +
           "FROM SnmpScanResult r " +
           "WHERE r.executionTimeMs IS NOT NULL")
    List<Object[]> getPerformanceStatistics();
} 