package com.sentinelrisk.service;

import com.sentinelrisk.model.Asset;
import com.sentinelrisk.model.SnmpScanConfig;
import com.sentinelrisk.repository.SnmpScanConfigRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class SnmpScanConfigService {

    private final SnmpScanConfigRepository configRepository;

    /**
     * Récupère toutes les configurations
     */
    public List<SnmpScanConfig> getAllConfigs() {
        return configRepository.findAll();
    }

    /**
     * Récupère une configuration par son ID
     */
    public Optional<SnmpScanConfig> getConfigById(Long id) {
        return configRepository.findById(id);
    }

    /**
     * Récupère les configurations actives
     */
    public List<SnmpScanConfig> getActiveConfigs() {
        return configRepository.findByActiveTrue();
    }

    /**
     * Récupère les configurations par asset
     */
    public List<SnmpScanConfig> getConfigsByAsset(Asset asset) {
        return configRepository.findByAsset(asset);
    }

    /**
     * Récupère les configurations par asset ID
     */
    public List<SnmpScanConfig> getConfigsByAssetId(Long assetId) {
        return configRepository.findByAssetId(assetId);
    }

    /**
     * Récupère les configurations actives par asset
     */
    public List<SnmpScanConfig> getActiveConfigsByAsset(Asset asset) {
        return configRepository.findByAssetAndActiveTrue(asset);
    }

    /**
     * Récupère une configuration par nom
     */
    public Optional<SnmpScanConfig> getConfigByName(String name) {
        return configRepository.findByName(name);
    }

    /**
     * Récupère les configurations prêtes pour l'exécution
     */
    public List<SnmpScanConfig> getConfigsReadyForExecution() {
        return configRepository.findReadyForExecution();
    }

    /**
     * Crée ou met à jour une configuration
     */
    @Transactional
    public SnmpScanConfig saveConfig(SnmpScanConfig config) {
        // Validation du nom unique
        if (config.getId() == null) {
            validateUniqueName(config.getName());
        } else {
            validateUniqueNameForUpdate(config);
        }
        
        return configRepository.save(config);
    }

    /**
     * Supprime une configuration
     */
    @Transactional
    public void deleteConfig(Long id) {
        if (!configRepository.existsById(id)) {
            throw new IllegalArgumentException("Configuration non trouvée avec l'ID: " + id);
        }
        
        configRepository.deleteById(id);
    }

    /**
     * Active ou désactive une configuration
     */
    @Transactional
    public SnmpScanConfig toggleConfigStatus(Long id) {
        SnmpScanConfig config = configRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Configuration non trouvée avec l'ID: " + id));
        
        config.setActive(!config.getActive());
        return configRepository.save(config);
    }

    /**
     * Compte les configurations par asset
     */
    public List<Object[]> countConfigsByAsset() {
        return configRepository.countConfigsByAsset();
    }

    private void validateUniqueName(String name) {
        if (configRepository.existsByName(name)) {
            throw new IllegalArgumentException("Une configuration avec ce nom existe déjà: " + name);
        }
    }

    private void validateUniqueNameForUpdate(SnmpScanConfig config) {
        Optional<SnmpScanConfig> existingByName = configRepository.findByName(config.getName());
        if (existingByName.isPresent() && !existingByName.get().getId().equals(config.getId())) {
            throw new IllegalArgumentException("Une autre configuration avec ce nom existe déjà: " + config.getName());
        }
    }
} 