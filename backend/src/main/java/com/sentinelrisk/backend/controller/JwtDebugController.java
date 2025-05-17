package com.sentinelrisk.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/debug/jwt")
public class JwtDebugController {

    @GetMapping
    public ResponseEntity<Map<String, Object>> debugJwt() {
        Map<String, Object> response = new HashMap<>();
        
        // Récupérer l'authentification actuelle
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        response.put("authentication_class", auth != null ? auth.getClass().getName() : "null");
        response.put("authenticated", auth != null ? auth.isAuthenticated() : false);
        response.put("principal_class", auth != null && auth.getPrincipal() != null ? auth.getPrincipal().getClass().getName() : "null");
        
        // Si le principal est un JWT, extraire ses informations
        if (auth != null && auth.getPrincipal() instanceof Jwt) {
            Jwt jwt = (Jwt) auth.getPrincipal();
            
            response.put("jwt_claims", jwt.getClaims());
            response.put("jwt_headers", jwt.getHeaders());
            response.put("subject", jwt.getSubject());
            response.put("issuer", jwt.getIssuer());
            
            // Vérifier spécifiquement les informations de rôle dans le token
            if (jwt.getClaims().containsKey("realm_access")) {
                response.put("realm_access", jwt.getClaim("realm_access"));
            }
            
            // Vérifier les autorisations extraites
            response.put("authorities", auth.getAuthorities());
        }
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/ping")
    public ResponseEntity<String> ping() {
        return ResponseEntity.ok("pong - Endpoint JWT de débogage accessible");
    }
} 