-- Migration V22: Création de la table risk_impact_history
-- Cette table trace chaque modification du niveau d'impact d'un risque causée par un plan d'action

CREATE TABLE risk_impact_history (
    id BIGSERIAL PRIMARY KEY,
    risk_id BIGINT NOT NULL,
    plan_id BIGINT NOT NULL,
    old_impact_level VARCHAR(50),
    new_impact_level VARCHAR(50) NOT NULL,
    plan_efficacite INTEGER,
    plan_status VARCHAR(50),
    changed_by_user_id VARCHAR(255),
    changed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    change_reason TEXT,
    
    -- Contraintes de clés étrangères
    CONSTRAINT fk_risk_impact_history_risk 
        FOREIGN KEY (risk_id) REFERENCES risks(id) ON DELETE CASCADE,
    CONSTRAINT fk_risk_impact_history_plan 
        FOREIGN KEY (plan_id) REFERENCES remediation_plan(id) ON DELETE CASCADE,
    CONSTRAINT fk_risk_impact_history_user 
        FOREIGN KEY (changed_by_user_id) REFERENCES users(id) ON DELETE SET NULL,
    
    -- Contraintes de validation
    CONSTRAINT chk_risk_impact_history_old_impact_level 
        CHECK (old_impact_level IS NULL OR old_impact_level IN ('NEGLIGIBLE', 'MINOR', 'MODERATE', 'MAJOR', 'SEVERE')),
    CONSTRAINT chk_risk_impact_history_new_impact_level 
        CHECK (new_impact_level IN ('NEGLIGIBLE', 'MINOR', 'MODERATE', 'MAJOR', 'SEVERE')),
    CONSTRAINT chk_risk_impact_history_plan_efficacite 
        CHECK (plan_efficacite IS NULL OR (plan_efficacite >= 0 AND plan_efficacite <= 100)),
    CONSTRAINT chk_risk_impact_history_plan_status 
        CHECK (plan_status IS NULL OR plan_status IN ('TODO', 'IN_PROGRESS', 'DONE'))
);

-- Index pour optimiser les requêtes
CREATE INDEX idx_risk_impact_history_risk_id ON risk_impact_history(risk_id);
CREATE INDEX idx_risk_impact_history_plan_id ON risk_impact_history(plan_id);
CREATE INDEX idx_risk_impact_history_changed_at ON risk_impact_history(changed_at);
CREATE INDEX idx_risk_impact_history_user_id ON risk_impact_history(changed_by_user_id);

-- Index composite pour les requêtes fréquentes
CREATE INDEX idx_risk_impact_history_risk_date ON risk_impact_history(risk_id, changed_at DESC);
CREATE INDEX idx_risk_impact_history_plan_date ON risk_impact_history(plan_id, changed_at DESC); 