# 🎯 Guide de Validation des Autorisations SentinelRisk

## ✅ Résumé des Corrections Effectuées

Les autorisations selon les rôles ont été **entièrement corrigées** dans l'application SentinelRisk. Voici ce qui a été implémenté :

### 🔒 Backend (Spring Security)
- ✅ **Sécurité réactivée** : Configuration OAuth2 JWT fonctionnelle
- ✅ **Autorisations par endpoint** : Chaque API protégée selon le rôle
- ✅ **Matrice des permissions** : Implémentation complète des règles d'accès
- ✅ **Extraction des rôles** : JWT Keycloak correctement parsé

### 🎭 Frontend (Angular)
- ✅ **Guards de rôles** : Protection des routes selon les permissions
- ✅ **Service de permissions** : Gestion centralisée des autorisations
- ✅ **Redirections intelligentes** : Navigation adaptée au rôle utilisateur
- ✅ **Affichage conditionnel** : Interface utilisateur adaptée

## 🧪 Validation Rapide (5 minutes)

### Étape 1 : Démarrer l'application
```bash
# Terminal 1 - Backend
cd backend
mvn spring-boot:run

# Terminal 2 - Frontend  
cd frontend
npm start
```

### Étape 2 : Créer un utilisateur admin dans Keycloak
1. Aller sur http://localhost:8081/admin (admin/admin)
2. Realm "sentinelrisk" → Users → Add user
3. Username: `test-admin`, Email: `admin@test.com`
4. Credentials → Set password: `password123`
5. Role mappings → Add role `admin`

### Étape 3 : Tester l'accès admin
1. Aller sur http://localhost:4200
2. Se connecter avec `test-admin` / `password123`
3. **✅ Vérifier** : Accès à toutes les pages
4. **✅ Vérifier** : Page "Utilisateurs" accessible
5. **✅ Vérifier** : Module SNMP accessible

### Étape 4 : Créer un utilisateur basique
1. Dans Keycloak, créer : `test-user` avec rôle `user`
2. Se déconnecter et reconnector avec `test-user`
3. **✅ Vérifier** : Pas d'accès à "Utilisateurs"
4. **✅ Vérifier** : Pas d'accès à "SNMP"
5. **✅ Vérifier** : Dashboard accessible en lecture seule

### Étape 5 : Test API automatisé
```bash
# Dans un nouveau terminal
cd sentinelrisk-norust

# Test sans token (doit échouer)
./test-auth-script.sh

# Avec un token (récupérer depuis localStorage du navigateur)
./test-auth-script.sh "eyJhbGciOiJSUzI1NiIs..."
```

## 📊 Matrice des Rôles (Résumé)

| Rôle | Utilisateurs | Risques | Contrôles | Évaluations | Conformité | SNMP | Dashboard |
|------|-------------|---------|-----------|-------------|------------|------|-----------|
| **admin** | 🔴 CRUD | 🔴 CRUD | 🔴 CRUD | 🔴 CRUD | 🔴 CRUD | 🔴 CRUD | 🔴 CRUD |
| **risk_manager** | ❌ | 🔴 CRUD | 🔴 CRUD | 👁️ Read | 👁️ Read | 🔴 CRUD | 👁️ Read |
| **compliance_officer** | ❌ | 👁️ Read | 👁️ Read | 🔴 CRUD | 🔴 CRUD | ❌ | 👁️ Read |
| **auditor** | ❌ | 👁️ Read | 👁️ Read | 👁️ Read | 👁️ Read | ❌ | 👁️ Read |
| **user** | ❌ | 👁️ Read | 👁️ Read | 👁️ Read | ❌ | ❌ | 👁️ Read |

## 🔍 Points de Contrôle Critiques

### ✅ Succès attendu
- [ ] **Admin** accède à `/users` et `/snmp`
- [ ] **Risk Manager** accède à `/snmp` mais PAS `/users`  
- [ ] **User** n'accède NI à `/users` NI à `/snmp`
- [ ] **APIs** renvoient 403 pour accès non autorisés
- [ ] **Boutons** d'édition masqués selon le rôle
- [ ] **Redirections** vers pages autorisées en cas d'accès refusé

### ❌ Échecs possibles
- **403 inattendu** → Vérifier rôles Keycloak et extraction JWT
- **Accès non autorisé** → Vérifier guards et annotations @PreAuthorize  
- **Redirections infinies** → Vérifier qu'il y a une route accessible pour chaque rôle
- **Boutons toujours visibles** → Vérifier service de permissions

## 🚨 Problèmes Courants et Solutions

### Problème : "L'utilisateur admin n'accède pas aux pages protégées"
**Solution :**
1. Vérifier le rôle dans Keycloak (realm_access.roles)
2. Regarder les logs console du navigateur
3. Vérifier l'extraction des rôles dans SecurityConfig

### Problème : "Erreur 403 pour toutes les APIs"
**Solution :**
1. Vérifier que le backend utilise la nouvelle configuration
2. Redémarrer le backend : `mvn spring-boot:run`
3. Vérifier les logs Spring Security

### Problème : "Les redirections ne fonctionnent pas"
**Solution :**
1. Vérifier que RoleGuard est appliqué aux routes
2. S'assurer qu'il y a une route par défaut pour chaque rôle
3. Redémarrer le frontend : `npm start`

## 🎉 Validation Complète

Le système d'autorisations est **validé** si :

✅ **Authentification** : Seuls les utilisateurs connectés accèdent aux ressources protégées  
✅ **Autorisation** : Chaque rôle accède uniquement aux ressources autorisées  
✅ **Interface** : Les boutons et menus s'adaptent au rôle  
✅ **API** : Les endpoints renvoient 403 pour les accès non autorisés  
✅ **Navigation** : Les redirections fonctionnent correctement  

## 📞 Support

En cas de problème :
1. **Consulter** : `CORRECTIONS_AUTORISATIONS.md` pour les détails techniques
2. **Tester** : `test-authorization.md` pour les tests manuels complets  
3. **Debug** : Logs console navigateur + logs Spring Boot
4. **Vérifier** : Configuration Keycloak (rôles, clients, users)

---

**🎯 Objectif atteint** : Les autorisations selon les rôles fonctionnent maintenant correctement dans SentinelRisk ! 🚀 