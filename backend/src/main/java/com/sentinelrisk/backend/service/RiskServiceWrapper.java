package com.sentinelrisk.backend.service;

import com.sentinelrisk.backend.model.Risk;
import com.sentinelrisk.backend.repository.RiskRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service temporaire pour fournir les méthodes d'accès aux entités Risk
 * sans dépendre de RiskService qui a été modifié pour utiliser des DTOs
 */
@Service
@RequiredArgsConstructor
@Transactional
public class RiskServiceWrapper {

    private final RiskRepository riskRepository;

    /**
     * Récupère une entité Risk par son identifiant
     */
    public Risk getRiskById(Long id) {
        return riskRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Risk not found with id: " + id));
    }
} 