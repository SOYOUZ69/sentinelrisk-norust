# Intégration de Zabbix dans SentinelRisk

Ce document décrit l'intégration de Zabbix comme moteur de collecte SNMP dans SentinelRisk.

## Déploiement de Zabbix

### Prérequis
- Docker et Docker Compose installés
- Ports disponibles : 8082 (UI Zabbix), 10051 (Zabbix Server)

### Démarrage
1. Lancer les conteneurs :
```bash
docker-compose up -d
```

2. Attendre que tous les services soient démarrés (environ 1-2 minutes)

3. Accéder à l'interface web Zabbix :
   - URL : http://localhost:8082
   - Identifiants par défaut :
     - Utilisateur : Admin
     - Mot de passe : zabbix

## Configuration de Zabbix

### Ajout d'un hôte SNMP
1. Dans l'interface web Zabbix, aller dans "Configuration" > "Hôtes"
2. Cliquer sur "Créer un hôte"
3. Remplir les informations :
   - Nom de l'hôte
   - Groupe (ex: "SNMP Devices")
   - Interface SNMP avec l'IP de l'équipement
4. Dans l'onglet "SNMP", configurer :
   - Version SNMP (v1, v2c, v3)
   - Community string ou credentials
5. Sauvegarder

### Configuration des items SNMP
1. Sélectionner l'hôte créé
2. Aller dans l'onglet "Items"
3. Cliquer sur "Créer un item"
4. Configurer :
   - Nom
   - Type : SNMP agent
   - SNMP OID
   - Type de données
   - Intervalle de mise à jour

## API REST SentinelRisk

### Endpoints disponibles

#### Liste des hôtes
```http
GET /api/snmp/zabbix/hosts
```
Réponse :
```json
[
  {
    "hostid": "10084",
    "host": "switch-01",
    "name": "Switch Principal",
    "status": "0"
  }
]
```

#### Items d'un hôte
```http
GET /api/snmp/zabbix/hosts/{hostId}/items
```
Réponse :
```json
[
  {
    "itemid": "28415",
    "name": "CPU Usage",
    "key": "snmp.cpu.usage",
    "lastvalue": "45.2",
    "status": "0"
  }
]
```

#### Historique d'un item
```http
GET /api/snmp/zabbix/items/{itemId}/history?start=1646092800&end=1646179200
```
Réponse :
```json
[
  {
    "itemid": "28415",
    "clock": "1646092800",
    "value": "45.2",
    "ns": "123456789"
  }
]
```

## Exemples de requêtes JSON-RPC Zabbix

### Authentification
```json
{
  "jsonrpc": "2.0",
  "method": "user.login",
  "params": {
    "user": "Admin",
    "password": "zabbix"
  },
  "id": 1
}
```

### Liste des hôtes
```json
{
  "jsonrpc": "2.0",
  "method": "host.get",
  "params": {
    "output": ["hostid", "host", "name", "status"]
  },
  "auth": "YOUR_AUTH_TOKEN",
  "id": 2
}
```

### Items d'un hôte
```json
{
  "jsonrpc": "2.0",
  "method": "item.get",
  "params": {
    "output": ["itemid", "name", "key_", "lastvalue", "status"],
    "filter": {
      "hostid": "10084"
    }
  },
  "auth": "YOUR_AUTH_TOKEN",
  "id": 3
}
```

### Historique d'un item
```json
{
  "jsonrpc": "2.0",
  "method": "history.get",
  "params": {
    "output": "extend",
    "history": 0,
    "itemids": "28415",
    "time_from": 1646092800,
    "time_till": 1646179200,
    "sortfield": "clock",
    "sortorder": "DESC"
  },
  "auth": "YOUR_AUTH_TOKEN",
  "id": 4
}
```

## Dépannage

### Problèmes courants

1. **Zabbix Server ne démarre pas**
   - Vérifier les logs : `docker-compose logs zabbix-server`
   - S'assurer que la base de données est accessible

2. **Erreurs d'authentification API**
   - Vérifier les credentials dans `application.yml`
   - S'assurer que l'utilisateur a les droits API dans Zabbix

3. **Pas de données SNMP**
   - Vérifier la connectivité SNMP vers l'équipement
   - Vérifier les community strings ou credentials SNMP
   - Tester avec snmpwalk : `snmpwalk -v2c -c public IP_EQUIPEMENT OID` 