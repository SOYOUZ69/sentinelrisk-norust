#!/bin/bash

# Script de test pour l'enregistrement automatique des scans SNMP dans l'historique
# Ce script effectue plusieurs scans SNMP manuels et vérifie qu'ils sont correctement enregistrés

set -e

echo "🧪 === TEST D'ENREGISTREMENT AUTOMATIQUE DES SCANS SNMP ==="

# Configuration
BACKEND_URL="http://localhost:8080"
TARGET_IP="127.0.0.1"  # Loopback pour test local
SNMP_PORT="161"
COMMUNITY="public"

# Couleurs pour l'affichage
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_step() {
    echo -e "${BLUE}📋 $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Fonction pour attendre que le backend soit disponible
wait_for_backend() {
    print_step "Vérification de la disponibilité du backend..."
    
    for i in {1..30}; do
        if curl -s "${BACKEND_URL}/actuator/health" > /dev/null 2>&1; then
            print_success "Backend disponible !"
            return 0
        fi
        echo "Tentative $i/30... Attente du backend"
        sleep 2
    done
    
    print_error "Backend non disponible après 60 secondes"
    return 1
}

# Fonction pour obtenir le nombre de scans dans l'historique
get_scan_count() {
    curl -s "${BACKEND_URL}/api/snmp/history?page=0&size=100" \
        -H "Content-Type: application/json" | \
        jq -r '.totalElements // 0' 2>/dev/null || echo "0"
}

# Fonction pour effectuer un scan SNMP
perform_scan() {
    local oids=("$@")
    local oids_json=$(printf '%s\n' "${oids[@]}" | jq -R . | jq -s .)
    
    print_step "Scan SNMP avec OIDs: ${oids[*]}"
    
    curl -s -X POST "${BACKEND_URL}/api/snmp/manual-scan" \
        -H "Content-Type: application/json" \
        -d "{
            \"ip\": \"${TARGET_IP}\",
            \"port\": ${SNMP_PORT},
            \"community\": \"${COMMUNITY}\",
            \"version\": \"2c\",
            \"oids\": ${oids_json},
            \"timeout\": 3000,
            \"retries\": 1,
            \"username\": \"test-user\"
        }" | jq '.'
}

# Fonction pour vérifier l'historique
check_history() {
    print_step "Vérification de l'historique..."
    
    local history_response=$(curl -s "${BACKEND_URL}/api/snmp/history?page=0&size=10")
    local total_scans=$(echo "$history_response" | jq -r '.totalElements // 0')
    
    echo "Nombre total de scans dans l'historique: $total_scans"
    
    if [ "$total_scans" -gt 0 ]; then
        echo "📋 Derniers scans:"
        echo "$history_response" | jq -r '.content[] | "  - ID: \(.id) | IP: \(.targetIp) | Date: \(.createdAt) | Utilisateur: \(.username // "N/A") | Succès: \(.success)"'
    fi
    
    return $total_scans
}

# Fonction pour tester les statistiques
check_statistics() {
    print_step "Vérification des statistiques..."
    
    local stats=$(curl -s "${BACKEND_URL}/api/snmp/history/statistics")
    echo "📊 Statistiques:"
    echo "$stats" | jq -r '"  Total: \(.totalScans), Réussis: \(.successfulScans), Taux: \(.successRate)%"'
}

# === DÉBUT DES TESTS ===

# Étape 1: Vérifier la disponibilité du backend
if ! wait_for_backend; then
    print_error "Impossible de continuer sans le backend"
    exit 1
fi

# Étape 2: Compter les scans initiaux
initial_count=$(get_scan_count)
print_step "Nombre initial de scans: $initial_count"

# Étape 3: Effectuer des scans de test
print_step "=== SÉRIE DE SCANS DE TEST ==="

# Scan 1: OIDs système basiques
print_step "Test 1: Scan des informations système"
scan1_result=$(perform_scan "1.3.6.1.2.1.1.1.0" "1.3.6.1.2.1.1.5.0" "1.3.6.1.2.1.1.3.0")
echo "$scan1_result"
sleep 1

# Scan 2: OID unique
print_step "Test 2: Scan d'un OID unique"
scan2_result=$(perform_scan "1.3.6.1.2.1.1.6.0")
echo "$scan2_result"
sleep 1

# Scan 3: Tentative de doublon (même OIDs que scan 1)
print_step "Test 3: Tentative de scan dupliqué (devrait être ignoré)"
scan3_result=$(perform_scan "1.3.6.1.2.1.1.1.0" "1.3.6.1.2.1.1.5.0" "1.3.6.1.2.1.1.3.0")
echo "$scan3_result"
sleep 2  # Attendre plus de 30 secondes pour éviter la détection de doublon

# Scan 4: OIDs de performance (pourraient échouer sur localhost)
print_step "Test 4: Scan d'OIDs de performance"
scan4_result=$(perform_scan "1.3.6.1.4.1.2021.11.9.0" "1.3.6.1.4.1.2021.4.5.0")
echo "$scan4_result"
sleep 1

# Étape 4: Vérifier l'historique final
final_count=$(get_scan_count)
print_step "Nombre final de scans: $final_count"

# Calcul du nombre de scans ajoutés
added_scans=$((final_count - initial_count))
print_step "Scans ajoutés: $added_scans"

# Affichage de l'historique
check_history

# Affichage des statistiques
check_statistics

# === ÉVALUATION DES RÉSULTATS ===

print_step "=== ÉVALUATION DES RÉSULTATS ==="

if [ $added_scans -gt 0 ]; then
    print_success "SUCCÈS: $added_scans scans ont été enregistrés dans l'historique"
    
    # Vérifier les détails d'un scan récent
    print_step "Vérification des détails d'un scan récent..."
    latest_scan_id=$(curl -s "${BACKEND_URL}/api/snmp/history?page=0&size=1" | jq -r '.content[0].id // empty')
    
    if [ -n "$latest_scan_id" ]; then
        print_step "Détails du scan ID: $latest_scan_id"
        curl -s "${BACKEND_URL}/api/snmp/history/${latest_scan_id}" | jq '.'
        print_success "Détails du scan récupérés avec succès"
    fi
    
else
    print_warning "ATTENTION: Aucun nouveau scan n'a été enregistré"
    print_step "Possible causes:"
    echo "  - Scans échoués (pas enregistrés par conception)"
    echo "  - Détection de doublons active"
    echo "  - Problème de connectivité SNMP"
fi

# Test de recherche
print_step "Test de recherche dans l'historique..."
search_result=$(curl -s "${BACKEND_URL}/api/snmp/history/search?q=${TARGET_IP}")
search_count=$(echo "$search_result" | jq '. | length')
print_step "Scans trouvés pour IP ${TARGET_IP}: $search_count"

# Test des scans récents
print_step "Test de récupération des scans récents..."
recent_result=$(curl -s "${BACKEND_URL}/api/snmp/history/recent?hours=1")
recent_count=$(echo "$recent_result" | jq '. | length')
print_step "Scans récents (1h): $recent_count"

print_step "=== TEST TERMINÉ ==="

if [ $added_scans -gt 0 ]; then
    print_success "✅ Enregistrement automatique des scans SNMP: FONCTIONNEL"
    exit 0
else
    print_warning "⚠️ Enregistrement automatique des scans SNMP: À VÉRIFIER"
    exit 1
fi 