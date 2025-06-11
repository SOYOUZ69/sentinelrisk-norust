# SentinelRisk - Système de Gestion des Risques et de Conformité

## Description
SentinelRisk est une plateforme complète de gestion des risques et de conformité, conçue pour aider les organisations à identifier, évaluer et gérer efficacement leurs risques tout en assurant la conformité réglementaire.

## Architecture Technique

- **Backend** : Spring Boot
- **Frontend** : Angular
- **Base de données** : PostgreSQL
- **Authentification** : Keycloak
- **Déploiement** : Docker & Kubernetes

## Structure du Projet

```
sentinelrisk/
├── backend/           # Application Spring Boot
├── frontend/         # Application Angular
├── docker/           # Configurations Docker
├── k8s/              # Configurations Kubernetes
└── docs/            # Documentation technique
```

## Prérequis

- Java 17+
- Node.js 18+
- Docker
- Docker Compose
- PostgreSQL
- Maven
- Angular CLI (version 17.2.0+) : `npm install -g @angular/cli`

## Installation

1. **Cloner le projet**
```bash
git clone [URL_DU_REPO]
cd sentinelrisk-norust
```

2. **Démarrer les services avec Docker Compose**
```bash
docker compose -f docker/docker-compose.yml up -d
```

3. **Vérifier que les services sont en cours d'exécution**
```bash
docker ps
```

Les services suivants devraient être opérationnels :
- PostgreSQL (port 5432)
- Keycloak (port 8081)

4. **Accéder à Keycloak**
- URL d'administration : http://localhost:8081/admin
- Identifiants par défaut :
  - Utilisateur : admin
  - Mot de passe : admin

## Configuration actuelle

### Base de données
- PostgreSQL est configuré avec deux bases de données :
  - `sentinelrisk` : pour l'application principale
  - `keycloak` : pour la gestion de l'authentification

### Keycloak
- Version : 21.1
- Configuration en mode développement
- Accessible sur http://localhost:8081
- Proxy configuré en mode passthrough

#### Configuration du Realm
1. **Realm Name**: sentinelrisk
2. **Rôles configurés**:
   - `admin` : Administrateur système
   - `risk_manager` : Gestionnaire des risques
   - `compliance_officer` : Responsable de la conformité
   - `auditor` : Auditeur
   - `user` : Utilisateur standard
3. **Paramètres de sécurité**:
   - SSL Mode: none (développement uniquement)
   - Brute Force Detection: activé
   - Protection contre les attaques XSS et clickjacking

#### Configuration des Clients
1. **Client Frontend (Angular)**
   - Client ID : `sentinelrisk-frontend`
   - Type : Public (no client authentication)
   - Root URL : `http://localhost:4200`
   - Redirect URIs : `http://localhost:4200/*`
   - Web Origins : `http://localhost:4200`
   - Flows activés : Standard flow, Direct access grants

2. **Client Backend (Spring Boot)**
   - Client ID : `sentinelrisk-backend`
   - Type : Confidential (client authentication required)
   - Root URL : `http://localhost:8080`
   - Redirect URIs : `http://localhost:8080/*`
   - Web Origins : `http://localhost:8080`
   - Flows activés : Service accounts

#### Informations de Configuration
1. **Endpoints OIDC**
   - URL de base : `http://localhost:8081`
   - Realm : `sentinelrisk`
   - Discovery endpoint : `http://localhost:8081/realms/sentinelrisk/.well-known/openid-configuration`
   - Token endpoint : `http://localhost:8081/realms/sentinelrisk/protocol/openid-connect/token`
   - Authorization endpoint : `http://localhost:8081/realms/sentinelrisk/protocol/openid-connect/auth`

2. **Informations pour le Backend**
   - Client ID : `sentinelrisk-backend`
   - Client Secret : `[À CONFIGURER DANS application.yml]`
   - Grant Type : `client_credentials`

3. **Informations pour le Frontend**
   - Client ID : `sentinelrisk-frontend`
   - Grant Types : `authorization_code`, `refresh_token`
   - Response Type : `code`
   - Scope : `openid profile email`

## Prochaines étapes

1. [x] Configuration du realm Keycloak
2. [x] Mise en place des clients Keycloak
3. [x] Développement du backend Spring Boot
   - [ ] Ajout du module Conformité : entités ComplianceFramework, ComplianceRequirement, RiskComplianceMapping et endpoints CRUD
   - [x] Configuration de Spring Security avec Keycloak
   - [x] Mise en place des entités de base
   - [x] Développement des APIs REST
   - [x] **Endpoints Dashboard** : Implémentation des endpoints `/api/dashboard/summary/*` (risks, compliance, snmp, plans, global)
