package com.sentinelrisk.dto;

import com.sentinelrisk.model.Asset;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class AssetCreateRequest {

    @Pattern(regexp = "^[a-zA-Z0-9.-]+$", message = "Le hostname ne peut contenir que des lettres, chiffres, points et tirets")
    @Size(max = 255, message = "Le hostname ne peut pas dépasser 255 caractères")
    private String hostname;

    @Pattern(regexp = "^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$", 
             message = "L'adresse IP doit être au format IPv4 valide")
    private String ipAddress;

    @NotNull(message = "Le type d'asset est obligatoire")
    private Asset.AssetType type;

    @NotNull(message = "La version SNMP est obligatoire")
    private Asset.SnmpVersion snmpVersion;

    @Min(value = 1, message = "Le port doit être supérieur à 0")
    @Max(value = 65535, message = "Le port doit être inférieur à 65536")
    private Integer port = 161;

    // Pour SNMP v1/v2c
    @Size(max = 100, message = "La community ne peut pas dépasser 100 caractères")
    private String community;

    // Pour SNMP v3
    @Size(max = 50, message = "L'utilisateur SNMP v3 ne peut pas dépasser 50 caractères")
    private String snmpV3User;

    @Pattern(regexp = "^(MD5|SHA|SHA224|SHA256|SHA384|SHA512)?$", 
             message = "Le protocole d'authentification doit être MD5, SHA, SHA224, SHA256, SHA384 ou SHA512")
    private String authProtocol;

    @Size(min = 8, max = 100, message = "Le mot de passe d'authentification doit contenir entre 8 et 100 caractères")
    private String authPass;

    @Pattern(regexp = "^(DES|3DES|AES128|AES192|AES256)?$", 
             message = "Le protocole de chiffrement doit être DES, 3DES, AES128, AES192 ou AES256")
    private String privProtocol;

    @Size(min = 8, max = 100, message = "Le mot de passe de chiffrement doit contenir entre 8 et 100 caractères")
    private String privPass;

    @Size(max = 500, message = "La description ne peut pas dépasser 500 caractères")
    private String description;

    private Boolean active = true;

    @AssertTrue(message = "Au moins un hostname ou une adresse IP doit être spécifié")
    public boolean isHostnameOrIpProvided() {
        return (hostname != null && !hostname.trim().isEmpty()) || 
               (ipAddress != null && !ipAddress.trim().isEmpty());
    }

    @AssertTrue(message = "La community est obligatoire pour SNMP v1/v2c")
    public boolean isCommunityValidForVersion() {
        if (snmpVersion == Asset.SnmpVersion.V1 || snmpVersion == Asset.SnmpVersion.V2C) {
            return community != null && !community.trim().isEmpty();
        }
        return true;
    }

    @AssertTrue(message = "L'utilisateur SNMP v3 est obligatoire pour SNMP v3")
    public boolean isSnmpV3UserValidForVersion() {
        if (snmpVersion == Asset.SnmpVersion.V3) {
            return snmpV3User != null && !snmpV3User.trim().isEmpty();
        }
        return true;
    }

    @AssertTrue(message = "Le protocole d'authentification et le mot de passe sont obligatoires ensemble")
    public boolean isAuthConfigValid() {
        if (authProtocol != null && !authProtocol.trim().isEmpty()) {
            return authPass != null && !authPass.trim().isEmpty();
        }
        if (authPass != null && !authPass.trim().isEmpty()) {
            return authProtocol != null && !authProtocol.trim().isEmpty();
        }
        return true;
    }

    @AssertTrue(message = "Le protocole de chiffrement et le mot de passe sont obligatoires ensemble")
    public boolean isPrivConfigValid() {
        if (privProtocol != null && !privProtocol.trim().isEmpty()) {
            return privPass != null && !privPass.trim().isEmpty();
        }
        if (privPass != null && !privPass.trim().isEmpty()) {
            return privProtocol != null && !privProtocol.trim().isEmpty();
        }
        return true;
    }
} 