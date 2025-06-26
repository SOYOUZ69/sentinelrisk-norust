package com.sentinelrisk.backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * Scheduler pour l'automatisation des scans SNMP via Zabbix
 * 
 * Ce composant gère l'exécution périodique des synchronisations avec Zabbix
 * selon les intervalles configurés dans application.yml
 */
@Component
@Configuration
@EnableScheduling
public class SnmpZabbixScheduler {

    private static final Logger logger = LoggerFactory.getLogger(SnmpZabbixScheduler.class);
    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    private final SnmpZabbixAutomationService automationService;
    private final boolean schedulerEnabled;

    @Autowired
    public SnmpZabbixScheduler(SnmpZabbixAutomationService automationService,
                              @Value("${snmp.scheduler.enabled:true}") boolean schedulerEnabled) {
        this.automationService = automationService;
        this.schedulerEnabled = schedulerEnabled;
        
        logger.info("🕐 SnmpZabbixScheduler initialisé - Planification: {}", 
                   schedulerEnabled ? "ACTIVÉE" : "DÉSACTIVÉE");
    }

    /**
     * Synchronisation automatique toutes les 5 minutes (configurable)
     * 
     * Expression cron: ${snmp.zabbix.sync-interval:0 0/5 * * * *}
     * Par défaut: toutes les 5 minutes
     */
    @Scheduled(cron = "${snmp.zabbix.sync-interval:0 0/5 * * * *}")
    public void scheduledZabbixSync() {
        if (!schedulerEnabled) {
            logger.debug("⏸️ Synchronisation automatique désactivée par configuration");
            return;
        }

        String startTime = LocalDateTime.now().format(DATE_FORMAT);
        logger.info("⏰ [{}] Démarrage de la synchronisation automatique Zabbix", startTime);

        try {
            long startMs = System.currentTimeMillis();
            
            // Test de connectivité avant synchronisation
            if (!automationService.testZabbixConnectivity()) {
                logger.error("❌ [{}] Zabbix inaccessible - synchronisation annulée", startTime);
                return;
            }

            // Exécuter la synchronisation
            automationService.synchronizeAllAutomaticScans();
            
            long duration = System.currentTimeMillis() - startMs;
            String endTime = LocalDateTime.now().format(DATE_FORMAT);
            
            logger.info("✅ [{}] Synchronisation automatique terminée en {}ms", endTime, duration);

        } catch (Exception e) {
            logger.error("❌ [{}] Erreur lors de la synchronisation automatique: {}", 
                        startTime, e.getMessage(), e);
            
            // Optionnel: Envoyer une notification d'erreur
            // notificationService.sendAlert("Erreur synchronisation Zabbix", e.getMessage());
        }
    }

    /**
     * Nettoyage automatique des anciens scans automatiques
     * 
     * Expression cron: ${snmp.zabbix.cleanup-cron:0 0 2 * * *}
     * Par défaut: tous les jours à 2h du matin
     */
    @Scheduled(cron = "${snmp.zabbix.cleanup-cron:0 0 2 * * *}")
    public void scheduledCleanup() {
        if (!schedulerEnabled) {
            logger.debug("⏸️ Nettoyage automatique désactivé par configuration");
            return;
        }

        String startTime = LocalDateTime.now().format(DATE_FORMAT);
        logger.info("🧹 [{}] Démarrage du nettoyage automatique des scans Zabbix", startTime);

        try {
            // Obtenir le nombre de jours de rétention depuis la configuration
            // TODO: Implémenter le nettoyage via SnmpScanHistoryService
            
            logger.info("✅ [{}] Nettoyage automatique terminé", LocalDateTime.now().format(DATE_FORMAT));

        } catch (Exception e) {
            logger.error("❌ [{}] Erreur lors du nettoyage automatique: {}", 
                        startTime, e.getMessage(), e);
        }
    }

    /**
     * Synchronisation de santé système toutes les heures
     * 
     * Vérifie que Zabbix est accessible et log les statistiques
     */
    @Scheduled(cron = "0 0 * * * *") // Toutes les heures à 0 minutes
    public void healthCheck() {
        if (!schedulerEnabled) {
            return;
        }

        try {
            boolean zabbixConnected = automationService.testZabbixConnectivity();
            var stats = automationService.getAutomationStatistics();
            
            logger.info("❤️ Santé système Zabbix - Connecté: {}, Scans auto totaux: {}, Dernières 24h: {}, Taux succès: {}%",
                       zabbixConnected,
                       stats.get("totalAutomaticScans"),
                       stats.get("automaticScansLast24h"),
                       stats.get("automaticSuccessRate"));

        } catch (Exception e) {
            logger.warn("⚠️ Erreur lors du contrôle de santé Zabbix: {}", e.getMessage());
        }
    }

    /**
     * Méthode pour déclencher manuellement une synchronisation
     * (utilisée par l'API REST)
     */
    public void triggerManualSync() {
        logger.info("🔄 Synchronisation manuelle déclenchée");
        
        try {
            automationService.synchronizeAllAutomaticScans();
            logger.info("✅ Synchronisation manuelle terminée avec succès");
        } catch (Exception e) {
            logger.error("❌ Erreur lors de la synchronisation manuelle: {}", e.getMessage(), e);
            throw new RuntimeException("Échec de la synchronisation manuelle", e);
        }
    }

    /**
     * Méthode pour déclencher manuellement la synchronisation d'un hôte spécifique
     */
    public void triggerHostSync(String hostId) {
        logger.info("🎯 Synchronisation manuelle de l'hôte: {}", hostId);
        
        try {
            automationService.synchronizeSpecificHost(hostId);
            logger.info("✅ Synchronisation de l'hôte {} terminée avec succès", hostId);
        } catch (Exception e) {
            logger.error("❌ Erreur lors de la synchronisation de l'hôte {}: {}", hostId, e.getMessage(), e);
            throw new RuntimeException("Échec de la synchronisation de l'hôte " + hostId, e);
        }
    }

    /**
     * Vérifie si le scheduler est activé
     */
    public boolean isSchedulerEnabled() {
        return schedulerEnabled;
    }

    /**
     * Obtient l'état du scheduler
     */
    public SchedulerStatus getSchedulerStatus() {
        return new SchedulerStatus(
            schedulerEnabled,
            automationService.testZabbixConnectivity(),
            LocalDateTime.now()
        );
    }

    /**
     * Classe pour représenter l'état du scheduler
     */
    public static class SchedulerStatus {
        private final boolean enabled;
        private final boolean zabbixConnected;
        private final LocalDateTime lastCheck;

        public SchedulerStatus(boolean enabled, boolean zabbixConnected, LocalDateTime lastCheck) {
            this.enabled = enabled;
            this.zabbixConnected = zabbixConnected;
            this.lastCheck = lastCheck;
        }

        public boolean isEnabled() {
            return enabled;
        }

        public boolean isZabbixConnected() {
            return zabbixConnected;
        }

        public LocalDateTime getLastCheck() {
            return lastCheck;
        }

        public String getStatus() {
            if (!enabled) return "DISABLED";
            if (!zabbixConnected) return "ERROR";
            return "RUNNING";
        }
    }
} 