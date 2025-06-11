package com.sentinelrisk.backend.controller;

import com.sentinelrisk.dto.DashboardSummaryDto;
import com.sentinelrisk.backend.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/dashboard/summary")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:4200"})
public class DashboardController {

    private final DashboardService dashboardService;

    /**
     * Récupère le résumé des risques
     */
    @GetMapping("/risks")
    @PreAuthorize("hasAnyRole('admin', 'risk_manager', 'compliance_officer', 'auditor', 'user')")
    public ResponseEntity<DashboardSummaryDto.RiskSummary> getRiskSummary(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end,
            @RequestParam(required = false) String role) {
        
        DashboardSummaryDto.RiskSummary summary = dashboardService.getRiskSummary(start, end, role);
        return ResponseEntity.ok(summary);
    }

    /**
     * Récupère le résumé de la conformité
     */
    @GetMapping("/compliance")
    @PreAuthorize("hasAnyRole('admin', 'compliance_officer', 'risk_manager', 'auditor')")
    public ResponseEntity<DashboardSummaryDto.ComplianceSummary> getComplianceSummary(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end,
            @RequestParam(required = false) String frameworkId) {
        
        DashboardSummaryDto.ComplianceSummary summary = dashboardService.getComplianceSummary(start, end, frameworkId);
        return ResponseEntity.ok(summary);
    }

    /**
     * Récupère le résumé SNMP
     */
    @GetMapping("/snmp")
    @PreAuthorize("hasAnyRole('admin', 'risk_manager')")
    public ResponseEntity<DashboardSummaryDto.SnmpSummary> getSnmpSummary(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end,
            @RequestParam(required = false) String assetId) {
        
        DashboardSummaryDto.SnmpSummary summary = dashboardService.getSnmpSummary(start, end, assetId);
        return ResponseEntity.ok(summary);
    }

    /**
     * Récupère le résumé des plans d'action
     */
    @GetMapping("/plans")
    @PreAuthorize("hasAnyRole('admin', 'compliance_officer', 'risk_manager', 'auditor')")
    public ResponseEntity<DashboardSummaryDto.ActionPlansSummary> getActionPlansSummary(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end,
            @RequestParam(required = false) String role) {
        
        DashboardSummaryDto.ActionPlansSummary summary = dashboardService.getActionPlansSummary(start, end, role);
        return ResponseEntity.ok(summary);
    }

    /**
     * Récupère un résumé global du dashboard
     */
    @GetMapping("/global")
    @PreAuthorize("hasAnyRole('admin', 'risk_manager', 'compliance_officer', 'auditor', 'user')")
    public ResponseEntity<Object> getGlobalSummary(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end,
            @RequestParam(required = false) String role) {
        
        // Créer un objet global contenant tous les résumés
        var globalSummary = new Object() {
            public final DashboardSummaryDto.RiskSummary risks = dashboardService.getRiskSummary(start, end, role);
            public final DashboardSummaryDto.ComplianceSummary compliance = dashboardService.getComplianceSummary(start, end, null);
            public final DashboardSummaryDto.SnmpSummary snmp = dashboardService.getSnmpSummary(start, end, null);
            public final DashboardSummaryDto.ActionPlansSummary plans = dashboardService.getActionPlansSummary(start, end, role);
        };
        
        return ResponseEntity.ok(globalSummary);
    }
} 