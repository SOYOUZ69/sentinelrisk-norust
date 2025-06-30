package com.sentinelrisk.backend.exception;

public class DuplicateRiskException extends RuntimeException {
    public DuplicateRiskException(String message) {
        super(message);
    }
} 