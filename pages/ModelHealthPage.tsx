
import React from 'react';
import { usePlatform } from '../App';
import { Database, ShieldCheck, Activity, AlertTriangle, Terminal } from 'lucide-react';

const ModelHealthPage: React.FC = () => {
  const { state } = usePlatform();

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Model Registry & Governance</h1>
        <p className="text-sm text-slate-500">Audit trail of active intelligence models and training integrity.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {state.models.map(model => (
          <div key={model.hash} className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full ${model.status === 'active' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                <h3 className="font-bold text-slate-900">{model.name}</h3>
                <span className="text-[10px] font-black bg-slate-200 px-2 py-0.5 rounded text-slate-600">{model.version}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status: {model.status.toUpperCase()}</span>
                <span className="text-[10px] mono text-slate-400">HASH: {model.hash.split(':')[1].substring(0, 16)}</span>
              </div>
            </div>
            
            <div className="p-8 grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="space-y-6">
                <div>
                  <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <ShieldCheck size={12} /> Accuracy (R²)
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-slate-900 tracking-tighter">{(model.accuracy * 100).toFixed(1)}%</span>
                  </div>
                </div>
                <div>
                  <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <Activity size={12} /> Drift Coefficient
                  </span>
                  <div className={`text-xl font-bold ${model.driftScore > 0.1 ? 'text-amber-600' : 'text-emerald-600'}`}>
                    {model.driftScore.toFixed(3)}
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 bg-slate-900 rounded p-6 font-mono text-xs text-slate-300 overflow-x-auto">
                 <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-800">
                   <Terminal size={14} className="text-slate-500" />
                   <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Training Metadata Audit</span>
                 </div>
                 <div className="space-y-1">
                   <div><span className="text-slate-500">last_trained:</span> {model.lastTrained}</div>
                   <div><span className="text-slate-500">training_dataset:</span> eip_master_v12_finance_prod</div>
                   <div><span className="text-slate-500">optimizer:</span> adamw (lr=1e-4)</div>
                   <div><span className="text-slate-500">loss_function:</span> custom_weighted_risk_mse</div>
                   <div><span className="text-slate-500">validation_strategy:</span> 5-fold cross_val_time_series</div>
                   <div><span className="text-slate-500">inference_latency_p99:</span> 124ms</div>
                 </div>
              </div>

              <div className="flex flex-col justify-center gap-3">
                 <button className="w-full py-2.5 bg-slate-900 text-white rounded text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors">
                   View Performance History
                 </button>
                 <button className="w-full py-2.5 border border-slate-200 text-slate-600 rounded text-xs font-bold uppercase tracking-widest hover:bg-slate-50 transition-colors">
                   Re-validate Weights
                 </button>
                 {model.driftScore > 0.1 && (
                   <div className="mt-2 flex items-center gap-2 text-amber-600 p-2 bg-amber-50 rounded border border-amber-100">
                     <AlertTriangle size={14} />
                     <span className="text-[10px] font-black uppercase tracking-tight">Drift Detected - Training Req.</span>
                   </div>
                 )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-8">
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 border-b border-slate-50 pb-2 flex items-center gap-2">
          <History size={16} /> Audit Governance Rules
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Deterministic Override</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              System logic enforces that no model can influence revenue projections if prediction confidence drops below 75% for three consecutive batches.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Cold Storage Policy</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every training dataset hash is immutably stored for 5 years to ensure full historical audit capability for compliance requirements.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Safe Mode Trigger</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Drift exceeding 0.25 on a core forecast model triggers immediate baseline fallback and a critical alert to the Founder.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const History = ({ size }: { size: number }) => <Activity size={size} />;

export default ModelHealthPage;
