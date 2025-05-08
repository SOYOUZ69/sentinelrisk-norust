package com.sentinelrisk.backend.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 * Classe utilitaire pour aider à debugger les problèmes de sérialisation/désérialisation JSON
 */
@Component
@RequiredArgsConstructor
public class JsonHelper {
    private static final Logger log = LoggerFactory.getLogger(JsonHelper.class);
    private final ObjectMapper objectMapper;

    /**
     * Convertit un objet en chaîne JSON pour le débogage
     * @param object Objet à convertir
     * @return La représentation JSON ou une chaîne d'erreur
     */
    public String toJson(Object object) {
        try {
            return objectMapper.writeValueAsString(object);
        } catch (JsonProcessingException e) {
            log.error("Erreur lors de la sérialisation en JSON", e);
            return "Erreur JSON: " + e.getMessage();
        }
    }

    /**
     * Convertit une chaîne JSON en objet du type spécifié
     * @param json Chaîne JSON à convertir
     * @param clazz Classe cible
     * @return L'objet désérialisé ou null en cas d'erreur
     */
    public <T> T fromJson(String json, Class<T> clazz) {
        try {
            return objectMapper.readValue(json, clazz);
        } catch (JsonProcessingException e) {
            log.error("Erreur lors de la désérialisation du JSON", e);
            return null;
        }
    }
} 