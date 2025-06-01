package com.sentinelrisk.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "assets")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class Asset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "hostname")
    private String hostname;

    @Column(name = "ip_address")
    private String ipAddress;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    @NotNull(message = "Le type d'asset est obligatoire")
    private AssetType type;

    @Enumerated(EnumType.STRING)
    @Column(name = "snmp_version", nullable = false)
    @NotNull(message = "La version SNMP est obligatoire")
    private SnmpVersion snmpVersion;

    // Pour SNMP v1/v2c
    @Column(name = "community")
    private String community;

    // Pour SNMP v3
    @Column(name = "snmp_v3_user")
    private String snmpV3User;

    @Column(name = "auth_protocol")
    private String authProtocol;

    @Column(name = "auth_pass")
    private String authPass;

    @Column(name = "priv_protocol")
    private String privProtocol;

    @Column(name = "priv_pass")
    private String privPass;

    @Column(name = "port", nullable = false)
    @NotNull(message = "Le port est obligatoire")
    private Integer port = 161; // Port SNMP par défaut

    @Column(name = "description")
    private String description;

    @Column(name = "active", nullable = false)
    private Boolean active = true;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    // Validation personnalisée
    @PrePersist
    @PreUpdate
    private void validateAsset() {
        if (hostname == null && ipAddress == null) {
            throw new IllegalArgumentException("Au moins un hostname ou une adresse IP doit être spécifié");
        }
        
        if (snmpVersion == SnmpVersion.V1 || snmpVersion == SnmpVersion.V2C) {
            if (community == null || community.trim().isEmpty()) {
                throw new IllegalArgumentException("La community est obligatoire pour SNMP v1/v2c");
            }
        } else if (snmpVersion == SnmpVersion.V3) {
            if (snmpV3User == null || snmpV3User.trim().isEmpty()) {
                throw new IllegalArgumentException("L'utilisateur SNMP v3 est obligatoire");
            }
        }
    }

    public enum AssetType {
        SERVER("Serveur"),
        PC("Ordinateur"),
        SWITCH("Commutateur"),
        ROUTER("Routeur"),
        PRINTER("Imprimante"),
        FIREWALL("Pare-feu"),
        UPS("Onduleur"),
        OTHER("Autre");

        private final String displayName;

        AssetType(String displayName) {
            this.displayName = displayName;
        }

        public String getDisplayName() {
            return displayName;
        }
    }

    public enum SnmpVersion {
        V1("SNMP v1"),
        V2C("SNMP v2c"),
        V3("SNMP v3");

        private final String displayName;

        SnmpVersion(String displayName) {
            this.displayName = displayName;
        }

        public String getDisplayName() {
            return displayName;
        }
    }
} 