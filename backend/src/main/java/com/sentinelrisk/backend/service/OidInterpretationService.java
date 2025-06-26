package com.sentinelrisk.backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;

/**
 * Service pour l'interprétation des OIDs SNMP et de leurs valeurs
 */
@Service
public class OidInterpretationService {

    private static final Logger logger = LoggerFactory.getLogger(OidInterpretationService.class);

    // Base de données des OIDs couramment utilisés
    private static final Map<String, OidInfo> OID_DATABASE = new HashMap<>();
    
    static {
        // OIDs système de base
        OID_DATABASE.put("1.3.6.1.2.1.1.1.0", new OidInfo(
            "sysDescr", "Description du système", "system",
            "Description complète du système (OS, version, etc.)"
        ));
        
        OID_DATABASE.put("1.3.6.1.2.1.1.2.0", new OidInfo(
            "sysObjectID", "Identifiant d'objet système", "system",
            "Identifiant unique du type d'équipement"
        ));
        
        OID_DATABASE.put("1.3.6.1.2.1.1.3.0", new OidInfo(
            "sysUpTime", "Temps de fonctionnement", "system",
            "Durée depuis le dernier redémarrage (en centièmes de seconde)"
        ));
        
        OID_DATABASE.put("1.3.6.1.2.1.1.4.0", new OidInfo(
            "sysContact", "Contact système", "system",
            "Personne responsable de cet équipement"
        ));
        
        OID_DATABASE.put("1.3.6.1.2.1.1.5.0", new OidInfo(
            "sysName", "Nom du système", "system",
            "Nom d'hôte ou identification de l'équipement"
        ));
        
        OID_DATABASE.put("1.3.6.1.2.1.1.6.0", new OidInfo(
            "sysLocation", "Localisation du système", "system",
            "Emplacement physique de l'équipement"
        ));

        // OIDs CPU et performance
        OID_DATABASE.put("1.3.6.1.4.1.2021.11.9.0", new OidInfo(
            "ssCpuUser", "CPU utilisateur", "performance",
            "Pourcentage d'utilisation CPU en mode utilisateur"
        ));
        
        OID_DATABASE.put("1.3.6.1.4.1.2021.11.10.0", new OidInfo(
            "ssCpuSystem", "CPU système", "performance",
            "Pourcentage d'utilisation CPU en mode système"
        ));
        
        OID_DATABASE.put("1.3.6.1.4.1.2021.11.11.0", new OidInfo(
            "ssCpuIdle", "CPU inactif", "performance",
            "Pourcentage de temps CPU inactif"
        ));

        // OIDs mémoire
        OID_DATABASE.put("1.3.6.1.4.1.2021.4.5.0", new OidInfo(
            "memTotalReal", "Mémoire totale", "memory",
            "Quantité totale de mémoire physique (en kB)"
        ));
        
        OID_DATABASE.put("1.3.6.1.4.1.2021.4.6.0", new OidInfo(
            "memAvailReal", "Mémoire disponible", "memory",
            "Quantité de mémoire physique disponible (en kB)"
        ));
        
        OID_DATABASE.put("1.3.6.1.4.1.2021.4.11.0", new OidInfo(
            "memTotalSwap", "Swap total", "memory",
            "Taille totale de l'espace de swap (en kB)"
        ));
        
        OID_DATABASE.put("1.3.6.1.4.1.2021.4.12.0", new OidInfo(
            "memAvailSwap", "Swap disponible", "memory",
            "Espace de swap disponible (en kB)"
        ));

        // OIDs réseau
        OID_DATABASE.put("1.3.6.1.2.1.2.1.0", new OidInfo(
            "ifNumber", "Nombre d'interfaces", "network",
            "Nombre total d'interfaces réseau"
        ));
        
        // OIDs stockage
        OID_DATABASE.put("1.3.6.1.4.1.2021.9.1.2", new OidInfo(
            "dskPath", "Chemin du disque", "storage",
            "Point de montage ou chemin du système de fichiers"
        ));
        
        OID_DATABASE.put("1.3.6.1.4.1.2021.9.1.6", new OidInfo(
            "dskTotal", "Taille totale du disque", "storage",
            "Taille totale du système de fichiers (en kB)"
        ));
        
        OID_DATABASE.put("1.3.6.1.4.1.2021.9.1.7", new OidInfo(
            "dskAvail", "Espace disque disponible", "storage",
            "Espace disponible sur le système de fichiers (en kB)"
        ));
        
        OID_DATABASE.put("1.3.6.1.4.1.2021.9.1.8", new OidInfo(
            "dskUsed", "Espace disque utilisé", "storage",
            "Espace utilisé sur le système de fichiers (en kB)"
        ));
        
        OID_DATABASE.put("1.3.6.1.4.1.2021.9.1.9", new OidInfo(
            "dskPercent", "Pourcentage d'utilisation", "storage",
            "Pourcentage d'utilisation du système de fichiers"
        ));

        // OIDs charge système
        OID_DATABASE.put("1.3.6.1.4.1.2021.10.1.3.1", new OidInfo(
            "laLoad1", "Charge 1 minute", "performance",
            "Charge moyenne du système sur 1 minute"
        ));
        
        OID_DATABASE.put("1.3.6.1.4.1.2021.10.1.3.2", new OidInfo(
            "laLoad5", "Charge 5 minutes", "performance",
            "Charge moyenne du système sur 5 minutes"
        ));
        
        OID_DATABASE.put("1.3.6.1.4.1.2021.10.1.3.3", new OidInfo(
            "laLoad15", "Charge 15 minutes", "performance",
            "Charge moyenne du système sur 15 minutes"
        ));
    }

