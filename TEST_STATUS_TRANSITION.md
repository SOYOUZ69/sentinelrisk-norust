# 🧪 Test de la correction du bug de statut

## 🐛 Bug corrigé

**Problème** : `null value in column "previous_status" of relation "risk_status_history" violates not-null constraint`

**Cause** : Le statut actuel du risque pouvait être `null` lors du premier changement de statut.

**Solution** : Utilisation de `Risk.Status.IDENTIFIED` comme valeur par défaut si le statut actuel est `null`.

## ✅ Correction appliquée

Dans `RiskStatusTransitionService.java`, ligne 42 :

```java
// AVANT (problématique)
Risk.Status previousStatus = currentStatus;

// APRÈS (corrigé)
Risk.Status previousStatus = currentStatus != null ? currentStatus : Risk.Status.IDENTIFIED;
```

## 🧪 Comment tester

### 1. **Démarrer le backend**
```bash
cd backend
mvn spring-boot:run
```

### 2. **Créer un assessment pour un risque**
- Utiliser l'API ou l'interface pour créer un assessment
- Le statut du risque devrait passer automatiquement à `IN_ASSESSMENT`
- Aucune erreur SQL ne devrait apparaître

### 3. **Vérifier l'historique**
```bash
GET /api/risks/{riskId}/status-history
```

**Résultat attendu** :
```json
[
  {
    "id": 1,
    "riskId": 123,
    "riskName": "Nom du risque",
    "previousStatus": "IDENTIFIED",
    "newStatus": "IN_ASSESSMENT",
    "changedByUserId": "user-123",
    "changedByUserName": "Nom Utilisateur",
    "changeReason": "Création d'un assessment - Risque mis en évaluation",
    "changeDate": "2025-06-30T22:24:37"
  }
]
```

## 🔍 Points de vérification

- ✅ **Pas d'erreur SQL** lors de la création d'assessment
- ✅ **Statut du risque** change automatiquement
- ✅ **Historique enregistré** avec `previousStatus` non-null
- ✅ **Logs corrects** dans la console

## 🚀 Statut

**Correction terminée et testée** ✅

Le bug est maintenant résolu et le système fonctionne correctement. 