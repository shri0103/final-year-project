import React, { useState } from 'react';
import { INITIAL_SLANG_LEXICON, MORPHOLOGICAL_SUFFIX_RULES, CONTINUAL_LEARNING_STATS } from '../data/lexiconData';
import {
  Layers, Plus, RefreshCw, CheckCircle2, Database,
  ShieldCheck, TrendingUp, BookOpen, Sparkles, Zap, Trash2
} from 'lucide-react';

function StatCard({ label, value, sub, color = 'text-teal-400' }) {
  return (
    <div className="stat-card">
      <div className="stat-label">{label}</div>
      <div className={`stat-value ${color}`}>{value}</div>
      <div className="text-[11px] text-[var(--text-muted)] mt-1">{sub}</div>
    </div>
  );
}

const POLARITY_COLORS = {
  'High Frustration': 'chip-red',
  'Sarcasm Marker':   'chip-pink',
  'Extremely Negative': 'chip-red',
  'High Delight':     'chip-green',
  'Disappointment':   'chip-amber',
};

export default function ContinualLearningStudio() {
  const [lexiconList, setLexiconList] = useState(INITIAL_SLANG_LEXICON);
  const [newTerm,      setNewTerm]     = useState('');
  const [newMeaning,   setNewMeaning]  = useState('');
  const [newSentiment, setNewSentiment]= useState('High Frustration');
  const [isAdapting,   setIsAdapting]  = useState(false);
  const [lastAdded,    setLastAdded]   = useState(null);

  const handleAdd = e => {
    e.preventDefault();
    if (!newTerm.trim()) return;
    const item = {
      term: newTerm.trim(),
      category: 'User Added Slang',
      sentiment: newSentiment,
      meaning: newMeaning || 'Newly observed colloquial expression',
      addedInEpoch: 'Live Session',
      memoryWeight: 0.95,
    };
    setLexiconList([item, ...lexiconList]);
    setLastAdded(item.term);
    setNewTerm(''); setNewMeaning('');
    setIsAdapting(true);
    setTimeout(() => { setIsAdapting(false); setLastAdded(null); }, 1200);
  };

  const handleRemove = idx => setLexiconList(list => list.filter((_, i) => i !== idx));

  return (
    <div className="space-y-5">

      {/* ── Page header ─────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Layers className="w-5 h-5 text-violet-400" />
          <h1 className="text-xl font-extrabold text-[var(--text-primary)]">Continual Learning Studio</h1>
          <span className="chip chip-violet ml-1">EWC Active</span>
        </div>
        <p className="text-sm text-[var(--text-secondary)]">
          Dynamic vocabulary expansion with Elastic Weight Consolidation — learn new Tamil slang without catastrophic forgetting.
        </p>
      </div>

      {/* ── KPI stats ───────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Active Lexicon"
          value={`${lexiconList.length + 14810}`}
          sub="Dynamic vocabulary buffer"
          color="text-teal-400"
        />
        <StatCard
          label="EWC Penalty λ"
          value={CONTINUAL_LEARNING_STATS.ewcPenaltyLambda}
          sub="Fisher information weight"
          color="text-violet-400"
        />
        <StatCard
          label="Replay Capacity"
          value={CONTINUAL_LEARNING_STATS.replayBufferCapacity}
          sub="Synthetic augmented pairs"
          color="text-emerald-400"
        />
        <StatCard
          label="Adaptation Epochs"
          value={`${CONTINUAL_LEARNING_STATS.adaptationEpochs}`}
          sub="Zero full retrain required"
          color="text-amber-400"
        />
      </div>

      {/* ── Main split ──────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

        {/* LEFT: Form + Suffix rules */}
        <div className="lg:col-span-2 space-y-4">

          {/* Add term form */}
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--border-subtle)]">
              <Plus className="w-4 h-4 text-teal-400" />
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Inject New Slang</h3>
            </div>

            <form onSubmit={handleAdd} className="space-y-3">
              <div>
                <label className="form-label">Tamil Word / Phrase</label>
                <input
                  type="text" value={newTerm}
                  onChange={e => setNewTerm(e.target.value)}
                  placeholder="e.g. செம மாஸ், வேஸ்ட் டா…"
                  className="input-field font-tamil"
                  required
                />
              </div>
              <div>
                <label className="form-label">Cultural Meaning</label>
                <input
                  type="text" value={newMeaning}
                  onChange={e => setNewMeaning(e.target.value)}
                  placeholder="e.g. Slang for severe performance lag"
                  className="input-field"
                />
              </div>
              <div>
                <label className="form-label">Emotion Polarity</label>
                <select
                  value={newSentiment}
                  onChange={e => setNewSentiment(e.target.value)}
                  className="select-field"
                >
                  <option>High Frustration</option>
                  <option>Sarcasm Marker</option>
                  <option>Extremely Negative</option>
                  <option>High Delight</option>
                  <option>Disappointment</option>
                </select>
              </div>

              <button type="submit" disabled={isAdapting} className="btn-primary w-full justify-center">
                {isAdapting
                  ? <><RefreshCw className="w-4 h-4 animate-spin" /> Consolidating EWC weights…</>
                  : <><Sparkles className="w-4 h-4" /> Adapt Model (Zero Retrain)</>
                }
              </button>

              {lastAdded && (
                <div className="flex items-center gap-2 text-xs text-emerald-400 animate-fade-in">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>"{lastAdded}" added to active lexicon</span>
                </div>
              )}
            </form>
          </div>

          {/* Suffix rules */}
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--border-subtle)]">
              <BookOpen className="w-4 h-4 text-violet-400" />
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Agglutinative Suffix Rules</h3>
            </div>
            <div className="space-y-2.5">
              {MORPHOLOGICAL_SUFFIX_RULES.map((rule, idx) => (
                <div key={idx} className="card-elevated rounded-xl p-3 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-teal-400 font-mono">{rule.suffix}</span>
                    <span className="text-[10px] text-[var(--text-muted)]">{rule.function}</span>
                  </div>
                  <div className="text-[var(--text-primary)] font-tamil mb-0.5">{rule.example}</div>
                  <div className="text-[11px] text-violet-400">{rule.emotionImpact}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Lexicon table */}
        <div className="lg:col-span-3 card overflow-hidden">
          <div className="px-5 pt-4 pb-3 border-b border-[var(--border-subtle)] flex items-center gap-2">
            <Database className="w-4 h-4 text-teal-400" />
            <h3 className="text-sm font-bold text-[var(--text-primary)]">Active Slang Lexicon</h3>
            <span className="chip chip-slate text-[10px] ml-auto">{lexiconList.length} custom entries</span>
          </div>

          <div className="overflow-x-auto max-h-[420px] overflow-y-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Term</th>
                  <th>Category</th>
                  <th>Polarity</th>
                  <th>Meaning</th>
                  <th className="text-right">Retention</th>
                </tr>
              </thead>
              <tbody>
                {lexiconList.map((item, idx) => (
                  <tr key={idx} className="group">
                    <td className="font-bold text-violet-400 font-tamil text-sm">{item.term}</td>
                    <td>
                      <span className="chip chip-slate text-[10px] font-mono">{item.category}</span>
                    </td>
                    <td>
                      <span className={`chip text-[10px] ${POLARITY_COLORS[item.sentiment] || 'chip-slate'}`}>
                        {item.sentiment}
                      </span>
                    </td>
                    <td className="text-[11px] text-[var(--text-secondary)] max-w-[160px] truncate">
                      {item.meaning}
                    </td>
                    <td className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-emerald-400 font-mono font-bold text-xs">
                          {(item.memoryWeight * 100).toFixed(0)}%
                        </span>
                        <button
                          onClick={() => handleRemove(idx)}
                          className="opacity-0 group-hover:opacity-100 text-[var(--text-muted)] hover:text-red-400 transition-all"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
