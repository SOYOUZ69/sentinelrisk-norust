package com.sentinelrisk.backend.service;

import com.sentinelrisk.backend.domain.compliance.RemediationPlan;
import com.sentinelrisk.backend.model.Risk;
import com.sentinelrisk.backend.model.RiskImpactHistory;
import com.sentinelrisk.backend.model.User;
import com.sentinelrisk.backend.repository.RiskImpactHistoryRepository;
import com.sentinelrisk.backend.dto.RiskImpactHistoryDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service pour la gestion de l'historique d'impact des risques causés par les plans d'action.
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class RiskImpactHistoryService {

    private final RiskImpactHistoryRepository riskImpactHistoryRepository;

    /**
     * Enregistre un changement d'impact dans l'historique
     * @param risk Le risque concerné
     * @param plan Le plan qui a causé le changement
     * @param oldImpactLevel L'ancien niveau d'impact
     * @param newImpactLevel Le nouveau niveau d'impact
     * @param planEfficacite L'efficacité du plan au moment du changement
     * @param planStatus Le statut du plan au moment du changement
     * @param changedByUser L'utilisateur qui a effectué le changement
     * @param changeReason La raison du changement
     * @return L'entrée d'historique créée
     */
    public RiskImpactHistory recordImpactChange(
            Risk risk, 
            RemediationPlan plan, 
            Risk.ImpactLevel oldImpactLevel, 
            Risk.ImpactLevel newImpactLevel, 
            Integer planEfficacite,
            RemediationPlan.Status planStatus,
            User changedByUser, 
            String changeReason) {
        
        RiskImpactHistory historyEntry = new RiskImpactHistory();
        historyEntry.setRisk(risk);
        historyEntry.setPlan(plan);
        historyEntry.setOldImpactLevel(oldImpactLevel);
        historyEntry.setNewImpactLevel(newImpactLevel);
        historyEntry.setPlanEfficacite(planEfficacite);
        historyEntry.setPlanStatus(planStatus);
        historyEntry.setChangedByUser(changedByUser);
        historyEntry.setChangeReason(changeReason);
        
        log.debug("Enregistrement du changement d'impact pour le risque {}: {} -> {} (plan: {}, efficacité: {}%)", 
                risk.getId(), oldImpactLevel, newImpactLevel, plan.getId(), planEfficacite);
        
        return riskImpactHistoryRepository.save(historyEntry);
    }

    /**
     * Récupère l'historique d'impact pour un risque spécifique
     * @param riskId L'ID du risque
     * @return La liste des changements d'impact, triés par date décroissante
     */
    @Transactional(readOnly = true)
    public List<RiskImpactHistory> getImpactHistoryForRisk(Long riskId) {
        return riskImpactHistoryRepository.findByRiskIdOrderByChangedAtDesc(riskId);
    }

    /**
     * Récupère l'historique d'impact pour un plan spécifique
     * @param planId L'ID du plan
     * @return La liste des changements d'impact, triés par date décroissante
     */
    @Transactional(readOnly = true)
    public List<RiskImpactHistory> getImpactHistoryForPlan(Long planId) {
        return riskImpactHistoryRepository.findByPlanIdOrderByChangedAtDesc(planId);
    }

    /**
     * Récupère le dernier changement d'impact pour un risque
     * @param riskId L'ID du risque
     * @return Le dernier changement d'impact ou null s'il n'y en a pas
     */
    @Transactional(readOnly = true)
    public RiskImpactHistory getLastImpactChangeForRisk(Long riskId) {
        return riskImpactHistoryRepository.findFirstByRiskIdOrderByChangedAtDesc(riskId);
    }

    /**
     * Récupère l'historique d'impact pour un risque dans l'ordre chronologique
     * @param riskId L'ID du risque
     * @return La liste des changements d'impact, triés par date croissante
     */
    @Transactional(readOnly = true)
    public List<RiskImpactHistory> getImpactHistoryForRiskChronological(Long riskId) {
        return riskImpactHistoryRepository.findByRiskIdOrderByChangedAtAsc(riskId);
    }

    public List<RiskImpactHistoryDTO> getAllImpactHistory() {
        return riskImpactHistoryRepository.findAll().stream()
            .map(RiskImpactHistoryDTO::fromEntity)
            .collect(Collectors.toList());
    }
} 