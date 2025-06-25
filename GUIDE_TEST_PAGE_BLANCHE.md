# 🔧 Guide de Test - Résolution Page Blanche

## 🎯 Problème Identifié et Résolu

**Symptôme** : Page blanche sur `/snmp/run` même avec rôle admin correct  
**Cause** : Conflit entre `AuthGuard` et `RoleGuard` - les deux faisaient la vérification de rôles  
**Solution** : `AuthGuard` ne fait plus que l'authentification, `RoleGuard` gère les autorisations

## 🔍 Diagnostic dans les Logs

### ✅ **Après correction, vous devriez voir** :
```
🔐 [AuthGuard] Vérification d'authentification pour: /snmp/run
✅ [AuthGuard] Utilisateur authentifié

🛡️ [RoleGuard] Vérification d'accès pour: /snmp/run
👤 Utilisateur: admin@example.com
🏷️ Rôles utilisateur: [admin, user]
🎯 Rôles requis: [admin, risk_manager]
🔒 [KeycloakService] Vérification de rôles multiples: [admin, risk_manager]
  🔒 [KeycloakService] Vérification du rôle: "admin"
    ✅ Match trouvé: "admin" -> "admin" === "admin"
    🎯 Résultat final: ✅ AUTORISÉ
✅ Accès autorisé - utilisateur a un des rôles requis
🎯 RETOUR: true (rôle valide)
```

### ❌ **Avant correction (problématique)** :
```
GuardsCheckEnd { shouldActivate: false }  ← Problème ici !
NavigationCancel
```

## 🧪 Test Étape par Étape

### 1. **Démarrer les services**
```bash
# Terminal 1 - Backend
cd backend
mvn spring-boot:run

# Terminal 2 - Frontend
cd frontend  
ng serve
```

### 2. **Ouvrir la console du navigateur**
- Aller sur `http://localhost:4200`
- Ouvrir F12 → Console
- Activer tous les niveaux de logs

### 3. **Se connecter en tant qu'admin**
- Utiliser un compte avec le rôle `admin`
- Vérifier dans les logs que l'authentification fonctionne

### 4. **Tester l'accès à SNMP**
- Naviguer vers `/snmp/run` 
- **Résultat attendu** : Page SNMP s'affiche
- **Logs attendus** : Voir le format ✅ ci-dessus

### 5. **Si problème persiste**

#### A. Vérifier les rôles Keycloak
```javascript
// Dans la console du navigateur, exécuter :
window.keycloak.tokenParsed.realm_access.roles
```

#### B. Forcer le rafraîchissement du token
```javascript
// Dans la console du navigateur :
window.keycloak.updateToken(5).then(() => {
  console.log('Token rafraîchi');
  location.reload();
});
```

#### C. Vérifier la configuration des guards
- Assurer que la route utilise bien `[AuthGuard, RoleGuard]`
- Vérifier que les rôles sont bien `['admin', 'risk_manager']`

## 🔧 Corrections Apportées

### **AuthGuard** modifié
```typescript
// AVANT (problématique)
return requiredRoles.some((role: string) => this.roles.includes(role));

// APRÈS (corrigé)
return true; // AuthGuard fait UNIQUEMENT l'authentification
```

### **RoleGuard** amélioré  
```typescript
// Logs explicites ajoutés
console.log('🎯 RETOUR: true (rôle valide)');
// Pour identifier clairement la valeur de retour
```

## 📊 Matrix de Test

| Rôle Utilisateur | Route `/snmp/run` | Résultat Attendu |
|------------------|-------------------|------------------|
| **admin** | ✅ | Page SNMP affichée |
| **risk_manager** | ✅ | Page SNMP affichée |  
| **compliance_officer** | ❌ | Redirection vers `/unauthorized` |
| **user** | ❌ | Redirection vers `/unauthorized` |
| **Non connecté** | ❌ | Redirection vers login Keycloak |

## 🚨 Points de Vérification Critiques

### ✅ **La page fonctionne si** :
- Les logs montrent `🎯 RETOUR: true (rôle valide)`
- Pas de `NavigationCancel` dans les logs du router
- Le composant SNMP se charge correctement

### ❌ **Page blanche si** :
- `shouldActivate: false` dans les logs
- `NavigationCancel` apparaît
- Erreur JavaScript non gérée
- Conflit entre guards

## 🎯 **Prochaines Étapes**

1. **Tester immédiatement** avec le guide ci-dessus
2. **Partager les logs** si problème persiste  
3. **Vérifier la configuration Keycloak** si les rôles ne sont pas détectés
4. **Valider avec différents types d'utilisateurs**

---

💡 **Astuce** : Si vous voyez toujours une page blanche, copiez-collez les logs de la console dans votre prochaine demande pour un diagnostic plus précis. 