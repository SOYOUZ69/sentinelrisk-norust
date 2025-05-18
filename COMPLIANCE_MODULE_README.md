# Module de Conformité pour SentinelRisk

Ce module permet la gestion des référentiels normatifs (frameworks de conformité) et de leurs exigences, ainsi que le mappage de ces exigences avec les risques identifiés dans l'application.

## Fonctionnalités implémentées

1. **Gestion des frameworks de conformité**
   - Création, consultation, mise à jour et suppression de frameworks
   - Validation de l'unicité nom/version
   - Chargement initial de frameworks prédéfinis (ISO 27001, GDPR, NIST, SOC 2)

2. **Gestion des exigences de conformité**
   - Création, consultation, mise à jour et suppression d'exigences
   - Association à un framework
   - Classification par type (PREVENTIVE, DETECTIVE, CORRECTIVE)
   - Filtrage par framework et par type

3. **Mappage risques-conformité**
   - Association entre risques et exigences de conformité
   - Suivi du statut de conformité (COMPLIANT, NON_COMPLIANT, PARTIALLY_COMPLIANT, NOT_APPLICABLE)
   - Documentation des preuves et plans d'action

4. **Analyse d'écarts (Gap Analysis)**
   - Identification des exigences non encore mappées à un risque
   - Calcul du pourcentage de conformité d'un risque par rapport à un framework

5. **Import initial de données**
   - Chargement automatique au démarrage des frameworks et exigences depuis un fichier CSV
   - Mise à jour des descriptions sans duplication

## Structure technique

### Entités

- `ComplianceFramework`: Référentiel normatif (ex: ISO 27001, GDPR)
- `ComplianceRequirement`: Exigence spécifique d'un framework (ex: ISO 27001 A.5.1)
- `RiskComplianceMapping`: Association entre un risque et une exigence, avec statut de conformité

### Repositories

- `ComplianceFrameworkRepository`: Accès aux frameworks
- `ComplianceRequirementRepository`: Accès aux exigences avec filtrage par framework
- `RiskComplianceMappingRepository`: Accès aux mappings avec filtrage par risque ou framework

### Services

- `ComplianceFrameworkService`: Gestion des frameworks avec validation de l'unicité
- `ComplianceRequirementService`: Gestion des exigences avec validation d'appartenance à un framework
- `RiskComplianceMappingService`: Création de mappings, analyse d'écarts, calcul de conformité

### Contrôleurs REST

- `ComplianceFrameworkResource`: API CRUD pour les frameworks (`/api/compliance-frameworks`)
- `ComplianceRequirementResource`: API CRUD pour les exigences (`/api/compliance-requirements`)
- `RiskComplianceMappingResource`: API CRUD pour les mappings (`/api/risk-compliance-mappings`)

### Utilitaires

- `ComplianceDataLoader`: Chargement initial des données de conformité depuis CSV

## Sécurité et contrôles d'accès

Les accès aux ressources sont protégés par des rôles :

| Endpoint                          | ADMIN | RISK_MANAGER | COMPLIANCE_OFFICER | AUDITOR | USER |
|-----------------------------------|-------|--------------|-------------------|---------|------|
| GET frameworks/requirements       | ✅    | ✅           | ✅                | ✅      | ❌   |
| POST/PUT frameworks/requirements  | ✅    | ❌           | ✅                | ❌      | ❌   |
| DELETE frameworks                 | ✅    | ❌           | ❌                | ❌      | ❌   |
| GET/POST/PUT mappings             | ✅    | ✅           | ✅                | ❌      | ❌   |
| DELETE mappings                   | ✅    | ❌           | ✅                | ❌      | ❌   |
| Gap Analysis                      | ✅    | ✅           | ✅                | ❌      | ❌   |
| Compliance Percentage             | ✅    | ✅           | ✅                | ✅      | ❌   |

## Données pré-chargées

Le module vient avec des données pré-chargées pour 4 frameworks majeurs :

1. **ISO 27001 (2022)** - 7 exigences de base
2. **GDPR (2016)** - 10 articles clés
3. **NIST SP 800-53 (Rev. 5)** - 8 contrôles essentiels
4. **SOC 2 (2017)** - 8 critères communs

Ces données sont chargées automatiquement au démarrage de l'application en environnement de développement.

## Tests

Le module inclut des tests unitaires et d'intégration :

- Tests unitaires pour les services avec Mockito
- Tests d'intégration pour les contrôleurs REST avec MockMvc
- Couverture de tests > 80%

## Utilisation

### Créer un framework
```http
POST /api/compliance-frameworks
{
  "name": "PCI DSS",
  "version": "4.0",
  "description": "Payment Card Industry Data Security Standard"
}
```

### Créer une exigence
```http
POST /api/compliance-requirements
{
  "framework": {"id": 1},
  "code": "Req 1.1",
  "description": "Installer et maintenir une configuration de pare-feu",
  "type": "PREVENTIVE"
}
```

### Mapper un risque à une exigence
```http
POST /api/risk-compliance-mappings
{
  "risk": {"id": 5},
  "requirement": {"id": 2},
  "status": "PARTIALLY_COMPLIANT",
  "evidence": "Pare-feu en place mais configuration incomplète",
  "remediationPlan": "Mettre à jour les règles de filtrage"
}
```

### Analyser les écarts pour un risque
```http
GET /api/risk-compliance-mappings/gap-analysis?riskId=5&frameworkId=1
```

### Calculer le pourcentage de conformité
```http
GET /api/risk-compliance-mappings/compliance-percentage?riskId=5&frameworkId=1
```

## Optimisation de la Sérialisation JSON

Pour éviter les problèmes de récursion infinie lors de la sérialisation JSON des entités avec des relations bidirectionnelles, les annotations Jackson suivantes ont été ajoutées :

1. **Dans la classe `ComplianceFramework`** :
   ```java
   @OneToMany(mappedBy = "framework", cascade = CascadeType.ALL, orphanRemoval = true)
   @JsonManagedReference
   private Set<ComplianceRequirement> requirements = new HashSet<>();
   ```

2. **Dans la classe `ComplianceRequirement`** :
   ```java
   @ManyToOne(fetch = FetchType.LAZY)
   @JoinColumn(name = "framework_id", nullable = false)
   @JsonBackReference
   private ComplianceFramework framework;
   ```

3. **Dans la classe `RiskComplianceMapping`** :
   ```java
   @ManyToOne(fetch = FetchType.LAZY)
   @JoinColumn(name = "requirement_id", nullable = false)
   @JsonBackReference
   private ComplianceRequirement requirement;
   ```

L'annotation `@JsonManagedReference` indique le côté principal de la relation (le parent), tandis que `@JsonBackReference` indique le côté secondaire (l'enfant) qui ne sera pas sérialisé lors de la conversion en JSON. Cela permet de conserver la navigation bidirectionnelle en JPA tout en évitant les boucles infinies lors de la sérialisation JSON.

Des tests d'intégration ont été ajoutés pour vérifier que la sérialisation fonctionne correctement sans récursion. 