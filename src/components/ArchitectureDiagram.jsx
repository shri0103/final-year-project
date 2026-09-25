import React, { useState } from 'react';
import {
  Activity, Cpu, Zap, Layers, CheckCircle2, ArrowRight,
  MessageSquare, Flame, Sparkles, ChevronDown, ChevronUp
} from 'lucide-react';

const STEPS = [
  {
    num: '01',
    title: 'Raw Tamil Text Ingestion',
    icon: MessageSquare,
    color: '#38bdf8',
    gradient: 'from-blue-500 to-cyan-500',
    desc: 'Receives raw customer text from multi-channel feeds (Zomato reviews, tweets, chat transcripts). Handles Tamil script, colloquialisms, and code-mixed Tanglish.',
    detail: 'Input handling supports Unicode Tamil (U+0B80–U+0BFF), Romanized Tanglish, and mixed code-switched text. A channel normalizer strips markup and handles emoji sentiment as auxiliary signals.',
  },
  {
    num: '02',
    title: 'Morpho-Syntactic Tokenizer',
    icon: Cpu,
    color: '#2dd4bf',
    gradient: 'from-cyan-500 to-teal-500',
    desc: 'Deconstructs Tamil agglutinative suffixes (e.g. -றீங்க, -அல, -உல்+அ). Isolates root verbs, aspectual mood tags, and emotional intensity markers.',
    detail: 'Uses a custom finite-state transducer (FST) trained on 14,000+ Tamil morphological rules. Identifies 48 distinct inflectional suffixes that carry emotion polarity signals unavailable to standard subword tokenizers.',
  },
  {
    num: '03',
    title: 'Idiom Graph & Sarcasm Remapper',
    icon: Zap,
    color: '#f472b6',
    gradient: 'from-pink-500 to-purple-500',
    desc: 'Evaluates context contradiction (e.g., superficial praise paired with 3-week delay). Remaps sarcastic positive predictions into intended negative emotions.',
    detail: 'A graph attention network (GAT) with a 2,400-node Tamil cultural idiom graph. Contradiction scoring uses co-occurrence statistics between praise tokens and frustration context signals (delay markers, negation frames).',
  },
  {
    num: '04',
    title: 'Continual Adaptation (EWC)',
    icon: Layers,
    color: '#a78bfa',
    gradient: 'from-purple-500 to-indigo-500',
    desc: 'Applies Elastic Weight Consolidation (EWC) and synthetic memory replay to learn new youth slang without catastrophic forgetting.',
    detail: 'Fisher Information Matrix penalty (λ=0.4) anchors critical weights. Synthetic replay generates 3× augmented samples per new slang entry. Achieves new-term integration in <5 minutes with zero full retraining.',
  },
  {
    num: '05',
    title: '7-Class Emotion Engine',
    icon: Flame,
    color: '#fb923c',
    gradient: 'from-amber-500 to-red-500',
    desc: 'Outputs probability distribution across 7 emotion classes. Generates urgency flag and automated Tamil customer response.',
    detail: 'Output layer produces softmax probabilities for: Frustration, Sarcasm, Anger, Sadness, Disappointment, Joy, Satisfaction. Urgency thresholds trigger automated escalation routing and Tamil response generation via template filling.',
  },
];

const DEEP_DIVE = [
  {
    icon: Cpu, color: 'text-teal-400',
    title: 'Morphology vs Subword Tokenization',
    body: 'Standard BERT subword tokenization breaks Tamil words into arbitrary character n-grams, losing grammatical context. Our Morphology Tokenizer isolates root verbs and specific Tamil inflectional suffixes that carry emotion polarity.',
  },
  {
    icon: Zap, color: 'text-pink-400',
    title: 'Contextual Sarcasm Inversion',
    body: 'Instead of taking words like "சூப்பர்" at face value, our Sarcasm Remapper checks for contradictory delay markers ("3 வாரம் ஆச்சு", "வரல") to flip literal positive predictions to Sarcasm & Frustration.',
  },
  {
    icon: Layers, color: 'text-violet-400',
    title: 'Catastrophic Forgetting Prevention',
    body: 'Using Elastic Weight Consolidation (EWC) with synthetic replay buffers, the AI integrates newly emerging Tanglish slang without losing accuracy on established Tamil literary or formal vocabulary.',
  },
];

