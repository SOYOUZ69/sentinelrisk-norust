package com.sentinelrisk.backend.service;

import com.sentinelrisk.dto.DashboardSummaryDto;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
public class DashboardService {

    public DashboardSummaryDto.RiskSummary getRiskSummary(LocalDateTime startDate, LocalDateTime endDate, String role) {
        Map<String, Long> risksByLevel = new HashMap<>();
        risksByLevel.put("LOW", 10L);
        risksByLevel.put("MEDIUM", 15L);
        risksByLevel.put("HIGH", 8L);
        risksByLevel.put("CRITICAL", 3L);
        
        Map<String, Long> risksByCategory = new HashMap<>();
        risksByCategory.put("OPERATIONAL", 18L);
        risksByCategory.put("FINANCIAL", 12L);
        risksByCategory.put("TECHNICAL", 6L);
        
        return new DashboardSummaryDto.RiskSummary(
            36L,
            risksByLevel,
            risksByCategory,
            30L, // openRisks
            6L   // closedRisks
        );
    }

    public DashboardSummaryDto.ComplianceSummary getComplianceSummary(LocalDateTime startDate, LocalDateTime endDate, String frameworkId) {
        Map<String, Long> controlsByFramework = new HashMap<>();
        controlsByFramework.put("ISO 27001", 25L);
        controlsByFramework.put("NIST", 20L);
        controlsByFramework.put("SOC 2", 15L);
        
        Map<String, Long> controlsByStatus = new HashMap<>();
        controlsByStatus.put("COMPLIANT", 40L);
        controlsByStatus.put("NON_COMPLIANT", 15L);
        controlsByStatus.put("IN_PROGRESS", 5L);
        
        return new DashboardSummaryDto.ComplianceSummary(
            60L,   // totalControls
            40L,   // compliantControls  
            15L,   // nonCompliantControls
            66.7,  // complianceRate
            controlsByFramework,
            controlsByStatus
        );
    }

    public DashboardSummaryDto.SnmpSummary getSnmpSummary(LocalDateTime startDate, LocalDateTime endDate, String assetId) {
        Map<String, Long> assetsByType = new HashMap<>();
        assetsByType.put("SERVER", 20L);
        assetsByType.put("SWITCH", 15L);
        assetsByType.put("ROUTER", 8L);
        assetsByType.put("PRINTER", 12L);
        
        Map<String, Long> assetsByStatus = new HashMap<>();
        assetsByStatus.put("ACTIVE", 45L);
        assetsByStatus.put("INACTIVE", 10L);
        
        return new DashboardSummaryDto.SnmpSummary(
            55L,   // totalAssets
            45L,   // activeAssets
            10L,   // inactiveAssets
            assetsByType,
            assetsByStatus,
            25L,   // recentScans
            3L,    // failedScans
            88.0   // successRate
        );
    }

    public DashboardSummaryDto.ActionPlansSummary getActionPlansSummary(LocalDateTime startDate, LocalDateTime endDate, String role) {
        Map<String, Long> plansByStatus = new HashMap<>();
        plansByStatus.put("ACTIVE", 8L);
        plansByStatus.put("COMPLETED", 12L);
        plansByStatus.put("OVERDUE", 3L);
        
        return new DashboardSummaryDto.ActionPlansSummary(
            23L,   // totalPlans
            8L,    // activePlans
            12L,   // completedPlans
            3L,    // overduePlans
            plansByStatus,
            52.2   // completionRate
        );
    }
} 