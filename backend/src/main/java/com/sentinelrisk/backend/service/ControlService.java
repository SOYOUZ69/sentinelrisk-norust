package com.sentinelrisk.backend.service;

import com.sentinelrisk.backend.model.Control;
import com.sentinelrisk.backend.repository.ControlRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ControlService {

    private final ControlRepository controlRepository;

    public List<Control> getAllControls() {
        return controlRepository.findAll();
    }

    public Control getControlById(Long id) {
        return controlRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Control not found with id: " + id));
    }

    public List<Control> getControlsByType(Control.Type type) {
        return controlRepository.findByType(type);
    }

    public List<Control> getControlsByStatus(Control.Status status) {
        return controlRepository.findByStatus(status);
    }

    public List<Control> getControlsByFrequency(Control.Frequency frequency) {
        return controlRepository.findByFrequency(frequency);
    }

    public List<Control> getControlsByRisk(Long riskId) {
        return controlRepository.findByRiskId(riskId);
    }

    public List<Control> getIneffectiveControlsForActiveRisks() {
        return controlRepository.findIneffectiveControlsForActiveRisks();
    }

    public Control createControl(Control control) {
        return controlRepository.save(control);
    }

    public Control updateControl(Long id, Control control) {
        Control existingControl = getControlById(id);

        existingControl.setName(control.getName());
        existingControl.setDescription(control.getDescription());
        existingControl.setType(control.getType());
        existingControl.setFrequency(control.getFrequency());
        existingControl.setStatus(control.getStatus());
        existingControl.setImplementationDetails(control.getImplementationDetails());

        return controlRepository.save(existingControl);
    }

    public void deleteControl(Long id) {
        if (!controlRepository.existsById(id)) {
            throw new EntityNotFoundException("Control not found with id: " + id);
        }
        controlRepository.deleteById(id);
    }
} 