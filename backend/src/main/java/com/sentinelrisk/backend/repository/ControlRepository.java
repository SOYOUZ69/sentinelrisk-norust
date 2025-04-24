package com.sentinelrisk.backend.repository;

import com.sentinelrisk.backend.model.Control;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ControlRepository extends JpaRepository<Control, Long> {
    List<Control> findByType(Control.Type type);
    List<Control> findByStatus(Control.Status status);
    List<Control> findByFrequency(Control.Frequency frequency);
    
    @Query("SELECT c FROM Control c JOIN c.risks r WHERE r.id = :riskId")
    List<Control> findByRiskId(Long riskId);
    
    @Query("SELECT c FROM Control c WHERE c.status = 'INEFFECTIVE' AND EXISTS (SELECT r FROM c.risks r WHERE r.status != 'CLOSED')")
    List<Control> findIneffectiveControlsForActiveRisks();
} 