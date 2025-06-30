package com.sentinelrisk.backend.repository;

import com.sentinelrisk.backend.model.AppSettings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AppSettingsRepository extends JpaRepository<AppSettings, Long> {
    
    /**
     * Trouve un paramètre par sa clé
     * @param settingKey La clé du paramètre
     * @return Le paramètre s'il existe
     */
    Optional<AppSettings> findBySettingKey(String settingKey);
    
    /**
     * Vérifie si un paramètre existe par sa clé
     * @param settingKey La clé du paramètre
     * @return true si le paramètre existe
     */
    boolean existsBySettingKey(String settingKey);
} 