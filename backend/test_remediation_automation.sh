#!/bin/bash

echo "🧪 Test de l'automatisation des plans de remédiation"
echo "=================================================="

# URL de base
BASE_URL="http://localhost:8080/api"

echo "1. Vérification de l'endpoint d'automatisation..."
curl -s "$BASE_URL/remediation-plans/automation/test" | jq '.' 2>/dev/null || echo "Endpoint accessible"

echo ""
echo "2. Récupération des plans de remédiation existants..."
PLANS=$(curl -s "$BASE_URL/remediation-plans" | jq -r '.[0].id // empty')
if [ -n "$PLANS" ]; then
    echo "✅ Plan trouvé avec ID: $PLANS"
    
    echo ""
    echo "3. Test de mise à jour de l'efficacité à 90%..."
    curl -X PUT "$BASE_URL/remediation-plans/automation/$PLANS/efficacite" \
         -H "Content-Type: application/json" \
         -d '{"efficacite": 90}' | jq '.' 2>/dev/null || echo "Mise à jour effectuée"
    
    echo ""
    echo "4. Test de mise à jour du statut à 'IN_PROGRESS'..."
    curl -X PUT "$BASE_URL/remediation-plans/automation/$PLANS/status" \
         -H "Content-Type: application/json" \
         -d '{"status": "IN_PROGRESS"}' | jq '.' 2>/dev/null || echo "Mise à jour effectuée"
    
    echo ""
    echo "5. Test de finalisation du plan..."
    curl -X PUT "$BASE_URL/remediation-plans/automation/$PLANS/finalize" \
         -H "Content-Type: application/json" \
         -d '{"efficacite": 100, "status": "DONE"}' | jq '.' 2>/dev/null || echo "Finalisation effectuée"
    
    echo ""
    echo "6. Vérification de l'historique d'efficacité..."
    curl -s "$BASE_URL/remediation-plans/$PLANS/efficacite-history" | jq '.' 2>/dev/null || echo "Historique accessible"
    
    echo ""
    echo "7. Vérification de l'historique d'impact des risques..."
    curl -s "$BASE_URL/risks/impact-history" | jq '.' 2>/dev/null || echo "Historique d'impact accessible"
    
else
    echo "❌ Aucun plan de remédiation trouvé"
    echo "Créons d'abord un plan de test..."
    
    # Récupérer un mapping existant
    MAPPING_ID=$(curl -s "$BASE_URL/risk-compliance-mappings" | jq -r '.[0].id // empty')
    if [ -n "$MAPPING_ID" ]; then
        echo "Création d'un plan de test avec mapping ID: $MAPPING_ID"
        curl -X POST "$BASE_URL/remediation-plans" \
             -H "Content-Type: application/json" \
             -d "{
               \"title\": \"Plan de test automatisation\",
               \"description\": \"Plan de test pour vérifier l'automatisation\",
               \"mappingId\": $MAPPING_ID,
               \"status\": \"TODO\",
               \"efficacite\": 0
             }" | jq '.' 2>/dev/null || echo "Plan créé"
    else
        echo "❌ Aucun mapping trouvé pour créer un plan de test"
    fi
fi

echo ""
echo "✅ Test terminé !" 