package com.sentinelrisk.backend.dto;

import com.sentinelrisk.backend.model.Risk.ImpactLevel;
import com.sentinelrisk.backend.model.Risk.ProbabilityLevel;
import com.sentinelrisk.backend.model.Risk.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RiskResponse {
    private Long id;
    private String name;
    private String description;
    private CategoryDto category;
    private ImpactLevel impactLevel;
    private ProbabilityLevel probabilityLevel;
    private Integer riskScore;
    private Status status;
    private String mitigationPlan;
    private List<ControlDto> controls;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CategoryDto {
        private Long id;
        private String name;
        private String description;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ControlDto {
        private Long id;
        private String name;
        private String type;
        private String status;
    }
} 