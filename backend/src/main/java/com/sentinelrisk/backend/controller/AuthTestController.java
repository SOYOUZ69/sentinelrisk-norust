package com.sentinelrisk.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth-test")
public class AuthTestController {

    @GetMapping("/user-info")
    public ResponseEntity<Map<String, Object>> getUserInfo(Authentication authentication) {
        Map<String, Object> userInfo = new HashMap<>();
        
        if (authentication != null) {
            userInfo.put("name", authentication.getName());
            userInfo.put("isAuthenticated", authentication.isAuthenticated());
            userInfo.put("authorities", authentication.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList()));
            userInfo.put("details", authentication.getDetails());
            userInfo.put("principal", authentication.getPrincipal());
        } else {
            userInfo.put("isAuthenticated", false);
        }
        
        return ResponseEntity.ok(userInfo);
    }

    @GetMapping("/admin-only")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<String> adminOnly() {
        return ResponseEntity.ok("Vous avez accès en tant qu'ADMIN");
    }

    @GetMapping("/risk-manager-only")
    @PreAuthorize("hasAuthority('ROLE_RISK_MANAGER')")
    public ResponseEntity<String> riskManagerOnly() {
        return ResponseEntity.ok("Vous avez accès en tant que RISK_MANAGER");
    }

    @GetMapping("/compliance-only")
    @PreAuthorize("hasAuthority('ROLE_COMPLIANCE_OFFICER')")
    public ResponseEntity<String> complianceOnly() {
        return ResponseEntity.ok("Vous avez accès en tant que COMPLIANCE_OFFICER");
    }

    @GetMapping("/user-only")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<String> userOnly() {
        return ResponseEntity.ok("Vous avez accès en tant que USER");
    }

    @GetMapping("/any-role")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_RISK_MANAGER', 'ROLE_COMPLIANCE_OFFICER', 'ROLE_AUDITOR', 'ROLE_USER')")
    public ResponseEntity<String> anyRole() {
        return ResponseEntity.ok("Vous avez accès avec n'importe quel rôle");
    }
} 