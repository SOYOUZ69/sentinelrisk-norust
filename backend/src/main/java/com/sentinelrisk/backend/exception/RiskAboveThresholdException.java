package com.sentinelrisk.backend.exception;

public class RiskAboveThresholdException extends RuntimeException {
    
    private final int riskScore;
    private final int threshold;
    
    public RiskAboveThresholdException(int riskScore, int threshold) {
        super(String.format("Le score du risque (%d) dépasse le seuil d'acceptation défini (%d)", riskScore, threshold));
        this.riskScore = riskScore;
        this.threshold = threshold;
    }
    
    public int getRiskScore() {
        return riskScore;
    }
    
    public int getThreshold() {
        return threshold;
    }
} 