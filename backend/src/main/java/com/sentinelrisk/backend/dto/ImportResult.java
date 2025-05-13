package com.sentinelrisk.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ImportResult {
    private int importedCount;
    private List<String> errors = new ArrayList<>();
    
    public ImportResult(int importedCount) {
        this.importedCount = importedCount;
        this.errors = new ArrayList<>();
    }
} 