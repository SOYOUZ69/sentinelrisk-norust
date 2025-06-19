export interface SnmpAsset {
    hostid: string;
    host: string;
    ip: string;
    version: string;
    status: string;
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