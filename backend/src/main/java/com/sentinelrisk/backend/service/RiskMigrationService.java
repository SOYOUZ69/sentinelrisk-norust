package com.sentinelrisk.backend.service;

import com.sentinelrisk.backend.model.Risk;
import com.sentinelrisk.backend.repository.RiskRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service pour gérer les migrations des risques
 * Attribue automatiquement les identifiants DID aux risques existants
 */
@Service
@RequiredArgsConstructor
public class RiskMigrationService {

    private static final Logger logger = LoggerFactory.getLogger(RiskMigrationService.class);

    private final RiskRepository riskRepository;
    private final DidGeneratorService didGeneratorService;

    /**
     * Événement déclenché au démarrage de l'application
     * Attribue automatiquement les DID manquants
     */
    @EventListener(ApplicationReadyEvent.class)
    @Transactional
    public void onApplicationReady() {
        logger.info("🔄 Début de la migration des identifiants DID pour les risques");
        
        try {
            int updatedCount = assignMissingDids();
            
            if (updatedCount > 0) {
                logger.info("✅ Migration terminée - {} risques ont reçu un identifiant DID", updatedCount);
            } else {
                logger.info("ℹ️ Aucun risque nécessitait un identifiant DID");
            }
            
        } catch (Exception e) {
            logger.error("❌ Erreur lors de la migration des identifiants DID: {}", e.getMessage(), e);
        }
    }

    /**
     * Attribue des identifiants DID aux risques qui n'en ont pas encore
     * @return Le nombre de risques mis à jour
     */
    @Transactional
    public int assignMissingDids() {
        List<Risk> risksWithoutDid = riskRepository.findRisksWithoutDid();
        int updatedCount = 0;
        
        logger.info("📋 {} risques trouvés sans identifiant DID", risksWithoutDid.size());
        
        for (Risk risk : risksWithoutDid) {
            try {
                String did = didGeneratorService.generateUniqueDid();
                risk.setDid(did);
                riskRepository.save(risk);
                updatedCount++;
                
                logger.debug("✅ DID {} attribué au risque {} (ID: {})", 
                           did, risk.getName(), risk.getId());
                
            } catch (Exception e) {
                logger.error("❌ Erreur lors de l'attribution du DID au risque {} (ID: {}): {}", 
                           risk.getName(), risk.getId(), e.getMessage());
            }
        }
        
        return updatedCount;
    }

    /**
     * Vérifie l'intégrité des identifiants DID
     * @return true si tous les risques ont un DID valide
     */
    @Transactional(readOnly = true)
    public boolean verifyDidIntegrity() {
        List<Risk> risksWithoutDid = riskRepository.findRisksWithoutDid();
        boolean allRisksHaveDid = risksWithoutDid.isEmpty();
        
        logger.info("🔍 Vérification de l'intégrité des DID - {} risques sans DID", risksWithoutDid.size());
        
        if (!allRisksHaveDid) {
            logger.warn("⚠️ Risques sans DID trouvés:");
            for (Risk risk : risksWithoutDid) {
                logger.warn("  - Risque {} (ID: {})", risk.getName(), risk.getId());
            }
        }
        
        return allRisksHaveDid;
    }
} 