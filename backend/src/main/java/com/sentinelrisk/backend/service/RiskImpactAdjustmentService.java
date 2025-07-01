package com.sentinelrisk.backend.service;

import com.sentinelrisk.backend.model.Risk;
import com.sentinelrisk.backend.model.Assessment;
import com.sentinelrisk.backend.model.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service pour ajuster automatiquement l'impact du risque basé sur le score d'assessment
 */
@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class RiskImpactAdjustmentService {

    private final RiskScoreHistoryService riskScoreHistoryService;
    private final RiskStatusHistoryService riskStatusHistoryService;

    /**
     * Traite l'ajustement automatique de l'impact du risque basé sur le score d'assessment
     * @param risk Le risque concerné
     * @param assessment L'assessment qui déclenche l'ajustement
     * @param user L'utilisateur qui effectue l'action
     */
    public void handleAssessmentScoreImpact(Risk risk, Assessment assessment, User user) {
        if (assessment.getAssessmentScore() == null) {
            log.info("Score d'assessment non défini, aucun ajustement d'impact effectué");
            return;
        }

        // Récupérer l'ancien score du risque (score global)
        Integer oldRiskScore = risk.getRiskScore();
        
        // Appliquer la logique d'ajustement d'impact
        boolean impactReduced = adjustRiskImpact(risk, assessment.getAssessmentScore());
        
        // Enregistrer le changement de score dans l'historique
        riskScoreHistoryService.recordScoreChange(risk, assessment, oldRiskScore, risk.getRiskScore(), user);
        
        if (impactReduced) {
            // Enregistrer le changement de statut si l'impact a été réduit
            String changeReason = "Impact réduit automatiquement - Score d'assessment: " + assessment.getAssessmentScore() + "/100";
            riskStatusHistoryService.recordStatusChange(risk, risk.getStatus(), risk.getStatus(), user, changeReason);
            
            log.info("Impact du risque {} réduit automatiquement - Score d'assessment: {}", 
                    risk.getId(), assessment.getAssessmentScore());
        }
    }

    /**
     * Ajuste l'impact du risque basé sur le score d'assessment
     * @param risk Le risque à ajuster
     * @param assessmentScore Le score de l'assessment (0-100)
     * @return true si l'impact a été réduit, false sinon
     */
    private boolean adjustRiskImpact(Risk risk, Integer assessmentScore) {
        if (assessmentScore < 70) {
            // Score < 70 : aucun changement d'impact
            return false;
        }

        // Score >= 70 : réduire l'impact d'un niveau
        Risk.ImpactLevel currentImpact = risk.getImpactLevel();
        Risk.ImpactLevel newImpact = getReducedImpactLevel(currentImpact);
        
        if (newImpact != currentImpact) {
            risk.setImpactLevel(newImpact);
            // Recalculer le score du risque
            recalculateRiskScore(risk);
            return true;
        }
        
        return false;
    }

    /**
     * Obtient le niveau d'impact réduit d'un niveau
     * @param currentImpact Le niveau d'impact actuel
     * @return Le nouveau niveau d'impact
     */
    private Risk.ImpactLevel getReducedImpactLevel(Risk.ImpactLevel currentImpact) {
        switch (currentImpact) {
            case MAJOR:
                return Risk.ImpactLevel.SEVERE;
            case SEVERE:
                return Risk.ImpactLevel.MODERATE;
            case MODERATE:
                return Risk.ImpactLevel.MINOR;
            case MINOR:
                return Risk.ImpactLevel.NEGLIGIBLE;
            case NEGLIGIBLE:
                return Risk.ImpactLevel.NEGLIGIBLE; // Ne peut pas descendre plus bas
            default:
                return currentImpact;
        }
    }

    /**
     * Recalcule le score du risque basé sur le nouvel impact et la probabilité
     * @param risk Le risque à recalculer
     */
    private void recalculateRiskScore(Risk risk) {
        if (risk.getImpactLevel() != null && risk.getProbabilityLevel() != null) {
            int newScore = risk.getImpactLevel().getValue() * risk.getProbabilityLevel().getValue();
            risk.setRiskScore(newScore);
            log.debug("Score du risque {} recalculé: {} (Impact: {}, Probabilité: {})", 
                    risk.getId(), newScore, risk.getImpactLevel(), risk.getProbabilityLevel());
        }
    }
} 