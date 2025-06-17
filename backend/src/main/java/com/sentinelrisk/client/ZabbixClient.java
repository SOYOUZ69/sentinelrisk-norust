package com.sentinelrisk.client;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Component
public class ZabbixClient {
    private static final Logger logger = LoggerFactory.getLogger(ZabbixClient.class);
    private static final String JSON_RPC_VERSION = "2.0";
    private static final String API_ENDPOINT = "/api_jsonrpc.php";

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private final String zabbixUrl;
    private final String username;
    private final String password;
    private String authToken;

    public ZabbixClient(
            RestTemplate restTemplate,
            ObjectMapper objectMapper,
            @Value("${zabbix.url}") String zabbixUrl,
            @Value("${zabbix.username}") String username,
            @Value("${zabbix.password}") String password) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
        this.zabbixUrl = zabbixUrl + API_ENDPOINT;
        this.username = username;
        this.password = password;
    }

    public void login() {
        logger.debug("Authenticating to Zabbix API");
        ObjectNode request = objectMapper.createObjectNode()
                .put("jsonrpc", JSON_RPC_VERSION)
                .put("method", "user.login")
                .put("id", 1);

        ObjectNode params = request.putObject("params")
                .put("user", username)
                .put("password", password);

        JsonNode response = sendRequest(request);
        this.authToken = response.get("result").asText();
        logger.info("Successfully authenticated to Zabbix API");
    }

    public JsonNode getHosts() {
        logger.debug("Fetching hosts from Zabbix");
        ObjectNode request = createAuthenticatedRequest("host.get", 2);
        ObjectNode params = request.putObject("params");
        params.putArray("output").add("hostid").add("host").add("name").add("status");

        return sendRequest(request);
    }

    public JsonNode getItemsByHost(String hostId) {
        logger.debug("Fetching items for host: {}", hostId);
        ObjectNode request = createAuthenticatedRequest("item.get", 3);
        ObjectNode params = request.putObject("params");
        params.putArray("output").add("itemid").add("name").add("key_").add("lastvalue").add("status");

        ObjectNode filter = params.putObject("filter");
        filter.put("hostid", hostId);

        return sendRequest(request);
    }

    public JsonNode getHistory(String itemId, long timeFrom, long timeTill) {
        logger.debug("Fetching history for item: {} from {} to {}", itemId, timeFrom, timeTill);
        ObjectNode request = createAuthenticatedRequest("history.get", 4);
        ObjectNode params = request.putObject("params");
        params.put("output", "extend")
                .put("history", 0)
                .put("itemids", itemId)
                .put("time_from", timeFrom)
                .put("time_till", timeTill)
                .put("sortfield", "clock")
                .put("sortorder", "DESC");

        return sendRequest(request);
    }

    private ObjectNode createAuthenticatedRequest(String method, int id) {
        if (authToken == null) {
            login();
        }

        return objectMapper.createObjectNode()
                .put("jsonrpc", JSON_RPC_VERSION)
                .put("method", method)
                .put("id", id)
                .put("auth", authToken);
    }

    private JsonNode sendRequest(ObjectNode request) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> entity = new HttpEntity<>(request.toString(), headers);
        String response = restTemplate.postForObject(zabbixUrl, entity, String.class);

        try {
            JsonNode jsonResponse = objectMapper.readTree(response);
            if (jsonResponse.has("error")) {
                logger.error("Zabbix API error: {}", jsonResponse.get("error"));
                throw new RuntimeException("Zabbix API error: " + jsonResponse.get("error"));
            }
            return jsonResponse;
        } catch (Exception e) {
            logger.error("Error parsing Zabbix API response", e);
            throw new RuntimeException("Error parsing Zabbix API response", e);
        }
    }
} 