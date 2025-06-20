package com.sentinelrisk.client;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.sentinelrisk.backend.model.SnmpScanConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;
import java.time.Instant;
import java.util.concurrent.atomic.AtomicInteger;

import com.fasterxml.jackson.core.JsonProcessingException;

@Component
public class ZabbixClient {
    private static final Logger logger = LoggerFactory.getLogger(ZabbixClient.class);
    private static final String JSON_RPC_VERSION = "2.0";
    private static final String API_ENDPOINT = "/api_jsonrpc.php";

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private final String zabbixUrl;
    private final String username;
    private final String password;
    private final long timeoutMs;
    private final int maxRetryAttempts;
    
    private String authToken;
    private Instant tokenExpiry;
    private final AtomicInteger requestId = new AtomicInteger(1);

    public ZabbixClient(
            RestTemplate restTemplate,
            ObjectMapper objectMapper,
            @Value("${zabbix.url}") String zabbixUrl,
            @Value("${zabbix.username}") String username,
            @Value("${zabbix.password}") String password,
            @Value("${zabbix.timeout:30000}") long timeoutMs,
            @Value("${zabbix.retry-attempts:3}") int maxRetryAttempts) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
        this.zabbixUrl = zabbixUrl + API_ENDPOINT;
        this.username = username;
        this.password = password;
        this.timeoutMs = timeoutMs;
        this.maxRetryAttempts = maxRetryAttempts;
        
