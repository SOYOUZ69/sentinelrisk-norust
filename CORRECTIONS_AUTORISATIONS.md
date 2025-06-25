# ✅ Corrections des Autorisations selon les Rôles - SentinelRisk

## 🎯 Problèmes Identifiés et Corrigés

### 1. **Configuration Spring Security Désactivée**
**Problème :** La sécurité était en mode permissif avec `.anyRequest().permitAll()`
**Solution :** 
- ✅ Réactivation de l'authentification JWT OAuth2
- ✅ Configuration des règles d'autorisation par endpoint
- ✅ Mapping des rôles selon la matrice d'autorisations

### 2. **Inconsistances dans les Noms de Rôles**
**Problème :** Mélange entre `ROLE_ADMIN`, `admin`, `ADMIN`
**Solution :**
- ✅ Standardisation des annotations `@PreAuthorize` vers `ROLE_*`
- ✅ Correction du DashboardController
- ✅ Uniformisation de l'extraction des rôles JWT

### 3. **Guards Frontend Incomplets**
**Problème :** Seul l'AuthGuard était utilisé, pas de vérification de rôles
**Solution :**
- ✅ Création du `RoleGuard` pour vérifier les rôles spécifiques
- ✅ Application sur toutes les routes protégées
- ✅ Redirections intelligentes selon le rôle

### 4. **Absence de Service de Permissions**
**Problème :** Pas de centralisation des règles de permissions
**Solution :**
- ✅ Création du `PermissionService` avec matrice complète
- ✅ Méthodes pour chaque module (utilisateurs, risques, etc.)
- ✅ Support pour l'affichage conditionnel

## 🔧 Fichiers Modifiés

### Backend
```
backend/src/main/java/com/sentinelrisk/backend/config/SecurityConfig.java
├── ✅ Réactivation OAuth2 JWT
├── ✅ Configuration des endpoints sécurisés
├── ✅ Règles d'autorisation par rôle et méthode HTTP
└── ✅ Amélioration de l'extraction des rôles

backend/src/main/java/com/sentinelrisk/backend/controller/DashboardController.java
├── ✅ Correction des annotations @PreAuthorize
└── ✅ Standardisation des noms de rôles
```

### Frontend
```
frontend/src/app/core/guards/role.guard.ts
├── ✅ Nouveau guard pour vérification des rôles
├── ✅ Redirections intelligentes
└── ✅ Logging pour débogage

frontend/src/app/core/services/permission.service.ts
├── ✅ Service centralisé de permissions
├── ✅ Matrice complète des autorisations
├── ✅ Méthodes par module
└── ✅ Support pour affichage conditionnel

frontend/src/app/core/auth/keycloak.service.ts
├── ✅ Amélioration des méthodes de vérification de rôles
├── ✅ Gestion du rafraîchissement de token
├── ✅ Méthodes d'information utilisateur
└── ✅ Logging amélioré

frontend/src/app/layout/layout-routing.module.ts
├── ✅ Application du RoleGuard sur toutes les routes
└── ✅ Configuration des rôles requis par route
```

## 📊 Matrice des Autorisations Implémentée

| Rôle | Users | Risks | Controls | Categories | Assessments | Compliance | SNMP | Dashboard |
|------|-------|-------|----------|------------|-------------|------------|------|-----------|
| **admin** | 🔴 CRUD | 🔴 CRUD | 🔴 CRUD | 🔴 CRUD | 🔴 CRUD | 🔴 CRUD | 🔴 CRUD | 🔴 CRUD |
| **risk_manager** | ❌ | 🔴 CRUD | 🔴 CRUD | 🔴 CRUD | 👁️ Read | 👁️ Read | 🔴 CRUD | 👁️ Read |
| **compliance_officer** | ❌ | 👁️ Read | 👁️ Read | 👁️ Read | 🔴 CRUD | 🔴 CRUD | ❌ | 👁️ Read |
| **auditor** | ❌ | 👁️ Read | 👁️ Read | 👁️ Read | 👁️ Read | 👁️ Read | ❌ | 👁️ Read |
| **user** | ❌ | 👁️ Read | 👁️ Read | 👁️ Read | 👁️ Read | ❌ | ❌ | 👁️ Read |

**Légende :**
- 🔴 **CRUD** : Création, Lecture, Modification, Suppression
- 👁️ **Read** : Lecture seule
- ❌ **Denied** : Accès refusé

## 🔒 Règles de Sécurité Backend

### Endpoints Publics
- Documentation Swagger : `/v3/api-docs/**`, `/swagger-ui/**`
- Debug utilisateur : `/api/auth-test/user-info`

