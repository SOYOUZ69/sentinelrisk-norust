package com.sentinelrisk.backend.service;

import com.sentinelrisk.backend.model.Assessment;
import com.sentinelrisk.backend.model.Risk;
import com.sentinelrisk.backend.model.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service pour gérer les transitions automatiques de statut de risque
 * basées sur les actions d'assessment
 */
@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class RiskStatusTransitionService {

    private final RiskStatusHistoryService riskStatusHistoryService;

    /**
     * Détermine et applique le nouveau statut de risque basé sur l'action d'assessment
     * @param risk Le risque concerné
     * @param assessment L'assessment qui déclenche le changement
     * @param action L'action effectuée (CREATE, UPDATE, COMPLETE)
     * @param user L'utilisateur qui effectue l'action
     */
    public void handleAssessmentStatusTransition(Risk risk, Assessment assessment, 
                                                AssessmentAction action, User user) {
        
        Risk.Status currentStatus = risk.getStatus();
        Risk.Status newStatus = determineNewStatus(currentStatus, assessment, action);
        System.out.println("NewStatus: " + newStatus);
        if (newStatus != null && !newStatus.equals(currentStatus)) {
            // Enregistrer l'ancien statut - s'assurer qu'il n'est jamais null
            Risk.Status previousStatus = currentStatus != null ? currentStatus : Risk.Status.IDENTIFIED;
            
            // Mettre à jour le statut du risque
            risk.setStatus(newStatus);
            
            // Enregistrer le changement dans l'historique
            String changeReason = buildChangeReason(action, assessment);
            System.out.println("ChangeReason: " + changeReason);
            riskStatusHistoryService.recordStatusChange(risk, previousStatus, newStatus, user, changeReason);
            
            log.info("Statut du risque {} changé de {} à {} - Raison: {}", 
                    risk.getId(), previousStatus, newStatus, changeReason);
        }
    }

    /**
     * Détermine le nouveau statut basé sur le statut actuel et l'action d'assessment
     */
    private Risk.Status determineNewStatus(Risk.Status currentStatus, Assessment assessment, AssessmentAction action) {
        
        switch (action) {
            case CREATE:
                return handleAssessmentCreation(currentStatus, assessment);
            case UPDATE:
                return handleAssessmentUpdate(currentStatus, assessment);
            case COMPLETE:
                return handleAssessmentCompletion(currentStatus, assessment);
            default:
                return null;
        }
    }

    /**
     * Gère la création d'un assessment
     */
    private Risk.Status handleAssessmentCreation(Risk.Status currentStatus, Assessment assessment) {
        switch (currentStatus) {
            case IDENTIFIED:
                // Si un assessment est créé pour un risque identifié, passer en évaluation
                return Risk.Status.IN_ASSESSMENT;
            case IN_ASSESSMENT:
                // Si déjà en évaluation, rester en évaluation
                return Risk.Status.IN_ASSESSMENT;
            case MITIGATED:
            case ACCEPTED:
            case CLOSED:
                // Si le risque était déjà traité, le remettre en évaluation
                return Risk.Status.IN_ASSESSMENT;
            default:
                return null;
        }
    }

    /**
     * Gère la mise à jour d'un assessment
     */
    private Risk.Status handleAssessmentUpdate(Risk.Status currentStatus, Assessment assessment) {
        // La mise à jour d'un assessment ne change généralement pas le statut du risque
        // sauf si l'assessment passe à COMPLETED
        if (assessment.getStatus() == Assessment.Status.COMPLETED) {
            return handleAssessmentCompletion(currentStatus, assessment);
        }
        return null;
    }

    /**
     * Gère la finalisation d'un assessment
     */
    private Risk.Status handleAssessmentCompletion(Risk.Status currentStatus, Assessment assessment) {
        // Quand un assessment est complété, le risque peut être mitigué ou accepté
        // selon les conclusions de l'assessment
        if (assessment.getFindings() != null && !assessment.getFindings().trim().isEmpty()) {
            // Si des conclusions sont fournies, considérer comme mitigué
            return Risk.Status.MITIGATED;
        } else {
            // Sinon, considérer comme accepté
            return Risk.Status.ACCEPTED;
        }
    }

    /**
     * Construit la raison du changement de statut
     */
    private String buildChangeReason(AssessmentAction action, Assessment assessment) {
        switch (action) {
            case CREATE:
                return "Création d'un assessment - Risque mis en évaluation";
            case UPDATE:
                return "Mise à jour de l'assessment #" + assessment.getId();
            case COMPLETE:
                return "Assessment #" + assessment.getId() + " complété - " + 
                       (assessment.getFindings() != null && !assessment.getFindings().trim().isEmpty() 
                        ? "Risque mitigué" : "Risque accepté");
            default:
                return "Changement de statut automatique";
        }
    }

    /**
     * Enum pour les actions d'assessment
     */
    public enum AssessmentAction {
        CREATE,    // Création d'un nouvel assessment
        UPDATE,    // Mise à jour d'un assessment existant
        COMPLETE   // Finalisation d'un assessment
    }
} 