package com.sentinelrisk.config;

import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class KeycloakAdminConfig {
    private static final Logger logger = LoggerFactory.getLogger(KeycloakAdminConfig.class);

    @Value("${keycloak.auth-server-url}")
    private String serverUrl;

    @Value("${keycloak.realm}")
    private String realm;

    @Value("${keycloak.resource}")
    private String clientId;

    @Value("${keycloak.credentials.secret}")
    private String clientSecret;

    @Value("${keycloak.admin.username}")
    private String adminUsername;

    @Value("${keycloak.admin.password}")
    private String adminPassword;

    @Bean
    public Keycloak keycloak() {
        logger.info("Initializing Keycloak admin client with server URL: {}", serverUrl);
        logger.debug("Using realm: {}, clientId: {}", realm, clientId);
        
        return KeycloakBuilder.builder()
                .serverUrl(serverUrl)
                .realm("master") // Realm master pour l'admin
                .clientId("admin-cli")
                .grantType("client_credentials")
                .clientSecret(clientSecret)
                .build();
    }
} 