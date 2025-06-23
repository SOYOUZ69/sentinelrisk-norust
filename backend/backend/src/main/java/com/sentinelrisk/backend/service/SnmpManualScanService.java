package com.sentinelrisk.backend.service;

import com.sentinelrisk.backend.dto.SnmpManualScanRequest;
import com.sentinelrisk.backend.dto.SnmpManualScanResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.snmp4j.*;
import org.snmp4j.event.ResponseEvent;
import org.snmp4j.mp.SnmpConstants;
import org.snmp4j.smi.*;
import org.snmp4j.transport.DefaultUdpTransportMapping;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class SnmpManualScanService {

    private static final Logger logger = LoggerFactory.getLogger(SnmpManualScanService.class);

    public SnmpManualScanResponse performManualScan(SnmpManualScanRequest request) {
        logger.info("🔍 Début du scan SNMP manuel pour {}:{}", request.getIp(), request.getPort());
        
        long startTime = System.currentTimeMillis();
        SnmpManualScanResponse response = new SnmpManualScanResponse(false, request.getIp(), request.getPort());

        Snmp snmp = null;
        try {
            TransportMapping<?> transport = new DefaultUdpTransportMapping();
            snmp = new Snmp(transport);
            transport.listen();

            Target target = createTarget(request);
            PDU pdu = createPDU(request.getOids());

            ResponseEvent responseEvent = snmp.send(pdu, target);
            
            if (responseEvent != null && responseEvent.getResponse() != null) {
                PDU responsePdu = responseEvent.getResponse();
                
                if (responsePdu.getErrorStatus() == PDU.noError) {
                    List<SnmpManualScanResponse.SnmpResult> results = processResults(responsePdu);
                    response.setResults(results);
                    response.setSuccess(true);
                    logger.info("✅ Scan SNMP réussi pour {}:{}", request.getIp(), request.getPort());
                } else {
                    String errorMsg = "Erreur SNMP [" + responsePdu.getErrorStatus() + "]: " + responsePdu.getErrorStatusText();
                    response.setError(errorMsg);
                    logger.warn("⚠️ Erreur SNMP: {}", errorMsg);
                }
            } else {
                String errorMsg = "Timeout ou pas de réponse de l'équipement";
                response.setError(errorMsg);
                logger.warn("⚠️ Pas de réponse SNMP");
            }

        } catch (Exception e) {
            String errorMsg = "Erreur lors du scan SNMP: " + e.getMessage();
            response.setError(errorMsg);
            logger.error("❌ Erreur SNMP: {}", e.getMessage(), e);
        } finally {
            if (snmp != null) {
                try {
                    snmp.close();
                } catch (IOException e) {
                    logger.warn("Erreur lors de la fermeture SNMP: {}", e.getMessage());
                }
            }
        }

        long duration = System.currentTimeMillis() - startTime;
        response.setDuration(duration);
        
        return response;
    }

    private Target createTarget(SnmpManualScanRequest request) {
        Address targetAddress = GenericAddress.parse("udp:" + request.getIp() + "/" + request.getPort());
        
        CommunityTarget target = new CommunityTarget();
        target.setCommunity(new OctetString(request.getCommunity()));
        target.setAddress(targetAddress);
        target.setRetries(request.getRetries());
        target.setTimeout(request.getTimeout());
        
        switch (request.getVersion().toLowerCase()) {
            case "1":
                target.setVersion(SnmpConstants.version1);
                break;
            case "2c":
                target.setVersion(SnmpConstants.version2c);
                break;
            case "3":
                target.setVersion(SnmpConstants.version3);
                break;
            default:
                target.setVersion(SnmpConstants.version2c);
        }

        return target;
    }

    private PDU createPDU(List<String> oids) {
        PDU pdu = new PDU();
        pdu.setType(PDU.GET);

        for (String oidStr : oids) {
            try {
                OID oid = new OID(oidStr);
                pdu.add(new VariableBinding(oid));
            } catch (Exception e) {
                logger.warn("OID invalide ignoré '{}': {}", oidStr, e.getMessage());
            }
        }

        return pdu;
    }

    private List<SnmpManualScanResponse.SnmpResult> processResults(PDU responsePdu) {
        List<SnmpManualScanResponse.SnmpResult> results = new ArrayList<>();
        List<? extends VariableBinding> variableBindings = responsePdu.getVariableBindings();

        for (VariableBinding vb : variableBindings) {
            String oid = vb.getOid().toString();
            Variable variable = vb.getVariable();

            try {
                if (variable instanceof Null) {
                    results.add(new SnmpManualScanResponse.SnmpResult(oid, "Valeur non disponible"));
                } else {
                    String value = variable.toString();
                    String type = getVariableTypeName(variable);
                    results.add(new SnmpManualScanResponse.SnmpResult(oid, value, type));
                }
            } catch (Exception e) {
                results.add(new SnmpManualScanResponse.SnmpResult(oid, "Erreur: " + e.getMessage()));
            }
        }

        return results;
    }

    private String getVariableTypeName(Variable variable) {
        int syntax = variable.getSyntax();
        
        switch (syntax) {
            case SMIConstants.SYNTAX_INTEGER:
                return "Integer";
            case SMIConstants.SYNTAX_OCTET_STRING:
                return "OctetString";
            case SMIConstants.SYNTAX_OBJECT_IDENTIFIER:
                return "ObjectIdentifier";
            case SMIConstants.SYNTAX_IPADDRESS:
                return "IpAddress";
            case SMIConstants.SYNTAX_COUNTER32:
                return "Counter32";
            case SMIConstants.SYNTAX_GAUGE32:
                return "Gauge32";
            case SMIConstants.SYNTAX_TIMETICKS:
                return "TimeTicks";
            case SMIConstants.SYNTAX_COUNTER64:
                return "Counter64";
            case SMIConstants.SYNTAX_UNSIGNED_INTEGER32:
                return "UnsignedInteger32";
            default:
                return "Unknown(" + syntax + ")";
        }
    }
}
