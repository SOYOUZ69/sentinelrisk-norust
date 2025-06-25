#!/bin/bash

echo "🧪 Test d'accès à l'historique SNMP"
echo "=================================="

BASE_URL="http://localhost:8080/api/snmp/history"

echo ""
echo "1️⃣ Test endpoint statistiques:"
curl -s "$BASE_URL/statistics" | jq . 2>/dev/null || curl -s "$BASE_URL/statistics"

echo ""
echo ""
echo "2️⃣ Test liste paginée (2 premiers):"
curl -s "$BASE_URL?page=0&size=2" | jq . 2>/dev/null || curl -s "$BASE_URL?page=0&size=2"

echo ""
echo ""
echo "3️⃣ Test scans récents (24h):"
curl -s "$BASE_URL/recent?hours=24" | jq . 2>/dev/null || curl -s "$BASE_URL/recent"

echo ""
echo ""
echo "4️⃣ Test endpoint de test:"
curl -s "$BASE_URL/test-libre"

echo ""
echo ""
echo "✅ Tests terminés ! Si tous les endpoints retournent des données JSON, l'accès fonctionne." 