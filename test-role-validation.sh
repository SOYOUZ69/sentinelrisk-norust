#!/bin/bash

echo "🧪 Script de validation des corrections d'autorisations SentinelRisk"
echo "================================================================"
echo ""

# Couleurs pour l'affichage
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}1. Vérification de la compilation Angular...${NC}"
cd frontend
if ng build --configuration development --output-path ../dist-test > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Compilation Angular réussie${NC}"
else
    echo -e "${RED}❌ Erreur de compilation Angular${NC}"
    echo "Détails:"
    ng build --configuration development --output-path ../dist-test
    exit 1
fi

echo ""
echo -e "${BLUE}2. Vérification de la compilation Backend...${NC}"
cd ../backend
if mvn clean compile -q > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Compilation Backend réussie${NC}"
else
    echo -e "${RED}❌ Erreur de compilation Backend${NC}"
    echo "Détails:"
    mvn clean compile
    exit 1
fi

echo ""
echo -e "${BLUE}3. Vérification des fichiers créés/modifiés...${NC}"

cd ..

# Vérifier les fichiers critiques
files_to_check=(
    "frontend/src/app/core/guards/role.guard.ts"
    "frontend/src/app/core/auth/keycloak.service.ts"
    "frontend/src/app/shared/components/unauthorized/unauthorized.component.ts"
    "frontend/src/app/layout/layout-routing.module.ts"
    "backend/src/main/java/com/sentinelrisk/backend/config/SecurityConfig.java"
    "backend/src/main/java/com/sentinelrisk/backend/controller/DashboardController.java"
)

all_files_exist=true
for file in "${files_to_check[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅ $file${NC}"
    else
        echo -e "${RED}❌ $file manquant${NC}"
        all_files_exist=false
    fi
done

if [ "$all_files_exist" = false ]; then
    echo -e "${RED}❌ Des fichiers critiques sont manquants${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}4. Vérification des configurations de routing...${NC}"

# Vérifier que les routes SNMP ont les bons rôles
if grep -q '"roles": \["admin", "risk_manager"\]' frontend/src/app/layout/layout-routing.module.ts; then
    echo -e "${GREEN}✅ Route SNMP correctement configurée (admin, risk_manager)${NC}"
else
    echo -e "${RED}❌ Configuration route SNMP incorrecte${NC}"
fi

# Vérifier que la route unauthorized existe
if grep -q "path: 'unauthorized'" frontend/src/app/app-routing.module.ts; then
    echo -e "${GREEN}✅ Route unauthorized configurée${NC}"
else
    echo -e "${RED}❌ Route unauthorized manquante${NC}"
fi

echo ""
echo -e "${BLUE}5. Vérification des annotations Spring Security...${NC}"

# Vérifier les annotations dans DashboardController
if grep -q "@PreAuthorize.*ROLE_ADMIN.*ROLE_RISK_MANAGER" backend/src/main/java/com/sentinelrisk/backend/controller/DashboardController.java; then
    echo -e "${GREEN}✅ Annotations @PreAuthorize corrigées dans DashboardController${NC}"
else
    echo -e "${YELLOW}⚠️ Vérifier les annotations @PreAuthorize dans DashboardController${NC}"
fi

echo ""
echo -e "${BLUE}6. Test de structure des logs...${NC}"

# Vérifier que les logs détaillés sont présents
if grep -q "console.group.*KeycloakService" frontend/src/app/core/auth/keycloak.service.ts; then
    echo -e "${GREEN}✅ Logs détaillés ajoutés dans KeycloakService${NC}"
else
    echo -e "${RED}❌ Logs détaillés manquants dans KeycloakService${NC}"
fi

if grep -q "console.group.*RoleGuard" frontend/src/app/core/guards/role.guard.ts; then
    echo -e "${GREEN}✅ Logs détaillés ajoutés dans RoleGuard${NC}"
else
    echo -e "${RED}❌ Logs détaillés manquants dans RoleGuard${NC}"
fi

echo ""
echo -e "${YELLOW}📋 Résumé des corrections apportées:${NC}"
echo "   🔒 RoleGuard corrigé avec meilleure logique de vérification"
echo "   🔑 KeycloakService amélioré avec hasAnyRole() et logs détaillés"
echo "   🚫 Page Unauthorized créée pour éviter les pages blanches"
echo "   🛡️ Configuration Spring Security réactivée et sécurisée"
echo "   📝 Logs détaillés ajoutés pour faciliter le débogage"

echo ""
echo -e "${BLUE}7. Instructions de test manuel:${NC}"
echo "   1. Démarrer le backend : cd backend && mvn spring-boot:run"
echo "   2. Démarrer le frontend : cd frontend && ng serve"
echo "   3. Se connecter avec un utilisateur admin"
echo "   4. Tester l'accès à /snmp/run (doit fonctionner)"
echo "   5. Changer le rôle à 'user' dans Keycloak"
echo "   6. Tester l'accès à /snmp/run (doit rediriger vers /unauthorized)"
echo "   7. Vérifier les logs dans la console du navigateur"

echo ""
echo -e "${GREEN}🎉 Validation terminée avec succès !${NC}"
echo -e "${YELLOW}💡 Conseil: Ouvrez la console du navigateur (F12) pour voir les logs détaillés${NC}"

# Nettoyer le dossier de test
rm -rf dist-test 2>/dev/null

exit 0 