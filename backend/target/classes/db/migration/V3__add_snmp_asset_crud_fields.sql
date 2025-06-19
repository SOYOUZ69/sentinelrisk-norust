-- Migration pour ajouter les champs nécessaires aux opérations CRUD des assets SNMP
-- V3__add_snmp_asset_crud_fields.sql

-- Ajouter les nouvelles colonnes à la table snmp_assets
ALTER TABLE snmp_assets 
ADD COLUMN IF NOT EXISTS name VARCHAR(100) NOT NULL DEFAULT '',
ADD COLUMN IF NOT EXISTS description VARCHAR(500),
ADD COLUMN IF NOT EXISTS location VARCHAR(200),
ADD COLUMN IF NOT EXISTS device_type VARCHAR(50),
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP;

-- Modifier les contraintes existantes
ALTER TABLE snmp_assets 
ALTER COLUMN zabbix_host_id DROP NOT NULL,
ALTER COLUMN ip_address SET NOT NULL,
ADD CONSTRAINT IF NOT EXISTS uk_snmp_assets_ip_address UNIQUE (ip_address);

-- Mettre à jour les enregistrements existants
UPDATE snmp_assets 
SET name = COALESCE(host_name, display_name, 'Asset-' || id::text)
WHERE name = '' OR name IS NULL;

UPDATE snmp_assets 
SET updated_at = COALESCE(last_updated, created_at, NOW())
WHERE updated_at IS NULL;

-- Ajouter des valeurs par défaut pour les nouveaux champs
UPDATE snmp_assets 
SET 
    snmp_version = COALESCE(snmp_version, '2c'),
    snmp_community = COALESCE(snmp_community, 'public'),
    snmp_port = COALESCE(snmp_port, 161),
    status = COALESCE(status, 'active')
WHERE snmp_version IS NULL OR snmp_community IS NULL OR snmp_port IS NULL OR status IS NULL;

-- Commentaires pour documenter les nouveaux champs
COMMENT ON COLUMN snmp_assets.name IS 'Nom utilisé dans l''API CRUD (peut différer de host_name)';
COMMENT ON COLUMN snmp_assets.description IS 'Description de l''asset SNMP';
COMMENT ON COLUMN snmp_assets.location IS 'Emplacement physique de l''asset';
COMMENT ON COLUMN snmp_assets.device_type IS 'Type d''équipement (router, switch, server, printer, other)';
COMMENT ON COLUMN snmp_assets.updated_at IS 'Timestamp de dernière modification via API CRUD'; 