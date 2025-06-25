# 🧪 Guide de Test - Scan SNMP Manuel avec Simulateur Docker

## ✅ Configuration du Simulateur SNMP

### 🐳 Lancement du Simulateur Docker
```bash
# Arrêter le conteneur s'il existe
docker stop snmp-simulator 2>/dev/null || true
docker rm snmp-simulator 2>/dev/null || true

# Lancer le simulateur SNMP
docker run -d \
  --name snmp-simulator \
  -p 161:161/udp \
  tandrup/snmpsim

# Vérifier que le conteneur fonctionne
docker ps | grep snmp-simulator
```

### 🔍 Vérification du Simulateur
```bash
# Test avec snmpget (si disponible)
snmpget -v2c -c public 127.0.0.1:161 1.3.6.1.2.1.1.1.0

# Résultat attendu :
# SNMPv2-MIB::sysDescr.0 = STRING: Linux zeus 4.8.6.5-smp #2 SMP Sun Nov 13 14:58:11 CDT 2016 i686
```

## 🎯 Paramètres de Test Confirmés

### 📋 Configuration SNMP Fonctionnelle
- ✅ **Adresse IP** : `127.0.0.1`
- ✅ **Port SNMP** : `161`
- ✅ **Communauté** : `public`
- ✅ **Version SNMP** : `2c`
- ✅ **Timeout** : `5000ms` (5 secondes)
- ✅ **Tentatives** : `3`

### 🎯 OIDs Testés et Fonctionnels

| OID | Description | Valeur Simulée | Type |
|-----|-------------|----------------|------|
| `1.3.6.1.2.1.1.1.0` | System Description | `Linux zeus 4.8.6.5-smp #2 SMP Sun Nov 13 14:58:11 CDT 2016 i686` | OctetString |
| `1.3.6.1.2.1.1.3.0` | System Uptime | `14 days, 8:31:56.00` | TimeTicks |
| `1.3.6.1.2.1.1.5.0` | System Name | `zeus.snmplabs.com (you can change this!)` | OctetString |
| `1.3.6.1.2.1.1.6.0` | System Location | `San Francisco, California, United States` | OctetString |
| `1.3.6.1.2.1.1.4.0` | System Contact | `SNMP Laboratories, info@snmplabs.com` | OctetString |

## 🧪 Tests de l'API Backend

### 1️⃣ Test de Connectivité
```bash
curl -X GET "http://localhost:8080/api/snmp/manual/test-connectivity?ip=127.0.0.1&port=161&community=public&version=2c" | jq .
```

**Résultat attendu :**
```json
{
  "success": true,
  "ip": "127.0.0.1",
  "port": 161,
  "results": [
    {
      "oid": "1.3.6.1.2.1.1.1.0",
      "value": "Linux zeus 4.8.6.5-smp #2 SMP Sun Nov 13 14:58:11 CDT 2016 i686",
      "type": "OctetString",
      "success": true,
      "error": null
    }
  ],
  "error": null,
  "timestamp": "2025-06-23T16:05:52",
  "duration": 21
}
```

### 2️⃣ Test de Scan Complet
```bash
curl -X POST "http://localhost:8080/api/snmp/manual/scan" \
  -H "Content-Type: application/json" \
  -d '{
    "ip": "127.0.0.1",
    "port": 161,
    "community": "public",
    "version": "2c",
    "oids": ["1.3.6.1.2.1.1.1.0", "1.3.6.1.2.1.1.3.0", "1.3.6.1.2.1.1.5.0"],
    "timeout": 5000,
    "retries": 3
  }' | jq .
```

**Résultat attendu :**
```json
{
  "success": true,
  "ip": "127.0.0.1",
  "port": 161,
  "results": [
    {
      "oid": "1.3.6.1.2.1.1.1.0",
      "value": "Linux zeus 4.8.6.5-smp #2 SMP Sun Nov 13 14:58:11 CDT 2016 i686",
      "type": "OctetString",
      "success": true,
      "error": null
    },
    {
      "oid": "1.3.6.1.2.1.1.3.0",
      "value": "14 days, 8:31:56.00",
      "type": "TimeTicks",
      "success": true,
      "error": null
    },
    {
      "oid": "1.3.6.1.2.1.1.5.0",
      "value": "zeus.snmplabs.com (you can change this!)",
      "type": "OctetString",
      "success": true,
      "error": null
    }
  ],
  "error": null,
  "timestamp": "2025-06-23T16:05:52",
  "duration": 13
}
```

