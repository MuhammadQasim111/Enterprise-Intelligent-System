
import React from 'react';
import { usePlatform } from '../App';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { CornerDownRight, TrendingDown, Target, Shield } from 'lucide-react';

const REVENUE_COMP_DATA = [
  { segment: 'Direct Sales', current: 4.2, target: 4.0 },
  { segment: 'Partner Channel', current: 2.8, target: 3.2 },
  { segment: 'Self-Service', current: 5.4, target: 5.0 },
  { segment: 'Retention Upsell', current: 1.2, target: 1.5 },
];

const FinancePage: React.FC = () => {
  const { state } = usePlatform();

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Finance Domain Intelligence</h1>
          <p className="text-sm text-slate-500">Atomic breakdown of revenue drivers and risk exposure.</p>
        </div>
        <div className="flex gap-4">
          <div className="text-right">
             <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Q2 Performance</span>
             <span className="text-xl font-bold text-emerald-600">+104% to Plan</span>
          </div>
        </div>
      </div>

      {/* Domain Health Header */}
      <div className="grid grid-cols-4 gap-4">
         <div className="bg-white p-6 border border-slate-200 rounded-lg">
           <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
             <Target size={12} /> Actual vs Target
           </span>
           <span className="text-2xl font-black text-slate-900">$12.4M</span>
           <span className="block text-[10px] font-bold text-slate-500 mt-2">Target: $11.9M</span>
         </div>
         <div className="bg-white p-6 border border-slate-200 rounded-lg">
           <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
             <TrendingDown size={12} /> Forecast Variance
           </span>
           <span className="text-2xl font-black text-red-600">-1.4%</span>
           <span className="block text-[10px] font-bold text-slate-500 mt-2">Confidence: 94%</span>
         </div>
         <div className="bg-white p-6 border border-slate-200 rounded-lg">
           <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
             <Shield size={12} /> Cash Cushion
           </span>
           <span className="text-2xl font-black text-slate-900">18.2 Mo</span>
           <span className="block text-[10px] font-bold text-slate-500 mt-2">Min SLA: 12.0 Mo</span>
         </div>
         <div className="bg-white p-6 border border-slate-200 rounded-lg">
           <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Model Confidence</span>
           <span className="text-2xl font-black text-slate-900">98.4%</span>
           <span className="block text-[10px] font-bold text-slate-500 mt-2">V-Fin-Forecast-V4</span>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Root Cause Explorer */}
        <section className="bg-white border border-slate-200 rounded-lg p-8">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-8 border-b border-slate-50 pb-2">Root Cause Revenue Breakdown</h2>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-48 p-3 bg-slate-900 text-white rounded font-bold text-xs text-center">Total Revenue ($12.4M)</div>
              <div className="h-[1px] bg-slate-200 flex-1" />
            </div>
            <div className="pl-12 space-y-6">
               <div className="flex items-center gap-4">
                 <div className="w-40 p-3 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded font-bold text-[10px] text-center uppercase tracking-widest">Growth +$2.1M</div>
                 <div className="h-[1px] bg-slate-200 flex-1" />
                 <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600">
                      <CornerDownRight size={12} /> New Logos (+$1.5M)
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600">
                      <CornerDownRight size={12} /> Expansions (+$0.6M)
                    </div>
                 </div>
               </div>
               <div className="flex items-center gap-4">
                 <div className="w-40 p-3 bg-red-50 border border-red-100 text-red-700 rounded font-bold text-[10px] text-center uppercase tracking-widest">Risk -$0.8M</div>
                 <div className="h-[1px] bg-slate-200 flex-1" />
                 <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-red-600">
                      <CornerDownRight size={12} /> Churn Risk (-$0.5M)
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-amber-600">
                      <CornerDownRight size={12} /> Downgrades (-$0.3M)
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </section>

        {/* Segment Performance */}
        <section className="bg-white border border-slate-200 rounded-lg p-8">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-8 border-b border-slate-50 pb-2">Segment Performance vs Plan</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REVENUE_COMP_DATA} margin={{ left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="segment" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 'bold' }} 
                />
                <YAxis 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 'bold' }}
                   tickFormatter={(v) => `$${v}M`}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="current" fill="#0f172a" radius={[4, 4, 0, 0]} barSize={24} />
                <Bar dataKey="target" fill="#cbd5e1" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-8 mt-6">
             <div className="flex items-center gap-2">
               <div className="w-3 h-3 rounded bg-slate-900" />
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Actual</span>
             </div>
             <div className="flex items-center gap-2">
               <div className="w-3 h-3 rounded bg-slate-200" />
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Target</span>
             </div>
          </div>
        </section>
      </div>

      {/* Risks & Opportunities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
           <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-4">Critical Financial Risks</h3>
           <div className="bg-red-50 border border-red-100 rounded-lg p-5">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-red-900 text-sm">Churn Spike in Tier-2 Partners</span>
                <span className="text-red-700 font-black text-xs">-$340K est.</span>
              </div>
              <p className="text-xs text-red-700/80 leading-relaxed">
                Probability: 42% | Confidence: 88% | Root: Integration friction points identified in v3.2 bridge.
              </p>
           </div>
        </div>
        <div className="space-y-4">
           <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-4">Strategic Opportunities</h3>
           <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-5">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-emerald-900 text-sm">Cross-Sell propensity in Fintech vertical</span>
                <span className="text-emerald-700 font-black text-xs">+$820K est.</span>
              </div>
              <p className="text-xs text-emerald-700/80 leading-relaxed">
                Probability: 65% | Confidence: 92% | Root: Behavioral analysis suggests high readiness for 'Advanced Security' module.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default FinancePage;