    /**
     * Récupère les informations d'un OID
     */
    public OidInfo getOidInfo(String oid) {
        // Recherche exacte d'abord
        OidInfo info = OID_DATABASE.get(oid);
        if (info != null) {
            return info;
        }

        // Recherche par préfixe pour les OIDs avec index
        for (Map.Entry<String, OidInfo> entry : OID_DATABASE.entrySet()) {
            if (oid.startsWith(entry.getKey()) && isIndexedOid(oid, entry.getKey())) {
                OidInfo baseInfo = entry.getValue();
                return new OidInfo(
                    baseInfo.getName() + "[" + extractIndex(oid, entry.getKey()) + "]",
                    baseInfo.getDescription(),
                    baseInfo.getCategory(),
                    baseInfo.getFullDescription() + " (instance " + extractIndex(oid, entry.getKey()) + ")"
                );
            }
        }

        // OID inconnu - générer des informations par défaut
        return generateDefaultOidInfo(oid);
    }

    /**
     * Interprète la valeur d'un OID selon son type et contexte
     */
    public InterpretationResult interpretValue(String oid, String value, String snmpType) {
        logger.debug("🔍 Interprétation de l'OID {} - Valeur: {} (Type: {})", oid, value, snmpType);

        OidInfo oidInfo = getOidInfo(oid);
        String formattedValue = value;
        String interpretation = "";
        String status = "NORMAL";

        // Vérifier si la valeur est vide ou null
        if (value == null || value.trim().isEmpty()) {
            formattedValue = "N/A";
            interpretation = "Aucune valeur reçue – instance inexistante ou réponse SNMP absente";
            status = "UNAVAILABLE";
            return new InterpretationResult(formattedValue, interpretation, status);
        }

        try {
            // Interprétation spécifique selon l'OID
            if (oid.equals("1.3.6.1.2.1.1.3.0")) {
                // sysUpTime - conversion en format lisible
                if (value.matches("\\d+")) {
                    long ticks = Long.parseLong(value);
                    long seconds = ticks / 100;
                    formattedValue = formatUptime(seconds);
                    interpretation = "Système démarré depuis " + formattedValue;
                } else {
                    // Valeur déjà formatée (ex: "16 days, 7:08:55.72") - conserver la valeur brute
                    formattedValue = value; // Afficher exactement la valeur reçue
                    interpretation = "Temps de fonctionnement (valeur formatée) : " + value;
                    status = "NORMAL"; // Marquer comme normal puisqu'on a une valeur valide
                }
                
            } else if (oid.contains("Cpu") || oid.contains("Load")) {
                // Métriques CPU et charge
                if (value.matches("\\d+(\\.\\d+)?")) {
                    double cpuValue = Double.parseDouble(value);
                    formattedValue = String.format("%.1f%%", cpuValue);
                    
                    if (cpuValue > 90) {
                        status = "CRITICAL";
                        interpretation = "Utilisation CPU critique";
                    } else if (cpuValue > 70) {
                        status = "WARNING";
                        interpretation = "Utilisation CPU élevée";
                    } else {
                        interpretation = "Utilisation CPU normale";
                    }
                }
                
            } else if (oid.contains("mem") || oid.contains("Mem")) {
                // Métriques mémoire
                if (value.matches("\\d+")) {
                    long memValue = Long.parseLong(value);
                    formattedValue = formatBytes(memValue * 1024); // Conversion kB vers bytes
                    interpretation = "Mémoire: " + formattedValue;
                }
                
            } else if (oid.contains("dsk") || oid.contains("Disk")) {
                // Métriques disque
                if (oid.contains("Percent") && value.matches("\\d+")) {
                    int diskPercent = Integer.parseInt(value);
                    formattedValue = diskPercent + "%";
                    
                    if (diskPercent > 95) {
                        status = "CRITICAL";
                        interpretation = "Disque presque plein";
                    } else if (diskPercent > 85) {
                        status = "WARNING";
                        interpretation = "Espace disque faible";
                    } else {
                        interpretation = "Espace disque normal";
                    }
                } else if (value.matches("\\d+")) {
                    long diskValue = Long.parseLong(value);
                    formattedValue = formatBytes(diskValue * 1024); // Conversion kB vers bytes
                    interpretation = "Stockage: " + formattedValue;
                }
                
            } else if ("TimeTicks".equals(snmpType)) {
                // Conversion générique des TimeTicks
                if (value.matches("\\d+")) {
                    long ticks = Long.parseLong(value);
                    long seconds = ticks / 100;
                    formattedValue = formatUptime(seconds);
                    interpretation = "Durée: " + formattedValue;
                } else {
                    // Valeur TimeTicks déjà formatée ou non numérique - conserver la valeur brute
                    formattedValue = value; // Afficher exactement la valeur reçue
                    interpretation = "Durée (valeur formatée) : " + value;
                    status = "NORMAL"; // Marquer comme normal puisqu'on a une valeur valide
                }
                
            } else if ("IpAddress".equals(snmpType)) {
                // Validation et formatage d'adresses IP
                if (isValidIpAddress(value)) {
                    interpretation = "Adresse IP valide";
                } else {
                    status = "WARNING";
                    interpretation = "Format d'adresse IP invalide";
                }
                
            } else if ("Counter32".equals(snmpType) || "Counter64".equals(snmpType)) {
                // Formatage des compteurs
                if (value.matches("\\d+")) {
                    long counter = Long.parseLong(value);
                    formattedValue = String.format("%,d", counter);
                    interpretation = "Compteur: " + formattedValue;
                }
            }

            // Si aucune interprétation spécifique, utiliser une description générique
            if (interpretation.isEmpty()) {
                interpretation = oidInfo.getCategory().toUpperCase() + " - " + oidInfo.getDescription();
            }

        } catch (Exception e) {
            logger.warn("Erreur lors de l'interprétation de l'OID {} : {}", oid, e.getMessage());
            
            // Si on a une valeur, l'afficher telle quelle - sinon marquer comme indisponible
            if (value != null && !value.trim().isEmpty()) {
                formattedValue = value; // Conserver la valeur brute exactement comme reçue
                interpretation = oidInfo.getDescription() + " : " + value;
                status = "NORMAL"; // Valeur reçue et affichable
            } else {
                formattedValue = "N/A";
                interpretation = "Aucune valeur reçue – instance inexistante ou réponse SNMP absente";
                status = "UNAVAILABLE";
            }
            
            logger.debug("🔍 Valeur pour OID {} : {} (status: {})", oid, value, status);
        }

        return new InterpretationResult(formattedValue, interpretation, status);
    }

