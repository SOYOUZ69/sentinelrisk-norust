package com.sentinelrisk.backend.dto;

import com.sentinelrisk.backend.model.Assessment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * DTO pour l'entité Assessment, utilisé pour la communication entre le backend et le frontend
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssessmentDTO {
    private Long id;
    private RiskDTO risk;
    private UserDTO assignedTo;
    private Assessment.Status status;
    private LocalDateTime assessmentDate;
    private String findings;
    private String recommendations;
    private LocalDateTime nextReviewDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RiskDTO {
        private Long id;
        private String name;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserDTO {
        private String id;
        private String firstName;
        private String lastName;
    }
} 