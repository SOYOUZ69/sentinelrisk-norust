package com.sentinelrisk.backend.controller;

import com.sentinelrisk.backend.model.SnmpScanHistory;
import com.sentinelrisk.backend.service.SnmpZabbixAutomationService;
import com.sentinelrisk.backend.service.SnmpZabbixScheduler;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Contrôleur REST pour l'automatisation des scans SNMP via Zabbix
 * 
 * Fournit des endpoints pour gérer la synchronisation automatique,
 * déclencher des scans manuels et surveiller l'état du système.
 */
@RestController
@RequestMapping("/snmp/automation")
@Tag(name = "SNMP Automation", description = "Gestion de l'automatisation des scans SNMP via Zabbix")
public class SnmpZabbixAutomationController {

    private static final Logger logger = LoggerFactory.getLogger(SnmpZabbixAutomationController.class);

    private final SnmpZabbixAutomationService automationService;
    private final SnmpZabbixScheduler scheduler;

    @Autowired
    public SnmpZabbixAutomationController(SnmpZabbixAutomationService automationService,
                                         SnmpZabbixScheduler scheduler) {
        this.automationService = automationService;
        this.scheduler = scheduler;
    }

    /**
     * Déclenche une synchronisation manuelle de tous les hôtes Zabbix
     */
    @PostMapping("/sync")
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER')")
    @Operation(
        summary = "Synchronisation manuelle complète",
        description = "Lance une synchronisation immédiate de tous les hôtes SNMP depuis Zabbix"
    )
    @ApiResponse(responseCode = "200", description = "Synchronisation lancée avec succès")
    @ApiResponse(responseCode = "500", description = "Erreur lors de la synchronisation")
    public ResponseEntity<Map<String, Object>> triggerManualSync() {
        logger.info("🔄 API: Demande de synchronisation manuelle reçue");
        
        try {
            long startTime = System.currentTimeMillis();
            scheduler.triggerManualSync();
            long duration = System.currentTimeMillis() - startTime;

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Synchronisation manuelle terminée avec succès");
            response.put("durationMs", duration);
            response.put("timestamp", System.currentTimeMillis());

            logger.info("✅ API: Synchronisation manuelle terminée en {}ms", duration);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            logger.error("❌ API: Erreur lors de la synchronisation manuelle: {}", e.getMessage(), e);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Erreur lors de la synchronisation: " + e.getMessage());
            response.put("timestamp", System.currentTimeMillis());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * Déclenche une synchronisation pour un hôte spécifique
     */
    @PostMapping("/sync/host/{hostId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER')")
    @Operation(
        summary = "Synchronisation d'un hôte spécifique",
        description = "Lance une synchronisation immédiate pour un hôte Zabbix donné"
    )
    @ApiResponse(responseCode = "200", description = "Synchronisation de l'hôte réussie")
    @ApiResponse(responseCode = "404", description = "Hôte non trouvé")
    @ApiResponse(responseCode = "500", description = "Erreur lors de la synchronisation")
    public ResponseEntity<Map<String, Object>> triggerHostSync(
            @Parameter(description = "ID de l'hôte Zabbix", required = true)
            @PathVariable String hostId) {
        logger.info("🎯 API: Demande de synchronisation pour l'hôte: {}", hostId);
        
        try {
            long startTime = System.currentTimeMillis();
            scheduler.triggerHostSync(hostId);
            long duration = System.currentTimeMillis() - startTime;

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Synchronisation de l'hôte " + hostId + " terminée avec succès");
            response.put("hostId", hostId);
            response.put("durationMs", duration);
            response.put("timestamp", System.currentTimeMillis());

            logger.info("✅ API: Synchronisation de l'hôte {} terminée en {}ms", hostId, duration);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            logger.error("❌ API: Erreur lors de la synchronisation de l'hôte {}: {}", hostId, e.getMessage(), e);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Erreur lors de la synchronisation de l'hôte: " + e.getMessage());
            response.put("hostId", hostId);
            response.put("timestamp", System.currentTimeMillis());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * Obtient les statistiques de l'automatisation
     */
    @GetMapping("/statistics")
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER')")
    @Operation(
        summary = "Statistiques d'automatisation",
        description = "Récupère les statistiques des scans automatiques Zabbix"
    )
    @ApiResponse(responseCode = "200", description = "Statistiques récupérées avec succès")
    public ResponseEntity<Map<String, Object>> getAutomationStatistics() {
        logger.debug("📊 API: Demande de statistiques d'automatisation");
        
        try {
            Map<String, Object> stats = automationService.getAutomationStatistics();
            
            // Ajouter des informations sur le scheduler
            SnmpZabbixScheduler.SchedulerStatus schedulerStatus = scheduler.getSchedulerStatus();
            stats.put("schedulerEnabled", schedulerStatus.isEnabled());
            stats.put("schedulerStatus", schedulerStatus.getStatus());
            stats.put("lastHealthCheck", schedulerStatus.getLastCheck());
            
            logger.debug("✅ API: Statistiques récupérées: {} scans automatiques totaux", 
                        stats.get("totalAutomaticScans"));
            
            return ResponseEntity.ok(stats);

        } catch (Exception e) {
            logger.error("❌ API: Erreur lors de la récupération des statistiques: {}", e.getMessage(), e);
            
            Map<String, Object> response = new HashMap<>();
            response.put("error", "Erreur lors de la récupération des statistiques: " + e.getMessage());
            response.put("timestamp", System.currentTimeMillis());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * Teste la connectivité avec Zabbix
     */
    @GetMapping("/connectivity/test")
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER')")
    @Operation(
        summary = "Test de connectivité Zabbix",
        description = "Vérifie que l'application peut se connecter à Zabbix"
    )
    @ApiResponse(responseCode = "200", description = "Test de connectivité effectué")
    public ResponseEntity<Map<String, Object>> testZabbixConnectivity() {
        logger.info("🔌 API: Test de connectivité Zabbix demandé");
        
        try {
            long startTime = System.currentTimeMillis();
            boolean connected = automationService.testZabbixConnectivity();
            long duration = System.currentTimeMillis() - startTime;

            Map<String, Object> response = new HashMap<>();
            response.put("connected", connected);
            response.put("status", connected ? "SUCCESS" : "FAILURE");
            response.put("message", connected ? "Connexion à Zabbix réussie" : "Impossible de se connecter à Zabbix");
            response.put("responseTimeMs", duration);
            response.put("timestamp", System.currentTimeMillis());

            logger.info("🔌 API: Test de connectivité Zabbix - Résultat: {} ({}ms)", 
                       connected ? "SUCCÈS" : "ÉCHEC", duration);
            
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            logger.error("❌ API: Erreur lors du test de connectivité: {}", e.getMessage(), e);
            
            Map<String, Object> response = new HashMap<>();
            response.put("connected", false);
            response.put("status", "ERROR");
            response.put("message", "Erreur lors du test: " + e.getMessage());
            response.put("timestamp", System.currentTimeMillis());
            
            return ResponseEntity.ok(response); // 200 même en cas d'erreur car le test a bien été effectué
        }
    }

    /**
     * Obtient l'état du scheduler
     */
    @GetMapping("/scheduler/status")
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER')")
    @Operation(
        summary = "État du scheduler",
        description = "Récupère l'état actuel du scheduler de synchronisation automatique"
    )
    @ApiResponse(responseCode = "200", description = "État du scheduler récupéré")
    public ResponseEntity<Map<String, Object>> getSchedulerStatus() {
        logger.debug("⚙️ API: Demande d'état du scheduler");
        
        try {
            SnmpZabbixScheduler.SchedulerStatus status = scheduler.getSchedulerStatus();
            
            Map<String, Object> response = new HashMap<>();
            response.put("enabled", status.isEnabled());
            response.put("zabbixConnected", status.isZabbixConnected());
            response.put("status", status.getStatus());
            response.put("lastCheck", status.getLastCheck());
            response.put("timestamp", System.currentTimeMillis());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            logger.error("❌ API: Erreur lors de la récupération de l'état du scheduler: {}", e.getMessage(), e);
            
            Map<String, Object> response = new HashMap<>();
            response.put("error", "Erreur lors de la récupération de l'état: " + e.getMessage());
            response.put("timestamp", System.currentTimeMillis());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * Force une synchronisation spécifique et retourne les résultats
     */
    @PostMapping("/sync/host/{hostId}/detailed")
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER')")
    @Operation(
        summary = "Synchronisation détaillée d'un hôte",
        description = "Lance une synchronisation pour un hôte et retourne les détails du scan créé"
    )
    @ApiResponse(
        responseCode = "200", 
        description = "Synchronisation réussie avec détails du scan",
        content = @Content(schema = @Schema(implementation = SnmpScanHistory.class))
    )
    @ApiResponse(responseCode = "404", description = "Hôte non trouvé")
    @ApiResponse(responseCode = "500", description = "Erreur lors de la synchronisation")
    public ResponseEntity<Object> triggerDetailedHostSync(
            @Parameter(description = "ID de l'hôte Zabbix", required = true)
            @PathVariable String hostId) {
        logger.info("🔍 API: Demande de synchronisation détaillée pour l'hôte: {}", hostId);
        
        try {
            long startTime = System.currentTimeMillis();
            SnmpScanHistory scan = automationService.synchronizeSpecificHost(hostId);
            long duration = System.currentTimeMillis() - startTime;

            if (scan == null) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Aucun scan créé pour l'hôte " + hostId);
                response.put("hostId", hostId);
                response.put("timestamp", System.currentTimeMillis());
                
                return ResponseEntity.ok(response);
            }

            logger.info("✅ API: Synchronisation détaillée de l'hôte {} terminée - Scan ID: {} ({}ms)", 
                       hostId, scan.getId(), duration);
            
            return ResponseEntity.ok(scan);

        } catch (Exception e) {
            logger.error("❌ API: Erreur lors de la synchronisation détaillée de l'hôte {}: {}", 
                        hostId, e.getMessage(), e);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Erreur lors de la synchronisation: " + e.getMessage());
            response.put("hostId", hostId);
            response.put("timestamp", System.currentTimeMillis());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
} 