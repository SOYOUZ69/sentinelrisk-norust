-- Ajout des nouvelles colonnes à la table controls
ALTER TABLE controls ADD COLUMN IF NOT EXISTS implementation_date DATE;
ALTER TABLE controls ADD COLUMN IF NOT EXISTS last_tested_date DATE;
ALTER TABLE controls ADD COLUMN IF NOT EXISTS effectiveness_score INTEGER;
ALTER TABLE controls ADD COLUMN IF NOT EXISTS owner VARCHAR(100);
ALTER TABLE controls ADD COLUMN IF NOT EXISTS documentation TEXT; 