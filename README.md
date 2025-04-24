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
3. [ ] Développement du backend Spring Boot
   - [x] Configuration de Spring Security avec Keycloak
   - [x] Mise en place des entités de base
   - [ ] Développement des APIs REST
4. [ ] Développement du frontend Angular
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
- GET `/category/{id}` : Risques d’une catégorie donnée

### ControlController – `/api/controls`
- GET `/` : Lister tous les contrôles
- GET `/{id}` : Détails d’un contrôle
- POST `/` : Créer un contrôle
- PUT `/{id}` : Modifier un contrôle
- DELETE `/{id}` : Supprimer un contrôle
- GET `/by-risk/{id}` : Contrôles liés à un risque

### CategoryController – `/api/categories`
- GET `/` : Lister les catégories
- GET `/{id}` : Détails d’une catégorie
- POST `/` : Créer une catégorie
- PUT `/{id}` : Modifier une catégorie
- DELETE `/{id}` : Supprimer une catégorie

### AssessmentController – `/api/assessments`
- GET `/` : Lister toutes les évaluations
- GET `/{id}` : Détails d’une évaluation
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