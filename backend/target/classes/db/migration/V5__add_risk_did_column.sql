-- Migration pour ajouter la colonne DID aux risques
-- Format: RXXXX où R est fixe et XXXX est un nombre incrémental

-- Ajouter la colonne DID
ALTER TABLE risks ADD COLUMN did VARCHAR(10) UNIQUE;

-- Créer un index sur la colonne DID pour optimiser les recherches
CREATE INDEX idx_risks_did ON risks(did);

-- Commentaire sur la colonne
COMMENT ON COLUMN risks.did IS 'Identifiant unique DID au format RXXXX pour les risques'; 