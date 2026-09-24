import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Sparkles, 
  BarChart3, 
  Layers, 
  BookOpen, 
  Activity, 
  Menu,
  X,
  ShieldCheck
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'sandbox', label: 'Reasoning Sandbox', icon: BrainCircuit },
    { id: 'analytics', label: 'Batch Customer Feed', icon: BarChart3 },
    { id: 'continual', label: 'Continual Learning', icon: Layers },
    { id: 'benchmarks', label: 'Literature & Baselines', icon: BookOpen },
    { id: 'architecture', label: 'Pipeline Architecture', icon: Activity },
  ];

  const handleTabClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#070a13]/85 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group" 
            onClick={() => handleTabClick('sandbox')}
          >
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-violet-600 p-0.5 shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#070a13] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-teal-400 animate-pulse" />
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg tracking-tight text-white font-sans">
                  TAMIL<span className="text-teal-400">EMO</span><span className="text-violet-400">.AI</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-700/50">
                  <ShieldCheck className="w-3 h-3 mr-1 text-emerald-400" /> Morpho-Aware v2.4
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden md:block">
                Culturally Grounded Tamil Emotion Reasoning System
              </p>
            </div>
          </div>

          {/* Desktop Nav Items - Clean, Uncluttered */}
          <nav className="hidden lg:flex items-center space-x-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800/80">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500/15 via-teal-500/15 to-violet-500/15 text-teal-300 border border-teal-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-teal-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Actions & Mobile Toggle */}
          <div className="flex items-center space-x-3">
            {/* Mobile menu hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-[#070a13] px-4 py-3 space-y-2 animate-in slide-in-from-top duration-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-teal-950 to-slate-900 text-teal-300 border border-teal-700/60'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-teal-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
