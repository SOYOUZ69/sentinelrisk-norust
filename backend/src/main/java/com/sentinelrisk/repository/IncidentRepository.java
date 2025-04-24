package com.sentinelrisk.repository;

import com.sentinelrisk.model.Incident;
import com.sentinelrisk.model.IncidentStatus;
import com.sentinelrisk.model.IncidentSeverity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface IncidentRepository extends JpaRepository<Incident, Long> {
    List<Incident> findByStatus(IncidentStatus status);
    List<Incident> findBySeverity(IncidentSeverity severity);
    List<Incident> findByReporterId(Long reporterId);
    List<Incident> findByAssigneeId(Long assigneeId);
    
    @Query("SELECT i FROM Incident i WHERE i.status != 'CLOSED' AND i.detectionDate <= :date")
    List<Incident> findOpenIncidentsOlderThan(LocalDateTime date);
    
    @Query("SELECT i.severity, COUNT(i) FROM Incident i GROUP BY i.severity")
    List<Object[]> countIncidentsBySeverity();
    
    @Query("SELECT i.status, COUNT(i) FROM Incident i GROUP BY i.status")
    List<Object[]> countIncidentsByStatus();
    
    @Query("SELECT i FROM Incident i WHERE i.relatedRisk.id = :riskId")
    List<Incident> findByRelatedRiskId(Long riskId);
} 