package com.sentinelrisk.backend.repository.compliance;

import com.sentinelrisk.backend.domain.compliance.RemediationPlanEfficaciteHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository pour l'entité RemediationPlanEfficaciteHistory.
 */
@Repository
public interface RemediationPlanEfficaciteHistoryRepository extends JpaRepository<RemediationPlanEfficaciteHistory, Long> {
    
    /**
     * Récupère l'historique d'efficacité pour un plan spécifique, trié par date décroissante
     * @param planId ID du plan
     * @return Liste des changements d'efficacité
     */
    List<RemediationPlanEfficaciteHistory> findByPlanIdOrderByChangedAtDesc(Long planId);
    
    /**
     * Récupère l'historique d'efficacité pour un risque spécifique, trié par date décroissante
     * @param riskId ID du risque
     * @return Liste des changements d'efficacité
     */
    List<RemediationPlanEfficaciteHistory> findByRiskIdOrderByChangedAtDesc(Long riskId);
    
    /**
     * Récupère le dernier changement d'efficacité pour un plan spécifique
     * @param planId ID du plan
     * @return Le dernier changement d'efficacité ou null
     */
    RemediationPlanEfficaciteHistory findFirstByPlanIdOrderByChangedAtDesc(Long planId);
    
    /**
     * Récupère les changements qui ont eu un impact sur le niveau d'impact du risque
     * @param riskId ID du risque
     * @return Liste des changements ayant impacté le risque
     */
    List<RemediationPlanEfficaciteHistory> findByRiskIdAndImpactedRiskLevelTrueOrderByChangedAtDesc(Long riskId);
} 