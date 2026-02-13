import * as React from 'react';
import { useState } from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Line
} from 'recharts';
import { Play, History, Info, RefreshCcw, ShieldCheck } from 'lucide-react';
import { usePlatform } from '../App';
import { runSimulation } from '@/services/grokService';

const SimulationConsole: React.FC = () => {
  const { state } = usePlatform();
  const [budgetShift, setBudgetShift] = useState(15);
  const [targetCac, setTargetCac] = useState(380);
  const [simulating, setSimulating] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleRunSimulation = async () => {
    setSimulating(true);
    try {
      const simData = await runSimulation({
        marketingBudgetShift: budgetShift,
        cacTarget: targetCac,
        currentKpis: state.kpis
      });
      setResults(simData);
    } catch (e) {
      console.error(e);
    } finally {
      setSimulating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Intelligence Simulation Console</h1>
          <p className="text-sm text-slate-500">Model behavior prediction using Grok Intelligence Engine assumptions.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-md text-sm font-bold text-slate-600 hover:bg-white transition-colors">
            <History size={16} /> Load Snapshot
          </button>
          <button
            onClick={handleRunSimulation}
            disabled={simulating}
            className="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white rounded-md text-sm font-bold hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50"
          >
            {simulating ? <RefreshCcw size={16} className="animate-spin" /> : <Play size={16} />}
            Run Monte Carlo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Assumptons Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h5 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-6 border-b border-slate-50 pb-2">Primary Drivers</h5>

            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-xs font-bold text-slate-700">Marketing Budget Shift</label>
                  <span className="text-xs font-mono font-bold bg-slate-100 px-2 py-0.5 rounded">+{budgetShift}%</span>
                </div>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  value={budgetShift}
                  onChange={(e) => setBudgetShift(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-900"
                />
                <div className="flex justify-between mt-2 text-[10px] text-slate-400 font-bold uppercase">
                  <span>-50% Cut</span>
                  <span>+50% Aggressive</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-xs font-bold text-slate-700">Target CAC Ceiling</label>
                  <span className="text-xs font-mono font-bold bg-slate-100 px-2 py-0.5 rounded">${targetCac}</span>
                </div>
                <input
                  type="range"
                  min="300"
                  max="600"
                  value={targetCac}
                  onChange={(e) => setTargetCac(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-900"
                />
                <div className="flex justify-between mt-2 text-[10px] text-slate-400 font-bold uppercase">
                  <span>Efficient</span>
                  <span>Growth Priority</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-lg p-6">
            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Sim Info</h5>
            <div className="space-y-4">
              <div>
                <span className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Engine Version</span>
                <span className="text-xs font-bold">V-Sim-Grok-Llama-3.1</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Iteration Count</span>
                <span className="text-xs font-bold">10,000 Paths</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results Workspace */}
        <div className="lg:col-span-3 space-y-8">
          <div className="bg-white border border-slate-200 rounded-lg p-8 relative overflow-hidden">
            {simulating && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px] z-10 flex items-center justify-center flex-col">
                <RefreshCcw className="animate-spin text-slate-900 mb-2" />
                <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-900">Synchronizing Model Layers...</span>
              </div>
            )}

            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-black text-slate-900 tracking-tight">Projected Revenue Delta</h3>
                <p className="text-xs text-slate-500">90-day trajectory based on intelligence modeling.</p>
              </div>
              {results && (
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-slate-200" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Baseline</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-slate-900" />
                    <span className="text-[10px] font-bold text-slate-900 uppercase">Scenario Alpha</span>
                  </div>
                </div>
              )}
            </div>

            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={results?.timeSeries || []}>
                  <defs>
                    <linearGradient id="colorProj" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0f172a" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#0f172a" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 'bold' }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 'bold' }}
                    tickFormatter={(val) => `$${val}M`}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="projection"
                    stroke="#0f172a"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorProj)"
                    animationDuration={1500}
                  />
                  <Line
                    type="monotone"
                    dataKey="current"
                    stroke="#cbd5e1"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
              {!results && !simulating && (
                <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm italic">
                  Run simulation to visualize projected executive outcomes.
                </div>
              )}
            </div>
          </div>

          {results && (
            <div className="grid grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="bg-white p-6 border border-slate-200 rounded-lg">
                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Net Expected Revenue</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-emerald-600">+${results.projectedRevenue}M</span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 uppercase">{results.riskLevel || 'SECURE'}</span>
                </div>
              </div>
              <div className="bg-white p-6 border border-slate-200 rounded-lg">
                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Confidence Interval</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-900">{results.confidenceInterval}</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">P-VALUE 0.04</span>
                </div>
              </div>
              <div className="bg-white p-6 border border-slate-200 rounded-lg">
                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Simulated Outcome</span>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-emerald-500" />
                  <span className="text-sm font-bold text-slate-900">Deterministic Path Found</span>
                </div>
              </div>
            </div>
          )}

          {results && (
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 flex items-start gap-4 animate-in fade-in duration-700">
              <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center shrink-0">
                <Info className="text-white" size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1 tracking-tight uppercase tracking-wider">Intelligence Assessment</h4>
                <p className="text-sm text-slate-600 leading-relaxed italic">
                  "{results.assessment}"
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimulationConsole;
