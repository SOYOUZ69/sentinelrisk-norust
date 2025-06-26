package com.sentinelrisk.backend.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Tests pour les corrections de statut et d'interprétation SNMP
 */
public class OidInterpretationServiceTest {

    private OidInterpretationService service;

    @BeforeEach
    void setUp() {
        service = new OidInterpretationService();
    }

    @Test
    void testTimeTicks_NonNumericValue_ShouldReturnNormalStatus() {
        // Test avec TimeTicks non numérique (comme "16 days, 7:08:55.72")
        OidInterpretationService.InterpretationResult result = 
            service.interpretValue("1.3.6.1.2.1.1.3.0", "16 days, 7:08:55.72", "TimeTicks");

        assertEquals("NORMAL", result.getStatus());
        assertTrue(result.getInterpretation().contains("Temps de fonctionnement"));
        assertEquals("16 days, 7:08:55.72", result.getFormattedValue());
    }

    @Test
    void testTimeTicks_NumericValue_ShouldReturnNormalStatus() {
        // Test avec TimeTicks numérique
        OidInterpretationService.InterpretationResult result = 
            service.interpretValue("1.3.6.1.2.1.1.3.0", "155923572", "TimeTicks");

        assertEquals("NORMAL", result.getStatus());
        assertTrue(result.getInterpretation().contains("Système démarré depuis"));
    }

    @Test
    void testNullValue_ShouldReturnUnavailableStatus() {
        // Test avec valeur null
        OidInterpretationService.InterpretationResult result = 
            service.interpretValue("1.3.6.1.4.1.2021.9.1.6.1", null, "Integer");

        assertEquals("UNAVAILABLE", result.getStatus());
        assertEquals("N/A", result.getFormattedValue());
        assertTrue(result.getInterpretation().contains("Aucune valeur reçue"));
    }

    @Test
    void testEmptyValue_ShouldReturnUnavailableStatus() {
        // Test avec valeur vide
        OidInterpretationService.InterpretationResult result = 
            service.interpretValue("1.3.6.1.4.1.2021.9.1.6.1", "", "Integer");

        assertEquals("UNAVAILABLE", result.getStatus());
        assertEquals("N/A", result.getFormattedValue());
        assertTrue(result.getInterpretation().contains("Aucune valeur reçue"));
    }

    @Test
    void testGenericTimeTicks_NonNumeric_ShouldReturnNormalStatus() {
        // Test avec TimeTicks générique non numérique
        OidInterpretationService.InterpretationResult result = 
            service.interpretValue("1.3.6.1.2.1.999.999.0", "some formatted time", "TimeTicks");

        assertEquals("NORMAL", result.getStatus());
        assertTrue(result.getInterpretation().contains("Durée"));
        assertEquals("some formatted time", result.getFormattedValue());
    }

    @Test
    void testValidValue_ShouldReturnNormalStatus() {
        // Test avec valeur normale
        OidInterpretationService.InterpretationResult result = 
            service.interpretValue("1.3.6.1.2.1.1.1.0", "Linux system", "OctetString");

        assertEquals("NORMAL", result.getStatus());
        assertTrue(result.getInterpretation().contains("SYSTEM"));
        assertEquals("Linux system", result.getFormattedValue());
    }

    @Test
    void testCounter_ShouldFormatCorrectly() {
        // Test avec compteur
        OidInterpretationService.InterpretationResult result = 
            service.interpretValue("1.3.6.1.2.1.2.2.1.10.1", "1234567", "Counter32");

        assertEquals("NORMAL", result.getStatus());
        assertEquals("1,234,567", result.getFormattedValue());
        assertTrue(result.getInterpretation().contains("Compteur"));
    }
} 