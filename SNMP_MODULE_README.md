# Module SNMP - SentinelRisk

## Vue d'ensemble

Le module SNMP de SentinelRisk permet l'inventaire automatique des actifs réseau et la collecte de métriques via le protocole SNMP (Simple Network Management Protocol). Ce module supporte les versions SNMP v1, v2c et v3.

## Architecture

### Entités JPA

#### Asset
Représente un actif réseau pouvant être interrogé via SNMP.

**Champs principaux :**
- `id` : Identifiant unique
- `hostname` / `ipAddress` : Adresse de l'actif (au moins un des deux requis)
- `type` : Type d'actif (SERVER, PC, SWITCH, ROUTER, PRINTER, FIREWALL, UPS, OTHER)
- `snmpVersion` : Version SNMP (V1, V2C, V3)
- `community` : Community string pour SNMP v1/v2c
- `snmpV3User`, `authProtocol`, `authPass`, `privProtocol`, `privPass` : Paramètres SNMP v3
- `port` : Port SNMP (défaut: 161)
- `active` : Statut actif/inactif

#### SnmpScanConfig
Configuration d'un scan SNMP pour un actif donné.

**Champs principaux :**
- `id` : Identifiant unique
- `name` : Nom de la configuration
- `asset` : Actif associé (ManyToOne)
- `cronExpression` / `intervalMinutes` : Planification (exclusif)
- `oids` : Liste des OIDs à interroger (JSON)
- `severityThresholds` : Seuils de sévérité par OID (JSON)
- `active` : Statut actif/inactif

#### SnmpScanResult
Résultat d'un scan SNMP.

**Champs principaux :**
- `id` : Identifiant unique
- `config` : Configuration utilisée (ManyToOne)
- `asset` : Actif scanné (ManyToOne)
- `timestamp` : Horodatage du scan
- `values` : Valeurs récupérées par OID (JSON)
- `globalScore` : Score global calculé
- `status` : Statut du scan (SUCCESS, PARTIAL_SUCCESS, FAILURE, TIMEOUT, CONNECTION_ERROR)
- `errorMessage` : Message d'erreur éventuel
- `executionTimeMs` : Temps d'exécution en millisecondes

### Services

#### SnmpService
Service principal pour l'exécution des requêtes SNMP.

**Méthodes principales :**
- `fetchOids(Asset asset, List<String> oids)` : Exécute une requête SNMP GET

**Fonctionnalités :**
- Support des versions SNMP v1, v2c et v3
- Gestion automatique des timeouts et retry
- Conversion des types SNMP vers Java
- Gestion des erreurs avec exceptions typées

#### SnmpScanService
Service d'orchestration des scans SNMP.

**Méthodes principales :**
- `executeScan(SnmpScanConfig config)` : Exécute un scan pour une configuration
- `executeAllActiveScans()` : Exécute tous les scans actifs
- `calculateGlobalScore(...)` : Calcule le score global basé sur les seuils
- `getScanStatistics(Asset asset)` : Obtient les statistiques de scan

#### SnmpScheduler
Composant de planification automatique des scans.

**Fonctionnalités :**
- Exécution périodique des scans (configurable)
- Nettoyage automatique des anciens résultats
- Statistiques d'exécution

### Repositories

Tous les repositories étendent `JpaRepository` et fournissent des méthodes de recherche spécialisées :

- `AssetRepository` : Recherche par hostname, IP, type, version SNMP, etc.
- `SnmpScanConfigRepository` : Recherche par asset, statut, OID, etc.
- `SnmpScanResultRepository` : Recherche par asset, config, période, statut, etc.

## Configuration

### Application Properties

```yaml
# Configuration SNMP
snmp:
  scheduler:
    enabled: true
    interval: 300000  # 5 minutes en millisecondes
  cleanup:
    cron: "0 0 2 * * ?"  # Tous les jours à 2h du matin
    retention-days: 30   # Conserver les résultats pendant 30 jours
```

### Dépendances Maven

```xml
<!-- SNMP4J for SNMP operations -->
<dependency>
    <groupId>org.snmp4j</groupId>
    <artifactId>snmp4j</artifactId>
    <version>3.7.7</version>
</dependency>
```

## Utilisation

### Création d'un Asset

```java
Asset asset = new Asset();
asset.setHostname("server01.example.com");
asset.setType(Asset.AssetType.SERVER);
asset.setSnmpVersion(Asset.SnmpVersion.V2C);
asset.setCommunity("public");
asset.setPort(161);
asset.setActive(true);
```

### Configuration d'un Scan

