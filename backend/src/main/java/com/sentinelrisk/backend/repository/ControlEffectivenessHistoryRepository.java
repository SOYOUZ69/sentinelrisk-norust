package com.sentinelrisk.backend.repository;

import com.sentinelrisk.backend.model.ControlEffectivenessHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ControlEffectivenessHistoryRepository extends JpaRepository<ControlEffectivenessHistory, Long> {
    
    /**
     * Récupère l'historique des changements d'efficacité pour un contrôle spécifique
     */
    List<ControlEffectivenessHistory> findByControlIdOrderByChangedAtDesc(Long controlId);
    
    /**
     * Récupère l'historique des changements d'efficacité pour un risque spécifique
     */
    List<ControlEffectivenessHistory> findByRiskIdOrderByChangedAtDesc(Long riskId);
    
    /**
     * Récupère l'historique des changements d'efficacité pour un contrôle et un risque spécifiques
     */
    List<ControlEffectivenessHistory> findByControlIdAndRiskIdOrderByChangedAtDesc(Long controlId, Long riskId);
    
    /**
     * Récupère l'historique des changements d'efficacité par utilisateur
     */
    List<ControlEffectivenessHistory> findByChangedByUserIdOrderByChangedAtDesc(String userId);
} 