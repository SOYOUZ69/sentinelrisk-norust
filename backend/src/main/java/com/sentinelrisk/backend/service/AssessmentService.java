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
    private final RiskService riskService;
    private final UserService userService;

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
        Risk risk = riskService.getRiskById(assessment.getRisk().getId());
        assessment.setRisk(risk);

        if (assessment.getAssignedTo() != null) {
            User user = userService.getUserById(assessment.getAssignedTo().getId());
            assessment.setAssignedTo(user);
        }

        return assessmentRepository.save(assessment);
    }

    public Assessment updateAssessment(Long id, Assessment assessment) {
        Assessment existingAssessment = getAssessmentById(id);

        if (assessment.getRisk() != null) {
            Risk risk = riskService.getRiskById(assessment.getRisk().getId());
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

        return assessmentRepository.save(existingAssessment);
    }

    public void deleteAssessment(Long id) {
        if (!assessmentRepository.existsById(id)) {
            throw new EntityNotFoundException("Assessment not found with id: " + id);
        }
        assessmentRepository.deleteById(id);
    }
} 