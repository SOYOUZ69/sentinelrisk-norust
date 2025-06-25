-- Migration V5: Ajouter la colonne username à la table snmp_scan_history
-- Cette colonne permet de tracer quel utilisateur a effectué chaque scan SNMP manuel

-- Ajouter la colonne username
ALTER TABLE snmp_scan_history 
ADD COLUMN username VARCHAR(255);

-- Créer un index sur username pour améliorer les performances des requêtes de recherche
CREATE INDEX idx_snmp_scan_history_username ON snmp_scan_history(username);

-- Commentaire de la table
COMMENT ON COLUMN snmp_scan_history.username IS 'Nom d''utilisateur qui a effectué le scan SNMP manuel'; 