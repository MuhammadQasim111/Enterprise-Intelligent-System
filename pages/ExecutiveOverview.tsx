
import React from 'react';
import { usePlatform } from '../App';
import { KPI, Severity, AlertStatus } from '../types';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  AlertCircle, 
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';

const KPIWidget: React.FC<{ kpi: KPI }> = ({ kpi }) => {
  const TrendIcon = kpi.trend === 'up' ? TrendingUp : kpi.trend === 'down' ? TrendingDown : Minus;
  const trendColor = kpi.trend === 'up' ? 'text-emerald-600' : kpi.trend === 'down' ? 'text-red-600' : 'text-slate-400';
  
  return (
    <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm hover:border-slate-300 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{kpi.name}</span>
        <div className={`flex items-center gap-1 ${trendColor}`}>
          <TrendIcon size={14} />
        </div>
      </div>
      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-2xl font-bold text-slate-900 tracking-tight">
          {kpi.unit === '$' ? `$${(Number(kpi.value)/1000000).toFixed(1)}M` : kpi.value}{kpi.unit !== '$' ? kpi.unit : ''}
        </span>
      </div>
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-50">
        <div className="flex items-center gap-1.5">
          <div className={`w-1.5 h-1.5 rounded-full ${
            kpi.status === 'healthy' ? 'bg-emerald-500' : 
            kpi.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
          }`} />
          <span className="text-[10px] font-bold text-slate-500 tracking-wide uppercase">Confidence: {(kpi.confidence * 100).toFixed(0)}%</span>
        </div>
        <span className="text-[10px] font-medium text-slate-400">{new Date(kpi.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
    </div>
  );
};

const ExecutiveOverview: React.FC = () => {
  const { state, acknowledgeAlert } = usePlatform();

  const criticalAlerts = state.alerts.filter(a => a.severity === Severity.CRITICAL && a.status !== AlertStatus.RESOLVED);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* 1. System Health Strip */}
      <section>
        <h2 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-widest flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-slate-900 rounded-full" />
          System Health Matrix
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {/* Explicitly cast or type the values to ensure KPI properties are accessible */}
          {Object.values(state.kpis).map((kpi: KPI) => (
            <KPIWidget key={kpi.name} kpi={kpi} />
          ))}
        </div>
      </section>

      {/* 2. Active Critical Alerts */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-red-600 rounded-full" />
            Active Critical Intelligence Alerts
          </h2>
          <Link to="/alerts" className="text-xs font-semibold text-slate-500 hover:text-slate-900 uppercase tracking-wider underline">
            View All History
          </Link>
        </div>
        
        {criticalAlerts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {criticalAlerts.map(alert => (
              <div key={alert.id} className="bg-white border-l-4 border-red-600 rounded-lg shadow-sm overflow-hidden flex flex-col md:flex-row items-stretch border border-slate-200">
                <div className="p-6 flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-red-50 text-red-700 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-tighter border border-red-100">
                      {alert.severity}
                    </span>
                    <span className="text-xs mono text-slate-400 font-medium tracking-tight">ID: {alert.id.split('-')[0]}</span>
                    <span className="text-xs text-slate-400 font-medium">{new Date(alert.timestamp).toLocaleString()}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{alert.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 max-w-3xl">
                    {alert.summary}
                  </p>
                  <div className="flex flex-wrap gap-6">
                    <div>
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Financial Impact</span>
                      <span className="text-lg font-bold text-red-600 tracking-tight">
                        {alert.financialImpact < 0 ? '-' : ''}${Math.abs(alert.financialImpact).toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Prediction Confidence</span>
                      <span className="text-lg font-bold text-slate-900 tracking-tight">{(alert.confidenceScore * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-50 border-l border-slate-200 p-6 flex flex-col justify-center gap-3 w-full md:w-64 shrink-0">
                  <Link 
                    to={`/alerts?id=${alert.id}`} 
                    className="flex items-center justify-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded text-sm font-semibold hover:bg-slate-800 transition-all active:scale-95"
                  >
                    View Analysis <ExternalLink size={14} />
                  </Link>
                  {alert.status !== AlertStatus.ACKNOWLEDGED && (
                    <button 
                      onClick={() => acknowledgeAlert(alert.id)}
                      className="flex items-center justify-center gap-2 bg-white text-slate-900 border border-slate-200 px-4 py-2.5 rounded text-sm font-semibold hover:border-slate-300 transition-all active:scale-95 shadow-sm"
                    >
                      Acknowledge
                    </button>
                  )}
                  {alert.status === AlertStatus.ACKNOWLEDGED && (
                    <div className="flex items-center justify-center gap-1.5 text-emerald-600 py-2.5">
                      <CheckCircle2 size={16} />
                      <span className="text-xs font-bold uppercase tracking-wider">Acknowledged</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 border-dashed rounded-lg p-12 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
              <CheckCircle2 className="text-emerald-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1 tracking-tight">System Status Optimal</h3>
            <p className="text-slate-500 text-sm">No critical intelligence alerts requiring immediate executive attention.</p>
          </div>
        )}
      </section>

      {/* 3. Recommended Decisions & Forecast */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 bg-slate-900 rounded-full" />
            Strategic Recommendations (Ranked)
          </h2>
          <div className="space-y-4">
            {state.decisions.map((decision, idx) => (
              <div key={decision.id} className="bg-white border border-slate-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs">{idx + 1}</span>
                    <div>
                      <h4 className="font-bold text-slate-900">{decision.recommendation}</h4>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{decision.domain} | Horizon: {decision.horizon}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Expected ROI</span>
                    <span className="text-emerald-600 font-black text-lg">+${(decision.expectedROI/1000000).toFixed(1)}M</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 py-3 border-t border-slate-50">
                   <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Confidence</span>
                    <span className="text-sm font-bold text-slate-900">{(decision.feasibility * 100).toFixed(0)}%</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Risk Profile</span>
                    <span className={`text-sm font-bold ${
                      decision.riskLevel === Severity.LOW ? 'text-emerald-600' : 
                      decision.riskLevel === Severity.MEDIUM ? 'text-amber-600' : 'text-red-600'
                    }`}>{decision.riskLevel}</span>
                  </div>
                  <div className="text-right">
                    <button className="text-xs font-bold text-slate-900 hover:underline">Drill-Down Analysis</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 bg-slate-900 rounded-full" />
            Executive Forecast
          </h2>
          <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-8">
            <div>
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">90-Day Revenue Projection</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900 tracking-tighter">$38.4M</span>
                <span className="text-xs font-bold text-emerald-600">+12% vs LY</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full mt-4 overflow-hidden">
                <div className="h-full bg-slate-900 w-3/4 rounded-full" />
              </div>
            </div>

            <div>
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Cash Runway Projection</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900 tracking-tighter">18.2 Mo.</span>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
               <span className="block text-xs text-slate-500 italic mb-4 leading-relaxed">
                "Growth remains consistent with plan. Primary headwind identified in marketing efficiency (CAC variance). No immediate liquidity risk detected."
               </span>
               <div className="bg-slate-900 text-white p-4 rounded text-center">
                 <button className="text-xs font-bold uppercase tracking-widest">Execute Simulation Plan</button>
               </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ExecutiveOverview;
