package com.sentinelrisk.backend.repository;

import com.sentinelrisk.backend.model.RiskStatusHistory;
import com.sentinelrisk.backend.model.Risk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RiskStatusHistoryRepository extends JpaRepository<RiskStatusHistory, Long> {
    
    /**
     * Récupère l'historique des statuts pour un risque donné, trié par date de changement décroissante
     */
    List<RiskStatusHistory> findByRiskOrderByChangedAtDesc(Risk risk);
    
    /**
     * Récupère l'historique des statuts pour un risque donné par son ID
     */
    @Query("SELECT h FROM RiskStatusHistory h WHERE h.risk.id = :riskId ORDER BY h.changedAt DESC")
    List<RiskStatusHistory> findByRiskIdOrderByChangedAtDesc(@Param("riskId") Long riskId);
    
    /**
     * Récupère le dernier changement de statut pour un risque donné
     */
    @Query("SELECT h FROM RiskStatusHistory h WHERE h.risk.id = :riskId ORDER BY h.changedAt DESC LIMIT 1")
    RiskStatusHistory findLatestByRiskId(@Param("riskId") Long riskId);
} 