# Guide de Test des Autorisations SentinelRisk

## 🎯 Objectif
Ce guide permet de tester que chaque rôle a bien accès uniquement aux pages et APIs qui lui sont autorisées.

## 📋 Prérequis

### 1. Démarrer les services
```bash
# Backend
cd backend
mvn spring-boot:run

# Frontend  
cd frontend
npm start
```

### 2. Vérifier Keycloak
- Accéder à http://localhost:8081/admin
- Realm : `sentinelrisk`
- Créer des utilisateurs de test avec les rôles appropriés

## 🧪 Tests par Rôle

### ADMIN (Accès complet)
**Utilisateur de test :** admin_user
**Autorisations attendues :**
- ✅ Toutes les pages accessibles
- ✅ Tous les boutons d'action (Créer/Éditer/Supprimer)
- ✅ Page Utilisateurs
- ✅ Module SNMP
- ✅ Toutes les APIs

**Tests à effectuer :**
1. Se connecter avec le rôle admin
2. Naviguer vers toutes les pages
3. Vérifier l'accès à `/users`
4. Vérifier l'accès à `/snmp`
5. Tester les boutons de création/édition/suppression

**APIs à tester :**
```bash
# Test endpoint admin
curl -H "Authorization: Bearer [TOKEN]" http://localhost:8080/api/auth-test/admin-only

# Test endpoint users
curl -H "Authorization: Bearer [TOKEN]" http://localhost:8080/api/users

# Test endpoint SNMP
curl -H "Authorization: Bearer [TOKEN]" http://localhost:8080/api/snmp/assets
```

### RISK_MANAGER (Gestion des risques)
**Utilisateur de test :** risk_manager_user
**Autorisations attendues :**
- ✅ Dashboard
- ✅ Risques (CRUD)
- ✅ Contrôles (CRUD)
- ✅ Catégories (CRUD)
- ✅ Module SNMP
- ✅ Évaluations (lecture seule)
- ✅ Conformité (lecture seule)
- ❌ Page Utilisateurs

**Tests à effectuer :**
1. Se connecter avec le rôle risk_manager
2. Vérifier l'accès aux pages autorisées
3. Vérifier le refus d'accès à `/users`
4. Tester la création/édition de risques
5. Vérifier l'accès lecture seule aux évaluations

**APIs à tester :**
```bash
# Devrait réussir
curl -H "Authorization: Bearer [TOKEN]" http://localhost:8080/api/risks
curl -H "Authorization: Bearer [TOKEN]" http://localhost:8080/api/snmp/assets

# Devrait échouer (403)
curl -H "Authorization: Bearer [TOKEN]" http://localhost:8080/api/users
curl -H "Authorization: Bearer [TOKEN]" http://localhost:8080/api/auth-test/admin-only
```

### COMPLIANCE_OFFICER (Responsable conformité)
**Utilisateur de test :** compliance_user
**Autorisations attendues :**
- ✅ Dashboard
- ✅ Risques (lecture seule)
- ✅ Contrôles (lecture seule)
- ✅ Évaluations (CRUD)
- ✅ Conformité (CRUD)
- ❌ Page Utilisateurs
- ❌ Module SNMP

**Tests à effectuer :**
1. Se connecter avec le rôle compliance_officer
2. Vérifier l'accès en lecture aux risques
3. Vérifier l'accès CRUD aux évaluations
4. Vérifier le refus d'accès à `/users` et `/snmp`
5. Tester les boutons désactivés sur risques/contrôles

### AUDITOR (Auditeur - Lecture seule)
**Utilisateur de test :** auditor_user
**Autorisations attendues :**
- ✅ Dashboard (lecture seule)
- ✅ Risques (lecture seule)
- ✅ Contrôles (lecture seule)
- ✅ Évaluations (lecture seule)
- ✅ Conformité (lecture seule)
- ❌ Page Utilisateurs
- ❌ Module SNMP
- ❌ Aucun bouton de création/édition/suppression

**Tests à effectuer :**
1. Se connecter avec le rôle auditor
2. Vérifier l'accès en lecture à toutes les pages autorisées
3. Vérifier l'absence de boutons d'action
4. Vérifier le refus d'accès aux modules non autorisés

