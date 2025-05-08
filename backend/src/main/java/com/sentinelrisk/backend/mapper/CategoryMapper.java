package com.sentinelrisk.backend.mapper;

import com.sentinelrisk.backend.dto.CategoryResponse;
import com.sentinelrisk.backend.model.Category;
import com.sentinelrisk.backend.model.Risk;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Mapper pour convertir entre entités Category et DTO CategoryResponse
 */
@Component
public class CategoryMapper {

    /**
     * Convertit une entité Category en DTO CategoryResponse
     */
    public CategoryResponse toResponse(Category category) {
        if (category == null) {
            return null;
        }
        
        CategoryResponse response = new CategoryResponse();
        response.setId(category.getId());
        response.setName(category.getName());
        response.setDescription(category.getDescription());
        response.setCreatedAt(category.getCreatedAt());
        response.setUpdatedAt(category.getUpdatedAt());
        
        // Ajouter uniquement les IDs des risques, pas les objets complets
        if (category.getRisks() != null) {
            List<Long> riskIds = category.getRisks().stream()
                .map(Risk::getId)
                .collect(Collectors.toList());
            response.setRiskIds(riskIds);
        }
        
        return response;
    }
    
    /**
     * Convertit une liste d'entités Category en liste de DTOs CategoryResponse
     */
    public List<CategoryResponse> toResponseList(List<Category> categories) {
        if (categories == null) {
            return null;
        }
        
        return categories.stream()
            .map(this::toResponse)
            .collect(Collectors.toList());
    }
} 