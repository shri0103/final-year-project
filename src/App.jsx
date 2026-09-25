import React, { useState, lazy, Suspense, useEffect } from 'react';
import {
  BrainCircuit, BarChart3, Layers, BookOpen,
  Activity, Sparkles, Loader2, ArrowUp
} from 'lucide-react';

const ReasoningSandbox       = lazy(() => import('./components/ReasoningSandbox'));
const BatchAnalytics         = lazy(() => import('./components/BatchAnalytics'));
const ContinualLearningStudio = lazy(() => import('./components/ContinualLearningStudio'));
const LiteratureBenchmarking = lazy(() => import('./components/LiteratureBenchmarking'));
const ArchitectureDiagram    = lazy(() => import('./components/ArchitectureDiagram'));

const NAV_ITEMS = [
  { id: 'sandbox',      label: 'Reasoning Sandbox',    icon: BrainCircuit, desc: 'Live emotion analysis', badge: true },
  { id: 'analytics',   label: 'Batch Analytics',       icon: BarChart3,    desc: 'Customer feed overview' },
  { id: 'continual',   label: 'Continual Learning',    icon: Layers,       desc: 'Lexicon adaptation' },
  { id: 'benchmarks',  label: 'Literature & Baselines',icon: BookOpen,     desc: 'Model comparisons' },
  { id: 'architecture',label: 'Pipeline Architecture', icon: Activity,     desc: 'System design' },
];

function Loader() {
  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-violet-600 p-px">
        <div className="w-full h-full bg-[var(--bg-surface)] rounded-xl flex items-center justify-center">
          <Loader2 className="w-5 h-5 text-teal-400 animate-spin" />
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-[var(--text-primary)]">Loading module…</p>
        <p className="text-xs text-[var(--text-muted)] mt-0.5">Initialising morphological weights</p>
      </div>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState(() => {
    const p = new URLSearchParams(window.location.search).get('tab');
    return NAV_ITEMS.find(n => n.id === p) ? p : 'sandbox';
  });
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [scrolled, setScrolled]   = useState(false);

  /* URL sync */
  useEffect(() => {
    const url = new URL(window.location);
    url.searchParams.set('tab', active);
    window.history.replaceState({}, '', url);
  }, [active]);

  /* Back-to-top trigger */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* 1-5 keyboard shortcuts */
  useEffect(() => {
    const map = ['sandbox','analytics','continual','benchmarks','architecture'];
    const onKey = e => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      const idx = parseInt(e.key, 10) - 1;
      if (idx >= 0 && idx < map.length) setActive(map[idx]);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleTabChange = id => {
    setActive(id);
    setMobileSidebarOpen(false);
  };

  const current = NAV_ITEMS.find(n => n.id === active);

  return (
    <div className="app-shell">

      {/* ── Topbar ─────────────────────────────────────── */}
      <header className="area-topbar topbar">
        {/* Logo */}
        <div
          className="flex items-center gap-2.5 cursor-pointer flex-shrink-0"
          onClick={() => handleTabChange('sandbox')}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 via-teal-400 to-violet-600 p-px flex-shrink-0">
            <div className="w-full h-full rounded-[7px] bg-[var(--bg-surface)] flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            </div>
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-black tracking-tight text-white">
              TAMIL<span className="text-teal-400">EMO</span><span className="text-violet-400">.AI</span>
            </div>
            <div className="text-[10px] text-[var(--text-muted)] font-medium">
              Morpho-Aware Emotion Reasoning
            </div>
          </div>
        </div>

        {/* Active tab breadcrumb */}
        <div className="flex-1 flex items-center gap-2 px-4">
          <span className="text-[var(--text-muted)] text-xs hidden md:inline">/</span>
          {current && (
            <span className="text-xs font-semibold text-[var(--text-secondary)] hidden md:inline">
              {current.label}
            </span>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 ml-auto">
          <span className="chip chip-green text-[10px] hidden sm:inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            v2.4 Live
          </span>
          {/* Mobile hamburger */}
          <button
            className="lg:hidden btn-secondary px-2.5 py-1.5 text-xs"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          >
            {mobileSidebarOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </header>

      {/* ── Sidebar (desktop) ──────────────────────────── */}
      <aside className="area-sidebar sidebar hidden lg:flex">
        <div className="px-3 mb-4 mt-2">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-muted)]">Navigation</p>
          <p className="text-[10px] text-[var(--text-muted)] mt-0.5">Press 1–5 to switch</p>
        </div>

        {NAV_ITEMS.map((item, idx) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <div className="flex flex-col items-start min-w-0">
                <span className="text-[13px] font-semibold leading-tight truncate w-full">{item.label}</span>
                <span className="text-[10px] text-[var(--text-muted)] truncate w-full">{item.desc}</span>
              </div>
              {item.badge && <span className="nav-badge" />}
            </button>
          );
        })}

        {/* Footer */}
        <div className="mt-auto px-3 pt-4 pb-2 border-t border-[var(--border-subtle)]">
          <p className="text-[10px] text-[var(--text-muted)] leading-relaxed">
            © 2026 TamilEmo.AI<br />
            Prakash & Vijay (2025)
          </p>
        </div>
      </aside>

      {/* ── Mobile sidebar overlay ──────────────────────── */}
      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="absolute top-14 left-0 bottom-0 w-64 sidebar animate-slide-in-left">
            {NAV_ITEMS.map(item => {
              const Icon = item.icon;
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <div className="flex flex-col items-start min-w-0">
                    <span className="text-[13px] font-semibold">{item.label}</span>
                    <span className="text-[10px] text-[var(--text-muted)]">{item.desc}</span>
                  </div>
                  {item.badge && <span className="nav-badge" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Main Content ────────────────────────────────── */}
      <main className="area-main overflow-y-auto bg-[var(--bg-base)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 tab-view" key={active}>
          <Suspense fallback={<Loader />}>
            {active === 'sandbox'      && <ReasoningSandbox />}
            {active === 'analytics'    && <BatchAnalytics />}
            {active === 'continual'    && <ContinualLearningStudio />}
            {active === 'benchmarks'   && <LiteratureBenchmarking />}
            {active === 'architecture' && <ArchitectureDiagram />}
          </Suspense>
        </div>
      </main>

      {/* ── Back-to-top ─────────────────────────────────── */}
      {scrolled && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-default)] text-teal-400 flex items-center justify-center hover:border-teal-500/50 hover:scale-110 transition-all z-50 shadow-lg"
          aria-label="Back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