### USER (Utilisateur standard)
**Utilisateur de test :** basic_user
**Autorisations attendues :**
- ✅ Dashboard (lecture seule)
- ✅ Risques (lecture seule)
- ✅ Contrôles (lecture seule)
- ✅ Évaluations assignées (lecture seule)
- ❌ Page Utilisateurs
- ❌ Module SNMP
- ❌ Module Conformité
- ❌ Aucun bouton de création/édition/suppression

## 🔍 Points de Vérification

### Frontend (Interface)
1. **Navigation :** Les menus non autorisés sont-ils masqués ?
2. **Boutons :** Les boutons d'action sont-ils désactivés/masqués selon le rôle ?
3. **Redirections :** L'utilisateur est-il redirigé en cas d'accès non autorisé ?
4. **Messages d'erreur :** Y a-t-il des messages clairs pour les accès refusés ?

### Backend (API)
1. **Codes de statut :** Les APIs renvoient-elles 403 pour les accès non autorisés ?
2. **Authentification :** Le token JWT est-il correctement validé ?
3. **Rôles :** Les rôles sont-ils correctement extraits du token ?
4. **Annotations :** Les annotations @PreAuthorize sont-elles bien appliquées ?

## 🐛 Débogage

### Vérifier l'extraction des rôles
1. Ouvrir la console du navigateur
2. Vérifier les logs du service Keycloak
3. Examiner le contenu du token JWT

### Vérifier les autorisations backend
1. Consulter les logs du serveur Spring Boot
2. Vérifier l'extraction des rôles dans SecurityConfig
3. Tester les endpoints avec curl

### Problèmes courants
- **Token expiré :** Rafraîchir ou se reconnecter
- **Rôles manquants :** Vérifier la configuration Keycloak
- **Inconsistance de noms :** Vérifier les noms de rôles (admin vs ADMIN vs ROLE_ADMIN)

## ✅ Critères de Réussite

Le test est réussi si :
1. ✅ Chaque rôle accède uniquement aux ressources autorisées
2. ✅ Les accès non autorisés sont bloqués avec des erreurs 403
3. ✅ L'interface utilisateur s'adapte selon le rôle
4. ✅ Les redirections fonctionnent correctement
5. ✅ Aucune information sensible n'est exposée aux rôles non autorisés

## 📊 Matrice des Autorisations

| Module / Action | admin | risk_manager | compliance_officer | auditor | user |
|----------------|-------|--------------|-------------------|---------|------|
| **Users**          |       |              |                   |         |      |
| - Voir             | ✅    | ❌           | ❌                | ❌      | ❌   |
| - Créer/Éditer     | ✅    | ❌           | ❌                | ❌      | ❌   |
| **Risques**        |       |              |                   |         |      |
| - Voir             | ✅    | ✅           | ✅                | ✅      | ✅   |
| - Créer/Éditer     | ✅    | ✅           | ❌                | ❌      | ❌   |
| **Contrôles**      |       |              |                   |         |      |
| - Voir             | ✅    | ✅           | ✅                | ✅      | ✅   |
| - Créer/Éditer     | ✅    | ✅           | ❌                | ❌      | ❌   |
| **Évaluations**    |       |              |                   |         |      |
| - Voir             | ✅    | ✅           | ✅                | ✅      | ✅   |
| - Créer/Éditer     | ✅    | ❌           | ✅                | ❌      | ❌   |
| **Conformité**     |       |              |                   |         |      |
| - Voir             | ✅    | ✅           | ✅                | ✅      | ❌   |
| - Créer/Éditer     | ✅    | ❌           | ✅                | ❌      | ❌   |
| **SNMP**           |       |              |                   |         |      |
| - Voir             | ✅    | ✅           | ❌                | ❌      | ❌   |
| - Créer/Éditer     | ✅    | ✅           | ❌                | ❌      | ❌   |
| **Dashboard**      |       |              |                   |         |      |
| - Voir             | ✅    | ✅           | ✅                | ✅      | ✅   |
| - Configurer       | ✅    | ✅           | ❌                | ❌      | ❌   | 