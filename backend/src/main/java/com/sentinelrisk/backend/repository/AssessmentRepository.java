package com.sentinelrisk.backend.repository;

import com.sentinelrisk.backend.model.Assessment;
import com.sentinelrisk.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AssessmentRepository extends JpaRepository<Assessment, Long> {
    List<Assessment> findByStatus(Assessment.Status status);
    List<Assessment> findByAssignedTo(User assignedTo);
    List<Assessment> findByRiskId(Long riskId);
    
    @Query("SELECT a FROM Assessment a WHERE a.nextReviewDate <= :date AND a.status != 'COMPLETED'")
    List<Assessment> findPendingReviews(LocalDateTime date);
    
    @Query("SELECT a FROM Assessment a WHERE a.assignedTo.id = :userId AND a.status = 'IN_PROGRESS'")
    List<Assessment> findActiveAssessmentsByUser(String userId);
    
    @Query("SELECT a FROM Assessment a WHERE a.risk.id = :riskId ORDER BY a.assessmentDate DESC")
    List<Assessment> findLatestAssessmentsByRisk(Long riskId);
} 