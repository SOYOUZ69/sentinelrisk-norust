# 🛠️ Automatisation du changement de statut lors de la création/modification d'un Assessment

## 📋 Vue d'ensemble

Cette fonctionnalité automatise le changement de statut des risques lors de la création ou modification d'assessments, et maintient un historique complet des transitions de statut.

## 🎯 Objectifs atteints

✅ **Changement automatique de statut** : Le statut du risque change automatiquement lors de la création/modification d'un assessment  
✅ **Historique des statuts** : Chaque changement est enregistré avec traçabilité complète  
✅ **Logique métier** : Transitions basées sur les actions d'assessment et le contenu  
✅ **API consultable** : Endpoint pour récupérer l'historique des statuts  

## 🏗️ Architecture implémentée

### 1. **Nouveau modèle : `RiskStatusHistory`**
```java
@Entity
@Table(name = "risk_status_history")
public class RiskStatusHistory {
    private Long id;
    private Risk risk;
    private Risk.Status previousStatus;
    private Risk.Status newStatus;
    private User changedByUser;
    private String changeReason;
    private LocalDateTime changeDate;
}
```

### 2. **Service de transition : `RiskStatusTransitionService`**
Gère la logique métier des transitions de statut :

- **Création d'assessment** : `IDENTIFIED` → `IN_ASSESSMENT`
- **Mise à jour d'assessment** : Dépend du nouveau statut
- **Finalisation d'assessment** : `IN_ASSESSMENT` → `MITIGATED` ou `ACCEPTED`

### 3. **Service d'historique : `RiskStatusHistoryService`**
Enregistre et récupère l'historique des changements de statut.

### 4. **Intégration dans `AssessmentService`**
Les méthodes `createAssessment()` et `updateAssessment()` déclenchent automatiquement les transitions.

## 🔄 Logique de transition

### Transitions automatiques :

| Action | Statut actuel | Nouveau statut | Raison |
|--------|---------------|----------------|---------|
| Création assessment | `IDENTIFIED` | `IN_ASSESSMENT` | Risque mis en évaluation |
| Création assessment | `MITIGATED/ACCEPTED/CLOSED` | `IN_ASSESSMENT` | Remise en évaluation |
| Assessment complété | `IN_ASSESSMENT` | `MITIGATED` | Si conclusions fournies |
| Assessment complété | `IN_ASSESSMENT` | `ACCEPTED` | Si pas de conclusions |

## 📊 Base de données

### Nouvelle table : `risk_status_history`
```sql
CREATE TABLE risk_status_history (
    id BIGSERIAL PRIMARY KEY,
    risk_id BIGINT NOT NULL,
    previous_status VARCHAR(50),
    new_status VARCHAR(50) NOT NULL,
    changed_by_user_id VARCHAR(255),
    change_reason TEXT,
    change_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

### Migration : `V15__create_risk_status_history_table.sql`
- Création de la table avec contraintes
- Index pour optimiser les performances
- Contraintes de validation des statuts

## 🔌 API Endpoints

### Nouvel endpoint : `GET /api/risks/{id}/status-history`
```json
[
  {
    "id": 1,
    "riskId": 123,
    "riskName": "Risque de sécurité",
    "previousStatus": "IDENTIFIED",
    "newStatus": "IN_ASSESSMENT",
    "changedByUserId": "user-123",
    "changedByUserName": "John Doe",
    "changeReason": "Création d'un assessment - Risque mis en évaluation",
    "changeDate": "2025-06-30T22:20:30"
  }
]
```

## 🎯 Utilisation

### 1. **Création d'un assessment**
```java
// Le statut du risque change automatiquement de IDENTIFIED à IN_ASSESSMENT
Assessment assessment = assessmentService.createAssessment(newAssessment);
```

### 2. **Finalisation d'un assessment**
```java
assessment.setStatus(Assessment.Status.COMPLETED);
assessment.setFindings("Risque mitigué par...");
// Le statut du risque change automatiquement à MITIGATED
assessmentService.updateAssessment(assessmentId, assessment);
```

### 3. **Consultation de l'historique**
```java
List<RiskStatusHistoryDTO> history = riskStatusHistoryService.getStatusHistoryForRisk(riskId);
```

## 🔒 Sécurité et permissions

- **Lecture** : `ROLE_ADMIN`, `ROLE_RISK_MANAGER`, `ROLE_COMPLIANCE_OFFICER`, `ROLE_AUDITOR`, `ROLE_USER`
- **Écriture** : Automatique lors des actions d'assessment
- **Traçabilité** : Chaque changement est lié à l'utilisateur qui l'a déclenché

## 📝 Logs et monitoring

Le système génère des logs détaillés :
```
INFO - Statut du risque 123 changé de IDENTIFIED à IN_ASSESSMENT - Raison: Création d'un assessment - Risque mis en évaluation
```

## 🚀 Déploiement

1. **Migration automatique** : Flyway applique la migration `V15`
2. **Compilation** : `mvn clean compile`
3. **Démarrage** : `mvn spring-boot:run`

## 🔧 Configuration

Aucune configuration supplémentaire requise. Le système fonctionne automatiquement avec les paramètres par défaut.

## 📈 Avantages

- **Automatisation** : Plus de changement manuel de statut
- **Traçabilité** : Historique complet des transitions
- **Cohérence** : Logique métier centralisée
- **Audit** : Conformité et traçabilité renforcées
- **API** : Intégration facile avec le frontend

## 🔮 Évolutions futures

- **Règles métier configurables** : Permettre la personnalisation des transitions
- **Notifications** : Alertes lors des changements de statut
- **Workflow** : Intégration avec un moteur de workflow
- **Dashboard** : Visualisation des transitions dans l'interface 