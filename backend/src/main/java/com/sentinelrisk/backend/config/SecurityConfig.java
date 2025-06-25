package com.sentinelrisk.backend.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.http.HttpMethod;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.GrantedAuthority;

import java.util.List;
import java.util.Map;
import java.util.Collection;
import java.util.Collections;
import java.util.stream.Collectors;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private static final String[] PUBLIC_WHITELIST = {
        "/v3/api-docs",
        "/v3/api-docs/**",
        "/v3/api-docs/swagger-config",
        "/swagger-ui.html",
        "/swagger-ui/**",
        "/swagger-resources/**",
        "/swagger-resources",
        "/webjars/**",
        "/api/auth-test/user-info" // Endpoint de debug pour vérifier l'authentification
    };

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        System.out.println("🔒 Configuration de la sécurité Spring - MODE SÉCURISÉ ACTIVÉ");
        
        http
            .cors().configurationSource(corsConfigurationSource())
            .and()
            .csrf().disable()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authorizeHttpRequests(authorize -> {
                authorize
                    // Endpoints publics (documentation, debug)
                    .requestMatchers(PUBLIC_WHITELIST).permitAll()
                    
                    // Endpoints d'administration - ADMIN uniquement
                    .requestMatchers("/api/users/**").hasRole("ADMIN")
                    
                    // Endpoints SNMP - ADMIN et RISK_MANAGER
                    .requestMatchers("/api/snmp/**").hasAnyRole("ADMIN", "RISK_MANAGER")
                    
                    // Endpoints des risques - lecture pour tous, écriture pour ADMIN et RISK_MANAGER
                    .requestMatchers(HttpMethod.GET, "/api/risks/**").hasAnyRole("ADMIN", "RISK_MANAGER", "COMPLIANCE_OFFICER", "AUDITOR", "USER")
                    .requestMatchers(HttpMethod.POST, "/api/risks/**").hasAnyRole("ADMIN", "RISK_MANAGER")
                    .requestMatchers(HttpMethod.PUT, "/api/risks/**").hasAnyRole("ADMIN", "RISK_MANAGER")
                    .requestMatchers(HttpMethod.DELETE, "/api/risks/**").hasAnyRole("ADMIN", "RISK_MANAGER")
                    
                    // Endpoints des contrôles - lecture pour tous, écriture pour ADMIN et RISK_MANAGER
                    .requestMatchers(HttpMethod.GET, "/api/controls/**").hasAnyRole("ADMIN", "RISK_MANAGER", "COMPLIANCE_OFFICER", "AUDITOR", "USER")
                    .requestMatchers(HttpMethod.POST, "/api/controls/**").hasAnyRole("ADMIN", "RISK_MANAGER")
                    .requestMatchers(HttpMethod.PUT, "/api/controls/**").hasAnyRole("ADMIN", "RISK_MANAGER")
                    .requestMatchers(HttpMethod.DELETE, "/api/controls/**").hasAnyRole("ADMIN", "RISK_MANAGER")
                    
                    // Endpoints des catégories - lecture pour tous, écriture pour ADMIN et RISK_MANAGER
                    .requestMatchers(HttpMethod.GET, "/api/categories/**").hasAnyRole("ADMIN", "RISK_MANAGER", "COMPLIANCE_OFFICER", "AUDITOR", "USER")
                    .requestMatchers(HttpMethod.POST, "/api/categories/**").hasAnyRole("ADMIN", "RISK_MANAGER")
                    .requestMatchers(HttpMethod.PUT, "/api/categories/**").hasAnyRole("ADMIN", "RISK_MANAGER")
                    .requestMatchers(HttpMethod.DELETE, "/api/categories/**").hasAnyRole("ADMIN", "RISK_MANAGER")
                    
                    // Endpoints des évaluations - lecture pour tous, écriture pour ADMIN et COMPLIANCE_OFFICER
                    .requestMatchers(HttpMethod.GET, "/api/assessments/**").hasAnyRole("ADMIN", "RISK_MANAGER", "COMPLIANCE_OFFICER", "AUDITOR", "USER")
                    .requestMatchers(HttpMethod.POST, "/api/assessments/**").hasAnyRole("ADMIN", "COMPLIANCE_OFFICER")
                    .requestMatchers(HttpMethod.PUT, "/api/assessments/**").hasAnyRole("ADMIN", "COMPLIANCE_OFFICER")
                    .requestMatchers(HttpMethod.DELETE, "/api/assessments/**").hasAnyRole("ADMIN", "COMPLIANCE_OFFICER")
                    
                    // Endpoints de conformité - lecture pour tous sauf USER, écriture pour ADMIN et COMPLIANCE_OFFICER
                    .requestMatchers(HttpMethod.GET, "/api/compliance/**").hasAnyRole("ADMIN", "RISK_MANAGER", "COMPLIANCE_OFFICER", "AUDITOR")
                    .requestMatchers(HttpMethod.POST, "/api/compliance/**").hasAnyRole("ADMIN", "COMPLIANCE_OFFICER")
                    .requestMatchers(HttpMethod.PUT, "/api/compliance/**").hasAnyRole("ADMIN", "COMPLIANCE_OFFICER")
                    .requestMatchers(HttpMethod.DELETE, "/api/compliance/**").hasAnyRole("ADMIN", "COMPLIANCE_OFFICER")
                    
                    // Dashboard - accès selon le rôle
                    .requestMatchers("/api/dashboard/summary/global", "/api/dashboard/summary/risks").hasAnyRole("ADMIN", "RISK_MANAGER", "COMPLIANCE_OFFICER", "AUDITOR", "USER")
                    .requestMatchers("/api/dashboard/summary/compliance", "/api/dashboard/summary/plans").hasAnyRole("ADMIN", "RISK_MANAGER", "COMPLIANCE_OFFICER", "AUDITOR")
                    .requestMatchers("/api/dashboard/summary/snmp").hasAnyRole("ADMIN", "RISK_MANAGER")
                    
                    // Endpoints de test d'autorisation
                    .requestMatchers("/api/auth-test/**").hasAnyRole("ADMIN", "RISK_MANAGER", "COMPLIANCE_OFFICER", "AUDITOR", "USER")
                    
                    // Tous les autres endpoints nécessitent une authentification
                    .anyRequest().authenticated();
            })
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> jwt
                    .jwtAuthenticationConverter(jwtAuthenticationConverter())
                )
            );

        System.out.println("✅ Configuration de la sécurité terminée");
        return http.build();
    }

    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(jwt -> {
            // Log pour débogage
            System.out.println("====== DÉBOGAGE JWT ======");
            System.out.println("JWT Subject: " + jwt.getSubject());
            
            // Récupérer les rôles depuis le claim 'realm_access'
            Map<String, Object> realmAccess = jwt.getClaimAsMap("realm_access");
            if (realmAccess != null && realmAccess.containsKey("roles")) {
                @SuppressWarnings("unchecked")
                List<String> roles = (List<String>) realmAccess.get("roles");
                
                System.out.println("Rôles trouvés dans realm_access: " + roles);
                
                Collection<GrantedAuthority> authorities = roles.stream()
                    .map(role -> {
                        String formattedRole = "ROLE_" + role.toUpperCase();
                        System.out.println("Ajout du rôle: " + formattedRole);
                        return new SimpleGrantedAuthority(formattedRole);
                    })
                    .collect(Collectors.toList());
                
                System.out.println("Authorities finales: " + authorities);
                return authorities;
            }
            
            // Si on ne trouve pas de roles dans realm_access, chercher dans le resource_access
            try {
                Map<String, Object> resourceAccess = jwt.getClaimAsMap("resource_access");
                if (resourceAccess != null) {
                    System.out.println("Resource Access trouvé: " + resourceAccess);
                    
                    // Chercher les rôles dans le client 'sentinelrisk-frontend'
                    @SuppressWarnings("unchecked")
                    Map<String, Object> clientAccess = (Map<String, Object>) resourceAccess.get("sentinelrisk-frontend");
                    
                    if (clientAccess != null && clientAccess.containsKey("roles")) {
                        @SuppressWarnings("unchecked")
                        List<String> roles = (List<String>) clientAccess.get("roles");
                        
                        System.out.println("Rôles trouvés dans resource_access.sentinelrisk-frontend: " + roles);
                        
                        Collection<GrantedAuthority> authorities = roles.stream()
                            .map(role -> {
                                String formattedRole = "ROLE_" + role.toUpperCase();
                                System.out.println("Ajout du rôle client: " + formattedRole);
                                return new SimpleGrantedAuthority(formattedRole);
                            })
                            .collect(Collectors.toList());
                        
                        if (!authorities.isEmpty()) {
                            System.out.println("Authorities client finales: " + authorities);
                            return authorities;
                        }
                    }
                }
            } catch (Exception e) {
                System.out.println("Erreur lors de l'extraction des rôles resource_access: " + e.getMessage());
            }
            
            System.out.println("⚠️ Aucun rôle trouvé dans le token JWT!");
            // Retourner une liste vide si aucun rôle n'est trouvé
            return Collections.emptyList();
        });
        
        return jwtAuthenticationConverter;
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:4200")); // Frontend Angular
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}