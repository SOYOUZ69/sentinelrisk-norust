package com.sentinelrisk.backend.repository;

import com.sentinelrisk.backend.model.Risk;
import com.sentinelrisk.backend.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RiskRepository extends JpaRepository<Risk, Long> {
    List<Risk> findByCategory(Category category);
    List<Risk> findByStatus(Risk.Status status);
    
    @Query("SELECT r FROM Risk r WHERE r.riskScore >= :minScore")
    List<Risk> findHighRisks(int minScore);
    
    @Query("SELECT r FROM Risk r WHERE r.category.id = :categoryId AND r.status = :status")
    List<Risk> findByCategoryAndStatus(Long categoryId, Risk.Status status);
    
    List<Risk> findByImpactLevelAndProbabilityLevel(Risk.ImpactLevel impactLevel, Risk.ProbabilityLevel probabilityLevel);
} 