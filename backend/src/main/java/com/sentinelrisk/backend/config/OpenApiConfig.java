package com.sentinelrisk.backend.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        final String securitySchemeName = "bearerAuth";
        
        SecurityScheme securityScheme = new SecurityScheme()
            .name(securitySchemeName)
            .type(SecurityScheme.Type.HTTP)
            .scheme("bearer")
            .bearerFormat("JWT")
            .description("Entrez votre token JWT (sans le préfixe 'Bearer ')");
            
        SecurityRequirement securityRequirement = new SecurityRequirement()
            .addList(securitySchemeName);
        
        return new OpenAPI()
            .info(new Info()
                .title("SentinelRisk API")
                .version("1.0")
                .description("API de gestion des risques et de la conformité"))
            .components(new Components()
                .addSecuritySchemes(securitySchemeName, securityScheme))
            .addSecurityItem(securityRequirement);
    }
} 