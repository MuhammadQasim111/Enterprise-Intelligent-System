
export enum Severity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export enum AlertStatus {
  TRIGGERED = 'Triggered',
  EMAIL_SENT = 'Email Sent',
  VIEWED = 'Viewed',
  ACKNOWLEDGED = 'Acknowledged',
  RESOLVED = 'Resolved',
  CLOSED = 'Closed',
  DELIVERY_FAILED = 'Delivery Failed'
}

export enum Domain {
  FINANCE = 'Finance',
  MARKETING = 'Marketing',
  OPERATIONS = 'Operations',
  PARTNERS = 'Partners'
}

export interface Alert {
  id: string;
  timestamp: string; // ISO UTC
  title: string;
  summary: string;
  triggerCondition: string;
  domain: Domain;
  financialImpact: number;
  confidenceScore: number;
  dataFreshness: string;
  recommendedActions: string[];
  modelVersion: string;
  severity: Severity;
  status: AlertStatus;
  retryCount: number;
  auditTrail: AuditLog[];
  rootCause?: string;
}

export interface AuditLog {
  timestamp: string;
  action: string;
  user: string;
  metadata?: Record<string, any>;
}

export interface KPI {
  name: string;
  value: number | string;
  trend: 'up' | 'down' | 'neutral';
  confidence: number;
  lastUpdated: string;
  status: 'healthy' | 'warning' | 'critical';
  unit?: string;
}

export interface Decision {
  id: string;
  recommendation: string;
  domain: Domain;
  expectedROI: number;
  riskLevel: Severity;
  status: 'Proposed' | 'Approved' | 'In Progress' | 'Completed' | 'Rejected';
  feasibility: number;
  horizon: string;
}

export interface ModelHealth {
  name: string;
  version: string;
  accuracy: number;
  driftScore: number;
  lastTrained: string;
  hash: string;
  status: 'active' | 'frozen' | 'degraded';
}

export interface PlatformState {
  safeMode: boolean;
  systemStatus: 'healthy' | 'warning' | 'critical';
  alerts: Alert[];
  kpis: Record<string, KPI>;
  models: ModelHealth[];
  decisions: Decision[];
  lastUpdate: string;
}
