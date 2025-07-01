package com.sentinelrisk.backend.repository;

import com.sentinelrisk.backend.model.RiskImpactHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository pour l'entité RiskImpactHistory.
 */
@Repository
public interface RiskImpactHistoryRepository extends JpaRepository<RiskImpactHistory, Long> {
    
    /**
     * Récupère l'historique d'impact pour un risque spécifique, trié par date décroissante
     * @param riskId ID du risque
     * @return Liste des changements d'impact
     */
    List<RiskImpactHistory> findByRiskIdOrderByChangedAtDesc(Long riskId);
    
    /**
     * Récupère l'historique d'impact pour un plan spécifique, trié par date décroissante
     * @param planId ID du plan
     * @return Liste des changements d'impact
     */
    List<RiskImpactHistory> findByPlanIdOrderByChangedAtDesc(Long planId);
    
    /**
     * Récupère le dernier changement d'impact pour un risque spécifique
     * @param riskId ID du risque
     * @return Le dernier changement d'impact ou null
     */
    RiskImpactHistory findFirstByRiskIdOrderByChangedAtDesc(Long riskId);
    
    /**
     * Récupère l'historique d'impact pour un risque dans l'ordre chronologique
     * @param riskId ID du risque
     * @return Liste des changements d'impact, triés par date croissante
     */
    List<RiskImpactHistory> findByRiskIdOrderByChangedAtAsc(Long riskId);
} 