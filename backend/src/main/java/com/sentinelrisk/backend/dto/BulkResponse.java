package com.sentinelrisk.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

/**
 * DTO pour les réponses d'opérations en masse, avec support des erreurs partielles
 */
@Data
@NoArgsConstructor
public class BulkResponse<T> {
    private List<T> successItems;
    private List<Error> errors;
    private int totalProcessed;
    private int successCount;
    private int errorCount;

    public BulkResponse(List<T> successItems, List<Error> errors) {
        this.successItems = successItems;
        this.errors = errors;
        this.totalProcessed = successItems.size() + errors.size();
        this.successCount = successItems.size();
        this.errorCount = errors.size();
    }

    /**
     * Classe interne pour représenter une erreur d'importation
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Error {
        private int index;  // Index de l'élément dans la liste d'origine
        private String message;  // Message d'erreur
    }
} 