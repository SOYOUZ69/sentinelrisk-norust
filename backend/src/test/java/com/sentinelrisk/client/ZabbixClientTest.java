package com.sentinelrisk.client;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.client.RestTemplate;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class ZabbixClientTest {

    private ZabbixClient zabbixClient;
    private RestTemplate restTemplate;
    private ObjectMapper objectMapper;
    private static final String TEST_URL = "http://localhost:8082";
    private static final String TEST_USERNAME = "Admin";
    private static final String TEST_PASSWORD = "zabbix";

    @BeforeEach
    void setUp() {
        restTemplate = mock(RestTemplate.class);
        objectMapper = new ObjectMapper();
        zabbixClient = new ZabbixClient(restTemplate, objectMapper, TEST_URL, TEST_USERNAME, TEST_PASSWORD);
    }

    @Test
    void testLogin() throws Exception {
        // Préparer la réponse mock
        ObjectNode responseNode = objectMapper.createObjectNode();
        responseNode.put("jsonrpc", "2.0");
        responseNode.put("result", "test-auth-token");
        responseNode.put("id", 1);

        when(restTemplate.postForObject(
                eq(TEST_URL + "/api_jsonrpc.php"),
                any(HttpEntity.class),
                eq(String.class)
        )).thenReturn(responseNode.toString());

        // Exécuter le test
        zabbixClient.login();

        // Vérifier que le token est stocké
        String authToken = (String) ReflectionTestUtils.getField(zabbixClient, "authToken");
        assertEquals("test-auth-token", authToken);
    }

    @Test
    void testGetHosts() throws Exception {
        // Préparer la réponse mock
        ObjectNode responseNode = objectMapper.createObjectNode();
        responseNode.put("jsonrpc", "2.0");
        ObjectNode resultNode = responseNode.putArray("result")
                .addObject()
                .put("hostid", "10084")
                .put("host", "test-host")
                .put("name", "Test Host")
                .put("status", "0");
        responseNode.put("id", 2);

        when(restTemplate.postForObject(
                eq(TEST_URL + "/api_jsonrpc.php"),
                any(HttpEntity.class),
                eq(String.class)
        )).thenReturn(responseNode.toString());

        // Exécuter le test
        JsonNode response = zabbixClient.getHosts();

        // Vérifier la réponse
        assertNotNull(response);
        assertTrue(response.has("result"));
        assertEquals("10084", response.get("result").get(0).get("hostid").asText());
        assertEquals("test-host", response.get("result").get(0).get("host").asText());
    }

    @Test
    void testGetItemsByHost() throws Exception {
        // Préparer la réponse mock
        ObjectNode responseNode = objectMapper.createObjectNode();
        responseNode.put("jsonrpc", "2.0");
        ObjectNode resultNode = responseNode.putArray("result")
                .addObject()
                .put("itemid", "28415")
                .put("name", "CPU Usage")
                .put("key_", "snmp.cpu.usage")
                .put("lastvalue", "45.2")
                .put("status", "0");
        responseNode.put("id", 3);

        when(restTemplate.postForObject(
                eq(TEST_URL + "/api_jsonrpc.php"),
                any(HttpEntity.class),
                eq(String.class)
        )).thenReturn(responseNode.toString());

        // Exécuter le test
        JsonNode response = zabbixClient.getItemsByHost("10084");

        // Vérifier la réponse
        assertNotNull(response);
        assertTrue(response.has("result"));
        assertEquals("28415", response.get("result").get(0).get("itemid").asText());
        assertEquals("CPU Usage", response.get("result").get(0).get("name").asText());
    }

    @Test
    void testGetHistory() throws Exception {
        // Préparer la réponse mock
        ObjectNode responseNode = objectMapper.createObjectNode();
        responseNode.put("jsonrpc", "2.0");
        ObjectNode resultNode = responseNode.putArray("result")
                .addObject()
                .put("itemid", "28415")
                .put("clock", "1646092800")
                .put("value", "45.2")
                .put("ns", "123456789");
        responseNode.put("id", 4);

        when(restTemplate.postForObject(
                eq(TEST_URL + "/api_jsonrpc.php"),
                any(HttpEntity.class),
                eq(String.class)
        )).thenReturn(responseNode.toString());

        // Exécuter le test
        JsonNode response = zabbixClient.getHistory("28415", 1646092800L, 1646179200L);

        // Vérifier la réponse
        assertNotNull(response);
        assertTrue(response.has("result"));
        assertEquals("28415", response.get("result").get(0).get("itemid").asText());
        assertEquals("45.2", response.get("result").get(0).get("value").asText());
    }
} 