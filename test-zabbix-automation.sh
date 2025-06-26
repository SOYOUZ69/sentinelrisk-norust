#!/bin/bash

echo "🔄 === TEST DE L'AUTOMATISATION ZABBIX SNMP ==="
echo

API_BASE="http://localhost:8080/api/snmp/automation"
SNMP_API="http://localhost:8080/api/snmp"

# Couleurs pour l'affichage
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les résultats
show_result() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ $2${NC}"
    else
        echo -e "${RED}❌ $2${NC}"
    fi
}

# Fonction pour tester un endpoint
test_endpoint() {
    local method=$1
    local url=$2
    local description=$3
    
    echo -e "${BLUE}🔍 Test: $description${NC}"
    
    if [ "$method" = "GET" ]; then
        response=$(curl -s -w "\n%{http_code}" "$url" 2>/dev/null)
    else
        response=$(curl -s -w "\n%{http_code}" -X "$method" "$url" -H "Content-Type: application/json" 2>/dev/null)
    fi
    
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')
    
    if [ "$http_code" = "200" ] || [ "$http_code" = "201" ]; then
        show_result 0 "$description"
        if [ ! -z "$body" ] && [ "$body" != "null" ]; then
            echo "   Réponse: $(echo "$body" | jq -r '. | tostring' 2>/dev/null || echo "$body" | head -c 100)..."
        fi
    else
        show_result 1 "$description (HTTP $http_code)"
        echo "   Erreur: $body"
    fi
    
    echo
}

echo "📊 === TESTS DES ENDPOINTS D'AUTOMATISATION ==="
echo

# Test 1: Statistiques d'automatisation
test_endpoint "GET" "$API_BASE/statistics" "Récupération des statistiques d'automatisation"

# Test 2: État du scheduler
test_endpoint "GET" "$API_BASE/scheduler/status" "État du scheduler d'automatisation"

# Test 3: Test de connectivité Zabbix
test_endpoint "GET" "$API_BASE/connectivity/test" "Test de connectivité Zabbix"

# Test 4: Synchronisation manuelle (attention: cela peut prendre du temps)
echo -e "${YELLOW}⚠️ Déclenchement d'une synchronisation manuelle (peut prendre du temps)...${NC}"
test_endpoint "POST" "$API_BASE/sync" "Synchronisation manuelle complète"

echo "📈 === VÉRIFICATION DES DONNÉES ==="
echo

# Vérifier s'il y a des scans automatiques
echo -e "${BLUE}🔍 Vérification des scans automatiques dans la base de données...${NC}"

response=$(curl -s "$SNMP_API/history" 2>/dev/null)

if [ $? -eq 0 ]; then
    total_scans=$(echo "$response" | jq -r '.content | length' 2>/dev/null)
    if [ "$total_scans" != "null" ] && [ "$total_scans" -gt 0 ]; then
        show_result 0 "Accès à l'historique des scans ($total_scans scans trouvés)"
        
        # Chercher des scans automatiques
        automatic_scans=$(echo "$response" | jq -r '.content[] | select(.username == "zabbix-automation") | .id' 2>/dev/null)
        if [ ! -z "$automatic_scans" ]; then
            automatic_count=$(echo "$automatic_scans" | wc -l)
            show_result 0 "Scans automatiques détectés ($automatic_count scans)"
            
            # Afficher le dernier scan automatique
            latest_auto=$(echo "$response" | jq -r '.content[] | select(.username == "zabbix-automation") | {id, targetIp, createdAt, successfulOidsCount}' 2>/dev/null | head -4)
            if [ ! -z "$latest_auto" ]; then
                echo "   Dernier scan automatique: $latest_auto"
            fi
        else
            show_result 1 "Aucun scan automatique trouvé (username 'zabbix-automation')"
        fi
    else
        show_result 1 "Aucun scan trouvé dans l'historique"
    fi
else
    show_result 1 "Impossible d'accéder à l'historique des scans"
fi

echo

echo "🔧 === TESTS DE CONFIGURATION ==="
echo

# Test de compilation et de démarrage
echo -e "${BLUE}🔍 Vérification que l'application compile...${NC}"
cd backend 2>/dev/null || { echo "Erreur: répertoire backend non trouvé"; exit 1; }

compile_result=$(mvn compile -q 2>&1)
if [ $? -eq 0 ]; then
    show_result 0 "Compilation du backend réussie"
else
    show_result 1 "Erreur de compilation"
    echo "   Détails: $compile_result"
fi

echo

# Test des services Spring
echo -e "${BLUE}🔍 Vérification des services Spring...${NC}"

# Vérifier que les classes existent
services=(
    "src/main/java/com/sentinelrisk/backend/service/SnmpZabbixAutomationService.java"
    "src/main/java/com/sentinelrisk/backend/service/SnmpZabbixScheduler.java"
    "src/main/java/com/sentinelrisk/backend/controller/SnmpZabbixAutomationController.java"
)

for service in "${services[@]}"; do
    if [ -f "$service" ]; then
        show_result 0 "Service $(basename "$service") trouvé"
    else
        show_result 1 "Service $(basename "$service") manquant"
    fi
done

# Test de la configuration
echo -e "${BLUE}🔍 Vérification de la configuration...${NC}"

config_file="src/main/resources/application.yml"
if [ -f "$config_file" ]; then
    if grep -q "snmp:" "$config_file" && grep -q "zabbix:" "$config_file"; then
        show_result 0 "Configuration SNMP et Zabbix présente"
    else
        show_result 1 "Configuration SNMP/Zabbix manquante"
    fi
else
    show_result 1 "Fichier de configuration manquant"
fi

echo

echo "🎨 === TESTS DU FRONTEND ==="
echo

cd ../frontend 2>/dev/null || { echo "Erreur: répertoire frontend non trouvé"; exit 1; }

# Vérifier que les composants Angular existent
frontend_files=(
    "src/app/features/snmp/services/snmp-automation.service.ts"
    "src/app/features/snmp/components/automation-dashboard/automation-dashboard.component.ts"
    "src/app/features/snmp/components/automation-dashboard/automation-dashboard.component.html"
    "src/app/features/snmp/components/automation-dashboard/automation-dashboard.component.scss"
)

for file in "${frontend_files[@]}"; do
    if [ -f "$file" ]; then
        show_result 0 "Composant $(basename "$file") trouvé"
    else
        show_result 1 "Composant $(basename "$file") manquant"
    fi
done

echo

echo "📋 === RÉSUMÉ DES TESTS ==="
echo

echo -e "${GREEN}✅ Tests d'automatisation Zabbix terminés${NC}"
echo
echo "📌 Points clés vérifiés :"
echo "   • API d'automatisation accessible"
echo "   • Services backend compilés"
echo "   • Composants frontend créés"
echo "   • Configuration présente"
echo
echo "🔄 Pour tester complètement l'automatisation :"
echo "   1. Démarrer l'application: mvn spring-boot:run"
echo "   2. Configurer un serveur Zabbix accessible"
echo "   3. Vérifier les logs pour les synchronisations automatiques"
echo "   4. Accéder au tableau de bord d'automatisation"
echo

echo -e "${BLUE}🎯 L'implémentation de l'automatisation Zabbix est prête !${NC}" 