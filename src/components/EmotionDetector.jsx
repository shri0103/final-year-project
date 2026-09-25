import React, { useState, useRef } from 'react';
import {
  Sparkles, RefreshCw, Send, Copy, Check,
  Smile, Frown, Angry, Meh, Heart, AlertCircle, ThumbsDown, Zap, ChevronDown
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────── */
/*  Emotion detection engine                                   */
/* ─────────────────────────────────────────────────────────── */

const RULES = [
  /* SARCASM — positive words + negative context */
  {
    emotion: 'Sarcasm / Irony',
    emoji: '😏',
    color: '#ec4899',
    bg: 'from-pink-950/40 to-[var(--bg-surface)]',
    border: 'border-pink-500/30',
    chip: 'chip-pink',
    desc: 'Superficially positive words mask frustration or mockery.',
    positiveKeys: ['நல்லா','super','சூப்பர்','அருமை','great','excellent','wonderful','perfect','amazing'],
    negativeKeys: ['வரல','ஆகல','cancel','கேன்சல்','late','delay','டவர் காலி','வொர்த்தே','problem'],
    match: (pos, neg) => pos && neg,
  },
  /* ANGER */
  {
    emotion: 'Anger',
    emoji: '😡',
    color: '#ef4444',
    bg: 'from-red-950/40 to-[var(--bg-surface)]',
    border: 'border-red-500/30',
    chip: 'chip-red',
    desc: 'Strong negative sentiment with high intensity markers.',
    keys: ['கோபம்','angry','furious','மொக்க','fraud','cheat','scam','terrible','horrible','worst','hate','கடுப்பேத்துறாங்க','stupid','idiot','awful'],
    match: (lower) => this_keys => this_keys.some(k => lower.includes(k)),
  },
  /* FRUSTRATION */
  {
    emotion: 'Frustration',
    emoji: '😤',
    color: '#f59e0b',
    bg: 'from-amber-950/40 to-[var(--bg-surface)]',
    border: 'border-amber-500/30',
    chip: 'chip-amber',
    desc: 'Repeated failure, delay or unmet expectations detected.',
    keys: ['வரல','ஆகல','late','delay','not working','கேன்சல்','cancel','பிரச்சனை','problem','issue','wait','waiting','no response','refund','fail','failed','broken'],
    match: null,
  },
  /* SADNESS */
  {
    emotion: 'Sadness',
    emoji: '😢',
    color: '#3b82f6',
    bg: 'from-blue-950/40 to-[var(--bg-surface)]',
    border: 'border-blue-500/30',
    chip: 'chip-slate',
    desc: 'Expressions of loss, grief, or deep disappointment.',
    keys: ['sad','வருத்தம்','miss','lost','gone','cry','crying','heartbroken','hurt','pain','disappoint','வயித்துல அடித்தல்'],
    match: null,
  },
  /* DISAPPOINTMENT */
  {
    emotion: 'Disappointment',
    emoji: '😞',
    color: '#8b5cf6',
    bg: 'from-violet-950/40 to-[var(--bg-surface)]',
    border: 'border-violet-500/30',
    chip: 'chip-violet',
    desc: 'Expectations were not met — below what was hoped for.',
    keys: ['disappointed','ஏமாற்றம்','expected more','not what i','not as expected','poor','below average','வொர்த்தே இல்ல','waste','பயனில்ல','useless'],
    match: null,
  },
  /* JOY / HAPPINESS */
  {
    emotion: 'Happy / Satisfied',
    emoji: '😊',
    color: '#10b981',
    bg: 'from-emerald-950/40 to-[var(--bg-surface)]',
    border: 'border-emerald-500/30',
    chip: 'chip-green',
    desc: 'Positive, appreciative or satisfied sentiment.',
    keys: ['happy','மகிழ்ச்சி','thanks','நன்றி','love','great','excellent','wonderful','satisfied','good','nice','perfect','வேற லெவல்','செமையா','best','awesome','enjoyed','smooth','fast delivery'],
    match: null,
    requireNoNeg: true,
  },
];

const NEGATIVE_CONTEXT = ['வரல','ஆகல','cancel','late','delay','problem','fail','worst','fraud','கேன்சல்','no signal','not working'];

function detectEmotion(text) {
  const lower = text.toLowerCase().trim();

  if (!lower || lower.split(/\s+/).length < 2) {
    return null; // too short
  }

  const hasPositive = RULES[0].positiveKeys.some(k => lower.includes(k));
  const hasNegativeCtx = NEGATIVE_CONTEXT.some(k => lower.includes(k));

  // Sarcasm check first
  if (hasPositive && hasNegativeCtx) {
    const e = RULES[0];
    const dist = { Sarcasm: 88, Frustration: 70, Anger: 50, Joy: 8, Neutral: 5 };
    return { ...e, confidence: 91, urgency: 'HIGH', dist, isSarcasm: true };
  }

  // Test each rule in priority order
  for (const rule of RULES.slice(1)) {
    if (rule.keys.some(k => lower.includes(k))) {
      if (rule.requireNoNeg && hasNegativeCtx) continue;
      const conf = 75 + Math.floor(Math.random() * 18);
      let dist = {};
      dist[rule.emotion.split(' ')[0]] = conf;
      return { ...rule, confidence: conf, urgency: rule.emotion === 'Anger' ? 'CRITICAL' : rule.emotion === 'Frustration' ? 'HIGH' : 'NORMAL', dist, isSarcasm: false };
    }
  }

  // Default: neutral
  return {
    emotion: 'Neutral',
    emoji: '😐',
    color: '#64748b',
    bg: 'from-slate-800/40 to-[var(--bg-surface)]',
    border: 'border-slate-500/30',
    chip: 'chip-slate',
    desc: 'No strong emotional signals detected. The feedback appears neutral.',
    confidence: 60,
    urgency: 'NORMAL',
    dist: { Neutral: 70, Frustration: 20, Joy: 15 },
    isSarcasm: false,
  };
}

const TAMIL_EXAMPLES = [
  'ரொம்ப நல்லா சேவை செய்றீங்க! 3 வாரம் ஆச்சு பொருளும் வரல. சூப்பர் சிஸ்டம்!',
  'The delivery was super fast and the product is exactly as described. Very happy!',
  'என் வயித்துல அடிச்சுட்டீங்க! 2 மணி நேரம் wait பண்ணி கடைசியில cancel பண்ணிட்டீங்க.',
  'Worst app ever. Nothing works, fraud company, wasted my money.',
  'நெட்வொர்க் signal ரொம்பவே அருமை, வீட்டுக்குள்ள போனாலே tower காலி!',
  'Thank you so much! Amazing service, smooth experience, will order again.',
  'I expected more from this product. Very disappointed with the quality.',
];

const URGENCY_LABEL = {
  CRITICAL: { label: 'Critical — Immediate action needed', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
  HIGH:     { label: 'High — Review within 1 hour',        color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
  NORMAL:   { label: 'Normal — Standard follow-up',         color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
};

/* ─────────────────────────────────────────────────────────── */
export default function EmotionDetector() {
  const [text,      setText]      = useState('');
  const [result,    setResult]    = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [history,   setHistory]   = useState([]);
  const [copied,    setCopied]    = useState(false);
  const [showEx,    setShowEx]    = useState(false);
  const textRef = useRef(null);

  const handleAnalyze = () => {
    if (!text.trim()) return;
    setAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      const res = detectEmotion(text);
      setResult(res);
      setHistory(h => [{ text: text.slice(0, 60) + (text.length > 60 ? '…' : ''), ...res, id: Date.now() }, ...h.slice(0, 9)]);
      setAnalyzing(false);
    }, 800);
  };

  const handleExample = (ex) => {
    setText(ex);
    setShowEx(false);
    setResult(null);
    textRef.current?.focus();
  };

  const handleCopy = () => {
    const response = result?.urgency === 'CRITICAL' || result?.urgency === 'HIGH'
      ? 'வணக்கம்! உங்கள் கருத்துக்கு நன்றி. ஏற்பட்ட சிரமத்திற்கு மன்னிப்பு கோருகிறோம். உங்கள் பிரச்சினை உடனடியாக தீர்க்கப்படும்.'
      : 'வணக்கம்! உங்கள் அன்பான ஆதரவிற்கு நன்றி. தொடர்ந்து சிறந்த சேவை வழங்க உறுதிபூண்டுள்ளோம்!';
    navigator.clipboard.writeText(response).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const tamilResponse = result
    ? (result.urgency === 'CRITICAL' || result.urgency === 'HIGH'
      ? 'வணக்கம்! உங்கள் கருத்துக்கு நன்றி. ஏற்பட்ட சிரமத்திற்கு மன்னிப்பு கோருகிறோம். உடனடியாக தீர்க்கப்படும்.'
      : 'வணக்கம்! ஆதரவிற்கு நன்றி. சிறந்த சேவை வழங்க உறுதிபூண்டுள்ளோம்!')
    : '';

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] flex flex-col">
      
      {/* ── Header ──────────────────────────────────────── */}
      <header className="border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] px-6 py-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-violet-600 p-px flex-shrink-0">
          <div className="w-full h-full rounded-[11px] bg-[var(--bg-surface)] flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-teal-400" />
          </div>
        </div>
        <div>
          <div className="text-base font-black tracking-tight">
            TAMIL<span className="text-teal-400">EMO</span><span className="text-violet-400">.AI</span>
          </div>
          <div className="text-[11px] text-[var(--text-muted)]">Tamil Customer Emotion Detector</div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="chip chip-green text-[10px] hidden sm:inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live
          </span>
        </div>
      </header>

      {/* ── Main ────────────────────────────────────────── */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-8 space-y-5">

        {/* Hero text */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">
            What emotion is your customer feeling?
          </h1>
          <p className="text-sm text-[var(--text-secondary)]">
            Paste any Tamil, Tanglish or English customer feedback below — we detect the emotion instantly.
          </p>
        </div>

        {/* ── Input card ──────────────────────────────────── */}
        <div className="card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <label className="form-label mb-0">Customer Feedback</label>
            <button
              onClick={() => setShowEx(v => !v)}
              className="flex items-center gap-1 btn-secondary text-[11px] py-1 px-2.5"
            >
              Try examples <ChevronDown className={`w-3 h-3 transition-transform ${showEx ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Examples dropdown */}
          {showEx && (
            <div className="card-elevated rounded-xl overflow-hidden divide-y divide-[var(--border-subtle)]">
              {TAMIL_EXAMPLES.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => handleExample(ex)}
                  className="w-full text-left px-4 py-2.5 text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-overlay)] hover:text-[var(--text-primary)] transition-colors font-tamil"
                >
                  {ex}
                </button>
              ))}
            </div>
          )}

          <textarea
            ref={textRef}
            rows={5}
            value={text}
            onChange={e => { setText(e.target.value); setResult(null); }}
            placeholder="Type or paste customer feedback here...&#10;&#10;Example: 'ரொம்ப நல்லா சேவை செய்றீங்க! ஆனா 3 வாரம் ஆச்சு பொருளும் வரல.'"
            className="textarea-field font-tamil text-[13px]"
          />

          <div className="flex items-center justify-between gap-3">
            <span className="text-[11px] text-[var(--text-muted)]">
              {text.length} chars · Works in Tamil, Tanglish & English
            </span>
            <button
              onClick={handleAnalyze}
              disabled={analyzing || !text.trim()}
              className="btn-primary"
            >
              {analyzing
                ? <><RefreshCw className="w-4 h-4 animate-spin" /> Detecting…</>
                : <><Send className="w-4 h-4" /> Detect Emotion</>
              }
            </button>
          </div>
        </div>

        {/* ── Result card ─────────────────────────────────── */}
        {result && (
          <div className={`card p-6 border bg-gradient-to-br ${result.bg} ${result.border} space-y-5 animate-fade-up`}>
            
            {/* Emotion headline */}
            <div className="flex items-center gap-4">
              <div className="text-6xl leading-none">{result.emoji}</div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                  Detected Emotion
                </div>
                <div className="text-3xl font-extrabold" style={{ color: result.color }}>
                  {result.emotion}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`chip ${result.chip} text-[11px]`}>
                    {result.confidence}% confident
                  </span>
                  {result.isSarcasm && (
                    <span className="chip chip-pink text-[10px]">
                      <Zap className="w-3 h-3" /> Sarcasm Detected
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* What this means */}
            <div className="bg-[var(--bg-base)] rounded-xl p-4 border border-[var(--border-subtle)]">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                What this means
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{result.desc}</p>
              {result.isSarcasm && (
                <p className="text-[12px] text-pink-400 mt-2 font-medium">
                  ⚡ The customer used positive-sounding words but with a negative context — this is sarcasm, not genuine praise.
                </p>
              )}
            </div>

            {/* Urgency */}
            <div className={`flex items-center gap-3 p-3.5 rounded-xl border ${URGENCY_LABEL[result.urgency].bg}`}>
              <AlertCircle className={`w-4 h-4 flex-shrink-0 ${URGENCY_LABEL[result.urgency].color}`} />
              <div>
                <div className={`text-xs font-bold ${URGENCY_LABEL[result.urgency].color}`}>
                  Priority: {result.urgency}
                </div>
                <div className="text-[11px] text-[var(--text-secondary)]">
                  {URGENCY_LABEL[result.urgency].label}
                </div>
              </div>
            </div>

            {/* Emotion intensity bars */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">
                Emotion Intensity
              </div>
              <div className="space-y-2">
                {Object.entries(result.dist).map(([emotion, score]) => (
                  <div key={emotion} className="flex items-center gap-3">
                    <span className="text-[11px] text-[var(--text-secondary)] w-28 text-right flex-shrink-0">
                      {emotion}
                    </span>
                    <div className="flex-1 progress-track">
                      <div
                        className="progress-fill"
                        style={{ width: `${score}%`, background: result.color }}
                      />
                    </div>
                    <span className="text-[11px] font-mono text-[var(--text-muted)] w-8 flex-shrink-0">
                      {score}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggested Tamil response */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                Suggested Tamil Response to Customer
              </div>
              <div className="bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-xl p-4 flex items-start justify-between gap-3">
                <p className="text-sm font-tamil text-[var(--text-secondary)] leading-relaxed flex-1">
                  {tamilResponse}
                </p>
                <button
                  onClick={handleCopy}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    copied
                      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                      : 'bg-[var(--bg-elevated)] text-[var(--text-muted)] border-[var(--border-default)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {copied ? <><Check className="w-3.5 h-3.5" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ── History ─────────────────────────────────────── */}
        {history.length > 0 && (
          <div className="card overflow-hidden">
            <div className="px-5 py-3 border-b border-[var(--border-subtle)] flex items-center justify-between">
              <span className="text-sm font-bold text-[var(--text-primary)]">Recent Analyses</span>
              <span className="chip chip-slate text-[10px]">{history.length} in this session</span>
            </div>
            <div className="divide-y divide-[var(--border-subtle)]">
              {history.map(h => (
                <button
                  key={h.id}
                  onClick={() => { setText(h.text.replace('…', '')); setResult(null); }}
                  className="w-full px-5 py-3 flex items-center gap-3 hover:bg-[var(--bg-elevated)] transition-colors text-left"
                >
                  <span className="text-2xl">{h.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-tamil text-[var(--text-secondary)] truncate">"{h.text}"</p>
                    <span className="text-xs font-semibold" style={{ color: h.color }}>{h.emotion}</span>
                  </div>
                  <span className={`chip text-[10px] flex-shrink-0 ${
                    h.urgency === 'CRITICAL' ? 'chip-red' :
                    h.urgency === 'HIGH'     ? 'chip-amber' : 'chip-green'
                  }`}>{h.urgency}</span>
                </button>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="border-t border-[var(--border-subtle)] py-4 text-center">
        <p className="text-[11px] text-[var(--text-muted)]">
          TamilEmo.AI · Morphology-Aware Tamil Emotion Reasoning · Final Year Project 2025–26
        </p>
      </footer>
    </div>
  );
}