    // === MÉTHODES UTILITAIRES ===

    private boolean isIndexedOid(String oid, String baseOid) {
        return oid.length() > baseOid.length() && oid.charAt(baseOid.length()) == '.';
    }

    private String extractIndex(String oid, String baseOid) {
        if (oid.length() > baseOid.length() + 1) {
            return oid.substring(baseOid.length() + 1);
        }
        return "";
    }

    private OidInfo generateDefaultOidInfo(String oid) {
        String category = "general";
        String name = "OID " + oid;
        String description = "Valeur SNMP";
        
        // Tentative de catégorisation basique
        if (oid.startsWith("1.3.6.1.2.1.1")) {
            category = "system";
            description = "Information système";
        } else if (oid.startsWith("1.3.6.1.2.1.2")) {
            category = "network";
            description = "Interface réseau";
        } else if (oid.startsWith("1.3.6.1.4.1.2021")) {
            category = "performance";
            description = "Métrique de performance";
        }
        
        return new OidInfo(name, description, category, "OID personnalisé: " + oid);
    }

    private String formatUptime(long seconds) {
        long days = seconds / (24 * 3600);
        long hours = (seconds % (24 * 3600)) / 3600;
        long minutes = (seconds % 3600) / 60;
        long secs = seconds % 60;

        if (days > 0) {
            return String.format("%d jours, %02d:%02d:%02d", days, hours, minutes, secs);
        } else {
            return String.format("%02d:%02d:%02d", hours, minutes, secs);
        }
    }

    private String formatBytes(long bytes) {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return String.format("%.1f KB", bytes / 1024.0);
        if (bytes < 1024 * 1024 * 1024) return String.format("%.1f MB", bytes / (1024.0 * 1024));
        return String.format("%.1f GB", bytes / (1024.0 * 1024 * 1024));
    }

    private boolean isValidIpAddress(String ip) {
        String[] parts = ip.split("\\.");
        if (parts.length != 4) return false;
        
        try {
            for (String part : parts) {
                int num = Integer.parseInt(part);
                if (num < 0 || num > 255) return false;
            }
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    // === CLASSES INTERNES ===

    /**
     * Informations sur un OID
     */
    public static class OidInfo {
        private final String name;
        private final String description;
        private final String category;
        private final String fullDescription;

        public OidInfo(String name, String description, String category, String fullDescription) {
            this.name = name;
            this.description = description;
            this.category = category;
            this.fullDescription = fullDescription;
        }

        public String getName() { return name; }
        public String getDescription() { return description; }
        public String getCategory() { return category; }
        public String getFullDescription() { return fullDescription; }
    }

    /**
     * Résultat d'interprétation d'une valeur
     */
    public static class InterpretationResult {
        private final String formattedValue;
        private final String interpretation;
        private final String status;

        public InterpretationResult(String formattedValue, String interpretation, String status) {
            this.formattedValue = formattedValue;
            this.interpretation = interpretation;
            this.status = status;
        }

        public String getFormattedValue() { return formattedValue; }
        public String getInterpretation() { return interpretation; }
        public String getStatus() { return status; }
    }
} 