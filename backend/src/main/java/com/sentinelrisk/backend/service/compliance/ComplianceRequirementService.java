package com.sentinelrisk.backend.service.compliance;

import com.sentinelrisk.backend.domain.compliance.ComplianceFramework;
import com.sentinelrisk.backend.domain.compliance.ComplianceRequirement;
import com.sentinelrisk.backend.domain.compliance.ComplianceRequirement.RequirementType;
import com.sentinelrisk.backend.repository.compliance.ComplianceFrameworkRepository;
import com.sentinelrisk.backend.repository.compliance.ComplianceRequirementRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ComplianceRequirementService {

    private final ComplianceRequirementRepository requirementRepository;
    private final ComplianceFrameworkRepository frameworkRepository;

    /**
     * Récupère toutes les exigences de conformité
     * @return Liste de toutes les exigences
     */
    @Transactional(readOnly = true)
    public List<ComplianceRequirement> getAllRequirements() {
        log.debug("Récupération de toutes les exigences de conformité");
        return requirementRepository.findAll();
    }

    /**
     * Récupère les exigences par framework
     * @param frameworkId ID du framework
     * @return Liste des exigences du framework
     */
    @Transactional(readOnly = true)
    public List<ComplianceRequirement> getRequirementsByFramework(Long frameworkId) {
        log.debug("Récupération des exigences pour le framework ID: {}", frameworkId);
        
        // Vérifier que le framework existe
        if (!frameworkRepository.existsById(frameworkId)) {
            throw new EntityNotFoundException("Framework de conformité non trouvé avec ID: " + frameworkId);
        }
        
        return requirementRepository.findByFrameworkId(frameworkId);
    }

    /**
     * Récupère les exigences par type et framework
     * @param type Type d'exigence
     * @param frameworkId ID du framework
     * @return Liste des exigences du type et du framework spécifiés
     */
    @Transactional(readOnly = true)
    public List<ComplianceRequirement> getRequirementsByTypeAndFramework(RequirementType type, Long frameworkId) {
        log.debug("Récupération des exigences de type {} pour le framework ID: {}", type, frameworkId);
        
        // Vérifier que le framework existe
        if (!frameworkRepository.existsById(frameworkId)) {
            throw new EntityNotFoundException("Framework de conformité non trouvé avec ID: " + frameworkId);
        }
        
        return requirementRepository.findByTypeAndFrameworkId(type, frameworkId);
    }

    /**
     * Récupère une exigence par son ID
     * @param id ID de l'exigence
     * @return L'exigence trouvée
     * @throws EntityNotFoundException si l'exigence n'existe pas
     */
    @Transactional(readOnly = true)
    public ComplianceRequirement getRequirementById(Long id) {
        log.debug("Récupération de l'exigence de conformité avec ID: {}", id);
        return requirementRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Exigence de conformité non trouvée avec ID: " + id));
    }

    /**
     * Crée une nouvelle exigence de conformité
     * @param requirement Données de l'exigence à créer
     * @return L'exigence créée
     * @throws EntityNotFoundException si le framework spécifié n'existe pas
     * @throws IllegalArgumentException si une exigence avec le même code existe déjà pour ce framework
     */
    public ComplianceRequirement createRequirement(ComplianceRequirement requirement) {
        log.debug("Création d'une nouvelle exigence de conformité: {}", requirement.getCode());
        
        // Vérifier l'existence du framework
        if (requirement.getFramework() == null || requirement.getFramework().getId() == null) {
            throw new IllegalArgumentException("Le framework est obligatoire pour créer une exigence");
        }
        
        Long frameworkId = requirement.getFramework().getId();
        ComplianceFramework framework = frameworkRepository.findById(frameworkId)
                .orElseThrow(() -> new EntityNotFoundException("Framework de conformité non trouvé avec ID: " + frameworkId));
        
        // Vérifier l'unicité du code dans le framework
        if (requirementRepository.existsByCodeAndFrameworkId(requirement.getCode(), frameworkId)) {
            throw new IllegalArgumentException("Une exigence avec le code '" + requirement.getCode() + 
                    "' existe déjà pour ce framework");
        }
        
        // Associer correctement le framework
        requirement.setFramework(framework);
        
        return requirementRepository.save(requirement);
    }

    /**
     * Met à jour une exigence existante
     * @param id ID de l'exigence à mettre à jour
     * @param requirementDetails Nouvelles données de l'exigence
     * @return L'exigence mise à jour
     * @throws EntityNotFoundException si l'exigence n'existe pas
     * @throws IllegalArgumentException si le nouveau code est déjà utilisé par une autre exigence dans le même framework
     */
    public ComplianceRequirement updateRequirement(Long id, ComplianceRequirement requirementDetails) {
        log.debug("Mise à jour de l'exigence de conformité avec ID: {}", id);
        
        ComplianceRequirement existingRequirement = getRequirementById(id);
        
        // Vérifier si le framework a changé
        Long newFrameworkId = requirementDetails.getFramework() != null ? requirementDetails.getFramework().getId() : null;
        if (newFrameworkId != null && !existingRequirement.getFramework().getId().equals(newFrameworkId)) {
            ComplianceFramework newFramework = frameworkRepository.findById(newFrameworkId)
                    .orElseThrow(() -> new EntityNotFoundException("Framework de conformité non trouvé avec ID: " + newFrameworkId));
            existingRequirement.setFramework(newFramework);
        }
        
        // Vérifier l'unicité du code si changé
        if (!existingRequirement.getCode().equals(requirementDetails.getCode())) {
            Long frameworkId = existingRequirement.getFramework().getId();
            requirementRepository.findByCodeAndFrameworkId(requirementDetails.getCode(), frameworkId)
                .ifPresent(req -> {
                    if (!req.getId().equals(id)) {
                        throw new IllegalArgumentException("Une exigence avec le code '" + requirementDetails.getCode() + 
                                "' existe déjà pour ce framework");
                    }
                });
        }
        
        // Mettre à jour les champs
        existingRequirement.setCode(requirementDetails.getCode());
        existingRequirement.setDescription(requirementDetails.getDescription());
        existingRequirement.setType(requirementDetails.getType());
        
        return requirementRepository.save(existingRequirement);
    }

    /**
     * Supprime une exigence
     * @param id ID de l'exigence à supprimer
     * @throws EntityNotFoundException si l'exigence n'existe pas
     */
    public void deleteRequirement(Long id) {
        log.debug("Suppression de l'exigence de conformité avec ID: {}", id);
        
        ComplianceRequirement requirement = getRequirementById(id);
        requirementRepository.delete(requirement);
    }
} 