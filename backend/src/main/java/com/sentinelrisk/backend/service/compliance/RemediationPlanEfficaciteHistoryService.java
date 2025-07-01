package com.sentinelrisk.backend.service.compliance;

import com.sentinelrisk.backend.domain.compliance.RemediationPlan;
import com.sentinelrisk.backend.domain.compliance.RemediationPlanEfficaciteHistory;
import com.sentinelrisk.backend.model.Risk;
import com.sentinelrisk.backend.model.User;
import com.sentinelrisk.backend.repository.compliance.RemediationPlanEfficaciteHistoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service pour la gestion de l'historique d'efficacité des plans de remédiation.
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class RemediationPlanEfficaciteHistoryService {

    private final RemediationPlanEfficaciteHistoryRepository efficaciteHistoryRepository;

    /**
     * Enregistre un changement d'efficacité dans l'historique
     * @param plan Le plan concerné
     * @param risk Le risque associé
     * @param oldScore L'ancien score d'efficacité
     * @param newScore Le nouveau score d'efficacité
     * @param changedByUser L'utilisateur qui a effectué le changement
     * @param changeReason La raison du changement
     * @param impactedRiskLevel Indique si ce changement a eu un impact sur le niveau d'impact du risque
     * @param oldRiskImpactLevel L'ancien niveau d'impact du risque (si impacté)
     * @param newRiskImpactLevel Le nouveau niveau d'impact du risque (si impacté)
     * @return L'entrée d'historique créée
     */
    public RemediationPlanEfficaciteHistory recordEfficaciteChange(
            RemediationPlan plan, 
            Risk risk, 
            Integer oldScore, 
            Integer newScore, 
            User changedByUser, 
            String changeReason,
            Boolean impactedRiskLevel,
            Risk.ImpactLevel oldRiskImpactLevel,
            Risk.ImpactLevel newRiskImpactLevel) {
        
        RemediationPlanEfficaciteHistory historyEntry = new RemediationPlanEfficaciteHistory();
        historyEntry.setPlan(plan);
        historyEntry.setRisk(risk);
        historyEntry.setOldScore(oldScore);
        historyEntry.setNewScore(newScore);
        historyEntry.setChangedByUser(changedByUser);
        historyEntry.setChangeReason(changeReason);
        historyEntry.setImpactedRiskLevel(impactedRiskLevel);
        historyEntry.setOldRiskImpactLevel(oldRiskImpactLevel);
        historyEntry.setNewRiskImpactLevel(newRiskImpactLevel);
        
        log.debug("Enregistrement du changement d'efficacité pour le plan {}: {} -> {}", 
                plan.getId(), oldScore, newScore);
        
        return efficaciteHistoryRepository.save(historyEntry);
    }

    /**
     * Récupère l'historique d'efficacité pour un plan spécifique
     * @param planId L'ID du plan
     * @return La liste des changements d'efficacité, triés par date décroissante
     */
    @Transactional(readOnly = true)
    public List<RemediationPlanEfficaciteHistory> getEfficaciteHistoryForPlan(Long planId) {
        return efficaciteHistoryRepository.findByPlanIdOrderByChangedAtDesc(planId);
    }

    /**
     * Récupère l'historique d'efficacité pour un risque spécifique
     * @param riskId L'ID du risque
     * @return La liste des changements d'efficacité, triés par date décroissante
     */
    @Transactional(readOnly = true)
    public List<RemediationPlanEfficaciteHistory> getEfficaciteHistoryForRisk(Long riskId) {
        return efficaciteHistoryRepository.findByRiskIdOrderByChangedAtDesc(riskId);
    }

    /**
     * Récupère le dernier changement d'efficacité pour un plan
     * @param planId L'ID du plan
     * @return Le dernier changement d'efficacité ou null s'il n'y en a pas
     */
    @Transactional(readOnly = true)
    public RemediationPlanEfficaciteHistory getLastEfficaciteChangeForPlan(Long planId) {
        return efficaciteHistoryRepository.findFirstByPlanIdOrderByChangedAtDesc(planId);
    }

    /**
     * Récupère les changements qui ont eu un impact sur le niveau d'impact du risque
     * @param riskId L'ID du risque
     * @return La liste des changements ayant impacté le risque
     */
    @Transactional(readOnly = true)
    public List<RemediationPlanEfficaciteHistory> getRiskImpactingChanges(Long riskId) {
        return efficaciteHistoryRepository.findByRiskIdAndImpactedRiskLevelTrueOrderByChangedAtDesc(riskId);
    }
} 