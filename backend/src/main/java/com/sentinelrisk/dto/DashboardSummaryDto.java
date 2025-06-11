package com.sentinelrisk.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

public class DashboardSummaryDto {
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RiskSummary {
        private long totalRisks;
        private Map<String, Long> risksByLevel;
        private Map<String, Long> risksByCategory;
        private long openRisks;
        private long closedRisks;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ComplianceSummary {
        private long totalControls;
        private long compliantControls;
        private long nonCompliantControls;
        private double complianceRate;
        private Map<String, Long> controlsByFramework;
        private Map<String, Long> controlsByStatus;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SnmpSummary {
        private long totalAssets;
        private long activeAssets;
        private long inactiveAssets;
        private Map<String, Long> assetsByType;
        private Map<String, Long> assetsByStatus;
        private long recentScans;
        private long failedScans;
        private double successRate;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ActionPlansSummary {
        private long totalPlans;
        private long activePlans;
        private long completedPlans;
        private long overduePlans;
        private Map<String, Long> plansByStatus;
        private double completionRate;
    }
} 