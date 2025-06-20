export interface SnmpAsset {
    id: number;
    zabbixHostId?: string;
    hostName: string;
    displayName?: string;
    name?: string;
    ipAddress: string;
    status: string;
    snmpVersion?: string;
    snmpCommunity?: string;
    snmpPort: number;
    description?: string;
    location?: string;
    deviceType?: string;
    properties?: { [key: string]: any };
    lastDiscovered?: string;
    lastUpdated?: string;
    createdAt: string;
    updatedAt?: string;
    
    // Champs pour la synchronisation Zabbix (calculés côté frontend)
    synchronizedWithZabbix?: boolean;
    lastSyncCheck?: string;
    syncInProgress?: boolean;
}

export interface SnmpScanConfig {
    id?: number;
    name: string;
    oid: string;
    interval: number;
    status: string;
}

export interface SnmpScanResult {
    id: number;
    configId: number;
    hostId: string;
    timestamp: string;
    value: number;
    status: string;
}

export interface SnmpScanHistory {
    id: number;
    hostId: string;
    timestamp: string;
    value: number;
    status: string;
} 