package com.sentinelrisk.service;

import com.sentinelrisk.model.Asset;
import com.sentinelrisk.model.SnmpScanConfig;
import com.sentinelrisk.model.SnmpScanResult;
import com.sentinelrisk.repository.SnmpScanConfigRepository;
import com.sentinelrisk.repository.SnmpScanResultRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class SnmpScanService {

    private final SnmpService snmpService;
    private final SnmpScanConfigRepository configRepository;
    private final SnmpScanResultRepository resultRepository;

    /**
     * Exécute un scan pour une configuration donnée
     */
    @Transactional
    public SnmpScanResult executeScan(SnmpScanConfig config) {
        log.info("Exécution du scan SNMP pour la configuration: {}", config.getName());
        
        long startTime = System.currentTimeMillis();
        SnmpScanResult result = new SnmpScanResult();
        result.setConfig(config);
        result.setAsset(config.getAsset());
        result.setTimestamp(LocalDateTime.now());
        result.setValues(new HashMap<>());
        
        try {
            // Exécution du scan SNMP
            Map<String, Object> values = snmpService.fetchOids(config.getAsset(), config.getOids());
            result.setValues(values);
            
            // Calcul du score global
            Double globalScore = calculateGlobalScore(values, config);
            result.setGlobalScore(globalScore);
            
            // Détermination du statut
            if (values.isEmpty()) {
                result.setStatus(SnmpScanResult.ScanStatus.FAILURE);
                result.setErrorMessage("Aucune valeur récupérée");
            } else if (values.size() < config.getOids().size()) {
                result.setStatus(SnmpScanResult.ScanStatus.PARTIAL_SUCCESS);
                result.setErrorMessage("Certains OIDs n'ont pas pu être récupérés");
            } else {
                result.setStatus(SnmpScanResult.ScanStatus.SUCCESS);
            }
            
        } catch (SnmpService.SnmpException e) {
            log.error("Erreur lors du scan SNMP pour la configuration {}: {}", 
                     config.getName(), e.getMessage());
            
            result.setStatus(determineErrorStatus(e));
            result.setErrorMessage(e.getMessage());
            
        } catch (Exception e) {
            log.error("Erreur inattendue lors du scan SNMP pour la configuration {}: {}", 
                     config.getName(), e.getMessage());
            
            result.setStatus(SnmpScanResult.ScanStatus.FAILURE);
            result.setErrorMessage("Erreur inattendue: " + e.getMessage());
        }
        
        // Calcul du temps d'exécution
        long executionTime = System.currentTimeMillis() - startTime;
        result.setExecutionTimeMs(executionTime);
        
        // Sauvegarde du résultat
        result = resultRepository.save(result);
        
        log.info("Scan terminé pour la configuration {} - Statut: {} - Temps: {}ms", 
                config.getName(), result.getStatus(), executionTime);
        
        return result;
    }

    /**
     * Exécute tous les scans actifs
     */
    @Transactional
    public List<SnmpScanResult> executeAllActiveScans() {
        log.info("Exécution de tous les scans actifs");
        
        List<SnmpScanConfig> activeConfigs = configRepository.findReadyForExecution();
        log.info("Nombre de configurations actives trouvées: {}", activeConfigs.size());
        
        return activeConfigs.stream()
                .map(this::executeScan)
                .toList();
    }

    /**
     * Calcule le score global basé sur les valeurs et les seuils de sévérité
     */
    private Double calculateGlobalScore(Map<String, Object> values, SnmpScanConfig config) {
        if (values.isEmpty() || config.getSeverityThresholds() == null || config.getSeverityThresholds().isEmpty()) {
            return null;
        }
        
        double totalScore = 0.0;
        int scoredValues = 0;
        
        for (Map.Entry<String, Object> entry : values.entrySet()) {
            String oid = entry.getKey();
            Object value = entry.getValue();
            
            SnmpScanConfig.SeverityThreshold threshold = config.getSeverityThresholds().get(oid);
            if (threshold != null && value instanceof Number) {
                Double numericValue = ((Number) value).doubleValue();
                
                if (threshold.isInRange(numericValue)) {
                    double score = getSeverityScore(threshold.getSeverity());
                    totalScore += score;
                    scoredValues++;
                    
                    log.debug("OID {} = {} -> Score: {} (Sévérité: {})", 
                             oid, numericValue, score, threshold.getSeverity());
                }
            }
        }
        
        if (scoredValues == 0) {
            return null;
        }
        
        double globalScore = totalScore / scoredValues;
        log.debug("Score global calculé: {} (basé sur {} valeurs)", globalScore, scoredValues);
        
        return globalScore;
    }

    /**
     * Convertit un niveau de sévérité en score numérique
     */
    private double getSeverityScore(SnmpScanConfig.SeverityThreshold.SeverityLevel severity) {
        return switch (severity) {
            case LOW -> 1.0;
            case MEDIUM -> 2.5;
            case HIGH -> 4.0;
            case CRITICAL -> 5.0;
        };
    }

    /**
     * Détermine le statut d'erreur basé sur l'exception
     */
    private SnmpScanResult.ScanStatus determineErrorStatus(SnmpService.SnmpException e) {
        String message = e.getMessage().toLowerCase();
        
        if (message.contains("timeout")) {
            return SnmpScanResult.ScanStatus.TIMEOUT;
        } else if (message.contains("connection") || message.contains("communication")) {
            return SnmpScanResult.ScanStatus.CONNECTION_ERROR;
        } else {
            return SnmpScanResult.ScanStatus.FAILURE;
        }
    }

    /**
     * Obtient les derniers résultats pour un asset
     */
    public List<SnmpScanResult> getLatestResultsForAsset(Asset asset, int limit) {
        return resultRepository.findByAssetOrderByTimestampDesc(asset, 
                org.springframework.data.domain.PageRequest.of(0, limit))
                .getContent();
    }

    /**
     * Obtient les derniers résultats pour une configuration
     */
    public List<SnmpScanResult> getLatestResultsForConfig(SnmpScanConfig config, int limit) {
        return resultRepository.findByConfigOrderByTimestampDesc(config, 
                org.springframework.data.domain.PageRequest.of(0, limit))
                .getContent();
    }

    /**
     * Obtient les statistiques de scan pour un asset
     */
    public Map<String, Object> getScanStatistics(Asset asset) {
        Map<String, Object> stats = new HashMap<>();
        
        // Dernier résultat
        resultRepository.findFirstByAssetOrderByTimestampDesc(asset)
                .ifPresent(lastResult -> {
                    stats.put("lastScanTime", lastResult.getTimestamp());
                    stats.put("lastScanStatus", lastResult.getStatus());
                    stats.put("lastGlobalScore", lastResult.getGlobalScore());
                });
        
        // Statistiques des dernières 24h
        LocalDateTime since = LocalDateTime.now().minusDays(1);
        List<SnmpScanResult> recentResults = resultRepository.findByAssetAndTimestampBetween(
                asset, since, LocalDateTime.now());
        
        stats.put("scansLast24h", recentResults.size());
        
        long successfulScans = recentResults.stream()
                .mapToLong(r -> r.isSuccessful() ? 1 : 0)
                .sum();
        
        stats.put("successfulScansLast24h", successfulScans);
        
        if (!recentResults.isEmpty()) {
            double successRate = (double) successfulScans / recentResults.size() * 100;
            stats.put("successRateLast24h", Math.round(successRate * 100.0) / 100.0);
        }
        
        return stats;
    }
} 