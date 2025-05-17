# Guide de test des restrictions d'accès par rôle dans SentinelRisk

Ce document détaille la procédure de test pour vérifier que les restrictions d'accès basées sur les rôles fonctionnent correctement dans l'application SentinelRisk.

## Préparation

### 1. Création des utilisateurs dans Keycloak

Commencez par créer cinq utilisateurs avec des rôles différents dans l'interface d'administration de Keycloak :

1. Connectez-vous à l'interface admin de Keycloak : http://localhost:8081/admin (admin/admin)
2. Sélectionnez le realm "sentinelrisk"
3. Créez les cinq utilisateurs suivants :

| Nom utilisateur | Email                  | Nom   | Prénom | Mot de passe | Rôle(s)            |
|-----------------|------------------------|-------|--------|--------------|-------------------|
| admin_user      | admin@sentinelrisk.com | Admin | User   | password123  | admin             |
| risk_user       | risk@sentinelrisk.com  | Risk  | User   | password123  | risk_manager      |
| compliance_user | compl@sentinelrisk.com | Compl | User   | password123  | compliance_officer|
| auditor_user    | audit@sentinelrisk.com | Audit | User   | password123  | auditor           |
| basic_user      | user@sentinelrisk.com  | Basic | User   | password123  | user              |

Pour chaque utilisateur :
1. Dans le menu de gauche, cliquez sur "Users" puis "Add user"
2. Remplissez les champs et activez "Email verified"
3. Cliquez sur "Create"
4. Dans l'onglet "Credentials", définissez un mot de passe et désactivez "Temporary"
5. Dans l'onglet "Role mappings", ajoutez le(s) rôle(s) approprié(s)

## Procédure de test par rôle

### Rôle USER

**Connexion** :
1. Dans un navigateur en mode privé, accédez à http://localhost:4200
2. Connectez-vous avec les identifiants de basic_user

**Ce que vous devriez voir** :
- Accès au tableau de bord (lecture seule)
- Accès aux risques en lecture seule
- Accès aux contrôles en lecture seule
- Accès aux catégories en lecture seule
- Accès aux évaluations qui lui sont assignées en lecture seule

**Ce que vous ne devriez pas voir** :
- Le menu "Utilisateurs" ne devrait pas être visible
- Aucun bouton d'ajout de risque ou de contrôle
- Aucun bouton d'édition ou de suppression
- Pas d'accès aux formulaires de création/édition de risques, contrôles ou évaluations

### Rôle RISK_MANAGER

**Connexion** :
1. Déconnectez-vous et reconnectez-vous avec les identifiants de risk_user

**Ce que vous devriez voir** :
- Accès complet au tableau de bord
- Accès complet aux risques (création, lecture, modification, suppression)
- Accès complet aux contrôles (création, lecture, modification, suppression)
- Accès complet aux catégories (création, lecture, modification, suppression)
- Accès en lecture aux évaluations et création possible

**Ce que vous ne devriez pas voir** :
- Le menu "Utilisateurs" ne devrait pas être visible
- Pas d'accès aux fonctionnalités de modification/suppression des évaluations

**Actions à tester** :
1. Créer un nouveau risque
2. Modifier un risque existant
3. Supprimer un risque
4. Créer un nouveau contrôle et l'associer à un risque
5. Tenter de modifier une évaluation (devrait être refusé)

### Rôle COMPLIANCE_OFFICER

**Connexion** :
1. Déconnectez-vous et reconnectez-vous avec les identifiants de compliance_user

**Ce que vous devriez voir** :
- Accès complet au tableau de bord
- Accès en lecture aux risques
- Accès en lecture aux contrôles
- Accès en lecture aux catégories
- Accès complet aux évaluations (création, lecture, modification, suppression)

**Ce que vous ne devriez pas voir** :
- Le menu "Utilisateurs" ne devrait pas être visible
- Pas d'accès aux fonctionnalités de création/modification/suppression des risques et contrôles

**Actions à tester** :
1. Consulter les risques (sans pouvoir les modifier)
2. Créer une nouvelle évaluation
3. Modifier une évaluation existante
4. Supprimer une évaluation
5. Tenter de créer/modifier un risque (devrait être refusé)