4. [ ] Développement du frontend Angular
   - [x] Initialisation du projet Angular
     - [x] Création avec routing activé et SCSS
     - [x] Structure initiale (`pages`, `components`, `services`, etc.)
   - [x] Installation des dépendances
     - [x] Angular Material
     - [ ] ngx-translate (traduction)
     - [x] keycloak-js (authentification)
     - [ ] Autres utilitaires (lodash, date-fns...)
   - [x] Setup du thème et layout
     - [x] Configuration Angular Material (couleurs, typographie)
     - [x] Mise en place d'un layout de base : Header / Sidebar / Footer
     - [x] Responsive design
   - [x] Intégration de Keycloak
     - [x] Configuration du service d'authentification
     - [x] AuthGuard pour les routes sécurisées
     - [x] Login / Logout / Refresh token
   - [x] Mise en place de la navigation
     - [x] Configuration des routes et modules
     - [x] Routes publiques vs privées
     - [x] Redirections et fallback
   - [x] Définition des modèles TypeScript
     - [x] User, Risk, Control, Category, Assessment
   - [x] Services pour communication API
     - [x] ApiService générique
     - [x] Services spécifiques : UserService, RiskService, etc.
     - [x] Gestion automatique des tokens
   - [ ] Développement des pages
     - [x] **Dashboard** : Interface complète avec graphiques ngx-charts (actuellement en mode statique temporaire)
     - [x] Utilisateurs (liste, création, édition, suppression)
     - [x] Risques (liste, création, édition, suppression)
     - [ ] Contrôles
     - [ ] Catégories
     - [ ] Évaluations
     - [ ] Conformité : module de mappings prédéfinis (ISO 27001, NIST, SOC 2, GDPR)
   - [ ] Gestion des rôles côté UI
     - [ ] Lecture des rôles depuis le token JWT
     - [ ] Affichage conditionnel selon rôle
   - [ ] Améliorations UX/UI
     - [ ] Notifications (snackbar)
     - [ ] Spinners de chargement
     - [ ] Gestion des erreurs serveur
   - [ ] Tests et vérifications
     - [ ] Tests unitaires des services
     - [ ] Vérification de la navigation et des accès protégés
5. [ ] Configuration des rôles et permissions
6. [ ] Mise en place des tests
7. [ ] Configuration du déploiement Kubernetes

## 🚧 Mode Statique Temporaire du Dashboard

**Statut actuel** : Le Dashboard frontend fonctionne en mode statique avec des données fictives.

### Contexte
Les endpoints backend `/api/dashboard/summary/*` sont implémentés mais nécessitent une authentification JWT. Pour permettre le développement de l'interface utilisateur sans dépendre du backend, le Dashboard a été temporairement basculé en mode statique.

