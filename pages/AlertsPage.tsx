
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { usePlatform } from '../App';
import { Severity, AlertStatus, Domain } from '../types';
import {
  ChevronRight,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Mail,
  User,
  CornerDownRight,
  Info,
  Bell
} from 'lucide-react';

const AlertsPage: React.FC = () => {
  const { state, acknowledgeAlert, resolveAlert, triggerSystemAlert } = usePlatform();
  const location = useLocation();
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null);
  const [resolutionNote, setResolutionNote] = useState('');

  const queryParams = new URLSearchParams(location.search);
  const idFromQuery = queryParams.get('id');

  useEffect(() => {
    if (idFromQuery) setSelectedAlertId(idFromQuery);
    else if (state.alerts.length > 0 && !selectedAlertId) setSelectedAlertId(state.alerts[0].id);
  }, [idFromQuery, state.alerts]);

  const selectedAlert = state.alerts.find(a => a.id === selectedAlertId);

  const getSeverityColor = (sev: Severity) => {
    switch (sev) {
      case Severity.CRITICAL: return 'text-red-600 bg-red-50 border-red-100';
      case Severity.HIGH: return 'text-amber-600 bg-amber-50 border-amber-100';
      default: return 'text-slate-600 bg-slate-50 border-slate-100';
    }
  };

  const getStatusIcon = (status: AlertStatus) => {
    switch (status) {
      case AlertStatus.RESOLVED: return <CheckCircle2 size={12} className="text-emerald-500" />;
      case AlertStatus.ACKNOWLEDGED: return <User size={12} className="text-blue-500" />;
      default: return <Clock size={12} className="text-slate-400" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-140px)] flex flex-col gap-6">
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Intelligence Alerts</h1>
          <p className="text-sm text-slate-500">Deterministic record of cross-domain anomalies and risks.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input
              type="text"
              placeholder="Filter alerts..."
              className="pl-9 pr-4 py-2 border border-slate-200 rounded text-xs outline-none focus:ring-2 focus:ring-slate-900 transition-all bg-white"
            />
          </div>

          <button
            onClick={() => triggerSystemAlert({
              title: `System Diagnostic: ${new Date().toLocaleTimeString()}`,
              summary: 'This is a real-time intelligence layer verification alert sent to confirm end-to-end connectivity.',
              severity: Severity.HIGH,
              domain: Domain.OPERATIONS,
              financialImpact: 0,
              rootCause: 'Manual Diagnostic Trigger'
            })}
            className="flex items-center gap-2 px-3 py-2 bg-slate-900 text-white rounded text-xs font-bold hover:bg-slate-800 transition-all active:scale-95"
          >
            <Bell size={14} /> Send Diagnostic Email
          </button>
          <button className="p-2 border border-slate-200 rounded hover:bg-white transition-colors">
            <Filter size={14} className="text-slate-600" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden border border-slate-200 rounded-lg bg-white shadow-sm">
        {/* Alerts List */}
        <div className="w-1/3 border-r border-slate-200 flex flex-col">
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between shrink-0">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Master Audit Trail</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{state.alerts.length} Records</span>
          </div>
          <div className="flex-1 overflow-y-auto">
            {state.alerts.map(alert => (
              <button
                key={alert.id}
                onClick={() => setSelectedAlertId(alert.id)}
                className={`w-full text-left p-4 border-b border-slate-50 transition-all hover:bg-slate-50 ${selectedAlertId === alert.id ? 'bg-slate-50 ring-1 ring-inset ring-slate-200' : ''}`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] font-black px-1.5 py-0.5 rounded uppercase border ${getSeverityColor(alert.severity)}`}>
                    {alert.severity}
                  </span>
                  <span className="text-[10px] mono text-slate-400">{new Date(alert.timestamp).toLocaleDateString()}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 truncate mb-1">{alert.title}</h4>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">{alert.domain}</span>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(alert.status)}
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">{alert.status}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Alert Detail */}
        <div className="flex-1 overflow-y-auto bg-white flex flex-col">
          {selectedAlert ? (
            <>
              <div className="p-8 border-b border-slate-100 shrink-0">
                <div className="flex items-center gap-4 mb-4">
                  <span className={`text-xs font-black px-2 py-1 rounded uppercase border ${getSeverityColor(selectedAlert.severity)}`}>
                    {selectedAlert.severity} SEVERITY
                  </span>
                  <div className="flex items-center gap-2 text-[10px] mono text-slate-400 font-medium">
                    <span>ID: {selectedAlert.id}</span>
                    <div className="w-1 h-1 bg-slate-200 rounded-full" />
                    <span>UTC: {new Date(selectedAlert.timestamp).toISOString()}</span>
                  </div>
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight leading-tight">{selectedAlert.title}</h2>

                <div className="flex flex-wrap gap-8 py-6 border-y border-slate-100">
                  <div>
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Impact</span>
                    <span className="text-xl font-bold text-red-600 tracking-tight">${Math.abs(selectedAlert.financialImpact).toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Confidence</span>
                    <span className="text-xl font-bold text-slate-900 tracking-tight">{(selectedAlert.confidenceScore * 100).toFixed(0)}%</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Model Version</span>
                    <span className="text-xl font-bold text-slate-900 tracking-tight">{selectedAlert.modelVersion}</span>
                  </div>
                  <div className="ml-auto">
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Email Sync</span>
                    <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded border border-emerald-100">
                      <Mail size={12} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Delivered to Founders</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 space-y-10">
                <section>
                  <h5 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <Info size={14} className="text-slate-400" /> Executive Summary
                  </h5>
                  <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                    <p className="text-slate-800 font-medium leading-relaxed mb-4">
                      {selectedAlert.summary}
                    </p>
                    {selectedAlert.rootCause && (
                      <div className="flex items-start gap-3 pt-4 border-t border-slate-200">
                        <CornerDownRight size={18} className="text-slate-400 mt-1 shrink-0" />
                        <div>
                          <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Root Cause Analysis</span>
                          <span className="text-sm font-bold text-slate-900 leading-snug">{selectedAlert.rootCause}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </section>

                <section>
                  <h5 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] mb-4">Recommended Actions</h5>
                  <div className="space-y-3">
                    {selectedAlert.recommendedActions.map((action, i) => (
                      <div key={i} className="flex items-center gap-4 bg-white border border-slate-200 p-4 rounded-lg shadow-sm hover:border-slate-300 transition-colors">
                        <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold">
                          {i + 1}
                        </div>
                        <span className="text-sm font-bold text-slate-900">{action}</span>
                        <ChevronRight size={14} className="ml-auto text-slate-300" />
                      </div>
                    ))}
                  </div>
                </section>

                <section className="bg-slate-900 text-white rounded-lg p-8">
                  <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Master Audit History</h5>
                  <div className="space-y-6">
                    {selectedAlert.auditTrail.map((log, i) => (
                      <div key={i} className="flex gap-4 relative">
                        {i !== selectedAlert.auditTrail.length - 1 && (
                          <div className="absolute left-[7px] top-6 bottom-[-24px] w-[1px] bg-slate-800" />
                        )}
                        <div className="w-4 h-4 rounded-full bg-slate-800 border-2 border-slate-900 mt-1 z-10" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-white">{log.action}</span>
                            <span className="text-[10px] mono text-slate-500">{new Date(log.timestamp).toLocaleTimeString()}</span>
                          </div>
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">User: {log.user}</span>
                          {log.metadata?.notes && (
                            <p className="mt-2 p-3 bg-slate-800/50 rounded text-xs text-slate-400 border border-slate-700 italic">
                              "{log.metadata.notes}"
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedAlert.status !== AlertStatus.RESOLVED && (
                    <div className="mt-12 pt-8 border-t border-slate-800">
                      <h6 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-4">Action Required: Close Record</h6>
                      <textarea
                        value={resolutionNote}
                        onChange={(e) => setResolutionNote(e.target.value)}
                        placeholder="Provide resolution summary for audit records..."
                        className="w-full bg-slate-800 border border-slate-700 rounded p-4 text-xs outline-none focus:ring-1 focus:ring-slate-400 transition-all mb-4 h-24"
                      />
                      <div className="flex gap-4">
                        <button
                          onClick={() => {
                            resolveAlert(selectedAlert.id, resolutionNote);
                            setResolutionNote('');
                          }}
                          disabled={!resolutionNote}
                          className="flex-1 bg-white text-slate-900 py-3 rounded text-sm font-bold hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Resolve & Finalize Audit
                        </button>
                        {selectedAlert.status !== AlertStatus.ACKNOWLEDGED && (
                          <button
                            onClick={() => acknowledgeAlert(selectedAlert.id)}
                            className="px-8 bg-slate-800 text-white py-3 rounded text-sm font-bold border border-slate-700 hover:bg-slate-700 transition-colors"
                          >
                            Acknowledge
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </section>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-slate-400">
              <Bell size={48} strokeWidth={1} className="mb-4 opacity-20" />
              <p className="text-sm">Select an alert from the audit trail to view intelligence details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertsPage;
