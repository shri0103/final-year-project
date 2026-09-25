import React, { useState } from 'react';
import { TAMIL_SAMPLE_FEEDBACK, EMOTION_TYPES } from '../data/tamilDataset';
import {
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend
} from 'recharts';
import {
  BarChart3, Search, Zap, AlertTriangle, CheckCircle2,
  TrendingUp, MessageSquare, Users, ShieldAlert, Flame, Download, Filter
} from 'lucide-react';

function StatCard({ icon: Icon, label, value, delta, color = 'text-[var(--text-primary)]', accent = 'text-teal-400' }) {
  return (
    <div className="stat-card">
      <div className="flex items-center justify-between mb-2">
        <span className="stat-label">{label}</span>
        <Icon className={`w-4 h-4 ${accent}`} />
      </div>
      <div className={`stat-value ${color}`}>{value}</div>
      {delta && (
        <div className={`stat-delta mt-2 ${delta.positive ? 'text-emerald-400' : 'text-red-400'}`}>
          <TrendingUp className="w-3 h-3" />
          {delta.text}
        </div>
      )}
    </div>
  );
}

const URGENCY_COLORS = { CRITICAL: '#f87171', HIGH: '#fbbf24', NORMAL: '#34d399' };

export default function BatchAnalytics() {
  const [searchQuery,       setSearchQuery]       = useState('');
  const [selectedChannel,   setSelectedChannel]   = useState('ALL');
  const [filterSarcasmOnly, setFilterSarcasmOnly] = useState(false);

  const filtered = TAMIL_SAMPLE_FEEDBACK.filter(item => {
    const q = searchQuery.toLowerCase();
    const matchSearch  = !q || item.text.toLowerCase().includes(q) ||
                         item.brand.toLowerCase().includes(q) ||
                         item.actualEmotion.toLowerCase().includes(q);
    const matchChannel = selectedChannel === 'ALL' || item.channel.includes(selectedChannel);
    const matchSarcasm = !filterSarcasmOnly || item.sarcasmDetected;
    return matchSearch && matchChannel && matchSarcasm;
  });

  /* Pie data — emotion distribution across all samples */
  const emotionCounts = {};
  TAMIL_SAMPLE_FEEDBACK.forEach(s => {
    const e = s.actualEmotion;
    emotionCounts[e] = (emotionCounts[e] || 0) + 1;
  });
  const pieData = Object.entries(emotionCounts).map(([name, value]) => ({
    name,
    value,
    color: (EMOTION_TYPES.find(t => t.key === name.toLowerCase() || t.label === name) || {}).color || '#64748b',
  }));

  return (
    <div className="space-y-5">

      {/* ── Page header ─────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <BarChart3 className="w-5 h-5 text-teal-400" />
          <h1 className="text-xl font-extrabold text-[var(--text-primary)]">Batch Analytics</h1>
        </div>
        <p className="text-sm text-[var(--text-secondary)]">
          Multi-channel Tamil customer feedback — live ingestion from Zomato, Swiggy, Amazon, YouTube, Telecom.
        </p>
      </div>

      {/* ── KPI row ─────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={MessageSquare} label="Total Feedback" value="1,428"
          delta={{ positive: true, text: '+14.2% today' }} accent="text-teal-400"
        />
        <StatCard
          icon={Zap} label="Sarcasm Flagged" value="312"
          color="text-pink-400" accent="text-pink-400"
          delta={{ positive: false, text: '21.8% misread by baseline' }}
        />
        <StatCard
          icon={ShieldAlert} label="Escalations Saved" value="89 Critical"
          color="text-amber-400" accent="text-amber-400"
          delta={{ positive: true, text: 'Prevented churn' }}
        />
        <StatCard
          icon={Flame} label="Accuracy Gain" value="+18.0%"
          color="text-violet-400" accent="text-violet-400"
          delta={{ positive: true, text: 'Over mBERT baseline' }}
        />
      </div>

      {/* ── Chart + Filter row ───────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Emotion distribution pie */}
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--border-subtle)]">
            <Flame className="w-4 h-4 text-violet-400" />
            <h3 className="text-sm font-bold text-[var(--text-primary)]">Emotion Distribution</h3>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData} cx="50%" cy="50%"
                  innerRadius={55} outerRadius={85}
                  paddingAngle={3} dataKey="value"
                >
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-default)',
                    borderRadius: 10, fontSize: 12,
                    color: 'var(--text-primary)'
                  }}
                  formatter={v => [v, 'cases']}
                />
                <Legend
                  iconType="circle" iconSize={8}
                  formatter={(v) => <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{v}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Search + Filters */}
        <div className="lg:col-span-2 card p-5">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--border-subtle)]">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-teal-400" />
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Filters</h3>
              <span className="chip chip-slate text-[10px]">{filtered.length} results</span>
            </div>
            <button
              onClick={() => alert('Exporting…')}
              className="btn-secondary text-[11px] py-1.5"
            >
              <Download className="w-3.5 h-3.5" /> Export CSV
            </button>
          </div>

          <div className="space-y-3">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search text, brand or emotion…"
                className="input-field pl-9 text-[12px]"
              />
            </div>

            {/* Channel + Sarcasm filter */}
            <div className="flex flex-wrap gap-3 items-center">
              <select
                value={selectedChannel}
                onChange={e => setSelectedChannel(e.target.value)}
                className="select-field w-auto flex-1 min-w-[160px]"
              >
                <option value="ALL">All Channels</option>
                <option value="Food Delivery">Food Delivery</option>
                <option value="E-Commerce">E-Commerce</option>
                <option value="Telecom">Telecom</option>
                <option value="FinTech">FinTech</option>
              </select>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={filterSarcasmOnly}
                  onChange={e => setFilterSarcasmOnly(e.target.checked)}
                  className="rounded bg-[var(--bg-base)] border-[var(--border-default)] accent-teal-500"
                />
                <span className="text-xs font-semibold text-pink-400">Sarcasm Only</span>
              </label>
            </div>

            {/* Urgency quick filter badges */}
            <div className="flex gap-2 flex-wrap pt-1">
              {['CRITICAL','HIGH','NORMAL'].map(u => {
                const count = TAMIL_SAMPLE_FEEDBACK.filter(s => s.urgency === u).length;
                return (
                  <button
                    key={u}
                    onClick={() => setSearchQuery(u.toLowerCase())}
                    className={`chip text-[10px] cursor-pointer transition-opacity hover:opacity-80 ${
                      u === 'CRITICAL' ? 'chip-red' : u === 'HIGH' ? 'chip-amber' : 'chip-green'
                    }`}
                  >
                    {u} · {count}
                  </button>
                );
              })}
              <button
                onClick={() => { setSearchQuery(''); setSelectedChannel('ALL'); setFilterSarcasmOnly(false); }}
                className="chip chip-slate text-[10px] cursor-pointer hover:opacity-80"
              >
                Clear filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Feedback records ─────────────────────────────── */}
      <div className="card overflow-hidden">
        <div className="px-5 pt-4 pb-3 border-b border-[var(--border-subtle)] flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-teal-400" />
          <h3 className="text-sm font-bold text-[var(--text-primary)]">Feedback Records</h3>
          <span className="chip chip-slate text-[10px] ml-auto">{filtered.length} entries</span>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Search className="w-8 h-8 text-[var(--text-muted)] mb-3" />
            <p className="text-sm font-semibold text-[var(--text-secondary)]">No results found</p>
            <p className="text-xs text-[var(--text-muted)]">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="divide-y divide-[var(--border-subtle)]">
            {filtered.map(item => (
              <div key={item.id} className="px-5 py-4 hover:bg-[var(--bg-elevated)] transition-colors">

                {/* Row header */}
                <div className="flex flex-wrap items-center gap-2 mb-2.5">
                  <span className="chip chip-teal text-[10px] font-bold">{item.brand}</span>
                  <span className="text-[11px] text-[var(--text-muted)]">{item.channel}</span>
                  <div className="ml-auto flex items-center gap-2">
                    {item.sarcasmDetected && (
                      <span className="chip chip-pink text-[10px]">
                        <Zap className="w-3 h-3" /> Sarcasm
                      </span>
                    )}
                    <span className={`chip text-[10px] ${
                      item.urgency === 'CRITICAL' ? 'chip-red' :
                      item.urgency === 'HIGH' ? 'chip-amber' : 'chip-green'
                    }`}>{item.urgency}</span>
                  </div>
                </div>

                {/* Tamil text */}
                <p className="text-sm font-tamil text-[var(--text-primary)] leading-relaxed mb-1">
                  "{item.text}"
                </p>
                <p className="text-[11px] text-[var(--text-muted)] italic mb-3">{item.transliteration}</p>

                {/* Baseline vs Ours */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-red-500/5 border border-red-500/15 rounded-lg p-2.5 flex items-start gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-[9px] font-bold text-red-400 uppercase mb-0.5">Baseline Fail</div>
                      <div className="text-xs font-semibold text-[var(--text-secondary)]">
                        {item.baselineResult.predictedEmotion}
                      </div>
                    </div>
                  </div>
                  <div className="bg-teal-500/5 border border-teal-500/15 rounded-lg p-2.5 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-[9px] font-bold text-teal-400 uppercase mb-0.5">Our Model ({item.confidence}%)</div>
                      <div className="text-xs font-semibold text-[var(--text-secondary)]">
                        {item.ourModelResult.predictedEmotion}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