### Fonctionnalités en Mode Statique
- ✅ **Affichage immédiat** : Toutes les cartes KPI et graphiques s'affichent instantanément
- ✅ **Données réalistes** : 4 sections avec des métriques cohérentes (Risques, Conformité, SNMP, Plans d'action)
- ✅ **Graphiques interactifs** : Utilisation complète de ngx-charts avec animations
- ✅ **Graphiques optimisés** : Rendu et redimensionnement corrigés (pas de re-rendering en boucle)
- ✅ **Indicateur visuel** : Chip "MODE DÉMO" avec animation pour clarifier le statut
- ✅ **Filtres désactivés** : Interface complète mais non fonctionnelle (mode démo)
- ✅ **Aucune erreur réseau** : Pas d'appels HTTP, pas d'erreurs dans la console

### Données Statiques Utilisées
- **Risques** : 36 total (30 ouverts, 6 fermés) répartis par niveau et catégorie
- **Conformité** : 60 contrôles (66.7% de conformité) sur ISO 27001, NIST, SOC 2
- **SNMP** : 55 actifs (88% de taux de succès) par type (serveurs, commutateurs, etc.)
- **Plans d'Action** : 23 plans (52.2% de complétion) avec statuts détaillés

### Test du Mode Statique
```bash
# Lancer le frontend
cd frontend
npm start

# Accéder au Dashboard
# http://localhost:4200/dashboard
```

Voir le fichier `frontend/test-dashboard-static.md` pour les détails complets des tests.

### Retour au Mode Dynamique
Une fois les endpoints backend opérationnels avec l'authentification :
1. Décommenter les appels HTTP dans `dashboard.component.ts`
2. Réactiver la réactivité des filtres
3. Supprimer l'indicateur "MODE DÉMO"
4. Remettre les champs de filtres en mode actif

## 🎯 Optimisations des Graphiques Dashboard

**Statut** : Problèmes de rendu et redimensionnement résolus.

### Problèmes Corrigés
- ❌ **Graphiques trop petits** au chargement initial
- ❌ **Re-rendering en boucle** lors du redimensionnement de la fenêtre
- ❌ **Performance dégradée** avec cycles de détection excessifs
- ❌ **Redimensionnement instable** avec clignotements

### Solutions Implémentées

#### 1. **Système de Dimensions Fixes**
- **ViewChild** : Références directes aux containers de graphiques
- **Calcul dynamique** : Dimensions calculées via `getBoundingClientRect()`
- **Propriétés [view]** : Dimensions fixes passées à chaque graphique ngx-charts
- **Dimensions minimales** : 300x250px garanties sur mobile

#### 2. **Optimisations de Performance**
- **ChangeDetectionStrategy.OnPush** : Réduction des cycles de détection
- **ResizeObserver** : Gestion intelligente du redimensionnement
- **Throttling** : Maximum 1 recalcul toutes les 300ms
- **ChangeDetectorRef** : Contrôle manuel des mises à jour

#### 3. **Structure Optimisée**
```typescript
// Dimensions calculées une seule fois
riskLevelChartView: [number, number] = [400, 300];

// Calcul après initialisation de la vue
ngAfterViewInit(): void {
  setTimeout(() => {
    this.calculateChartDimensions();
    this.setupResizeObserver();
  }, 100);
}
```

#### 4. **Template Structuré**
```html
<div class="chart-container" #riskLevelChartContainer>
  <h3 class="chart-title">Distribution par niveau de risque</h3>
  <div class="chart-wrapper">
    <ngx-charts-pie-chart
      [view]="riskLevelChartView"
      [results]="riskLevelChart">
    </ngx-charts-pie-chart>
  </div>
</div>
```

### Résultats Obtenus
- ✅ **Affichage optimal** : Graphiques de taille appropriée dès le chargement
- ✅ **Redimensionnement stable** : Une seule fois par changement de taille
- ✅ **Performance améliorée** : Pas de re-rendering continu
- ✅ **Responsive fluide** : Adaptation aux breakpoints sans saccades
- ✅ **Budget CSS respecté** : Réduction de 8.05 kB à 6.60 kB

### Tests de Validation
Voir le fichier `frontend/test-charts-optimization.md` pour les procédures de test complètes.

```bash
# Test rapide
cd frontend
npm run build  # ✅ Compilation sans erreurs
npm start      # ✅ Serveur opérationnel
# Ouvrir http://localhost:4200/dashboard
# Redimensionner la fenêtre → Pas de clignotement
```

---

## Structure des Entités

### Category (Catégorie de risque)
- Identifiant unique
- Nom (unique)
- Description
- Dates de création et mise à jour

### Risk (Risque)
- Identifiant unique
- Nom
- Description
- Catégorie
- Niveau d'impact (NEGLIGIBLE à SEVERE)
- Niveau de probabilité (RARE à ALMOST_CERTAIN)
- Score de risque (calculé)
- Statut (IDENTIFIED, IN_ASSESSMENT, MITIGATED, ACCEPTED, CLOSED)
- Plan de mitigation
- Contrôles associés
- Dates de création et mise à jour

### Control (Contrôle)
- Identifiant unique
- Nom
- Description
- Type (PREVENTIVE, DETECTIVE, CORRECTIVE, COMPENSATING)
- Fréquence (CONTINUOUS, DAILY, WEEKLY, etc.)
- Statut (PLANNED, IN_PROGRESS, IMPLEMENTED, etc.)
- Détails d'implémentation
- Risques associés
- Dates de création et mise à jour

### Assessment (Évaluation)
- Identifiant unique
- Risque associé
- Statut (PLANNED, IN_PROGRESS, COMPLETED, CANCELLED)
- Date d'évaluation
- Conclusions
- Recommandations
- Date de prochaine revue
- Dates de création et mise à jour

### User (Utilisateur)
- Identifiant Keycloak
- Nom d'utilisateur (unique)
- Nom complet
- Email (unique)
- Numéro de téléphone
- Département
- Rôles
- Statut actif/inactif
- Dernière connexion
- Évaluations assignées
- Dates de création et mise à jour

## Repositories JPA

### CategoryRepository
- Recherche par nom
- Vérification d'existence par nom

### RiskRepository
- Recherche par catégorie et statut
- Recherche des risques élevés (score minimum)
- Recherche par niveau d'impact et probabilité
- Recherche par catégorie

### ControlRepository
- Recherche par type, statut et fréquence
- Recherche par risque associé
- Recherche des contrôles inefficaces pour les risques actifs

### AssessmentRepository
- Recherche par statut et utilisateur assigné
- Recherche des évaluations en attente de revue
- Recherche des évaluations actives par utilisateur
- Recherche des dernières évaluations par risque

### UserRepository
- Recherche par username et email
- Recherche par département
- Recherche par rôle
- Recherche des utilisateurs actifs avec évaluations en cours
- Vérification d'existence par username/email

## Services Métier

Les services suivants ont été implémentés pour gérer la logique métier de l'application :

### UserService
- Gestion complète des utilisateurs (CRUD)
- Recherche par username, email, département et rôle
- Gestion des rôles utilisateur
- Suivi des connexions utilisateur
- Vérification des utilisateurs avec des évaluations en attente

### RiskService
- Gestion des risques (CRUD)
- Catégorisation des risques
- Évaluation des niveaux d'impact et de probabilité
- Gestion des contrôles associés aux risques
- Suivi des risques par statut et catégorie
- Identification des risques à score élevé

### CategoryService
- Gestion des catégories de risque (CRUD)
- Validation des noms uniques de catégories
- Organisation hiérarchique des risques

### ControlService
- Gestion des contrôles de risque (CRUD)
- Classification par type (préventif, détectif, correctif, compensatoire)
- Suivi de la fréquence d'application
- Évaluation de l'efficacité des contrôles
- Association avec les risques correspondants

### AssessmentService
- Gestion des évaluations de risque (CRUD)
- Attribution des évaluations aux utilisateurs
- Suivi du statut des évaluations
- Planification des revues
- Gestion des conclusions et recommandations
- Historique des évaluations par risque

Chaque service implémente les principes suivants :
- Validation des données entrantes
- Gestion des erreurs avec des exceptions appropriées
- Transactions atomiques pour garantir l'intégrité des données
- Séparation claire des responsabilités

## Contrat des APIs REST

Les contrôleurs REST suivants doivent être implémentés pour exposer les services métier. Chaque contrôleur suit une structure RESTful classique avec endpoints `GET`, `POST`, `PUT`, `DELETE`.

### UserController – `/api/users`
- GET `/` : Lister tous les utilisateurs
- GET `/{id}` : Obtenir un utilisateur par ID
- POST `/` : Créer un utilisateur
- PUT `/{id}` : Mettre à jour un utilisateur
- DELETE `/{id}` : Supprimer un utilisateur
- GET `/active` : Lister les utilisateurs actifs

### RiskController – `/api/risks`
- GET `/` : Lister tous les risques
- GET `/{id}` : Obtenir un risque par ID
- POST `/` : Créer un risque
- PUT `/{id}` : Modifier un risque
- DELETE `/{id}` : Supprimer un risque
- GET `/high-score` : Lister les risques à score élevé
- GET `/category/{id}` : Risques d'une catégorie donnée

### ControlController – `/api/controls`
- GET `/` : Lister tous les contrôles
- GET `/{id}` : Détails d'un contrôle
- POST `/` : Créer un contrôle
- PUT `/{id}` : Modifier un contrôle
- DELETE `/{id}` : Supprimer un contrôle
- GET `/by-risk/{id}` : Contrôles liés à un risque

### CategoryController – `/api/categories`
- GET `/` : Lister les catégories
- GET `/{id}` : Détails d'une catégorie
- POST `/` : Créer une catégorie
- PUT `/{id}` : Modifier une catégorie
- DELETE `/{id}` : Supprimer une catégorie

### AssessmentController – `/api/assessments`
- GET `/` : Lister toutes les évaluations
- GET `/{id}` : Détails d'une évaluation
- POST `/` : Créer une évaluation
- PUT `/{id}` : Modifier une évaluation
- DELETE `/{id}` : Supprimer une évaluation
- GET `/user/{userId}` : Évaluations assignées à un utilisateur

## Développement

Instructions détaillées pour le développement seront ajoutées au fur et à mesure de l'avancement du projet.

## Déploiement

Instructions de déploiement seront ajoutées une fois l'application prête pour la production.

## Licence

Propriétaire - Tous droits réservés

## Structure du Frontend Angular

### Structure des Dossiers 

```
frontend/
├── src/
│   ├── app/
│   │   ├── core/                   # Services et fonctionnalités essentiels
│   │   │   ├── auth/               # Services d'authentification Keycloak
│   │   │   ├── guards/             # Protection des routes
│   │   │   ├── http/               # Intercepteurs HTTP
│   │   │   ├── models/             # Interfaces et classes de base
│   │   │   └── services/           # Services de base (connexion API, etc.)
│   │   ├── shared/                 # Composants, directives et pipes partagés
│   │   │   ├── components/         # Composants réutilisables
│   │   │   ├── directives/         # Directives personnalisées
│   │   │   ├── pipes/              # Pipes personnalisés
│   │   │   └── utils/              # Fonctions utilitaires
│   │   ├── features/               # Modules de fonctionnalités
│   │   │   ├── admin/
│   │   │   │   └── users/          # Module de gestion des utilisateurs
│   │   │   ├── auth/               # Module pour login/logout
│   │   │   ├── risks/              # Module de gestion des risques
│   │   │   ├── controls/           # Module de gestion des contrôles
│   │   │   ├── assessments/        # Module d'évaluations
│   │   │   └── categories/         # Module de catégories
│   │   ├── layout/                 # Composants de mise en page
│   │   │   ├── header/             # En-tête de l'application
│   │   │   ├── sidebar/            # Barre latérale de navigation
│   │   │   ├── footer/             # Pied de page
│   │   │   └── layouts/            # Layouts réutilisables
│   │   ├── pages/
│   │   │   └── dashboard/          # Module de tableau de bord
│   │   ├── app.component.*         # Composant racine de l'application 
│   │   ├── app.module.ts           # Module principal de l'application
│   │   └── app.routes.ts           # Configuration des routes
│   ├── assets/                     # Ressources statiques (images, logos, etc.)
│   ├── environments/               # Configurations d'environnement
│   ├── styles/                     # Fichiers de styles globaux
│   ├── index.html                  # Point d'entrée HTML
│   └── main.ts                     # Point d'entrée TypeScript
├── angular.json                    # Configuration du projet Angular
├── package.json                    # Dépendances et scripts npm
└── tsconfig.json                   # Configuration TypeScript
```

## Frontend - Structure et Lancement

### Dépendances Principales
- **Angular 17.2.0** : Framework frontend moderne avec support des dernières fonctionnalités
- **Angular Material 17.2.0** : Bibliothèque de composants Material Design
- **Keycloak Angular 15.0.0** : Intégration avec Keycloak pour l'authentification
- **RxJS 7.8.0** : Bibliothèque de programmation réactive

### Technologies Utilisées
- **TypeScript** : Langage de programmation typé
- **HTML/CSS** : Standards web pour la structure et le style
- **Angular Material** : Design system complet pour l'interface utilisateur
- **JWT** : Jetons d'authentification sécurisés via Keycloak

### Installation et Lancement

1. **Installer les dépendances**
```bash
cd frontend
npm install
```

2. **Lancer le serveur de développement**
```bash
npm start
# ou
ng serve
```

L'application sera accessible à l'adresse : http://localhost:4200

### Ordre de démarrage recommandé

Pour assurer un démarrage correct de l'ensemble de l'application, suivez l'ordre de lancement suivant :

1. **Démarrer les services Docker (Keycloak et PostgreSQL)**
```bash
cd /chemin/vers/sentinelrisk-norust
docker compose -f docker/docker-compose.yml up -d
```
Vérification : 
- PostgreSQL doit être accessible sur le port 5432
- Keycloak doit être accessible sur http://localhost:8081
- Vous pouvez vous connecter à l'interface d'administration Keycloak : http://localhost:8081/admin (admin/admin)

2. **Lancer le backend Spring Boot**
```bash
cd backend
./mvnw spring-boot:run
```
Vérification :
- Le backend doit être accessible sur http://localhost:8080
- Swagger UI doit être accessible sur http://localhost:8080/swagger-ui.html
- Note : Si Swagger renvoie une erreur 401 Unauthorized, vous devez d'abord obtenir un token JWT et l'inclure dans les requêtes (voir section "Données de test initiales")

3. **Lancer le frontend Angular**
```bash
cd frontend
npm start
```
Vérification :
- Le frontend doit être accessible sur http://localhost:4200
- Vous devriez pouvoir vous connecter avec l'utilisateur créé dans Keycloak

### Notes sur le Développement

- **Mode développement** : L'application est configurée pour communiquer avec le backend sur http://localhost:8080
- **Intégration Keycloak** : L'authentification est gérée via Keycloak (http://localhost:8081)
- **Accès aux API** : Les tokens d'authentification sont automatiquement inclus dans les requêtes HTTP
- **Styles** : L'application utilise le thème indigo-pink de Material Design avec des personnalisations
- **Responsive** : L'interface s'adapte aux différentes tailles d'écran (desktop, tablette, mobile)

### Commandes Utiles

```bash
# Lancer les tests unitaires
npm test

# Créer une version de production
npm run build

# Linting du code
npm run lint
```

### Données de test initiales

Pour faciliter les tests initiaux, suivez ces étapes pour créer des données de base :

#### Création d'un utilisateur Keycloak

1. Connectez-vous à l'interface admin de Keycloak (http://localhost:8081/admin) avec admin/admin
2. Sélectionnez le realm "sentinelrisk"
3. Dans le menu de gauche, cliquez sur "Users" puis "Add user"
4. Remplissez les champs :
   - Username: testuser
   - Email: testuser@example.com
   - First name: Test
   - Last name: User
   - Activez "Email verified"
5. Cliquez sur "Create"
6. Dans l'onglet "Credentials", cliquez sur "Set password"
7. Définissez un mot de passe (ex: password123)
8. Désactivez "Temporary" et cliquez sur "Save"
9. Dans l'onglet "Role mappings", ajoutez les rôles souhaités (ex: user, risk_manager)

#### Génération d'un token d'accès

**Via Postman/curl :**
```bash
curl -X POST \
  http://localhost:8081/realms/sentinelrisk/protocol/openid-connect/token \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'grant_type=password&client_id=sentinelrisk-frontend&username=testuser&password=password123'
```

**Via Swagger UI :**
1. Accédez à http://localhost:8080/swagger-ui.html
2. Cliquez sur "Authorize" en haut à droite
3. Entrez les informations d'identification de l'utilisateur créé
4. Une fois authentifié, le token sera automatiquement inclus dans toutes les requêtes

#### Exemples de Request Body (JSON)

**Créer un utilisateur :**
```json
{
  "username": "jdupont",
  "email": "jean.dupont@example.com",
  "fullName": "Jean Dupont",
  "phoneNumber": "+33612345678",
  "department": "IT",
  "active": true
}
```

**Créer une catégorie :**
```json
{
  "name": "Sécurité des données",
  "description": "Risques liés à la sécurité et à la confidentialité des données"
}
```

**Créer un risque :**
```json
{
  "name": "Fuite de données personnelles",
  "description": "Risque de divulgation non autorisée de données personnelles",
  "categoryId": 1,
  "impactLevel": "HIGH",
  "probabilityLevel": "MEDIUM",
  "status": "IDENTIFIED",
  "mitigationPlan": "Mettre en place un chiffrement de bout en bout"
}
```

**Créer un contrôle :**
```json
{
  "name": "Chiffrement des données sensibles",
  "description": "Mise en place d'un chiffrement AES-256 pour toutes les données sensibles",
  "type": "PREVENTIVE",
  "frequency": "CONTINUOUS",
  "status": "IMPLEMENTED",
  "implementationDetails": "Utilisation de l'API de chiffrement native",
  "riskIds": [1]
}
```

## Modules implémentés

### Module de gestion des utilisateurs
Ce module permet la gestion complète des utilisateurs du système avec les fonctionnalités suivantes :
- Affichage de la liste des utilisateurs
- Création d'un nouvel utilisateur
- Modification des informations d'un utilisateur existant
- Suppression d'un utilisateur
- Gestion du statut actif/inactif

Le module utilise :
- `UserService` pour interagir avec le backend
- `MatDialog` pour les formulaires modaux
- Composants Angular Material (tables, formulaires, badges)
- Styles responsifs pour différentes tailles d'écran

### Module de gestion des risques
Ce module permet la gestion complète des risques avec les fonctionnalités suivantes :
- Affichage de la liste des risques avec indication visuelle des scores et statuts
- Création d'un nouveau risque avec sélection de la catégorie, du niveau d'impact et de probabilité
- Modification des informations d'un risque existant
- Suppression d'un risque
- Visualisation du score de risque calculé

Le module utilise :
- `RiskService` pour interagir avec le backend
- `CategoryService` pour obtenir les catégories disponibles
- Système de badges colorés pour représenter visuellement les niveaux d'impact, de probabilité et le score
- Formulaire complet avec validation des champs obligatoires

## Mapping des rôles

Le système utilise différents rôles pour gérer les accès et les permissions. Voici le mapping détaillé des rôles :

| Nom du rôle          | Rôle dans Keycloak    | Droits dans l'application                                                             |
|----------------------|-----------------------|--------------------------------------------------------------------------------------|
| admin                | admin                 | Accès complet à toutes les fonctionnalités, gestion des utilisateurs et des paramètres système |
| risk_manager         | risk_manager          | Création/modification/suppression des risques et contrôles, accès au tableau de bord  |
| compliance_officer   | compliance_officer    | Création/modification des évaluations, suivi de la conformité, rapports              |
| auditor              | auditor               | Lecture seule sur tous les modules, génération de rapports d'audit                    |
| user                 | user                  | Accès en lecture aux risques, participation aux évaluations assignées                 |

### Détails des permissions par module

#### Dashboard
- **admin**: Accès complet (métriques administratives)
- **risk_manager**: Accès complet (métriques des risques)
- **compliance_officer**: Accès complet (métriques de conformité)
- **auditor**: Accès en lecture seule
- **user**: Accès limité (uniquement métriques personnelles)

#### Gestion des utilisateurs
- **admin**: CRUD complet
- **Autres rôles**: Lecture seule de leur profil

#### Gestion des risques
- **admin**, **risk_manager**: CRUD complet
- **compliance_officer**: Lecture et mise à jour
- **auditor**, **user**: Lecture seule

#### Gestion des contrôles
- **admin**, **risk_manager**: CRUD complet
- **compliance_officer**: Lecture et mise à jour
- **auditor**, **user**: Lecture seule

#### Gestion des évaluations
- **admin**, **compliance_officer**: CRUD complet
- **risk_manager**: Création et lecture
- **auditor**: Lecture seule
- **user**: Lecture des évaluations assignées

## Guide rapide de contribution Angular

Ce guide présente les conventions et pratiques à suivre pour contribuer au développement du frontend Angular.

### Commandes de génération

```bash
# Générer un nouveau composant
ng generate component features/module-name/component-name

# Générer un nouveau module
ng generate module features/module-name --routing

# Générer un nouveau service
ng generate service core/services/service-name

# Générer un nouveau modèle
ng generate interface core/models/model-name
```

### Conventions de nommage

- **Dossiers et fichiers**: kebab-case (ex: `user-profile`, `risk-assessment`)
- **Classes**: PascalCase (ex: `UserService`, `RiskComponent`)
- **Interfaces**: PascalCase avec préfixe "I" pour clarté (ex: `IUser`, `IRisk`)
- **Méthodes et variables**: camelCase (ex: `getUserById()`, `currentUser`)
- **Constantes**: SNAKE_CASE_MAJUSCULE (ex: `API_BASE_URL`)

### Structure des nouveaux modules

Tous les nouveaux modules de fonctionnalité doivent être créés dans le dossier `src/app/features/` avec la structure suivante :

```
features/
└── nom-module/
    ├── components/         # Composants spécifiques au module
    ├── services/           # Services spécifiques au module 
    ├── models/             # Interfaces/types spécifiques au module
    ├── pages/              # Pages principales du module
    ├── nom-module.module.ts
    └── nom-module-routing.module.ts
```

### Bonnes pratiques à respecter

1. **State Management**:
   - Utilisez les services Angular pour la gestion d'état simple
   - Pour une gestion d'état plus complexe, utilisez RxJS BehaviorSubject/Observable

2. **Performance**:
   - Utilisez OnPush ChangeDetectionStrategy quand c'est possible
   - Implémentez ngOnDestroy pour nettoyer les subscriptions RxJS
   - Utilisez trackBy dans les ngFor pour optimiser les rendus de listes

3. **Sécurité**:
   - Utilisez les pipes Angular pour sanitizer le contenu (ex: | async, | safe)
   - N'utilisez jamais innerHTML sans sanitizer
   - Validez toutes les entrées utilisateur côté client ET côté serveur

4. **UX/Accessibilité**:
   - Suivez les directives WCAG pour l'accessibilité
   - Utilisez les composants Material avec aria-labels appropriés
   - Assurez-vous que l'application est utilisable au clavier

5. **Tests**:
   - Écrivez des tests unitaires pour tous les services
   - Testez les scénarios critiques dans les composants
   - Maintenez une couverture de test minimale de 70%

6. **Commits**:
   - Suivez le format: `type(scope): description` (ex: `feat(auth): add login component`)
   - Types communs: feat, fix, docs, style, refactor, test, chore

Pour plus de détails, consultez le fichier CONTRIBUTING.md à la racine du projet.

## Structure du Backend Spring Boot

### Arborescence des packages

```
backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── sentinelrisk/
│   │   │           ├── config/               # Configuration Spring Boot
│   │   │           │   ├── SecurityConfig.java    # Configuration de Spring Security
│   │   │           │   └── OpenApiConfig.java     # Configuration de Swagger/OpenAPI
│   │   │           ├── controller/           # Contrôleurs REST
│   │   │           │   ├── RiskController.java
│   │   │           │   ├── CategoryController.java
│   │   │           │   ├── ControlController.java
│   │   │           │   ├── AssessmentController.java
│   │   │           │   └── UserController.java
│   │   │           ├── model/                # Entités JPA
│   │   │           │   ├── Risk.java
│   │   │           │   ├── Category.java
│   │   │           │   ├── Control.java
│   │   │           │   ├── Assessment.java
│   │   │           │   └── User.java
│   │   │           ├── repository/           # Repositories JPA
│   │   │           │   ├── RiskRepository.java
│   │   │           │   ├── CategoryRepository.java
│   │   │           │   ├── ControlRepository.java
│   │   │           │   ├── AssessmentRepository.java
│   │   │           │   └── UserRepository.java
│   │   │           ├── service/              # Services métier
│   │   │           │   ├── RiskService.java
│   │   │           │   ├── CategoryService.java
│   │   │           │   ├── ControlService.java
│   │   │           │   ├── AssessmentService.java
│   │   │           │   └── UserService.java
│   │   │           └── exception/            # Gestion des exceptions
│   │   │               └── GlobalExceptionHandler.java
│   │   └── resources/
│   │       └── application.yml               # Configuration de l'application
│   └── test/                                 # Tests unitaires et d'intégration
└── pom.xml                                   # Dépendances Maven
```

### Exemples de réponses JSON des APIs

#### GET /api/users - Liste des utilisateurs

```json
[
  {
    "id": "1a2b3c4d-5e6f-7890-abcd-ef1234567890",
    "username": "jdupont",
    "email": "jean.dupont@example.com",
    "firstName": "Jean",
    "lastName": "Dupont",
    "department": "IT",
    "role": "RISK_MANAGER",
    "active": true,
    "lastLogin": "2023-12-15T14:30:45",
    "createdAt": "2023-11-01T09:22:33",
    "updatedAt": "2023-12-15T14:30:45"
  },
  {
    "id": "2b3c4d5e-6f78-90ab-cdef-123456789012",
    "username": "mmartin",
    "email": "marie.martin@example.com",
    "firstName": "Marie",
    "lastName": "Martin",
    "department": "Compliance",
    "role": "COMPLIANCE_OFFICER",
    "active": true,
    "lastLogin": "2023-12-14T10:15:22",
    "createdAt": "2023-11-05T11:08:45",
    "updatedAt": "2023-12-14T10:15:22"
  }
]
```

#### GET /api/risks/{id} - Détail d'un risque

```json
{
  "id": 42,
  "name": "Fuite de données personnelles",
  "description": "Risque de divulgation non autorisée de données personnelles clients",
  "category": {
    "id": 3,
    "name": "Sécurité des données",
    "description": "Risques liés à la sécurité des données"
  },
  "impactLevel": "HIGH",
  "probabilityLevel": "MEDIUM",
  "status": "MITIGATED",
  "score": 12,
  "mitigationPlan": "Mise en place d'un chiffrement de bout en bout et formation du personnel",
  "controls": [
    {
      "id": 15,
      "name": "Chiffrement des données sensibles",
      "type": "PREVENTIVE",
      "status": "IMPLEMENTED"
    },
    {
      "id": 16,
      "name": "Formation sensibilisation RGPD",
      "type": "DETECTIVE",
      "status": "IMPLEMENTED"
    }
  ],
  "createdAt": "2023-10-15T09:45:00",
  "updatedAt": "2023-12-10T14:30:22"
}
```

#### GET /api/categories - Liste des catégories

```json
[
  {
    "id": 1,
    "name": "Risques opérationnels",
    "description": "Risques liés aux opérations et processus internes"
  },
  {
    "id": 2,
    "name": "Risques financiers",
    "description": "Risques liés aux aspects financiers"
  },
  {
    "id": 3,
    "name": "Sécurité des données",
    "description": "Risques liés à la sécurité des données"
  }
]
```

### Gestion des erreurs

Le backend utilise un système centralisé de gestion des erreurs via la classe `GlobalExceptionHandler`. Les exceptions sont capturées et transformées en réponses HTTP avec le code d'état approprié.

#### Types d'erreurs gérées :

- **EntityNotFoundException** : Renvoie un code HTTP 404 (Not Found)
- **MethodArgumentNotValidException** : Renvoie un code HTTP 400 (Bad Request) avec les détails des erreurs de validation
- **AccessDeniedException** : Renvoie un code HTTP 403 (Forbidden)
- **Exceptions génériques** : Renvoie un code HTTP 500 (Internal Server Error)

#### Format des réponses d'erreur :

```json
// Exemple d'erreur 404 (Not Found)
{
  "status": 404,
  "message": "Risk not found with id: 999",
  "timestamp": "2023-12-15T10:30:45.123"
}

// Exemple d'erreur 400 (Bad Request) - validation
{
  "name": "Le nom ne peut pas être vide",
  "email": "Doit être une adresse email valide",
  "impactLevel": "La valeur doit être l'une des suivantes : LOW, MEDIUM, HIGH, SEVERE"
}

// Exemple d'erreur 403 (Forbidden)
{
  "status": 403,
  "message": "Access is denied",
  "timestamp": "2023-12-15T10:35:12.456"
}
```

### Sécurité Backend

Le backend utilise Spring Security intégré avec Keycloak pour l'authentification et l'autorisation.

#### Configuration de la sécurité

- **SecurityConfig.java** : Configure les règles de sécurité et l'intégration avec Keycloak
- **JwtAuthenticationConverter** : Convertit les claims JWT de Keycloak en autorités Spring Security

#### Vérification des rôles

Les contrôleurs utilisent l'annotation `@PreAuthorize` pour vérifier les autorisations :

```java
// Exemple d'accès restreint aux utilisateurs ayant le rôle RISK_MANAGER
@PostMapping
@PreAuthorize("hasRole('RISK_MANAGER')")
public ResponseEntity<Risk> createRisk(@Valid @RequestBody Risk risk) {
    return ResponseEntity.ok(riskService.createRisk(risk));
}

// Exemple d'accès pour plusieurs rôles
@GetMapping("/{id}")
@PreAuthorize("hasAnyRole('RISK_MANAGER', 'COMPLIANCE_OFFICER', 'AUDITOR')")
public ResponseEntity<Risk> getRisk(@PathVariable Long id) {
    return ResponseEntity.ok(riskService.getRiskById(id));
}
```

#### Interaction entre Keycloak et Spring Security

1. **Authentification** : L'utilisateur s'authentifie auprès de Keycloak et obtient un JWT
2. **Requête API** : Le client envoie ce JWT dans l'en-tête Authorization (Bearer)
3. **Validation** : Spring Security valide le JWT auprès de Keycloak
4. **Extraction des rôles** : Les rôles sont extraits du claim "realm_access.roles" du JWT
5. **Autorisation** : Spring Security vérifie les rôles requis pour l'accès à la ressource
6. **Accès** : Si les rôles sont suffisants, l'accès est accordé, sinon une erreur 403 est renvoyée

### Logs et débogage

#### Configuration des logs

Les logs sont configurés dans le fichier `application.yml` :

```yaml
logging:
  level:
    root: INFO
    com.sentinelrisk: DEBUG
    org.springframework.security: DEBUG
    org.springdoc: DEBUG
```

#### Emplacement des logs

Par défaut, les logs sont affichés sur la console. Dans un environnement de production, ils peuvent être configurés pour être écrits dans un fichier.

#### Modification du niveau de log

Pour modifier temporairement le niveau de log (par exemple pour du débogage), utilisez l'API Actuator (si activée) ou modifiez le fichier `application.yml`.

Pour activer des logs plus détaillés, modifiez les niveaux comme suit :

```yaml
logging:
  level:
    root: DEBUG                         # Logs détaillés pour toute l'application
    com.sentinelrisk: TRACE             # Logs très détaillés pour le package sentinelrisk
    org.springframework.security: DEBUG # Logs détaillés pour Spring Security
```

## 📄 Navigation et Routage Angular

### Structure des Routes
- `/auth/login`        => LoginComponent (public)
- `/auth/logout`       => LogoutComponent (public)
- `/auth/home`         => HomeComponent (protégé)
- `/dashboard`         => DashboardModule (lazy loaded, protégé)
- `/users`             => UsersModule (lazy loaded, protégé)
- `/risks`             => RisksModule (lazy loaded, protégé)
- `/controls`          => ControlsModule (lazy loaded, protégé)
- `/categories`        => CategoriesModule (lazy loaded, protégé)
- `/assessments`       => AssessmentsModule (lazy loaded, protégé)
- `/404`               => PageNotFoundComponent (public, fallback)
- `/**`                => Redirection vers `/404` (public, fallback)

### Organisation des Modules
```
frontend/src/app/
├── app-routing.module.ts      # Configuration globale des routes
├── features/
│   ├── admin/
│   │   └── users/             # UsersModule avec ses propres routes
│   ├── auth/                  # AuthModule pour login/logout
│   ├── risks/                 # RisksModule
│   ├── controls/              # ControlsModule
│   ├── categories/            # CategoriesModule
│   └── assessments/           # AssessmentsModule
├── layout/
│   ├── layout.component.ts    # Composant de mise en page principal
│   ├── layout-routing.module.ts # Routes sous le Layout
│   ├── header/                # En-tête de l'application
│   └── sidebar/               # Barre latérale de navigation
├── pages/
│   └── dashboard/             # DashboardModule
└── core/
    └── guards/auth.guard.ts   # Protection des routes
```

### Bonnes pratiques appliquées
- Lazy Loading pour tous les modules de fonctionnalités
- AuthGuard appliqué sur toutes les routes privées
- Route fallback mise en place (PageNotFoundComponent) pour les routes inconnues
- Navigation sécurisée : accès protégé selon l'authentification
- Conventions de nommage respectées (kebab-case pour les chemins de route)

### Notes complémentaires
- Les routes sont déclarées dans layout-routing.module.ts sous LayoutComponent
- Les modules de fonctionnalités sont autonomes et encapsulent leurs propres sous-routes
- Le RouterOutlet principal est situé dans app.component.html
- L'authentification est gérée via Keycloak

## 📡 Services API et Communication avec le Backend

### ApiService Générique
L'application utilise un service API central pour toutes les communications HTTP avec le backend.

```typescript
// core/services/api.service.ts
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${path}`, { params });
  }

  post<T>(path: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}${path}`, body);
  }

  // ... autres méthodes HTTP
}
```

