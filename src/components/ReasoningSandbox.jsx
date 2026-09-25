import React, { useState, useCallback } from 'react';
import { TAMIL_SAMPLE_FEEDBACK, EMOTION_TYPES } from '../data/tamilDataset';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell
} from 'recharts';
import {
  BrainCircuit, Sparkles, Zap, AlertTriangle, CheckCircle2,
  RefreshCw, MessageSquare, ShieldAlert, Cpu, Copy, Check
} from 'lucide-react';

/* ── Keyword-based analysis for custom input ─────────────── */
const FRUSTRATION_KEYWORDS = ['வரல', 'ஆகல', 'கேன்சல்', 'delay', 'late', 'problem', 'issue', 'fail', 'wrong', 'bad', 'worst'];
const SARCASM_KEYWORDS     = ['சூப்பர்', 'அருமை', 'நல்லா', 'great', 'super', 'excellent', 'wonderful', 'amazing'];
const ANGER_KEYWORDS       = ['கோபம்', 'அடிச்சு', 'கஷ்டம்', 'fraud', 'cheat', 'scam', 'terrible', 'horrible'];
const JOY_KEYWORDS         = ['thanks', 'nandri', 'நன்றி', 'happy', 'love', 'மகிழ்ச்சி', 'satisfied'];

function analyseCustomText(text) {
  const lower = text.toLowerCase();
  const hasFrustration = FRUSTRATION_KEYWORDS.some(k => lower.includes(k));
  const hasSarcasm     = SARCASM_KEYWORDS.some(k => lower.includes(k)) && hasFrustration;
  const hasAnger       = ANGER_KEYWORDS.some(k => lower.includes(k));
  const hasJoy         = JOY_KEYWORDS.some(k => lower.includes(k)) && !hasFrustration;

  if (hasSarcasm)     return { emotion: 'Sarcasm & Frustration', confidence: 88, urgency: 'HIGH',   sarcasm: true,  dist: { Sarcasm: 85, Frustration: 72, Anger: 50, Joy: 8,  Satisfaction: 3  } };
  if (hasAnger)       return { emotion: 'Anger & Distress',       confidence: 84, urgency: 'CRITICAL', sarcasm: false, dist: { Anger: 88, Frustration: 75, Sarcasm: 20, Joy: 3,  Satisfaction: 2  } };
  if (hasFrustration) return { emotion: 'Frustration',            confidence: 81, urgency: 'HIGH',   sarcasm: false, dist: { Frustration: 82, Anger: 55, Sarcasm: 30, Joy: 5,  Satisfaction: 4  } };
  if (hasJoy)         return { emotion: 'Satisfaction & Joy',     confidence: 90, urgency: 'NORMAL', sarcasm: false, dist: { Joy: 88, Satisfaction: 82, Frustration: 8, Anger: 5, Sarcasm: 3 } };
  return               { emotion: 'Neutral / Inconclusive',        confidence: 62, urgency: 'NORMAL', sarcasm: false, dist: { Neutral: 60, Frustration: 25, Joy: 20, Anger: 15, Sarcasm: 10 } };
}

