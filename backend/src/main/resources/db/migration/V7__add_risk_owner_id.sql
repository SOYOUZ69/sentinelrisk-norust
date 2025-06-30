-- Migration pour ajouter le champ risk_owner_id obligatoire
-- Ce champ associe chaque risque à un utilisateur responsable

-- Ajouter la colonne risk_owner_id (nullable d'abord)
ALTER TABLE risks ADD COLUMN IF NOT EXISTS risk_owner_id VARCHAR(255);

-- Créer l'index pour optimiser les jointures
CREATE INDEX IF NOT EXISTS idx_risks_risk_owner_id ON risks(risk_owner_id);

-- Assigner un utilisateur par défaut aux risques existants (si nécessaire)
-- Note: Cette requête ne s'exécute que s'il y a des risques sans owner et des utilisateurs existants
UPDATE risks 
SET risk_owner_id = (SELECT id FROM users LIMIT 1)
WHERE risk_owner_id IS NULL 
AND EXISTS (SELECT 1 FROM users);

-- Ajouter la contrainte de clé étrangère
ALTER TABLE risks 
ADD CONSTRAINT IF NOT EXISTS fk_risks_risk_owner 
FOREIGN KEY (risk_owner_id) REFERENCES users(id);

-- Rendre la colonne obligatoire seulement si tous les risques ont un owner
-- Si des risques n'ont pas d'owner, on garde la colonne nullable pour l'instant
DO $$
BEGIN
    -- Vérifier si tous les risques ont un owner
    IF NOT EXISTS (SELECT 1 FROM risks WHERE risk_owner_id IS NULL) THEN
        ALTER TABLE risks ALTER COLUMN risk_owner_id SET NOT NULL;
    END IF;
END $$; 