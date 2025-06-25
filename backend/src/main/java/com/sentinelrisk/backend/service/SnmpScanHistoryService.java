package com.sentinelrisk.backend.service;

import com.sentinelrisk.backend.dto.SnmpManualScanRequest;
import com.sentinelrisk.backend.dto.SnmpManualScanResponse;
import com.sentinelrisk.backend.dto.SnmpScanHistoryDto;
import com.sentinelrisk.backend.dto.SnmpScanHistoryResultDto;
import com.sentinelrisk.backend.model.SnmpScanHistory;
import com.sentinelrisk.backend.model.SnmpScanHistoryResult;
import com.sentinelrisk.backend.repository.SnmpScanHistoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service pour la gestion de l'historique des scans SNMP manuels
 */
@Service
@Transactional
public class SnmpScanHistoryService {

    private static final Logger logger = LoggerFactory.getLogger(SnmpScanHistoryService.class);

    @Autowired
    private SnmpScanHistoryRepository historyRepository;

    @Autowired
    private OidInterpretationService oidInterpretationService;

    /**
     * Enregistre un scan dans l'historique
     */
    public SnmpScanHistory saveScanInHistory(SnmpManualScanRequest request, SnmpManualScanResponse response) {
        logger.info("💾 Enregistrement du scan SNMP dans l'historique pour {}:{}", 
                   request.getIp(), request.getPort());

        try {
            // Vérifier les doublons récents (même IP + OIDs dans les 30 dernières secondes)
            if (isDuplicateScan(request)) {
                logger.debug("⚠️ Scan dupliqué détecté - ignoré");
                return null;
            }

            // N'enregistrer que les scans réussis (selon les exigences)
            if (!response.isSuccess()) {
                logger.debug("ℹ️ Scan échoué - non enregistré dans l'historique");
                return null;
            }

            // Créer l'entrée principale d'historique
            SnmpScanHistory history = new SnmpScanHistory(
                request.getIp(),
                request.getPort(),
                request.getCommunity(),
                request.getVersion(),
                response.isSuccess(),
                response.getDuration(),
                request.getTimeout(),
                request.getRetries(),
                request.getOids().size(),
                response.isSuccess() && response.getResults() != null ? 
                    (int) response.getResults().stream().filter(r -> r.isSuccess()).count() : 0,
                request.getUsername()
            );

            // Ajouter le message d'erreur si échec
            if (!response.isSuccess() && response.getError() != null) {
                history.setErrorMessage(response.getError());
            }

            // Enregistrer d'abord l'historique principal
            history = historyRepository.save(history);

            // Ajouter les résultats détaillés si disponibles
            if (response.getResults() != null && !response.getResults().isEmpty()) {
                for (SnmpManualScanResponse.SnmpResult result : response.getResults()) {
                    SnmpScanHistoryResult historyResult = createHistoryResultWithInterpretation(result, request.getOids());
                    history.addResult(historyResult);
                }
                
                // Sauvegarder avec les résultats
                history = historyRepository.save(history);
            }

            logger.info("✅ Scan enregistré avec succès dans l'historique (ID: {})", history.getId());
            return history;

        } catch (Exception e) {
            logger.error("❌ Erreur lors de l'enregistrement du scan dans l'historique: {}", e.getMessage(), e);
            throw new RuntimeException("Erreur lors de l'enregistrement de l'historique", e);
        }
    }

    /**
     * Récupère tous les scans avec pagination
     */
    @Transactional(readOnly = true)
    public Page<SnmpScanHistoryDto> getAllScans(int page, int size) {
        logger.debug("📋 Récupération des scans - page: {}, taille: {}", page, size);
        
        Pageable pageable = PageRequest.of(page, size);
        Page<SnmpScanHistory> historyPage = historyRepository.findAllByOrderByCreatedAtDesc(pageable);
        
        return historyPage.map(this::convertToDto);
    }

