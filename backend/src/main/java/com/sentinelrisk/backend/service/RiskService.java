package com.sentinelrisk.backend.service;

import com.sentinelrisk.backend.model.Risk;
import com.sentinelrisk.backend.model.Category;
import com.sentinelrisk.backend.model.Control;
import com.sentinelrisk.backend.repository.RiskRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Transactional
public class RiskService {

    private final RiskRepository riskRepository;
    private final CategoryService categoryService;

    public List<Risk> getAllRisks() {
        return riskRepository.findAll();
    }

    public Risk getRiskById(Long id) {
        return riskRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Risk not found with id: " + id));
    }

    public List<Risk> getRisksByCategory(Long categoryId) {
        Category category = categoryService.getCategoryById(categoryId);
        return riskRepository.findByCategory(category);
    }

    public List<Risk> getRisksByStatus(Risk.Status status) {
        return riskRepository.findByStatus(status);
    }

    public List<Risk> getHighRisks(int minScore) {
        return riskRepository.findHighRisks(minScore);
    }

    public Risk createRisk(Risk risk) {
        // Ensure category exists
        Category category = categoryService.getCategoryById(risk.getCategory().getId());
        risk.setCategory(category);
        return riskRepository.save(risk);
    }

    public Risk updateRisk(Long id, Risk risk) {
        Risk existingRisk = getRiskById(id);
        
        if (risk.getCategory() != null) {
            Category category = categoryService.getCategoryById(risk.getCategory().getId());
            existingRisk.setCategory(category);
        }

        existingRisk.setName(risk.getName());
        existingRisk.setDescription(risk.getDescription());
        existingRisk.setImpactLevel(risk.getImpactLevel());
        existingRisk.setProbabilityLevel(risk.getProbabilityLevel());
        existingRisk.setStatus(risk.getStatus());
        existingRisk.setMitigationPlan(risk.getMitigationPlan());

        return riskRepository.save(existingRisk);
    }

    public Risk addControlToRisk(Long riskId, Control control) {
        Risk risk = getRiskById(riskId);
        risk.addControl(control);
        return riskRepository.save(risk);
    }

    public Risk removeControlFromRisk(Long riskId, Control control) {
        Risk risk = getRiskById(riskId);
        risk.removeControl(control);
        return riskRepository.save(risk);
    }

    public void deleteRisk(Long id) {
        if (!riskRepository.existsById(id)) {
            throw new EntityNotFoundException("Risk not found with id: " + id);
        }
        riskRepository.deleteById(id);
    }

    public List<Risk> getRisksByCategoryAndStatus(Long categoryId, Risk.Status status) {
        return riskRepository.findByCategoryAndStatus(categoryId, status);
    }

    public List<Risk> getRisksByImpactAndProbability(Risk.ImpactLevel impactLevel, Risk.ProbabilityLevel probabilityLevel) {
        return riskRepository.findByImpactLevelAndProbabilityLevel(impactLevel, probabilityLevel);
    }
} 