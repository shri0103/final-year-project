import React, { useState } from 'react';
import { BASE_PAPERS, BENCHMARK_METRICS, MODEL_COMPARISON_CHART_DATA } from '../data/basePapers';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  Tooltip, Legend, CartesianGrid
} from 'recharts';
import {
  BookOpen, Award, CheckCircle2, XCircle,
  BarChart2, ShieldCheck, ChevronRight, ChevronDown
} from 'lucide-react';

export default function LiteratureBenchmarking() {
  const [activePaperId, setActivePaperId]   = useState(BASE_PAPERS[0].id);
  const [paperListOpen, setPaperListOpen]   = useState(false);

  const active = BASE_PAPERS.find(p => p.id === activePaperId) || BASE_PAPERS[0];

  return (
    <div className="space-y-5">

      {/* ── Page header ─────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <BookOpen className="w-5 h-5 text-teal-400" />
          <h1 className="text-xl font-extrabold text-[var(--text-primary)]">Literature & Baselines</h1>
          <span className="chip chip-amber ml-1">
            <Award className="w-3 h-3" /> Prakash & Vijay (2025)
          </span>
        </div>
        <p className="text-sm text-[var(--text-secondary)]">
          Rigorous benchmarking against 10 peer-reviewed journals — IEEE Access, Springer, Expert Systems.
        </p>
      </div>

      {/* ── Primary base paper spotlight ────────────────── */}
      <div className="card-teal p-5 rounded-2xl space-y-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-teal-400 mb-2 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" /> Primary Base Paper
            </div>
            <h2 className="text-base font-bold text-[var(--text-primary)] leading-snug max-w-xl">
              "{BASE_PAPERS[0].title}"
            </h2>
            <div className="text-xs text-[var(--text-secondary)] mt-1.5">
              <span className="text-teal-400 font-semibold">{BASE_PAPERS[0].authors}</span>
              {' '}• {BASE_PAPERS[0].journal} ({BASE_PAPERS[0].year})
            </div>
          </div>
          <div className="chip chip-slate text-[11px] font-mono flex-shrink-0">
            DOI: 10.1007/s10579-024-09804-1
          </div>
        </div>

        <p className="text-xs text-[var(--text-secondary)] leading-relaxed bg-[var(--bg-base)] p-3.5 rounded-xl border border-[var(--border-subtle)]">
          <span className="text-teal-400 font-semibold">Proposed Framework: </span>
          {BASE_PAPERS[0].proposedFramework}. {BASE_PAPERS[0].keyFeatures}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-red-500/5 border border-red-500/15 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-red-400">
              <XCircle className="w-3.5 h-3.5" /> Limitations Identified
            </div>
            <ul className="space-y-1">
              {BASE_PAPERS[0].limitationsIdentified.map((lim, idx) => (
                <li key={idx} className="text-[11px] text-[var(--text-secondary)] flex items-start gap-1.5">
                  <span className="text-red-400 mt-0.5 flex-shrink-0">•</span> {lim}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-teal-500/5 border border-teal-500/15 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-teal-400">
              <CheckCircle2 className="w-3.5 h-3.5" /> How Our Model Solves It
            </div>
            <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
              {BASE_PAPERS[0].howOurModelImproves}
            </p>
          </div>
        </div>
      </div>

      {/* ── Benchmark charts + metrics table ────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* Bar chart */}
        <div className="lg:col-span-7 card p-5">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--border-subtle)]">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-teal-400" />
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Model Comparison</h3>
            </div>
            <span className="text-[11px] text-[var(--text-muted)] font-mono">% Higher is Better</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MODEL_COMPARISON_CHART_DATA} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis
                  dataKey="name" stroke="transparent"
                  tick={{ fontSize: 10, fill: '#8b9eb5' }} interval={0} angle={-15} textAnchor="end"
                />
                <YAxis domain={[0, 100]} stroke="transparent" tick={{ fontSize: 11, fill: '#8b9eb5' }} />
                <Tooltip
                  contentStyle={{
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-default)',
                    borderRadius: 10, fontSize: 12, color: 'var(--text-primary)'
                  }}
                  formatter={v => [`${v}%`]}
                />
                <Legend
                  wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
                  formatter={v => <span style={{ color: 'var(--text-secondary)' }}>{v}</span>}
                />
                <Bar dataKey="Accuracy"         fill="#38bdf8" name="Overall Accuracy"      radius={[5,5,0,0]} />
                <Bar dataKey="SarcasmF1"        fill="#ec4899" name="Sarcasm F1-Score"      radius={[5,5,0,0]} />
                <Bar dataKey="SuffixRobustness" fill="#a855f7" name="Morphological Parsing" radius={[5,5,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Metrics table */}
        <div className="lg:col-span-5 card overflow-hidden">
          <div className="px-5 pt-4 pb-3 border-b border-[var(--border-subtle)] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-[var(--text-primary)]">Quantitative Matrix</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>XLM-R</th>
                  <th>IMSD 2025</th>
                  <th className="text-teal-400">Ours ✓</th>
                </tr>
              </thead>
              <tbody>
                {BENCHMARK_METRICS.map((row, idx) => (
                  <tr key={idx}>
                    <td className="font-semibold text-[var(--text-primary)]">{row.metric}</td>
                    <td className="text-[var(--text-muted)]">{row.baselineXLM}</td>
                    <td className="text-violet-400">{row.basePaperIMSD}</td>
                    <td className="font-bold text-teal-400">{row.ourModel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── All papers list (collapsible) ───────────────── */}
      {BASE_PAPERS.length > 1 && (
        <div className="card overflow-hidden">
          <button
            onClick={() => setPaperListOpen(!paperListOpen)}
            className="w-full px-5 py-3.5 flex items-center gap-2 hover:bg-[var(--bg-elevated)] transition-colors text-left"
          >
            <BookOpen className="w-4 h-4 text-teal-400" />
            <span className="text-sm font-bold text-[var(--text-primary)]">
              All Reference Papers ({BASE_PAPERS.length})
            </span>
            {paperListOpen
              ? <ChevronDown className="w-4 h-4 text-[var(--text-muted)] ml-auto" />
              : <ChevronRight className="w-4 h-4 text-[var(--text-muted)] ml-auto" />
            }
          </button>

          {paperListOpen && (
            <div className="border-t border-[var(--border-subtle)] divide-y divide-[var(--border-subtle)]">
              {BASE_PAPERS.map(paper => (
                <button
                  key={paper.id}
                  onClick={() => setActivePaperId(paper.id)}
                  className={`w-full px-5 py-3 text-left hover:bg-[var(--bg-elevated)] transition-colors flex items-start gap-3 ${
                    activePaperId === paper.id ? 'bg-teal-500/5' : ''
                  }`}
                >
                  {activePaperId === paper.id && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 mt-0.5 flex-shrink-0" />
                  )}
                  <div className={activePaperId === paper.id ? '' : 'ml-5'}>
                    <div className="text-xs font-semibold text-[var(--text-primary)] leading-snug">{paper.title}</div>
                    <div className="text-[11px] text-[var(--text-muted)]">
                      {paper.authors} • {paper.journal} ({paper.year})
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
