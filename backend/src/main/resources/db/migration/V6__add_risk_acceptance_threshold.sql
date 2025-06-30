-- Migration pour ajouter la configuration du seuil d'acceptation des risques

-- Table de configuration globale
CREATE TABLE IF NOT EXISTS app_settings (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    description VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insérer le seuil d'acceptation par défaut (score de 15)
INSERT INTO app_settings (setting_key, setting_value, description) 
VALUES ('risk_acceptance_threshold', '15', 'Seuil d''acceptation des risques - Score maximum autorisé pour la création d''un risque')
ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value);

-- Index pour optimiser les recherches
CREATE INDEX idx_app_settings_key ON app_settings(setting_key); 