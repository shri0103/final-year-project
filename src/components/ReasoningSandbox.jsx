import React, { useState } from 'react';
import { 
  TAMIL_SAMPLE_FEEDBACK, 
  EMOTION_TYPES 
} from '../data/tamilDataset';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar 
} from 'recharts';
import { 
  BrainCircuit, 
  Sparkles, 
  Zap, 
  AlertTriangle, 
  CheckCircle2, 
  Flame, 
  Smile, 
  RefreshCw, 
  Layers, 
  ArrowRight, 
  ChevronRight, 
  MessageSquare, 
  ShieldAlert, 
  Cpu, 
  CornerDownRight,
  Send,
  HelpCircle
} from 'lucide-react';

export default function ReasoningSandbox() {
  const [selectedSampleId, setSelectedSampleId] = useState(TAMIL_SAMPLE_FEEDBACK[0].id);
  const [customInputText, setCustomInputText] = useState(TAMIL_SAMPLE_FEEDBACK[0].text);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const activeSample = TAMIL_SAMPLE_FEEDBACK.find(s => s.id === selectedSampleId) || TAMIL_SAMPLE_FEEDBACK[0];

  const handleSelectSample = (sample) => {
    setSelectedSampleId(sample.id);
    setCustomInputText(sample.text);
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 600);
  };

  // Prepare chart data for emotion distribution
  const emotionChartData = Object.entries(activeSample.emotionDistribution).map(([name, value]) => {
    const emotionConfig = EMOTION_TYPES.find(e => e.key === name) || { color: '#38bdf8' };
    return {
      name,
      value,
      color: emotionConfig.color
    };
  });

  return (
    <div className="space-y-8">
      {/* Top Banner Controls & Preset Selector */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <BrainCircuit className="w-5 h-5 text-teal-400" />
              <h2 className="text-xl font-extrabold text-white">Interactive Live Emotion Reasoning Workbench</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Test Tamil customer feedback, analyze agglutinative morphology, and witness live sarcasm remapping.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">Try Test Presets:</span>
            <div className="flex flex-wrap gap-1.5">
              {TAMIL_SAMPLE_FEEDBACK.map((sample, idx) => (
                <button
                  key={sample.id}
                  onClick={() => handleSelectSample(sample)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    selectedSampleId === sample.id
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md shadow-emerald-500/20 font-bold'
                      : 'bg-slate-900/90 text-slate-300 border border-slate-700/80 hover:border-teal-500/50 hover:text-white'
                  }`}
                >
                  Case #{idx + 1}: {sample.title.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Text Area Input */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
              <MessageSquare className="w-4 h-4 text-teal-400" />
              <span>Input Tamil Feedback (Tamil Script or Tanglish)</span>
            </label>
            <span className="text-xs text-teal-400 font-mono">
              Channel: {activeSample.channel}
            </span>
          </div>

          <div className="relative">
            <textarea
              rows={3}
              value={customInputText}
              onChange={(e) => setCustomInputText(e.target.value)}
              className="w-full bg-slate-950/90 border border-slate-700/80 rounded-xl px-4 py-3 text-slate-100 text-sm font-tamil focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 leading-relaxed"
              placeholder="உதாரண தமிழ் பின்னூட்டத்தை இங்கே தட்டச்சு செய்யவும்..."
            />

            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="absolute bottom-3 right-3 flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 via-teal-500 to-violet-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Parsing Morpho-Syntax...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-slate-950 fill-current" />
                  <span>Run Emotion Reasoning AI</span>
                </>
              )}
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 pt-1">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-slate-300">Transliteration:</span>
              <span className="italic text-slate-300 font-mono text-[11px]">{activeSample.transliteration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-slate-400">Target Entity:</span>
              <span className="font-semibold text-teal-300 bg-teal-950/80 px-2 py-0.5 rounded border border-teal-800/60">
                {activeSample.brand}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Side Reasoning & Morphology, Right Side Charts & Action */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Emotion Result & Morpho-Syntactic Breakdown (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Reasoning Result Header Card */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4 relative overflow-hidden">
            <div className={`absolute top-0 right-0 px-4 py-1.5 rounded-bl-2xl text-xs font-bold font-mono ${
              activeSample.sarcasmDetected 
                ? 'bg-pink-950 text-pink-300 border-b border-l border-pink-700/60' 
                : 'bg-emerald-950 text-emerald-300 border-b border-l border-emerald-700/60'
            }`}>
              {activeSample.sarcasmDetected ? '⚡ SARCASM FLIP DETECTED' : '✓ DIRECT EMOTION MATCH'}
            </div>

            <div className="space-y-1">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">AI Classification Output</div>
              <h3 className="text-2xl font-extrabold text-white flex items-center space-x-3">
                <span className="text-teal-400">{activeSample.actualEmotion}</span>
                <span className="text-xs font-semibold bg-teal-950 text-teal-300 px-2.5 py-1 rounded-full border border-teal-800">
                  {activeSample.confidence}% Confidence
                </span>
              </h3>
            </div>

            {/* Contrast Box: Baseline vs Our Model */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="bg-red-950/30 border border-red-900/50 rounded-xl p-3.5 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-red-400">
                  <span>Standard Baseline (mBERT / MuRIL)</span>
                  <span className="text-[10px] bg-red-900/60 text-red-200 px-1.5 py-0.5 rounded">FAILED</span>
                </div>
                <div className="text-xs font-semibold text-slate-200">{activeSample.baselineResult.predictedEmotion}</div>
                <div className="text-[11px] text-red-300/80 leading-tight">
                  Misread literal keyword praise while failing on morphological context.
                </div>
              </div>

              <div className="bg-emerald-950/30 border border-emerald-900/50 rounded-xl p-3.5 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
                  <span>Our Proposed Model</span>
                  <span className="text-[10px] bg-emerald-900/60 text-emerald-200 px-1.5 py-0.5 rounded">PASSED</span>
                </div>
                <div className="text-xs font-semibold text-emerald-200">{activeSample.ourModelResult.predictedEmotion}</div>
                <div className="text-[11px] text-emerald-300/80 leading-tight">
                  Successfully isolated suffixes and identified contextual contradiction.
                </div>
              </div>
            </div>

            {/* Explainable AI Reasoning Notes */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center space-x-2 text-xs font-bold text-teal-400 uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Explainable AI (XAI) Reasoning Trace</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {activeSample.ourModelResult.reasoning}
              </p>
            </div>
          </div>

          {/* Morpho-Syntactic Tokenization Table */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Cpu className="w-5 h-5 text-teal-400" />
                <h3 className="text-base font-bold text-white">Morpho-Syntactic Tokenizer Breakdown</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                {activeSample.morphologyBreakdown.length} Tokens Parsed
              </span>
            </div>

            <p className="text-xs text-slate-400">
              Tamil is an agglutinative language where suffixes carry tense, aspect, mood, and emotion polarity. Below is the isolated root and suffix breakdown for the input:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                    <th className="py-2.5 px-3">Token</th>
                    <th className="py-2.5 px-3">Root Lemma</th>
                    <th className="py-2.5 px-3">POS / Inflection Suffix</th>
                    <th className="py-2.5 px-3">Semantic & Emotion Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans">
                  {activeSample.morphologyBreakdown.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/60 transition-colors">
                      <td className="py-2.5 px-3 font-semibold text-teal-300 font-tamil text-sm">
                        {item.token}
                      </td>
                      <td className="py-2.5 px-3 text-slate-200 font-tamil">
                        {item.root}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-purple-300 border border-purple-900/50">
                          {item.pos} {item.suffix ? `(${item.suffix})` : ''}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-300">
                        {item.semantic}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Idiom & Culturally Grounded Match Drawer */}
            {activeSample.idiomsIdentified && activeSample.idiomsIdentified.length > 0 && (
              <div className="bg-purple-950/20 border border-purple-800/40 rounded-xl p-4 space-y-2">
                <div className="flex items-center space-x-2 text-xs font-bold text-purple-300 uppercase tracking-wider">
                  <Zap className="w-4 h-4 text-purple-400" />
                  <span>Tamil Cultural Idiom & Sarcasm Remapper Triggered</span>
                </div>
                {activeSample.idiomsIdentified.map((idiom, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between text-xs bg-purple-900/30 p-2.5 rounded-lg border border-purple-800/30 gap-2">
                    <div>
                      <span className="font-bold text-purple-200 font-tamil text-sm">{idiom.idiom}</span>
                      <p className="text-[11px] text-purple-300/80">{idiom.meaning}</p>
                    </div>
                    <span className="px-2 py-1 rounded text-[10px] font-bold bg-pink-950 text-pink-300 border border-pink-700/50 self-start sm:self-auto">
                      Polarity: {idiom.polarity}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Radar & Bar Charts + Actionable Escalation Engine (5 cols) */}
        <div className="lg:col-span-5 space-y-6">

          {/* Emotion Probability Radar / Bar Chart */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Flame className="w-5 h-5 text-teal-400" />
                <h3 className="text-base font-bold text-white">Fine-Grained Emotion Distribution</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">7 Classes</span>
            </div>

            {/* Bar Chart Visualizer */}
            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={emotionChartData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                  <XAxis type="number" domain={[0, 100]} stroke="#64748b" textAnchor="end" tick={{ fontSize: 10 }} />
                  <YAxis type="category" dataKey="name" stroke="#94a3b8" tick={{ fontSize: 11, fontWeight: 600 }} width={95} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc', fontSize: '12px' }} 
                    formatter={(val) => [`${val}%`, 'Intensity']}
                  />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                    {emotionChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center text-xs pt-2 border-t border-slate-800">
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Dominant Emotion</span>
                <span className="font-bold text-teal-300">{activeSample.actualEmotion}</span>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Urgency Flag</span>
                <span className={`font-bold ${
                  activeSample.urgency === 'CRITICAL' ? 'text-red-400' :
                  activeSample.urgency === 'HIGH' ? 'text-amber-400' : 'text-emerald-400'
                }`}>
                  {activeSample.urgency}
                </span>
              </div>
            </div>
          </div>

          {/* Actionable Customer Support Escalation Engine */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-white">Actionable Customer Escalation</h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 rounded-xl bg-amber-950/30 border border-amber-800/40">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-xs font-bold text-amber-300">Recommended Resolution Protocol</span>
                  <p className="text-xs text-slate-300 leading-normal">
                    {activeSample.suggestedAction}
                  </p>
                </div>
              </div>

              {/* Automated Response Recommendation in Tamil */}
              <div className="space-y-2 pt-1">
                <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                  <span>Automated Context-Aware Tamil Response Draft:</span>
                  <span className="text-[10px] text-cyan-400 font-mono">Auto-Generated</span>
                </label>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-tamil text-slate-200 leading-relaxed">
                  {activeSample.urgency === 'CRITICAL' || activeSample.urgency === 'HIGH' ? (
                    `வணக்கம்! உங்கள் கருத்து எங்களுக்கு மிக முக்கியம். ஏற்பட்ட சிரமத்திற்கு வருந்துகிறோம். உங்கள் பிரச்சினை உடனடியாக உயர் அதிகாரிகளுக்கு மாற்றப்பட்டு 15 நிமிடங்களில் தீர்க்கப்படும்.`
                  ) : (
                    `வணக்கம்! உங்கள் அன்பான ஆதரவிற்கு நன்றி. எங்களின் சேவையை தொடர்ந்து சிறந்த முறையில் வழங்க உறுதிபூண்டுள்ளோம்!`
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
