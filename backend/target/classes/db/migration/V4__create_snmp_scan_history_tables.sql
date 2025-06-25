-- Migration V4: Création des tables pour l'historique des scans SNMP manuels

-- Table principale pour l'historique des scans
CREATE TABLE snmp_scan_history (
    id BIGSERIAL PRIMARY KEY,
    target_ip VARCHAR(45) NOT NULL,
    target_port INTEGER NOT NULL DEFAULT 161,
    community_string VARCHAR(255) NOT NULL DEFAULT 'public',
    snmp_version VARCHAR(10) NOT NULL DEFAULT '2c',
    scan_success BOOLEAN NOT NULL DEFAULT FALSE,
    error_message TEXT,
    duration_ms BIGINT NOT NULL DEFAULT 0,
    timeout_ms INTEGER NOT NULL DEFAULT 5000,
    retries INTEGER NOT NULL DEFAULT 3,
    oids_count INTEGER NOT NULL DEFAULT 0,
    successful_oids_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    -- Index pour les requêtes courantes
    INDEX idx_snmp_history_target_ip (target_ip),
    INDEX idx_snmp_history_target_ip_port (target_ip, target_port),
    INDEX idx_snmp_history_created_at (created_at),
    INDEX idx_snmp_history_success (scan_success),
    INDEX idx_snmp_history_created_success (created_at, scan_success)
);

-- Table pour les résultats détaillés de chaque OID
CREATE TABLE snmp_scan_history_result (
    id BIGSERIAL PRIMARY KEY,
    scan_history_id BIGINT NOT NULL,
    oid VARCHAR(500) NOT NULL,
    value TEXT,
    snmp_type VARCHAR(100) NOT NULL,
    success BOOLEAN NOT NULL DEFAULT FALSE,
    error_message TEXT,
    oid_name VARCHAR(500),
    oid_description TEXT,
    oid_category VARCHAR(100),
    formatted_value VARCHAR(1000),
    interpretation VARCHAR(1000),
    status VARCHAR(20) DEFAULT 'NORMAL',
    
    -- Clé étrangère vers la table principale
    FOREIGN KEY (scan_history_id) REFERENCES snmp_scan_history(id) ON DELETE CASCADE,
    
    -- Index pour les requêtes par scan
    INDEX idx_snmp_result_scan_history (scan_history_id),
    INDEX idx_snmp_result_oid (oid),
    INDEX idx_snmp_result_success (success),
    INDEX idx_snmp_result_status (status)
);

-- Commentaires pour documentation
COMMENT ON TABLE snmp_scan_history IS 'Historique des scans SNMP manuels effectués';
COMMENT ON COLUMN snmp_scan_history.target_ip IS 'Adresse IP de la cible scannée';
COMMENT ON COLUMN snmp_scan_history.target_port IS 'Port SNMP utilisé (généralement 161)';
COMMENT ON COLUMN snmp_scan_history.community_string IS 'Communauté SNMP utilisée pour l''authentification';
COMMENT ON COLUMN snmp_scan_history.snmp_version IS 'Version SNMP utilisée (1, 2c, 3)';
COMMENT ON COLUMN snmp_scan_history.scan_success IS 'Indique si le scan global a réussi';
COMMENT ON COLUMN snmp_scan_history.duration_ms IS 'Durée totale du scan en millisecondes';
COMMENT ON COLUMN snmp_scan_history.oids_count IS 'Nombre total d''OIDs scannés';
COMMENT ON COLUMN snmp_scan_history.successful_oids_count IS 'Nombre d''OIDs récupérés avec succès';

COMMENT ON TABLE snmp_scan_history_result IS 'Résultats détaillés pour chaque OID d''un scan SNMP';
COMMENT ON COLUMN snmp_scan_history_result.oid IS 'Identifiant OID SNMP scanné';
COMMENT ON COLUMN snmp_scan_history_result.value IS 'Valeur brute retournée par SNMP';
COMMENT ON COLUMN snmp_scan_history_result.snmp_type IS 'Type SNMP de la valeur (Integer, OctetString, etc.)';
COMMENT ON COLUMN snmp_scan_history_result.formatted_value IS 'Valeur formatée pour l''affichage utilisateur';
COMMENT ON COLUMN snmp_scan_history_result.interpretation IS 'Interprétation métier de la valeur';
COMMENT ON COLUMN snmp_scan_history_result.status IS 'Statut de santé (NORMAL, WARNING, CRITICAL, ERROR)'; 