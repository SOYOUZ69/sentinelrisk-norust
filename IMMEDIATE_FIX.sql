-- 🚨 CORRECTION IMMÉDIATE - Exécutez ce script dans PostgreSQL MAINTENANT

-- 1. Vérifier la structure actuelle
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'risk_status_history';

-- 2. Supprimer la table problématique
DROP TABLE IF EXISTS risk_status_history CASCADE;

-- 3. Recréer la table avec la BONNE structure
CREATE TABLE risk_status_history (
    id BIGSERIAL PRIMARY KEY,
    risk_id BIGINT NOT NULL,
    previous_status VARCHAR(50),  -- ✅ PAS de NOT NULL
    new_status VARCHAR(50) NOT NULL,
    changed_by_user_id VARCHAR(255),
    change_reason TEXT,
    change_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 4. Ajouter les contraintes de clés étrangères
ALTER TABLE risk_status_history 
ADD CONSTRAINT fk_risk_status_history_risk 
FOREIGN KEY (risk_id) REFERENCES risks(id) ON DELETE CASCADE;

ALTER TABLE risk_status_history 
ADD CONSTRAINT fk_risk_status_history_user 
FOREIGN KEY (changed_by_user_id) REFERENCES users(id) ON DELETE SET NULL;

-- 5. Ajouter les contraintes de validation
ALTER TABLE risk_status_history 
ADD CONSTRAINT chk_risk_status_history_status 
CHECK (new_status IN ('IDENTIFIED', 'IN_ASSESSMENT', 'MITIGATED', 'ACCEPTED', 'CLOSED'));

ALTER TABLE risk_status_history 
ADD CONSTRAINT chk_risk_status_history_previous_status 
CHECK (previous_status IS NULL OR previous_status IN ('IDENTIFIED', 'IN_ASSESSMENT', 'MITIGATED', 'ACCEPTED', 'CLOSED'));

-- 6. Créer les index
CREATE INDEX idx_risk_status_history_risk_id ON risk_status_history(risk_id);
CREATE INDEX idx_risk_status_history_change_date ON risk_status_history(change_date);
CREATE INDEX idx_risk_status_history_user_id ON risk_status_history(changed_by_user_id);
CREATE INDEX idx_risk_status_history_risk_date ON risk_status_history(risk_id, change_date DESC);

-- 7. Vérifier la structure finale
\d risk_status_history;

-- 8. Message de confirmation
SELECT '✅ Table risk_status_history corrigée avec succès!' as status; 