    /**
     * Récupère les scans pour une IP spécifique
     */
    @Transactional(readOnly = true)
    public List<SnmpScanHistoryDto> getScansByIp(String ip) {
        logger.debug("🔍 Récupération des scans pour IP: {}", ip);
        
        List<SnmpScanHistory> scans = historyRepository.findByTargetIpOrderByCreatedAtDesc(ip);
        return scans.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    /**
     * Récupère un scan spécifique avec tous ses détails
     */
    @Transactional(readOnly = true)
    public Optional<SnmpScanHistoryDto> getScanDetails(Long scanId) {
        logger.debug("🔍 Récupération des détails du scan ID: {}", scanId);
        
        Optional<SnmpScanHistory> scanOpt = historyRepository.findById(scanId);
        if (scanOpt.isPresent()) {
            SnmpScanHistory scan = scanOpt.get();
            SnmpScanHistoryDto dto = convertToDto(scan);
            
            // Charger les résultats détaillés
            List<SnmpScanHistoryResultDto> results = scan.getResults().stream()
                .map(this::convertResultToDto)
                .collect(Collectors.toList());
            dto.setResults(results);
            
            return Optional.of(dto);
        }
        
        return Optional.empty();
    }

    /**
     * Recherche dans l'historique
     */
    @Transactional(readOnly = true)
    public List<SnmpScanHistoryDto> searchScans(String searchTerm) {
        logger.debug("🔍 Recherche dans l'historique: '{}'", searchTerm);
        
        List<SnmpScanHistory> scans = historyRepository.searchScans(searchTerm);
        return scans.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    /**
     * Récupère les scans récents (dernières 24h par défaut)
     */
    @Transactional(readOnly = true)
    public List<SnmpScanHistoryDto> getRecentScans(int hours) {
        LocalDateTime since = LocalDateTime.now().minusHours(hours);
        logger.debug("📅 Récupération des scans depuis: {}", since);
        
        List<SnmpScanHistory> scans = historyRepository.findRecentScans(since);
        return scans.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    /**
     * Supprime un scan de l'historique
     */
    public boolean deleteScan(Long scanId) {
        logger.info("🗑️ Suppression du scan ID: {}", scanId);
        
        try {
            if (historyRepository.existsById(scanId)) {
                historyRepository.deleteById(scanId);
                logger.info("✅ Scan supprimé avec succès");
                return true;
            } else {
                logger.warn("⚠️ Scan non trouvé pour suppression: {}", scanId);
                return false;
            }
        } catch (Exception e) {
            logger.error("❌ Erreur lors de la suppression du scan {}: {}", scanId, e.getMessage(), e);
            throw new RuntimeException("Erreur lors de la suppression", e);
        }
    }

    /**
     * Nettoyage automatique des anciens scans
     */
    public void cleanupOldScans(int daysToKeep) {
        LocalDateTime cutoffDate = LocalDateTime.now().minusDays(daysToKeep);
        logger.info("🧹 Nettoyage des scans antérieurs à: {}", cutoffDate);
        
        try {
            historyRepository.deleteByCreatedAtBefore(cutoffDate);
            logger.info("✅ Nettoyage terminé");
        } catch (Exception e) {
            logger.error("❌ Erreur lors du nettoyage: {}", e.getMessage(), e);
        }
    }

    /**
     * Statistiques globales
     */
    @Transactional(readOnly = true)
    public ScanStatistics getStatistics() {
        logger.debug("📊 Calcul des statistiques globales");
        
        long totalScans = historyRepository.count();
        long successfulScans = historyRepository.countBySuccess(true);
        long failedScans = historyRepository.countBySuccess(false);
        Double averageDuration = historyRepository.getAverageDurationForSuccessfulScans();
        
        // Statistiques des dernières 24h
        LocalDateTime last24h = LocalDateTime.now().minusHours(24);
        long scansLast24h = historyRepository.countScansAfter(last24h);
        long successfulLast24h = historyRepository.countScansAfterBySuccess(last24h, true);
        
        return new ScanStatistics(
            totalScans,
            successfulScans,
            failedScans,
            averageDuration != null ? averageDuration : 0.0,
            scansLast24h,
            successfulLast24h
        );
    }

    // === MÉTHODES PRIVÉES ===

    /**
     * Vérifie si le scan est un doublon récent
     */
    private boolean isDuplicateScan(SnmpManualScanRequest request) {
        LocalDateTime recentThreshold = LocalDateTime.now().minusSeconds(30);
        
        try {
            // Rechercher les scans récents sur la même IP
            List<SnmpScanHistory> recentScans = historyRepository.findByTargetIpAndCreatedAtAfter(
                request.getIp(), recentThreshold);
            
            if (recentScans.isEmpty()) {
                return false;
            }
            
            // Créer la signature du scan actuel (IP + OIDs triés)
            String currentSignature = createScanSignature(request.getIp(), request.getOids());
            
            // Vérifier si une signature identique existe
            for (SnmpScanHistory scan : recentScans) {
                if (scan.getOidsCount().equals(request.getOids().size())) {
                    // Pour une vérification plus précise, on pourrait stocker la signature
                    // Pour l'instant, on considère comme doublon si même IP + même nombre d'OIDs
                    logger.debug("Scan potentiellement dupliqué: IP={}, OIDs={}", 
                               request.getIp(), request.getOids().size());
                    return true;
                }
            }
            
            return false;
            
        } catch (Exception e) {
            logger.warn("Erreur lors de la vérification des doublons: {}", e.getMessage());
            return false; // En cas d'erreur, autoriser le scan
        }
    }

    /**
     * Crée une signature unique pour un scan
     */
    private String createScanSignature(String ip, List<String> oids) {
        return ip + ":" + String.join(",", oids.stream().sorted().collect(Collectors.toList()));
    }

    /**
     * Crée un résultat d'historique avec interprétation complète
     */
    private SnmpScanHistoryResult createHistoryResultWithInterpretation(SnmpManualScanResponse.SnmpResult result, List<String> allOids) {
        // Utiliser les informations du résultat pour créer l'entrée historique
        SnmpScanHistoryResult historyResult = new SnmpScanHistoryResult(
            result.getOid(),
            result.getValue(),
            result.getType(),
            result.isSuccess()
        );

        if (!result.isSuccess() && result.getError() != null) {
            historyResult.setErrorMessage(result.getError());
        }

        // Utiliser le service d'interprétation pour enrichir les données
        try {
            OidInterpretationService.OidInfo oidInfo = oidInterpretationService.getOidInfo(result.getOid());
            OidInterpretationService.InterpretationResult interpretation = 
                oidInterpretationService.interpretValue(result.getOid(), result.getValue(), result.getType());

            // Définir les informations OID
            historyResult.setOidName(oidInfo.getName());
            historyResult.setOidDescription(oidInfo.getDescription());
            historyResult.setOidCategory(oidInfo.getCategory());
            
            // Définir l'interprétation
            historyResult.setFormattedValue(interpretation.getFormattedValue());
            historyResult.setInterpretation(interpretation.getInterpretation());
            
            // Définir le statut
            if ("CRITICAL".equals(interpretation.getStatus())) {
                historyResult.setStatus(SnmpScanHistoryResult.SnmpResultStatus.CRITICAL);
            } else if ("WARNING".equals(interpretation.getStatus())) {
                historyResult.setStatus(SnmpScanHistoryResult.SnmpResultStatus.WARNING);
            } else if ("ERROR".equals(interpretation.getStatus())) {
                historyResult.setStatus(SnmpScanHistoryResult.SnmpResultStatus.ERROR);
            } else {
                historyResult.setStatus(SnmpScanHistoryResult.SnmpResultStatus.NORMAL);
            }
            
        } catch (Exception e) {
            logger.warn("Erreur lors de l'interprétation de l'OID {}: {}", result.getOid(), e.getMessage());
            
            // Valeurs par défaut en cas d'erreur
            historyResult.setOidName("OID " + result.getOid());
            historyResult.setOidDescription("Valeur SNMP pour l'OID " + result.getOid());
            historyResult.setOidCategory("general");
            historyResult.setFormattedValue(result.getValue());
            historyResult.setInterpretation(result.getType() + " value");
            historyResult.setStatus(SnmpScanHistoryResult.SnmpResultStatus.NORMAL);
        }
        
        return historyResult;
    }

    private SnmpScanHistoryDto convertToDto(SnmpScanHistory history) {
        return new SnmpScanHistoryDto(
            history.getId(),
            history.getTargetIp(),
            history.getTargetPort(),
            history.getCommunity(),
            history.getSnmpVersion(),
            history.getSuccess(),
            history.getDurationMs(),
            history.getOidsCount(),
            history.getSuccessfulOidsCount(),
            history.getCreatedAt(),
            history.getUsername()
        );
    }

    private SnmpScanHistoryResultDto convertResultToDto(SnmpScanHistoryResult result) {
        return new SnmpScanHistoryResultDto(
            result.getOid(),
            result.getValue(),
            result.getSnmpType(),
            result.getSuccess(),
            result.getOidName(),
            result.getOidDescription(),
            result.getOidCategory(),
            result.getFormattedValue(),
            result.getInterpretation(),
            result.getStatus() != null ? result.getStatus().name() : "UNKNOWN"
        );
    }

    /**
     * Classe interne pour les statistiques
     */
    public static class ScanStatistics {
        private final long totalScans;
        private final long successfulScans;
        private final long failedScans;
        private final double averageDurationMs;
        private final long scansLast24h;
        private final long successfulLast24h;

        public ScanStatistics(long totalScans, long successfulScans, long failedScans,
                             double averageDurationMs, long scansLast24h, long successfulLast24h) {
            this.totalScans = totalScans;
            this.successfulScans = successfulScans;
            this.failedScans = failedScans;
            this.averageDurationMs = averageDurationMs;
            this.scansLast24h = scansLast24h;
            this.successfulLast24h = successfulLast24h;
        }

        // Getters
        public long getTotalScans() { return totalScans; }
        public long getSuccessfulScans() { return successfulScans; }
        public long getFailedScans() { return failedScans; }
        public double getAverageDurationMs() { return averageDurationMs; }
        public long getScansLast24h() { return scansLast24h; }
        public long getSuccessfulLast24h() { return successfulLast24h; }
        
        public double getSuccessRate() {
            return totalScans > 0 ? (double) successfulScans / totalScans * 100 : 0.0;
        }
        
        public double getSuccessRateLast24h() {
            return scansLast24h > 0 ? (double) successfulLast24h / scansLast24h * 100 : 0.0;
        }
    }
} 