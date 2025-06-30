package com.sentinelrisk.backend.controller;

import com.sentinelrisk.backend.service.RiskMigrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Contrôleur pour gérer les migrations des risques
 */
@RestController
@RequestMapping("/api/risks/migration")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class RiskMigrationController {

    private final RiskMigrationService riskMigrationService;

    /**
     * Attribue des identifiants DID aux risques qui n'en ont pas encore
     * @return Le nombre de risques mis à jour
     */
    @PostMapping("/assign-dids")
    public ResponseEntity<Map<String, Object>> assignMissingDids() {
        try {
            int updatedCount = riskMigrationService.assignMissingDids();
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Migration des identifiants DID terminée");
            response.put("updatedCount", updatedCount);
            response.put("success", true);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Erreur lors de la migration: " + e.getMessage());
            response.put("success", false);
            
            return ResponseEntity.internalServerError().body(response);
        }
    }

    /**
     * Vérifie l'intégrité des identifiants DID
     * @return true si tous les risques ont un DID valide
     */
    @GetMapping("/verify-integrity")
    public ResponseEntity<Map<String, Object>> verifyDidIntegrity() {
        try {
            boolean integrityOk = riskMigrationService.verifyDidIntegrity();
            
            Map<String, Object> response = new HashMap<>();
            response.put("integrityOk", integrityOk);
            response.put("message", integrityOk ? 
                "Tous les risques ont un identifiant DID valide" : 
                "Certains risques n'ont pas d'identifiant DID");
            response.put("success", true);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Erreur lors de la vérification: " + e.getMessage());
            response.put("success", false);
            
            return ResponseEntity.internalServerError().body(response);
        }
    }
} 