## 🎨 Test de l'Interface Angular

### 🚀 Démarrage des Applications
```bash
# Terminal 1 - Backend Spring Boot
cd backend
./mvnw spring-boot:run

# Terminal 2 - Frontend Angular
cd frontend
npm start
```

### 📝 Étapes de Test Frontend

1. **Accéder à l'interface** : http://localhost:4200/snmp/run

2. **Remplir le formulaire** :
   - **Adresse IP** : `127.0.0.1`
   - **Port SNMP** : `161`
   - **Communauté SNMP** : `public`
   - **Version SNMP** : `SNMP v2c`
   - **Timeout** : `5000`
   - **Tentatives** : `3`

3. **OIDs pré-chargés** (5 OIDs par défaut) :
   - `1.3.6.1.2.1.1.1.0` (System Description)
   - `1.3.6.1.2.1.1.3.0` (System Uptime)
   - `1.3.6.1.2.1.1.5.0` (System Name)
   - `1.3.6.1.2.1.1.6.0` (System Location)
   - `1.3.6.1.2.1.1.4.0` (System Contact)

4. **Test de connectivité** :
   - Cliquer sur **"Tester la connectivité"**
   - Vérifier le message : 🟢 **Connectivité réussie (~20ms)**

5. **Lancement du scan** :
   - Cliquer sur **"Lancer le scan"**
   - Observer l'indicateur de progression
   - Vérifier le message : 🟢 **Scan terminé avec succès (~15ms)**

6. **Vérification des résultats** :
   - Tableau avec 5 lignes de résultats
   - Toutes les lignes marquées ✅ **succès**
   - Types SNMP affichés (OctetString, TimeTicks)
   - Valeurs complètes visibles

### 🔍 Vérification Console Navigateur (F12)

**Logs attendus :**
```
🔗 Test de connectivité: {ip: "127.0.0.1", port: 161, community: "public", version: "2c"}
✅ Réponse test connectivité: {success: true, ip: "127.0.0.1", port: 161, ...}
🔍 Lancement du scan: {ip: "127.0.0.1", port: 161, community: "public", version: "2c", oids: [...], ...}
✅ Réponse scan: {success: true, ip: "127.0.0.1", port: 161, results: [...], ...}
```

## 🎯 Scénarios de Test Avancés

### ✅ Test de Succès
- Utiliser les paramètres ci-dessus
- Résultat : ✅ Scan réussi avec tous les OIDs

### ❌ Test d'Échec (IP invalide)
- **IP** : `192.168.999.999`
- Résultat : 🔴 **Échec de connectivité** + message d'erreur

### ❌ Test d'Échec (Port incorrect)
- **Port** : `162`
- Résultat : 🔴 **Timeout** après 5 secondes

### ⚠️ Test Validation (OID invalide)
- **OID** : `invalid.oid`
- Résultat : 🔴 **Erreur de validation** côté frontend

## 🔧 Commandes Utiles

### 📊 Statut du Simulateur
```bash
# Vérifier le conteneur
docker ps | grep snmp-simulator

# Logs du simulateur
docker logs snmp-simulator

# Arrêter le simulateur
docker stop snmp-simulator
```

### 🔄 Redémarrage Rapide
```bash
# Redémarrer tout l'environnement
docker restart snmp-simulator
```

## 🎉 Résultat Attendu

Après ces tests, vous devriez voir :

1. ✅ **Simulateur SNMP** fonctionnel sur localhost:161
2. ✅ **Backend API** répondant correctement
3. ✅ **Frontend Angular** affichant les résultats en temps réel
4. ✅ **Interface utilisateur** moderne et responsive
5. ✅ **Logs console** détaillés pour le debug

---

**🚀 L'intégration SNMP manuelle est maintenant entièrement testée et opérationnelle !** 