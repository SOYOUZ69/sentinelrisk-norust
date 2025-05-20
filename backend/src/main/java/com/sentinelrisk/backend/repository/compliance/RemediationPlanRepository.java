package com.sentinelrisk.backend.repository.compliance;

import com.sentinelrisk.backend.domain.compliance.RemediationPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository pour l'entité RemediationPlan.
 */
@Repository
public interface RemediationPlanRepository extends JpaRepository<RemediationPlan, Long> {
    
    /**
     * Trouve tous les plans de remédiation associés à un mapping risque-conformité spécifique
     * @param mappingId ID du mapping risque-conformité
     * @return Liste des plans de remédiation
     */
    List<RemediationPlan> findByMappingId(Long mappingId);
    
    /**
     * Trouve tous les plans de remédiation assignés à un utilisateur spécifique
     * @param ownerId ID de l'utilisateur responsable
     * @return Liste des plans de remédiation
     */
    List<RemediationPlan> findByOwnerId(String ownerId);
    
    /**
     * Vérifie si un plan de remédiation existe pour un mapping spécifique
     * @param mappingId ID du mapping risque-conformité
     * @return true si au moins un plan existe
     */
    boolean existsByMappingId(Long mappingId);
} 