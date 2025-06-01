package com.sentinelrisk.service;

import com.sentinelrisk.model.Asset;
import lombok.extern.slf4j.Slf4j;
import org.snmp4j.*;
import org.snmp4j.event.ResponseEvent;
import org.snmp4j.mp.SnmpConstants;
import org.snmp4j.security.*;
import org.snmp4j.smi.*;
import org.snmp4j.transport.DefaultUdpTransportMapping;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class SnmpService {

    private static final int TIMEOUT = 5000; // 5 secondes
    private static final int RETRIES = 2;

    /**
     * Récupère les valeurs des OIDs spécifiés pour un asset donné
     */
    public Map<String, Object> fetchOids(Asset asset, List<String> oids) {
        log.info("Début du scan SNMP pour l'asset {} avec {} OIDs", 
                 getAssetIdentifier(asset), oids.size());
        
        Map<String, Object> results = new HashMap<>();
        Snmp snmp = null;
        
        try {
            // Configuration du transport
            TransportMapping<?> transport = new DefaultUdpTransportMapping();
            snmp = new Snmp(transport);
            
            // Configuration selon la version SNMP
            Target<?> target = createTarget(asset);
            
            // Démarrage du transport
            transport.listen();
            
            // Création du PDU
            PDU pdu = createPDU(asset.getSnmpVersion(), oids);
            
            // Envoi de la requête
            ResponseEvent response = snmp.send(pdu, target);
            
            if (response != null && response.getResponse() != null) {
                results = parseResponse(response.getResponse(), oids);
                log.info("Scan SNMP réussi pour l'asset {}, {} valeurs récupérées", 
                         getAssetIdentifier(asset), results.size());
            } else {
                log.warn("Aucune réponse reçue pour l'asset {}", getAssetIdentifier(asset));
            }
            
        } catch (IOException e) {
            log.error("Erreur de communication SNMP avec l'asset {}: {}", 
                     getAssetIdentifier(asset), e.getMessage());
            throw new SnmpException("Erreur de communication SNMP", e);
        } catch (Exception e) {
            log.error("Erreur lors du scan SNMP de l'asset {}: {}", 
                     getAssetIdentifier(asset), e.getMessage());
            throw new SnmpException("Erreur lors du scan SNMP", e);
        } finally {
            if (snmp != null) {
                try {
                    snmp.close();
                } catch (IOException e) {
                    log.warn("Erreur lors de la fermeture de la session SNMP: {}", e.getMessage());
                }
            }
        }
        
        return results;
    }

    private Target<?> createTarget(Asset asset) {
        String address = getAssetAddress(asset);
        
        switch (asset.getSnmpVersion()) {
            case V1:
                return createV1Target(address, asset);
            case V2C:
                return createV2cTarget(address, asset);
            case V3:
                return createV3Target(address, asset);
            default:
                throw new IllegalArgumentException("Version SNMP non supportée: " + asset.getSnmpVersion());
        }
    }

    private CommunityTarget<Address> createV1Target(String address, Asset asset) {
        CommunityTarget<Address> target = new CommunityTarget<>();
        target.setCommunity(new OctetString(asset.getCommunity()));
        target.setAddress(GenericAddress.parse("udp:" + address + "/" + asset.getPort()));
        target.setVersion(SnmpConstants.version1);
        target.setTimeout(TIMEOUT);
        target.setRetries(RETRIES);
        return target;
    }

    private CommunityTarget<Address> createV2cTarget(String address, Asset asset) {
        CommunityTarget<Address> target = new CommunityTarget<>();
        target.setCommunity(new OctetString(asset.getCommunity()));
        target.setAddress(GenericAddress.parse("udp:" + address + "/" + asset.getPort()));
        target.setVersion(SnmpConstants.version2c);
        target.setTimeout(TIMEOUT);
        target.setRetries(RETRIES);
        return target;
    }

    private UserTarget createV3Target(String address, Asset asset) {
        UserTarget target = new UserTarget();
        target.setAddress(GenericAddress.parse("udp:" + address + "/" + asset.getPort()));
        target.setVersion(SnmpConstants.version3);
        target.setTimeout(TIMEOUT);
        target.setRetries(RETRIES);
        target.setSecurityLevel(SecurityLevel.AUTH_PRIV);
        target.setSecurityName(new OctetString(asset.getSnmpV3User()));
        return target;
    }

    private PDU createPDU(Asset.SnmpVersion version, List<String> oids) {
        PDU pdu;
        
        if (version == Asset.SnmpVersion.V1) {
            pdu = new PDUv1();
        } else {
            pdu = new PDU();
        }
        
        pdu.setType(PDU.GET);
        
        for (String oidString : oids) {
            try {
                OID oid = new OID(oidString);
                pdu.add(new VariableBinding(oid));
            } catch (Exception e) {
                log.warn("OID invalide ignoré: {}", oidString);
            }
        }
        
        return pdu;
    }

    private Map<String, Object> parseResponse(PDU response, List<String> requestedOids) {
        Map<String, Object> results = new HashMap<>();
        
        for (int i = 0; i < response.getVariableBindings().size(); i++) {
            VariableBinding vb = response.get(i);
            String oid = vb.getOid().toString();
            Variable variable = vb.getVariable();
            
            Object value = convertSnmpValue(variable);
            results.put(oid, value);
            
            log.debug("OID: {} = {}", oid, value);
        }
        
        return results;
    }

    private Object convertSnmpValue(Variable variable) {
        if (variable.isException()) {
            return "SNMP Exception: " + variable.toString();
        }
        
        if (variable instanceof Integer32) {
            return ((Integer32) variable).getValue();
        } else if (variable instanceof Counter32) {
            return ((Counter32) variable).getValue();
        } else if (variable instanceof Counter64) {
            return ((Counter64) variable).getValue();
        } else if (variable instanceof Gauge32) {
            return ((Gauge32) variable).getValue();
        } else if (variable instanceof TimeTicks) {
            return ((TimeTicks) variable).getValue();
        } else if (variable instanceof OctetString) {
            return variable.toString();
        } else if (variable instanceof OID) {
            return variable.toString();
        } else if (variable instanceof IpAddress) {
            return variable.toString();
        } else if (variable instanceof Null) {
            return null;
        } else {
            return variable.toString();
        }
    }

    private String getAssetAddress(Asset asset) {
        if (asset.getIpAddress() != null && !asset.getIpAddress().trim().isEmpty()) {
            return asset.getIpAddress();
        } else if (asset.getHostname() != null && !asset.getHostname().trim().isEmpty()) {
            return asset.getHostname();
        } else {
            throw new IllegalArgumentException("L'asset doit avoir une adresse IP ou un hostname");
        }
    }

    private String getAssetIdentifier(Asset asset) {
        if (asset.getHostname() != null && !asset.getHostname().trim().isEmpty()) {
            return asset.getHostname();
        } else if (asset.getIpAddress() != null && !asset.getIpAddress().trim().isEmpty()) {
            return asset.getIpAddress();
        } else {
            return "Asset ID: " + asset.getId();
        }
    }

    public static class SnmpException extends RuntimeException {
        public SnmpException(String message) {
            super(message);
        }
        
        public SnmpException(String message, Throwable cause) {
            super(message, cause);
        }
    }
} 