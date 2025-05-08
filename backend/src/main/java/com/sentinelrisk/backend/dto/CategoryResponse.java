package com.sentinelrisk.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * DTO pour représenter une catégorie sans boucle de référence
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryResponse {
    private Long id;
    private String name;
    private String description;
    private List<Long> riskIds = new ArrayList<>();
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
} 