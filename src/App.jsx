import React, { useState, lazy, Suspense, useEffect, useCallback } from 'react';
import {
  BrainCircuit, BarChart3, Layers, BookOpen,
  Activity, Sparkles, ArrowUp, Menu, X
} from 'lucide-react';

const ReasoningSandbox        = lazy(() => import('./components/ReasoningSandbox'));
const BatchAnalytics          = lazy(() => import('./components/BatchAnalytics'));
const ContinualLearningStudio = lazy(() => import('./components/ContinualLearningStudio'));
const LiteratureBenchmarking  = lazy(() => import('./components/LiteratureBenchmarking'));
const ArchitectureDiagram     = lazy(() => import('./components/ArchitectureDiagram'));

const NAV_ITEMS = [
  { id: 'sandbox',      label: 'Reasoning Sandbox',     icon: BrainCircuit, desc: 'Live emotion analysis',  badge: true  },
  { id: 'analytics',   label: 'Batch Analytics',        icon: BarChart3,    desc: 'Customer feed overview'              },
  { id: 'continual',   label: 'Continual Learning',     icon: Layers,       desc: 'Lexicon adaptation'                  },
  { id: 'benchmarks',  label: 'Literature & Baselines', icon: BookOpen,     desc: 'Model comparisons'                   },
  { id: 'architecture',label: 'Pipeline Architecture',  icon: Activity,     desc: 'System design'                       },
];

/* ── Skeleton loader ─────────────────────────────────────── */
function SkeletonBlock({ className = '' }) {
  return (
    <div className={`rounded-xl bg-[var(--bg-elevated)] animate-pulse ${className}`} />
  );
}

function TabSkeleton() {
  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <SkeletonBlock className="h-7 w-56" />
        <SkeletonBlock className="h-4 w-96 max-w-full" />
      </div>
      {/* Stat cards row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="stat-card space-y-3">
            <SkeletonBlock className="h-3 w-24" />
            <SkeletonBlock className="h-8 w-20" />
            <SkeletonBlock className="h-3 w-32" />
          </div>
        ))}
      </div>
      {/* Two column blocks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="card p-5 space-y-3">
          <SkeletonBlock className="h-5 w-32" />
          <SkeletonBlock className="h-32" />
          <SkeletonBlock className="h-9" />
        </div>
        <div className="card p-5 space-y-3">
          <SkeletonBlock className="h-5 w-40" />
          <SkeletonBlock className="h-24" />
          <SkeletonBlock className="h-24" />
        </div>
      </div>
      {/* Full-width block */}
      <div className="card p-5 space-y-3">
        <SkeletonBlock className="h-5 w-48" />
        <SkeletonBlock className="h-40" />
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
  const [scrolled, setScrolled] = useState(false);

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

  /* 1–5 keyboard shortcuts */
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

  const handleTabChange = useCallback(id => {
    setActive(id);
    setMobileSidebarOpen(false);
  }, []);

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
            <div className="text-sm font-black tracking-tight text-white leading-tight">
              TAMIL<span className="text-teal-400">EMO</span><span className="text-violet-400">.AI</span>
            </div>
            <div className="text-[10px] text-[var(--text-muted)] font-medium leading-tight">
              Morpho-Aware Emotion Reasoning
            </div>
          </div>
        </div>

        {/* Active tab breadcrumb — visible on mobile too */}
        <div className="flex items-center gap-2 px-3 flex-1 min-w-0">
          <span className="text-[var(--text-muted)] text-xs hidden sm:inline">/</span>
          {current && (
            <div className="flex items-center gap-1.5 min-w-0">
              {React.createElement(current.icon, { className: 'w-3.5 h-3.5 text-teal-400 flex-shrink-0' })}
              <span className="text-sm font-semibold text-[var(--text-primary)] truncate">
                {current.label}
              </span>
            </div>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 ml-auto flex-shrink-0">
          <span className="chip chip-green text-[10px] hidden sm:inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            v2.4 Live
          </span>
          {/* Mobile hamburger */}
          <button
            className="lg:hidden btn-secondary px-2.5 py-1.5 text-xs"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            aria-label="Toggle menu"
          >
            {mobileSidebarOpen
              ? <X className="w-4 h-4" />
              : <Menu className="w-4 h-4" />
            }
          </button>
        </div>
      </header>

      {/* ── Sidebar (desktop) ──────────────────────────── */}
      <aside className="area-sidebar sidebar hidden lg:flex">
        <div className="px-3 mb-3 mt-1">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-muted)]">Navigation</p>
          <p className="text-[10px] text-[var(--text-muted)] mt-0.5 opacity-70">Press 1–5 to switch tabs</p>
        </div>

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
                <span className="text-[13px] font-semibold leading-tight truncate w-full">{item.label}</span>
                <span className="text-[10px] text-[var(--text-muted)] truncate w-full">{item.desc}</span>
              </div>
              {item.badge && <span className="nav-badge" />}
            </button>
          );
        })}

        {/* Sidebar footer */}
        <div className="mt-auto px-3 pt-4 pb-3 border-t border-[var(--border-subtle)]">
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
          <Suspense fallback={<TabSkeleton />}>
            {active === 'sandbox'       && <ReasoningSandbox />}
            {active === 'analytics'     && <BatchAnalytics />}
            {active === 'continual'     && <ContinualLearningStudio />}
            {active === 'benchmarks'    && <LiteratureBenchmarking />}
            {active === 'architecture'  && <ArchitectureDiagram />}
          </Suspense>
        </div>

        {/* ── Footer ────────────────────────────────────── */}
        <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] mt-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <p className="text-xs font-semibold text-[var(--text-secondary)]">
                TamilEmo.AI — Morphology-Aware Tamil Emotion Reasoning System
              </p>
              <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                Final Year Project · B.E. Computer Science · 2025–2026
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-end">
              <span className="chip chip-teal text-[10px]">Prakash & Vijay (2025)</span>
              <span className="chip chip-violet text-[10px]">Morpho-Aware v2.4</span>
              <span className="chip chip-slate text-[10px]">© 2026</span>
            </div>
          </div>
        </footer>
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
