#!/bin/bash

# Script de test des autorisations SentinelRisk
# Usage: ./test-auth-script.sh [TOKEN]

API_BASE="http://localhost:8080/api"
COLOR_RED='\033[0;31m'
COLOR_GREEN='\033[0;32m'
COLOR_BLUE='\033[0;34m'
COLOR_YELLOW='\033[1;33m'
COLOR_NC='\033[0m' # No Color

# Fonction pour afficher les résultats
print_result() {
    local endpoint="$1"
    local expected="$2"
    local actual="$3"
    
    if [ "$expected" = "200" ] && [ "$actual" = "200" ]; then
        echo -e "${COLOR_GREEN}✅ $endpoint - SUCCÈS (attendu: accès autorisé)${COLOR_NC}"
    elif [ "$expected" = "403" ] && [ "$actual" = "403" ]; then
        echo -e "${COLOR_GREEN}✅ $endpoint - SUCCÈS (attendu: accès refusé)${COLOR_NC}"
    elif [ "$expected" = "401" ] && [ "$actual" = "401" ]; then
        echo -e "${COLOR_YELLOW}⚠️  $endpoint - Token manquant/invalide${COLOR_NC}"
    else
        echo -e "${COLOR_RED}❌ $endpoint - ÉCHEC (attendu: $expected, reçu: $actual)${COLOR_NC}"
    fi
}

# Fonction pour tester un endpoint
test_endpoint() {
    local endpoint="$1"
    local expected_status="$2"
    local method="${3:-GET}"
    
    if [ -z "$TOKEN" ]; then
        echo -e "${COLOR_YELLOW}⚠️  Token manquant pour $endpoint${COLOR_NC}"
        return
    fi
    
    local response_code
    if [ "$method" = "GET" ]; then
        response_code=$(curl -s -o /dev/null -w "%{http_code}" \
            -H "Authorization: Bearer $TOKEN" \
            -H "Content-Type: application/json" \
            "$API_BASE$endpoint")
    else
        response_code=$(curl -s -o /dev/null -w "%{http_code}" \
            -X "$method" \
            -H "Authorization: Bearer $TOKEN" \
            -H "Content-Type: application/json" \
            "$API_BASE$endpoint")
    fi
    
    print_result "$method $endpoint" "$expected_status" "$response_code"
}

# Récupération du token
if [ -z "$1" ]; then
    echo -e "${COLOR_BLUE}🔑 Token JWT requis pour les tests${COLOR_NC}"
    echo "Usage: $0 [TOKEN]"
    echo ""
    echo "Pour récupérer le token :"
    echo "1. Se connecter sur http://localhost:4200"
    echo "2. Ouvrir les outils de développement (F12)"
    echo "3. Dans la console, taper : localStorage.getItem('kc-token')"
    echo "4. Copier le token (sans les guillemets)"
    echo ""
    echo -e "${COLOR_YELLOW}Test sans token (endpoints publics seulement)...${COLOR_NC}"
    TOKEN=""
else
    TOKEN="$1"
    echo -e "${COLOR_BLUE}🧪 Test des autorisations avec token fourni${COLOR_NC}"
fi

echo ""
echo "=================================="
echo "🔓 ENDPOINTS PUBLICS"
echo "=================================="

# Test endpoints publics (sans token)
test_endpoint "/auth-test/user-info" "200"

if [ -n "$TOKEN" ]; then
    echo ""
    echo "=================================="
    echo "🔐 ENDPOINTS AUTHENTIFIÉS"
    echo "=================================="
    
    # Test endpoints qui nécessitent une authentification
    echo ""
    echo "🧪 Tests généraux (tous rôles):"
    test_endpoint "/auth-test/any-role" "200"
    test_endpoint "/dashboard/summary/global" "200"
    test_endpoint "/dashboard/summary/risks" "200"
    test_endpoint "/risks" "200"
    
    echo ""
    echo "🔴 Tests ADMIN uniquement:"
    test_endpoint "/auth-test/admin-only" "200"  # 200 si admin, 403 sinon
    test_endpoint "/users" "200"                 # 200 si admin, 403 sinon
    
    echo ""
    echo "🎯 Tests RISK_MANAGER:"
    test_endpoint "/auth-test/risk-manager-only" "200"  # 200 si risk_manager, 403 sinon
    test_endpoint "/snmp/assets" "200"                  # 200 si admin/risk_manager, 403 sinon
    test_endpoint "/dashboard/summary/snmp" "200"       # 200 si admin/risk_manager, 403 sinon
    
    echo ""
    echo "📋 Tests COMPLIANCE_OFFICER:"
    test_endpoint "/auth-test/compliance-only" "200"    # 200 si compliance, 403 sinon
    test_endpoint "/dashboard/summary/compliance" "200" # 200 si admin/compliance/risk/auditor, 403 si user
    
    echo ""
    echo "✏️  Tests de modification (POST/PUT/DELETE):"
    test_endpoint "/risks" "201" "POST"          # 201/200 si admin/risk_manager, 403 sinon
    test_endpoint "/users" "201" "POST"          # 201/200 si admin, 403 sinon
    test_endpoint "/assessments" "201" "POST"    # 201/200 si admin/compliance, 403 sinon
    
else
    echo ""
    echo "=================================="
    echo "🔒 ENDPOINTS PROTÉGÉS (sans token)"
    echo "=================================="
    
    # Test endpoints protégés sans token (doivent retourner 401)
    test_endpoint "/users" "401"
    test_endpoint "/risks" "401"
    test_endpoint "/dashboard/summary/global" "401"
    test_endpoint "/auth-test/admin-only" "401"
fi

echo ""
echo "=================================="
echo "📊 RÉSUMÉ DES TESTS"
echo "=================================="

if [ -n "$TOKEN" ]; then
    echo -e "${COLOR_BLUE}ℹ️  Tests effectués avec token JWT${COLOR_NC}"
    echo ""
    echo "Interprétation des résultats :"
    echo "- ✅ Succès : Le comportement correspond aux attentes"
    echo "- ❌ Échec : Le comportement ne correspond pas aux attentes"
    echo ""
    echo "Pour les endpoints spécifiques à un rôle :"
    echo "- Si vous avez le rôle requis : attendu = 200 (succès)"
    echo "- Si vous n'avez pas le rôle : attendu = 403 (refusé)"
    echo ""
    echo -e "${COLOR_YELLOW}💡 Conseil : Testez avec différents rôles pour valider complètement${COLOR_NC}"
else
    echo -e "${COLOR_YELLOW}⚠️  Tests limités sans token JWT${COLOR_NC}"
    echo "Relancez le script avec un token pour des tests complets"
fi

echo ""
echo -e "${COLOR_BLUE}🔗 Pour plus de détails, consultez :${COLOR_NC}"
echo "- test-authorization.md : Guide de test manuel"
echo "- CORRECTIONS_AUTORISATIONS.md : Documentation des corrections" 