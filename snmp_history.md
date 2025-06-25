# 📚 Documentation - Système d'Historique des Scans SNMP

## 🎯 Vue d'ensemble

Le système d'historique des scans SNMP permet de stocker, consulter et analyser tous les scans SNMP manuels effectués dans l'application SentinelRisk. Cette fonctionnalité transforme la page précédemment statique en un véritable outil de suivi et d'analyse des activités de monitoring réseau.

## ✨ Fonctionnalités Principales

### 📊 Tableau de Bord Statistiques
- **Métriques globales** : Total des scans, scans réussis, taux de succès, durée moyenne
- **Indicateurs visuels** : Cartes colorées avec animations
- **Suivi temporel** : Statistiques des dernières 24h

### 🔍 Historique Complet
- **Liste paginée** : Affichage de tous les scans avec pagination
- **Détails enrichis** : IP/Port cible, version SNMP, durée, nombre d'OIDs
- **Statuts visuels** : Codes couleur selon le succès/échec
- **Actions rapides** : Voir détails, relancer, supprimer

### 🎛️ Filtrage et Recherche
- **Recherche par IP** : Trouve tous les scans d'une adresse spécifique  
- **Filtre temporel** : Scans des dernières 24h uniquement
- **Recherche textuelle** : Par IP ou port
- **Réinitialisation** : Bouton pour effacer tous les filtres

### 📋 Gestion des Données
- **🤖 Enregistrement automatique** : Chaque scan manuel réussi est automatiquement enregistré
- **🚫 Détection de doublons** : Évite l'enregistrement de scans identiques dans les 30 secondes
- **👤 Traçabilité utilisateur** : Stockage du nom d'utilisateur qui effectue le scan
- **🧠 Interprétation intelligente** : Analyse automatique des valeurs OID avec statuts (Normal/Warning/Critical)
- **📝 Détails OID enrichis** : Noms, descriptions et formatage des valeurs selon leur type
- **🗑️ Suppression** : Nettoyage manuel ou automatique des anciens scans
- **📊 Statistiques temps réel** : Recalcul automatique des métriques

## 🏗️ Architecture Technique

### Backend (Spring Boot)

#### Modèles de Données
```java
// Table principale
SnmpScanHistory {
    id, targetIp, targetPort, community, snmpVersion,
    success, errorMessage, durationMs, timeoutMs, retries,
    oidsCount, successfulOidsCount, createdAt
}

// Résultats détaillés par OID  
SnmpScanHistoryResult {
    id, scanHistoryId, oid, value, snmpType, success,
    errorMessage, oidName, oidDescription, oidCategory,
    formattedValue, interpretation, status
}
```

#### API REST Endpoints
```
GET    /api/snmp/history              - Liste paginée
GET    /api/snmp/history/{id}         - Détails d'un scan
GET    /api/snmp/history/by-ip/{ip}   - Scans par IP
GET    /api/snmp/history/search?q=    - Recherche
GET    /api/snmp/history/recent?hours= - Scans récents
GET    /api/snmp/history/statistics   - Statistiques globales
DELETE /api/snmp/history/{id}         - Suppression
POST   /api/snmp/history/cleanup      - Nettoyage automatique
```

#### Base de Données
- **Migration V4** : Création des tables avec index optimisés
- **Clés étrangères** : Cascade sur suppression des scans
- **Index** : Sur IP, date, succès pour requêtes rapides
- **Commentaires** : Documentation complète des champs

### Frontend (Angular)

#### Composants
- **ScanHistoryComponent** : Interface principale
- **Modèles TypeScript** : Types stricts pour toutes les données
- **Service dédié** : ScanHistoryService avec cache et utilitaires
- **Styles responsive** : Adaptation mobile/tablette/desktop

#### Fonctionnalités UI
- **Material Design** : Composants Angular Material
- **Animations** : Transitions fluides et feedback visuel
- **Accessibilité** : Conforme WCAG 2.1
- **Mode sombre** : Support du thème sombre système

## 🚀 Utilisation

### Navigation
1. Accéder à **SNMP > Historique** dans le menu principal
2. Consulter les métriques globales en haut de page
3. Utiliser les filtres pour affiner la recherche
4. Cliquer sur les actions pour interagir avec les scans

