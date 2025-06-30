# 🚨 Guide de résolution rapide - Erreur SQL risk_status_history

## 🐛 Problème actuel
L'erreur persiste : `null value in column "old_status" of relation "risk_status_history" violates not-null constraint`

## ✅ Solution immédiate

### Option 1 : Script SQL manuel (RECOMMANDÉ)
1. **Connectez-vous à votre base de données PostgreSQL**
2. **Exécutez le script** `MANUAL_DB_FIX.sql`
3. **Redémarrez le backend**

### Option 2 : Migration automatique
1. **Arrêtez le backend** s'il tourne
2. **Redémarrez** : `mvn spring-boot:run`
3. **La migration V18** sera appliquée automatiquement

## 🔧 Détails de la correction

### Structure de table corrigée :
```sql
CREATE TABLE risk_status_history (
    id BIGSERIAL PRIMARY KEY,
    risk_id BIGINT NOT NULL,
    previous_status VARCHAR(50),  -- ✅ PAS de NOT NULL
    new_status VARCHAR(50) NOT NULL,
    changed_by_user_id VARCHAR(255),
    change_reason TEXT,
    change_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

### Différences clés :
- ❌ **Avant** : `old_status` avec contrainte `NOT NULL`
- ✅ **Après** : `previous_status` sans contrainte `NOT NULL`

## 🧪 Test de validation

Après la correction, testez :
1. **Créer un assessment** via l'API
2. **Vérifier** qu'aucune erreur SQL ne se produit
3. **Consulter l'historique** : `GET /api/risks/{id}/status-history`

## 📞 Si le problème persiste

1. **Vérifiez la structure** : `\d risk_status_history` dans PostgreSQL
2. **Vérifiez les migrations** : `SELECT * FROM flyway_schema_history;`
3. **Forcez la réapplication** : Supprimez l'entrée V15/V18 de `flyway_schema_history`

---

**Statut** : 🔧 **Correction en cours** 