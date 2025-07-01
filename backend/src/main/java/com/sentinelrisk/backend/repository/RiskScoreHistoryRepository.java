package com.sentinelrisk.backend.repository;

import com.sentinelrisk.backend.model.RiskScoreHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RiskScoreHistoryRepository extends JpaRepository<RiskScoreHistory, Long> {
    
    /**
     * Récupère l'historique des scores pour un risque spécifique, trié par date de changement décroissante
     */
    List<RiskScoreHistory> findByRiskIdOrderByChangedAtDesc(Long riskId);
    
    /**
     * Récupère l'historique des scores pour un risque spécifique, trié par date de changement croissante
     */
    List<RiskScoreHistory> findByRiskIdOrderByChangedAtAsc(Long riskId);
    
    /**
     * Récupère le dernier changement de score pour un risque spécifique
     */
    RiskScoreHistory findFirstByRiskIdOrderByChangedAtDesc(Long riskId);
} 