### Actions Disponibles
- 👁️ **Voir Détails** : Affiche tous les OIDs et leurs valeurs
- 🔄 **Relancer** : Reproduit le scan avec les mêmes paramètres  
- 🗑️ **Supprimer** : Retire le scan de l'historique

### Filtres et Recherche
- **Recherche IP** : Tape `192.168.1.10` pour voir tous ses scans
- **Filtre récent** : Active pour voir seulement les dernières 24h
- **Réinitialiser** : Bouton "Effacer filtres" pour tout réafficher

## 📈 Données Stockées

### Métadonnées du Scan
- **Cible** : IP, port, communauté SNMP, version
- **Configuration** : Timeout, nombre de tentatives
- **Résultats** : Succès global, durée, nombre d'OIDs
- **Horodatage** : Date/heure précise d'exécution

### Détails par OID
- **Identifiant** : OID numérique complet
- **Valeur brute** : Réponse SNMP non traitée
- **Type SNMP** : Integer, OctetString, Counter, etc.
- **Interprétation** : Valeur formatée pour l'utilisateur
- **Statut** : NORMAL, WARNING, CRITICAL, ERROR

## 🔐 Sécurité et Autorisations

### Contrôle d'Accès
- **Lecture** : `admin` et `risk_manager` peuvent consulter
- **Suppression** : Seuls les `admin` peuvent supprimer
- **Nettoyage** : Seuls les `admin` peuvent nettoyer en masse

### Protection des Données
- **Validation** : Contrôles stricts sur tous les paramètres
- **Logs sécurisés** : Pas d'exposition de mots de passe SNMP
- **Audit trail** : Traçabilité des suppressions

## 🎛️ Configuration et Maintenance

### Nettoyage Automatique
```java
// Supprimer les scans > 30 jours (par défaut)
POST /api/snmp/history/cleanup?daysToKeep=30
```

### Optimisation Performance
- **Index DB** : Sur champs fréquemment filtrés
- **Pagination** : Limite la charge des requêtes
- **Cache frontend** : Réduction des appels API

### Monitoring
- **Logs structurés** : Toutes les opérations tracées
- **Métriques** : Compteurs pour usage et performance
- **Alertes** : Surveillance de l'espace disque

## 🔧 Maintenance et Évolutions

### Tâches Régulières
1. **Nettoyage mensuel** : Supprimer les anciens scans
2. **Analyse performance** : Vérifier les temps de réponse
3. **Espace disque** : Surveiller la croissance des données

### Évolutions Futures Suggérées
- **Export CSV/PDF** : Rapports des scans
- **Notifications** : Alertes sur échecs répétés
- **Comparaison** : Diff entre deux scans de la même cible
- **Planification** : Scans récurrents automatisés
- **Dashboard graphique** : Graphiques de tendances
- **API publique** : Intégration avec outils externes

## 📊 Métriques et KPIs

### Indicateurs Suivis
- **Volume** : Nombre total de scans effectués
- **Fiabilité** : Taux de succès global et par période
- **Performance** : Durée moyenne des scans
- **Utilisation** : Scans par utilisateur et par jour
- **Couverture** : Nombre d'équipements uniques scannés

### Tableaux de Bord
- **Vue globale** : Métriques en temps réel
- **Tendances** : Évolution sur 7/30 jours
- **Top équipements** : Plus scannés ou problématiques
- **Alertes** : Équipements en échec répété

## 🤖 Enregistrement Automatique des Scans

### Comment ça fonctionne

L'enregistrement automatique des scans SNMP manuels se déclenche automatiquement à chaque fois qu'un utilisateur effectue un scan via l'interface "SNMP > Scanner manuellement".

#### Flux d'Enregistrement

1. **Déclenchement** : L'utilisateur lance un scan SNMP manuel
2. **Exécution** : Le `SnmpManualScanService` effectue le scan avec snmp4j
3. **Traitement** : Les résultats sont analysés et interprétés
4. **Enregistrement** : Si le scan réussit, il est automatiquement sauvé dans l'historique
5. **Enrichissement** : Les données OID sont enrichies avec noms, descriptions et interprétations

#### Ce qui est enregistré

