-- Migration pour créer la table control_effectiveness_history
-- Cette table historise les changements d'efficacité des contrôles et leur impact sur les risques

CREATE TABLE control_effectiveness_history (
    id BIGSERIAL PRIMARY KEY,
    control_id BIGINT NOT NULL,
    risk_id BIGINT NOT NULL,
    old_score INTEGER,
    new_score INTEGER,
    old_probability_level VARCHAR(20),
    new_probability_level VARCHAR(20),
    old_impact_level VARCHAR(20),
    new_impact_level VARCHAR(20),
    control_type VARCHAR(20) NOT NULL,
    changed_by_user_id VARCHAR(255),
    changed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    -- Contraintes de clés étrangères
    CONSTRAINT fk_control_effectiveness_history_control 
        FOREIGN KEY (control_id) REFERENCES controls(id) ON DELETE CASCADE,
    CONSTRAINT fk_control_effectiveness_history_risk 
        FOREIGN KEY (risk_id) REFERENCES risks(id) ON DELETE CASCADE,
    CONSTRAINT fk_control_effectiveness_history_user 
        FOREIGN KEY (changed_by_user_id) REFERENCES users(id) ON DELETE SET NULL,
    
    -- Contraintes de validation
    CONSTRAINT chk_control_effectiveness_history_score 
        CHECK (old_score IS NULL OR (old_score >= 0 AND old_score <= 100)),
    CONSTRAINT chk_control_effectiveness_history_new_score 
        CHECK (new_score IS NULL OR (new_score >= 0 AND new_score <= 100)),
    CONSTRAINT chk_control_effectiveness_history_control_type 
        CHECK (control_type IN ('PREVENTIVE', 'DETECTIVE', 'CORRECTIVE', 'COMPENSATING'))
);

-- Index pour optimiser les requêtes
CREATE INDEX idx_control_effectiveness_history_control_id ON control_effectiveness_history(control_id);
CREATE INDEX idx_control_effectiveness_history_risk_id ON control_effectiveness_history(risk_id);
CREATE INDEX idx_control_effectiveness_history_changed_at ON control_effectiveness_history(changed_at DESC);
CREATE INDEX idx_control_effectiveness_history_user_id ON control_effectiveness_history(changed_by_user_id);

-- Commentaires pour documenter la table
COMMENT ON TABLE control_effectiveness_history IS 'Historique des changements d''efficacité des contrôles et leur impact sur les risques';
COMMENT ON COLUMN control_effectiveness_history.control_id IS 'ID du contrôle concerné';
COMMENT ON COLUMN control_effectiveness_history.risk_id IS 'ID du risque impacté';
COMMENT ON COLUMN control_effectiveness_history.old_score IS 'Ancien score d''efficacité du contrôle';
COMMENT ON COLUMN control_effectiveness_history.new_score IS 'Nouveau score d''efficacité du contrôle';
COMMENT ON COLUMN control_effectiveness_history.old_probability_level IS 'Ancien niveau de probabilité du risque';
COMMENT ON COLUMN control_effectiveness_history.new_probability_level IS 'Nouveau niveau de probabilité du risque';
COMMENT ON COLUMN control_effectiveness_history.old_impact_level IS 'Ancien niveau d''impact du risque';
COMMENT ON COLUMN control_effectiveness_history.new_impact_level IS 'Nouveau niveau d''impact du risque';
COMMENT ON COLUMN control_effectiveness_history.control_type IS 'Type du contrôle (PREVENTIVE/CORRECTIVE)';
COMMENT ON COLUMN control_effectiveness_history.changed_by_user_id IS 'ID de l''utilisateur qui a effectué le changement';
COMMENT ON COLUMN control_effectiveness_history.changed_at IS 'Date et heure du changement'; 