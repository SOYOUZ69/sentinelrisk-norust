package com.sentinelrisk.backend.repository.compliance;

import com.sentinelrisk.backend.domain.compliance.ComplianceFramework;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ComplianceFrameworkRepository extends JpaRepository<ComplianceFramework, Long> {
    
    /**
     * Recherche un framework par son nom et sa version
     * @param name Nom du framework
     * @param version Version du framework
     * @return Optional contenant le framework s'il existe
     */
    Optional<ComplianceFramework> findByNameAndVersion(String name, String version);
    
    /**
     * Vérifie si un framework existe avec le nom et la version indiqués
     * @param name Nom du framework
     * @param version Version du framework
     * @return true si le framework existe
     */
    boolean existsByNameAndVersion(String name, String version);
} 