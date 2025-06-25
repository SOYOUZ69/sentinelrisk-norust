# 🎨 Guide de l'Interface SNMP Améliorée - SentinelRisk

## 📋 Vue d'ensemble

L'interface de scan SNMP manuel a été complètement repensée pour offrir une expérience utilisateur moderne, intuitive et accessible. Cette nouvelle version permet aux utilisateurs non techniques de surveiller facilement leurs équipements réseau.

## 🌟 Nouvelles Fonctionnalités

### 1. **Interface Utilisateur Moderne**
- Design Material Design épuré et professionnel
- Interface responsive (desktop/tablette/mobile)
- Animations fluides et feedback visuel immédiat
- Couleurs et icônes significatives pour chaque type de métrique

### 2. **Sélection de Métriques par Catégories**
Les métriques SNMP sont maintenant organisées en catégories claires :

#### 🖥️ **Système**
- Description du système
- Temps de fonctionnement (uptime)
- Nom du système
- Localisation physique
- Contact administrateur

#### 🧠 **Mémoire**
- Mémoire RAM totale / disponible
- Espace SWAP total / disponible
- Alertes automatiques si RAM < 500 MB

#### ⚡ **Processeur**
- CPU inactif (% disponible)
- Usage CPU utilisateur / système
- Alertes si CPU libre < 10%

#### 💾 **Stockage**
- Espace disque total / disponible
- Pourcentage d'utilisation
- Alertes si espace libre < 2 GB ou utilisation > 90%

#### 🌐 **Réseau**
- Nombre d'interfaces réseau
- Trafic entrant / sortant
- Statistiques de bande passante

#### 📊 **Processus**
- Nombre de processus actifs
- Charge système (load average)
- Alertes si charge > 2

### 3. **Interprétation Intelligente des Valeurs**
- **Conversion automatique** : Octets → KB/MB/GB selon la taille
- **Formatage TimeTicks** : 12345678 ticks → "14 jours, 8h31min"
- **Pourcentages lisibles** : 85.123 → "85.1%"
- **Unités explicites** : Affichage des unités (MB, %, jours, etc.)

### 4. **Système d'Alertes Visuelles**
- 🟢 **Normal** : Valeurs dans les seuils acceptables
- 🟠 **Avertissement** : Valeurs proches des seuils critiques
- 🔴 **Critique** : Valeurs dépassant les seuils de sécurité

### 5. **OIDs Personnalisés**
- Champ dédié pour saisir des OIDs non listés
- Validation du format OID en temps réel
- Ajout facile à la sélection courante

## 🚀 Comment Utiliser l'Interface

### Étape 1 : Configuration de Connexion
1. **Adresse IP** : Saisissez l'IP de l'équipement (ex: 192.168.1.100)
2. **Port** : Généralement 161 pour SNMP
3. **Communauté** : Chaîne d'authentification (souvent "public")
4. **Version SNMP** : Choisissez v1, v2c ou v3
5. **Test de connectivité** : Cliquez pour vérifier la connexion

### Étape 2 : Paramètres Avancés (Optionnel)
- **Timeout** : Délai d'attente par requête (5000ms par défaut)
- **Tentatives** : Nombre de retries en cas d'échec (3 par défaut)

### Étape 3 : Sélection des Métriques
1. **Navigation par onglets** : Cliquez sur les catégories (Système, Mémoire, etc.)
2. **Sélection visuelle** : Cliquez sur les cartes de métriques souhaitées
3. **Chips sélectionnées** : Vérifiez votre sélection en bas
4. **OID personnalisé** : Ajoutez des OIDs spécifiques si nécessaire

### Étape 4 : Lancement et Résultats
1. **Bouton "Lancer le scan"** : Démarre la surveillance
2. **Résultats interprétés** : Valeurs formatées et compréhensibles
3. **Statut visuel** : Couleurs et icônes pour l'état de chaque métrique
4. **Détails techniques** : Valeurs brutes disponibles pour les experts

## 📊 Exemples de Résultats Interprétés

### Avant (Valeur Brute)
```
OID: 1.3.6.1.2.1.1.3.0
Valeur: 121457108
Type: TimeTicks
```

### Après (Interprétation)
```
🕒 Temps de fonctionnement
Valeur: 14 jours, 8h31min
Interprétation: Durée de fonctionnement
Statut: 🟢 Normal
Valeur brute: 121457108 (TimeTicks)
```

### Exemple Critique
```
🧠 Mémoire RAM disponible
Valeur: 256 MB
Interprétation: Mémoire libre (critique si < 500 MB)
Statut: 🔴 Critique
```

## 🎯 Avantages pour les Utilisateurs Non Techniques

### 1. **Simplicité d'Usage**
- Sélection par catégories compréhensibles
- Descriptions claires de chaque métrique
- Pas besoin de connaître les OIDs

### 2. **Compréhension Immédiate**
- Valeurs converties en unités familières
- Interprétation contextuelle de chaque résultat
- Alertes visuelles pour les situations critiques

### 3. **Interface Guidée**
- Tooltips explicatifs sur chaque champ
- Messages d'aide contextuels
- Validation en temps réel des saisies

### 4. **Feedback Visuel**
- Indicateurs de progression
- Confirmations de succès/échec
- Statistiques rapides en temps réel

## 🔧 Configuration pour Test

### Simulateur SNMP Docker
```bash
# Démarrer le simulateur
docker run -d --name snmp-simulator -p 161:161/udp tandrup/snmpsim

# Paramètres de test
IP: 127.0.0.1
Port: 161
Communauté: public
Version: SNMP v2c
```

### Métriques de Test Recommandées
1. **Système** : Description, Uptime, Nom
2. **Mémoire** : RAM totale/disponible (pour tester les alertes)
3. **Réseau** : Nombre d'interfaces, Trafic

## 📱 Design Responsive

L'interface s'adapte automatiquement à tous les écrans :
- **Desktop** : Layout en 2 colonnes (configuration + résultats)
- **Tablette** : Layout en 1 colonne avec navigation optimisée
- **Mobile** : Interface compacte avec éléments empilés

## 🎨 Personnalisation Visuelle

### Couleurs par Catégorie
- **Système** : Bleu (#2196F3)
- **Mémoire** : Vert (#4CAF50)
- **CPU** : Orange (#FF9800)
- **Stockage** : Violet (#9C27B0)
- **Réseau** : Cyan (#00BCD4)
- **Processus** : Marron (#795548)

### États de Santé
- **Normal** : Vert (#4CAF50)
- **Avertissement** : Orange (#FF9800)
- **Critique** : Rouge (#F44336)

## 🚀 Prochaines Améliorations

1. **Graphiques en temps réel** pour les métriques continues
2. **Profils de surveillance** pré-configurés par type d'équipement
3. **Export des résultats** en PDF/Excel
4. **Historique des scans** avec comparaisons
5. **Notifications push** pour les alertes critiques

## 📞 Support

Pour toute question ou suggestion d'amélioration, contactez l'équipe de développement SentinelRisk.

---

*Interface développée avec Angular Material et conçue selon les principes d'accessibilité WCAG 2.1* 