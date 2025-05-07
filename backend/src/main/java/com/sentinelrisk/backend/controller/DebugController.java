package com.sentinelrisk.backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import lombok.RequiredArgsConstructor;
import java.util.List;
import java.util.Map;

import com.sentinelrisk.backend.service.RiskService;
import com.sentinelrisk.backend.dto.RiskResponse;

/**
 * Contrôleur temporaire pour déboguer des problèmes spécifiques
 * À SUPPRIMER EN PRODUCTION
 */
@RestController
@RequestMapping("/api/debug")
@RequiredArgsConstructor
public class DebugController {

    private final RiskService riskService;

    /**
     * Test l'endpoint de mise à jour des contrôles d'un risque
     */
    @PutMapping("/risks/{id}/controls")
    public ResponseEntity<RiskResponse> testUpdateRiskControls(
            @PathVariable Long id,
            @RequestBody List<Long> controlIds) {
        
        System.out.println("=============== DEBUG CONTROLLER ===============");
        System.out.println("Appel de test pour la mise à jour des contrôles");
        System.out.println("ID du risque: " + id);
        System.out.println("IDs des contrôles: " + controlIds);
        
        try {
            RiskResponse result = riskService.updateRiskControls(id, controlIds);
            System.out.println("Mise à jour réussie");
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            System.err.println("ERREUR LORS DU TEST: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }
    
    /**
     * Endpoint simple pour test de base
     */
    @GetMapping("/ping")
    public ResponseEntity<Map<String, String>> ping() {
        return ResponseEntity.ok(Map.of("message", "Ping successful", "status", "OK"));
    }
} 