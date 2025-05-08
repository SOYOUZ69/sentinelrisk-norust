package com.sentinelrisk.backend.service;

import com.sentinelrisk.backend.dto.AssessmentDTO;
import com.sentinelrisk.backend.model.Assessment;
import com.sentinelrisk.backend.model.Risk;
import com.sentinelrisk.backend.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class AssessmentRequestService {
    
    private final AssessmentService assessmentService;

    /**
     * Traite une demande de création d'assessment et évite les problèmes de sérialisation
     */
    public AssessmentDTO createAssessment(Assessment request) {
        // Créer l'assessment via le service original
        Assessment result = assessmentService.createAssessment(request);
        // Convertir manuellement en DTO
        return convertToDto(result);
    }

    /**
     * Récupère tous les assessments et les convertit en DTOs
     */
    public List<AssessmentDTO> getAllAssessments() {
        List<Assessment> assessments = assessmentService.getAllAssessments();
        List<AssessmentDTO> dtos = new ArrayList<>(assessments.size());
        
        for (Assessment assessment : assessments) {
            dtos.add(convertToDto(assessment));
        }
        
        return dtos;
    }

    /**
     * Récupère un assessment par ID et le convertit en DTO
     */
    public AssessmentDTO getAssessmentById(Long id) {
        Assessment assessment = assessmentService.getAssessmentById(id);
        return convertToDto(assessment);
    }
    
    /**
     * Met à jour un assessment
     */
    public AssessmentDTO updateAssessment(Long id, Assessment request) {
        Assessment result = assessmentService.updateAssessment(id, request);
        return convertToDto(result);
    }
    
    /**
     * Supprime un assessment
     */
    public void deleteAssessment(Long id) {
        assessmentService.deleteAssessment(id);
    }
    
    /**
     * Récupère les assessments par utilisateur
     */
    public List<AssessmentDTO> getAssessmentsByUser(String userId) {
        List<Assessment> assessments = assessmentService.getAssessmentsByUser(userId);
        List<AssessmentDTO> dtos = new ArrayList<>(assessments.size());
        
        for (Assessment assessment : assessments) {
            dtos.add(convertToDto(assessment));
        }
        
        return dtos;
    }
    
    /**
     * Récupère les assessments par risque
     */
    public List<AssessmentDTO> getAssessmentsByRisk(Long riskId) {
        List<Assessment> assessments = assessmentService.getAssessmentsByRisk(riskId);
        List<AssessmentDTO> dtos = new ArrayList<>(assessments.size());
        
        for (Assessment assessment : assessments) {
            dtos.add(convertToDto(assessment));
        }
        
        return dtos;
    }
    
    /**
     * Convertit une entité Assessment en DTO
     */
    private AssessmentDTO convertToDto(Assessment assessment) {
        AssessmentDTO dto = new AssessmentDTO();
        
        if (assessment != null) {
            // Informations de base
            dto.setId(assessment.getId());
            dto.setStatus(assessment.getStatus());
            dto.setAssessmentDate(assessment.getAssessmentDate());
            dto.setFindings(assessment.getFindings());
            dto.setRecommendations(assessment.getRecommendations());
            dto.setNextReviewDate(assessment.getNextReviewDate());
            dto.setCreatedAt(assessment.getCreatedAt());
            dto.setUpdatedAt(assessment.getUpdatedAt());
            
            // Informations sur le risque
            Risk risk = assessment.getRisk();
            if (risk != null) {
                AssessmentDTO.RiskDTO riskDto = new AssessmentDTO.RiskDTO(
                    risk.getId(),
                    risk.getName()
                );
                dto.setRisk(riskDto);
            }
            
            // Informations sur l'utilisateur assigné
            User user = assessment.getAssignedTo();
            if (user != null) {
                AssessmentDTO.UserDTO userDto = new AssessmentDTO.UserDTO(
                    user.getId(),
                    user.getFirstName(),
                    user.getLastName()
                );
                dto.setAssignedTo(userDto);
            }
        }
        
        return dto;
    }
} 