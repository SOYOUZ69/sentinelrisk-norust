package com.sentinelrisk.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

class SnmpEntitiesTest {

    @Test
    void testAssetCreation() {
        // Given & When
        Asset asset = new Asset();
        
        // Then
        assertNotNull(asset);
        assertEquals(161, asset.getPort()); // Port par défaut
        assertTrue(asset.getActive()); // Actif par défaut
    }

    @Test
    void testAssetEnums() {
        // Test des enums AssetType
        assertEquals("Serveur", Asset.AssetType.SERVER.getDisplayName());
        assertEquals("Commutateur", Asset.AssetType.SWITCH.getDisplayName());
        
        // Test des enums SnmpVersion
        assertEquals("SNMP v1", Asset.SnmpVersion.V1.getDisplayName());
        assertEquals("SNMP v2c", Asset.SnmpVersion.V2C.getDisplayName());
        assertEquals("SNMP v3", Asset.SnmpVersion.V3.getDisplayName());
    }

    @Test
    void testSnmpScanConfigCreation() {
        // Given & When
        SnmpScanConfig config = new SnmpScanConfig();
        
        // Then
        assertNotNull(config);
        assertTrue(config.getActive()); // Actif par défaut
    }

    @Test
    void testSnmpScanResultCreation() {
        // Given & When
        SnmpScanResult result = new SnmpScanResult();
        
        // Then
        assertNotNull(result);
        assertEquals(SnmpScanResult.ScanStatus.SUCCESS, result.getStatus()); // Statut par défaut
    }

    @Test
    void testSnmpScanResultUtilityMethods() {
        // Given
        SnmpScanResult result = new SnmpScanResult();
        
        // Test isSuccessful
        result.setStatus(SnmpScanResult.ScanStatus.SUCCESS);
        assertTrue(result.isSuccessful());
        
        result.setStatus(SnmpScanResult.ScanStatus.PARTIAL_SUCCESS);
        assertTrue(result.isSuccessful());
        
        result.setStatus(SnmpScanResult.ScanStatus.FAILURE);
        assertFalse(result.isSuccessful());
        
        // Test hasErrors
        result.setStatus(SnmpScanResult.ScanStatus.FAILURE);
        assertTrue(result.hasErrors());
        
        result.setStatus(SnmpScanResult.ScanStatus.TIMEOUT);
        assertTrue(result.hasErrors());
        
        result.setStatus(SnmpScanResult.ScanStatus.SUCCESS);
        assertFalse(result.hasErrors());
    }

    @Test
    void testSeverityThreshold() {
        // Given
        SnmpScanConfig.SeverityThreshold threshold = new SnmpScanConfig.SeverityThreshold();
        threshold.setMinValue(10.0);
        threshold.setMaxValue(90.0);
        threshold.setSeverity(SnmpScanConfig.SeverityThreshold.SeverityLevel.MEDIUM);
        
        // When & Then
        assertTrue(threshold.isInRange(50.0));
        assertTrue(threshold.isInRange(10.0)); // Limite inférieure incluse
        assertTrue(threshold.isInRange(90.0)); // Limite supérieure incluse
        assertFalse(threshold.isInRange(5.0)); // En dessous
        assertFalse(threshold.isInRange(95.0)); // Au dessus
        assertFalse(threshold.isInRange(null)); // Null
    }

    @Test
    void testSeverityLevelDisplayNames() {
        assertEquals("Faible", SnmpScanConfig.SeverityThreshold.SeverityLevel.LOW.getDisplayName());
        assertEquals("Moyen", SnmpScanConfig.SeverityThreshold.SeverityLevel.MEDIUM.getDisplayName());
        assertEquals("Élevé", SnmpScanConfig.SeverityThreshold.SeverityLevel.HIGH.getDisplayName());
        assertEquals("Critique", SnmpScanConfig.SeverityThreshold.SeverityLevel.CRITICAL.getDisplayName());
    }

    @Test
    void testScanStatusDisplayNames() {
        assertEquals("Succès", SnmpScanResult.ScanStatus.SUCCESS.getDisplayName());
        assertEquals("Succès partiel", SnmpScanResult.ScanStatus.PARTIAL_SUCCESS.getDisplayName());
        assertEquals("Échec", SnmpScanResult.ScanStatus.FAILURE.getDisplayName());
        assertEquals("Timeout", SnmpScanResult.ScanStatus.TIMEOUT.getDisplayName());
        assertEquals("Erreur de connexion", SnmpScanResult.ScanStatus.CONNECTION_ERROR.getDisplayName());
    }
} 