```java
// Informations principales du scan
- IP et port cibles
- Communauté et version SNMP utilisées  
- Durée d'exécution et configuration (timeout, retries)
- Utilisateur qui a effectué le scan
- Date et heure précise

// Pour chaque OID scanné
- Valeur brute retournée par SNMP
- Type SNMP (Integer, OctetString, etc.)
- Nom et description de l'OID (base de données intégrée)
- Valeur formatée pour affichage (ex: "2.3 GB" au lieu de "2468642")
- Interprétation intelligente (ex: "Utilisation CPU normale" vs "Critique")
- Statut coloré (Normal/Warning/Critical/Error)
```

#### Règles d'Enregistrement

- ✅ **Scans réussis uniquement** : Seuls les scans qui retournent au moins un résultat sont enregistrés
- 🚫 **Détection de doublons** : Les scans identiques dans les 30 secondes sont ignorés
- 👤 **Traçabilité** : Le nom d'utilisateur est automatiquement capturé
- 🧠 **Enrichissement** : Plus de 25 OIDs courants sont reconnus et interprétés automatiquement

#### Service d'Interprétation

Le nouveau `OidInterpretationService` enrichit automatiquement les résultats :

```java
// OIDs système reconnus
"1.3.6.1.2.1.1.1.0" → "sysDescr" - "Description du système"
"1.3.6.1.2.1.1.3.0" → "sysUpTime" - "Temps de fonctionnement" (formaté en jours/heures)
"1.3.6.1.2.1.1.5.0" → "sysName" - "Nom du système"

// OIDs performance Linux/SNMP (UCD-SNMP)
"1.3.6.1.4.1.2021.11.9.0" → "ssCpuUser" - CPU utilisateur (avec seuils d'alerte)
"1.3.6.1.4.1.2021.4.5.0" → "memTotalReal" - Mémoire totale (formatée en GB/MB)
"1.3.6.1.4.1.2021.9.1.9" → "dskPercent" - % utilisation disque (avec alertes)
```

### Intégration dans le Code

#### Côté Service Manual Scan

```java
// Dans SnmpManualScanService.performManualScan()
try {
    // ... exécution du scan SNMP ...
    
    // Enregistrement automatique (ne fait pas échouer le scan en cas d'erreur)
    historyService.saveScanInHistory(request, response);
} catch (Exception e) {
    logger.warn("⚠️ Impossible d'enregistrer le scan dans l'historique: {}", e.getMessage());
    // Le scan continue normalement
}
```

#### Côté Contrôleur

```java
// Ajout automatique du username depuis le contexte de sécurité
@PostMapping("/manual-scan")
public ResponseEntity<SnmpManualScanResponse> performScan(
    @RequestBody SnmpManualScanRequest request,
    Authentication authentication) {
    
    // Ajouter automatiquement l'utilisateur connecté
    if (authentication != null) {
        request.setUsername(authentication.getName());
    }
    
    return scanService.performManualScan(request);
}
```

## 🆘 Dépannage

### Problèmes Courants

#### Historique vide
- **Cause** : Aucun scan manuel effectué OU scans échoués uniquement
- **Solution** : Lancer un scan réussi via "SNMP > Scanner manuellement"

#### Erreur de chargement
- **Cause** : Problème de connexion backend
- **Solution** : Vérifier les logs Spring Boot

#### Performance lente
- **Cause** : Trop de données historiques
- **Solution** : Nettoyer les anciens scans

#### Pagination ne fonctionne pas
- **Cause** : Conflit entre filtres et pagination
- **Solution** : Réinitialiser les filtres avant pagination

### Logs Utiles
```bash
# Backend - logs des scans
grep "SNMP.*scan" /var/log/sentinelrisk/backend.log

# Base de données - requêtes lentes  
grep "slow query" /var/log/postgresql/postgresql.log
```

## 📝 Changelog

### Version 1.0 (Initial)
- ✅ Sauvegarde automatique des scans manuels
- ✅ Interface de consultation avec filtres
- ✅ Statistiques globales et métriques
- ✅ Actions CRUD sur l'historique
- ✅ API REST complète avec documentation
- ✅ Base de données optimisée avec index
- ✅ Interface responsive et accessible

### Améliorations Prévues
- 🔄 Export des données en CSV/Excel
- 🔄 Comparaison entre scans successifs  
- 🔄 Notifications sur échecs répétés
- 🔄 Graphiques de tendances temporelles
- 🔄 API publique pour intégrations tierces

---

📞 **Support** : Pour toute question ou problème, consulter les logs ou contacter l'équipe technique avec les détails du scan concerné. 