package com.sentinelrisk.backend.repository;

import com.sentinelrisk.backend.model.Risk;
import com.sentinelrisk.backend.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RiskRepository extends JpaRepository<Risk, Long> {
    List<Risk> findByCategory(Category category);
    List<Risk> findByStatus(Risk.Status status);
    
    @Query("SELECT r FROM Risk r WHERE r.riskScore >= :minScore")
    List<Risk> findHighRisks(int minScore);
    
    @Query("SELECT r FROM Risk r WHERE r.category.id = :categoryId AND r.status = :status")
    List<Risk> findByCategoryAndStatus(Long categoryId, Risk.Status status);
    
    List<Risk> findByImpactLevelAndProbabilityLevel(Risk.ImpactLevel impactLevel, Risk.ProbabilityLevel probabilityLevel);
    
    // Méthodes pour la gestion des identifiants DID
    Optional<Risk> findByDid(String did);
    
    boolean existsByDid(String did);
    
    @Query("SELECT MAX(r.did) FROM Risk r WHERE r.did LIKE 'R%'")
    String findMaxDid();
    
    @Query("SELECT r FROM Risk r WHERE r.did IS NULL")
    List<Risk> findRisksWithoutDid();

    @Query("SELECT COUNT(r) > 0 FROM Risk r WHERE LOWER(TRIM(r.name)) = LOWER(TRIM(:name)) AND r.category = :category")
    boolean existsByNameIgnoreCaseAndCategory(@Param("name") String name, @Param("category") Category category);
} 