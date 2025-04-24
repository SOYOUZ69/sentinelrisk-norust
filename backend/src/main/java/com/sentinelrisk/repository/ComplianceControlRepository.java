package com.sentinelrisk.repository;

import com.sentinelrisk.model.ComplianceControl;
import com.sentinelrisk.model.ControlStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ComplianceControlRepository extends JpaRepository<ComplianceControl, Long> {
    List<ComplianceControl> findByStatus(ControlStatus status);
    List<ComplianceControl> findByFramework(String framework);
    List<ComplianceControl> findByResponsibleId(Long responsibleId);
    
    @Query("SELECT c FROM ComplianceControl c WHERE c.nextAssessment <= :date")
    List<ComplianceControl> findControlsDueForAssessment(LocalDateTime date);
    
    @Query("SELECT c.framework, COUNT(c) FROM ComplianceControl c GROUP BY c.framework")
    List<Object[]> countControlsByFramework();
    
    @Query("SELECT c.status, COUNT(c) FROM ComplianceControl c GROUP BY c.status")
    List<Object[]> countControlsByStatus();
} 