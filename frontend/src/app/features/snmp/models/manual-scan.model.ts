/**
 * Modèles pour l'API SNMP manuelle
 */

export interface SnmpManualScanRequest {
  ip: string;
  port: number;
  community: string;
  version: string;
  oids: string[];
  timeout: number;
  retries: number;
}

export interface SnmpResult {
  oid: string;
  value: string;
  type: string;
  success: boolean;
  error?: string;
}

export interface SnmpManualScanResponse {
  success: boolean;
  ip: string;
  port: number;
  results?: SnmpResult[];
  error?: string;
  timestamp: string;
  duration: number;
}

export interface ConnectivityTestRequest {
  ip: string;
  port?: number;
  community?: string;
  version?: string;
}

export interface ConnectivityTestResponse {
  success: boolean;
  ip: string;
  port: number;
  error?: string;
  timestamp: string;
  duration: number;
}

export const SNMP_VERSIONS = ['1', '2c', '3'] as const;
export type SnmpVersion = typeof SNMP_VERSIONS[number];

// OIDs par défaut (système de base)
export const DEFAULT_OIDS = [
  '1.3.6.1.2.1.1.1.0',  // sysDescr
  '1.3.6.1.2.1.1.3.0',  // sysUpTime
  '1.3.6.1.2.1.1.5.0',  // sysName
  '1.3.6.1.2.1.1.6.0',  // sysLocation
  '1.3.6.1.2.1.1.4.0',  // sysContact
];

// Interface pour les OIDs prédéfinis
export interface PredefinedOid {
  oid: string;
  name: string;
  description: string;
  category: OidCategory;
  unit?: string;
  interpretation?: string;
  criticalThreshold?: {
    min?: number;
    max?: number;
    operator: 'lt' | 'gt' | 'eq' | 'ne';
  };
  icon: string;
}

export type OidCategory = 'system' | 'memory' | 'cpu' | 'network' | 'storage' | 'process' | 'other';

