package com.sentinelrisk.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
@ConditionalOnProperty(name = "snmp.scheduler.enabled", havingValue = "true", matchIfMissing = true)
public class SnmpScheduler {

    private final SnmpScanService snmpScanService;

    /**
     * Exécute les scans SNMP toutes les 5 minutes
     */
    @Scheduled(fixedDelayString = "${snmp.scheduler.interval:300000}") // 5 minutes par défaut
    public void executeScheduledScans() {
        log.info("Démarrage de l'exécution planifiée des scans SNMP");
        
        try {
            var results = snmpScanService.executeAllActiveScans();
            log.info("Exécution planifiée terminée - {} scans exécutés", results.size());
            
            // Log des statistiques
            long successfulScans = results.stream()
                    .mapToLong(r -> r.isSuccessful() ? 1 : 0)
                    .sum();
            
            long failedScans = results.size() - successfulScans;
            
            if (failedScans > 0) {
                log.warn("Scans échoués: {} sur {}", failedScans, results.size());
            }
            
        } catch (Exception e) {
            log.error("Erreur lors de l'exécution planifiée des scans SNMP: {}", e.getMessage(), e);
        }
    }

    /**
     * Nettoyage des anciens résultats (exécuté quotidiennement à 2h du matin)
     */
    @Scheduled(cron = "${snmp.cleanup.cron:0 0 2 * * ?}")
    public void cleanupOldResults() {
        log.info("Démarrage du nettoyage des anciens résultats SNMP");
        
        try {
            // Cette méthode sera implémentée dans SnmpScanService
            // snmpScanService.cleanupOldResults();
            log.info("Nettoyage des anciens résultats terminé");
            
        } catch (Exception e) {
            log.error("Erreur lors du nettoyage des anciens résultats: {}", e.getMessage(), e);
        }
    }
} 