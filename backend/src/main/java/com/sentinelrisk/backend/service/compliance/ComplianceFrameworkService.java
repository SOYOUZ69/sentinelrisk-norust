package com.sentinelrisk.backend.service.compliance;

import com.sentinelrisk.backend.domain.compliance.ComplianceFramework;
import com.sentinelrisk.backend.repository.compliance.ComplianceFrameworkRepository;
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
public class ComplianceFrameworkService {

    private final ComplianceFrameworkRepository frameworkRepository;

    /**
     * Récupère tous les frameworks de conformité
     * @return Liste des frameworks
     */
    @Transactional(readOnly = true)
    public List<ComplianceFramework> getAllFrameworks() {
        log.debug("Récupération de tous les frameworks de conformité");
        return frameworkRepository.findAll();
    }

    /**
     * Récupère un framework par son ID
     * @param id ID du framework
     * @return Le framework trouvé
     * @throws EntityNotFoundException si le framework n'existe pas
     */
    @Transactional(readOnly = true)
    public ComplianceFramework getFrameworkById(Long id) {
        log.debug("Récupération du framework de conformité avec ID: {}", id);
        return frameworkRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Framework de conformité non trouvé avec ID: " + id));
    }

    /**
     * Crée un nouveau framework de conformité
     * @param framework Données du framework à créer
     * @return Le framework créé
     * @throws IllegalArgumentException si un framework avec le même nom et la même version existe déjà
     */
    public ComplianceFramework createFramework(ComplianceFramework framework) {
        log.debug("Création d'un nouveau framework de conformité: {}", framework.getName());
        
        // Vérifier l'unicité du nom et de la version
        if (frameworkRepository.existsByNameAndVersion(framework.getName(), framework.getVersion())) {
            throw new IllegalArgumentException("Un framework avec le nom '" + framework.getName() + 
                    "' et la version '" + framework.getVersion() + "' existe déjà");
        }
        
        return frameworkRepository.save(framework);
    }

    /**
     * Met à jour un framework existant
     * @param id ID du framework à mettre à jour
     * @param frameworkDetails Nouvelles données du framework
     * @return Le framework mis à jour
     * @throws EntityNotFoundException si le framework n'existe pas
     * @throws IllegalArgumentException si les nouveaux nom et version sont déjà utilisés par un autre framework
     */
    public ComplianceFramework updateFramework(Long id, ComplianceFramework frameworkDetails) {
        log.debug("Mise à jour du framework de conformité avec ID: {}", id);
        
        ComplianceFramework existingFramework = getFrameworkById(id);
        
        // Vérifier l'unicité du nom et de la version seulement si l'un des deux a changé
        if (!existingFramework.getName().equals(frameworkDetails.getName()) || 
            !existingFramework.getVersion().equals(frameworkDetails.getVersion())) {
            
            // Vérifier si un autre framework utilise déjà cette combinaison nom/version
            frameworkRepository.findByNameAndVersion(frameworkDetails.getName(), frameworkDetails.getVersion())
                .ifPresent(framework -> {
                    if (!framework.getId().equals(id)) {
                        throw new IllegalArgumentException("Un framework avec le nom '" + frameworkDetails.getName() + 
                                "' et la version '" + frameworkDetails.getVersion() + "' existe déjà");
                    }
                });
        }
        
        // Mettre à jour les champs
        existingFramework.setName(frameworkDetails.getName());
        existingFramework.setVersion(frameworkDetails.getVersion());
        existingFramework.setDescription(frameworkDetails.getDescription());
        
        return frameworkRepository.save(existingFramework);
    }

    /**
     * Supprime un framework
     * @param id ID du framework à supprimer
     * @throws EntityNotFoundException si le framework n'existe pas
     */
    public void deleteFramework(Long id) {
        log.debug("Suppression du framework de conformité avec ID: {}", id);
        
        ComplianceFramework framework = getFrameworkById(id);
        frameworkRepository.delete(framework);
    }
} 