// OIDs prédéfinis organisés par catégorie
export const PREDEFINED_OIDS: PredefinedOid[] = [
  // === SYSTÈME ===
  {
    oid: '1.3.6.1.2.1.1.1.0',
    name: 'Description du système',
    description: 'Description complète du système d\'exploitation et du matériel',
    category: 'system',
    icon: 'computer',
    interpretation: 'Informations système de base'
  },
  {
    oid: '1.3.6.1.2.1.1.3.0',
    name: 'Temps de fonctionnement',
    description: 'Durée depuis le dernier redémarrage du système',
    category: 'system',
    unit: 'jours',
    icon: 'schedule',
    interpretation: 'Uptime du système'
  },
  {
    oid: '1.3.6.1.2.1.1.5.0',
    name: 'Nom du système',
    description: 'Nom d\'hôte ou nom du périphérique réseau',
    category: 'system',
    icon: 'label',
    interpretation: 'Nom d\'identification'
  },
  {
    oid: '1.3.6.1.2.1.1.6.0',
    name: 'Localisation',
    description: 'Emplacement physique du périphérique',
    category: 'system',
    icon: 'location_on',
    interpretation: 'Localisation physique'
  },
  {
    oid: '1.3.6.1.2.1.1.4.0',
    name: 'Contact administrateur',
    description: 'Informations de contact de l\'administrateur système',
    category: 'system',
    icon: 'contact_phone',
    interpretation: 'Contact technique'
  },

  // === MÉMOIRE ===
  {
    oid: '1.3.6.1.4.1.2021.4.5.0',
    name: 'Mémoire RAM totale',
    description: 'Quantité totale de mémoire vive installée',
    category: 'memory',
    unit: 'MB',
    icon: 'memory',
    interpretation: 'Capacité mémoire totale'
  },
  {
    oid: '1.3.6.1.4.1.2021.4.6.0',
    name: 'Mémoire RAM disponible',
    description: 'Quantité de mémoire vive actuellement libre',
    category: 'memory',
    unit: 'MB',
    icon: 'memory',
    criticalThreshold: { min: 500, operator: 'lt' },
    interpretation: 'Mémoire libre (critique si < 500 MB)'
  },
  {
    oid: '1.3.6.1.4.1.2021.4.3.0',
    name: 'Mémoire SWAP totale',
    description: 'Taille totale de l\'espace d\'échange (fichier de pagination)',
    category: 'memory',
    unit: 'MB',
    icon: 'storage',
    interpretation: 'Espace SWAP total'
  },
  {
    oid: '1.3.6.1.4.1.2021.4.4.0',
    name: 'Mémoire SWAP disponible',
    description: 'Espace d\'échange actuellement libre',
    category: 'memory',
    unit: 'MB',
    icon: 'storage',
    interpretation: 'SWAP libre'
  },

  // === PROCESSEUR ===
  {
    oid: '1.3.6.1.4.1.2021.11.9.0',
    name: 'CPU inactif (%)',
    description: 'Pourcentage de temps où le processeur est inactif',
    category: 'cpu',
    unit: '%',
    icon: 'speed',
    criticalThreshold: { min: 10, operator: 'lt' },
    interpretation: 'Temps CPU libre (critique si < 10%)'
  },
  {
    oid: '1.3.6.1.4.1.2021.11.10.0',
    name: 'CPU utilisateur (%)',
    description: 'Pourcentage de temps CPU utilisé par les processus utilisateur',
    category: 'cpu',
    unit: '%',
    icon: 'person',
    interpretation: 'Usage CPU utilisateur'
  },
  {
    oid: '1.3.6.1.4.1.2021.11.11.0',
    name: 'CPU système (%)',
    description: 'Pourcentage de temps CPU utilisé par le système d\'exploitation',
    category: 'cpu',
    unit: '%',
    icon: 'settings',
    interpretation: 'Usage CPU système'
  },

  // === STOCKAGE ===
  {
    oid: '1.3.6.1.4.1.2021.9.1.6.1',
    name: 'Espace disque total (/)',
    description: 'Taille totale du système de fichiers racine',
    category: 'storage',
    unit: 'GB',
    icon: 'storage',
    interpretation: 'Capacité disque total'
  },
  {
    oid: '1.3.6.1.4.1.2021.9.1.7.1',
    name: 'Espace disque disponible (/)',
    description: 'Espace libre sur le système de fichiers racine',
    category: 'storage',
    unit: 'GB',
    icon: 'storage',
    criticalThreshold: { min: 2, operator: 'lt' },
    interpretation: 'Espace libre (critique si < 2 GB)'
  },
  {
    oid: '1.3.6.1.4.1.2021.9.1.9.1',
    name: 'Utilisation disque (%)',
    description: 'Pourcentage d\'utilisation du système de fichiers racine',
    category: 'storage',
    unit: '%',
    icon: 'pie_chart',
    criticalThreshold: { max: 90, operator: 'gt' },
    interpretation: 'Taux d\'occupation (critique si > 90%)'
  },

  // === RÉSEAU ===
  {
    oid: '1.3.6.1.2.1.2.1.0',
    name: 'Nombre d\'interfaces réseau',
    description: 'Nombre total d\'interfaces réseau sur le périphérique',
    category: 'network',
    icon: 'settings_ethernet',
    interpretation: 'Nombre d\'interfaces'
  },
  {
    oid: '1.3.6.1.2.1.2.2.1.10.1',
    name: 'Octets reçus (interface 1)',
    description: 'Nombre total d\'octets reçus sur la première interface réseau',
    category: 'network',
    unit: 'MB',
    icon: 'download',
    interpretation: 'Trafic entrant cumulé'
  },
  {
    oid: '1.3.6.1.2.1.2.2.1.16.1',
    name: 'Octets envoyés (interface 1)',
    description: 'Nombre total d\'octets envoyés sur la première interface réseau',
    category: 'network',
    unit: 'MB',
    icon: 'upload',
    interpretation: 'Trafic sortant cumulé'
  },

  // === PROCESSUS ===
  {
    oid: '1.3.6.1.2.1.25.1.6.0',
    name: 'Nombre de processus',
    description: 'Nombre total de processus en cours d\'exécution',
    category: 'process',
    icon: 'list',
    interpretation: 'Processus actifs'
  },
  {
    oid: '1.3.6.1.4.1.2021.10.1.3.1',
    name: 'Charge système (1 min)',
    description: 'Charge moyenne du système sur 1 minute',
    category: 'process',
    icon: 'trending_up',
    criticalThreshold: { max: 2, operator: 'gt' },
    interpretation: 'Load average (critique si > 2)'
  }
];

