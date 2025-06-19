package com.sentinelrisk.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@ComponentScan(basePackages = {"com.sentinelrisk.backend", "com.sentinelrisk.client"})
public class SentinelRiskApplication {

    public static void main(String[] args) {
        SpringApplication.run(SentinelRiskApplication.class, args);
    }
} 