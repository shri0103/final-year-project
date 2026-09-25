import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles, MessageSquare, ShieldCheck,
  CheckCircle2, Zap, Globe2, ScanFace, BookType, Brain,
  Frown, SmilePlus
} from 'lucide-react';

const SAMPLE_INPUTS = [
  { label: 'Frustration',      icon: <Frown size={18} />,       color: '#EF4444', bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.20)',   text: 'சாப்பாடு நல்லாவே இல்லை. காசு வேஸ்ட்.' },
  { label: 'Sarcasm',          icon: <ScanFace size={18} />,    color: '#F59E0B', bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.22)',  text: 'சூப்பர் சர்வீஸ்! இரண்டு மணி நேரம் காத்திருக்க வைத்ததற்கு நன்றி.' },
  { label: 'Satisfaction',     icon: <SmilePlus size={18} />,   color: '#10B981', bg: 'rgba(16,185,129,0.08)',  border: 'rgba(16,185,129,0.22)',  text: 'ரொம்ப நல்லா இருந்தது, சீக்கிரமா டெலிவரி பண்ணிட்டாங்க.' },
  { label: 'Implicit Emotion', icon: <MessageSquare size={18} />,color: '#1565C0', bg: 'rgba(21,101,192,0.08)', border: 'rgba(21,101,192,0.22)', text: 'போன் பண்ணா எடுக்கவே மாட்றாங்க...' },
];

const ANALYSIS_STEPS = [
  { icon: <BookType size={15} />,    text: 'Tokenizing Tamil text',               color: '#1565C0' },
  { icon: <Globe2 size={15} />,      text: 'Analyzing linguistic patterns',       color: '#2196F3' },
  { icon: <Brain size={15} />,       text: 'Morphological understanding',         color: '#1565C0' },
  { icon: <ScanFace size={15} />,    text: 'Detecting sarcasm & context',         color: '#2196F3' },
  { icon: <Sparkles size={15} />,    text: 'Generating emotion reasoning',        color: '#1565C0' },
];

const CAPABILITIES = [
  { icon: <BookType size={18} />, label: 'Morphology-Aware' },
  { icon: <Globe2   size={18} />, label: 'Cultural Context' },
  { icon: <ScanFace size={18} />, label: 'Sarcasm Detection' },
  { icon: <Brain    size={18} />, label: 'Implicit Emotion' },
];

