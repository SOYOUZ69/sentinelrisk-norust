# Test de la fonctionnalité de seuil d'acceptation des risques

## 🎯 Objectif
Tester la fonctionnalité de seuil d'acceptation configurable des risques (Tâche 1.3).

## 🧪 Tests à effectuer

### 1. Test de récupération du seuil d'acceptation
```bash
# Récupérer le seuil actuel
curl -X GET http://localhost:8080/api/settings/risk-acceptance-threshold
```
**Résultat attendu :** `{"threshold": 15, "message": "Seuil d'acceptation récupéré avec succès"}`

### 2. Test de modification du seuil
```bash
# Modifier le seuil à 10
curl -X PUT http://localhost:8080/api/settings/risk-acceptance-threshold \
  -H "Content-Type: application/json" \
  -d '{"threshold": 10}'
```
**Résultat attendu :** `{"threshold": 10, "message": "Seuil d'acceptation mis à jour avec succès"}`

### 3. Test de création d'un risque avec score acceptable
```bash
# Créer un risque avec score 8 (acceptable)
curl -X POST http://localhost:8080/api/risks \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test risque acceptable",
    "description": "Risque avec score 8",
    "categoryId": 1,
    "impactLevel": "MODERATE",
    "probabilityLevel": "POSSIBLE",
    "status": "IDENTIFIED"
  }'
```
**Résultat attendu :** Création réussie avec DID généré

### 4. Test de création d'un risque avec score trop élevé
```bash
# Créer un risque avec score 20 (trop élevé)
curl -X POST http://localhost:8080/api/risks \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test risque rejeté",
    "description": "Risque avec score 20",
    "categoryId": 1,
    "impactLevel": "SEVERE",
    "probabilityLevel": "LIKELY",
    "status": "IDENTIFIED"
  }'
```
**Résultat attendu :** 
```json
{
  "error": "risk_above_threshold",
  "message": "Le score du risque (20) dépasse le seuil d'acceptation défini (10)",
  "riskScore": 20,
  "threshold": 10
}
```
**Code HTTP :** 422 (Unprocessable Entity)

### 5. Test de l'interface utilisateur

#### 5.1 Affichage du seuil
- Aller sur la page des risques
- Vérifier que le seuil d'acceptation s'affiche à côté du bouton "Nouveau risque"
- Le seuil doit être affiché avec une icône d'avertissement

#### 5.2 Modification du seuil
- Cliquer sur l'icône d'édition à côté du seuil
- Entrer une nouvelle valeur (ex: 12)
- Vérifier que le seuil se met à jour dans l'interface

#### 5.3 Création de risque avec seuil visible
- Cliquer sur "Nouveau risque"
- Vérifier que le seuil d'acceptation s'affiche dans le formulaire
- Le message doit indiquer : "Les risques avec un score supérieur à X seront automatiquement rejetés"

#### 5.4 Test de rejet de risque
- Créer un risque avec des niveaux élevés (Sévère + Probable = score 20)
- Vérifier que l'erreur s'affiche correctement dans l'interface
- Le message doit être : "Le score de ce risque (20) dépasse le seuil d'acceptation défini (12)"

## ✅ Critères de succès

- [ ] Le seuil d'acceptation est récupéré depuis la base de données
- [ ] Le seuil peut être modifié via l'API et l'interface
- [ ] Les risques avec un score supérieur au seuil sont rejetés avec le code 422
- [ ] Le message d'erreur est clair et contient le score et le seuil
- [ ] L'interface affiche le seuil actuel en lecture seule
- [ ] L'interface permet de modifier le seuil (admin/risk_manager uniquement)
- [ ] Le formulaire de création affiche le seuil d'acceptation

## 🔧 Configuration par défaut

- **Seuil par défaut :** 15
- **Table de configuration :** `app_settings`
- **Clé du paramètre :** `risk_acceptance_threshold`
- **Migration :** `V6__add_risk_acceptance_threshold.sql`

## 🚀 Démarrage des tests

1. Démarrer le backend : `mvn spring-boot:run`
2. Démarrer le frontend : `ng serve`
3. Exécuter les tests API avec curl
4. Tester l'interface utilisateur 