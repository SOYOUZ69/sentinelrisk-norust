package com.sentinelrisk.backend.service.compliance;

import com.sentinelrisk.backend.domain.compliance.ComplianceRequirement;
import com.sentinelrisk.backend.domain.compliance.RiskComplianceMapping;
import com.sentinelrisk.backend.domain.compliance.RiskComplianceMapping.ComplianceStatus;
import com.sentinelrisk.backend.model.Risk;
import com.sentinelrisk.backend.repository.RiskRepository;
import com.sentinelrisk.backend.repository.compliance.ComplianceRequirementRepository;
import com.sentinelrisk.backend.repository.compliance.RiskComplianceMappingRepository;
import com.sentinelrisk.backend.service.dto.compliance.ComplianceRequirementDTO;
import com.sentinelrisk.backend.service.dto.compliance.GapAnalysisResponse;
import com.sentinelrisk.backend.service.mapper.ComplianceMapper;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import static java.util.stream.Collectors.counting;
import static java.util.stream.Collectors.groupingBy;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class RiskComplianceMappingService {

    private final RiskComplianceMappingRepository mappingRepository;
    private final RiskRepository riskRepository;
    private final ComplianceRequirementRepository requirementRepository;
    private final ComplianceMapper complianceMapper;

    /**
     * Récupère tous les mappings de conformité
     * @return Liste de tous les mappings
     */
    @Transactional(readOnly = true)
    public List<RiskComplianceMapping> getAllMappings() {
        log.debug("Récupération de tous les mappings de conformité");
        return mappingRepository.findAll();
    }

    /**
     * Récupère les mappings pour un risque donné
     * @param riskId ID du risque
     * @return Liste des mappings pour ce risque
     */
    @Transactional(readOnly = true)
    public List<RiskComplianceMapping> getMappingsByRisk(Long riskId) {
        log.debug("Récupération des mappings pour le risque ID: {}", riskId);
        
        // Vérifier que le risque existe
        if (!riskRepository.existsById(riskId)) {
            throw new EntityNotFoundException("Risque non trouvé avec ID: " + riskId);
        }
        
        return mappingRepository.findByRiskId(riskId);
    }

    /**
     * Récupère les mappings pour un framework donné
     * @param frameworkId ID du framework
     * @return Liste des mappings liés aux exigences du framework
     */
    @Transactional(readOnly = true)
    public List<RiskComplianceMapping> getMappingsByFramework(Long frameworkId) {
        log.debug("Récupération des mappings pour le framework ID: {}", frameworkId);
        return mappingRepository.findByFrameworkId(frameworkId);
    }

    /**
     * Récupère un mapping par son ID
     * @param id ID du mapping
     * @return Le mapping trouvé
     * @throws EntityNotFoundException si le mapping n'existe pas
     */
    @Transactional(readOnly = true)
    public RiskComplianceMapping getMappingById(Long id) {
        log.debug("Récupération du mapping de conformité avec ID: {}", id);
        return mappingRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Mapping de conformité non trouvé avec ID: " + id));
    }

    /**
     * Crée un nouveau mapping de conformité
     * @param mapping Données du mapping à créer
     * @return Le mapping créé
     * @throws EntityNotFoundException si le risque ou l'exigence n'existe pas
     * @throws IllegalArgumentException si un mapping existe déjà pour ce risque et cette exigence
     */
    public RiskComplianceMapping createMapping(RiskComplianceMapping mapping) {
        // Extraction des IDs - veiller à NullPointerException
        final Long riskId;
        final Long requirementId;
        
        if (mapping.getRisk() != null) {
            riskId = mapping.getRisk().getId();
            log.debug("Création d'un nouveau mapping de conformité pour le risque ID: {}", riskId);
        } else {
            throw new EntityNotFoundException("Le risque ne peut pas être null");
        }
        
        if (mapping.getRequirement() != null) {
            requirementId = mapping.getRequirement().getId();
            log.debug("et l'exigence ID: {}", requirementId);
        } else {
            throw new EntityNotFoundException("L'exigence ne peut pas être null");
        }
        
        // Vérifier l'existence du risque et de l'exigence
        Risk risk = riskRepository.findById(riskId)
                .orElseThrow(() -> new EntityNotFoundException("Risque non trouvé avec ID: " + riskId));
                
        ComplianceRequirement requirement = requirementRepository.findById(requirementId)
                .orElseThrow(() -> new EntityNotFoundException("Exigence de conformité non trouvée avec ID: " + requirementId));
        
        // Vérifier l'unicité du mapping risque-exigence
        if (mappingRepository.existsByRiskIdAndRequirementId(riskId, requirementId)) {
            throw new IllegalArgumentException("Un mapping existe déjà entre ce risque et cette exigence");
        }
        
        // Associer correctement le risque et l'exigence chargés depuis la base
        mapping.setRisk(risk);
        mapping.setRequirement(requirement);
        
        // Définir un statut par défaut si non fourni
        if (mapping.getStatus() == null) {
            mapping.setStatus(ComplianceStatus.NON_COMPLIANT);
        }
        
        return mappingRepository.save(mapping);
    }

    /**
     * Met à jour un mapping existant
     * @param id ID du mapping à mettre à jour
     * @param mappingDetails Nouvelles données du mapping
     * @return Le mapping mis à jour
     * @throws EntityNotFoundException si le mapping n'existe pas
     */
    public RiskComplianceMapping updateMapping(Long id, RiskComplianceMapping mappingDetails) {
        log.debug("Mise à jour du mapping de conformité avec ID: {}", id);
        
        RiskComplianceMapping existingMapping = getMappingById(id);
        
        // Mettre à jour les champs modifiables
        existingMapping.setStatus(mappingDetails.getStatus());
        existingMapping.setEvidence(mappingDetails.getEvidence());
        existingMapping.setRemediationPlan(mappingDetails.getRemediationPlan());
        
        return mappingRepository.save(existingMapping);
    }

    /**
     * Met à jour le statut de conformité d'un mapping
     * @param id ID du mapping
     * @param status Nouveau statut
     * @return Le mapping mis à jour
     * @throws EntityNotFoundException si le mapping n'existe pas
     */
    public RiskComplianceMapping updateMappingStatus(Long id, ComplianceStatus status) {
        log.debug("Mise à jour du statut du mapping ID: {} vers {}", id, status);
        
        RiskComplianceMapping mapping = getMappingById(id);
        mapping.setStatus(status);
        
        return mappingRepository.save(mapping);
    }

    /**
     * Supprime un mapping
     * @param id ID du mapping à supprimer
     * @throws EntityNotFoundException si le mapping n'existe pas
     */
    public void deleteMapping(Long id) {
        log.debug("Suppression du mapping de conformité avec ID: {}", id);
        
        RiskComplianceMapping mapping = getMappingById(id);
        mappingRepository.delete(mapping);
    }

    /**
     * Réalise une analyse des écarts (gap analysis) pour un risque donné
     * par rapport à un framework spécifié
     * @param riskId ID du risque
     * @param frameworkId ID du framework
     * @return Liste des exigences du framework qui ne sont pas encore mappées à ce risque
     */
    @Transactional(readOnly = true)
    public List<ComplianceRequirement> getGapAnalysis(Long riskId, Long frameworkId) {
        log.debug("Analyse des écarts pour le risque ID: {} et le framework ID: {}", riskId, frameworkId);
        
        // Vérifier que le risque existe
        if (!riskRepository.existsById(riskId)) {
            throw new EntityNotFoundException("Risque non trouvé avec ID: " + riskId);
        }
        
        // Récupérer toutes les exigences du framework
        List<ComplianceRequirement> allRequirements = requirementRepository.findByFrameworkId(frameworkId);
        if (allRequirements.isEmpty()) {
            return allRequirements; // retourner liste vide si pas d'exigences
        }
        
        // Récupérer les exigences déjà mappées pour ce risque
        List<RiskComplianceMapping> existingMappings = mappingRepository.findByRiskId(riskId);
        
        // Si aucun mapping, retourner toutes les exigences
        if (existingMappings.isEmpty()) {
            return allRequirements;
        }
        
        // Filtrer les exigences qui ne sont pas encore mappées
        List<Long> mappedRequirementIds = existingMappings.stream()
                .map(mapping -> mapping.getRequirement().getId())
                .collect(Collectors.toList());
        
        return allRequirements.stream()
                .filter(req -> !mappedRequirementIds.contains(req.getId()))
                .collect(Collectors.toList());
    }

    /**
     * Calcule le niveau de conformité global d'un risque par rapport à un framework
     * @param riskId ID du risque
     * @param frameworkId ID du framework
     * @return Pourcentage de conformité (0-100)
     */
    @Transactional(readOnly = true)
    public double calculateCompliancePercentage(Long riskId, Long frameworkId) {
        log.debug("Calcul du pourcentage de conformité pour le risque ID: {} et le framework ID: {}", riskId, frameworkId);
        
        // Récupérer toutes les exigences du framework
        List<ComplianceRequirement> allRequirements = requirementRepository.findByFrameworkId(frameworkId);
        if (allRequirements.isEmpty()) {
            return 0.0; // Pas d'exigences, donc 0% de conformité
        }
        
        // Récupérer les mappings pour ce risque
        List<RiskComplianceMapping> mappings = mappingRepository.findByRiskId(riskId);
        
        // Filtrer les mappings qui concernent ce framework
        List<RiskComplianceMapping> relevantMappings = mappings.stream()
                .filter(mapping -> mapping.getRequirement().getFramework().getId().equals(frameworkId))
                .collect(Collectors.toList());
        
        // Compter les exigences conformes
        long compliantCount = relevantMappings.stream()
                .filter(mapping -> mapping.getStatus() == ComplianceStatus.COMPLIANT)
                .count();
        
        // Calculer le pourcentage
        return (double) compliantCount / allRequirements.size() * 100;
    }

    /**
     * Réalise une analyse complète des écarts de conformité pour un risque donné
     * par rapport à un framework spécifié, incluant des statistiques de conformité
     * @param riskId ID du risque
     * @param frameworkId ID du framework
     * @return DTO contenant les statistiques et les exigences non mappées
     */
    @Transactional(readOnly = true)
    public GapAnalysisResponse findGapAnalysis(Long riskId, Long frameworkId) {
        log.debug("Analyse complète des écarts pour le risque ID: {} et le framework ID: {}", riskId, frameworkId);
        
        // Vérifier que le risque existe
        if (!riskRepository.existsById(riskId)) {
            throw new EntityNotFoundException("Risque non trouvé avec ID: " + riskId);
        }
        
        // Récupérer toutes les exigences du framework
        List<ComplianceRequirement> allRequirements = requirementRepository.findByFrameworkId(frameworkId);
        if (allRequirements.isEmpty()) {
            // Framework vide ou inexistant
            Map<ComplianceStatus, Long> emptyCounts = Map.of();
            return new GapAnalysisResponse(emptyCounts, List.of(), 0.0);
        }
        
        // Récupérer les mappings pour ce risque et ce framework
        List<RiskComplianceMapping> mappings = mappingRepository.findByRiskId(riskId).stream()
                .filter(mapping -> mapping.getRequirement().getFramework().getId().equals(frameworkId))
                .collect(Collectors.toList());
        
        // 1. Calculer les comptages par statut
        Map<ComplianceStatus, Long> statusCounts = mappings.stream()
                .collect(groupingBy(RiskComplianceMapping::getStatus, counting()));
        
        // S'assurer que toutes les valeurs de statut sont présentes dans le Map
        for (ComplianceStatus status : ComplianceStatus.values()) {
            statusCounts.putIfAbsent(status, 0L);
        }
        
        // 2. Calculer les gaps (exigences non mappées)
        List<Long> mappedRequirementIds = mappings.stream()
                .map(mapping -> mapping.getRequirement().getId())
                .collect(Collectors.toList());
        
        List<ComplianceRequirement> gapRequirements = allRequirements.stream()
                .filter(req -> !mappedRequirementIds.contains(req.getId()))
                .collect(Collectors.toList());
        
        // 3. Convertir les entités en DTOs
        List<ComplianceRequirementDTO> gapRequirementDTOs = gapRequirements.stream()
                .map(complianceMapper::toRequirementDto)
                .collect(Collectors.toList());
        
        // 4. Calculer le pourcentage de conformité
        double compliancePercentage = 0.0;
        if (!allRequirements.isEmpty()) {
            long compliantCount = statusCounts.getOrDefault(ComplianceStatus.COMPLIANT, 0L);
            compliancePercentage = (double) compliantCount / allRequirements.size() * 100;
        }
        
        return new GapAnalysisResponse(statusCounts, gapRequirementDTOs, compliancePercentage);
    }
} 