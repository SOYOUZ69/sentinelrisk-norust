package com.sentinelrisk.backend.service;

import com.sentinelrisk.backend.model.AppSettings;
import com.sentinelrisk.backend.repository.AppSettingsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class AppSettingsService {

    private final AppSettingsRepository appSettingsRepository;
    
    private static final String RISK_ACCEPTANCE_THRESHOLD_KEY = "risk_acceptance_threshold";
    private static final int DEFAULT_THRESHOLD = 15;

    /**
     * Récupère le seuil d'acceptation des risques
     * @return Le seuil d'acceptation (par défaut 15 si non configuré)
     */
    @Transactional(readOnly = true)
    public int getRiskAcceptanceThreshold() {
        Optional<AppSettings> setting = appSettingsRepository.findBySettingKey(RISK_ACCEPTANCE_THRESHOLD_KEY);
        
        if (setting.isPresent()) {
            try {
                return Integer.parseInt(setting.get().getSettingValue());
            } catch (NumberFormatException e) {
                // Si la valeur n'est pas un nombre valide, retourner la valeur par défaut
                return DEFAULT_THRESHOLD;
            }
        }
        
        // Si le paramètre n'existe pas, le créer avec la valeur par défaut
        createDefaultThreshold();
        return DEFAULT_THRESHOLD;
    }

    /**
     * Met à jour le seuil d'acceptation des risques
     * @param threshold Le nouveau seuil
     * @return Le paramètre mis à jour
     */
    public AppSettings updateRiskAcceptanceThreshold(int threshold) {
        if (threshold < 0) {
            throw new IllegalArgumentException("Le seuil d'acceptation ne peut pas être négatif");
        }
        
        Optional<AppSettings> existingSetting = appSettingsRepository.findBySettingKey(RISK_ACCEPTANCE_THRESHOLD_KEY);
        
        AppSettings setting;
        if (existingSetting.isPresent()) {
            setting = existingSetting.get();
            setting.setSettingValue(String.valueOf(threshold));
        } else {
            setting = new AppSettings();
            setting.setSettingKey(RISK_ACCEPTANCE_THRESHOLD_KEY);
            setting.setSettingValue(String.valueOf(threshold));
            setting.setDescription("Seuil d'acceptation des risques - Score maximum autorisé pour la création d'un risque");
        }
        
        return appSettingsRepository.save(setting);
    }

    /**
     * Crée le paramètre de seuil par défaut s'il n'existe pas
     */
    private void createDefaultThreshold() {
        if (!appSettingsRepository.existsBySettingKey(RISK_ACCEPTANCE_THRESHOLD_KEY)) {
            AppSettings setting = new AppSettings();
            setting.setSettingKey(RISK_ACCEPTANCE_THRESHOLD_KEY);
            setting.setSettingValue(String.valueOf(DEFAULT_THRESHOLD));
            setting.setDescription("Seuil d'acceptation des risques - Score maximum autorisé pour la création d'un risque");
            appSettingsRepository.save(setting);
        }
    }

    /**
     * Récupère tous les paramètres de configuration
     * @return Tous les paramètres
     */
    @Transactional(readOnly = true)
    public java.util.List<AppSettings> getAllSettings() {
        return appSettingsRepository.findAll();
    }
} 