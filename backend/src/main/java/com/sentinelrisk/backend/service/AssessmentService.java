package com.sentinelrisk.backend.service;

import com.sentinelrisk.backend.model.Assessment;
import com.sentinelrisk.backend.model.Risk;
import com.sentinelrisk.backend.model.User;
import com.sentinelrisk.backend.repository.AssessmentRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class AssessmentService {

    private final AssessmentRepository assessmentRepository;
    private final RiskServiceWrapper riskServiceWrapper;
    private final UserService userService;
    private final RiskStatusTransitionService riskStatusTransitionService;
    private final RiskImpactAdjustmentService riskImpactAdjustmentService;

    public List<Assessment> getAllAssessments() {
        return assessmentRepository.findAll();
    }

    public Assessment getAssessmentById(Long id) {
        return assessmentRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Assessment not found with id: " + id));
    }

    public List<Assessment> getAssessmentsByStatus(Assessment.Status status) {
        return assessmentRepository.findByStatus(status);
    }

    public List<Assessment> getAssessmentsByUser(String userId) {
        User user = userService.getUserById(userId);
        return assessmentRepository.findByAssignedTo(user);
    }

    public List<Assessment> getAssessmentsByRisk(Long riskId) {
        return assessmentRepository.findByRiskId(riskId);
    }

    public List<Assessment> getPendingReviews(LocalDateTime date) {
        return assessmentRepository.findPendingReviews(date);
    }

    public List<Assessment> getActiveAssessmentsByUser(String userId) {
        return assessmentRepository.findActiveAssessmentsByUser(userId);
    }

    public List<Assessment> getLatestAssessmentsByRisk(Long riskId) {
        return assessmentRepository.findLatestAssessmentsByRisk(riskId);
    }

    public Assessment createAssessment(Assessment assessment) {
        Risk risk = riskServiceWrapper.getRiskById(assessment.getRisk().getId());
        assessment.setRisk(risk);

        if (assessment.getAssignedTo() != null) {
            User user = userService.getUserById(assessment.getAssignedTo().getId());
            assessment.setAssignedTo(user);
        }

        // Sauvegarder l'assessment
        Assessment savedAssessment = assessmentRepository.save(assessment);

        // Déclencher la transition automatique de statut du risque
        User currentUser = assessment.getAssignedTo() != null ? assessment.getAssignedTo() : 
                          (assessment.getUser() != null ? assessment.getUser() : null);
        
        if (currentUser != null) {
            riskStatusTransitionService.handleAssessmentStatusTransition(
                risk, savedAssessment, 
                RiskStatusTransitionService.AssessmentAction.CREATE, 
                currentUser
            );
            
            // Appliquer l'ajustement automatique d'impact basé sur le score d'assessment
            riskImpactAdjustmentService.handleAssessmentScoreImpact(risk, savedAssessment, currentUser);
        }

        return savedAssessment;
    }

    public Assessment updateAssessment(Long id, Assessment assessment) {
        Assessment existingAssessment = getAssessmentById(id);
        Assessment.Status previousStatus = existingAssessment.getStatus();

        if (assessment.getRisk() != null) {
            Risk risk = riskServiceWrapper.getRiskById(assessment.getRisk().getId());
            existingAssessment.setRisk(risk);
        }

        if (assessment.getAssignedTo() != null) {
            User user = userService.getUserById(assessment.getAssignedTo().getId());
            existingAssessment.setAssignedTo(user);
        }

        existingAssessment.setStatus(assessment.getStatus());
        existingAssessment.setAssessmentDate(assessment.getAssessmentDate());
        existingAssessment.setFindings(assessment.getFindings());
        existingAssessment.setRecommendations(assessment.getRecommendations());
        existingAssessment.setAssessmentScore(assessment.getAssessmentScore());
        existingAssessment.setNextReviewDate(assessment.getNextReviewDate());

        // Sauvegarder l'assessment
        Assessment savedAssessment = assessmentRepository.save(existingAssessment);

        // Déclencher la transition automatique de statut du risque
        User currentUser = existingAssessment.getAssignedTo() != null ? existingAssessment.getAssignedTo() : 
                          (existingAssessment.getUser() != null ? existingAssessment.getUser() : null);
        
        if (currentUser != null) {
            // Déterminer l'action appropriée
            RiskStatusTransitionService.AssessmentAction action;
            if (assessment.getStatus() == Assessment.Status.COMPLETED && 
                previousStatus != Assessment.Status.COMPLETED) {
                action = RiskStatusTransitionService.AssessmentAction.COMPLETE;
            } else {
                action = RiskStatusTransitionService.AssessmentAction.UPDATE;
            }
            
            riskStatusTransitionService.handleAssessmentStatusTransition(
                existingAssessment.getRisk(), savedAssessment, action, currentUser
            );
            
            // Appliquer l'ajustement automatique d'impact basé sur le score d'assessment
            riskImpactAdjustmentService.handleAssessmentScoreImpact(existingAssessment.getRisk(), savedAssessment, currentUser);
        }

        return savedAssessment;
    }

    public void deleteAssessment(Long id) {
        if (!assessmentRepository.existsById(id)) {
            throw new EntityNotFoundException("Assessment not found with id: " + id);
        }
        assessmentRepository.deleteById(id);
    }
} 