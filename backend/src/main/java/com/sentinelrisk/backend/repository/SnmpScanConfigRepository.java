package com.sentinelrisk.backend.repository;

import com.sentinelrisk.backend.model.SnmpScanConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SnmpScanConfigRepository extends JpaRepository<SnmpScanConfig, Long> {
} 