package com.sentinelrisk.service;

import com.sentinelrisk.dto.RiskDTO;
import com.sentinelrisk.model.Risk;
import com.sentinelrisk.model.RiskLevel;
import com.sentinelrisk.model.RiskCategory;
import com.sentinelrisk.model.User;
import com.sentinelrisk.repository.RiskRepository;
import com.sentinelrisk.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class RiskService {
    private final RiskRepository riskRepository;
    private final UserRepository userRepository;

    public RiskDTO createRisk(RiskDTO riskDTO) {
        User owner = userRepository.findById(riskDTO.getOwnerId())
            .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Risk risk = new Risk();
        updateRiskFromDTO(risk, riskDTO);
        risk.setOwner(owner);

        Risk savedRisk = riskRepository.save(risk);
        return convertToDTO(savedRisk);
    }

    public RiskDTO updateRisk(Long id, RiskDTO riskDTO) {
        Risk risk = riskRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Risk not found"));

        updateRiskFromDTO(risk, riskDTO);
        Risk updatedRisk = riskRepository.save(risk);
        return convertToDTO(updatedRisk);
    }

    public void deleteRisk(Long id) {
        if (!riskRepository.existsById(id)) {
            throw new EntityNotFoundException("Risk not found");
        }
        riskRepository.deleteById(id);
    }

    public RiskDTO getRisk(Long id) {
        Risk risk = riskRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Risk not found"));
        return convertToDTO(risk);
    }

    public List<RiskDTO> getAllRisks() {
        return riskRepository.findAll().stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    public List<RiskDTO> getRisksByLevel(RiskLevel level) {
        return riskRepository.findByLevel(level).stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    public List<RiskDTO> getRisksByCategory(RiskCategory category) {
        return riskRepository.findByCategory(category).stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    public List<RiskDTO> getHighImpactRisks(double threshold) {
        return riskRepository.findHighImpactRisks(threshold).stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    public Map<RiskCategory, Long> getRisksByCategories() {
        return riskRepository.countRisksByCategory().stream()
            .collect(Collectors.toMap(
                row -> (RiskCategory) row[0],
                row -> (Long) row[1]
            ));
    }

    private RiskDTO convertToDTO(Risk risk) {
        RiskDTO dto = new RiskDTO();
        dto.setId(risk.getId());
        dto.setName(risk.getName());
        dto.setDescription(risk.getDescription());
        dto.setLevel(risk.getLevel());
        dto.setCategory(risk.getCategory());
        dto.setProbability(risk.getProbability());
        dto.setImpact(risk.getImpact());
        dto.setOwnerId(risk.getOwner().getId());
        dto.setOwnerName(risk.getOwner().getFirstName() + " " + risk.getOwner().getLastName());
        dto.setCreatedAt(risk.getCreatedAt());
        dto.setUpdatedAt(risk.getUpdatedAt());
        return dto;
    }

    private void updateRiskFromDTO(Risk risk, RiskDTO dto) {
        risk.setName(dto.getName());
        risk.setDescription(dto.getDescription());
        risk.setLevel(dto.getLevel());
        risk.setCategory(dto.getCategory());
        risk.setProbability(dto.getProbability());
        risk.setImpact(dto.getImpact());
    }
} 