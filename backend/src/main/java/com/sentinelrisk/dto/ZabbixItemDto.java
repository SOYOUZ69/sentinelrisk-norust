package com.sentinelrisk.dto;

import lombok.Data;

@Data
public class ZabbixItemDto {
    private String itemid;
    private String name;
    private String key;
    private String lastvalue;
    private String status;
} 