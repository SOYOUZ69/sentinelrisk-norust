 # 🔄 Automatisation SNMP via Zabbix - Documentation d'Implémentation

## 📋 Vue d'ensemble

Cette implémentation permet la **synchronisation automatique des scans SNMP depuis Zabbix vers SentinelRisk**, créant une solution unifiée où les données manuelles et automatiques coexistent dans la même structure.

### 🎯 Objectifs atteints

✅ **Synchronisation automatique** : Récupération périodique des données SNMP depuis Zabbix  
✅ **Structure unifiée** : Stockage dans les mêmes tables (`SnmpScanHistory` et `SnmpScanHistoryResult`)  
✅ **Interface cohérente** : Les scans automatiques apparaissent avec les scans manuels  
✅ **Interprétation intégrée** : Utilisation du même service d'interprétation des OIDs  
✅ **Monitoring complet** : Tableau de bord d'automatisation avec statistiques en temps réel  

---

## 🏗️ Architecture de l'implémentation

### 📊 Schéma de flux

```
Zabbix Server
     ↓ (API REST)
SnmpZabbixClient
     ↓
SnmpZabbixAutomationService
     ↓ (interprétation)
OidInterpretationService
     ↓ (enregistrement)
SnmpScanHistoryService
     ↓
SnmpScanHistory (DB unifiée)
     ↓
Interface utilisateur
```

### 🔧 Composants principaux

| Composant | Rôle | Localisation |
|-----------|------|--------------|
| **SnmpZabbixAutomationService** | Orchestration des synchronisations | `backend/service/` |
| **SnmpZabbixScheduler** | Planification automatique (cron) | `backend/service/` |
| **SnmpZabbixAutomationController** | API REST pour l'automatisation | `backend/controller/` |
| **SnmpAutomationService** | Service Angular frontend | `frontend/services/` |
| **AutomationDashboardComponent** | Interface utilisateur | `frontend/components/` |

---

## ⚙️ Configuration

### 📄 Backend (application.yml)

```yaml
# Configuration de l'automatisation Zabbix
snmp:
  zabbix:
    sync-interval: "0 0/5 * * * *"  # Synchronisation toutes les 5 minutes
    cleanup-cron: "0 0 2 * * *"     # Nettoyage quotidien à 2h du matin
    enabled: true                   # Activer/désactiver l'automatisation

# Configuration Zabbix - Intégration réelle
zabbix:
  url: ${ZABBIX_URL:http://localhost:8082}
  username: ${ZABBIX_USERNAME:Admin}
  password: ${ZABBIX_PASSWORD:zabbix}
  timeout: 30000
  retry-attempts: 3
```

### 🌍 Variables d'environnement

```bash
# Configuration Zabbix
ZABBIX_URL=http://your-zabbix-server:8082
ZABBIX_USERNAME=your-zabbix-user
ZABBIX_PASSWORD=your-zabbix-password
```

---

## 🚀 Fonctionnalités implémentées

### 1. 🔄 Synchronisation automatique

- **Récurrence** : Toutes les 5 minutes (configurable)
- **Scope** : Tous les hôtes avec items SNMP actifs
- **Filtrage** : Items avec clés commençant par "snmp."
- **Gestion d'erreurs** : Retry automatique et logging détaillé

### 2. 📊 Traitement des données

- **Récupération** : Dernière valeur de chaque item SNMP
- **Interprétation** : Utilisation du service `OidInterpretationService` existant
- **Validation** : Vérification de la cohérence des données
- **Stockage** : Enregistrement avec `username = "zabbix-automation"`

### 3. 🎛️ Interface de gestion

#### Tableau de bord d'automatisation

**Cartes de statut :**
- 🤖 **Scheduler** : État de l'automatisation (RUNNING/DISABLED/ERROR)
- 🌐 **Zabbix** : Connectivité temps réel avec Zabbix
- 📅 **Données** : Fraîcheur des informations (dernière synchronisation)

**Statistiques détaillées :**
- 📈 **Total des scans automatiques** : Compteur global
- 📅 **Scans des dernières 24h** : Activité récente
- ✅ **Taux de succès** : Pourcentage de scans réussis
- ⚙️ **État du planificateur** : Statut en temps réel

**Actions disponibles :**
- 🔄 **Synchronisation manuelle** : Déclenchement immédiat
- 🔌 **Test de connectivité** : Vérification Zabbix
- ↻ **Rafraîchissement auto** : Mise à jour toutes les 30s

### 4. 📡 API REST

| Endpoint | Méthode | Description |
|----------|---------|-------------|
| `/api/snmp/automation/sync` | POST | Synchronisation manuelle complète |
| `/api/snmp/automation/sync/host/{hostId}` | POST | Synchronisation d'un hôte spécifique |
| `/api/snmp/automation/sync/host/{hostId}/detailed` | POST | Sync avec détails du scan créé |
| `/api/snmp/automation/statistics` | GET | Statistiques d'automatisation |
| `/api/snmp/automation/connectivity/test` | GET | Test de connectivité Zabbix |
| `/api/snmp/automation/scheduler/status` | GET | État du scheduler |

---

## 🗄️ Structure des données

### 🔍 Identification des scans automatiques

Les scans automatiques sont identifiables par :
- **username** : `"zabbix-automation"`
- **source** : Données provenant de Zabbix API
- **targetIp** : IP de l'hôte Zabbix
- **targetPort** : Port SNMP (généralement 161)

### 📋 Exemple d'enregistrement

