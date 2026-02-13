
import * as React from 'react';
import { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import {
  PlatformState,
  Alert,
  AlertStatus,
  Severity
} from './types';
import {
  INITIAL_KPIS,
  INITIAL_ALERTS,
  INITIAL_DECISIONS,
  INITIAL_MODELS
} from './mockData';
import Layout from './components/Layout';
import ExecutiveOverview from './pages/ExecutiveOverview';
import AlertsPage from './pages/AlertsPage';
import FinancePage from './pages/FinancePage';
import SimulationConsole from './pages/SimulationConsole';
import ModelHealthPage from './pages/ModelHealthPage';

import { queryIntelligence } from '@/services/grokService';
import { sendAlertEmail } from '@/services/alertService';
import { fetchRealTimeKPIs } from '@/services/dataService';

// Context for synchronized state
interface PlatformContextType {
  state: PlatformState;
  recipients: string[];
  searchResult: any | null;
  isSearching: boolean;
  addRecipient: (email: string) => void;
  removeRecipient: (email: string) => void;
  performSearch: (query: string) => Promise<void>;
  clearSearch: () => void;
  acknowledgeAlert: (id: string) => void;
  resolveAlert: (id: string, notes: string) => void;
  toggleSafeMode: () => void;
  triggerSystemAlert: (alertParams: Partial<Alert>) => Promise<void>;
  updateState: (newState: Partial<PlatformState>) => void;
}

const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

export const usePlatform = () => {
  const context = useContext(PlatformContext);
  if (!context) throw new Error("usePlatform must be used within PlatformProvider");
  return context;
};

const App: React.FC = () => {
  const [state, setState] = useState<PlatformState>({
    safeMode: false,
    systemStatus: 'healthy',
    alerts: INITIAL_ALERTS,
    kpis: INITIAL_KPIS,
    models: INITIAL_MODELS,
    decisions: INITIAL_DECISIONS,
    lastUpdate: new Date().toISOString()
  });

  const [recipients, setRecipients] = useState<string[]>(['mqasim111786111@gmail.com']);
  const [searchResult, setSearchResult] = useState<any | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Real-Time Data Ingestion from Stripe & HubSpot
  useEffect(() => {
    const refreshData = async () => {
      const realMetrics = await fetchRealTimeKPIs();
      if (realMetrics) {
        setState(prev => ({
          ...prev,
          kpis: {
            ...prev.kpis,
            revenue: { ...prev.kpis.revenue, ...realMetrics.revenue },
            cac: { ...prev.kpis.cac, ...realMetrics.cac },
            churn: { ...prev.kpis.churn, ...realMetrics.churn }
          },
          lastUpdate: new Date().toISOString()
        }));
      }
    };

    refreshData();
    const interval = setInterval(refreshData, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const updateState = (newState: Partial<PlatformState>) => {
    setState(prev => ({ ...prev, ...newState }));
  };

  const addRecipient = (email: string) => {
    if (!recipients.includes(email)) setRecipients([...recipients, email]);
  };

  const removeRecipient = (email: string) => {
    setRecipients(recipients.filter(r => r !== email));
  };

  const performSearch = async (query: string) => {
    setIsSearching(true);
    setSearchResult(null);
    try {
      const res = await queryIntelligence(query, { kpis: state.kpis, alerts: state.alerts.length });
      setSearchResult(res);
    } catch (e) {
      setSearchResult({
        answer: "Intelligence sync failed. Please verify your Groq API key in the .env.local file.",
        confidence: 0,
        supportingMetrics: ["API Connection Error"],
        suggestedAction: "Check your internet connection and API key validity."
      });
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => setSearchResult(null);

  const triggerSystemAlert = async (alertParams: Partial<Alert>) => {
    const newAlert: Alert = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      title: alertParams.title || 'System Alert',
      summary: alertParams.summary || '',
      triggerCondition: alertParams.triggerCondition || 'Real-time Anomaly',
      domain: alertParams.domain || INITIAL_ALERTS[0].domain,
      financialImpact: alertParams.financialImpact || 0,
      confidenceScore: alertParams.confidenceScore || 0.9,
      dataFreshness: new Date().toISOString(),
      recommendedActions: alertParams.recommendedActions || [],
      modelVersion: alertParams.modelVersion || 'v2.4-live',
      severity: alertParams.severity || Severity.HIGH,
      status: AlertStatus.TRIGGERED,
      retryCount: 0,
      auditTrail: [{ timestamp: new Date().toISOString(), action: 'Alert Triggered', user: 'Live Engine' }],
      rootCause: alertParams.rootCause
    };

    setState(prev => ({ ...prev, alerts: [newAlert, ...prev.alerts] }));

    const success = await sendAlertEmail(newAlert, recipients);

    setState(prev => ({
      ...prev,
      alerts: prev.alerts.map(a => a.id === newAlert.id ? {
        ...a,
        status: success ? AlertStatus.EMAIL_SENT : AlertStatus.DELIVERY_FAILED,
        auditTrail: [...a.auditTrail, {
          timestamp: new Date().toISOString(),
          action: success ? 'Email Sent' : 'Email Failed',
          user: 'Resend API'
        }]
      } : a)
    }));
  };

  const acknowledgeAlert = (id: string) => {
    setState(prev => ({
      ...prev,
      alerts: prev.alerts.map(a =>
        a.id === id ? {
          ...a,
          status: AlertStatus.ACKNOWLEDGED,
          auditTrail: [...a.auditTrail, { timestamp: new Date().toISOString(), action: 'Acknowledged', user: 'Executive' }]
        } : a
      )
    }));
  };

  const resolveAlert = (id: string, notes: string) => {
    setState(prev => ({
      ...prev,
      alerts: prev.alerts.map(a =>
        a.id === id ? {
          ...a,
          status: AlertStatus.RESOLVED,
          auditTrail: [...a.auditTrail, { timestamp: new Date().toISOString(), action: 'Resolved', user: 'Executive', metadata: { notes } }]
        } : a
      )
    }));
  };

  const toggleSafeMode = () => {
    setState(prev => ({
      ...prev,
      safeMode: !prev.safeMode,
      systemStatus: !prev.safeMode ? 'warning' : 'healthy'
    }));
  };

  return (
    <PlatformContext.Provider value={{
      state,
      recipients,
      searchResult,
      isSearching,
      addRecipient,
      removeRecipient,
      performSearch,
      clearSearch,
      acknowledgeAlert,
      resolveAlert,
      toggleSafeMode,
      triggerSystemAlert,
      updateState
    }}>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<ExecutiveOverview />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/finance" element={<FinancePage />} />
            <Route path="/simulations" element={<SimulationConsole />} />
            <Route path="/models" element={<ModelHealthPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </HashRouter>
    </PlatformContext.Provider>
  );
};

export default App;
