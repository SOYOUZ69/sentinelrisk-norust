#!/bin/bash

echo "🔍 Test de l'API des mappings de conformité"
echo "=========================================="

# Test simple sans authentification pour vérifier la structure
echo ""
echo "📋 Test: Vérification de la structure de l'API"
curl -s -X GET "http://localhost:8080/api/risk-compliance-mappings" | head -20

echo ""
echo "✅ Test terminé !"
