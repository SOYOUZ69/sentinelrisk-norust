package com.sentinelrisk.backend.repository.compliance;

import com.sentinelrisk.backend.domain.compliance.ComplianceRequirement;
import com.sentinelrisk.backend.domain.compliance.ComplianceRequirement.RequirementType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ComplianceRequirementRepository extends JpaRepository<ComplianceRequirement, Long> {
    
    /**
     * Recherche les exigences d'un framework par son ID
     * @param frameworkId ID du framework
     * @return Liste des exigences du framework
     */
    List<ComplianceRequirement> findByFrameworkId(Long frameworkId);
    
    /**
     * Recherche une exigence par son code et l'ID du framework
     * @param code Code de l'exigence
     * @param frameworkId ID du framework
     * @return Optional contenant l'exigence si elle existe
     */
    Optional<ComplianceRequirement> findByCodeAndFrameworkId(String code, Long frameworkId);
    
    /**
     * Vérifie si une exigence existe avec le code et l'ID du framework indiqués
     * @param code Code de l'exigence
     * @param frameworkId ID du framework
     * @return true si l'exigence existe
     */
    boolean existsByCodeAndFrameworkId(String code, Long frameworkId);
    
    /**
     * Recherche les exigences par type et ID du framework
     * @param type Type de l'exigence
     * @param frameworkId ID du framework
     * @return Liste des exigences du type et du framework spécifiés
     */
    List<ComplianceRequirement> findByTypeAndFrameworkId(RequirementType type, Long frameworkId);
} 