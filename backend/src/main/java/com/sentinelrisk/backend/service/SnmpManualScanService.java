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

/**
 * Service pour effectuer des scans SNMP manuels
 */
@Service
public class SnmpManualScanService {

    private static final Logger logger = LoggerFactory.getLogger(SnmpManualScanService.class);

    /**
     * Effectue un scan SNMP manuel sur les OIDs spécifiés
     */
    public SnmpManualScanResponse performManualScan(SnmpManualScanRequest request) {
        logger.info("🔍 Début du scan SNMP manuel pour {}:{}", request.getIp(), request.getPort());
        logger.debug("Paramètres du scan: {}", request);

        long startTime = System.currentTimeMillis();
        SnmpManualScanResponse response = new SnmpManualScanResponse(false, request.getIp(), request.getPort());

        Snmp snmp = null;
        try {
            // Configuration du transport SNMP
            TransportMapping<?> transport = new DefaultUdpTransportMapping();
            snmp = new Snmp(transport);
            transport.listen();

            // Configuration de la cible
            Target target = createTarget(request);
            
            // Création de la PDU
            PDU pdu = createPDU(request.getOids());

            logger.debug("Envoi de la requête SNMP vers {}:{} avec {} OIDs", 
                        request.getIp(), request.getPort(), request.getOids().size());

            // Envoi de la requête
            ResponseEvent responseEvent = snmp.send(pdu, target);
            
            if (responseEvent != null && responseEvent.getResponse() != null) {
                PDU responsePdu = responseEvent.getResponse();
                
                if (responsePdu.getErrorStatus() == PDU.noError) {
                    // Traitement des résultats
                    List<SnmpManualScanResponse.SnmpResult> results = processResults(responsePdu);
                    response.setResults(results);
                    response.setSuccess(true);
                    
                    logger.info("✅ Scan SNMP réussi pour {}:{} - {} résultats obtenus", 
                               request.getIp(), request.getPort(), results.size());
                } else {
                    String errorMsg = String.format("Erreur SNMP [%d]: %s", 
                                                   responsePdu.getErrorStatus(), 
                                                   responsePdu.getErrorStatusText());
                    response.setError(errorMsg);
                    logger.warn("⚠️ Erreur SNMP pour {}:{}: {}", request.getIp(), request.getPort(), errorMsg);
                }
            } else {
                String errorMsg = "Timeout ou pas de réponse de l'équipement";
                response.setError(errorMsg);
                logger.warn("⚠️ Pas de réponse SNMP de {}:{}: {}", request.getIp(), request.getPort(), errorMsg);
            }

        } catch (IOException e) {
            String errorMsg = "Erreur de communication SNMP: " + e.getMessage();
            response.setError(errorMsg);
            logger.error("❌ Erreur de communication SNMP avec {}:{}: {}", 
                        request.getIp(), request.getPort(), e.getMessage(), e);
        } catch (Exception e) {
            String errorMsg = "Erreur inattendue lors du scan SNMP: " + e.getMessage();
            response.setError(errorMsg);
            logger.error("❌ Erreur inattendue lors du scan SNMP de {}:{}: {}", 
                        request.getIp(), request.getPort(), e.getMessage(), e);
        } finally {
            // Nettoyage des ressources
            if (snmp != null) {
                try {
                    snmp.close();
                } catch (IOException e) {
                    logger.warn("Erreur lors de la fermeture de la session SNMP: {}", e.getMessage());
                }
            }
        }

        long duration = System.currentTimeMillis() - startTime;
        response.setDuration(duration);
        
        logger.info("🏁 Fin du scan SNMP pour {}:{} - Durée: {}ms - Succès: {}", 
                   request.getIp(), request.getPort(), duration, response.isSuccess());

        return response;
    }

    /**
     * Crée la cible SNMP à partir de la requête
     */
    private Target createTarget(SnmpManualScanRequest request) {
        Address targetAddress = GenericAddress.parse("udp:" + request.getIp() + "/" + request.getPort());
        
        CommunityTarget target = new CommunityTarget();
        target.setCommunity(new OctetString(request.getCommunity()));
        target.setAddress(targetAddress);
        target.setRetries(request.getRetries());
        target.setTimeout(request.getTimeout());
        
        // Configuration de la version SNMP
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
                logger.warn("Version SNMP non reconnue '{}', utilisation de v2c par défaut", request.getVersion());
                target.setVersion(SnmpConstants.version2c);
        }