export default function AnalyzeText() {
  const [text, setText]           = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress]   = useState(0);
  const [activeStep, setActiveStep] = useState(-1);
  const navigate = useNavigate();

  const charCount = text.length;
  const hasText   = text.trim().length > 0;

  const handleAnalyze = () => {
    if (!hasText) return;
    setIsAnalyzing(true);
    setProgress(0);
    setActiveStep(0);

    let current = 0;
    const interval = setInterval(() => {
      current += 20;
      setProgress(current);
      setActiveStep(Math.floor(current / 20) - 1);
      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => navigate('/result', { state: { text } }), 600);
      }
    }, 650);
  };

  return (
    <div className="animate-fade-in max-w-5xl mx-auto space-y-6 pb-8">

      {/* ── Page Header ── */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-extrabold mb-1" style={{ color: '#0D2137' }}>
            Analyze Tamil Feedback
          </h1>
          <p className="text-muted" style={{ fontSize: '15px' }}>
            Paste any Tamil text to extract deep emotional meaning with cultural reasoning.
          </p>
        </div>
        {/* Capability pills */}
        <div className="hidden md:flex items-center gap-2 flex-wrap">
          {CAPABILITIES.map((c, i) => (
            <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(33,150,243,0.10)', color: '#1565C0', border: '1px solid rgba(33,150,243,0.20)' }}>
              {c.icon} {c.label}
            </span>
          ))}
        </div>
      </div>

      {/* ── Main Card ── */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg"
        style={{ border: '1px solid rgba(33,150,243,0.15)', borderLeft: '4px solid #2196F3' }}>

        {/* Card top bar */}
        <div className="px-6 py-4 flex items-center justify-between"
          style={{ borderBottom: '1px solid rgba(33,150,243,0.10)', background: 'rgba(33,150,243,0.03)' }}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(33,150,243,0.12)' }}>
              <MessageSquare size={15} style={{ color: '#1565C0' }} />
            </div>
            <span className="font-bold text-sm uppercase tracking-wider" style={{ color: '#0D2137', letterSpacing: '0.07em', fontSize: '11px' }}>
              Input Text
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium" style={{ color: charCount > 0 ? '#1565C0' : '#9CA3AF' }}>
            <ShieldCheck size={14} />
            Tamil · Emotion Reasoning
            {charCount > 0 && <span className="ml-2 px-2 py-0.5 rounded-full text-xs"
              style={{ background: 'rgba(33,150,243,0.10)', color: '#1565C0' }}>
              {charCount} chars
            </span>}
          </div>
        </div>

        {/* Textarea */}
        <div className="p-6">
          <textarea
            className="w-full font-tamil rounded-xl outline-none resize-none transition-all"
            style={{
              minHeight: '160px',
              padding: '16px',
              fontSize: '16px',
              lineHeight: '1.7',
              color: '#0D2137',
              border: `2px solid ${hasText ? 'rgba(33,150,243,0.35)' : 'rgba(33,150,243,0.15)'}`,
              background: hasText ? '#FAFCFF' : '#FAFCFF',
              boxShadow: hasText ? '0 0 0 4px rgba(33,150,243,0.07)' : 'none',
              transition: 'all 0.25s ease',
            }}
            placeholder="உங்கள் தமிழ் feedback-ஐ இங்கே உள்ளிடுங்கள்..."
            value={text}
            onChange={e => setText(e.target.value)}
            disabled={isAnalyzing}
            onFocus={e => { e.target.style.borderColor = '#2196F3'; e.target.style.boxShadow = '0 0 0 4px rgba(33,150,243,0.10)'; }}
            onBlur={e => { e.target.style.borderColor = hasText ? 'rgba(33,150,243,0.35)' : 'rgba(33,150,243,0.15)'; e.target.style.boxShadow = hasText ? '0 0 0 4px rgba(33,150,243,0.07)' : 'none'; }}
          />

          {/* ── Sample Inputs ── */}
          <div className="mt-5">
            <p className="text-xs font-bold uppercase tracking-wider mb-3"
              style={{ color: '#374151', letterSpacing: '0.07em' }}>
              Try a sample →
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {SAMPLE_INPUTS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setText(s.text)}
                  disabled={isAnalyzing}
                  className="flex flex-col items-start p-3 rounded-xl text-left transition-all"
                  style={{
                    background: s.bg,
                    border: `1.5px solid ${s.border}`,
                    cursor: isAnalyzing ? 'not-allowed' : 'pointer',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 6px 16px ${s.border}`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <span className="mb-1" style={{ color: s.color }}>{s.icon}</span>
                  <span className="text-xs font-bold" style={{ color: s.color }}>{s.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ── Divider ── */}
          <div className="my-6" style={{ height: '1px', background: 'linear-gradient(90deg, rgba(33,150,243,0.15), transparent)' }} />

          {/* ── Analyze Button or Loading ── */}
          {!isAnalyzing ? (
            <button
              onClick={handleAnalyze}
              disabled={!hasText}
              className="w-full py-4 rounded-xl font-bold text-white text-base flex items-center justify-center gap-3 transition-all"
              style={{
                background: hasText
                  ? 'linear-gradient(135deg, #0D2137 0%, #1565C0 50%, #2196F3 100%)'
                  : '#D1D5DB',
                boxShadow: hasText ? '0 6px 20px rgba(33,150,243,0.35)' : 'none',
                cursor: hasText ? 'pointer' : 'not-allowed',
                fontSize: '15px',
                letterSpacing: '0.02em',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => hasText && (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <Zap size={20} />
              {hasText ? 'Analyze Emotion' : 'Enter Tamil text above to begin'}
            </button>
          ) : (
            /* ── Loading State ── */
            <div className="rounded-xl overflow-hidden animate-fade-in"
              style={{ border: '1.5px solid rgba(33,150,243,0.20)' }}>

              {/* Progress bar header */}
              <div className="px-5 py-4 flex items-center justify-between"
                style={{ background: 'linear-gradient(135deg, #0D2137, #1565C0)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(255,255,255,0.15)' }}>
                    <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5"/>
                      <path d="M12 3a9 9 0 0 1 9 9" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <span className="font-bold text-white text-sm">Processing Tamil Emotion Analysis</span>
                </div>
                <span className="font-mono font-black text-xl" style={{ color: '#90CAF9' }}>{progress}%</span>
              </div>

              {/* Progress fill */}
              <div style={{ height: '6px', background: 'rgba(33,150,243,0.12)' }}>
                <div style={{
                  height: '100%',
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #0D2137, #2196F3)',
                  transition: 'width 0.6s cubic-bezier(0.4,0,0.2,1)',
                  boxShadow: '2px 0 8px rgba(33,150,243,0.4)',
                }} />
              </div>

              {/* Steps */}
              <div className="p-5 space-y-3" style={{ background: '#FAFCFF' }}>
                {ANALYSIS_STEPS.map((step, idx) => {
                  const done    = progress >= (idx + 1) * 20;
                  const active  = activeStep === idx;
                  return (
                    <div key={idx} className="flex items-center gap-3 transition-all duration-500"
                      style={{ opacity: done || active ? 1 : 0.35 }}>
                      <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                        style={{
                          background: done ? 'rgba(16,185,129,0.12)' : active ? 'rgba(33,150,243,0.12)' : 'rgba(0,0,0,0.05)',
                          color: done ? '#059669' : active ? '#1565C0' : '#9CA3AF',
                          border: active ? '2px solid rgba(33,150,243,0.4)' : '2px solid transparent',
                        }}>
                        {done ? <CheckCircle2 size={14} /> : step.icon}
                      </div>
                      <span className="text-sm font-semibold transition-all"
                        style={{ color: done ? '#059669' : active ? '#0D2137' : '#9CA3AF', fontWeight: active ? 700 : 600 }}>
                        {step.text}
                        {active && <span className="ml-2 inline-block animate-pulse" style={{ color: '#2196F3' }}>●</span>}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Info Strip ── */}
      <div className="flex items-center gap-4 px-5 py-3 rounded-xl text-sm font-medium flex-wrap"
        style={{ background: 'rgba(33,150,243,0.06)', border: '1px solid rgba(33,150,243,0.14)', color: '#374151' }}>
        <span className="flex items-center gap-2"><Sparkles size={14} style={{ color: '#2196F3' }} /> Morphology-aware Tamil NLP</span>
        <span style={{ color: 'rgba(33,150,243,0.30)' }}>|</span>
        <span className="flex items-center gap-2"><Globe2 size={14} style={{ color: '#2196F3' }} /> Cultural context reasoning</span>
        <span style={{ color: 'rgba(33,150,243,0.30)' }}>|</span>
        <span className="flex items-center gap-2"><ScanFace size={14} style={{ color: '#2196F3' }} /> Sarcasm + implicit emotion detection</span>
      </div>
    </div>
  );
}
