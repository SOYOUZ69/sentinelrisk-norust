package com.sentinelrisk.service;

import com.sentinelrisk.dto.ComplianceControlDTO;
import com.sentinelrisk.model.ComplianceControl;
import com.sentinelrisk.model.ControlStatus;
import com.sentinelrisk.model.User;
import com.sentinelrisk.repository.ComplianceControlRepository;
import com.sentinelrisk.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ComplianceControlService {
    private final ComplianceControlRepository complianceControlRepository;
    private final UserRepository userRepository;

    public ComplianceControlDTO createControl(ComplianceControlDTO dto) {
        User responsible = userRepository.findById(dto.getResponsibleId())
            .orElseThrow(() -> new EntityNotFoundException("User not found"));

        ComplianceControl control = new ComplianceControl();
        updateControlFromDTO(control, dto);
        control.setResponsible(responsible);

        ComplianceControl savedControl = complianceControlRepository.save(control);
        return convertToDTO(savedControl);
    }

    public ComplianceControlDTO updateControl(Long id, ComplianceControlDTO dto) {
        ComplianceControl control = complianceControlRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Compliance control not found"));

        if (dto.getResponsibleId() != null && !dto.getResponsibleId().equals(control.getResponsible().getId())) {
            User newResponsible = userRepository.findById(dto.getResponsibleId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
            control.setResponsible(newResponsible);
        }

        updateControlFromDTO(control, dto);
        ComplianceControl updatedControl = complianceControlRepository.save(control);
        return convertToDTO(updatedControl);
    }

    public void deleteControl(Long id) {
        if (!complianceControlRepository.existsById(id)) {
            throw new EntityNotFoundException("Compliance control not found");
        }
        complianceControlRepository.deleteById(id);
    }

    public ComplianceControlDTO getControl(Long id) {
        ComplianceControl control = complianceControlRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Compliance control not found"));
        return convertToDTO(control);
    }

    public List<ComplianceControlDTO> getAllControls() {
        return complianceControlRepository.findAll().stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    public List<ComplianceControlDTO> getControlsByStatus(ControlStatus status) {
        return complianceControlRepository.findByStatus(status).stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    public List<ComplianceControlDTO> getControlsByFramework(String framework) {
        return complianceControlRepository.findByFramework(framework).stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    public List<ComplianceControlDTO> getControlsDueForAssessment() {
        return complianceControlRepository.findControlsDueForAssessment(LocalDateTime.now()).stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    public Map<String, Long> getControlsByFrameworkStats() {
        return complianceControlRepository.countControlsByFramework().stream()
            .collect(Collectors.toMap(
                row -> (String) row[0],
                row -> (Long) row[1]
            ));
    }

    public Map<ControlStatus, Long> getControlsByStatusStats() {
        return complianceControlRepository.countControlsByStatus().stream()
            .collect(Collectors.toMap(
                row -> (ControlStatus) row[0],
                row -> (Long) row[1]
            ));
    }

    private ComplianceControlDTO convertToDTO(ComplianceControl control) {
        ComplianceControlDTO dto = new ComplianceControlDTO();
        dto.setId(control.getId());
        dto.setName(control.getName());
        dto.setDescription(control.getDescription());
        dto.setFramework(control.getFramework());
        dto.setControlReference(control.getControlReference());
        dto.setStatus(control.getStatus());
        dto.setLastAssessment(control.getLastAssessment());
        dto.setNextAssessment(control.getNextAssessment());
        dto.setResponsibleId(control.getResponsible().getId());
        dto.setResponsibleName(control.getResponsible().getFirstName() + " " + control.getResponsible().getLastName());
        dto.setCreatedAt(control.getCreatedAt());
        dto.setUpdatedAt(control.getUpdatedAt());
        return dto;
    }

    private void updateControlFromDTO(ComplianceControl control, ComplianceControlDTO dto) {
        control.setName(dto.getName());
        control.setDescription(dto.getDescription());
        control.setFramework(dto.getFramework());
        control.setControlReference(dto.getControlReference());
        control.setStatus(dto.getStatus());
        control.setLastAssessment(dto.getLastAssessment());
        control.setNextAssessment(dto.getNextAssessment());
    }
} 