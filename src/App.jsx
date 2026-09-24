import React, { useState, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import { Sparkles, Loader2 } from 'lucide-react';

// Lazy load all major tab components for optimal bundle splitting
const ReasoningSandbox = lazy(() => import('./components/ReasoningSandbox'));
const BatchAnalytics = lazy(() => import('./components/BatchAnalytics'));
const ContinualLearningStudio = lazy(() => import('./components/ContinualLearningStudio'));
const LiteratureBenchmarking = lazy(() => import('./components/LiteratureBenchmarking'));
const ArchitectureDiagram = lazy(() => import('./components/ArchitectureDiagram'));

function ViewLoader() {
  return (
    <div className="glass-panel rounded-2xl p-12 border border-slate-800 flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-violet-600 p-0.5 shadow-lg shadow-emerald-500/20">
        <div className="w-full h-full bg-[#070a13] rounded-[14px] flex items-center justify-center">
          <Loader2 className="w-6 h-6 text-teal-400 animate-spin" />
        </div>
      </div>
      <div className="text-center space-y-1">
        <p className="text-sm font-bold text-slate-200 tracking-wide flex items-center justify-center space-x-1.5">
          <Sparkles className="w-4 h-4 text-teal-400 animate-pulse" />
          <span>Loading Neural Module...</span>
        </p>
        <p className="text-xs text-slate-500">Initializing dynamic morphological weights</p>
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('sandbox');

  return (
    <div className="min-h-screen bg-[#070a13] text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950 flex flex-col">
      {/* Header Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* Presentation Hero Header */}
      <HeroBanner 
        onTrySample={() => setActiveTab('sandbox')}
      />

      {/* Main Tabbed Views Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <Suspense fallback={<ViewLoader />}>
          {activeTab === 'sandbox' && <ReasoningSandbox />}
          {activeTab === 'analytics' && <BatchAnalytics />}
          {activeTab === 'continual' && <ContinualLearningStudio />}
          {activeTab === 'benchmarks' && <LiteratureBenchmarking />}
          {activeTab === 'architecture' && <ArchitectureDiagram />}
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#05070e] py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-slate-400">
            © 2026 TamilEmo AI System • Morphology-Aware Emotion Reasoning
          </div>
          <div className="text-teal-400 font-mono text-[11px] bg-slate-900/80 px-3 py-1 rounded-full border border-slate-800">
            Culturally Grounded Tamil Emotion Reasoning Framework
          </div>
        </div>
      </footer>
    </div>
  );
}

