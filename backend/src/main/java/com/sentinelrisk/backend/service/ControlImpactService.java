package com.sentinelrisk.backend.service;

import com.sentinelrisk.backend.model.Control;
import com.sentinelrisk.backend.model.ControlEffectivenessHistory;
import com.sentinelrisk.backend.model.Risk;
import com.sentinelrisk.backend.model.User;
import com.sentinelrisk.backend.repository.ControlEffectivenessHistoryRepository;
import com.sentinelrisk.backend.repository.RiskRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service gérant l'impact automatique des contrôles sur les risques
 * selon leur type et leur score d'efficacité
 */
@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class ControlImpactService {

    private final RiskRepository riskRepository;
    private final ControlEffectivenessHistoryRepository controlEffectivenessHistoryRepository;

    /**
     * Traite l'impact d'un changement de score d'efficacité d'un contrôle sur ses risques associés
     * 
     * @param control Le contrôle modifié
     * @param oldScore L'ancien score d'efficacité
     * @param newScore Le nouveau score d'efficacité
     * @param changedByUser L'utilisateur qui a effectué le changement
     */
    public void handleControlEffectivenessChange(Control control, Integer oldScore, Integer newScore, User changedByUser) {
        log.info("Traitement de l'impact du contrôle {} (score: {} → {})", control.getName(), oldScore, newScore);
        
        // Vérifier que le contrôle est actif
        if (!isControlActive(control)) {
            log.info("Contrôle {} non actif - aucun impact sur les risques", control.getName());
            return;
        }
        
        // Vérifier que le score a changé
        if (oldScore != null && oldScore.equals(newScore)) {
            log.info("Score d'efficacité inchangé pour le contrôle {} - aucun impact", control.getName());
            return;
        }
        
        // Traiter chaque risque associé au contrôle
        for (Risk risk : control.getRisks()) {
            try {
                processRiskImpact(control, risk, oldScore, newScore, changedByUser);
            } catch (Exception e) {
                log.error("Erreur lors du traitement de l'impact sur le risque {}: {}", risk.getName(), e.getMessage(), e);
            }
        }
    }

    /**
     * Traite l'impact d'un contrôle sur un risque spécifique
     */
    private void processRiskImpact(Control control, Risk risk, Integer oldScore, Integer newScore, User changedByUser) {
        log.debug("Traitement de l'impact du contrôle {} sur le risque {}", control.getName(), risk.getName());
        
        // Sauvegarder l'état actuel du risque
        Risk.ProbabilityLevel oldProbabilityLevel = risk.getProbabilityLevel();
        Risk.ImpactLevel oldImpactLevel = risk.getImpactLevel();
        
        // Appliquer la logique métier selon le type de contrôle
        boolean riskModified = false;
        
        if (control.getType() == Control.Type.PREVENTIVE) {
            riskModified = applyPreventiveControlImpact(risk, newScore);
        } else if (control.getType() == Control.Type.CORRECTIVE) {
            riskModified = applyCorrectiveControlImpact(risk, newScore);
        }
        
        // Si le risque a été modifié, sauvegarder et historiser
        if (riskModified) {
            riskRepository.save(risk);
            createEffectivenessHistory(control, risk, oldScore, newScore, 
                                     oldProbabilityLevel, risk.getProbabilityLevel(),
                                     oldImpactLevel, risk.getImpactLevel(), 
                                     control.getType(), changedByUser);
            
            log.info("Risque {} modifié par le contrôle {} ({}): probabilité {}→{}, impact {}→{}", 
                    risk.getName(), control.getName(), control.getType(),
                    oldProbabilityLevel, risk.getProbabilityLevel(),
                    oldImpactLevel, risk.getImpactLevel());
        } else {
            // Historiser même si pas de changement (pour traçabilité)
            createEffectivenessHistory(control, risk, oldScore, newScore, 
                                     oldProbabilityLevel, oldProbabilityLevel,
                                     oldImpactLevel, oldImpactLevel, 
                                     control.getType(), changedByUser);
            
            log.debug("Aucun impact du contrôle {} sur le risque {} (score: {})", 
                     control.getName(), risk.getName(), newScore);
        }
    }

    /**
     * Applique l'impact d'un contrôle préventif sur la probabilité du risque
     * 
     * @param risk Le risque à modifier
     * @param effectivenessScore Le score d'efficacité du contrôle
     * @return true si le risque a été modifié, false sinon
     */
    private boolean applyPreventiveControlImpact(Risk risk, Integer effectivenessScore) {
        if (effectivenessScore == null || effectivenessScore < 80) {
            return false; // Pas d'impact si score < 80%
        }
        
        Risk.ProbabilityLevel currentLevel = risk.getProbabilityLevel();
        Risk.ProbabilityLevel newLevel = reduceProbabilityLevel(currentLevel);
        
        if (newLevel != currentLevel) {
            risk.setProbabilityLevel(newLevel);
            return true;
        }
        
        return false;
    }

    /**
     * Applique l'impact d'un contrôle correctif sur l'impact du risque
     * 
     * @param risk Le risque à modifier
     * @param effectivenessScore Le score d'efficacité du contrôle
     * @return true si le risque a été modifié, false sinon
     */
    private boolean applyCorrectiveControlImpact(Risk risk, Integer effectivenessScore) {
        if (effectivenessScore == null || effectivenessScore < 80) {
            return false; // Pas d'impact si score < 80%
        }
        
        Risk.ImpactLevel currentLevel = risk.getImpactLevel();
        Risk.ImpactLevel newLevel = reduceImpactLevel(currentLevel);
        
        if (newLevel != currentLevel) {
            risk.setImpactLevel(newLevel);
            return true;
        }
        
        return false;
    }

    /**
     * Réduit le niveau de probabilité d'un niveau
     */
    private Risk.ProbabilityLevel reduceProbabilityLevel(Risk.ProbabilityLevel currentLevel) {
        switch (currentLevel) {
            case ALMOST_CERTAIN:
                return Risk.ProbabilityLevel.LIKELY;
            case LIKELY:
                return Risk.ProbabilityLevel.POSSIBLE;
            case POSSIBLE:
                return Risk.ProbabilityLevel.UNLIKELY;
            case UNLIKELY:
                return Risk.ProbabilityLevel.RARE;
            case RARE:
                return Risk.ProbabilityLevel.RARE; // Ne peut pas descendre plus bas
            default:
                return currentLevel;
        }
    }

    /**
     * Réduit le niveau d'impact d'un niveau
     */
    private Risk.ImpactLevel reduceImpactLevel(Risk.ImpactLevel currentLevel) {
        switch (currentLevel) {
            case SEVERE:
                return Risk.ImpactLevel.MAJOR;
            case MAJOR:
                return Risk.ImpactLevel.MODERATE;
            case MODERATE:
                return Risk.ImpactLevel.MINOR;
            case MINOR:
                return Risk.ImpactLevel.NEGLIGIBLE;
            case NEGLIGIBLE:
                return Risk.ImpactLevel.NEGLIGIBLE; // Ne peut pas descendre plus bas
            default:
                return currentLevel;
        }
    }

    /**
     * Vérifie si un contrôle est actif
     */
    private boolean isControlActive(Control control) {
        return control.getStatus() == Control.Status.EFFECTIVE || 
               control.getStatus() == Control.Status.IMPLEMENTED;
    }

    /**
     * Crée un enregistrement d'historique pour le changement d'efficacité
     */
    private void createEffectivenessHistory(Control control, Risk risk, Integer oldScore, Integer newScore,
                                          Risk.ProbabilityLevel oldProbability, Risk.ProbabilityLevel newProbability,
                                          Risk.ImpactLevel oldImpact, Risk.ImpactLevel newImpact,
                                          Control.Type controlType, User changedByUser) {
        
        try {
            ControlEffectivenessHistory history = new ControlEffectivenessHistory();
            history.setControl(control);
            history.setRisk(risk);
            history.setOldScore(oldScore);
            history.setNewScore(newScore);
            history.setOldProbabilityLevel(oldProbability);
            history.setNewProbabilityLevel(newProbability);
            history.setOldImpactLevel(oldImpact);
            history.setNewImpactLevel(newImpact);
            history.setControlType(controlType);
            history.setChangedByUser(changedByUser);
            
            controlEffectivenessHistoryRepository.save(history);
            log.debug("Historique créé pour le contrôle {} et le risque {}", control.getName(), risk.getName());
        } catch (Exception e) {
            log.error("Erreur lors de la création de l'historique pour le contrôle {} et le risque {}: {}", 
                     control.getName(), risk.getName(), e.getMessage());
            // Ne pas faire échouer la transaction pour un problème d'historique
        }
    }

    /**
     * Récupère l'historique des changements d'efficacité pour un contrôle
     */
    public List<ControlEffectivenessHistory> getControlEffectivenessHistory(Long controlId) {
        return controlEffectivenessHistoryRepository.findByControlIdOrderByChangedAtDesc(controlId);
    }

    /**
     * Récupère l'historique des changements d'efficacité pour un risque
     */
    public List<ControlEffectivenessHistory> getRiskEffectivenessHistory(Long riskId) {
        return controlEffectivenessHistoryRepository.findByRiskIdOrderByChangedAtDesc(riskId);
    }
} 