// Catégories avec métadonnées
export const OID_CATEGORIES = {
  system: { label: 'Système', icon: 'computer', color: '#2196F3' },
  memory: { label: 'Mémoire', icon: 'memory', color: '#4CAF50' },
  cpu: { label: 'Processeur', icon: 'speed', color: '#FF9800' },
  storage: { label: 'Stockage', icon: 'storage', color: '#9C27B0' },
  network: { label: 'Réseau', icon: 'settings_ethernet', color: '#00BCD4' },
  process: { label: 'Processus', icon: 'list', color: '#795548' },
  other: { label: 'Autre', icon: 'help_outline', color: '#607D8B' }
};

// Fonctions d'interprétation des valeurs
export class SnmpValueInterpreter {
  
  /**
   * Convertit les TimeTicks en format lisible
   */
  static formatTimeTicks(value: string): string {
    const ticks = parseInt(value);
    if (isNaN(ticks)) return value;
    
    const seconds = Math.floor(ticks / 100);
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (days > 0) {
      return `${days} jour${days > 1 ? 's' : ''}, ${hours}h${minutes}min`;
    } else if (hours > 0) {
      return `${hours}h${minutes}min`;
    } else {
      return `${minutes}min`;
    }
  }

  /**
   * Convertit les octets en unités lisibles
   */
  static formatBytes(value: string, fromUnit: 'bytes' | 'kb' | 'mb' = 'bytes'): string {
    let bytes = parseInt(value);
    if (isNaN(bytes)) return value;
    
    // Conversion vers bytes si nécessaire
    if (fromUnit === 'kb') bytes *= 1024;
    if (fromUnit === 'mb') bytes *= 1024 * 1024;
    
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let unitIndex = 0;
    
    while (bytes >= 1024 && unitIndex < units.length - 1) {
      bytes /= 1024;
      unitIndex++;
    }
    
    return `${bytes.toFixed(unitIndex > 0 ? 1 : 0)} ${units[unitIndex]}`;
  }

  /**
   * Formate un pourcentage
   */
  static formatPercentage(value: string): string {
    const num = parseFloat(value);
    if (isNaN(num)) return value;
    return `${num.toFixed(1)}%`;
  }

  /**
   * Interprète une valeur SNMP selon son OID
   */
  static interpretValue(oid: string, value: string, type: string): {
    formatted: string;
    interpretation: string;
    status: 'normal' | 'warning' | 'critical';
    unit?: string;
  } {
    const predefined = PREDEFINED_OIDS.find(p => p.oid === oid);
    let formatted = value;
    let interpretation = predefined?.interpretation || 'Valeur brute';
    let status: 'normal' | 'warning' | 'critical' = 'normal';
    let unit = predefined?.unit;

    // Formatage selon le type SNMP
    if (type === 'TimeTicks') {
      formatted = this.formatTimeTicks(value);
      interpretation = 'Durée de fonctionnement';
    } else if (predefined) {
      // Formatage selon les métadonnées de l'OID
      if (predefined.unit === 'MB' && predefined.oid.includes('4.1.2021.4')) {
        // OIDs de mémoire UCD-SNMP (en KB)
        formatted = this.formatBytes(value, 'kb');
      } else if (predefined.unit === 'GB') {
        // Stockage (généralement en KB pour UCD-SNMP)
        formatted = this.formatBytes(value, 'kb');
      } else if (predefined.unit === '%') {
        formatted = this.formatPercentage(value);
      } else if (predefined.unit === 'MB' && predefined.oid.includes('2.2.1')) {
        // Interfaces réseau (en octets)
        formatted = this.formatBytes(value);
      }

      // Vérification des seuils critiques
      if (predefined.criticalThreshold) {
        const numValue = parseFloat(value);
        const threshold = predefined.criticalThreshold;
        
        if (threshold.operator === 'lt' && threshold.min && numValue < threshold.min) {
          status = 'critical';
        } else if (threshold.operator === 'gt' && threshold.max && numValue > threshold.max) {
          status = 'critical';
        }
      }
    }

    return { formatted, interpretation, status, unit };
  }
} 