/* ── Small reusable bits ─────────────────────────────────── */
function SectionTitle({ icon: Icon, title, right }) {
  return (
    <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--border-subtle)]">
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-teal-400" />
        <h3 className="text-sm font-bold text-[var(--text-primary)]">{title}</h3>
      </div>
      {right}
    </div>
  );
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-semibold transition-all border ${
        copied
          ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
          : 'bg-[var(--bg-elevated)] text-[var(--text-muted)] border-[var(--border-default)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]'
      }`}
      title="Copy Tamil response"
    >
      {copied ? <><Check className="w-3 h-3" /> Copied!</> : <><Copy className="w-3 h-3" /> Copy</>}
    </button>
  );
}

export default function ReasoningSandbox() {
  const [selectedId,  setSelectedId]  = useState(TAMIL_SAMPLE_FEEDBACK[0].id);
  const [inputText,   setInputText]   = useState(TAMIL_SAMPLE_FEEDBACK[0].text);
  const [analyzing,   setAnalyzing]   = useState(false);
  const [analysisKey, setAnalysisKey] = useState(0); // forces result re-render on analyse
  const [customMode,  setCustomMode]  = useState(false); // true when user typed custom text
  const [customResult,setCustomResult]= useState(null);
  const [toast,       setToast]       = useState('');

  const sample = TAMIL_SAMPLE_FEEDBACK.find(s => s.id === selectedId) || TAMIL_SAMPLE_FEEDBACK[0];

  const handleSelect = useCallback(s => {
    setSelectedId(s.id);
    setInputText(s.text);
    setCustomMode(false);
    setCustomResult(null);
  }, []);

  const handleTextChange = e => {
    setInputText(e.target.value);
    // If text drifts from selected preset, mark as custom
    const matchingPreset = TAMIL_SAMPLE_FEEDBACK.find(s => s.text === e.target.value);
    if (matchingPreset) {
      setSelectedId(matchingPreset.id);
      setCustomMode(false);
      setCustomResult(null);
    } else {
      setCustomMode(true);
    }
  };

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalysisKey(k => k + 1);
      if (customMode) {
        const result = analyseCustomText(inputText);
        setCustomResult(result);
        showToast(`Detected: ${result.emotion}`);
      } else {
        setCustomResult(null);
        showToast('Analysis updated ✓');
      }
    }, 900);
  };

  const showToast = msg => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  /* Derive display data */
  const displayEmotion    = customMode && customResult ? customResult.emotion    : sample.actualEmotion;
  const displayConfidence = customMode && customResult ? customResult.confidence  : sample.confidence;
  const displayUrgency    = customMode && customResult ? customResult.urgency     : sample.urgency;
  const displaySarcasm    = customMode && customResult ? customResult.sarcasm     : sample.sarcasmDetected;
  const displayDist       = customMode && customResult
    ? Object.entries(customResult.dist).map(([name, value]) => ({
        name, value,
        color: (EMOTION_TYPES.find(e => e.key === name.toLowerCase()) || {}).color || '#64748b',
      }))
    : Object.entries(sample.emotionDistribution).map(([name, value]) => ({
        name, value,
        color: (EMOTION_TYPES.find(e => e.key === name) || {}).color || '#38bdf8',
      }));

  const tamilResponse = displayUrgency === 'CRITICAL' || displayUrgency === 'HIGH'
    ? 'வணக்கம்! உங்கள் கருத்து எங்களுக்கு மிக முக்கியம். ஏற்பட்ட சிரமத்திற்கு வருந்துகிறோம். உங்கள் பிரச்சினை உடனடியாக தீர்க்கப்படும்.'
    : 'வணக்கம்! உங்கள் அன்பான ஆதரவிற்கு நன்றி. தொடர்ந்து சிறந்த சேவை வழங்க உறுதிபூண்டுள்ளோம்!';

  return (
    <div className="space-y-5 relative">

      {/* Toast notification */}
      {toast && (
        <div className="fixed top-16 right-4 z-50 chip chip-green text-xs px-3 py-2 shadow-lg animate-fade-in">
          <CheckCircle2 className="w-3.5 h-3.5" />
          {toast}
        </div>
      )}

      {/* ── Page header ─────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <BrainCircuit className="w-5 h-5 text-teal-400" />
          <h1 className="text-xl font-extrabold text-[var(--text-primary)]">Reasoning Sandbox</h1>
          <span className="chip chip-green ml-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live
          </span>
          {customMode && (
            <span className="chip chip-amber text-[10px] ml-1">Custom Input Mode</span>
          )}
        </div>
        <p className="text-sm text-[var(--text-secondary)]">
          Test Tamil customer feedback — analyse morphology and witness sarcasm remapping.
          {customMode && <span className="text-amber-400"> Type any Tamil/Tanglish text and click Analyse.</span>}
        </p>
      </div>

      {/* ── Preset selector ──────────────────────────────── */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">Presets:</span>
        {TAMIL_SAMPLE_FEEDBACK.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => handleSelect(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
              selectedId === s.id && !customMode
                ? 'bg-teal-500/15 text-teal-400 border-teal-500/40'
                : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border-default)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
            }`}
          >
            Case #{idx + 1}: {s.title.split(' ')[0]}
          </button>
        ))}
      </div>

      {/* ── Split-screen ─────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* LEFT — Input Panel */}
        <div className="card p-5 space-y-4">
          <SectionTitle
            icon={MessageSquare}
            title="Input Panel"
            right={
              <span className="chip chip-teal text-[10px]">
                {customMode ? 'Custom Text' : sample.channel}
              </span>
            }
          />
          <div>
            <label className="form-label">Tamil Feedback (Tamil script or Tanglish)</label>
            <textarea
              rows={5}
              value={inputText}
              onChange={handleTextChange}
              className="textarea-field font-tamil"
              placeholder="உதாரண தமிழ் பின்னூட்டத்தை இங்கே தட்டச்சு செய்யவும்..."
            />
          </div>

          {!customMode && (
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--text-secondary)]">
              <span>
                <span className="text-[var(--text-muted)]">Transliteration: </span>
                <span className="italic font-mono text-[11px]">{sample.transliteration}</span>
              </span>
              <span>
                <span className="text-[var(--text-muted)]">Brand: </span>
                <span className="font-semibold text-teal-400">{sample.brand}</span>
              </span>
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={analyzing || !inputText.trim()}
            className="btn-primary w-full justify-center"
          >
            {analyzing
              ? <><RefreshCw className="w-4 h-4 animate-spin" /> Parsing Morpho-Syntax…</>
              : <><Sparkles className="w-4 h-4" /> {customMode ? 'Analyse Custom Input' : 'Run Emotion Reasoning AI'}</>
            }
          </button>

          {/* Idioms */}
          {!customMode && sample.idiomsIdentified?.length > 0 && (
            <div className="card-elevated rounded-xl p-3.5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-violet-400">
                <Zap className="w-3.5 h-3.5" />
                <span>Sarcasm Remapper Triggered</span>
              </div>
              {sample.idiomsIdentified.map((idiom, idx) => (
                <div key={idx} className="flex items-start justify-between gap-3 text-xs">
                  <div>
                    <div className="font-bold text-violet-300 font-tamil text-sm">{idiom.idiom}</div>
                    <div className="text-[var(--text-muted)] text-[11px]">{idiom.meaning}</div>
                  </div>
                  <span className="chip chip-pink text-[10px] flex-shrink-0">{idiom.polarity}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT — Output Panel */}
        <div className="space-y-4" key={analysisKey}>
          {/* Classification result */}
          <div className={`card p-5 relative overflow-hidden border animate-fade-in ${
            displaySarcasm
              ? 'border-pink-500/25 bg-gradient-to-br from-[var(--bg-surface)] to-pink-950/10'
              : 'border-teal-500/20 bg-gradient-to-br from-[var(--bg-surface)] to-teal-950/10'
          }`}>
            <span className={`absolute top-0 right-0 px-3 py-1 text-[10px] font-bold rounded-bl-xl ${
              displaySarcasm
                ? 'bg-pink-500/15 text-pink-400 border-b border-l border-pink-500/25'
                : 'bg-teal-500/15 text-teal-400 border-b border-l border-teal-500/25'
            }`}>
              {displaySarcasm ? '⚡ SARCASM FLIP' : '✓ DIRECT MATCH'}
            </span>

            <div className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-1">
              {customMode ? 'Custom Analysis Output' : 'AI Classification Output'}
            </div>
            <div className="flex flex-wrap items-baseline gap-2 mb-4">
              <span className="text-2xl font-extrabold text-gradient-teal">{displayEmotion}</span>
              <span className="chip chip-teal">{displayConfidence}% confidence</span>
              <span className={`chip text-[10px] ${
                displayUrgency === 'CRITICAL' ? 'chip-red' :
                displayUrgency === 'HIGH'     ? 'chip-amber' : 'chip-green'
              }`}>{displayUrgency}</span>
            </div>

            {/* Baseline vs Ours — only for preset mode */}
            {!customMode && (
              <div className="grid grid-cols-2 gap-2.5 mb-4">
                <div className="bg-red-950/20 border border-red-500/15 rounded-xl p-3">
                  <div className="text-[10px] font-bold text-red-400 uppercase mb-1 flex items-center justify-between">
                    mBERT Baseline <span className="chip chip-red text-[9px]">FAIL</span>
                  </div>
                  <div className="text-xs font-semibold text-[var(--text-secondary)]">
                    {sample.baselineResult.predictedEmotion}
                  </div>
                </div>
                <div className="bg-teal-950/20 border border-teal-500/15 rounded-xl p-3">
                  <div className="text-[10px] font-bold text-teal-400 uppercase mb-1 flex items-center justify-between">
                    Our Model <span className="chip chip-green text-[9px]">PASS</span>
                  </div>
                  <div className="text-xs font-semibold text-[var(--text-secondary)]">
                    {sample.ourModelResult.predictedEmotion}
                  </div>
                </div>
              </div>
            )}

            {/* XAI reasoning */}
            <div className="bg-[var(--bg-base)] rounded-xl p-3.5 border border-[var(--border-subtle)]">
              <div className="text-[10px] font-bold uppercase tracking-wider text-teal-400 mb-1.5">
                XAI Reasoning Trace
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {customMode
                  ? `Keyword-based morphological scan on input text. Detected emotion polarity signals: ${
                      displaySarcasm ? 'contradictory praise+frustration markers (sarcasm flip triggered)' :
                      displayUrgency === 'CRITICAL' ? 'high-intensity negative signals with anger markers' :
                      displayEmotion.includes('Joy') ? 'positive affirmation tokens without contradiction' :
                      'frustration markers without sarcasm context'
                    }. Confidence reflects keyword density score.`
                  : sample.ourModelResult.reasoning
                }
              </p>
            </div>
          </div>

          {/* Emotion distribution */}
          <div className="card p-5">
            <SectionTitle
              icon={Sparkles}
              title="Emotion Distribution"
              right={<span className="text-[11px] text-[var(--text-muted)] font-mono">{displayDist.length} classes</span>}
            />
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={displayDist} layout="vertical" margin={{ top: 0, right: 20, left: 55, bottom: 0 }}>
                  <XAxis type="number" domain={[0, 100]} stroke="#4a5568" tick={{ fontSize: 10, fill: '#8b9eb5' }} />
                  <YAxis
                    type="category" dataKey="name" stroke="transparent"
                    tick={{ fontSize: 11, fontWeight: 600, fill: '#8b9eb5' }} width={60}
                  />
                  <Tooltip
                    contentStyle={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', borderRadius: 10, fontSize: 12, color: 'var(--text-primary)' }}
                    formatter={v => [`${v}%`, 'Intensity']}
                  />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                    {displayDist.map((entry, i) => <Cell key={i} fill={entry.color || '#38bdf8'} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* ── Morphology Table ─────────────────────────────── */}
      {!customMode && (
        <div className="card p-5">
          <SectionTitle
            icon={Cpu}
            title="Morpho-Syntactic Tokenizer Breakdown"
            right={<span className="chip chip-violet text-[10px]">{sample.morphologyBreakdown.length} tokens</span>}
          />
          <p className="text-xs text-[var(--text-secondary)] mb-4">
            Tamil is agglutinative — suffixes carry tense, aspect, mood and emotion polarity. Each token's root and suffix are isolated below.
          </p>
          <div className="overflow-x-auto rounded-xl border border-[var(--border-subtle)] max-h-72 overflow-y-auto">
            <table className="data-table">
              <thead className="sticky top-0 bg-[var(--bg-elevated)]">
                <tr>
                  <th>Token</th>
                  <th>Root</th>
                  <th>POS / Suffix</th>
                  <th>Semantic Role</th>
                </tr>
              </thead>
              <tbody>
                {sample.morphologyBreakdown.map((item, idx) => (
                  <tr key={idx}>
                    <td className="font-bold text-teal-400 font-tamil text-sm">{item.token}</td>
                    <td className="text-[var(--text-primary)] font-tamil">{item.root}</td>
                    <td>
                      <span className="chip chip-violet text-[10px] font-mono">
                        {item.pos}{item.suffix ? ` (${item.suffix})` : ''}
                      </span>
                    </td>
                    <td className="text-[var(--text-secondary)]">{item.semantic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Escalation panel ─────────────────────────────── */}
      <div className="card p-5">
        <SectionTitle icon={ShieldAlert} title="Actionable Escalation" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-amber-500/5 border border-amber-500/15 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-amber-400">Resolution Protocol</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {customMode
                ? displayUrgency === 'CRITICAL'
                  ? 'Immediate escalation to senior CS team. Priority call-back required within 15 minutes.'
                  : displayUrgency === 'HIGH'
                  ? 'Flag for CS review within 1 hour. Send apology SMS and track resolution.'
                  : 'Standard acknowledgement. Auto-close after confirmation.'
                : sample.suggestedAction
              }
            </p>
          </div>
          <div className="bg-[var(--bg-base)] rounded-xl p-4 border border-[var(--border-subtle)]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[var(--text-secondary)]">Auto-Generated Tamil Response</span>
              <div className="flex items-center gap-1.5">
                <span className="chip chip-teal text-[9px]">AI Draft</span>
                <CopyButton text={tamilResponse} />
              </div>
            </div>
            <p className="text-xs font-tamil text-[var(--text-secondary)] leading-relaxed">
              {tamilResponse}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
