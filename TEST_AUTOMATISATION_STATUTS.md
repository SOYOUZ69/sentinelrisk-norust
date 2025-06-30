# 🧪 Test de l'Automatisation des Statuts des Risques

## 📋 Prérequis

1. Backend démarré sur `http://localhost:8080`
2. Token d'authentification valide
3. Au moins un risque existant dans la base de données

## 🔄 Exemple de Workflow Complet

### 1. Récupérer un risque existant
```bash
curl -X GET "http://localhost:8080/api/risks" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 2. Déclencher l'évaluation (IDENTIFIED → IN_ASSESSMENT)
```bash
curl -X POST "http://localhost:8080/api/risks/1/trigger-assessment" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json"
```

**Réponse attendue :**
```json
{
  "id": 1,
  "name": "Risque de sécurité",
  "status": "IN_ASSESSMENT",
  "did": "RISK001",
  "riskScore": 15,
  "impactLevel": "MODERATE",
  "probabilityLevel": "POSSIBLE"
}
```

### 3. Marquer comme évalué (IN_ASSESSMENT → MITIGATED)
```bash
curl -X POST "http://localhost:8080/api/risks/1/mark-assessed" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json"
```

### 4. Marquer comme accepté (MITIGATED → ACCEPTED)
```bash
curl -X POST "http://localhost:8080/api/risks/1/mark-accepted" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json"
```

### 5. Fermer le risque (ACCEPTED → CLOSED)
```bash
curl -X POST "http://localhost:8080/api/risks/1/close" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json"
```

### 6. Consulter l'historique des statuts
```bash
curl -X GET "http://localhost:8080/api/risks/1/status-history" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Réponse attendue :**
```json
[
  {
    "id": 4,
    "riskId": 1,
    "previousStatus": "ACCEPTED",
    "newStatus": "CLOSED",
    "transitionReason": "Risque fermé",
    "changedByUser": "John Doe",
    "changedAt": "2025-06-30T20:30:00"
  },
  {
    "id": 3,
    "riskId": 1,
    "previousStatus": "MITIGATED",
    "newStatus": "ACCEPTED",
    "transitionReason": "Risque accepté",
    "changedByUser": "John Doe",
    "changedAt": "2025-06-30T20:25:00"
  },
  {
    "id": 2,
    "riskId": 1,
    "previousStatus": "IN_ASSESSMENT",
    "newStatus": "MITIGATED",
    "transitionReason": "Risque évalué",
    "changedByUser": "John Doe",
    "changedAt": "2025-06-30T20:20:00"
  },
  {
    "id": 1,
    "riskId": 1,
    "previousStatus": "IDENTIFIED",
    "newStatus": "IN_ASSESSMENT",
    "transitionReason": "Évaluation déclenchée",
    "changedByUser": "John Doe",
    "changedAt": "2025-06-30T20:15:00"
  }
]
```

## 🚫 Tests de Validation

### Test 1 : Transition invalide
```bash
# Essayer de passer de CLOSED vers IN_ASSESSMENT (impossible)
curl -X POST "http://localhost:8080/api/risks/1/trigger-assessment" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Réponse attendue :**
```json
{
  "error": "Transition invalide de CLOSED vers IN_ASSESSMENT"
}
```

### Test 2 : Risque inexistant
```bash
curl -X POST "http://localhost:8080/api/risks/999/trigger-assessment" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Réponse attendue :**
```json
{
  "error": "Risque non trouvé avec l'ID: 999"
}
```

## 🎯 Points de Validation

✅ **Transitions automatiques** : Chaque action déclenche la transition appropriée  
✅ **Historique complet** : Tous les changements sont tracés avec utilisateur et timestamp  
✅ **Validation des transitions** : Impossible de faire des transitions invalides  
✅ **Gestion d'erreurs** : Messages d'erreur clairs pour les cas invalides  
✅ **Sécurité** : Authentification requise pour toutes les actions  

## 🔧 Configuration Frontend

Pour intégrer les composants dans une page de détail de risque :

```html
<!-- Actions de statut -->
<app-risk-status-actions 
  [riskId]="risk.id" 
  [currentStatus]="risk.status"
  (statusChanged)="loadRisk()">
</app-risk-status-actions>

<!-- Historique des statuts -->
<app-risk-status-history [riskId]="risk.id"></app-risk-status-history>
```

## 📊 Métriques de Suivi

- **Temps moyen par transition** : Mesure de l'efficacité du workflow
- **Taux de fermeture** : Pourcentage de risques fermés vs identifiés
- **Utilisateurs actifs** : Qui effectue le plus de transitions
- **Statuts bloqués** : Risques restés longtemps dans un statut

---

**🎉 L'automatisation des statuts est maintenant opérationnelle !** 