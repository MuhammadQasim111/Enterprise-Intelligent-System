
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Bell, 
  DollarSign, 
  BarChart3, 
  ShieldAlert, 
  Database, 
  History, 
  Settings,
  Search,
  ChevronDown,
  X,
  Loader2,
  Mail,
  Trash2,
  Plus
} from 'lucide-react';
import { usePlatform } from '../App';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { state, searchResult, isSearching, performSearch, clearSearch, recipients, addRecipient, removeRecipient } = usePlatform();
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [newEmail, setNewEmail] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) performSearch(query);
  };

  const navItems = [
    { label: 'Executive Overview', icon: LayoutDashboard, path: '/' },
    { label: 'Alerts', icon: Bell, path: '/alerts', badge: state.alerts.filter(a => a.status === 'Email Sent' || a.status === 'Triggered').length },
    { label: 'Finance', icon: DollarSign, path: '/finance' },
    { label: 'Simulations', icon: BarChart3, path: '/simulations' },
    { label: 'Model Health', icon: Database, path: '/models' },
    { label: 'Audit Log', icon: History, path: '/audit' },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col z-20">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">EIP</span>
            </div>
            <span className="font-bold tracking-tight text-slate-900">INTEL SYSTEM</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center justify-between px-3 py-2 rounded-md transition-colors ${
                location.pathname === item.path 
                ? 'bg-slate-100 text-slate-900 font-medium' 
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} />
                <span className="text-sm">{item.label}</span>
              </div>
              {item.badge ? (
                <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                  {item.badge}
                </span>
              ) : null}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200">
          <button onClick={() => setShowSettings(!showSettings)} className="w-full flex items-center gap-3 px-3 py-2 text-slate-500 hover:text-slate-900 text-sm">
            <Settings size={18} />
            <span>Alert Settings</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-50">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 sticky top-0 z-10">
          <div className="flex items-center gap-6 flex-1">
            <form onSubmit={handleSearch} className="relative w-full max-w-xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask Intelligence (e.g., Why is CAC increasing?)"
                className="w-full pl-10 pr-10 py-2 bg-slate-100 border-none rounded-md text-sm focus:ring-2 focus:ring-slate-900 transition-all outline-none"
              />
              {isSearching && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-slate-400" size={16} />}
              {!isSearching && query && <X onClick={() => {setQuery(''); clearSearch();}} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-slate-900" size={16} />}
            </form>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200">
              <div className={`w-2 h-2 rounded-full animate-pulse ${
                state.systemStatus === 'healthy' ? 'bg-emerald-500' : 
                state.systemStatus === 'warning' ? 'bg-amber-500' : 'bg-red-500'
              }`} />
              <span className="text-xs font-medium text-slate-600 uppercase tracking-wider">
                System: {state.systemStatus}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[10px] mono text-slate-400 font-medium">
              DATA FRESHNESS: {new Date(state.lastUpdate).toLocaleTimeString()}
            </span>
            <div className="h-4 w-[1px] bg-slate-200" />
            <div className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1 rounded transition-colors">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
                <img src="https://picsum.photos/32/32" alt="Avatar" />
              </div>
              <ChevronDown size={14} className="text-slate-400" />
            </div>
          </div>
        </header>

        {/* Intelligence Overlay */}
        {searchResult && (
          <div className="mx-8 mt-4 p-6 bg-slate-900 text-white rounded-lg shadow-2xl animate-in slide-in-from-top-4 duration-300 z-30 relative border border-slate-700">
            <button onClick={clearSearch} className="absolute top-4 right-4 text-slate-500 hover:text-white">
              <X size={20} />
            </button>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Live Analysis Generated</span>
            </div>
            <h4 className="text-lg font-bold mb-4 leading-snug">{searchResult.answer}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-800">
              <div>
                <span className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Supporting Metrics</span>
                <ul className="space-y-2">
                  {searchResult.supportingMetrics.map((m: string, i: number) => (
                    <li key={i} className="text-sm font-medium text-slate-300 flex items-center gap-2">
                      <div className="w-1 h-1 bg-slate-600 rounded-full" /> {m}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-6">
                <div>
                  <span className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Intelligence Confidence</span>
                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-black">{(searchResult.confidence * 100).toFixed(0)}%</span>
                    <div className="flex-1 h-1 bg-slate-800 rounded-full">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${searchResult.confidence * 100}%` }} />
                    </div>
                  </div>
                </div>
                {searchResult.suggestedAction && (
                  <div className="p-3 bg-slate-800 rounded border border-slate-700">
                    <span className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 text-emerald-400">Recommended Priority Action</span>
                    <p className="text-xs font-bold">{searchResult.suggestedAction}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Settings Overlay */}
        {showSettings && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-lg font-black tracking-tight flex items-center gap-2">
                  <Mail size={20} className="text-slate-400" /> Email Alert Recipients
                </h3>
                <button onClick={() => setShowSettings(false)} className="text-slate-400 hover:text-slate-900">
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                  {recipients.map(email => (
                    <div key={email} className="flex items-center justify-between p-3 bg-slate-50 rounded border border-slate-200">
                      <span className="text-sm font-medium">{email}</span>
                      <button onClick={() => removeRecipient(email)} className="text-slate-400 hover:text-red-600">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-slate-100 flex gap-2">
                  <input 
                    type="email" 
                    placeholder="add-executive@gmail.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-200 rounded text-sm outline-none focus:ring-2 focus:ring-slate-900"
                  />
                  <button 
                    onClick={() => { if(newEmail) { addRecipient(newEmail); setNewEmail(''); }}}
                    className="bg-slate-900 text-white px-4 py-2 rounded text-sm font-bold hover:bg-slate-800"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-100 text-[10px] text-slate-500 font-bold uppercase tracking-widest text-center">
                All alerts dispatched via Resend API protocol
              </div>
            </div>
          </div>
        )}

        {/* Safe Mode Banner */}
        {state.safeMode && (
          <div className="bg-red-600 text-white px-8 py-2 text-sm font-bold flex items-center gap-2 shrink-0">
            <ShieldAlert size={16} />
            <span>SAFE MODE ACTIVE — Prescriptive recommendations disabled. Founder notified via critical alert.</span>
          </div>
        )}

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-8 relative">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
