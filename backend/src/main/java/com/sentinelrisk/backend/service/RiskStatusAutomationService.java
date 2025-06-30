package com.sentinelrisk.backend.service;

import com.sentinelrisk.backend.model.Risk;
import com.sentinelrisk.backend.model.RiskStatusHistory;
import com.sentinelrisk.backend.model.User;
import com.sentinelrisk.backend.repository.RiskStatusHistoryRepository;
import com.sentinelrisk.backend.repository.RiskRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class RiskStatusAutomationService {

    private final RiskRepository riskRepository;
    private final RiskStatusHistoryRepository riskStatusHistoryRepository;
    private final UserService userService;

    /**
     * Déclenche une évaluation du risque (IDENTIFIED → IN_ASSESSMENT)
     */
    public Risk triggerAssessment(Long riskId) {
        return changeRiskStatus(riskId, Risk.Status.IN_ASSESSMENT, "Évaluation déclenchée");
    }

    /**
     * Marque le risque comme évalué (IN_ASSESSMENT → MITIGATED)
     */
    public Risk markAsAssessed(Long riskId) {
        return changeRiskStatus(riskId, Risk.Status.MITIGATED, "Risque évalué");
    }

    /**
     * Marque le risque comme accepté (MITIGATED → ACCEPTED)
     */
    public Risk markAsAccepted(Long riskId) {
        return changeRiskStatus(riskId, Risk.Status.ACCEPTED, "Risque accepté");
    }

    /**
     * Ferme le risque (ACCEPTED → CLOSED)
     */
    public Risk closeRisk(Long riskId) {
        return changeRiskStatus(riskId, Risk.Status.CLOSED, "Risque fermé");
    }

    /**
     * Change le statut d'un risque et enregistre l'historique
     */
    public Risk changeRiskStatus(Long riskId, Risk.Status newStatus, String reason) {
        Risk risk = riskRepository.findById(riskId)
                .orElseThrow(() -> new RuntimeException("Risque non trouvé avec l'ID: " + riskId));

        Risk.Status previousStatus = risk.getStatus();
        
        // Vérifier si la transition est valide
        if (!isValidTransition(previousStatus, newStatus)) {
            throw new IllegalStateException(
                String.format("Transition invalide de %s vers %s", previousStatus, newStatus));
        }

        // Changer le statut
        risk.setStatus(newStatus);
        Risk savedRisk = riskRepository.save(risk);

        // Enregistrer l'historique
        User currentUser = getCurrentUser();
        RiskStatusHistory history = new RiskStatusHistory(
            savedRisk, previousStatus, newStatus, reason, currentUser);
        riskStatusHistoryRepository.save(history);

        log.info("Statut du risque {} changé de {} vers {} par l'utilisateur {}", 
                riskId, previousStatus, newStatus, currentUser != null ? currentUser.getUsername() : "Système");

        return savedRisk;
    }

    /**
     * Récupère l'historique des statuts pour un risque
     */
    public List<RiskStatusHistory> getRiskStatusHistory(Long riskId) {
        return riskStatusHistoryRepository.findByRiskIdOrderByChangedAtDesc(riskId);
    }

    /**
     * Vérifie si une transition de statut est valide
     */
    private boolean isValidTransition(Risk.Status from, Risk.Status to) {
        if (from == null) {
            // Premier statut, toujours valide
            return true;
        }

        switch (from) {
            case IDENTIFIED:
                return to == Risk.Status.IN_ASSESSMENT;
            case IN_ASSESSMENT:
                return to == Risk.Status.MITIGATED;
            case MITIGATED:
                return to == Risk.Status.ACCEPTED || to == Risk.Status.CLOSED;
            case ACCEPTED:
                return to == Risk.Status.CLOSED;
            case CLOSED:
                // Une fois fermé, on ne peut plus changer le statut
                return false;
            default:
                return false;
        }
    }

    /**
     * Récupère l'utilisateur actuellement connecté
     */
    private User getCurrentUser() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null && authentication.isAuthenticated() && 
                !"anonymousUser".equals(authentication.getName())) {
                return userService.getUserByUsername(authentication.getName());
            }
        } catch (Exception e) {
            log.warn("Impossible de récupérer l'utilisateur actuel: {}", e.getMessage());
        }
        return null;
    }

    /**
     * Récupère le dernier changement de statut pour un risque
     */
    public RiskStatusHistory getLatestStatusChange(Long riskId) {
        return riskStatusHistoryRepository.findLatestByRiskId(riskId);
    }
} 