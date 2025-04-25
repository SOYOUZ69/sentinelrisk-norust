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
   - [x] Configuration de Spring Security avec Keycloak
   - [x] Mise en place des entités de base
   - [x] Développement des APIs REST
4. [ ] Développement du frontend Angular
   - [ ] Initialisation du projet Angular
     - [ ] Création avec routing activé et SCSS
     - [ ] Structure initiale (`pages`, `components`, `services`, etc.)
   - [ ] Installation des dépendances
     - [ ] Angular Material
     - [ ] ngx-translate (traduction)
     - [ ] keycloak-js (authentification)
     - [ ] Autres utilitaires (lodash, date-fns...)
   - [ ] Setup du thème et layout
     - [ ] Configuration Angular Material (couleurs, typographie)
     - [ ] Mise en place d'un layout de base : Header / Sidebar / Footer
     - [ ] Responsive design
   - [ ] Intégration de Keycloak
     - [ ] Configuration du service d'authentification
     - [ ] AuthGuard pour les routes sécurisées
     - [ ] Login / Logout / Refresh token
   - [ ] Mise en place de la navigation
     - [ ] Configuration des routes et modules
     - [ ] Routes publiques vs privées
     - [ ] Redirections et fallback
   - [ ] Définition des modèles TypeScript
     - [ ] User, Risk, Control, Category, Assessment
   - [ ] Services pour communication API
     - [ ] ApiService générique
     - [ ] Services spécifiques : UserService, RiskService, etc.
     - [ ] Gestion automatique des tokens
   - [ ] Développement des pages
     - [ ] Dashboard
     - [ ] Utilisateurs (liste, détails, création, édition, suppression)
     - [ ] Risques (liste, fiche, création, édition, suppression)
     - [ ] Contrôles
     - [ ] Catégories
     - [ ] Évaluations
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
│   │   │   ├── dashboard/          # Module de tableau de bord
│   │   │   ├── risks/              # Module de gestion des risques
│   │   │   ├── controls/           # Module de gestion des contrôles
│   │   │   ├── assessments/        # Module d'évaluations
│   │   │   ├── categories/         # Module de catégories
│   │   │   └── users/              # Module de gestion des utilisateurs
│   │   ├── layout/                 # Composants de mise en page
│   │   │   ├── header/             # En-tête de l'application
│   │   │   ├── sidebar/            # Barre latérale de navigation
│   │   │   ├── footer/             # Pied de page
│   │   │   └── layouts/            # Layouts réutilisables
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