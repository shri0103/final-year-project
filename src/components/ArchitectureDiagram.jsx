import React from 'react';
import { 
  Activity, 
  Cpu, 
  Zap, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare, 
  Flame, 
  ShieldAlert, 
  Sparkles,
  Database,
  ArrowDown
} from 'lucide-react';

export default function ArchitectureDiagram() {
  const steps = [
    {
      num: "01",
      title: "Raw Tamil Text Ingestion",
      icon: MessageSquare,
      color: "from-blue-500 to-cyan-500",
      desc: "Receives raw customer text from multi-channel feeds (Zomato reviews, tweets, chat transcripts). Handles Tamil script, colloquialisms, and code-mixed Tanglish."
    },
    {
      num: "02",
      title: "Morpho-Syntactic Tokenizer",
      icon: Cpu,
      color: "from-cyan-500 to-teal-500",
      desc: "Deconstructs Tamil agglutinative suffixes (e.g. -றீங்க, -அல, -உல்+அ). Isolates root verbs, aspectual mood tags, and emotional intensity markers."
    },
    {
      num: "03",
      title: "Idiom Graph & Sarcasm Remapper",
      icon: Zap,
      color: "from-pink-500 to-purple-500",
      desc: "Evaluates context contradiction (e.g., superficial praise paired with 3-week delay). Remaps sarcastic positive predictions into intended negative emotions."
    },
    {
      num: "04",
      title: "Continual Adaptation Adapter (EWC)",
      icon: Layers,
      color: "from-purple-500 to-indigo-500",
      desc: "Applies Elastic Weight Consolidation (EWC) and synthetic memory replay to learn new youth slang (மொக்க, கடுப்பேத்துறாங்க) without catastrophic forgetting."
    },
    {
      num: "05",
      title: "7-Class Emotion & Escalation Engine",
      icon: Flame,
      color: "from-amber-500 to-red-500",
      desc: "Outputs probability distribution across Frustration, Sarcasm, Anger, Sadness, Disappointment, Joy, and Satisfaction. Generates automated Tamil response."
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-extrabold text-white">System Architecture & Technical Workflow</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              End-to-End Processing Pipeline: From Morpho-Syntactic Tokenization to Actionable Escalation.
            </p>
          </div>

          <div className="inline-flex items-center px-3 py-1.5 rounded-xl bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-semibold">
            <Sparkles className="w-4 h-4 mr-1.5 text-cyan-400" />
            <span>XAI Explainable Architecture</span>
          </div>
        </div>

        {/* Step-by-Step Flow Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-4 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx}
                className="glass-panel p-5 rounded-2xl border border-slate-800 relative space-y-3 flex flex-col justify-between hover:border-cyan-500/40 transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-extrabold text-slate-500">
                      STEP {step.num}
                    </span>
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${step.color} p-0.5 flex items-center justify-center shadow-md`}>
                      <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-white leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-2 text-[10px] text-cyan-400 font-mono flex items-center space-x-1 border-t border-slate-800">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                  <span>Module Verified</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Deep Dive Feature Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center space-x-2 text-cyan-400 font-bold text-sm">
            <Cpu className="w-5 h-5" />
            <span>Morphology vs Subword Tokenization</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Standard BERT subword tokenization breaks Tamil words into arbitrary character n-grams, losing grammatical context. Our Morphology Tokenizer isolates the root verb and specific Tamil inflectional suffixes.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center space-x-2 text-pink-400 font-bold text-sm">
            <Zap className="w-5 h-5" />
            <span>Contextual Sarcasm Inversion</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Instead of taking words like "சூப்பர்" or "நல்லா" at face value, our Sarcasm Remapper checks for contradictory delay markers ("3 வாரம் ஆச்சு", "வரல") to flip literal positive predictions to Sarcasm & Frustration.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center space-x-2 text-purple-400 font-bold text-sm">
            <Layers className="w-5 h-5" />
            <span>Catastrophic Forgetting Prevention</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Using Elastic Weight Consolidation (EWC) with synthetic replay buffers, the AI integrates newly emerging Tanglish slang without losing accuracy on established Tamil literary or formal vocabulary.
          </p>
        </div>
      </div>
    </div>
  );
}
