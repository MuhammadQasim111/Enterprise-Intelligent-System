
import { Severity, AlertStatus, Domain, KPI, Alert, Decision, ModelHealth } from './types';

export const INITIAL_KPIS: Record<string, KPI> = {
  revenue: {
    name: 'Revenue',
    value: 12450000,
    unit: '$',
    trend: 'up' as 'up' | 'down' | 'neutral',
    confidence: 0.98,
    lastUpdated: new Date().toISOString(),
    status: 'healthy' as 'healthy' | 'warning' | 'critical'
  },
  cac: {
    name: 'CAC',
    value: 452,
    unit: '$',
    trend: 'up' as 'up' | 'down' | 'neutral',
    confidence: 0.92,
    lastUpdated: new Date().toISOString(),
    status: 'warning' as 'healthy' | 'warning' | 'critical'
  },
  churn: {
    name: 'Churn Risk',
    value: 2.4,
    unit: '%',
    trend: 'neutral' as 'up' | 'down' | 'neutral',
    confidence: 0.88,
    lastUpdated: new Date().toISOString(),
    status: 'healthy' as 'healthy' | 'warning' | 'critical'
  },
  ops: {
    name: 'Operational Risk',
    value: 'Low',
    trend: 'neutral' as 'up' | 'down' | 'neutral',
    confidence: 0.95,
    lastUpdated: new Date().toISOString(),
    status: 'healthy' as 'healthy' | 'warning' | 'critical'
  },
  dataHealth: {
    name: 'Data Health',
    value: 99.9,
    unit: '%',
    trend: 'neutral' as 'up' | 'down' | 'neutral',
    confidence: 1.0,
    lastUpdated: new Date().toISOString(),
    status: 'healthy' as 'healthy' | 'warning' | 'critical'
  },
  modelHealth: {
    name: 'Model Health',
    value: 94.2,
    unit: '%',
    trend: 'down' as 'up' | 'down' | 'neutral',
    confidence: 0.94,
    lastUpdated: new Date().toISOString(),
    status: 'warning' as 'healthy' | 'warning' | 'critical'
  }
};

export const INITIAL_ALERTS: Alert[] = [
  {
    id: '93f0-43ab-9aa1',
    timestamp: new Date().toISOString(),
    title: 'Revenue Risk Detected: CAC Variance',
    summary: 'CAC increased 22% over 7-day moving average, signaling potential budget inefficiency.',
    triggerCondition: 'KPI deviation > 15%',
    domain: Domain.MARKETING,
    financialImpact: -480000,
    confidenceScore: 0.82,
    dataFreshness: new Date(Date.now() - 18000).toISOString(),
    recommendedActions: [
      'Reduce Paid Search budget by 15%',
      'Shift budget to Retargeting campaigns',
      'Run pricing sensitivity test'
    ],
    modelVersion: 'v2.4.1-stable',
    severity: Severity.CRITICAL,
    status: AlertStatus.EMAIL_SENT,
    retryCount: 0,
    rootCause: 'Paid search CPC spike (14%), conversion drop (8%)',
    auditTrail: [
      { timestamp: new Date().toISOString(), action: 'Alert Triggered', user: 'System' },
      { timestamp: new Date().toISOString(), action: 'Email Sent to Founder/CEO/COO', user: 'Alert Engine' }
    ]
  }
];

export const INITIAL_DECISIONS: Decision[] = [
  {
    id: 'D-1024',
    recommendation: 'Strategic Budget Realocation to High-LTV Channels',
    domain: Domain.MARKETING,
    expectedROI: 1250000,
    riskLevel: Severity.MEDIUM,
    status: 'Proposed',
    feasibility: 0.85,
    horizon: '30 Days'
  }
];

export const INITIAL_MODELS: ModelHealth[] = [
  {
    name: 'Revenue Forecast Engine',
    version: 'v4.2.0',
    accuracy: 0.965,
    driftScore: 0.02,
    lastTrained: '2024-05-15T00:00:00Z',
    hash: 'sha256:e3b0c442...',
    status: 'active'
  },
  {
    name: 'CAC Prediction Model',
    version: 'v2.4.1',
    accuracy: 0.892,
    driftScore: 0.12,
    lastTrained: '2024-05-10T00:00:00Z',
    hash: 'sha256:f1a2b3c4...',
    status: 'active'
  }
];