### Architecture des Services
Le projet organise les services en deux niveaux :
1. **ApiService** : service générique au niveau du core qui encapsule les appels HTTP bruts
2. **Services spécifiques** : services par entité qui utilisent l'ApiService pour des opérations métier

### Services Spécifiques Implémentés

| Service | Chemin | Fonctionnalités |
|---------|--------|-----------------|
| UserService | `features/admin/users/services/user.service.ts` | Gestion des utilisateurs (CRUD, filtres) |
| RiskService | `features/risks/services/risk.service.ts` | Gestion des risques (CRUD, filtres par catégorie/statut) |
| ControlService | `features/controls/services/control.service.ts` | Gestion des contrôles (CRUD, filtres par type/statut) |
| CategoryService | `features/categories/services/category.service.ts` | Gestion des catégories de risque (CRUD) |
| AssessmentService | `features/assessments/services/assessment.service.ts` | Gestion des évaluations (CRUD, filtres) |

### Utilisation des Services dans les Composants

```typescript
// Injection du service
constructor(private userService: UserService) {}

// Récupération de données
ngOnInit() {
  this.userService.getUsers().subscribe({
    next: (users) => {
      this.users = users;
      console.log('Utilisateurs récupérés:', users);
    },
    error: (error) => {
      console.error('Erreur:', error);
      // Gestion des erreurs appropriée
    }
  });
}

// Création d'un nouvel élément
createUser(userData: Partial<User>) {
  this.userService.createUser(userData).subscribe({
    next: (createdUser) => {
      // Gestion du succès
      this.loadUsers(); // Rafraîchir la liste
    },
    error: (error) => {
      // Gestion des erreurs
    }
  });
}
```

### Gestion des Erreurs et Tokens

- L'authentification par token JWT est automatiquement gérée via un intercepteur HTTP
- Les tokens sont automatiquement ajoutés aux en-têtes de requête
- Les erreurs 401 (non autorisé) déclenchent un refresh du token ou une redirection vers la page de login
- Les erreurs 403 (interdit) sont gérées au niveau des composants

### Modèles de Données TypeScript

Des interfaces TypeScript complètes ont été créées pour chaque entité:

```typescript
// exemple pour les risques
export interface Risk {
  id: string;
  name: string;
  description: string;
  category: Category;
  impactLevel: ImpactLevel;
  probabilityLevel: ProbabilityLevel;
  score: number;
  status: RiskStatus;
  mitigationPlan?: string;
  controls?: Control[];
  createdAt: Date;
  updatedAt: Date;
}
```

Des énumérations sont également définies pour les valeurs fixes :

```typescript
export enum RiskStatus {
  IDENTIFIED = 'IDENTIFIED',
  IN_ASSESSMENT = 'IN_ASSESSMENT',
  MITIGATED = 'MITIGATED',
  ACCEPTED = 'ACCEPTED',
  CLOSED = 'CLOSED'
}
```
