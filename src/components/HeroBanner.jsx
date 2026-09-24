import React from 'react';
import { 
  GraduationCap, 
  Sparkles, 
  Zap, 
  Cpu, 
  RefreshCw, 
  ChevronRight,
  Award,
  TrendingUp,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function HeroBanner({ onTrySample }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0a0f1d] via-[#070a13] to-[#070a13] border-b border-slate-800/80 pt-8 pb-12">
      {/* Glow Orbs & Grid */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Hero Text Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold tracking-wide shadow-sm">
              <Sparkles className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Advanced Tamil NLP & Emotion Reasoning System</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15] font-sans">
              Culturally Grounded <br className="hidden sm:inline" />
              <span className="text-gradient-emerald">Tamil Emotion Reasoning</span> <br />
              <span className="text-slate-200 text-2xl sm:text-3xl lg:text-4xl font-bold">with Morphology-Aware Adaptation</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-sans">
              An advanced AI system engineered to overcome Dravidian NLP limitations: accurately identifying agglutinative inflections, idiomatic sarcasm, and implicit customer frustration in Tamil text while continually adapting to emerging youth slang without retraining.
            </p>

            {/* Key Innovation Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold bg-slate-900/90 text-slate-200 border border-slate-700/80">
                <Cpu className="w-3.5 h-3.5 mr-1.5 text-teal-400" /> Morpho-Syntactic Tokenizer
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold bg-slate-900/90 text-slate-200 border border-slate-700/80">
                <Zap className="w-3.5 h-3.5 mr-1.5 text-pink-400" /> Sarcasm Inversion Engine
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold bg-slate-900/90 text-slate-200 border border-slate-700/80">
                <RefreshCw className="w-3.5 h-3.5 mr-1.5 text-violet-400" /> Continual Adaptation (EWC)
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold bg-slate-900/90 text-slate-200 border border-slate-700/80">
                <Award className="w-3.5 h-3.5 mr-1.5 text-amber-400" /> Prakash & Vijay (2025)
              </span>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onTrySample}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-emerald-500 via-teal-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 transition-all shadow-lg shadow-emerald-500/25 transform hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4 fill-current" />
                <span>Launch Emotion Workbench</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Live AI Demonstration Card (5 Cols) */}
          <div className="lg:col-span-5 w-full">
            <div className="glass-panel-luxury rounded-3xl p-6 border border-teal-500/30 space-y-5 relative overflow-hidden shadow-2xl">
              
              {/* Top Card Bar */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                    Live Model Performance
                  </span>
                </div>
                <span className="text-[11px] font-mono text-teal-400 bg-teal-950 px-2.5 py-0.5 rounded-full border border-teal-800">
                  v2.4 Morpho-Aware
                </span>
              </div>

              {/* Core Benchmark Metrics Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 text-center space-y-1">
                  <div className="text-2xl font-black text-gradient-emerald">89.4%</div>
                  <div className="text-[11px] text-slate-400 font-medium">Overall Accuracy</div>
                  <div className="text-[10px] text-emerald-400 font-mono flex items-center justify-center space-x-0.5 pt-0.5">
                    <TrendingUp className="w-3 h-3 mr-0.5" /> +18% vs mBERT
                  </div>
                </div>

                <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 text-center space-y-1">
                  <div className="text-2xl font-black text-gradient-violet">86.2%</div>
                  <div className="text-[11px] text-slate-400 font-medium">Sarcasm F1 Score</div>
                  <div className="text-[10px] text-violet-400 font-mono flex items-center justify-center space-x-0.5 pt-0.5">
                    <Zap className="w-3 h-3 mr-0.5" /> Sarcasm Flip
                  </div>
                </div>
              </div>

              {/* Live Sarcasm Remapper Mini Showcase Widget */}
              <div className="bg-slate-950/90 rounded-2xl p-4 border border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-300">Live Sarcasm Detection Sample:</span>
                  <span className="text-[10px] text-pink-400 font-mono font-bold bg-pink-950/80 px-2 py-0.5 rounded border border-pink-800/50">
                    SARCASM FLIP
                  </span>
                </div>

                <p className="text-xs font-tamil text-slate-200 bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 italic">
                  "செம சர்வீஸ் பா, ஆர்டர் பண்ணி 3 வாரம் கழிச்சு லேட்டா கொண்டு வந்தீங்க!"
                </p>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-red-950/30 p-2 rounded-lg border border-red-900/40">
                    <span className="text-red-400 font-semibold block text-[10px]">Standard mBERT:</span>
                    <span className="text-red-300 font-bold">Joy / Positive (FAIL)</span>
                  </div>
                  <div className="bg-emerald-950/30 p-2 rounded-lg border border-emerald-900/40">
                    <span className="text-emerald-400 font-semibold block text-[10px]">Our Proposed Model:</span>
                    <span className="text-emerald-300 font-bold">Frustration / Sarcasm (96%)</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onTrySample}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-teal-300 border border-teal-500/40 hover:border-teal-400 transition-all flex items-center justify-center space-x-2 shadow-sm"
              >
                <span>Test Interactive Live Reasoning Workbench</span>
                <ChevronRight className="w-4 h-4 text-teal-400" />
              </button>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
