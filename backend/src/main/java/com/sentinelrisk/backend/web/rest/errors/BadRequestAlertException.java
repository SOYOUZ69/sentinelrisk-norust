package com.sentinelrisk.backend.web.rest.errors;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Exception lancée lorsqu'une requête contient des données incorrectes
 */
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class BadRequestAlertException extends RuntimeException {
    
    private static final long serialVersionUID = 1L;
    
    private final String entityName;
    private final String errorKey;
    
    public BadRequestAlertException(String defaultMessage, String entityName, String errorKey) {
        super(defaultMessage);
        this.entityName = entityName;
        this.errorKey = errorKey;
    }
    
    public String getEntityName() {
        return entityName;
    }
    
    public String getErrorKey() {
        return errorKey;
    }
} 