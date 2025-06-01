package com.sentinelrisk.dto;

import com.sentinelrisk.model.SnmpScanConfig;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class ConfigCreateRequest {

    @NotBlank(message = "Le nom de la configuration est obligatoire")
    @Size(min = 3, max = 100, message = "Le nom doit contenir entre 3 et 100 caractères")
    private String name;

    @NotNull(message = "L'ID de l'asset est obligatoire")
    @Positive(message = "L'ID de l'asset doit être positif")
    private Long assetId;

    @Pattern(regexp = "^[0-9*/,-]+\\s+[0-9*/,-]+\\s+[0-9*/,-]+\\s+[0-9*/,-]+\\s+[0-9*/,-]+$", 
             message = "L'expression cron doit être au format valide (5 champs séparés par des espaces)")
    private String cronExpression;

    @Min(value = 1, message = "L'intervalle doit être d'au moins 1 minute")
    @Max(value = 1440, message = "L'intervalle ne peut pas dépasser 1440 minutes (24h)")
    private Integer intervalMinutes;

    @NotEmpty(message = "Au moins un OID doit être spécifié")
    @Size(max = 50, message = "Maximum 50 OIDs autorisés")
    private List<@Pattern(regexp = "^[0-9]+(\\.[0-9]+)*$", message = "Format OID invalide") String> oids;

    @Valid
    private Map<String, SeverityThresholdDto> severityThresholds;

    @Size(max = 1000, message = "La description ne peut pas dépasser 1000 caractères")
    private String description;

    private Boolean active = true;

    @AssertTrue(message = "Soit cronExpression soit intervalMinutes doit être spécifié, mais pas les deux")
    public boolean isSchedulingValid() {
        boolean hasCron = cronExpression != null && !cronExpression.trim().isEmpty();
        boolean hasInterval = intervalMinutes != null && intervalMinutes > 0;
        return hasCron ^ hasInterval; // XOR - exactement un des deux
    }

    @Data
    public static class SeverityThresholdDto {
        
        private Double minValue;
        
        private Double maxValue;

        @NotNull(message = "Le niveau de sévérité est obligatoire")
        private SnmpScanConfig.SeverityThreshold.SeverityLevel severity;
        
        @Size(max = 200, message = "La description ne peut pas dépasser 200 caractères")
        private String description;

        @AssertTrue(message = "Au moins une valeur min ou max doit être spécifiée")
        public boolean isRangeValid() {
            return minValue != null || maxValue != null;
        }

        @AssertTrue(message = "La valeur min doit être inférieure à la valeur max")
        public boolean isMinMaxValid() {
            if (minValue != null && maxValue != null) {
                return minValue <= maxValue;
            }
            return true;
        }
    }
} 