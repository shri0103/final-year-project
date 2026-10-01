import React, { useState, useEffect } from 'react';
import { 
  Network, Database, Brain, Sparkles, CheckCircle2, ServerCog, 
  Fingerprint, Eye, Plus, RefreshCw, Layers, ArrowUpRight, Zap
} from 'lucide-react';
import { adaptationAPI } from '../services/api';

export default function ContinualAdaptation() {
  const [stats, setStats] = useState(null);
  const [slangList, setSlangList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New slang form state
  const [newTerm, setNewTerm] = useState('');
  const [newMeaning, setNewMeaning] = useState('');
  const [newSentiment, setNewSentiment] = useState('High Frustration');
  const [newCategory, setNewCategory] = useState('Code-Mixed Slang');

  const fetchData = async () => {
    try {
      setLoading(true);
      const [sData, lData] = await Promise.all([
        adaptationAPI.getStats(),
        adaptationAPI.getSlang()
      ]);
      setStats(sData);
      setSlangList(lData);
    } catch (err) {
      console.error('Failed to load continual adaptation data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSimulate = async () => {
    setIsSimulating(true);
    setSimulationResult(null);

    try {
      const res = await adaptationAPI.simulate();
      setSimulationResult(res);
      // Refresh stats and lexicon
      const [updatedStats, updatedList] = await Promise.all([
        adaptationAPI.getStats(),
        adaptationAPI.getSlang()
      ]);
      setStats(updatedStats);
      setSlangList(updatedList);
    } catch (err) {
      console.error('Simulation error:', err);
    } finally {
      setIsSimulating(false);
    }
  };

  const handleAddSlang = async (e) => {
    e.preventDefault();
    if (!newTerm.trim() || !newMeaning.trim()) return;

    try {
      await adaptationAPI.addSlang({
        term: newTerm.trim(),
        meaning: newMeaning.trim(),
        sentiment: newSentiment,
        category: newCategory,
        status: 'PENDING',
        addedInEpoch: `Task Step ${stats?.adaptationEpochs || 14}`
      });
      setShowAddModal(false);
      setNewTerm('');
      setNewMeaning('');
      // Refresh list
      const list = await adaptationAPI.getSlang();
      setSlangList(list);
    } catch (err) {
      console.error('Failed to add slang:', err);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await adaptationAPI.updateSlangStatus(id, status);
      const list = await adaptationAPI.getSlang();
      setSlangList(list);
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const statCards = [
    { label: 'Active Vocabulary', value: stats?.activeVocabularyCount?.toLocaleString() || '14,820', sub: 'Tamil & Tanglish Morphemes' },
    { label: 'Replay Buffer', value: stats?.replayBufferCapacity || '5,000 Samples', sub: 'Pseudo-labeled stream' },
    { label: 'EWC Penalty (λ)', value: stats?.ewcPenaltyLambda || '400.0', sub: 'Elastic Weight Consolidation' },
    { label: 'Forgetting Protection', value: stats?.catastrophicForgettingProtection || '98.4%', sub: 'Zero backward degradation' },
  ];

  return (
    <div className="animate-fade-in max-w-6xl mx-auto space-y-8 pb-12">
      {/* ── Page Header ── */}
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-3xl font-extrabold text-primary">Continual Adaptation & Dynamic Lexicon</h1>
            <span className="flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
              <Database size={12} className="text-emerald-600" /> MongoDB Sync
            </span>
          </div>
          <p className="text-muted text-base">
            Adapts model weights to emerging Tamil slang and idioms without catastrophic forgetting.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary flex items-center gap-1.5 text-xs"
          >
            <Plus size={15} /> Add Emerging Slang
          </button>
          <button
            onClick={fetchData}
            className="btn-secondary p-2.5 text-xs"
            title="Refresh Lexicon"
          >
            <RefreshCw size={15} />
          </button>
        </div>
      </div>

      {/* ── Stats Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((s, idx) => (
          <div key={idx} className="card p-6 border-t-4 border-t-blue-500">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{s.label}</p>
            <h3 className="text-3xl font-black text-gray-900">{s.value}</h3>
            <p className="text-[11px] text-blue-600 font-medium mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* ── Slang Lexicon Table ── */}
      <div className="card overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-white flex justify-between items-center">
          <div>
            <h3 className="text-base font-bold text-gray-900">Emerging Tamil Slang & Idioms in MongoDB</h3>
            <p className="text-xs text-gray-500">Real-time vocabulary updates incorporated into reasoner</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700">
            {slangList.length} Registered Expressions
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase font-semibold border-b">
              <tr>
                <th className="px-6 py-3">Expression (சொல் / தொடர்)</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Contextual Meaning</th>
                <th className="px-6 py-3">Sentiment Association</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Adaptation Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {slangList.map((item) => (
                <tr key={item.id} className="hover:bg-blue-50/20 transition-colors">
                  <td className="px-6 py-3.5 font-tamil font-bold text-gray-900 text-base">
                    "{item.term}"
                  </td>
                  <td className="px-6 py-3.5 text-xs text-gray-600">{item.category}</td>
                  <td className="px-6 py-3.5 text-xs text-gray-700 max-w-xs">{item.meaning}</td>
                  <td className="px-6 py-3.5 text-xs font-semibold">
                    <span className={`px-2 py-0.5 rounded-full ${
                      item.sentiment?.includes('Negative') || item.sentiment?.includes('Frustration')
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : item.sentiment?.includes('Praise') || item.sentiment?.includes('Satisfaction') || item.sentiment?.includes('Delight')
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {item.sentiment}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-xs">
                    {item.status === 'ADAPTED' ? (
                      <span className="flex items-center gap-1 text-emerald-600 font-bold">
                        <CheckCircle2 size={14} /> Adapted
                      </span>
                    ) : item.status === 'REVIEWED' ? (
                      <span className="flex items-center gap-1 text-blue-600 font-bold">
                        <CheckCircle2 size={14} /> Reviewed
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 font-bold border border-amber-200">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    {item.status === 'PENDING' && (
                      <button
                        onClick={() => handleUpdateStatus(item.id, 'ADAPTED')}
                        className="px-2.5 py-1 text-xs font-bold rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors border border-blue-200"
                      >
                        Approve & Adapt
                      </button>
                    )}
                    {item.status === 'REVIEWED' && (
                      <button
                        onClick={() => handleUpdateStatus(item.id, 'ADAPTED')}
                        className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors border border-emerald-200"
                      >
                        Commit Weight
                      </button>
                    )}
                    {item.status === 'ADAPTED' && (
                      <span className="text-[11px] text-gray-400 font-mono">Weight: {item.memoryWeight || 0.95}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Continual Learning Simulation ── */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Simulation trigger card */}
        <div className="card-gradient p-8 rounded-3xl shadow-xl flex flex-col justify-between text-white">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">
                EWC Elastic Weight Consolidation
              </span>
            </div>
            <h3 className="text-2xl font-black mb-3">Trigger Adaptation Cycle</h3>
            <p className="text-white/80 text-sm leading-relaxed mb-6">
              Executes parameter regularization with Fisher Information Matrix (FIM) to freeze core grammatical representations while tuning task-specific adapter layers on newly approved slang.
            </p>
          </div>

          <button
            onClick={handleSimulate}
            disabled={isSimulating}
            className="w-full py-3.5 rounded-xl font-bold text-sm bg-white text-blue-900 hover:bg-blue-50 flex items-center justify-center gap-2 transition-all shadow-lg"
          >
            {isSimulating ? (
              <>
                <span className="w-4 h-4 border-2 border-blue-900 border-t-transparent rounded-full animate-spin" />
                <span>Computing Fisher Information & Updating MongoDB...</span>
              </>
            ) : (
              <>
                <Zap size={16} className="text-amber-500 fill-amber-500" />
                <span>Run Continual Adaptation Cycle</span>
              </>
            )}
          </button>
        </div>

        {/* Simulation output logs */}
        <div className="card p-6 bg-gray-900 text-gray-200 font-mono text-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-800">
              <span className="text-gray-400 font-bold uppercase text-[10px] tracking-wider">
                Spring Boot Adaptation Log Stream
              </span>
              <span className="text-emerald-400 text-[10px]">MongoDB Live</span>
            </div>

            {simulationResult ? (
              <div className="space-y-2 text-emerald-300">
                <p className="font-bold text-white mb-2">{simulationResult.message}</p>
                {simulationResult.executionLog?.map((line, idx) => (
                  <p key={idx} className="leading-relaxed">
                    <span className="text-blue-400">&gt;</span> {line}
                  </p>
                ))}
              </div>
            ) : (
              <div className="space-y-2 text-gray-400">
                <p>&gt; System Idle. Waiting for adaptation cycle trigger.</p>
                <p>&gt; Active Epoch: {stats?.adaptationEpochs || 14}</p>
                <p>&gt; Fisher Regularizer Lambda: {stats?.ewcPenaltyLambda || 400.0}</p>
                <p>&gt; Click "Run Continual Adaptation Cycle" to execute live training step.</p>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-gray-800 flex justify-between text-[11px] text-gray-400">
            <span>Loss Metric: {simulationResult?.ewcLoss ?? '0.042'}</span>
            <span>Stability: {simulationResult?.stabilityMetric ?? '98.9%'}</span>
          </div>
        </div>
      </div>

      {/* ── Add Slang Modal ── */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(13,33,55,0.55)', backdropFilter: 'blur(4px)' }}
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md animate-fade-in"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-1">Add Emerging Tamil Slang</h3>
            <p className="text-xs text-gray-500 mb-4">New entries will be stored in MongoDB 'slang_lexicon'</p>

            <form onSubmit={handleAddSlang} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Tamil Term / Phrase</label>
                <input
                  type="text"
                  value={newTerm}
                  onChange={e => setNewTerm(e.target.value)}
                  placeholder="e.g. செம்ம கடுப்பு / scene podran"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 font-tamil text-sm focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Contextual Meaning</label>
                <input
                  type="text"
                  value={newMeaning}
                  onChange={e => setNewMeaning(e.target.value)}
                  placeholder="e.g. Extreme annoyance or show-off behavior"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-blue-500"
                  >
                    <option>Code-Mixed Slang</option>
                    <option>Colloquial Adjective</option>
                    <option>Agglutinative Verb</option>
                    <option>Cultural Idiom</option>
                    <option>Tanglish Code-Mix</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Sentiment</label>
                  <select
                    value={newSentiment}
                    onChange={e => setNewSentiment(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-blue-500"
                  >
                    <option>High Frustration</option>
                    <option>Positive Praise</option>
                    <option>Disappointment</option>
                    <option>Sarcasm Marker</option>
                    <option>Severe Grief/Anger</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 shadow-md"
                >
                  Save to MongoDB
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
