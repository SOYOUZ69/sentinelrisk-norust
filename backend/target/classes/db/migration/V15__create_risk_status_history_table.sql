-- Migration pour supprimer et recréer la table risk_status_history
-- Cette migration résout les problèmes d'incohérence dus aux backups/restaurations

-- Supprimer la table existante si elle existe (avec toutes ses contraintes et index)
DROP TABLE IF EXISTS risk_status_history CASCADE;

-- Recréer la table avec la structure correcte
CREATE TABLE risk_status_history (
    id BIGSERIAL PRIMARY KEY,
    risk_id BIGINT NOT NULL,
    previous_status VARCHAR(50),
    new_status VARCHAR(50) NOT NULL,
    changed_by_user_id VARCHAR(255),
    change_reason TEXT,
    change_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    -- Contraintes de clés étrangères
    CONSTRAINT fk_risk_status_history_risk 
        FOREIGN KEY (risk_id) REFERENCES risks(id) ON DELETE CASCADE,
    CONSTRAINT fk_risk_status_history_user 
        FOREIGN KEY (changed_by_user_id) REFERENCES users(id) ON DELETE SET NULL,
    
    -- Contraintes de validation
    CONSTRAINT chk_risk_status_history_status 
        CHECK (new_status IN ('IDENTIFIED', 'IN_ASSESSMENT', 'MITIGATED', 'ACCEPTED', 'CLOSED')),
    CONSTRAINT chk_risk_status_history_previous_status 
        CHECK (previous_status IS NULL OR previous_status IN ('IDENTIFIED', 'IN_ASSESSMENT', 'MITIGATED', 'ACCEPTED', 'CLOSED'))
);

-- Index pour optimiser les requêtes
CREATE INDEX idx_risk_status_history_risk_id ON risk_status_history(risk_id);
CREATE INDEX idx_risk_status_history_change_date ON risk_status_history(change_date);
CREATE INDEX idx_risk_status_history_user_id ON risk_status_history(changed_by_user_id);

-- Index composite pour les requêtes fréquentes
CREATE INDEX idx_risk_status_history_risk_date ON risk_status_history(risk_id, change_date DESC); 