package com.sentinelrisk.backend.dto;

import com.sentinelrisk.backend.model.Control.Type;
import com.sentinelrisk.backend.model.Control.Status;
import com.sentinelrisk.backend.model.Control.Frequency;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO pour représenter un contrôle de manière simplifiée
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ControlDTO {
    private Long id;
    private String name;
    private String description;
    private Type type;
    private Status status;
    private Frequency frequency;
} 