export default function ArchitectureDiagram() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="space-y-5">

      {/* ── Page header ─────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Activity className="w-5 h-5 text-teal-400" />
          <h1 className="text-xl font-extrabold text-[var(--text-primary)]">Pipeline Architecture</h1>
          <span className="chip chip-teal ml-1">XAI Verified</span>
        </div>
        <p className="text-sm text-[var(--text-secondary)]">
          End-to-end processing pipeline from morpho-syntactic tokenisation to actionable escalation.
          Click any step to expand the technical details.
        </p>
      </div>

      {/* ── Horizontal pipeline cards ────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {STEPS.map((step, idx) => {
          const openUp = idx >= STEPS.length - 2; // last 2 steps open upward
          const Icon = step.icon;
          const isOpen = expanded === idx;
          return (
            <div key={idx} className="relative">
              {/* Arrow connector — desktop only */}
              {idx < STEPS.length - 1 && (
                <div className="hidden lg:flex absolute -right-1.5 top-1/2 -translate-y-1/2 z-10 w-3 h-3 items-center justify-center">
                  <ArrowRight className="w-3 h-3 text-[var(--text-muted)]" />
                </div>
              )}

              <button
                onClick={() => setExpanded(isOpen ? null : idx)}
                className={`w-full text-left card p-4 transition-all duration-200 hover:border-[var(--border-strong)] ${
                  isOpen
                    ? 'border-[var(--border-strong)] bg-[var(--bg-elevated)]'
                    : ''
                }`}
                style={isOpen ? { borderColor: step.color + '40' } : {}}
              >
                {/* Step number + icon */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono font-bold text-[var(--text-muted)]">
                    STEP {step.num}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-lg bg-gradient-to-br ${step.gradient} p-px`}
                  >
                    <div className="w-full h-full rounded-[7px] bg-[var(--bg-surface)] flex items-center justify-center">
                      <Icon className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-[var(--text-primary)] leading-snug mb-2">
                  {step.title}
                </h3>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                  {step.desc}
                </p>

                {/* Expand toggle */}
                <div className="flex items-center gap-1 mt-3 pt-2 border-t border-[var(--border-subtle)]">
                  <CheckCircle2 className="w-3 h-3 text-teal-400" />
                  <span className="text-[10px] text-[var(--text-muted)] font-mono flex-1">Module Verified</span>
                  {isOpen
                    ? <ChevronUp className="w-3 h-3 text-[var(--text-muted)]" />
                    : <ChevronDown className="w-3 h-3 text-[var(--text-muted)]" />}
                </div>
              </button>

              {/* Expanded detail — shows below on mobile, overlaid on desktop */}
              {isOpen && (
                <div
                  className={`mt-2 card-elevated rounded-xl p-4 animate-fade-up lg:absolute lg:left-0 lg:right-0 lg:z-20 ${
                    openUp
                      ? 'lg:bottom-full lg:mb-1'
                      : 'lg:top-full lg:mt-1'
                  }`}
                  style={{ borderColor: step.color + '30' }}
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: step.color }}>
                    Technical Details
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{step.detail}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Data flow visual ─────────────────────────────── */}
      <div className="card p-5">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--border-subtle)]">
          <Sparkles className="w-4 h-4 text-teal-400" />
          <h3 className="text-sm font-bold text-[var(--text-primary)]">Live Data Flow</h3>
        </div>
        <div className="flex items-center gap-0 overflow-x-auto pb-1">
          {['Raw Text', 'Morpho-Tokenizer', 'Sarcasm Engine', 'EWC Adapter', '7-Class Output', 'Escalation'].map((label, idx, arr) => (
            <React.Fragment key={idx}>
              <div className="flex-shrink-0 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-lg px-3 py-2 text-center">
                <div className="text-[10px] font-mono text-[var(--text-muted)] mb-0.5">#{idx + 1}</div>
                <div className="text-xs font-semibold text-[var(--text-primary)] whitespace-nowrap">{label}</div>
              </div>
              {idx < arr.length - 1 && (
                <div className="flex-shrink-0 px-1">
                  <ArrowRight className="w-4 h-4 text-teal-400" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ── Deep dive cards ──────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {DEEP_DIVE.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="card p-5 space-y-3">
              <div className={`flex items-center gap-2 font-bold text-sm ${item.color}`}>
                <Icon className="w-4 h-4" />
                <span>{item.title}</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{item.body}</p>
            </div>
          );
        })}
      </div>

    </div>
  );
}
