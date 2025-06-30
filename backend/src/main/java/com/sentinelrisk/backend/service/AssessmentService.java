package com.sentinelrisk.backend.service;

import com.sentinelrisk.backend.model.Assessment;
import com.sentinelrisk.backend.model.Risk;
import com.sentinelrisk.backend.model.User;
import com.sentinelrisk.backend.repository.AssessmentRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class AssessmentService {

    private final AssessmentRepository assessmentRepository;
    private final RiskServiceWrapper riskServiceWrapper;
    private final UserService userService;
    private final RiskStatusAutomationService riskStatusAutomationService;

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

        Assessment savedAssessment = assessmentRepository.save(assessment);
        
        // Automatiser le changement de statut du risque
        try {
            if (assessment.getStatus() == Assessment.Status.IN_PROGRESS) {
                // Quand une évaluation commence, passer le risque en évaluation
                riskStatusAutomationService.changeRiskStatus(
                    risk.getId(), 
                    Risk.Status.IN_ASSESSMENT, 
                    "Évaluation démarrée"
                );
                log.info("Statut du risque {} automatiquement changé vers IN_ASSESSMENT suite à la création d'une évaluation", risk.getId());
            }
        } catch (Exception e) {
            log.warn("Erreur lors de l'automatisation du statut du risque {}: {}", risk.getId(), e.getMessage());
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
        existingAssessment.setFindings(assessment.getFindings());
        existingAssessment.setRecommendations(assessment.getRecommendations());
        existingAssessment.setNextReviewDate(assessment.getNextReviewDate());

        Assessment savedAssessment = assessmentRepository.save(existingAssessment);
        
        // Automatiser le changement de statut du risque
        try {
            Risk risk = existingAssessment.getRisk();
            
            if (assessment.getStatus() == Assessment.Status.COMPLETED && 
                previousStatus != Assessment.Status.COMPLETED) {
                // Quand une évaluation est terminée, passer le risque en atténué
                riskStatusAutomationService.changeRiskStatus(
                    risk.getId(), 
                    Risk.Status.MITIGATED, 
                    "Évaluation terminée"
                );
                log.info("Statut du risque {} automatiquement changé vers MITIGATED suite à la finalisation de l'évaluation", risk.getId());
            } else if (assessment.getStatus() == Assessment.Status.IN_PROGRESS && 
                       previousStatus != Assessment.Status.IN_PROGRESS) {
                // Quand une évaluation commence, passer le risque en évaluation
                riskStatusAutomationService.changeRiskStatus(
                    risk.getId(), 
                    Risk.Status.IN_ASSESSMENT, 
                    "Évaluation démarrée"
                );
                log.info("Statut du risque {} automatiquement changé vers IN_ASSESSMENT suite au démarrage de l'évaluation", risk.getId());
            }
        } catch (Exception e) {
            log.warn("Erreur lors de l'automatisation du statut du risque {}: {}", existingAssessment.getRisk().getId(), e.getMessage());
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