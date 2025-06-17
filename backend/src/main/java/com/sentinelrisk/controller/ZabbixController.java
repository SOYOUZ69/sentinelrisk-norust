package com.sentinelrisk.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.sentinelrisk.client.ZabbixClient;
import com.sentinelrisk.dto.ZabbixHostDto;
import com.sentinelrisk.dto.ZabbixItemDto;
import com.sentinelrisk.dto.ZabbixHistoryDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/api/snmp/zabbix")
public class ZabbixController {
    private static final Logger logger = LoggerFactory.getLogger(ZabbixController.class);

    private final ZabbixClient zabbixClient;

    public ZabbixController(ZabbixClient zabbixClient) {
        this.zabbixClient = zabbixClient;
    }

    @GetMapping("/hosts")
    public ResponseEntity<List<ZabbixHostDto>> getHosts() {
        logger.debug("Getting all Zabbix hosts");
        JsonNode response = zabbixClient.getHosts();
        List<ZabbixHostDto> hosts = StreamSupport.stream(response.get("result").spliterator(), false)
                .map(node -> {
                    ZabbixHostDto host = new ZabbixHostDto();
                    host.setHostid(node.get("hostid").asText());
                    host.setHost(node.get("host").asText());
                    host.setName(node.get("name").asText());
                    host.setStatus(node.get("status").asText());
                    return host;
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(hosts);
    }

    @GetMapping("/hosts/{hostId}/items")
    public ResponseEntity<List<ZabbixItemDto>> getItemsByHost(@PathVariable String hostId) {
        logger.debug("Getting items for host: {}", hostId);
        JsonNode response = zabbixClient.getItemsByHost(hostId);
        List<ZabbixItemDto> items = StreamSupport.stream(response.get("result").spliterator(), false)
                .map(node -> {
                    ZabbixItemDto item = new ZabbixItemDto();
                    item.setItemid(node.get("itemid").asText());
                    item.setName(node.get("name").asText());
                    item.setKey(node.get("key_").asText());
                    item.setLastvalue(node.get("lastvalue").asText());
                    item.setStatus(node.get("status").asText());
                    return item;
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(items);
    }

    @GetMapping("/items/{itemId}/history")
    public ResponseEntity<List<ZabbixHistoryDto>> getHistory(
            @PathVariable String itemId,
            @RequestParam long start,
            @RequestParam long end) {
        logger.debug("Getting history for item: {} from {} to {}", itemId, start, end);
        JsonNode response = zabbixClient.getHistory(itemId, start, end);
        List<ZabbixHistoryDto> history = StreamSupport.stream(response.get("result").spliterator(), false)
                .map(node -> {
                    ZabbixHistoryDto historyItem = new ZabbixHistoryDto();
                    historyItem.setItemid(node.get("itemid").asText());
                    historyItem.setClock(node.get("clock").asText());
                    historyItem.setValue(node.get("value").asText());
                    historyItem.setNs(node.get("ns").asText());
                    return historyItem;
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(history);
    }
} 