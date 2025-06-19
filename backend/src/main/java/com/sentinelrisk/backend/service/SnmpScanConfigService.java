package com.sentinelrisk.backend.service;

import com.sentinelrisk.backend.model.SnmpScanConfig;
import com.sentinelrisk.backend.repository.SnmpScanConfigRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.List;

@Service
public class SnmpScanConfigService {
    private final SnmpScanConfigRepository configRepository;

    @Autowired
    public SnmpScanConfigService(SnmpScanConfigRepository configRepository) {
        this.configRepository = configRepository;
    }

    public List<SnmpScanConfig> findAll() {
        return configRepository.findAll();
    }

    public Optional<SnmpScanConfig> findById(Long id) {
        return configRepository.findById(id);
    }

    public SnmpScanConfig save(SnmpScanConfig config) {
        return configRepository.save(config);
    }

    public void deleteById(Long id) {
        configRepository.deleteById(id);
    }
} 