### Rôle AUDITOR

**Connexion** :
1. Déconnectez-vous et reconnectez-vous avec les identifiants de auditor_user

**Ce que vous devriez voir** :
- Accès au tableau de bord en lecture seule
- Accès aux risques en lecture seule
- Accès aux contrôles en lecture seule
- Accès aux catégories en lecture seule
- Accès aux évaluations en lecture seule

**Ce que vous ne devriez pas voir** :
- Le menu "Utilisateurs" ne devrait pas être visible
- Aucun bouton de création, modification ou suppression ne devrait être visible
- Pas d'accès aux formulaires d'édition

**Actions à tester** :
1. Consulter les risques (sans pouvoir les modifier)
2. Consulter les évaluations (sans pouvoir les modifier)
3. Vérifier qu'aucun bouton d'action n'est disponible

### Rôle ADMIN

**Connexion** :
1. Déconnectez-vous et reconnectez-vous avec les identifiants de admin_user

**Ce que vous devriez voir** :
- Accès complet à toutes les fonctionnalités
- Menu "Utilisateurs" visible et accessible
- Tous les boutons d'action sont visibles et fonctionnels

**Actions à tester** :
1. Créer, modifier et supprimer un utilisateur
2. Créer, modifier et supprimer un risque
3. Créer, modifier et supprimer un contrôle
4. Créer, modifier et supprimer une évaluation
5. Créer, modifier et supprimer une catégorie

## Test des API Backend

Pour tester les restrictions au niveau du backend, vous pouvez utiliser Postman ou curl pour envoyer des requêtes directement aux API :

1. Obtenez d'abord un token d'accès pour un utilisateur spécifique :
```bash
curl -X POST \
  http://localhost:8081/realms/sentinelrisk/protocol/openid-connect/token \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'grant_type=password&client_id=sentinelrisk-frontend&username=basic_user&password=password123'
```

2. Utilisez ce token pour tester différentes API en incluant l'en-tête Authorization :
```bash
curl -X POST \
  http://localhost:8080/api/risks \
  -H 'Authorization: Bearer [TOKEN]' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Test Risk",
    "description": "Test description",
    "categoryId": 1,
    "impactLevel": "MODERATE",
    "probabilityLevel": "POSSIBLE",
    "status": "IDENTIFIED"
  }'
```

Avec un utilisateur USER, cette requête devrait échouer avec un statut 403 Forbidden.
Avec un utilisateur RISK_MANAGER ou ADMIN, cette requête devrait réussir.

## Tableau récapitulatif des droits d'accès

| Rôle               | Actions autorisées                                          | Actions interdites                                        |
|--------------------|-------------------------------------------------------------|----------------------------------------------------------|
| USER               | • Lecture des risques, contrôles, catégories<br>• Lecture des évaluations assignées | • Création/modification/suppression de tout élément<br>• Accès au module utilisateurs |
| RISK_MANAGER       | • CRUD complet sur risques et contrôles<br>• Gestion des catégories<br>• Lecture des évaluations<br>• Création d'évaluations | • Modification/suppression des évaluations<br>• Accès au module utilisateurs |
| COMPLIANCE_OFFICER | • Lecture des risques et contrôles<br>• CRUD complet sur évaluations<br>• Gestion des rapports | • Création/modification/suppression des risques/contrôles<br>• Accès au module utilisateurs |
| AUDITOR            | • Lecture seule sur tous les modules<br>• Génération de rapports | • Toute action de modification<br>• Accès au module utilisateurs |
| ADMIN              | • Accès complet à toutes les fonctionnalités<br>• Gestion des utilisateurs | – |

## Messages d'erreur attendus

- **API Backend** : Les requêtes non autorisées devraient renvoyer un statut HTTP 403 (Forbidden)
- **Frontend** : Les boutons/actions non autorisés devraient être masqués
- **Routes protégées** : Si un utilisateur tente d'accéder directement à une route protégée (par exemple en manipulant l'URL), il devrait être redirigé vers sa page d'accueil ou recevoir un message d'erreur approprié. 