-- Migration V7: Création de la table snmp_scan_targets pour la configuration des scans automatiques
-- Date: 2025-06-26
-- Description: Table pour stocker les assets sélectionnés pour les scans SNMP automatiques

CREATE TABLE snmp_scan_targets (
    id BIGSERIAL PRIMARY KEY,
    zabbix_host_id VARCHAR(255) NOT NULL UNIQUE,
    hostname VARCHAR(255) NOT NULL,
    display_name VARCHAR(255),
    ip_address VARCHAR(45),
    snmp_port INTEGER DEFAULT 161,
    description TEXT,
    enabled BOOLEAN NOT NULL DEFAULT FALSE,
    priority INTEGER DEFAULT 3,
    last_sync TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    configured_by VARCHAR(255)
);

-- Index pour optimiser les requêtes
CREATE INDEX idx_snmp_scan_targets_enabled ON snmp_scan_targets(enabled);
CREATE INDEX idx_snmp_scan_targets_zabbix_host_id ON snmp_scan_targets(zabbix_host_id);
CREATE INDEX idx_snmp_scan_targets_priority ON snmp_scan_targets(priority);

-- Commentaires sur les colonnes
COMMENT ON TABLE snmp_scan_targets IS 'Assets configurés pour les scans SNMP automatiques via Zabbix';
COMMENT ON COLUMN snmp_scan_targets.zabbix_host_id IS 'ID unique de l''hôte dans Zabbix';
COMMENT ON COLUMN snmp_scan_targets.hostname IS 'Nom de l''hôte dans Zabbix';
COMMENT ON COLUMN snmp_scan_targets.display_name IS 'Nom d''affichage de l''asset';
COMMENT ON COLUMN snmp_scan_targets.ip_address IS 'Adresse IP de l''asset';
COMMENT ON COLUMN snmp_scan_targets.snmp_port IS 'Port SNMP (par défaut 161)';
COMMENT ON COLUMN snmp_scan_targets.enabled IS 'Statut d''activation pour les scans automatiques';
COMMENT ON COLUMN snmp_scan_targets.priority IS 'Priorité de scan (1=haute, 5=basse)';
COMMENT ON COLUMN snmp_scan_targets.last_sync IS 'Dernière synchronisation avec Zabbix';
COMMENT ON COLUMN snmp_scan_targets.configured_by IS 'Utilisateur qui a configuré cet asset'; 