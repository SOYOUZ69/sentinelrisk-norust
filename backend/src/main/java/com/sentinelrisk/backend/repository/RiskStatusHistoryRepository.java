package com.sentinelrisk.backend.repository;

import com.sentinelrisk.backend.model.RiskStatusHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RiskStatusHistoryRepository extends JpaRepository<RiskStatusHistory, Long> {
    
    /**
     * Récupère l'historique des statuts pour un risque spécifique, trié par date de changement décroissante
     */
    List<RiskStatusHistory> findByRiskIdOrderByChangeDateDesc(Long riskId);
    
    /**
     * Récupère l'historique des statuts pour un risque spécifique, trié par date de changement croissante
     */
    List<RiskStatusHistory> findByRiskIdOrderByChangeDateAsc(Long riskId);
    
    /**
     * Récupère le dernier changement de statut pour un risque spécifique
     */
    RiskStatusHistory findFirstByRiskIdOrderByChangeDateDesc(Long riskId);
} 