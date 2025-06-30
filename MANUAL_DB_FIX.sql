-- Script SQL manuel pour corriger la table risk_status_history
-- Exécutez ce script directement dans votre base de données PostgreSQL

-- 1. Supprimer complètement la table problématique
DROP TABLE IF EXISTS risk_status_history CASCADE;

-- 2. Recréer la table avec la structure correcte
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

-- 3. Créer les index pour optimiser les performances
CREATE INDEX idx_risk_status_history_risk_id ON risk_status_history(risk_id);
CREATE INDEX idx_risk_status_history_change_date ON risk_status_history(change_date);
CREATE INDEX idx_risk_status_history_user_id ON risk_status_history(changed_by_user_id);
CREATE INDEX idx_risk_status_history_risk_date ON risk_status_history(risk_id, change_date DESC);

-- 4. Vérifier la structure de la table
\d risk_status_history;

-- 5. Message de confirmation
SELECT 'Table risk_status_history recréée avec succès!' as status; 