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

    private static final String[] SWAGGER_WHITELIST = {
        "/v3/api-docs",
        "/v3/api-docs/**",
        "/v3/api-docs/swagger-config",
        "/swagger-ui.html",
        "/swagger-ui/**",
        "/swagger-resources/**",
        "/swagger-resources",
        "/webjars/**"
    };

    private static final String[] DEBUG_WHITELIST = {
        "/debug/**",
        "/api/debug/**",
        "/api/debug/jwt/**",
        "/api/debug/ping",
        "/api/debug/risks/**",
        "/api/test/**"
    };

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors().configurationSource(corsConfigurationSource())
            .and()
            .csrf().disable()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers(SWAGGER_WHITELIST).permitAll()
                .requestMatchers(DEBUG_WHITELIST).permitAll()
                // Toutes les autres requêtes nécessitent une authentification
                // mais les permissions spécifiques sont gérées par les annotations @PreAuthorize
                .anyRequest().authenticated()
            )
            .oauth2ResourceServer()
            .jwt()
            .jwtAuthenticationConverter(jwtAuthenticationConverter());

        return http.build();
    }

    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter grantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
        
        // Le claim "roles" est généralement imbriqué dans "realm_access" dans les jetons Keycloak
        grantedAuthoritiesConverter.setAuthoritiesClaimName("realm_access.roles");
        grantedAuthoritiesConverter.setAuthorityPrefix("ROLE_");

        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(jwt -> {
            // Log pour débogage
            System.out.println("====== DÉBOGAGE JWT ======");
            System.out.println("JWT Headers: " + jwt.getHeaders());
            System.out.println("JWT Claims: " + jwt.getClaims());
            System.out.println("JWT Subject: " + jwt.getSubject());
            
            // Récupérer les rôles depuis le claim 'realm_access'
            Map<String, Object> realmAccess = jwt.getClaimAsMap("realm_access");
            if (realmAccess != null && realmAccess.containsKey("roles")) {
                @SuppressWarnings("unchecked")
                List<String> roles = (List<String>) realmAccess.get("roles");
                
                System.out.println("Roles trouvés dans realm_access: " + roles);
                
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
                        
                        System.out.println("Roles trouvés dans resource_access.sentinelrisk-frontend: " + roles);
                        
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
            
            System.out.println("Aucun rôle trouvé dans le token JWT!");
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