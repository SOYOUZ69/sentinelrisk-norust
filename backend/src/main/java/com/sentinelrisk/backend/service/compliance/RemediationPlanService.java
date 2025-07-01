package com.sentinelrisk.backend.service.compliance;

import com.sentinelrisk.backend.domain.compliance.RemediationPlan;
import com.sentinelrisk.backend.domain.compliance.RiskComplianceMapping;
import com.sentinelrisk.backend.model.Risk;
import com.sentinelrisk.backend.model.User;
import com.sentinelrisk.backend.repository.RiskRepository;
import com.sentinelrisk.backend.repository.UserRepository;
import com.sentinelrisk.backend.repository.compliance.RemediationPlanRepository;
import com.sentinelrisk.backend.repository.compliance.RiskComplianceMappingRepository;
import com.sentinelrisk.backend.service.RiskImpactHistoryService;
import com.sentinelrisk.backend.service.dto.compliance.RemediationPlanDTO;
import com.sentinelrisk.backend.service.mapper.RemediationPlanMapper;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

/**
 * Service pour la gestion des plans de remédiation (RemediationPlan)
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class RemediationPlanService {

    private final RemediationPlanRepository remediationPlanRepository;
    private final RiskComplianceMappingRepository mappingRepository;
    private final UserRepository userRepository;
    private final RiskRepository riskRepository;
    private final RemediationPlanMapper remediationPlanMapper;
    private final RiskImpactHistoryService riskImpactHistoryService;

    /**
     * Crée un nouveau plan de remédiation
     * @param planDTO DTO contenant les informations du plan à créer
     * @return DTO du plan créé
     * @throws EntityNotFoundException si le mapping ou l'utilisateur n'existe pas
     * @throws IllegalArgumentException si la date d'échéance est invalide
     */
    public RemediationPlanDTO createPlan(RemediationPlanDTO planDTO) {
        log.debug("Création d'un nouveau plan de remédiation pour le mapping ID: {}", planDTO.getMappingId());
        
        // Vérifier que le mapping existe
        if (!mappingRepository.existsById(planDTO.getMappingId())) {
            throw new EntityNotFoundException("Mapping non trouvé avec ID: " + planDTO.getMappingId() +
                " (IDs disponibles: " + mappingRepository.findAll().stream().map(RiskComplianceMapping::getId).toList() + ")");
        }
        
        RiskComplianceMapping mapping = mappingRepository.findById(planDTO.getMappingId())
                .orElseThrow(() -> new EntityNotFoundException("Mapping non trouvé avec ID: " + planDTO.getMappingId()));
        
        // Vérifier l'existence de l'utilisateur responsable si spécifié
        User owner = null;
        if (planDTO.getOwnerId() != null) {
            String ownerId = planDTO.getOwnerId().toString();
            owner = userRepository.findById(ownerId)
                    .orElseThrow(() -> new EntityNotFoundException("Utilisateur non trouvé avec ID: " + ownerId));
        }
        
        // Créer le plan
        RemediationPlan plan = new RemediationPlan();
        plan.setMapping(mapping);
        plan.setTitle(planDTO.getTitle());
        plan.setDescription(planDTO.getDescription());
        plan.setOwner(owner);
        plan.setDueDate(planDTO.getDueDate());
        plan.setStatus(planDTO.getStatus() != null ? planDTO.getStatus() : RemediationPlan.Status.TODO);
        plan.setEfficacite(planDTO.getEfficacite() != null ? planDTO.getEfficacite() : 0);
        
        RemediationPlan savedPlan = remediationPlanRepository.save(plan);
        return remediationPlanMapper.toDto(savedPlan);
    }

    /**
     * Met à jour un plan de remédiation existant
     * @param id ID du plan à mettre à jour
     * @param planDTO DTO contenant les nouvelles informations
     * @return DTO du plan mis à jour
     * @throws EntityNotFoundException si le plan, le mapping ou l'utilisateur n'existe pas
     * @throws IllegalArgumentException si la date d'échéance est invalide
     */
    public RemediationPlanDTO updatePlan(Long id, RemediationPlanDTO planDTO) {
        log.debug("Mise à jour du plan de remédiation ID: {}", id);
        
        // Vérifier que le plan existe
        RemediationPlan existingPlan = remediationPlanRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Plan de remédiation non trouvé avec ID: " + id));
        
        // Vérifier le mapping si modifié
        if (planDTO.getMappingId() != null && !planDTO.getMappingId().equals(existingPlan.getMapping().getId())) {
            RiskComplianceMapping newMapping = mappingRepository.findById(planDTO.getMappingId())
                    .orElseThrow(() -> new EntityNotFoundException("Mapping non trouvé avec ID: " + planDTO.getMappingId()));
            existingPlan.setMapping(newMapping);
        }
        
        // Vérifier l'utilisateur si modifié
        if (planDTO.getOwnerId() != null) {
            String ownerId = planDTO.getOwnerId().toString();
            User owner = userRepository.findById(ownerId)
                    .orElseThrow(() -> new EntityNotFoundException("Utilisateur non trouvé avec ID: " + ownerId));
            existingPlan.setOwner(owner);
        }
        
        // Mettre à jour les champs
        if (planDTO.getTitle() != null) {
            existingPlan.setTitle(planDTO.getTitle());
        }
        
        if (planDTO.getDescription() != null) {
            existingPlan.setDescription(planDTO.getDescription());
        }
        
        if (planDTO.getDueDate() != null) {
            existingPlan.setDueDate(planDTO.getDueDate());
        }
        
        if (planDTO.getStatus() != null) {
            existingPlan.setStatus(planDTO.getStatus());
        }
        
        if (planDTO.getEfficacite() != null) {
            existingPlan.setEfficacite(planDTO.getEfficacite());
        }
        
        RemediationPlan updatedPlan = remediationPlanRepository.save(existingPlan);
        return remediationPlanMapper.toDto(updatedPlan);
    }

    /**
     * Supprime un plan de remédiation
     * @param id ID du plan à supprimer
     * @throws EntityNotFoundException si le plan n'existe pas
     */
    public void deletePlan(Long id) {
        log.debug("Suppression du plan de remédiation ID: {}", id);
        
        // Vérifier que le plan existe
        if (!remediationPlanRepository.existsById(id)) {
            throw new EntityNotFoundException("Plan de remédiation non trouvé avec ID: " + id);
        }
        
        remediationPlanRepository.deleteById(id);
    }

    /**
     * Récupère un plan de remédiation par son ID
     * @param id ID du plan à récupérer
     * @return DTO du plan trouvé
     * @throws EntityNotFoundException si le plan n'existe pas
     */
    @Transactional(readOnly = true)
    public RemediationPlanDTO getPlanById(Long id) {
        log.debug("Récupération du plan de remédiation ID: {}", id);
        
        RemediationPlan plan = remediationPlanRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Plan de remédiation non trouvé avec ID: " + id));
        
        return remediationPlanMapper.toDto(plan);
    }

    /**
     * Liste tous les plans de remédiation
     * @return Liste des plans
     */
    @Transactional(readOnly = true)
    public List<RemediationPlanDTO> getAllPlans() {
        log.debug("Récupération de tous les plans de remédiation");
        
        List<RemediationPlan> plans = remediationPlanRepository.findAll();
        return remediationPlanMapper.toDtoList(plans);
    }

    /**
     * Liste les plans de remédiation pour un mapping donné
     * @param mappingId ID du mapping
     * @return Liste des plans associés au mapping
     */
    @Transactional(readOnly = true)
    public List<RemediationPlanDTO> getPlansByMapping(Long mappingId) {
        log.debug("Récupération des plans de remédiation pour le mapping ID: {}", mappingId);
        
        // Vérifier que le mapping existe
        if (!mappingRepository.existsById(mappingId)) {
            throw new EntityNotFoundException("Mapping non trouvé avec ID: " + mappingId);
        }
        
        List<RemediationPlan> plans = remediationPlanRepository.findByMappingId(mappingId);
        return remediationPlanMapper.toDtoList(plans);
    }

    /**
     * Liste les plans de remédiation assignés à un utilisateur
     * @param ownerId ID de l'utilisateur
     * @return Liste des plans assignés à l'utilisateur
     */
    @Transactional(readOnly = true)
    public List<RemediationPlanDTO> getPlansByOwner(String ownerId) {
        log.debug("Récupération des plans de remédiation pour l'utilisateur ID: {}", ownerId);
        
        // Vérifier que l'utilisateur existe
        if (!userRepository.existsById(ownerId)) {
            throw new EntityNotFoundException("Utilisateur non trouvé avec ID: " + ownerId);
        }
        
        List<RemediationPlan> plans = remediationPlanRepository.findByOwnerId(ownerId);
        return remediationPlanMapper.toDtoList(plans);
    }

    /**
     * Met à jour l'efficacité d'un plan et applique la logique métier d'impact sur le risque
     * @param planId ID du plan
     * @param newEfficacite Nouvelle efficacité (0-100)
     * @param changedByUser Utilisateur qui effectue le changement
     * @param changeReason Raison du changement
     * @return DTO du plan mis à jour
     */
    public RemediationPlanDTO updatePlanEfficacite(Long planId, Integer newEfficacite, User changedByUser, String changeReason) {
        log.info("=== AUTOMATISATION: Mise à jour de l'efficacité du plan {}: {}% (utilisateur: {})", 
                planId, newEfficacite, changedByUser != null ? changedByUser.getId() : "null");
        
        try {
            // Validation de l'efficacité
            if (newEfficacite < 0 || newEfficacite > 100) {
                log.error("AUTOMATISATION: Efficacité invalide: {} (doit être entre 0 et 100)", newEfficacite);
                throw new IllegalArgumentException("L'efficacité doit être comprise entre 0 et 100");
            }
            
            // Récupérer le plan
            log.info("AUTOMATISATION: Récupération du plan avec ID: {}", planId);
            RemediationPlan plan = remediationPlanRepository.findById(planId)
                    .orElseThrow(() -> new EntityNotFoundException("Plan de remédiation non trouvé avec ID: " + planId));
            
            log.info("AUTOMATISATION: Plan trouvé - ID: {}, Titre: {}, Statut actuel: {}, Efficacité actuelle: {}%", 
                    plan.getId(), plan.getTitle(), plan.getStatus(), plan.getEfficacite());
            
            // Récupérer l'ancienne efficacité
            Integer oldEfficacite = plan.getEfficacite();
            
            // Mettre à jour l'efficacité
            log.info("AUTOMATISATION: Sauvegarde de la nouvelle efficacité: {}%", newEfficacite);
            plan.setEfficacite(newEfficacite);
            RemediationPlan savedPlan = remediationPlanRepository.save(plan);
            
            log.info("AUTOMATISATION: Efficacité mise à jour: {}% -> {}%", oldEfficacite, newEfficacite);
            
            // Appliquer la logique métier d'impact sur le risque
            log.info("AUTOMATISATION: Application de la logique d'impact sur le risque...");
            applyRiskImpactLogic(plan, oldEfficacite, newEfficacite, changedByUser, changeReason);
            
            log.info("AUTOMATISATION: Mise à jour de l'efficacité terminée pour le plan {}", planId);
            return remediationPlanMapper.toDto(savedPlan);
            
        } catch (Exception e) {
            log.error("AUTOMATISATION: Erreur lors de la mise à jour de l'efficacité du plan {}: {}", planId, e.getMessage(), e);
            throw e;
        }
    }

    /**
     * Met à jour le statut d'un plan et applique la logique métier d'impact sur le risque
     * @param planId ID du plan
     * @param newStatus Nouveau statut
     * @param changedByUser Utilisateur qui effectue le changement
     * @param changeReason Raison du changement
     * @return DTO du plan mis à jour
     */
    public RemediationPlanDTO updatePlanStatus(Long planId, RemediationPlan.Status newStatus, User changedByUser, String changeReason) {
        log.info("=== AUTOMATISATION: Mise à jour du statut du plan {}: {} (utilisateur: {})", 
                planId, newStatus, changedByUser != null ? changedByUser.getId() : "null");
        
        // Récupérer le plan
        RemediationPlan plan = remediationPlanRepository.findById(planId)
                .orElseThrow(() -> new EntityNotFoundException("Plan de remédiation non trouvé avec ID: " + planId));
        
        log.info("AUTOMATISATION: Plan trouvé - ID: {}, Titre: {}, Statut actuel: {}, Efficacité actuelle: {}%", 
                plan.getId(), plan.getTitle(), plan.getStatus(), plan.getEfficacite());
        
        // Récupérer l'ancien statut
        RemediationPlan.Status oldStatus = plan.getStatus();
        
        // Mettre à jour le statut
        plan.setStatus(newStatus);
        RemediationPlan savedPlan = remediationPlanRepository.save(plan);
        
        log.info("AUTOMATISATION: Statut mis à jour: {} -> {}", oldStatus, newStatus);
        
        // Appliquer la logique métier d'impact sur le risque
        log.info("AUTOMATISATION: Application de la logique d'impact sur le risque...");
        applyRiskImpactLogic(plan, plan.getEfficacite(), plan.getEfficacite(), changedByUser, changeReason);
        
        log.info("AUTOMATISATION: Mise à jour du statut terminée pour le plan {}", planId);
        return remediationPlanMapper.toDto(savedPlan);
    }

    /**
     * Applique la logique métier d'impact sur le risque selon les règles définies
     * @param plan Le plan de remédiation
     * @param oldEfficacite Ancienne efficacité
     * @param newEfficacite Nouvelle efficacité
     * @param changedByUser Utilisateur qui a effectué le changement
     * @param changeReason Raison du changement
     */
    private void applyRiskImpactLogic(RemediationPlan plan, Integer oldEfficacite, Integer newEfficacite, 
                                     User changedByUser, String changeReason) {
        log.info("=== LOGIQUE MÉTIER: Début de l'application de la logique d'impact");
        log.info("LOGIQUE MÉTIER: Plan - ID: {}, Titre: {}, Statut: {}, Efficacité: {}% -> {}%", 
                plan.getId(), plan.getTitle(), plan.getStatus(), oldEfficacite, newEfficacite);
        
        try {
            // Récupérer le risque associé via le mapping avec gestion d'erreur
            RiskComplianceMapping mapping = null;
            try {
                mapping = plan.getMapping();
                log.info("LOGIQUE MÉTIER: Mapping trouvé - ID: {}", mapping != null ? mapping.getId() : "null");
            } catch (Exception e) {
                log.error("LOGIQUE MÉTIER: Erreur lors de la récupération du mapping: {}", e.getMessage());
                return;
            }
            
            Risk risk = null;
            try {
                risk = mapping != null ? mapping.getRisk() : null;
                log.info("LOGIQUE MÉTIER: Risque trouvé - ID: {}, Titre: {}, Impact actuel: {}", 
                        risk != null ? risk.getId() : "null", 
                        risk != null ? risk.getName() : "null", 
                        risk != null ? risk.getImpactLevel() : "null");
            } catch (Exception e) {
                log.error("LOGIQUE MÉTIER: Erreur lors de la récupération du risque: {}", e.getMessage());
                return;
            }
            
            if (risk == null) {
                log.warn("LOGIQUE MÉTIER: Impossible d'appliquer la logique d'impact: risque non trouvé pour le plan {}", plan.getId());
                return;
            }
            
            Risk.ImpactLevel currentImpactLevel = risk.getImpactLevel();
            Risk.ImpactLevel newImpactLevel = null;
            boolean shouldUpdateRisk = false;
            String impactReason = "";
            
            log.info("LOGIQUE MÉTIER: Évaluation des conditions - Efficacité: {}%, Statut: {}", newEfficacite, plan.getStatus());
            
            // Règle 1: Si efficacité ≥ 70 % ET statut = Terminé ➝ réduire l'impact d'un niveau
            if (newEfficacite >= 70 && plan.getStatus() == RemediationPlan.Status.DONE) {
                newImpactLevel = reduceImpactLevel(currentImpactLevel);
                shouldUpdateRisk = true;
                impactReason = "Plan d'action efficace (efficacité: " + newEfficacite + "%, statut: " + plan.getStatus() + ")";
                log.info("LOGIQUE MÉTIER: Règle 1 appliquée - Réduction d'impact: {} -> {}", currentImpactLevel, newImpactLevel);
            }
            // Règle 2: Si efficacité < 30 % ou statut ≠ Terminé ➝ aucun effet sur le risque
            else if (newEfficacite < 30 || plan.getStatus() != RemediationPlan.Status.DONE) {
                shouldUpdateRisk = false;
                log.info("LOGIQUE MÉTIER: Règle 2 appliquée - Aucun effet (efficacité < 30% ou statut ≠ DONE)");
            }
            // Règle 3: Si 30% ≤ efficacité < 70% ET statut = Terminé ➝ aucun effet (zone neutre)
            else {
                shouldUpdateRisk = false;
                log.info("LOGIQUE MÉTIER: Règle 3 appliquée - Zone neutre (30% ≤ efficacité < 70% et statut = DONE)");
            }
            
            // Appliquer le changement d'impact si nécessaire
            if (shouldUpdateRisk && newImpactLevel != null && newImpactLevel != currentImpactLevel) {
                log.info("LOGIQUE MÉTIER: Application du changement d'impact: risque {} - {} -> {} (plan: {}, efficacité: {}%)", 
                        risk.getId(), currentImpactLevel, newImpactLevel, plan.getId(), newEfficacite);
                
                // Mettre à jour le niveau d'impact du risque
                risk.setImpactLevel(newImpactLevel);
                riskRepository.save(risk);
                log.info("LOGIQUE MÉTIER: Impact du risque mis à jour en base de données");
                
                // Enregistrer dans l'historique d'impact
                log.info("LOGIQUE MÉTIER: Enregistrement dans l'historique d'impact...");
                riskImpactHistoryService.recordImpactChange(
                    risk, plan, currentImpactLevel, newImpactLevel, 
                    newEfficacite, plan.getStatus(), changedByUser, 
                    changeReason + " - " + impactReason
                );
                log.info("LOGIQUE MÉTIER: Historique d'impact enregistré avec succès");
            } else {
                log.info("LOGIQUE MÉTIER: Aucun changement d'impact appliqué pour le risque {} (plan: {}, efficacité: {}%, statut: {})", 
                        risk.getId(), plan.getId(), newEfficacite, plan.getStatus());
                log.info("LOGIQUE MÉTIER: Raison - shouldUpdateRisk: {}, newImpactLevel: {}, différent: {}", 
                        shouldUpdateRisk, newImpactLevel, newImpactLevel != currentImpactLevel);
            }
            
            log.info("=== LOGIQUE MÉTIER: Fin de l'application de la logique d'impact");
            
        } catch (Exception e) {
            log.error("LOGIQUE MÉTIER: Erreur lors de l'application de la logique d'impact pour le plan {}: {}", 
                    plan.getId(), e.getMessage(), e);
        }
    }

    /**
     * Réduit le niveau d'impact d'un niveau selon la hiérarchie définie
     * @param currentLevel Niveau d'impact actuel
     * @return Nouveau niveau d'impact (ou le même si déjà au minimum)
     */
    private Risk.ImpactLevel reduceImpactLevel(Risk.ImpactLevel currentLevel) {
        if (currentLevel == null) {
            return Risk.ImpactLevel.SEVERE; // Valeur par défaut si null
        }
        
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
} 