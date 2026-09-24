import React, { useState } from 'react';
import { INITIAL_SLANG_LEXICON, MORPHOLOGICAL_SUFFIX_RULES, CONTINUAL_LEARNING_STATS } from '../data/lexiconData';
import { 
  Layers, 
  Plus, 
  RefreshCw, 
  CheckCircle2, 
  Database, 
  ShieldCheck, 
  TrendingUp, 
  BrainCircuit, 
  BookOpen, 
  Sparkles,
  Zap
} from 'lucide-react';

export default function ContinualLearningStudio() {
  const [lexiconList, setLexiconList] = useState(INITIAL_SLANG_LEXICON);
  const [newTerm, setNewTerm] = useState('');
  const [newMeaning, setNewMeaning] = useState('');
  const [newSentiment, setNewSentiment] = useState('High Frustration');
  const [isAdapting, setIsAdapting] = useState(false);

  const handleAddTerm = (e) => {
    e.preventDefault();
    if (!newTerm.trim()) return;

    const newItem = {
      term: newTerm.trim(),
      category: "User Added Slang",
      sentiment: newSentiment,
      meaning: newMeaning || "Newly observed colloquial expression",
      addedInEpoch: "Live Session",
      memoryWeight: 0.95
    };

    setLexiconList([newItem, ...lexiconList]);
    setNewTerm('');
    setNewMeaning('');
    
    // Simulate Continual Adaptation step
    setIsAdapting(true);
    setTimeout(() => {
      setIsAdapting(false);
    }, 800);
  };

  return (
    <div className="space-y-8">
      {/* Studio Header */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <Layers className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-extrabold text-white">Continual Adaptation & Lexicon Studio</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Dynamic vocabulary expansion using Elastic Weight Consolidation (EWC) to learn evolving Tamil youth slang without catastrophic forgetting.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-950 text-purple-300 border border-purple-800/60 flex items-center space-x-1">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>Catastrophic Protection: {CONTINUAL_LEARNING_STATS.catastrophicForgettingProtection}</span>
            </span>
          </div>
        </div>

        {/* EWC Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
            <div className="text-[11px] text-slate-400 font-semibold uppercase">Active Lexicon Size</div>
            <div className="text-xl font-extrabold text-cyan-400">{lexiconList.length + 14810} Words</div>
            <div className="text-[10px] text-slate-400">Dynamic vocabulary buffer</div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
            <div className="text-[11px] text-slate-400 font-semibold uppercase">EWC Penalty Lambda (λ)</div>
            <div className="text-xl font-extrabold text-purple-400">{CONTINUAL_LEARNING_STATS.ewcPenaltyLambda}</div>
            <div className="text-[10px] text-slate-400">Fisher information matrix weight</div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
            <div className="text-[11px] text-slate-400 font-semibold uppercase">Memory Replay Capacity</div>
            <div className="text-xl font-extrabold text-emerald-400">{CONTINUAL_LEARNING_STATS.replayBufferCapacity}</div>
            <div className="text-[10px] text-slate-400">Synthetically augmented pairs</div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
            <div className="text-[11px] text-slate-400 font-semibold uppercase">Adaptation Epochs</div>
            <div className="text-xl font-extrabold text-amber-400">{CONTINUAL_LEARNING_STATS.adaptationEpochs} Updates</div>
            <div className="text-[10px] text-slate-400">Zero full retrain requirement</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Add New Slang Form & Lexicon Manager */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Form & Suffix Rules (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Add Slang Form */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Plus className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base font-bold text-white">Inject New Tamil Slang / Code-Mix</h3>
            </div>

            <form onSubmit={handleAddTerm} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Tamil Word / Slang Phrase:
                </label>
                <input
                  type="text"
                  value={newTerm}
                  onChange={(e) => setNewTerm(e.target.value)}
                  placeholder="e.g. செம மாஸ், வேஸ்ட் டா, லேக் ஆகுது..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 font-tamil focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Cultural Meaning / Context:
                </label>
                <input
                  type="text"
                  value={newMeaning}
                  onChange={(e) => setNewMeaning(e.target.value)}
                  placeholder="e.g. Slang for severe performance lag"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Target Sentiment / Emotion Polarity:
                </label>
                <select
                  value={newSentiment}
                  onChange={(e) => setNewSentiment(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="High Frustration">High Frustration (மன உளைச்சல்)</option>
                  <option value="Sarcasm Marker">Sarcasm Marker (நையாண்டி)</option>
                  <option value="Extremely Negative">Extremely Negative (கடுமையான எதிர்மறை)</option>
                  <option value="High Delight">High Delight (மகிழ்ச்சி)</option>
                  <option value="Disappointment">Disappointment (ஏமாற்றம்)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isAdapting}
                className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-purple-500/20 transition-all disabled:opacity-50"
              >
                {isAdapting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Executing EWC Weight Consolidation...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Adapt Model Memory (Zero Retrain)</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Morphological Inflection Rules Card */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base font-bold text-white">Agglutinative Suffix Rules</h3>
            </div>

            <div className="space-y-3">
              {MORPHOLOGICAL_SUFFIX_RULES.map((rule, idx) => (
                <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-cyan-300 font-mono">{rule.suffix}</span>
                    <span className="text-[10px] text-slate-400">{rule.function}</span>
                  </div>
                  <div className="text-slate-200 font-tamil">{rule.example}</div>
                  <div className="text-[11px] text-purple-300">{rule.emotionImpact}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Evolving Slang Dictionary Table (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Database className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">Active Tamil Slang & Idiom Lexicon</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                {lexiconList.length} Custom Entries
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                    <th className="py-2.5 px-3">Slang Term / Expression</th>
                    <th className="py-2.5 px-3">Category</th>
                    <th className="py-2.5 px-3">Polarity</th>
                    <th className="py-2.5 px-3">Meaning / Context</th>
                    <th className="py-2.5 px-3">Retention</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans">
                  {lexiconList.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/60 transition-colors">
                      <td className="py-2.5 px-3 font-bold text-purple-300 font-tamil text-sm">
                        {item.term}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-slate-900 text-slate-300 border border-slate-700 font-mono">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-medium text-slate-200">
                        {item.sentiment}
                      </td>
                      <td className="py-2.5 px-3 text-slate-300 text-[11px]">
                        {item.meaning}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="text-emerald-400 font-mono font-bold">
                          {(item.memoryWeight * 100).toFixed(0)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
