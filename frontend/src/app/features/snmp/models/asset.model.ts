export interface Asset {
  id?: number;
  hostname?: string;
  ipAddress?: string;
  type: AssetType;
  snmpVersion: SnmpVersion;
  port: number;
  community?: string;
  username?: string;
  authProtocol?: string;
  authPassword?: string;
  privProtocol?: string;
  privPassword?: string;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum AssetType {
  SERVER = 'SERVER',
  PC = 'PC',
  SWITCH = 'SWITCH',
  ROUTER = 'ROUTER',
  PRINTER = 'PRINTER',
  FIREWALL = 'FIREWALL',
  OTHER = 'OTHER'
}

export enum SnmpVersion {
  V1 = 'V1',
  V2C = 'V2C',
  V3 = 'V3'
}

export interface AssetCreateRequest {
  hostname?: string;
  ipAddress?: string;
  type: AssetType;
  snmpVersion: SnmpVersion;
  port?: number;
  community?: string;
  username?: string;
  authProtocol?: string;
  authPassword?: string;
  privProtocol?: string;
  privPassword?: string;
  active?: boolean;
} 