        logger.debug("Cible SNMP créée: {}:{} v{} communauté={} timeout={}ms retries={}", 
                    request.getIp(), request.getPort(), request.getVersion(), 
                    request.getCommunity(), request.getTimeout(), request.getRetries());

        return target;
    }

    /**
     * Crée la PDU avec les OIDs à interroger
     */
    private PDU createPDU(List<String> oids) {
        PDU pdu = new PDU();
        pdu.setType(PDU.GET);

        for (String oidStr : oids) {
            try {
                OID oid = new OID(oidStr);
                pdu.add(new VariableBinding(oid));
                logger.debug("OID ajouté à la PDU: {}", oidStr);
            } catch (Exception e) {
                logger.warn("OID invalide ignoré '{}': {}", oidStr, e.getMessage());
            }
        }

        return pdu;
    }

    /**
     * Traite les résultats de la réponse SNMP
     */
    private List<SnmpManualScanResponse.SnmpResult> processResults(PDU responsePdu) {
        List<SnmpManualScanResponse.SnmpResult> results = new ArrayList<>();
        List<? extends VariableBinding> variableBindings = responsePdu.getVariableBindings();

        logger.debug("Traitement de {} résultats SNMP", variableBindings.size());

        for (VariableBinding vb : variableBindings) {
            String oid = vb.getOid().toString();
            Variable variable = vb.getVariable();

            try {
                if (variable instanceof Null) {
                    // Variable de type Null - objet ou instance inexistant
                    String variableStr = variable.toString();
                    if (variableStr.contains("noSuchObject")) {
                        results.add(new SnmpManualScanResponse.SnmpResult(oid, "Objet inexistant"));
                        logger.debug("OID {} - Objet inexistant", oid);
                    } else if (variableStr.contains("noSuchInstance")) {
                        results.add(new SnmpManualScanResponse.SnmpResult(oid, "Instance inexistante"));
                        logger.debug("OID {} - Instance inexistante", oid);
                    } else {
                        results.add(new SnmpManualScanResponse.SnmpResult(oid, "Aucune valeur disponible"));
                        logger.debug("OID {} - Aucune valeur", oid);
                    }
                } else {
                    // Valeur valide
                    String value = variable.toString();
                    String type = getVariableTypeName(variable);
                    results.add(new SnmpManualScanResponse.SnmpResult(oid, value, type));
                    logger.debug("OID {} - Valeur: {} (Type: {})", oid, value, type);
                }
            } catch (Exception e) {
                results.add(new SnmpManualScanResponse.SnmpResult(oid, "Erreur de traitement: " + e.getMessage()));
                logger.warn("Erreur lors du traitement de l'OID {}: {}", oid, e.getMessage());
            }
        }

        return results;
    }

    /**
     * Obtient le nom du type de variable SNMP
     */
    private String getVariableTypeName(Variable variable) {
        int syntax = variable.getSyntax();
        
        if (syntax == SMIConstants.SYNTAX_INTEGER) {
            return "Integer";
        } else if (syntax == SMIConstants.SYNTAX_OCTET_STRING) {
            return "OctetString";
        } else if (syntax == SMIConstants.SYNTAX_OBJECT_IDENTIFIER) {
            return "ObjectIdentifier";
        } else if (syntax == SMIConstants.SYNTAX_IPADDRESS) {
            return "IpAddress";
        } else if (syntax == SMIConstants.SYNTAX_COUNTER32) {
            return "Counter32";
        } else if (syntax == SMIConstants.SYNTAX_GAUGE32) {
            return "Gauge32";
        } else if (syntax == SMIConstants.SYNTAX_TIMETICKS) {
            return "TimeTicks";
        } else if (syntax == SMIConstants.SYNTAX_COUNTER64) {
            return "Counter64";
        } else if (syntax == SMIConstants.SYNTAX_UNSIGNED_INTEGER32) {
            return "UnsignedInteger32";
        } else {
            return "Unknown(" + syntax + ")";
        }
    }
} 