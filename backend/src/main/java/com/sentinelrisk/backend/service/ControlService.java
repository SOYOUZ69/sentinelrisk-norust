package com.sentinelrisk.backend.service;

import com.sentinelrisk.backend.dto.ControlRequest;
import com.sentinelrisk.backend.dto.ControlResponse;
import com.sentinelrisk.backend.mapper.ControlMapper;
import com.sentinelrisk.backend.model.Control;
import com.sentinelrisk.backend.model.Risk;
import com.sentinelrisk.backend.repository.ControlRepository;
import com.sentinelrisk.backend.repository.RiskRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ControlService {

    private final ControlRepository controlRepository;
    private final RiskRepository riskRepository;
    private final ControlMapper controlMapper;

    public List<ControlResponse> getAllControls() {
        return controlRepository.findAll().stream()
                .map(controlMapper::toResponse)
                .collect(Collectors.toList());
    }

    public ControlResponse getControlById(Long id) {
        Control control = controlRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Control not found with id: " + id));
        return controlMapper.toResponse(control);
    }

    public List<ControlResponse> getControlsByType(Control.Type type) {
        return controlRepository.findByType(type).stream()
                .map(controlMapper::toResponse)
                .collect(Collectors.toList());
    }

    public List<ControlResponse> getControlsByStatus(Control.Status status) {
        return controlRepository.findByStatus(status).stream()
                .map(controlMapper::toResponse)
                .collect(Collectors.toList());
    }

    public List<ControlResponse> getControlsByFrequency(Control.Frequency frequency) {
        return controlRepository.findByFrequency(frequency).stream()
                .map(controlMapper::toResponse)
                .collect(Collectors.toList());
    }

    public List<ControlResponse> getControlsByRisk(Long riskId) {
        return controlRepository.findByRiskId(riskId).stream()
                .map(controlMapper::toResponse)
                .collect(Collectors.toList());
    }

    public List<ControlResponse> getIneffectiveControlsForActiveRisks() {
        return controlRepository.findIneffectiveControlsForActiveRisks().stream()
                .map(controlMapper::toResponse)
                .collect(Collectors.toList());
    }

    public ControlResponse createControl(ControlRequest request) {
        Control control = controlMapper.toEntity(request);
        
        // Associer les risques si nécessaire
        if (request.getRiskIds() != null && !request.getRiskIds().isEmpty()) {
            controlMapper.setRisksFromIds(control, request.getRiskIds());
        }
        
        Control savedControl = controlRepository.save(control);
        return controlMapper.toResponse(savedControl);
    }

    public ControlResponse updateControl(Long id, ControlRequest request) {
        Control existingControl = controlRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Control not found with id: " + id));

        // Mettre à jour les propriétés de base
        controlMapper.updateControlFromRequest(existingControl, request);
        
        // Mettre à jour les risques associés
        controlMapper.setRisksFromIds(existingControl, request.getRiskIds());

        Control updatedControl = controlRepository.save(existingControl);
        return controlMapper.toResponse(updatedControl);
    }

    public void deleteControl(Long id) {
        if (!controlRepository.existsById(id)) {
            throw new EntityNotFoundException("Control not found with id: " + id);
        }
        controlRepository.deleteById(id);
    }
} 