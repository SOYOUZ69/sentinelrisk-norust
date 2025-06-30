#!/bin/bash

# Script de test pour vérifier la création d'assessment après correction

echo "🧪 Test de création d'assessment après correction de la base de données"
echo "================================================================"

# URL de l'API
API_URL="http://localhost:8080/api/assessments"

# Données de test pour créer un assessment
TEST_DATA='{
  "name": "Test Assessment - Correction DB",
  "description": "Test pour vérifier que la correction de la base fonctionne",
  "startDate": "2025-06-30",
  "endDate": "2025-07-30",
  "status": "IN_PROGRESS",
  "riskIds": [1]
}'

echo "📤 Envoi de la requête de création d'assessment..."
echo "URL: $API_URL"
echo "Données: $TEST_DATA"
echo ""

# Envoi de la requête
RESPONSE=$(curl -s -w "\n%{http_code}" \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d "$TEST_DATA" \
  "$API_URL")

# Extraction du code de statut HTTP
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
RESPONSE_BODY=$(echo "$RESPONSE" | head -n -1)

echo "📥 Réponse reçue:"
echo "Code HTTP: $HTTP_CODE"
echo "Corps de la réponse:"
echo "$RESPONSE_BODY"
echo ""

# Vérification du résultat
if [ "$HTTP_CODE" -eq 201 ] || [ "$HTTP_CODE" -eq 200 ]; then
    echo "✅ SUCCÈS: Assessment créé avec succès!"
    echo "✅ La correction de la base de données a fonctionné!"
else
    echo "❌ ÉCHEC: Erreur lors de la création de l'assessment"
    echo "❌ Code HTTP: $HTTP_CODE"
    echo "❌ Vérifiez que la correction SQL a été appliquée"
fi

echo ""
echo "🔍 Pour vérifier manuellement:"
echo "1. Connectez-vous à PostgreSQL"
echo "2. Exécutez: \\d risk_status_history"
echo "3. Vérifiez qu'il n'y a PAS de colonne 'old_status'"
echo "4. Vérifiez que 'previous_status' n'a PAS de contrainte NOT NULL" 