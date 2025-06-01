package com.sentinelrisk.repository;

import com.sentinelrisk.model.Asset;
import com.sentinelrisk.model.SnmpScanConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SnmpScanConfigRepository extends JpaRepository<SnmpScanConfig, Long> {

    /**
     * Recherche des configurations par asset
     */
    List<SnmpScanConfig> findByAsset(Asset asset);

    /**
     * Recherche des configurations par asset ID
     */
    List<SnmpScanConfig> findByAssetId(Long assetId);

    /**
     * Recherche des configurations actives
     */
    List<SnmpScanConfig> findByActiveTrue();

    /**
     * Recherche des configurations inactives
     */
    List<SnmpScanConfig> findByActiveFalse();

    /**
     * Recherche des configurations actives pour un asset donné
     */
    List<SnmpScanConfig> findByAssetAndActiveTrue(Asset asset);

    /**
     * Recherche des configurations par nom
     */
    Optional<SnmpScanConfig> findByName(String name);

    /**
     * Vérifie si un nom de configuration existe déjà
     */
    boolean existsByName(String name);

    /**
     * Recherche des configurations avec expression cron
     */
    @Query("SELECT c FROM SnmpScanConfig c WHERE c.cronExpression IS NOT NULL AND c.active = true")
    List<SnmpScanConfig> findActiveCronConfigs();

    /**
     * Recherche des configurations avec intervalle en minutes
     */
    @Query("SELECT c FROM SnmpScanConfig c WHERE c.intervalMinutes IS NOT NULL AND c.active = true")
    List<SnmpScanConfig> findActiveIntervalConfigs();

    /**
     * Recherche des configurations par intervalle spécifique
     */
    List<SnmpScanConfig> findByIntervalMinutesAndActiveTrue(Integer intervalMinutes);

    /**
     * Recherche des configurations contenant un OID spécifique
     */
    @Query("SELECT c FROM SnmpScanConfig c WHERE c.active = true AND :oid MEMBER OF c.oids")
    List<SnmpScanConfig> findByOidAndActiveTrue(@Param("oid") String oid);

    /**
     * Compte le nombre de configurations par asset
     */
    @Query("SELECT c.asset.id, COUNT(c) FROM SnmpScanConfig c WHERE c.active = true GROUP BY c.asset.id")
    List<Object[]> countConfigsByAsset();

    /**
     * Recherche des configurations prêtes pour l'exécution (actives avec asset actif)
     */
    @Query("SELECT c FROM SnmpScanConfig c " +
           "WHERE c.active = true AND c.asset.active = true")
    List<SnmpScanConfig> findReadyForExecution();
} 