package com.sentinelrisk.backend.controller;

import com.sentinelrisk.backend.dto.AssessmentDTO;
import com.sentinelrisk.backend.dto.AssessmentResponse;
import com.sentinelrisk.backend.dto.CategoryResponse;
import com.sentinelrisk.backend.mapper.CategoryMapper;
import com.sentinelrisk.backend.model.Assessment;
import com.sentinelrisk.backend.model.Category;
import com.sentinelrisk.backend.service.AssessmentService;
import com.sentinelrisk.backend.service.CategoryService;
import com.sentinelrisk.backend.util.JsonHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Contrôleur de test pour diagnostiquer les problèmes de sérialisation JSON
 */
@RestController
@RequestMapping("/api/test")
@RequiredArgsConstructor
public class TestController {

    private final AssessmentService assessmentService;
    private final CategoryService categoryService;
    private final CategoryMapper categoryMapper;
    private final JsonHelper jsonHelper;

    /**
     * Endpoint de test pour vérifier que le serveur fonctionne
     */
    @GetMapping("/ping")
    public String ping() {
        return "pong";
    }

    /**
     * Endpoint de test pour récupérer les catégories avec le nouveau DTO
     */
    @GetMapping(value = "/categories", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<CategoryResponse> testCategories() {
        List<Category> categories = categoryService.getAllCategories();
        return categoryMapper.toResponseList(categories);
    }

    /**
     * Compare les différentes méthodes de sérialisation pour le debugging
     */
    @GetMapping(value = "/assessment/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> testAssessmentSerialization(@PathVariable Long id) {
        // Récupérer l'assessment
        Assessment assessment = assessmentService.getAssessmentById(id);
        
        // Créer un AssessmentResponse
        AssessmentResponse response = new AssessmentResponse();
        response.setId(assessment.getId());
        response.setStatus(assessment.getStatus());
        
        // Données de debug
        Map<String, Object> debugInfo = new HashMap<>();
        debugInfo.put("id", assessment.getId());
        debugInfo.put("status", assessment.getStatus());
        debugInfo.put("findings", assessment.getFindings());
        debugInfo.put("recommendations", assessment.getRecommendations());
        
        // Créer la réponse
        return ResponseEntity.ok(debugInfo);
    }
} 