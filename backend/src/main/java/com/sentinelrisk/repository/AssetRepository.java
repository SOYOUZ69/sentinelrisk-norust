package com.sentinelrisk.repository;

import com.sentinelrisk.model.Asset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AssetRepository extends JpaRepository<Asset, Long> {

    /**
     * Recherche un asset par hostname
     */
    Optional<Asset> findByHostname(String hostname);

    /**
     * Recherche un asset par adresse IP
     */
    Optional<Asset> findByIpAddress(String ipAddress);

    /**
     * Recherche des assets par type
     */
    List<Asset> findByType(Asset.AssetType type);

    /**
     * Recherche des assets par version SNMP
     */
    List<Asset> findBySnmpVersion(Asset.SnmpVersion snmpVersion);

    /**
     * Recherche des assets actifs
     */
    List<Asset> findByActiveTrue();

    /**
     * Recherche des assets inactifs
     */
    List<Asset> findByActiveFalse();

    /**
     * Recherche des assets par type et statut actif
     */
    List<Asset> findByTypeAndActive(Asset.AssetType type, Boolean active);

    /**
     * Vérifie si un hostname existe déjà
     */
    boolean existsByHostname(String hostname);

    /**
     * Vérifie si une adresse IP existe déjà
     */
    boolean existsByIpAddress(String ipAddress);

    /**
     * Recherche des assets par hostname ou adresse IP (pour éviter les doublons)
     */
    @Query("SELECT a FROM Asset a WHERE a.hostname = :identifier OR a.ipAddress = :identifier")
    List<Asset> findByHostnameOrIpAddress(@Param("identifier") String identifier);

    /**
     * Recherche des assets avec des configurations de scan actives
     */
    @Query("SELECT DISTINCT a FROM Asset a " +
           "JOIN SnmpScanConfig c ON c.asset = a " +
           "WHERE a.active = true AND c.active = true")
    List<Asset> findAssetsWithActiveScanConfigs();

    /**
     * Compte le nombre d'assets par type
     */
    @Query("SELECT a.type, COUNT(a) FROM Asset a WHERE a.active = true GROUP BY a.type")
    List<Object[]> countAssetsByType();
} 