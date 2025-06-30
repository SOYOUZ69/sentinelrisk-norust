package com.sentinelrisk.backend.controller;

import com.sentinelrisk.backend.model.AppSettings;
import com.sentinelrisk.backend.service.AppSettingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Contrôleur pour gérer les paramètres de configuration de l'application
 */
@RestController
@RequestMapping("/api/settings")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AppSettingsController {

    private final AppSettingsService appSettingsService;

    /**
     * Récupère le seuil d'acceptation des risques
     * @return Le seuil d'acceptation actuel
     */
    @GetMapping("/risk-acceptance-threshold")
    public ResponseEntity<Map<String, Object>> getRiskAcceptanceThreshold() {
        try {
            int threshold = appSettingsService.getRiskAcceptanceThreshold();
            
            Map<String, Object> response = new HashMap<>();
            response.put("threshold", threshold);
            response.put("message", "Seuil d'acceptation récupéré avec succès");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Erreur lors de la récupération du seuil: " + e.getMessage());
            response.put("success", false);
            
            return ResponseEntity.internalServerError().body(response);
        }
    }

    /**
     * Met à jour le seuil d'acceptation des risques
     * @param request Contient le nouveau seuil
     * @return Le paramètre mis à jour
     */
    @PutMapping("/risk-acceptance-threshold")
    public ResponseEntity<Map<String, Object>> updateRiskAcceptanceThreshold(@RequestBody Map<String, Integer> request) {
        try {
            Integer threshold = request.get("threshold");
            if (threshold == null) {
                throw new IllegalArgumentException("Le seuil est requis");
            }
            
            AppSettings updatedSetting = appSettingsService.updateRiskAcceptanceThreshold(threshold);
            
            Map<String, Object> response = new HashMap<>();
            response.put("threshold", threshold);
            response.put("message", "Seuil d'acceptation mis à jour avec succès");
            response.put("updatedAt", updatedSetting.getUpdatedAt());
            
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            response.put("success", false);
            
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Erreur lors de la mise à jour du seuil: " + e.getMessage());
            response.put("success", false);
            
            return ResponseEntity.internalServerError().body(response);
        }
    }

    /**
     * Récupère tous les paramètres de configuration
     * @return Tous les paramètres
     */
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllSettings() {
        try {
            List<AppSettings> settings = appSettingsService.getAllSettings();
            
            Map<String, Object> response = new HashMap<>();
            response.put("settings", settings);
            response.put("count", settings.size());
            response.put("message", "Paramètres récupérés avec succès");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Erreur lors de la récupération des paramètres: " + e.getMessage());
            response.put("success", false);
            
            return ResponseEntity.internalServerError().body(response);
        }
    }
} 