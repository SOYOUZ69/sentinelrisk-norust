-- Migration pour ajouter les nouveaux statuts INFORMATION et UNAVAILABLE
-- à la contrainte CHECK de la table snmp_scan_history_result

-- Supprimer l'ancienne contrainte
ALTER TABLE snmp_scan_history_result 
DROP CONSTRAINT IF EXISTS snmp_scan_history_result_status_check;

-- Créer la nouvelle contrainte avec tous les statuts
ALTER TABLE snmp_scan_history_result 
ADD CONSTRAINT snmp_scan_history_result_status_check 
CHECK (status IN ('NORMAL', 'WARNING', 'CRITICAL', 'ERROR', 'INFORMATION', 'UNAVAILABLE'));

-- Commentaire sur la migration
COMMENT ON CONSTRAINT snmp_scan_history_result_status_check ON snmp_scan_history_result 
IS 'Contrainte CHECK mise à jour pour inclure les nouveaux statuts INFORMATION et UNAVAILABLE'; 