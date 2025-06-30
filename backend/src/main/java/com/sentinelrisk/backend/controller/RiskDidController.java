package com.sentinelrisk.backend.controller;

import com.sentinelrisk.backend.dto.RiskResponse;
import com.sentinelrisk.backend.service.RiskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Contrôleur pour gérer les identifiants DID des risques
 */
@RestController
@RequestMapping("/api/risks/did")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class RiskDidController {

    private final RiskService riskService;

    /**
     * Récupère un risque par son identifiant DID
     * @param did L'identifiant DID du risque
     * @return Le risque correspondant
     */
    @GetMapping("/{did}")
    public ResponseEntity<RiskResponse> getRiskByDid(@PathVariable String did) {
        try {
            RiskResponse risk = riskService.getRiskByDid(did);
            return ResponseEntity.ok(risk);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Attribue des identifiants DID aux risques qui n'en ont pas encore
     * @return Le nombre de risques mis à jour
     */
    @PostMapping("/assign-missing")
    public ResponseEntity<Map<String, Object>> assignMissingDids() {
        try {
            int updatedCount = riskService.assignMissingDids();
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Identifiants DID attribués avec succès");
            response.put("updatedCount", updatedCount);
            response.put("success", true);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Erreur lors de l'attribution des identifiants DID: " + e.getMessage());
            response.put("success", false);
            
            return ResponseEntity.internalServerError().body(response);
        }
    }

    /**
     * Vérifie si un identifiant DID existe
     * @param did L'identifiant DID à vérifier
     * @return true si le DID existe, false sinon
     */
    @GetMapping("/{did}/exists")
    public ResponseEntity<Map<String, Object>> checkDidExists(@PathVariable String did) {
        try {
            riskService.getRiskByDid(did);
            
            Map<String, Object> response = new HashMap<>();
            response.put("exists", true);
            response.put("did", did);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("exists", false);
            response.put("did", did);
            
            return ResponseEntity.ok(response);
        }
    }

    /**
     * Détecte les doublons existants dans la base de données
     * @return Liste des groupes de risques considérés comme doublons
     */
    @GetMapping("/duplicates")
    public ResponseEntity<Map<String, Object>> findDuplicates() {
        try {
            List<Map<String, Object>> duplicates = riskService.findDuplicateRisks();
            
            Map<String, Object> response = new HashMap<>();
            response.put("duplicates", duplicates);
            response.put("count", duplicates.size());
            response.put("message", "Analyse des doublons terminée");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Erreur lors de la détection des doublons: " + e.getMessage());
            response.put("success", false);
            
            return ResponseEntity.internalServerError().body(response);
        }
    }
} 