import { ScaleType } from '@swimlane/ngx-charts';

export interface DashboardFilter {
  startDate?: Date;
  endDate?: Date;
  framework?: string;
  role?: string;
  assetId?: string;
}

export interface RiskSummary {
  totalRisks: number;
  risksByLevel: { [key: string]: number };
  risksByCategory: { [key: string]: number };
  openRisks: number;
  closedRisks: number;
}

export interface ComplianceSummary {
  totalControls: number;
  compliantControls: number;
  nonCompliantControls: number;
  complianceRate: number;
  controlsByFramework: { [key: string]: number };
  controlsByStatus: { [key: string]: number };
}

export interface SnmpSummary {
  totalAssets: number;
  activeAssets: number;
  inactiveAssets: number;
  assetsByType: { [key: string]: number };
  assetsByStatus: { [key: string]: number };
  recentScans: number;
  failedScans: number;
  successRate: number;
}

export interface ActionPlansSummary {
  totalPlans: number;
  activePlans: number;
  completedPlans: number;
  overduePlans: number;
  plansByStatus: { [key: string]: number };
  completionRate: number;
}

export interface GlobalDashboardSummary {
  risks: RiskSummary;
  compliance: ComplianceSummary;
  snmp: SnmpSummary;
  plans: ActionPlansSummary;
}

// Interfaces pour ngx-charts
export interface ChartData {
  name: string;
  value: number;
}

export interface MultiSeriesChartData {
  name: string;
  series: ChartData[];
}

export interface DashboardChartConfig {
  showXAxis: boolean;
  showYAxis: boolean;
  gradient: boolean;
  showLegend: boolean;
  showXAxisLabel: boolean;
  showYAxisLabel: boolean;
  animations: boolean;
  colorScheme: any;
}

export const DEFAULT_COLOR_SCHEME = {
  name: 'default',
  selectable: true,
  group: ScaleType.Ordinal,
  domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728']
};

export const RISK_LEVEL_COLORS = {
  name: 'riskLevel',
  selectable: true,
  group: ScaleType.Ordinal,
  domain: ['#4CAF50', '#FF9800', '#F44336', '#9C27B0'] // Green, Orange, Red, Purple
};

export const COMPLIANCE_COLORS = {
  name: 'compliance',
  selectable: true,
  group: ScaleType.Ordinal,
  domain: ['#4CAF50', '#F44336', '#FF9800'] // Green, Red, Orange
};

export const SNMP_STATUS_COLORS = {
  name: 'snmpStatus',
  selectable: true,
  group: ScaleType.Ordinal,
  domain: ['#4CAF50', '#F44336'] // Green, Red
}; 