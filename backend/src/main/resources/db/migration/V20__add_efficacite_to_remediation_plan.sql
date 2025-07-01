-- Migration V20: Ajout du champ efficacite à la table remediation_plan
-- Ce champ permet de suivre le taux de réalisation du plan d'action (0-100%)

-- Ajouter la colonne efficacite à la table remediation_plan
ALTER TABLE remediation_plan 
ADD COLUMN efficacite INTEGER NOT NULL DEFAULT 0;

-- Ajouter une contrainte pour s'assurer que l'efficacité est entre 0 et 100
ALTER TABLE remediation_plan 
ADD CONSTRAINT chk_remediation_plan_efficacite 
CHECK (efficacite >= 0 AND efficacite <= 100);

-- Index pour optimiser les requêtes sur l'efficacité
CREATE INDEX idx_remediation_plan_efficacite ON remediation_plan(efficacite);
CREATE INDEX idx_remediation_plan_status_efficacite ON remediation_plan(status, efficacite); 