package com.sentinelrisk.dto;

import lombok.Data;

@Data
public class ZabbixHistoryDto {
    private String itemid;
    private String clock;
    private String value;
    private String ns;
} 