package com.sentinelrisk.backend.repository.compliance;

import com.sentinelrisk.backend.domain.compliance.RiskComplianceMapping;
import com.sentinelrisk.backend.domain.compliance.RiskComplianceMapping.ComplianceStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RiskComplianceMappingRepository extends JpaRepository<RiskComplianceMapping, Long> {
    
    /**
     * Recherche les mappings pour un risque donné
     * @param riskId ID du risque
     * @return Liste des mappings de conformité pour le risque
     */
    List<RiskComplianceMapping> findByRiskId(Long riskId);
    
    /**
     * Recherche les mappings pour une exigence donnée
     * @param requirementId ID de l'exigence
     * @return Liste des mappings de conformité pour l'exigence
     */
    List<RiskComplianceMapping> findByRequirementId(Long requirementId);
    
    /**
     * Recherche les mappings par risque et statut de conformité
     * @param riskId ID du risque
     * @param status Statut de conformité
     * @return Liste des mappings correspondant aux critères
     */
    List<RiskComplianceMapping> findByRiskIdAndStatus(Long riskId, ComplianceStatus status);
    
    /**
     * Recherche un mapping spécifique par risque et exigence
     * @param riskId ID du risque
     * @param requirementId ID de l'exigence
     * @return Optional contenant le mapping s'il existe
     */
    Optional<RiskComplianceMapping> findByRiskIdAndRequirementId(Long riskId, Long requirementId);
    
    /**
     * Vérifie si un mapping existe pour un risque et une exigence donnés
     * @param riskId ID du risque
     * @param requirementId ID de l'exigence
     * @return true si le mapping existe
     */
    boolean existsByRiskIdAndRequirementId(Long riskId, Long requirementId);
    
    /**
     * Recherche les mappings pour un framework donné
     * @param frameworkId ID du framework
     * @return Liste des mappings liés aux exigences du framework
     */
    @Query("SELECT m FROM RiskComplianceMapping m WHERE m.requirement.framework.id = :frameworkId")
    List<RiskComplianceMapping> findByFrameworkId(@Param("frameworkId") Long frameworkId);
} 