```sql
-- Scan automatique créé par Zabbix
INSERT INTO snmp_scan_history (
  target_ip, target_port, snmp_version, snmp_community,
  username, success, duration_ms, oids_count, successful_oids_count,
  created_at
) VALUES (
  '192.168.1.100', 161, '2c', 'public',
  'zabbix-automation', true, 1250, 5, 5,
  NOW()
);

-- Résultats associés
INSERT INTO snmp_scan_history_result (
  scan_history_id, oid, oid_name, oid_description, oid_category,
  value, formatted_value, snmp_type, status, interpretation,
  success
) VALUES (
  1, '1.3.6.1.2.1.1.3.0', 'sysUpTime[0]', 'Temps de fonctionnement', 'system',
  '142857200', '16 days, 12:47:52', 'timeticks', 'NORMAL', 
  'Système démarré depuis 16 jours, 12 heures, 47 minutes', true
);
```

---

## 🔍 Monitoring et débogage

### 📊 Logs détaillés

Le système génère des logs complets avec emojis pour faciliter le débogage :

```
🔄 AUTOMATION: Démarrage de la synchronisation Zabbix automatique
🏠 HOST: Synchronisation de l'hôte 192.168.1.100 - 5 items trouvés
📊 ITEM: sysUpTime [1.3.6.1.2.1.1.3.0] = 142857200 (timeticks)
✅ INTERPRETATION: Temps de fonctionnement - 16 days, 12:47:52
💾 SAVE: Scan automatique enregistré - ID: 42
📈 STATS: 5 scans réussis / 5 total (100% succès)
```

### 🛠️ Points de surveillance

- **Scheduler Health** : Vérification toutes les 5 minutes
- **Zabbix Connectivity** : Test de connectivité API
- **Database Health** : Surveillance des insertions
- **Performance Metrics** : Durée des synchronisations

### ⚡ Indicateurs de performance

| Métrique | Valeur cible | Action si dépassé |
|----------|-------------|-------------------|
| Durée de sync | < 30s | Log WARNING |
| Taux d'échec | < 5% | Alerte monitoring |
| Connectivité Zabbix | 100% | Notification admin |

---

## 🧪 Tests et validation

### 🔄 Tests de synchronisation

```bash
# Test de synchronisation manuelle
curl -X POST "http://localhost:8080/api/snmp/automation/sync" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Vérification des statistiques
curl -X GET "http://localhost:8080/api/snmp/automation/statistics" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Test de connectivité Zabbix
curl -X GET "http://localhost:8080/api/snmp/automation/connectivity/test" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 📊 Validation des données

```sql
-- Vérifier les scans automatiques récents
SELECT COUNT(*) as automatic_scans_last_hour
FROM snmp_scan_history 
WHERE username = 'zabbix-automation' 
  AND created_at > NOW() - INTERVAL '1 hour';

-- Vérifier la cohérence des interprétations
SELECT status, COUNT(*) as count
FROM snmp_scan_history_result
WHERE scan_history_id IN (
  SELECT id FROM snmp_scan_history 
  WHERE username = 'zabbix-automation'
)
GROUP BY status;
```

---

## 🚨 Gestion d'erreurs

### 🔧 Stratégies de récupération

1. **Échec de connexion Zabbix** : Retry avec délai exponentiel
2. **Erreur d'interprétation** : Log et continuation avec statut ERROR
3. **Échec d'insertion DB** : Rollback et alerte
4. **Timeout de synchronisation** : Interruption gracieuse

### 📋 Codes d'erreur

| Code | Description | Action |
|------|-------------|--------|
| ZABBIX_CONNECTION_FAILED | Connexion Zabbix impossible | Vérifier configuration réseau |
| ZABBIX_AUTH_FAILED | Authentification échouée | Vérifier credentials |
| INTERPRETATION_ERROR | Erreur d'interprétation OID | Log et continuer |
| DATABASE_ERROR | Erreur d'insertion | Rollback et alerte admin |

---

## 🔮 Évolutions futures

### 📈 Améliorations prévues

1. **Configuration dynamique** : Modification des paramètres sans redémarrage
2. **Filtres avancés** : Sélection fine des OIDs à synchroniser
3. **Alertes intelligentes** : Notifications sur seuils configurables
4. **Performance scaling** : Optimisation pour gros volumes
5. **Historique des synchronisations** : Journal détaillé des opérations

### 🎯 Intégrations possibles

- **Grafana** : Tableaux de bord de monitoring
- **Prometheus** : Métriques système
- **Elasticsearch** : Recherche avancée dans les logs
- **Kafka** : Streaming des événements SNMP

---

## 📚 Références et documentation

### 🔗 Liens utiles

- [Documentation Zabbix API](https://www.zabbix.com/documentation/current/manual/api)
- [Spring Boot Scheduling](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.task-execution-and-scheduling)
- [Angular Material](https://material.angular.io/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

### 📄 Fichiers clés

- `SNMP_MODULE_README.md` : Documentation du module SNMP
- `SNMP_MODULE_SUMMARY.md` : Résumé des fonctionnalités
- `ZabbixIntegration.md` : Guide d'intégration Zabbix
- `snmp_history.md` : Structure des données historiques

---

## ✅ Checklist de déploiement

### 🚀 Avant le déploiement

- [ ] Configuration Zabbix server accessible
- [ ] Credentials Zabbix configurés
- [ ] Variables d'environnement définies
- [ ] Migration de base de données appliquée
- [ ] Tests de connectivité validés

### 🔍 Après le déploiement

- [ ] Scheduler activé et fonctionnel
- [ ] Première synchronisation réussie
- [ ] Données visibles dans l'interface
- [ ] Logs propres sans erreurs
- [ ] Monitoring opérationnel

---

*Cette implémentation réalise l'objectif de la **Tâche 2** : automatisation complète des scans SNMP via Zabbix avec intégration transparente dans l'infrastructure SentinelRisk existante.*