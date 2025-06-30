package com.sentinelrisk.backend.service;

import com.sentinelrisk.backend.repository.RiskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.concurrent.atomic.AtomicLong;

/**
 * Service pour générer des identifiants DID (Document Identifier) uniques
 * Format: RXXXX où R est fixe et XXXX est un nombre incrémental
 */
@Service
public class DidGeneratorService {

    private final RiskRepository riskRepository;
    private final AtomicLong currentSequence = new AtomicLong(0);

    @Autowired
    public DidGeneratorService(RiskRepository riskRepository) {
        this.riskRepository = riskRepository;
        initializeSequence();
    }

    /**
     * Initialise la séquence en récupérant le plus grand DID existant
     */
    @Transactional(readOnly = true)
    private void initializeSequence() {
        try {
            String maxDid = riskRepository.findMaxDid();
            if (maxDid != null && maxDid.startsWith("R")) {
                String numberPart = maxDid.substring(1);
                try {
                    long maxNumber = Long.parseLong(numberPart);
                    currentSequence.set(maxNumber);
                } catch (NumberFormatException e) {
                    // Si le format n'est pas correct, on commence à 0
                    currentSequence.set(0);
                }
            }
        } catch (Exception e) {
            // En cas d'erreur, on commence à 0
            currentSequence.set(0);
        }
    }

    /**
     * Génère un nouvel identifiant DID au format RXXXX
     * @return L'identifiant DID généré
     */
    public String generateNextDid() {
        long nextNumber = currentSequence.incrementAndGet();
        return String.format("R%04d", nextNumber);
    }

    /**
     * Vérifie si un DID existe déjà
     * @param did L'identifiant DID à vérifier
     * @return true si le DID existe, false sinon
     */
    @Transactional(readOnly = true)
    public boolean didExists(String did) {
        return riskRepository.existsByDid(did);
    }

    /**
     * Génère un DID unique en vérifiant qu'il n'existe pas déjà
     * @return Un DID unique
     */
    public String generateUniqueDid() {
        String did;
        do {
            did = generateNextDid();
        } while (didExists(did));
        return did;
    }
} 