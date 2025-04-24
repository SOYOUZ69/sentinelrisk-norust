package com.sentinelrisk.backend.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/test")
public class TestController {

    @GetMapping("/public")
    public Map<String, String> publicEndpoint() {
        return Map.of("message", "Cet endpoint est public");
    }

    @GetMapping("/authenticated")
    public Map<String, Object> authenticatedEndpoint(@AuthenticationPrincipal Jwt jwt) {
        return Map.of(
            "message", "Vous êtes authentifié",
            "username", jwt.getClaimAsString("preferred_username"),
            "roles", jwt.getClaimAsMap("realm_access")
        );
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public Map<String, String> adminEndpoint() {
        return Map.of("message", "Vous avez accès à la zone admin");
    }
} 