        logger.info("Client Zabbix initialisé - URL: {}, Timeout: {}ms, Tentatives max: {}", 
                   zabbixUrl, timeoutMs, maxRetryAttempts);
    }

    /**
     * Authentification auprès de l'API Zabbix
     */
    public void login() {
        logger.info("Authentification auprès de l'API Zabbix");
        
        ObjectNode request = objectMapper.createObjectNode()
                .put("jsonrpc", JSON_RPC_VERSION)
                .put("method", "user.login")
                .put("id", requestId.getAndIncrement());

        ObjectNode params = request.putObject("params")
                .put("username", username)
                .put("password", password);

        try {
            JsonNode response = sendRequestWithRetry(request);
            
            if (response.has("result")) {
                this.authToken = response.get("result").asText();
                this.tokenExpiry = Instant.now().plus(Duration.ofHours(1)); // Token valide 1h
                logger.info("Authentification réussie auprès de l'API Zabbix");
            } else {
                throw new RuntimeException("Échec de l'authentification - pas de token reçu");
            }
            
        } catch (Exception e) {
            logger.error("Erreur lors de l'authentification Zabbix: {}", e.getMessage(), e);
            throw new RuntimeException("Impossible de s'authentifier auprès de Zabbix", e);
        }
    }

    /**
     * Récupère tous les hôtes depuis Zabbix
     */
    public JsonNode getHosts() {
        logger.debug("Récupération des hôtes depuis Zabbix");
        
        ObjectNode request = createAuthenticatedRequest("host.get");
        ObjectNode params = request.putObject("params");
        params.putArray("output").add("hostid").add("host").add("name").add("status").add("available");
        params.putArray("selectInterfaces").add("interfaceid").add("type").add("ip").add("port");

        try {
            JsonNode response = sendRequestWithRetry(request);
            logger.info("Récupéré {} hôtes depuis Zabbix", 
                       response.has("result") ? response.get("result").size() : 0);
            return response;
            
        } catch (Exception e) {
            logger.error("Erreur lors de la récupération des hôtes: {}", e.getMessage(), e);
            throw new RuntimeException("Impossible de récupérer les hôtes depuis Zabbix", e);
        }
    }

    /**
     * Récupère les items d'un hôte spécifique
     */
    public JsonNode getItemsByHost(String hostId) {
        logger.debug("Récupération des items pour l'hôte: {}", hostId);
        
        ObjectNode request = createAuthenticatedRequest("item.get");
        ObjectNode params = request.putObject("params");
        params.putArray("output").add("itemid").add("name").add("key_").add("lastvalue").add("status").add("value_type");
        params.putArray("hostids").add(hostId);
        params.put("monitored", true);

        try {
            JsonNode response = sendRequestWithRetry(request);
            int itemCount = response.has("result") ? response.get("result").size() : 0;
            logger.debug("Récupéré {} items pour l'hôte {}", itemCount, hostId);
            return response;
            
        } catch (Exception e) {
            logger.error("Erreur lors de la récupération des items pour l'hôte {}: {}", hostId, e.getMessage(), e);
            throw new RuntimeException("Impossible de récupérer les items de l'hôte " + hostId, e);
        }
    }

    /**
     * Récupère l'historique d'un item
     */
    public JsonNode getHistory(String itemId, long timeFrom, long timeTill) {
        logger.debug("Récupération de l'historique pour l'item: {} de {} à {}", itemId, timeFrom, timeTill);
        
        ObjectNode request = createAuthenticatedRequest("history.get");
        ObjectNode params = request.putObject("params");
        params.put("output", "extend")
                .put("history", 0) // Type numérique
                .putArray("itemids").add(itemId);
        
        if (timeFrom > 0) params.put("time_from", timeFrom);
        if (timeTill > 0) params.put("time_till", timeTill);
        
        params.put("sortfield", "clock")
                .put("sortorder", "DESC")
                .put("limit", 1000); // Limiter à 1000 points

        try {
            JsonNode response = sendRequestWithRetry(request);
            int historyCount = response.has("result") ? response.get("result").size() : 0;
            logger.debug("Récupéré {} points d'historique pour l'item {}", historyCount, itemId);
            return response;
            
        } catch (Exception e) {
            logger.error("Erreur lors de la récupération de l'historique pour l'item {}: {}", itemId, e.getMessage(), e);
            throw new RuntimeException("Impossible de récupérer l'historique de l'item " + itemId, e);
        }
    }

    /**
     * Lance un scan SNMP en créant un item dans Zabbix
     */
    public JsonNode runScan(String hostId, SnmpScanConfig config) {
        logger.info("Lancement d'un scan SNMP pour l'hôte {} avec la config {}", hostId, config.getName());
        
        // D'abord, récupérer l'interface SNMP de l'hôte
        String interfaceId = getSnmpInterfaceId(hostId);
        if (interfaceId == null) {
            throw new RuntimeException("Aucune interface SNMP trouvée pour l'hôte " + hostId);
        }
        
        ObjectNode request = createAuthenticatedRequest("item.create");
        ObjectNode params = request.putObject("params");
        
        // Créer un nouvel item SNMP dans Zabbix
        params.put("name", config.getName() + " - " + System.currentTimeMillis())
             .put("key_", "snmp.get[" + config.getOid() + "]")
             .put("hostid", hostId)
             .put("type", 4) // Type SNMP v2
             .put("value_type", 3) // Numérique (float)
             .put("interfaceid", interfaceId)
             .put("delay", config.getInterval().toString() + "s")
             .put("status", 0); // Activé

        try {
            JsonNode response = sendRequestWithRetry(request);
            logger.info("Scan SNMP lancé avec succès pour l'hôte {}", hostId);
            return response;
            
        } catch (Exception e) {
            logger.error("Erreur lors du lancement du scan SNMP pour l'hôte {}: {}", hostId, e.getMessage(), e);
            throw new RuntimeException("Impossible de lancer le scan SNMP pour l'hôte " + hostId, e);
        }
    }

    /**
     * Récupère l'ID de l'interface SNMP d'un hôte
     */
    private String getSnmpInterfaceId(String hostId) {
        logger.debug("Récupération de l'interface SNMP pour l'hôte {}", hostId);
        
        ObjectNode request = createAuthenticatedRequest("hostinterface.get");
        ObjectNode params = request.putObject("params");
        params.putArray("output").add("interfaceid").add("type").add("ip").add("port");
        params.putArray("hostids").add(hostId);
        
        ObjectNode filter = params.putObject("filter");
        filter.put("type", 2); // Type SNMP

        try {
            JsonNode response = sendRequestWithRetry(request);
            
            if (response.has("result") && response.get("result").size() > 0) {
                String interfaceId = response.get("result").get(0).get("interfaceid").asText();
                logger.debug("Interface SNMP trouvée: {} pour l'hôte {}", interfaceId, hostId);
                return interfaceId;
            } else {
                logger.warn("Aucune interface SNMP trouvée pour l'hôte {}", hostId);
                return null;
            }
            
        } catch (Exception e) {
            logger.error("Erreur lors de la récupération de l'interface SNMP pour l'hôte {}: {}", hostId, e.getMessage(), e);
            return null;
        }
    }

    /**
     * Crée une requête authentifiée
     */
    private ObjectNode createAuthenticatedRequest(String method) {
        // Vérifier si le token est encore valide
        if (authToken == null || (tokenExpiry != null && Instant.now().isAfter(tokenExpiry))) {
            logger.debug("Token expiré ou manquant, nouvelle authentification");
            login();
        }

        // Depuis Zabbix 7.2.1, on utilise l'Authorization header au lieu du paramètre auth
        return objectMapper.createObjectNode()
                .put("jsonrpc", JSON_RPC_VERSION)
                .put("method", method)
                .put("id", requestId.getAndIncrement());
    }

    /**
     * Envoie une requête avec gestion des tentatives
     */
    private JsonNode sendRequestWithRetry(ObjectNode request) {
        Exception lastException = null;
        
        for (int attempt = 1; attempt <= maxRetryAttempts; attempt++) {
            try {
                logger.debug("Tentative {}/{} pour la requête {}", attempt, maxRetryAttempts, request.get("method"));
                
                Instant startTime = Instant.now();
                JsonNode response = sendRequest(request);
                long responseTime = Duration.between(startTime, Instant.now()).toMillis();
                
                logger.debug("Requête {} réussie en {}ms", request.get("method"), responseTime);
                return response;
                
            } catch (Exception e) {
                lastException = e;
                logger.warn("Tentative {}/{} échouée pour la requête {}: {}", 
                           attempt, maxRetryAttempts, request.get("method"), e.getMessage());
                
                if (attempt < maxRetryAttempts) {
                    try {
                        // Délai exponentiel entre les tentatives
                        long delay = (long) Math.pow(2, attempt) * 1000;
                        logger.debug("Attente de {}ms avant la prochaine tentative", delay);
                        Thread.sleep(delay);
                    } catch (InterruptedException ie) {
                        Thread.currentThread().interrupt();
                        throw new RuntimeException("Interruption lors de l'attente entre tentatives", ie);
                    }
                }
            }
        }
        
        logger.error("Toutes les tentatives ont échoué pour la requête {}", request.get("method"));
        throw new RuntimeException("Impossible de récupérer les hôtes depuis Zabbix", lastException);
    }

    /**
     * Envoie une requête HTTP vers l'API Zabbix
     */
    private JsonNode sendRequest(ObjectNode request) {
        try {
            String url = zabbixUrl; // L'URL contient déjà API_ENDPOINT depuis le constructeur
            logger.debug("Envoi requête vers: {} - Méthode: {}", url, request.get("method"));
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            // Ajouter l'Authorization header si on a un token
            if (authToken != null && !request.get("method").asText().equals("user.login")) {
                headers.set("Authorization", "Bearer " + authToken);
                logger.debug("Authorization header ajouté avec token");
            }
            
            HttpEntity<String> entity = new HttpEntity<>(request.toString(), headers);
            
            ResponseEntity<String> responseEntity = restTemplate.exchange(
                url, 
                HttpMethod.POST, 
                entity, 
                String.class
            );
            
            String responseBody = responseEntity.getBody();
            logger.debug("Réponse reçue: {}", responseBody);
            
            if (responseBody == null || responseBody.trim().isEmpty()) {
                throw new RuntimeException("Réponse vide de Zabbix");
            }
            
            JsonNode response = objectMapper.readTree(responseBody);
            
            // Vérifier les erreurs dans la réponse
            if (response.has("error")) {
                JsonNode error = response.get("error");
                String errorMessage = String.format("Erreur API Zabbix [%s]: \"%s\"", 
                                                   error.get("code"), 
                                                   error.get("message"));
                if (error.has("data")) {
                    errorMessage += " - " + error.get("data").asText();
                }
                throw new RuntimeException(errorMessage);
            }
            
            return response;
            
        } catch (JsonProcessingException e) {
            logger.error("Erreur lors du traitement JSON: {}", e.getMessage(), e);
            throw new RuntimeException("Erreur lors du traitement de la réponse Zabbix", e);
        } catch (Exception e) {
            logger.error("Erreur de communication avec Zabbix: {}", e.getMessage(), e);
            throw new RuntimeException("Erreur de communication avec Zabbix", e);
        }
    }

    /**
     * Teste la connexion à Zabbix
     */
    public boolean testConnection() {
        try {
            login();
            JsonNode response = getHosts();
            return response != null && response.has("result");
        } catch (Exception e) {
            logger.error("Test de connexion Zabbix échoué: {}", e.getMessage());
            return false;
        }
    }

    /**
     * Invalide le token d'authentification
     */
    public void logout() {
        if (authToken != null) {
            try {
                ObjectNode request = createAuthenticatedRequest("user.logout");
                sendRequest(request);
                logger.info("Déconnexion de l'API Zabbix réussie");
            } catch (Exception e) {
                logger.warn("Erreur lors de la déconnexion Zabbix: {}", e.getMessage());
            } finally {
                authToken = null;
                tokenExpiry = null;
            }
        }
    }

    /**
     * Récupère un hôte spécifique par son ID
     */
    public JsonNode getHostById(String hostId) {
        logger.debug("Récupération de l'hôte par ID: {}", hostId);
        
        ObjectNode request = createAuthenticatedRequest("host.get");
        ObjectNode params = request.putObject("params");
        params.putArray("output").add("hostid").add("host").add("name").add("status").add("available");
        params.putArray("selectInterfaces").add("interfaceid").add("type").add("ip").add("port");
        params.putArray("hostids").add(hostId);

        try {
            JsonNode response = sendRequestWithRetry(request);
            logger.debug("Recherche de l'hôte {} : {}", hostId, 
                        response.has("result") && response.get("result").size() > 0 ? "trouvé" : "non trouvé");
            return response;
            
        } catch (Exception e) {
            logger.error("Erreur lors de la récupération de l'hôte {}: {}", hostId, e.getMessage(), e);
            throw new RuntimeException("Impossible de récupérer l'hôte " + hostId, e);
        }
    }

    /**
     * Trouve un hôte par son adresse IP
     */
    public JsonNode getHostByIP(String ipAddress) {
        logger.debug("Recherche d'hôte par IP: {}", ipAddress);
        
        ObjectNode request = createAuthenticatedRequest("host.get");
        ObjectNode params = request.putObject("params");
        params.putArray("output").add("hostid").add("host").add("name").add("status");
        params.putArray("selectInterfaces").add("interfaceid").add("type").add("ip").add("port");
        
        try {
            JsonNode response = sendRequestWithRetry(request);
            
            if (response.has("result") && response.get("result").isArray()) {
                // Filtrer les hôtes qui ont une interface avec l'IP recherchée
                for (JsonNode host : response.get("result")) {
                    if (host.has("interfaces") && host.get("interfaces").isArray()) {
                        for (JsonNode iface : host.get("interfaces")) {
                            if (iface.has("ip") && ipAddress.equals(iface.get("ip").asText())) {
                                // Créer une réponse avec seulement cet hôte
                                ObjectNode filteredResponse = objectMapper.createObjectNode();
                                filteredResponse.put("jsonrpc", JSON_RPC_VERSION);
                                filteredResponse.putArray("result").add(host);
                                
                                logger.debug("Hôte trouvé avec IP {}: {}", ipAddress, host.get("hostid").asText());
                                return filteredResponse;
                            }
                        }
                    }
                }
            }
            
            // Aucun hôte trouvé avec cette IP
            ObjectNode emptyResponse = objectMapper.createObjectNode();
            emptyResponse.put("jsonrpc", JSON_RPC_VERSION);
            emptyResponse.putArray("result");
            
            logger.debug("Aucun hôte trouvé avec l'IP: {}", ipAddress);
            return emptyResponse;
            
        } catch (Exception e) {
            logger.error("Erreur lors de la recherche d'hôte par IP {}: {}", ipAddress, e.getMessage(), e);
            throw new RuntimeException("Impossible de rechercher l'hôte par IP " + ipAddress + ": " + e.getMessage(), e);
        }
    }

    /**
     * Nettoie un nom d'hôte pour Zabbix en supprimant les caractères problématiques
     */
    private String sanitizeHostName(String hostName) {
        if (hostName == null) return null;
        
        // Remplacer les caractères spéciaux par des tirets
        String cleaned = hostName
                .replace("'", "-")  // apostrophes
                .replace("\"", "-") // guillemets
                .replace("\\", "-") // backslashes
                .replace("/", "-")  // slashes
                .replace(" ", "-")  // espaces
                .replace("à", "a").replace("á", "a").replace("â", "a").replace("ä", "a") // accents a
                .replace("è", "e").replace("é", "e").replace("ê", "e").replace("ë", "e") // accents e
                .replace("ì", "i").replace("í", "i").replace("î", "i").replace("ï", "i") // accents i
                .replace("ò", "o").replace("ó", "o").replace("ô", "o").replace("ö", "o") // accents o
                .replace("ù", "u").replace("ú", "u").replace("û", "u").replace("ü", "u") // accents u
                .replace("ç", "c").replace("ñ", "n") // autres caractères spéciaux
                .replaceAll("[^a-zA-Z0-9\\-_\\.]", "-") // supprimer tout autre caractère spécial
                .replaceAll("-+", "-") // remplacer les tirets multiples par un seul
                .replaceAll("^-+|-+$", ""); // supprimer les tirets en début/fin
        
        // S'assurer que le nom n'est pas vide et respecte les limites de Zabbix
        if (cleaned.isEmpty()) {
            cleaned = "host-" + System.currentTimeMillis();
        }
        
        // Limiter à 128 caractères (limite Zabbix)
        if (cleaned.length() > 128) {
            cleaned = cleaned.substring(0, 125) + "...";
        }
        
        logger.debug("Nom d'hôte nettoyé: '{}' -> '{}'", hostName, cleaned);
        return cleaned;
    }

    /**
     * Crée un nouvel hôte sur Zabbix
     */
    public JsonNode createHost(String hostName, String ipAddress, Integer snmpPort, String snmpCommunity) {
        logger.info("🔄 ZabbixClient.createHost() - Début création hôte: '{}' ({}:{})", hostName, ipAddress, snmpPort);
        
        // Nettoyer le nom d'hôte avant de l'utiliser
        String cleanedHostName = sanitizeHostName(hostName);
        logger.info("📝 Nom d'hôte nettoyé: '{}' -> '{}'", hostName, cleanedHostName);
        
        ObjectNode request = createAuthenticatedRequest("host.create");
        ObjectNode params = request.putObject("params");
        
        // Validation des paramètres d'entrée
        if (cleanedHostName == null || cleanedHostName.trim().isEmpty()) {
            throw new RuntimeException("Le nom d'hôte ne peut pas être vide");
        }
        if (ipAddress == null || ipAddress.trim().isEmpty()) {
            throw new RuntimeException("L'adresse IP ne peut pas être vide");
        }
        
        logger.info("📋 Validation des paramètres:");
        logger.info("   - hostName original: '{}' (longueur: {})", hostName, hostName.length());
        logger.info("   - hostName nettoyé: '{}' (longueur: {})", cleanedHostName, cleanedHostName.length());
        logger.info("   - ipAddress: '{}'", ipAddress);
        logger.info("   - snmpPort: {}", snmpPort);
        logger.info("   - snmpCommunity: '{}'", snmpCommunity);
        
        // Paramètres de l'hôte avec le nom nettoyé
        params.put("host", cleanedHostName)
              .put("name", cleanedHostName);
        
        // Ajouter aux groupes par défaut (groupe "Linux servers")
        params.putArray("groups").addObject().put("groupid", "2");
        
        // Créer l'interface SNMP
        ObjectNode snmpInterface = params.putArray("interfaces").addObject();
        snmpInterface.put("type", 2) // Type SNMP
                    .put("main", 1) // Interface principale
                    .put("useip", 1) // Utiliser IP
                    .put("ip", ipAddress)
                    .put("dns", "")
                    .put("port", snmpPort != null ? snmpPort.toString() : "161");
        
        // Détails SNMP
        ObjectNode snmpDetails = snmpInterface.putObject("details");
        snmpDetails.put("version", 2) // SNMP v2c
                  .put("community", snmpCommunity != null ? snmpCommunity : "public");

        // Log de la requête complète avant envoi
        logger.info("📤 Requête JSON-RPC complète envoyée à Zabbix:");
        logger.info("   - URL: {}", zabbixUrl);
        logger.info("   - Méthode: host.create");
        logger.info("   - Payload JSON: {}", request.toString());
        
        try {
            JsonNode response = sendRequestWithRetry(request);
            
            logger.info("📥 Réponse complète de Zabbix pour host.create:");
            logger.info("   - Status: SUCCESS");
            logger.info("   - Response: {}", response.toString());
            
            if (response.has("result") && response.get("result").has("hostids")) {
                String newHostId = response.get("result").get("hostids").get(0).asText();
                logger.info("✅ Hôte créé avec succès: '{}' -> ID {}", cleanedHostName, newHostId);
            } else {
                logger.error("❌ Réponse inattendue - pas de hostids dans le résultat:");
                logger.error("   - Has 'result': {}", response.has("result"));
                if (response.has("result")) {
                    logger.error("   - Result content: {}", response.get("result"));
                    logger.error("   - Has 'hostids': {}", response.get("result").has("hostids"));
                }
            }
            
            return response;
            
        } catch (Exception e) {
            logger.error("❌ Exception lors de l'appel host.create:");
            logger.error("   - Exception: {} - {}", e.getClass().getSimpleName(), e.getMessage());
            logger.error("   - Requête qui a échoué: {}", request.toString());
            
            // Log de la stacktrace complète pour debugging
            logger.error("   - Stacktrace complète:", e);
            
            if (e.getCause() != null) {
                logger.error("   - Cause racine: {} - {}", e.getCause().getClass().getSimpleName(), e.getCause().getMessage());
            }
            
            throw new RuntimeException("Impossible de créer l'hôte " + cleanedHostName + " (" + e.getClass().getSimpleName() + "): " + e.getMessage(), e);
        }
    }
} 