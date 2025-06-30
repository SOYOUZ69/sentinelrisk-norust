package com.sentinelrisk.backend.service;

import com.sentinelrisk.backend.dto.RiskRequest;
import com.sentinelrisk.backend.dto.RiskResponse;
import com.sentinelrisk.backend.exception.DuplicateRiskException;
import com.sentinelrisk.backend.mapper.RiskMapper;
import com.sentinelrisk.backend.model.Risk;
import com.sentinelrisk.backend.model.Category;
import com.sentinelrisk.backend.model.Control;
import com.sentinelrisk.backend.model.User;
import com.sentinelrisk.backend.repository.RiskRepository;
import com.sentinelrisk.backend.repository.ControlRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.HashSet;
import java.util.Map;
import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;

@Service
@RequiredArgsConstructor
@Transactional
public class RiskService {

    private final RiskRepository riskRepository;
    private final CategoryService categoryService;
    private final ControlRepository controlRepository;
    private final RiskMapper riskMapper;
    private final DidGeneratorService didGeneratorService;
    private final AppSettingsService appSettingsService;
    private final UserService userService;

    public List<RiskResponse> getAllRisks() {
        List<Risk> risks = riskRepository.findAll();
        return riskMapper.toResponseList(risks);
    }

    public RiskResponse getRiskById(Long id) {
        Risk risk = findRiskById(id);
        return riskMapper.toResponse(risk);
    }
    
    // Méthode pour récupérer directement l'entité Risk
    public Risk getRiskEntityById(Long id) {
        return findRiskById(id);
    }

    public List<RiskResponse> getRisksByCategory(Long categoryId) {
        Category category = categoryService.getCategoryById(categoryId);
        List<Risk> risks = riskRepository.findByCategory(category);
        return riskMapper.toResponseList(risks);
    }

    public List<RiskResponse> getRisksByStatus(Risk.Status status) {
        List<Risk> risks = riskRepository.findByStatus(status);
        return riskMapper.toResponseList(risks);
    }

    public List<RiskResponse> getHighRisks(int minScore) {
        List<Risk> risks = riskRepository.findHighRisks(minScore);
        return riskMapper.toResponseList(risks);
    }

    public RiskResponse createRisk(RiskRequest riskRequest) {
        // Ensure category exists
        Category category = categoryService.getCategoryById(riskRequest.getCategoryId());
        
        // Ensure risk owner exists (si fourni)
        User riskOwner = null;
        if (riskRequest.getRiskOwnerId() != null && !riskRequest.getRiskOwnerId().trim().isEmpty()) {
            riskOwner = userService.getUserById(riskRequest.getRiskOwnerId());
            System.out.println("Risk Owner trouvé: " + riskOwner.getFirstName() + " " + riskOwner.getLastName() + " (ID: " + riskOwner.getId() + ")");
        } else {
            System.out.println("Aucun Risk Owner fourni dans la requête");
        }
        
        // Vérification de doublon (nom + catégorie, insensible à la casse/espaces)
        if (riskRepository.existsByNameIgnoreCaseAndCategory(riskRequest.getName(), category)) {
            throw new com.sentinelrisk.backend.exception.DuplicateRiskException(
                "Un risque avec ce titre et cette catégorie existe déjà.");
        }
        
        // Convert to entity and save
        Risk risk = riskMapper.toEntity(riskRequest, category);
        
        // Vérifier si le Risk Owner a été assigné par le mapper
        System.out.println("Risk Owner après mapping: " + (risk.getRiskOwner() != null ? 
            risk.getRiskOwner().getFirstName() + " " + risk.getRiskOwner().getLastName() : "NULL"));
        
        // Calculer le score de risque manuellement avant la vérification
        int riskScore = calculateRiskScore(risk.getImpactLevel(), risk.getProbabilityLevel());
        risk.setRiskScore(riskScore);
        
        // Vérifier le seuil d'acceptation avant de générer le DID
        int acceptanceThreshold = appSettingsService.getRiskAcceptanceThreshold();
        
        if (riskScore > acceptanceThreshold) {
            throw new com.sentinelrisk.backend.exception.RiskAboveThresholdException(riskScore, acceptanceThreshold);
        }
        
        // Générer automatiquement le DID
        String did = didGeneratorService.generateUniqueDid();
        risk.setDid(did);
        
        Risk savedRisk = riskRepository.save(risk);
        System.out.println("Risk sauvegardé avec Risk Owner: " + (savedRisk.getRiskOwner() != null ? 
            savedRisk.getRiskOwner().getFirstName() + " " + savedRisk.getRiskOwner().getLastName() : "NULL"));
        
        return riskMapper.toResponse(savedRisk);
    }

