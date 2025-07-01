package com.sentinelrisk.backend.service;

import com.sentinelrisk.backend.model.Risk;
import com.sentinelrisk.backend.model.RiskScoreHistory;
import com.sentinelrisk.backend.model.Assessment;
import com.sentinelrisk.backend.model.User;
import com.sentinelrisk.backend.repository.RiskScoreHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class RiskScoreHistoryService {

    private final RiskScoreHistoryRepository riskScoreHistoryRepository;

    /**
     * Enregistre un changement de score dans l'historique
     * @param risk Le risque concerné
     * @param assessment L'assessment qui a déclenché le changement
     * @param oldScore L'ancien score (peut être null si c'est le premier score)
     * @param newScore Le nouveau score
     * @param changedByUser L'utilisateur qui a effectué le changement
     * @return L'entrée d'historique créée
     */
    public RiskScoreHistory recordScoreChange(Risk risk, Assessment assessment, 
                                             Integer oldScore, Integer newScore, User changedByUser) {
        RiskScoreHistory historyEntry = new RiskScoreHistory();
        historyEntry.setRisk(risk);
        historyEntry.setAssessment(assessment);
        historyEntry.setOldScore(oldScore);
        historyEntry.setNewScore(newScore);
        historyEntry.setChangedByUser(changedByUser);
        
        return riskScoreHistoryRepository.save(historyEntry);
    }

    /**
     * Récupère l'historique complet des scores pour un risque
     * @param riskId L'ID du risque
     * @return La liste des changements de score, triés par date décroissante
     */
    public List<RiskScoreHistory> getScoreHistoryForRisk(Long riskId) {
        return riskScoreHistoryRepository.findByRiskIdOrderByChangedAtDesc(riskId);
    }

    /**
     * Récupère le dernier changement de score pour un risque
     * @param riskId L'ID du risque
     * @return Le dernier changement de score ou null s'il n'y en a pas
     */
    public RiskScoreHistory getLastScoreChangeForRisk(Long riskId) {
        return riskScoreHistoryRepository.findFirstByRiskIdOrderByChangedAtDesc(riskId);
    }

    /**
     * Récupère l'historique des scores pour un risque dans l'ordre chronologique
     * @param riskId L'ID du risque
     * @return La liste des changements de score, triés par date croissante
     */
    public List<RiskScoreHistory> getScoreHistoryForRiskChronological(Long riskId) {
        return riskScoreHistoryRepository.findByRiskIdOrderByChangedAtAsc(riskId);
    }
} 