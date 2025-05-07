package com.sentinelrisk.backend.dto;

import com.sentinelrisk.backend.model.Control.Type;
import com.sentinelrisk.backend.model.Control.Status;
import com.sentinelrisk.backend.model.Control.Frequency;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class ControlResponse {
    private Long id;
    private String name;
    private String description;
    private Type type;
    private Status status;
    private Frequency frequency;
    private String implementationDetails;
    private LocalDate implementationDate;
    private LocalDate lastTestedDate;
    private Integer effectivenessScore;
    private String owner;
    private String documentation;
    private List<RiskBasicResponse> risks; // Liste des risques associés
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Data
    public static class RiskBasicResponse {
        private Long id;
        private String name;
        private String description;
    }
} 