package com.sentinelrisk.backend.service;

import com.sentinelrisk.backend.model.Risk;
import com.sentinelrisk.backend.model.RiskStatusHistory;
import com.sentinelrisk.backend.model.User;
import com.sentinelrisk.backend.repository.RiskStatusHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class RiskStatusHistoryService {

    private final RiskStatusHistoryRepository riskStatusHistoryRepository;

    /**
     * Enregistre un changement de statut dans l'historique
     * @param risk Le risque concerné
     * @param previousStatus L'ancien statut (peut être null si c'est le premier statut)
     * @param newStatus Le nouveau statut
     * @param changedByUser L'utilisateur qui a effectué le changement
     * @param changeReason La raison du changement
     * @return L'entrée d'historique créée
     */
    public RiskStatusHistory recordStatusChange(Risk risk, Risk.Status previousStatus, 
                                               Risk.Status newStatus, User changedByUser, String changeReason) {
        RiskStatusHistory historyEntry = new RiskStatusHistory();
        historyEntry.setRisk(risk);
        historyEntry.setPreviousStatus(previousStatus);
        historyEntry.setNewStatus(newStatus);
        historyEntry.setChangedByUser(changedByUser);
        historyEntry.setChangeReason(changeReason);
        System.out.println("HistoryEntry: " + historyEntry);
        
        return riskStatusHistoryRepository.save(historyEntry);
    }

    /**
     * Récupère l'historique complet des statuts pour un risque
     * @param riskId L'ID du risque
     * @return La liste des changements de statut, triés par date décroissante
     */
    public List<RiskStatusHistory> getStatusHistoryForRisk(Long riskId) {
        return riskStatusHistoryRepository.findByRiskIdOrderByChangeDateDesc(riskId);
    }

    /**
     * Récupère le dernier changement de statut pour un risque
     * @param riskId L'ID du risque
     * @return Le dernier changement de statut ou null s'il n'y en a pas
     */
    public RiskStatusHistory getLastStatusChangeForRisk(Long riskId) {
        return riskStatusHistoryRepository.findFirstByRiskIdOrderByChangeDateDesc(riskId);
    }

    /**
     * Récupère l'historique des statuts pour un risque dans l'ordre chronologique
     * @param riskId L'ID du risque
     * @return La liste des changements de statut, triés par date croissante
     */
    public List<RiskStatusHistory> getStatusHistoryForRiskChronological(Long riskId) {
        return riskStatusHistoryRepository.findByRiskIdOrderByChangeDateAsc(riskId);
    }
} 