package com.sentinelrisk.backend.service.compliance;

import com.sentinelrisk.backend.domain.compliance.RemediationPlan;
import com.sentinelrisk.backend.domain.compliance.RiskComplianceMapping;
import com.sentinelrisk.backend.model.User;
import com.sentinelrisk.backend.repository.UserRepository;
import com.sentinelrisk.backend.repository.compliance.RemediationPlanRepository;
import com.sentinelrisk.backend.repository.compliance.RiskComplianceMappingRepository;
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
    private final RemediationPlanMapper remediationPlanMapper;

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
} 