package com.sentinelrisk.service;

import com.sentinelrisk.model.SnmpScanResult;
import com.sentinelrisk.repository.SnmpScanResultRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class SnmpScanResultService {

    private final SnmpScanResultRepository resultRepository;

    /**
     * Récupère tous les résultats avec pagination
     */
    public Page<SnmpScanResult> getAllResults(Pageable pageable) {
        return resultRepository.findAll(pageable);
    }

    /**
     * Récupère un résultat par son ID
     */
    public Optional<SnmpScanResult> getResultById(Long id) {
        return resultRepository.findById(id);
    }

    /**
     * Récupère les résultats par asset ID avec pagination
     */
    public Page<SnmpScanResult> getResultsByAssetId(Long assetId, Pageable pageable) {
        return resultRepository.findByAssetId(assetId, pageable);
    }

    /**
     * Récupère les résultats par configuration ID avec pagination
     */
    public Page<SnmpScanResult> getResultsByConfigId(Long configId, Pageable pageable) {
        return resultRepository.findByConfigId(configId, pageable);
    }

    /**
     * Récupère les résultats par statut avec pagination
     */
    public Page<SnmpScanResult> getResultsByStatus(SnmpScanResult.ScanStatus status, Pageable pageable) {
        return resultRepository.findByStatus(status, pageable);
    }

    /**
     * Récupère les résultats par période avec pagination
     */
    public Page<SnmpScanResult> getResultsByPeriod(LocalDateTime startDate, LocalDateTime endDate, Pageable pageable) {
        return resultRepository.findByTimestampBetween(startDate, endDate, pageable);
    }

    /**
     * Récupère le dernier résultat pour un asset
     */
    public Optional<SnmpScanResult> getLatestResultByAssetId(Long assetId) {
        return resultRepository.findLatestByAssetId(assetId);
    }

    /**
     * Récupère le dernier résultat pour une configuration
     */
    public Optional<SnmpScanResult> getLatestResultByConfigId(Long configId) {
        return resultRepository.findLatestByConfigId(configId);
    }

    /**
     * Sauvegarde un résultat de scan
     */
    @Transactional
    public SnmpScanResult saveResult(SnmpScanResult result) {
        return resultRepository.save(result);
    }

    /**
     * Supprime un résultat
     */
    @Transactional
    public void deleteResult(Long id) {
        if (!resultRepository.existsById(id)) {
            throw new IllegalArgumentException("Résultat non trouvé avec l'ID: " + id);
        }
        resultRepository.deleteById(id);
    }

    /**
     * Calcule le taux de succès des scans
     */
    public Double getSuccessRate() {
        long totalScans = resultRepository.count();
        if (totalScans == 0) {
            return 0.0;
        }
        
        long successfulScans = resultRepository.countByStatus(SnmpScanResult.ScanStatus.SUCCESS);
        return (double) successfulScans / totalScans * 100;
    }

    /**
     * Compte les résultats par statut
     */
    public List<Object[]> countResultsByStatus() {
        return resultRepository.countResultsByStatus();
    }

    /**
     * Nettoie les anciens résultats
     */
    @Transactional
    public int cleanupOldResults(int daysToKeep) {
        LocalDateTime cutoffDate = LocalDateTime.now().minusDays(daysToKeep);
        return resultRepository.deleteByTimestampBefore(cutoffDate);
    }

    /**
     * Récupère les résultats récents pour un asset
     */
    public List<SnmpScanResult> getRecentResultsByAssetId(Long assetId, int limit) {
        return resultRepository.findRecentByAssetId(assetId, limit);
    }

    /**
     * Récupère les résultats avec erreurs
     */
    public Page<SnmpScanResult> getFailedResults(Pageable pageable) {
        return resultRepository.findByStatusIn(
                List.of(SnmpScanResult.ScanStatus.FAILURE, 
                       SnmpScanResult.ScanStatus.TIMEOUT, 
                       SnmpScanResult.ScanStatus.CONNECTION_ERROR), 
                pageable);
    }

    /**
     * Récupère les statistiques de performance
     */
    public List<Object[]> getPerformanceStatistics() {
        return resultRepository.getPerformanceStatistics();
    }
} 