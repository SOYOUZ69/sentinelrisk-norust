package com.sentinelrisk.backend.domain.compliance;

import com.sentinelrisk.backend.domain.compliance.ComplianceRequirement.RequirementType;
import com.sentinelrisk.backend.repository.compliance.ComplianceFrameworkRepository;
import com.sentinelrisk.backend.repository.compliance.ComplianceRequirementRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

/**
 * Composant chargé d'importer les données initiales de conformité
 * depuis le fichier CSV au démarrage de l'application.
 * Uniquement activé pour les profils "dev" et "default" (pas en production).
 */
@Component
@Profile({"dev", "default"})
@RequiredArgsConstructor
@Slf4j
public class ComplianceDataLoader implements ApplicationRunner {

    private final ComplianceFrameworkRepository frameworkRepository;
    private final ComplianceRequirementRepository requirementRepository;

    /**
     * Point d'entrée pour l'exécution du chargement des données
     * @param args Arguments de l'application
     */
    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        log.info("Chargement des données initiales de conformité...");
        loadComplianceData();
        log.info("Chargement des données de conformité terminé.");
    }

    /**
     * Charge les données du fichier CSV
     */
    private void loadComplianceData() {
        Resource resource = new ClassPathResource("data/compliance.csv");
        Map<String, ComplianceFramework> frameworkCache = new HashMap<>();

        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8))) {
            
            // Ignorer la première ligne (en-têtes)
            String line = reader.readLine();
            
            // Lire chaque ligne du CSV
            while ((line = reader.readLine()) != null) {
                processLine(line, frameworkCache);
            }
            
        } catch (IOException e) {
            log.error("Erreur lors du chargement des données de conformité", e);
        }
    }

    /**
     * Traite une ligne du fichier CSV et crée/met à jour les entités correspondantes
     * @param line Ligne du CSV
     * @param frameworkCache Cache des frameworks déjà chargés pour éviter des requêtes répétées
     */
    private void processLine(String line, Map<String, ComplianceFramework> frameworkCache) {
        String[] data = line.split(",");
        
        if (data.length < 6) {
            log.warn("Ligne ignorée - format incorrect: {}", line);
            return;
        }
        
        String frameworkName = data[0].trim();
        String frameworkVersion = data[1].trim();
        String frameworkDescription = data[2].trim();
        String requirementCode = data[3].trim();
        String requirementDescription = data[4].trim();
        RequirementType requirementType;
        
        try {
            requirementType = RequirementType.valueOf(data[5].trim());
        } catch (IllegalArgumentException e) {
            log.warn("Type d'exigence non valide, utilisation de PREVENTIVE par défaut: {}", data[5]);
            requirementType = RequirementType.PREVENTIVE;
        }
        
        // Clé unique pour le framework dans le cache
        String frameworkKey = frameworkName + "-" + frameworkVersion;
        
        // Récupérer ou créer le framework
        ComplianceFramework framework = getOrCreateFramework(
                frameworkCache, frameworkKey, frameworkName, frameworkVersion, frameworkDescription);
        
        // Vérifier si l'exigence existe déjà
        if (!requirementRepository.existsByCodeAndFrameworkId(requirementCode, framework.getId())) {
            // Créer la nouvelle exigence
            ComplianceRequirement requirement = new ComplianceRequirement();
            requirement.setFramework(framework);
            requirement.setCode(requirementCode);
            requirement.setDescription(requirementDescription);
            requirement.setType(requirementType);
            
            // Sauvegarder l'exigence
            requirementRepository.save(requirement);
            log.debug("Exigence créée: {} - {}", requirementCode, requirementDescription);
        } else {
            log.debug("Exigence ignorée (existe déjà): {}", requirementCode);
        }
    }

    /**
     * Récupère un framework existant ou en crée un nouveau si nécessaire
     * @param cache Cache des frameworks
     * @param key Clé du framework dans le cache
     * @param name Nom du framework
     * @param version Version du framework
     * @param description Description du framework
     * @return Le framework existant ou nouvellement créé
     */
    private ComplianceFramework getOrCreateFramework(
            Map<String, ComplianceFramework> cache, String key, 
            String name, String version, String description) {
        
        // Vérifier si le framework est dans le cache
        if (cache.containsKey(key)) {
            return cache.get(key);
        }
        
        // Vérifier si le framework existe en base
        ComplianceFramework framework = frameworkRepository
                .findByNameAndVersion(name, version)
                .orElse(null);
        
        // Créer le framework s'il n'existe pas
        if (framework == null) {
            framework = new ComplianceFramework();
            framework.setName(name);
            framework.setVersion(version);
            framework.setDescription(description);
            framework = frameworkRepository.save(framework);
            log.info("Framework créé: {} - {}", name, version);
        } else {
            // Mettre à jour la description si nécessaire
            if (!description.equals(framework.getDescription())) {
                framework.setDescription(description);
                framework = frameworkRepository.save(framework);
                log.debug("Description du framework mise à jour: {} - {}", name, version);
            }
        }
        
        // Ajouter au cache
        cache.put(key, framework);
        
        return framework;
    }
} 