    /**
     * Calcule le score de risque basé sur l'impact et la probabilité
     * @param impactLevel Niveau d'impact
     * @param probabilityLevel Niveau de probabilité
     * @return Score de risque calculé
     */
    private int calculateRiskScore(Risk.ImpactLevel impactLevel, Risk.ProbabilityLevel probabilityLevel) {
        if (impactLevel == null || probabilityLevel == null) {
            return 0;
        }
        return impactLevel.getValue() * probabilityLevel.getValue();
    }

    public RiskResponse updateRisk(Long id, RiskRequest riskRequest) {
        Risk existingRisk = findRiskById(id);
        Category category = categoryService.getCategoryById(riskRequest.getCategoryId());
        
        // Update the entity from request
        riskMapper.updateEntityFromRequest(existingRisk, riskRequest, category);
        
        Risk updatedRisk = riskRepository.save(existingRisk);
        return riskMapper.toResponse(updatedRisk);
    }

    /**
     * Met à jour la liste des contrôles associés à un risque
     * @param id ID du risque
     * @param controlIds Liste des IDs des contrôles à associer
     * @return La réponse avec le risque mis à jour
     */
    public RiskResponse updateRiskControls(Long id, List<Long> controlIds) {
        System.out.println("RiskService.updateRiskControls - Début");
        System.out.println("ID du risque: " + id);
        System.out.println("IDs des contrôles reçus: " + controlIds);
        
        try {
            // Récupérer le risque
            Risk risk = findRiskById(id);
            System.out.println("Risque trouvé: " + risk.toString());
            
            // Récupérer tous les contrôles demandés et ceux existants
            System.out.println("Recherche des contrôles avec les IDs: " + controlIds);
            
            // 1. Obtenir l'ensemble actuel des contrôles
            Set<Control> currentControls = new HashSet<>(risk.getControls());
            System.out.println("Contrôles actuels: " + currentControls.size());
            
            // 2. Obtenir les nouveaux contrôles à partir des IDs
            Set<Control> newControls = controlIds.stream()
                .map(controlId -> {
                    try {
                        Control control = controlRepository.findById(controlId)
                                .orElseThrow(() -> new EntityNotFoundException("Control not found with id: " + controlId));
                        System.out.println("Contrôle trouvé: " + control.toString());
                        return control;
                    } catch (Exception e) {
                        System.err.println("Erreur lors de la recherche du contrôle " + controlId + ": " + e.getMessage());
                        throw e;
                    }
                })
                .collect(Collectors.toSet());
            System.out.println("Nouveaux contrôles: " + newControls.size());
            
            // 3. Supprimer les contrôles qui ne sont plus associés
            System.out.println("Suppression des contrôles qui ne sont plus associés");
            Set<Control> controlsToRemove = new HashSet<>(currentControls);
            controlsToRemove.removeAll(newControls);
            for (Control control : controlsToRemove) {
                System.out.println("Suppression du contrôle: " + control.getId());
                risk.removeControl(control);
            }
            
            // 4. Ajouter les nouveaux contrôles
            System.out.println("Ajout des nouveaux contrôles");
            Set<Control> controlsToAdd = new HashSet<>(newControls);
            controlsToAdd.removeAll(currentControls);
            for (Control control : controlsToAdd) {
                System.out.println("Ajout du contrôle: " + control.getId());
                risk.addControl(control);
            }
            
            // 5. Sauvegarder le risque
            System.out.println("Sauvegarde du risque avec ses nouveaux contrôles");
            Risk updatedRisk = riskRepository.save(risk);
            
            System.out.println("RiskService.updateRiskControls - Succès");
            return riskMapper.toResponse(updatedRisk);
        } catch (Exception e) {
            System.err.println("RiskService.updateRiskControls - Erreur: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    public RiskResponse addControlToRisk(Long riskId, Control control) {
        Risk risk = findRiskById(riskId);
        risk.addControl(control);
        Risk updatedRisk = riskRepository.save(risk);
        return riskMapper.toResponse(updatedRisk);
    }

    public RiskResponse removeControlFromRisk(Long riskId, Control control) {
        Risk risk = findRiskById(riskId);
        risk.removeControl(control);
        Risk updatedRisk = riskRepository.save(risk);
        return riskMapper.toResponse(updatedRisk);
    }

    public void deleteRisk(Long id) {
        if (!riskRepository.existsById(id)) {
            throw new EntityNotFoundException("Risk not found with id: " + id);
        }
        riskRepository.deleteById(id);
    }

    public List<RiskResponse> getRisksByCategoryAndStatus(Long categoryId, Risk.Status status) {
        List<Risk> risks = riskRepository.findByCategoryAndStatus(categoryId, status);
        return riskMapper.toResponseList(risks);
    }

    public List<RiskResponse> getRisksByImpactAndProbability(Risk.ImpactLevel impactLevel, Risk.ProbabilityLevel probabilityLevel) {
        List<Risk> risks = riskRepository.findByImpactLevelAndProbabilityLevel(impactLevel, probabilityLevel);
        return riskMapper.toResponseList(risks);
    }
    
    /**
     * Attribue des identifiants DID aux risques qui n'en ont pas encore
     * @return Le nombre de risques mis à jour
     */
    @Transactional
    public int assignMissingDids() {
        List<Risk> risksWithoutDid = riskRepository.findRisksWithoutDid();
        int updatedCount = 0;
        
        for (Risk risk : risksWithoutDid) {
            String did = didGeneratorService.generateUniqueDid();
            risk.setDid(did);
            riskRepository.save(risk);
            updatedCount++;
        }
        
        return updatedCount;
    }
    
    /**
     * Récupère un risque par son identifiant DID
     * @param did L'identifiant DID du risque
     * @return Le risque correspondant
     */
    public RiskResponse getRiskByDid(String did) {
        Risk risk = riskRepository.findByDid(did)
            .orElseThrow(() -> new EntityNotFoundException("Risk not found with DID: " + did));
        return riskMapper.toResponse(risk);
    }
    
    /**
     * Détecte les doublons existants dans la base de données
     * @return Liste des groupes de risques considérés comme doublons
     */
    public List<Map<String, Object>> findDuplicateRisks() {
        List<Risk> allRisks = riskRepository.findAll();
        Map<String, List<Risk>> groupedRisks = new HashMap<>();
        
        // Grouper les risques par nom normalisé et catégorie
        for (Risk risk : allRisks) {
            String key = risk.getName().toLowerCase().trim() + "|" + risk.getCategory().getId();
            groupedRisks.computeIfAbsent(key, k -> new ArrayList<>()).add(risk);
        }
        
        // Filtrer les groupes avec plus d'un risque
        List<Map<String, Object>> duplicates = new ArrayList<>();
        for (Map.Entry<String, List<Risk>> entry : groupedRisks.entrySet()) {
            if (entry.getValue().size() > 1) {
                Map<String, Object> duplicateGroup = new HashMap<>();
                duplicateGroup.put("name", entry.getValue().get(0).getName());
                duplicateGroup.put("category", entry.getValue().get(0).getCategory().getName());
                duplicateGroup.put("count", entry.getValue().size());
                duplicateGroup.put("risks", entry.getValue().stream()
                    .map(risk -> {
                        Map<String, Object> riskInfo = new HashMap<>();
                        riskInfo.put("id", risk.getId());
                        riskInfo.put("did", risk.getDid());
                        riskInfo.put("name", risk.getName());
                        riskInfo.put("createdAt", risk.getCreatedAt());
                        return riskInfo;
                    })
                    .collect(Collectors.toList()));
                duplicates.add(duplicateGroup);
            }
        }
        
        return duplicates;
    }
    
    private Risk findRiskById(Long id) {
        return riskRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Risk not found with id: " + id));
    }
} 