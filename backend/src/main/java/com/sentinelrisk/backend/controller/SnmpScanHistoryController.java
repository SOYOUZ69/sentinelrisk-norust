package com.sentinelrisk.backend.controller;

import com.sentinelrisk.backend.dto.SnmpScanHistoryDto;
import com.sentinelrisk.backend.service.SnmpScanHistoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * Contrôleur REST pour l'historique des scans SNMP manuels
 */
@RestController
@RequestMapping("/snmp/history")
@Tag(name = "Historique SNMP", description = "Gestion de l'historique des scans SNMP manuels")
@CrossOrigin(origins = "*")
public class SnmpScanHistoryController {

    private static final Logger logger = LoggerFactory.getLogger(SnmpScanHistoryController.class);

    @Autowired
    private SnmpScanHistoryService historyService;

    @Operation(
        summary = "Liste tous les scans SNMP",
        description = "Récupère l'historique de tous les scans SNMP avec pagination"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Liste récupérée avec succès"),
        @ApiResponse(responseCode = "500", description = "Erreur serveur")
    })
    @GetMapping
    // @PreAuthorize("hasRole('admin') or hasRole('risk_manager')") // Temporairement désactivé
    public ResponseEntity<Page<SnmpScanHistoryDto>> getAllScans(
            @Parameter(description = "Numéro de page (0-based)") 
            @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Taille de la page") 
            @RequestParam(defaultValue = "20") int size) {
        
        logger.info("📋 Récupération de l'historique des scans - page: {}, taille: {}", page, size);
        
        try {
            Page<SnmpScanHistoryDto> scans = historyService.getAllScans(page, size);
            logger.info("✅ {} scans récupérés", scans.getTotalElements());
            return ResponseEntity.ok(scans);
            
        } catch (Exception e) {
            logger.error("❌ Erreur lors de la récupération de l'historique: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(
        summary = "Détails d'un scan spécifique",
        description = "Récupère les détails complets d'un scan SNMP, incluant tous les résultats OID"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Détails récupérés avec succès"),
        @ApiResponse(responseCode = "404", description = "Scan non trouvé"),
        @ApiResponse(responseCode = "500", description = "Erreur serveur")
    })
    @GetMapping("/{scanId}")
    // @PreAuthorize("hasRole('admin') or hasRole('risk_manager')") // Temporairement désactivé
    public ResponseEntity<SnmpScanHistoryDto> getScanDetails(
            @Parameter(description = "Identifiant du scan") 
            @PathVariable Long scanId) {
        
        logger.info("🔍 Récupération des détails du scan ID: {}", scanId);
        
        try {
            Optional<SnmpScanHistoryDto> scanOpt = historyService.getScanDetails(scanId);
            
            if (scanOpt.isPresent()) {
                logger.info("✅ Détails du scan {} récupérés", scanId);
                return ResponseEntity.ok(scanOpt.get());
            } else {
                logger.warn("⚠️ Scan {} non trouvé", scanId);
                return ResponseEntity.notFound().build();
            }
            
        } catch (Exception e) {
            logger.error("❌ Erreur lors de la récupération du scan {}: {}", scanId, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(
        summary = "Scans par adresse IP",
        description = "Récupère tous les scans effectués sur une adresse IP spécifique"
    )
    @GetMapping("/by-ip/{ip}")
    @PreAuthorize("hasRole('admin') or hasRole('risk_manager')")
    public ResponseEntity<List<SnmpScanHistoryDto>> getScansByIp(
            @Parameter(description = "Adresse IP cible") 
            @PathVariable String ip) {
        
        logger.info("🔍 Récupération des scans pour IP: {}", ip);
        
        try {
            List<SnmpScanHistoryDto> scans = historyService.getScansByIp(ip);
            logger.info("✅ {} scans trouvés pour IP {}", scans.size(), ip);
            return ResponseEntity.ok(scans);
            
        } catch (Exception e) {
            logger.error("❌ Erreur lors de la récupération des scans pour IP {}: {}", ip, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(
        summary = "Recherche dans l'historique",
        description = "Recherche dans l'historique des scans par IP ou port"
    )
    @GetMapping("/search")
    @PreAuthorize("hasRole('admin') or hasRole('risk_manager')")
    public ResponseEntity<List<SnmpScanHistoryDto>> searchScans(
            @Parameter(description = "Terme de recherche") 
            @RequestParam String q) {
        
        logger.info("🔍 Recherche dans l'historique: '{}'", q);
        
        try {
            List<SnmpScanHistoryDto> scans = historyService.searchScans(q);
            logger.info("✅ {} scans trouvés pour la recherche '{}'", scans.size(), q);
            return ResponseEntity.ok(scans);
            
        } catch (Exception e) {
            logger.error("❌ Erreur lors de la recherche '{}': {}", q, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(
        summary = "Scans récents",
        description = "Récupère les scans effectués dans les dernières heures"
    )
    @GetMapping("/recent")
    // @PreAuthorize("hasRole('admin') or hasRole('risk_manager')") // Temporairement désactivé
    public ResponseEntity<List<SnmpScanHistoryDto>> getRecentScans(
            @Parameter(description = "Nombre d'heures (défaut: 24)") 
            @RequestParam(defaultValue = "24") int hours) {
        
        logger.info("📅 Récupération des scans des dernières {} heures", hours);
        
        try {
            List<SnmpScanHistoryDto> scans = historyService.getRecentScans(hours);
            logger.info("✅ {} scans récents trouvés", scans.size());
            return ResponseEntity.ok(scans);
            
        } catch (Exception e) {
            logger.error("❌ Erreur lors de la récupération des scans récents: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(
        summary = "Statistiques des scans",
        description = "Récupère les statistiques globales des scans SNMP"
    )
    @GetMapping("/statistics")
    // @PreAuthorize("hasRole('admin') or hasRole('risk_manager')") // Temporairement désactivé
    public ResponseEntity<SnmpScanHistoryService.ScanStatistics> getStatistics() {
        
        logger.info("📊 Récupération des statistiques globales");
        
        try {
            SnmpScanHistoryService.ScanStatistics stats = historyService.getStatistics();
            logger.info("✅ Statistiques calculées: {} scans totaux, {:.1f}% de succès", 
                       stats.getTotalScans(), stats.getSuccessRate());
            return ResponseEntity.ok(stats);
            
        } catch (Exception e) {
            logger.error("❌ Erreur lors du calcul des statistiques: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(
        summary = "Statistiques des scans (version libre)",
        description = "Récupère les statistiques globales des scans SNMP - version sans restriction pour test"
    )
    @GetMapping("/statistics-libre")
    public ResponseEntity<SnmpScanHistoryService.ScanStatistics> getStatisticsLibre() {
        
        logger.info("📊 Récupération des statistiques globales (version libre)");
        
        try {
            SnmpScanHistoryService.ScanStatistics stats = historyService.getStatistics();
            logger.info("✅ Statistiques calculées: {} scans totaux, {:.1f}% de succès", 
                       stats.getTotalScans(), stats.getSuccessRate());
            return ResponseEntity.ok(stats);
            
        } catch (Exception e) {
            logger.error("❌ Erreur lors du calcul des statistiques: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(
        summary = "Supprimer un scan",
        description = "Supprime un scan spécifique de l'historique"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Scan supprimé avec succès"),
        @ApiResponse(responseCode = "404", description = "Scan non trouvé"),
        @ApiResponse(responseCode = "500", description = "Erreur serveur")
    })
    @DeleteMapping("/{scanId}")
    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<Void> deleteScan(
            @Parameter(description = "Identifiant du scan à supprimer") 
            @PathVariable Long scanId) {
        
        logger.info("🗑️ Suppression du scan ID: {}", scanId);
        
        try {
            boolean deleted = historyService.deleteScan(scanId);
            
            if (deleted) {
                logger.info("✅ Scan {} supprimé avec succès", scanId);
                return ResponseEntity.ok().build();
            } else {
                logger.warn("⚠️ Scan {} non trouvé pour suppression", scanId);
                return ResponseEntity.notFound().build();
            }
            
        } catch (Exception e) {
            logger.error("❌ Erreur lors de la suppression du scan {}: {}", scanId, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(
        summary = "Nettoyage automatique",
        description = "Supprime les scans plus anciens que le nombre de jours spécifié"
    )
    @PostMapping("/cleanup")
    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<Void> cleanupOldScans(
            @Parameter(description = "Nombre de jours à conserver") 
            @RequestParam(defaultValue = "30") int daysToKeep) {
        
        logger.info("🧹 Nettoyage des scans antérieurs à {} jours", daysToKeep);
        
        try {
            historyService.cleanupOldScans(daysToKeep);
            logger.info("✅ Nettoyage terminé");
            return ResponseEntity.ok().build();
            
        } catch (Exception e) {
            logger.error("❌ Erreur lors du nettoyage: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(
        summary = "Test d'accès libre",
        description = "Endpoint de test sans restriction d'accès"
    )
    @GetMapping("/test-libre")
    public ResponseEntity<String> testLibre() {
        logger.info("🧪 Test d'accès libre au contrôleur SNMP History");
        return ResponseEntity.ok("✅ Contrôleur SnmpScanHistoryController fonctionne !");
    }
} 