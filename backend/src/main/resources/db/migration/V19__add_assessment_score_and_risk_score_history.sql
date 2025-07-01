-- Migration V19 pour ajouter le score d'assessment et l'historique des scores de risque

-- 1. Ajouter le champ assessment_score à la table assessments
ALTER TABLE assessments ADD COLUMN assessment_score INTEGER CHECK (assessment_score >= 0 AND assessment_score <= 100);

-- 2. Créer la table risk_score_history
CREATE TABLE risk_score_history (
    id BIGSERIAL PRIMARY KEY,
    risk_id BIGINT NOT NULL,
    assessment_id BIGINT,
    old_score INTEGER,
    new_score INTEGER,
    changed_by_user_id VARCHAR(255),
    changed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    -- Contraintes de clés étrangères
    CONSTRAINT fk_risk_score_history_risk 
        FOREIGN KEY (risk_id) REFERENCES risks(id) ON DELETE CASCADE,
    CONSTRAINT fk_risk_score_history_assessment 
        FOREIGN KEY (assessment_id) REFERENCES assessments(id) ON DELETE SET NULL,
    CONSTRAINT fk_risk_score_history_user 
        FOREIGN KEY (changed_by_user_id) REFERENCES users(id) ON DELETE SET NULL,
    
    -- Contraintes de validation
    CONSTRAINT chk_risk_score_history_score_range 
        CHECK (old_score IS NULL OR (old_score >= 0 AND old_score <= 25)),
    CONSTRAINT chk_risk_score_history_new_score_range 
        CHECK (new_score IS NULL OR (new_score >= 0 AND new_score <= 25))
);

-- 3. Index pour optimiser les requêtes
CREATE INDEX idx_risk_score_history_risk_id ON risk_score_history(risk_id);
CREATE INDEX idx_risk_score_history_assessment_id ON risk_score_history(assessment_id);
CREATE INDEX idx_risk_score_history_changed_at ON risk_score_history(changed_at);
CREATE INDEX idx_risk_score_history_user_id ON risk_score_history(changed_by_user_id);

-- 4. Index composite pour les requêtes fréquentes
CREATE INDEX idx_risk_score_history_risk_date ON risk_score_history(risk_id, changed_at DESC);

-- 5. Commentaire sur la table
COMMENT ON TABLE risk_score_history IS 'Historique des changements de score de risque basés sur les assessments';
COMMENT ON COLUMN risk_score_history.old_score IS 'Ancien score du risque (0-25)';
COMMENT ON COLUMN risk_score_history.new_score IS 'Nouveau score du risque (0-25)';
COMMENT ON COLUMN assessments.assessment_score IS 'Score de l''assessment (0-100) - Si >= 70, impact du risque réduit automatiquement'; 