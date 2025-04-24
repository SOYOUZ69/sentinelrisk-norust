package com.sentinelrisk.repository;

import com.sentinelrisk.model.Risk;
import com.sentinelrisk.model.RiskLevel;
import com.sentinelrisk.model.RiskCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RiskRepository extends JpaRepository<Risk, Long> {
    List<Risk> findByLevel(RiskLevel level);
    List<Risk> findByCategory(RiskCategory category);
    List<Risk> findByOwnerId(Long ownerId);
    
    @Query("SELECT r FROM Risk r WHERE r.probability * r.impact >= :threshold")
    List<Risk> findHighImpactRisks(double threshold);
    
    @Query("SELECT r.category, COUNT(r) FROM Risk r GROUP BY r.category")
    List<Object[]> countRisksByCategory();
} 