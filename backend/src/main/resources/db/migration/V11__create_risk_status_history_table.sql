-- Migration pour créer la table risk_status_history
CREATE TABLE risk_status_history (
    id BIGSERIAL PRIMARY KEY,
    risk_id BIGINT NOT NULL,
    previous_status VARCHAR(20),
    new_status VARCHAR(20) NOT NULL,
    transition_reason VARCHAR(500),
    changed_by_user_id VARCHAR(255),
    changed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    -- Contraintes de clés étrangères
    CONSTRAINT fk_risk_status_history_risk 
        FOREIGN KEY (risk_id) REFERENCES risks(id) ON DELETE CASCADE,
    CONSTRAINT fk_risk_status_history_user 
        FOREIGN KEY (changed_by_user_id) REFERENCES users(id) ON DELETE SET NULL,
    
    -- Contraintes de validation
    CONSTRAINT chk_risk_status_history_new_status 
        CHECK (new_status IN ('IDENTIFIED', 'IN_ASSESSMENT', 'MITIGATED', 'ACCEPTED', 'CLOSED')),
    CONSTRAINT chk_risk_status_history_previous_status 
        CHECK (previous_status IS NULL OR previous_status IN ('IDENTIFIED', 'IN_ASSESSMENT', 'MITIGATED', 'ACCEPTED', 'CLOSED'))
);

-- Index pour optimiser les requêtes
CREATE INDEX idx_risk_status_history_risk_id ON risk_status_history(risk_id);
CREATE INDEX idx_risk_status_history_changed_at ON risk_status_history(changed_at DESC);
CREATE INDEX idx_risk_status_history_user_id ON risk_status_history(changed_by_user_id);

-- Commentaires pour la documentation
COMMENT ON TABLE risk_status_history IS 'Historique des changements de statut des risques';
COMMENT ON COLUMN risk_status_history.risk_id IS 'ID du risque concerné';
COMMENT ON COLUMN risk_status_history.previous_status IS 'Statut précédent (NULL pour le premier statut)';
COMMENT ON COLUMN risk_status_history.new_status IS 'Nouveau statut';
COMMENT ON COLUMN risk_status_history.transition_reason IS 'Raison du changement de statut';
COMMENT ON COLUMN risk_status_history.changed_by_user_id IS 'ID de l''utilisateur qui a effectué le changement';
COMMENT ON COLUMN risk_status_history.changed_at IS 'Date et heure du changement'; 