package com.sentinelrisk.dto;

import lombok.Data;

@Data
public class ZabbixHostDto {
    private String hostid;
    private String host;
    private String name;
    private String status;
} 