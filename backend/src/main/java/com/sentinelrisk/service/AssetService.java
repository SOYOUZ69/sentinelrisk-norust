package com.sentinelrisk.service;

import com.sentinelrisk.model.Asset;
import com.sentinelrisk.repository.AssetRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class AssetService {

    private final AssetRepository assetRepository;

    /**
     * Récupère tous les assets
     */
    public List<Asset> getAllAssets() {
        log.debug("Récupération de tous les assets");
        return assetRepository.findAll();
    }

    /**
     * Récupère un asset par son ID
     */
    public Optional<Asset> getAssetById(Long id) {
        log.debug("Récupération de l'asset avec l'ID: {}", id);
        return assetRepository.findById(id);
    }

    /**
     * Récupère les assets actifs
     */
    public List<Asset> getActiveAssets() {
        log.debug("Récupération des assets actifs");
        return assetRepository.findByActiveTrue();
    }

    /**
     * Récupère les assets par type
     */
    public List<Asset> getAssetsByType(Asset.AssetType type) {
        log.debug("Récupération des assets de type: {}", type);
        return assetRepository.findByType(type);
    }

    /**
     * Récupère un asset par hostname
     */
    public Optional<Asset> getAssetByHostname(String hostname) {
        log.debug("Récupération de l'asset avec le hostname: {}", hostname);
        return assetRepository.findByHostname(hostname);
    }

    /**
     * Récupère un asset par adresse IP
     */
    public Optional<Asset> getAssetByIpAddress(String ipAddress) {
        log.debug("Récupération de l'asset avec l'IP: {}", ipAddress);
        return assetRepository.findByIpAddress(ipAddress);
    }

    /**
     * Crée ou met à jour un asset
     */
    @Transactional
    public Asset saveAsset(Asset asset) {
        log.info("Sauvegarde de l'asset: {}", getAssetIdentifier(asset));
        
        // Validation des doublons
        if (asset.getId() == null) {
            validateUniqueIdentifiers(asset);
        } else {
            validateUniqueIdentifiersForUpdate(asset);
        }
        
        Asset savedAsset = assetRepository.save(asset);
        log.info("Asset sauvegardé avec l'ID: {}", savedAsset.getId());
        
        return savedAsset;
    }

    /**
     * Supprime un asset
     */
    @Transactional
    public void deleteAsset(Long id) {
        log.info("Suppression de l'asset avec l'ID: {}", id);
        
        if (!assetRepository.existsById(id)) {
            throw new IllegalArgumentException("Asset non trouvé avec l'ID: " + id);
        }
        
        assetRepository.deleteById(id);
        log.info("Asset supprimé avec succès");
    }

    /**
     * Active ou désactive un asset
     */
    @Transactional
    public Asset toggleAssetStatus(Long id) {
        Asset asset = assetRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Asset non trouvé avec l'ID: " + id));
        
        asset.setActive(!asset.getActive());
        Asset savedAsset = assetRepository.save(asset);
        
        log.info("Statut de l'asset {} changé vers: {}", id, savedAsset.getActive() ? "actif" : "inactif");
        
        return savedAsset;
    }

    /**
     * Récupère les assets avec des configurations de scan actives
     */
    public List<Asset> getAssetsWithActiveScanConfigs() {
        log.debug("Récupération des assets avec configurations de scan actives");
        return assetRepository.findAssetsWithActiveScanConfigs();
    }

    /**
     * Compte les assets par type
     */
    public List<Object[]> countAssetsByType() {
        log.debug("Comptage des assets par type");
        return assetRepository.countAssetsByType();
    }

    private void validateUniqueIdentifiers(Asset asset) {
        if (asset.getHostname() != null && assetRepository.existsByHostname(asset.getHostname())) {
            throw new IllegalArgumentException("Un asset avec ce hostname existe déjà: " + asset.getHostname());
        }
        
        if (asset.getIpAddress() != null && assetRepository.existsByIpAddress(asset.getIpAddress())) {
            throw new IllegalArgumentException("Un asset avec cette adresse IP existe déjà: " + asset.getIpAddress());
        }
    }

    private void validateUniqueIdentifiersForUpdate(Asset asset) {
        if (asset.getHostname() != null) {
            Optional<Asset> existingByHostname = assetRepository.findByHostname(asset.getHostname());
            if (existingByHostname.isPresent() && !existingByHostname.get().getId().equals(asset.getId())) {
                throw new IllegalArgumentException("Un autre asset avec ce hostname existe déjà: " + asset.getHostname());
            }
        }
        
        if (asset.getIpAddress() != null) {
            Optional<Asset> existingByIp = assetRepository.findByIpAddress(asset.getIpAddress());
            if (existingByIp.isPresent() && !existingByIp.get().getId().equals(asset.getId())) {
                throw new IllegalArgumentException("Un autre asset avec cette adresse IP existe déjà: " + asset.getIpAddress());
            }
        }
    }

    private String getAssetIdentifier(Asset asset) {
        if (asset.getHostname() != null && !asset.getHostname().trim().isEmpty()) {
            return asset.getHostname();
        } else if (asset.getIpAddress() != null && !asset.getIpAddress().trim().isEmpty()) {
            return asset.getIpAddress();
        } else {
            return "Asset ID: " + asset.getId();
        }
    }

    /**
     * Teste la connexion SNMP vers un asset
     */
    public boolean testSnmpConnection(Asset asset) {
        try {
            // Simulation d'un test de connexion SNMP
            // Dans une implémentation réelle, on utiliserait une bibliothèque SNMP comme SNMP4J
            
            // Validation des paramètres de base
            if (asset.getIpAddress() == null && asset.getHostname() == null) {
                return false;
            }
            
            if (asset.getPort() == null || asset.getPort() < 1 || asset.getPort() > 65535) {
                return false;
            }
            
            // Validation selon la version SNMP
            switch (asset.getSnmpVersion()) {
                case V1:
                case V2C:
                    if (asset.getCommunity() == null || asset.getCommunity().trim().isEmpty()) {
                        return false;
                    }
                    break;
                case V3:
                    if (asset.getSnmpV3User() == null || asset.getSnmpV3User().trim().isEmpty()) {
                        return false;
                    }
                    break;
                default:
                    return false;
            }
            
            // Simulation d'un test de connexion réussi
            // TODO: Implémenter le vrai test SNMP avec SNMP4J
            return true;
            
        } catch (Exception e) {
            log.error("Erreur lors du test de connexion SNMP pour l'asset {}: {}", 
                     asset.getHostname() != null ? asset.getHostname() : asset.getIpAddress(), 
                     e.getMessage());
            return false;
        }
    }
} 