```java
SnmpScanConfig config = new SnmpScanConfig();
config.setName("Scan CPU et Mémoire");
config.setAsset(asset);
config.setIntervalMinutes(5);
config.setOids(Arrays.asList(
    "1.3.6.1.2.1.25.3.3.1.2",  // CPU Usage
    "1.3.6.1.2.1.25.2.3.1.6"   // Memory Usage
));

// Configuration des seuils de sévérité
Map<String, SnmpScanConfig.SeverityThreshold> thresholds = new HashMap<>();
thresholds.put("1.3.6.1.2.1.25.3.3.1.2", new SnmpScanConfig.SeverityThreshold(
    80.0, 100.0, SeverityLevel.HIGH, "CPU élevé"
));
config.setSeverityThresholds(thresholds);
```

### Exécution Manuelle d'un Scan

```java
@Autowired
private SnmpScanService snmpScanService;

SnmpScanResult result = snmpScanService.executeScan(config);
System.out.println("Statut: " + result.getStatus());
System.out.println("Score: " + result.getGlobalScore());
```

## OIDs Communs

### Informations Système
- `1.3.6.1.2.1.1.1.0` : sysDescr (Description du système)
- `1.3.6.1.2.1.1.3.0` : sysUpTime (Temps de fonctionnement)
- `1.3.6.1.2.1.1.5.0` : sysName (Nom du système)

### CPU et Mémoire
- `1.3.6.1.2.1.25.3.3.1.2` : hrProcessorLoad (Charge CPU)
- `1.3.6.1.2.1.25.2.3.1.6` : hrStorageUsed (Mémoire utilisée)
- `1.3.6.1.2.1.25.2.3.1.5` : hrStorageSize (Taille mémoire totale)

### Interface Réseau
- `1.3.6.1.2.1.2.2.1.10` : ifInOctets (Octets entrants)
- `1.3.6.1.2.1.2.2.1.16` : ifOutOctets (Octets sortants)
- `1.3.6.1.2.1.2.2.1.8` : ifOperStatus (Statut opérationnel)

## Tests

### Tests Unitaires
- `AssetTest` : Validation des entités et règles métier
- `SnmpServiceTest` : Tests du service SNMP avec mocks
- `SnmpScanServiceTest` : Tests du service de scan

### Tests d'Intégration
- `AssetRepositoryTest` : Tests des repositories avec base H2
- `SnmpIntegrationTest` : Tests end-to-end avec agent SNMP simulé

### Exécution des Tests

```bash
# Tests unitaires uniquement
mvn test -Dtest="*Test"

# Tests d'intégration
mvn test -Dtest="*IntegrationTest"

# Tous les tests
mvn test
```

## Sécurité

### SNMP v3
Pour une sécurité optimale, utilisez SNMP v3 avec authentification et chiffrement :

```java
asset.setSnmpVersion(Asset.SnmpVersion.V3);
asset.setSnmpV3User("admin");
asset.setAuthProtocol("SHA");
asset.setAuthPass("authPassword");
asset.setPrivProtocol("AES");
asset.setPrivPass("privPassword");
```

### Bonnes Pratiques
- Utilisez des community strings complexes pour SNMP v1/v2c
- Limitez l'accès SNMP aux adresses IP autorisées
- Surveillez les tentatives d'accès non autorisées
- Chiffrez les mots de passe SNMP v3 en base de données

## Monitoring et Alertes

### Métriques Disponibles
- Nombre de scans réussis/échoués
- Temps d'exécution moyen des scans
- Score global par asset
- Taux de disponibilité des assets

### Alertes Recommandées
- Asset non accessible pendant plus de 30 minutes
- Score global supérieur au seuil critique
- Échec de scan répétés (> 3 fois consécutives)
- Temps d'exécution anormalement élevé

## Troubleshooting

### Problèmes Courants

#### "Timeout" lors des scans
- Vérifier la connectivité réseau
- Augmenter le timeout dans `SnmpService`
- Vérifier la configuration firewall

#### "Community invalide"
- Vérifier la community string configurée
- S'assurer que l'agent SNMP accepte cette community

#### "OID non supporté"
- Vérifier que l'OID existe sur l'agent cible
- Utiliser `snmpwalk` pour explorer les OIDs disponibles

### Logs de Debug

```yaml
logging:
  level:
    com.sentinelrisk.service.SnmpService: DEBUG
    org.snmp4j: DEBUG
```

## Roadmap

### Version 1.1
- [ ] Support SNMP v3 avec USM complet
- [ ] Interface web pour la gestion des assets
- [ ] Graphiques de tendances des métriques

### Version 1.2
- [ ] Découverte automatique d'assets (network scan)
- [ ] Templates de configuration par type d'équipement
- [ ] Export des données vers systèmes externes

### Version 2.0
- [ ] Support SNMP Trap (réception d'alertes)
- [ ] Corrélation avec les risques SentinelRisk
- [ ] Machine Learning pour détection d'anomalies 