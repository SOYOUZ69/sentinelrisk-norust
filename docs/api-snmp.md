# Documentation de l'API SNMP

Cette documentation décrit les endpoints REST disponibles pour l'intégration SNMP avec Zabbix dans l'application SentinelRisk.

## Authentification

Toutes les routes nécessitent une authentification JWT valide. Les tokens doivent être inclus dans l'en-tête `Authorization` :
```
Authorization: Bearer <votre_token_jwt>
```

## Endpoints

### 1. Liste des hôtes SNMP
- **Méthode** : GET
- **URL** : `/api/snmp/assets`
- **Description** : Récupère la liste de tous les hôtes SNMP configurés dans Zabbix
- **Paramètres** : Aucun
- **Exemple** :
```bash
curl -X GET http://localhost:8080/api/snmp/assets
```
- **Réponse** :
```json
{
  "result": [
    {
      "hostid": "10123",
      "host": "router-01",
      "ip": "192.168.1.1",
      "version": "SNMPv2",
      "status": "active"
    }
  ]
}
```

### 2. Détails d'un hôte SNMP
- **Méthode** : GET
- **URL** : `/api/snmp/assets/{hostId}`
- **Description** : Récupère les détails d'un hôte SNMP spécifique
- **Paramètres** :
  - `hostId` (path) : ID de l'hôte Zabbix
- **Exemple** :
```bash
curl -X GET http://localhost:8080/api/snmp/assets/10123
```
- **Réponse** :
```json
{
  "hostid": "10123",
  "host": "router-01",
  "ip": "192.168.1.1",
  "version": "SNMPv2",
  "status": "active"
}
```

### 3. Liste des configurations de scan
- **Méthode** : GET
- **URL** : `/api/snmp/configs`
- **Description** : Récupère la liste des configurations de scan SNMP
- **Paramètres** : Aucun
- **Exemple** :
```bash
curl -X GET http://localhost:8080/api/snmp/configs
```
- **Réponse** :
```json
[
  {
    "id": 1,
    "name": "CPU Usage",
    "oid": "1.3.6.1.4.1.2021.11.9.0",
    "interval": 60,
    "status": "active"
  }
]
```

### 4. Création d'une configuration
- **Méthode** : POST
- **URL** : `/api/snmp/configs`
- **Description** : Crée une nouvelle configuration de scan SNMP
- **Paramètres** :
  - Body : Configuration SNMP
- **Exemple** :
```bash
curl -X POST http://localhost:8080/api/snmp/configs \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Memory Usage",
    "oid": "1.3.6.1.4.1.2021.4.6.0",
    "interval": 300,
    "status": "active"
  }'
```

### 5. Mise à jour d'une configuration
- **Méthode** : PUT
- **URL** : `/api/snmp/configs/{id}`
- **Description** : Met à jour une configuration de scan existante
- **Paramètres** :
  - `id` (path) : ID de la configuration
  - Body : Configuration SNMP mise à jour
- **Exemple** :
```bash
curl -X PUT http://localhost:8080/api/snmp/configs/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "CPU Usage",
    "oid": "1.3.6.1.4.1.2021.11.9.0",
    "interval": 120,
    "status": "active"
  }'
```

### 6. Suppression d'une configuration
- **Méthode** : DELETE
- **URL** : `/api/snmp/configs/{id}`
- **Description** : Supprime une configuration de scan
- **Paramètres** :
  - `id` (path) : ID de la configuration
- **Exemple** :
```bash
curl -X DELETE http://localhost:8080/api/snmp/configs/1
```

### 7. Exécution d'un scan
- **Méthode** : POST
- **URL** : `/api/snmp/configs/{id}/run`
- **Description** : Lance un scan SNMP pour une configuration donnée sur un hôte spécifique
- **Paramètres** :
  - `id` (path) : ID de la configuration
  - `hostId` (query) : ID de l'hôte Zabbix
- **Exemple** :
```bash
curl -X POST "http://localhost:8080/api/snmp/configs/1/run?hostId=10123"
```
- **Réponse** :
```json
{
  "itemid": "23456",
  "name": "CPU Usage",
  "key_": "snmp.get[1.3.6.1.4.1.2021.11.9.0]",
  "status": "active"
}
```

### 8. Historique des scans
- **Méthode** : GET
- **URL** : `/api/snmp/history/{hostId}`
- **Description** : Récupère l'historique des scans SNMP pour un hôte
- **Paramètres** :
  - `hostId` (path) : ID de l'hôte Zabbix
  - `start` (query, optionnel) : Timestamp de début (Unix timestamp)
  - `end` (query, optionnel) : Timestamp de fin (Unix timestamp)
- **Exemple** :
```bash
curl -X GET "http://localhost:8080/api/snmp/history/10123?start=1625097600&end=1625184000"
```
- **Réponse** :
```json
{
  "result": [
    {
      "itemid": "23456",
      "clock": "1625097600",
      "value": "45.2",
      "ns": "123456789"
    }
  ]
}
```

## Gestion des erreurs

Toutes les routes renvoient des réponses d'erreur au format suivant :
```json
{
  "error": "Message d'erreur",
  "status": 400,
  "timestamp": "2025-06-17T15:30:00Z"
}
```

Codes d'erreur courants :
- 400 : Requête invalide
- 401 : Non authentifié
- 403 : Non autorisé
- 404 : Ressource non trouvée
- 500 : Erreur serveur

## Notes d'utilisation

1. Les timestamps sont en format Unix (secondes depuis l'epoch)
2. Les intervalles de scan sont en secondes
3. Les OIDs SNMP doivent être au format standard (ex: 1.3.6.1.4.1.2021.11.9.0)
4. Le mode démo peut être activé via le frontend pour tester sans Zabbix 