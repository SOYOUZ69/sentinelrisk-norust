package com.sentinelrisk.backend.controller;

import com.sentinelrisk.backend.dto.SnmpScanTargetDto;
import com.sentinelrisk.backend.service.SnmpScanTargetService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Contrôleur REST pour la configuration des scans SNMP automatiques
 */
@RestController
@RequestMapping("/snmp/automation/config")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
@PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER')")
public class SnmpAutomationConfigController {

    private final SnmpScanTargetService scanTargetService;

    /**
     * Récupère tous les assets disponibles pour configuration
     */
    @GetMapping("/targets")
    public ResponseEntity<Map<String, Object>> getAvailableTargets(Authentication authentication) {
        log.debug("🔍 API: Demande des assets disponibles pour configuration");
        
        try {
            List<SnmpScanTargetDto> targets = scanTargetService.getAllAvailableTargets();
            Map<String, Object> statistics = scanTargetService.getTargetStatistics();
            
            Map<String, Object> response = new HashMap<>();
            response.put("targets", targets);
            response.put("statistics", statistics);
            response.put("total", targets.size());
            response.put("timestamp", System.currentTimeMillis());
            
            log.info("✅ API: {} assets disponibles récupérés", targets.size());
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("❌ API: Erreur lors de la récupération des assets disponibles", e);
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Erreur lors de la récupération des assets");
            errorResponse.put("message", e.getMessage());
            errorResponse.put("timestamp", System.currentTimeMillis());
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }

    /**
     * Récupère uniquement les assets activés
     */
    @GetMapping("/targets/enabled")
    public ResponseEntity<Map<String, Object>> getEnabledTargets(Authentication authentication) {
        log.debug("🔍 API: Demande des assets activés");
        
        try {
            List<SnmpScanTargetDto> enabledTargets = scanTargetService.getEnabledTargets();
            
            Map<String, Object> response = new HashMap<>();
            response.put("targets", enabledTargets);
            response.put("count", enabledTargets.size());
            response.put("timestamp", System.currentTimeMillis());
            
            log.info("✅ API: {} assets activés récupérés", enabledTargets.size());
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("❌ API: Erreur lors de la récupération des assets activés", e);
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Erreur lors de la récupération des assets activés");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }

    /**
     * Configure un asset pour les scans automatiques
     */
    @PostMapping("/targets/{zabbixHostId}")
    public ResponseEntity<Map<String, Object>> configureTarget(
            @PathVariable String zabbixHostId,
            @RequestBody Map<String, Object> configRequest,
            Authentication authentication) {
        
        log.debug("⚙️ API: Configuration de l'asset {} avec {}", zabbixHostId, configRequest);
        
        try {
            Boolean enabled = (Boolean) configRequest.get("enabled");
            Integer priority = (Integer) configRequest.get("priority");
            String username = authentication.getName();
            
            if (enabled == null) {
                enabled = false;
            }
            if (priority == null) {
                priority = 3;
            }
            
            SnmpScanTargetDto configuredTarget = scanTargetService.configureTarget(
                zabbixHostId, enabled, priority, username);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("target", configuredTarget);
            response.put("message", enabled ? "Asset activé pour les scans automatiques" : "Asset désactivé");
            response.put("timestamp", System.currentTimeMillis());
            
            log.info("✅ API: Asset {} configuré avec succès", zabbixHostId);
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("❌ API: Erreur lors de la configuration de l'asset {}", zabbixHostId, e);
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("error", "Erreur lors de la configuration de l'asset");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }

    /**
     * Met à jour rapidement le statut d'activation d'un asset
     */
    @PutMapping("/targets/{zabbixHostId}/status")
    public ResponseEntity<Map<String, Object>> updateTargetStatus(
            @PathVariable String zabbixHostId,
            @RequestBody Map<String, Object> statusRequest,
            Authentication authentication) {
        
        log.debug("🔄 API: Mise à jour du statut de l'asset {}", zabbixHostId);
        
        try {
            Boolean enabled = (Boolean) statusRequest.get("enabled");
            if (enabled == null) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("success", false);
                errorResponse.put("error", "Le paramètre 'enabled' est requis");
                return ResponseEntity.badRequest().body(errorResponse);
            }
            
            boolean updated = scanTargetService.updateTargetStatus(zabbixHostId, enabled);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", updated);
            response.put("message", updated ? 
                (enabled ? "Asset activé" : "Asset désactivé") : 
                "Asset non trouvé");
            response.put("timestamp", System.currentTimeMillis());
            
            if (updated) {
                log.info("✅ API: Statut de l'asset {} mis à jour", zabbixHostId);
                return ResponseEntity.ok(response);
            } else {
                log.warn("⚠️ API: Asset {} non trouvé pour mise à jour", zabbixHostId);
                return ResponseEntity.notFound().build();
            }
            
        } catch (Exception e) {
            log.error("❌ API: Erreur lors de la mise à jour du statut de l'asset {}", zabbixHostId, e);
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("error", "Erreur lors de la mise à jour du statut");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }

    /**
     * Synchronise les assets avec Zabbix
     */
    @PostMapping("/sync")
    public ResponseEntity<Map<String, Object>> synchronizeTargets(Authentication authentication) {
        log.info("🔄 API: Demande de synchronisation avec Zabbix");
        
        try {
            int updated = scanTargetService.synchronizeWithZabbix();
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("updated", updated);
            response.put("message", updated + " assets mis à jour depuis Zabbix");
            response.put("timestamp", System.currentTimeMillis());
            
            log.info("✅ API: Synchronisation terminée - {} assets mis à jour", updated);
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("❌ API: Erreur lors de la synchronisation", e);
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("error", "Erreur lors de la synchronisation avec Zabbix");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }

    /**
     * Récupère les statistiques de configuration
     */
    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Object>> getConfigurationStatistics(Authentication authentication) {
        log.debug("📊 API: Demande des statistiques de configuration");
        
        try {
            Map<String, Object> statistics = scanTargetService.getTargetStatistics();
            statistics.put("timestamp", System.currentTimeMillis());
            
            log.debug("✅ API: Statistiques de configuration récupérées");
            return ResponseEntity.ok(statistics);
            
        } catch (Exception e) {
            log.error("❌ API: Erreur lors de la récupération des statistiques", e);
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Erreur lors de la récupération des statistiques");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }

    /**
     * Configuration en lot (activer/désactiver plusieurs assets)
     */
    @PostMapping("/targets/batch")
    public ResponseEntity<Map<String, Object>> configureBatchTargets(
            @RequestBody Map<String, Object> batchRequest,
            Authentication authentication) {
        
        log.debug("⚙️ API: Configuration en lot de {} assets", batchRequest);
        
        try {
            @SuppressWarnings("unchecked")
            List<String> zabbixHostIds = (List<String>) batchRequest.get("hostIds");
            Boolean enabled = (Boolean) batchRequest.get("enabled");
            Integer priority = (Integer) batchRequest.get("priority");
            
            if (zabbixHostIds == null || zabbixHostIds.isEmpty()) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("success", false);
                errorResponse.put("error", "La liste des hostIds est requise");
                return ResponseEntity.badRequest().body(errorResponse);
            }
            
            String username = authentication.getName();
            int successCount = 0;
            int errorCount = 0;
            
            for (String hostId : zabbixHostIds) {
                try {
                    scanTargetService.configureTarget(hostId, 
                        enabled != null ? enabled : false, 
                        priority != null ? priority : 3, 
                        username);
                    successCount++;
                } catch (Exception e) {
                    log.warn("⚠️ Erreur lors de la configuration de l'asset {}: {}", hostId, e.getMessage());
                    errorCount++;
                }
            }
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", errorCount == 0);
            response.put("processed", zabbixHostIds.size());
            response.put("successful", successCount);
            response.put("errors", errorCount);
            response.put("message", String.format("%d assets traités avec succès, %d erreurs", successCount, errorCount));
            response.put("timestamp", System.currentTimeMillis());
            
            log.info("✅ API: Configuration en lot terminée - {} succès, {} erreurs", successCount, errorCount);
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("❌ API: Erreur lors de la configuration en lot", e);
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("error", "Erreur lors de la configuration en lot");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }
} 