### Endpoints par Rôle

#### ADMIN uniquement
```java
@PreAuthorize("hasRole('ADMIN')")
- GET,POST,PUT,DELETE /api/users/**
```

#### ADMIN + RISK_MANAGER
```java
@PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER')")
- GET,POST,PUT,DELETE /api/snmp/**
- POST,PUT,DELETE /api/risks/**
- POST,PUT,DELETE /api/controls/**
- POST,PUT,DELETE /api/categories/**
```

#### ADMIN + COMPLIANCE_OFFICER
```java
@PreAuthorize("hasAnyRole('ADMIN', 'COMPLIANCE_OFFICER')")
- POST,PUT,DELETE /api/assessments/**
- POST,PUT,DELETE /api/compliance/**
```

#### Lecture pour tous les rôles connectés
```java
@PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER', 'COMPLIANCE_OFFICER', 'AUDITOR', 'USER')")
- GET /api/risks/**
- GET /api/controls/**
- GET /api/categories/**
- GET /api/assessments/**
- GET /api/dashboard/summary/global
- GET /api/dashboard/summary/risks
```

## 🎭 Guards Frontend

### AuthGuard
- Vérification de l'authentification Keycloak
- Redirection vers login si non connecté

### RoleGuard
- Vérification des rôles requis pour chaque route
- Redirection intelligente selon le rôle de l'utilisateur
- Logging détaillé pour débogage

### Configuration des Routes
```typescript
{
  path: 'users',
  canActivate: [AuthGuard, RoleGuard],
  data: { roles: ['admin'] }
},
{
  path: 'snmp',
  canActivate: [AuthGuard, RoleGuard],
  data: { roles: ['admin', 'risk_manager'] }
}
```

## 🧪 Tests Recommandés

### 1. Test Manuel
Utiliser le guide `test-authorization.md` pour tester chaque rôle

### 2. Test API avec curl
```bash
# Récupérer le token depuis la console du navigateur
TOKEN="eyJhbGciOiJSUzI1NiIs..."

# Tester un endpoint admin (devrait échouer pour non-admin)
curl -H "Authorization: Bearer $TOKEN" \
     -H "Content-Type: application/json" \
     http://localhost:8080/api/users

# Tester un endpoint accessible à tous
curl -H "Authorization: Bearer $TOKEN" \
     -H "Content-Type: application/json" \
     http://localhost:8080/api/risks
```

### 3. Test Frontend
1. Se connecter avec différents rôles
2. Vérifier l'affichage des menus
3. Tester les redirections
4. Vérifier les boutons désactivés

## 🐛 Débogage

### Logs Backend
```bash
# Démarrer avec logs détaillés
cd backend
mvn spring-boot:run -Dspring.profiles.active=debug
```

### Logs Frontend
- Ouvrir la console du navigateur
- Vérifier les logs des services Keycloak et Permission
- Utiliser `keycloakService.logUserRoles()` et `permissionService.logPermissions()`

### Problèmes Courants

#### 1. Rôles non reconnus
**Symptôme :** L'utilisateur n'a pas accès malgré le bon rôle
**Solution :** 
- Vérifier la configuration Keycloak (realm_access.roles)
- Vérifier l'extraction des rôles dans SecurityConfig
- Rafraîchir le token

#### 2. Erreurs 403 inattendues
**Symptôme :** API renvoie 403 pour un rôle autorisé
**Solution :**
- Vérifier les annotations @PreAuthorize
- Vérifier le format du token JWT
- Consulter les logs Spring Security

#### 3. Redirections infinies
**Symptôme :** L'utilisateur est bloqué dans une boucle de redirection
**Solution :**
- Vérifier les guards et leurs conditions
- S'assurer qu'il y a une route accessible pour chaque rôle

## ✅ Validation

Le système d'autorisations est correctement configuré si :

1. ✅ **Backend** : Les APIs renvoient 403 pour les accès non autorisés
2. ✅ **Frontend** : Les routes sont protégées selon les rôles
3. ✅ **UI** : Les boutons/menus s'adaptent au rôle
4. ✅ **Sécurité** : Aucune information sensible n'est exposée
5. ✅ **UX** : Les redirections sont cohérentes et claires

## 🚀 Prochaines Étapes

1. **Tests automatisés** : Créer des tests unitaires pour les permissions
2. **Interface de test** : Implémenter le composant AuthTestComponent
3. **Monitoring** : Ajouter des métriques sur les accès refusés
4. **Documentation** : Mettre à jour la documentation utilisateur
5. **Formation** : Former les équipes sur les nouveaux rôles 