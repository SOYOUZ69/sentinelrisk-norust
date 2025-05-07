package com.sentinelrisk.backend.dto;

import com.sentinelrisk.backend.model.Control.Type;
import com.sentinelrisk.backend.model.Control.Status;
import com.sentinelrisk.backend.model.Control.Frequency;
import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

import java.time.LocalDate;
import java.util.List;

@Data
public class ControlRequest {
    @NotBlank
    @Size(max = 100)
    private String name;

    @Size(max = 1000)
    private String description;

    private Type type;

    private Status status;

    private Frequency frequency;

    @Size(max = 2000)
    private String implementationDetails;
    
    private LocalDate implementationDate;
    
    private LocalDate lastTestedDate;
    
    @Min(0)
    @Max(100)
    private Integer effectivenessScore;
    
    private String owner;
    
    private String documentation;
    
    private List<Long> riskIds;
} 