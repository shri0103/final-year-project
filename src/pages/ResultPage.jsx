import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, RefreshCw, AlertOctagon, BrainCircuit, Lightbulb, SplitSquareVertical } from 'lucide-react';

export default function ResultPage() {
  const location = useLocation();
  const text = location.state?.text || "சூப்பர் சர்வீஸ்! இரண்டு மணி நேரம் காத்திருக்க வைத்ததற்கு நன்றி.";

  // Determine demo data based on text (for visual demo purposes)
  const isSarcastic = text.includes('நன்றி') || text.includes('சூப்பர்');
  
  return (
    <div className="animate-fade-in max-w-5xl mx-auto space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Emotion Reasoning Result</h1>
          <p className="text-muted">Detailed analysis of the linguistic and cultural context.</p>
        </div>
        <Link to="/analyze" className="btn-secondary">
          <ArrowLeft size={16} /> New Analysis
        </Link>
      </div>

      {/* Input Card */}
      <div className="card p-6 bg-white border-l-4 border-l-accent shadow-sm">
        <p className="text-sm font-bold text-muted uppercase tracking-wider mb-2">Original Text</p>
        <p className="text-xl font-tamil text-primary leading-relaxed">{text}</p>
      </div>

      {/* Main Result Card */}
      <div className="card-gradient rounded-3xl p-8 md:p-10 shadow-2xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-white/80 font-semibold uppercase tracking-widest text-sm mb-2">Primary Emotion</p>
            <h2 className="text-6xl font-black text-white mb-4 tracking-tight drop-shadow-md">FRUSTRATION</h2>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20 backdrop-blur-md">
              <span className="font-mono text-xl font-bold text-highlight">87%</span>
              <span className="text-sm text-white/90 font-medium">Confidence Score</span>
            </div>
          </div>
          
          <div className="space-y-4 md:border-l border-white/20 md:pl-8">
            <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-white/80 text-sm font-medium">Secondary Emotion:</span>
              <span className="text-white font-bold tracking-wide">ANGER</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-white/80 text-sm font-medium">Sarcasm:</span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-accent text-primary">DETECTED</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-white/80 text-sm font-medium">Implicit Emotion:</span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-accent text-primary">DETECTED</span>
            </div>
          </div>
        </div>
      </div>

      {/* Emotion Scores */}
      <div className="card p-8">
        <h3 className="text-lg font-bold text-primary mb-6">Emotion Distribution</h3>
        <div className="space-y-5">
          {[
            { label: 'Frustration', val: 87, color: 'var(--color-accent)' },
            { label: 'Anger', val: 72, color: 'var(--color-secondary)' },
            { label: 'Sadness', val: 24, color: 'var(--text-muted)' },
            { label: 'Satisfaction', val: 8, color: 'var(--text-muted)' }
          ].map(emotion => (
            <div key={emotion.label}>
              <div className="flex justify-between text-sm font-semibold text-primary mb-2">
                <span>{emotion.label}</span>
                <span className="font-mono">{emotion.val}%</span>
              </div>
              <div className="progress-bg">
                <div 
                  className="progress-fill" 
                  style={{ width: `${emotion.val}%`, background: emotion.color }} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why this emotion? */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card p-6">
          <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary mb-4">
            <SplitSquareVertical size={20} />
          </div>
          <h4 className="font-bold text-primary mb-2">Linguistic Cues</h4>
          <p className="text-sm text-muted mb-4">Positive words used in negative context</p>
          <div className="p-3 bg-primary/5 rounded-lg border border-card-border font-tamil text-primary text-sm font-medium">
            "சூப்பர் சர்வீஸ்", "நன்றி"
          </div>
        </div>
        
        <div className="card p-6">
          <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary mb-4">
            <BrainCircuit size={20} />
          </div>
          <h4 className="font-bold text-primary mb-2">Morphological Cues</h4>
          <p className="text-sm text-muted mb-4">Intensifier suffix altering emotion</p>
          <div className="p-3 bg-secondary/5 rounded-lg border border-card-border font-tamil text-secondary text-sm font-medium">
            "வைத்ததற்கு" (Caused to happen)
          </div>
        </div>

        <div className="card p-6">
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-secondary mb-4">
            <Lightbulb size={20} />
          </div>
          <h4 className="font-bold text-primary mb-2">Cultural Context</h4>
          <p className="text-sm text-muted mb-4">Service expectation mismatch</p>
          <div className="p-3 bg-accent/5 rounded-lg border border-card-border text-primary text-sm font-medium">
            Waiting 2 hours violates "super service" claim
          </div>
        </div>
      </div>

      {/* Sarcasm Card */}
      {isSarcastic && (
        <div className="card border-l-4 border-l-secondary overflow-hidden">
          <div className="bg-secondary/5 p-4 border-b border-card-border">
            <h3 className="font-bold text-primary flex items-center gap-2">
              <AlertOctagon className="text-secondary" size={18} /> Sarcasm Analysis
            </h3>
          </div>
          <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center w-full md:w-1/3">
              <p className="text-xs font-bold text-muted uppercase tracking-widest mb-3">Literal Meaning</p>
              <div className="p-4 rounded-xl bg-white border border-card-border shadow-sm text-green-600 font-bold">
                Positive / Grateful
              </div>
            </div>
            
            <ArrowRight className="text-muted hidden md:block" size={24} />
            <div className="h-6 w-[2px] bg-card-border md:hidden" />
            
            <div className="text-center w-full md:w-1/3">
              <p className="text-xs font-bold text-muted uppercase tracking-widest mb-3">Actual Context</p>
              <div className="p-4 rounded-xl bg-white border border-card-border shadow-sm text-secondary font-bold">
                Long waiting time (2 hours)
              </div>
            </div>

            <ArrowRight className="text-muted hidden md:block" size={24} />
            <div className="h-6 w-[2px] bg-card-border md:hidden" />

            <div className="text-center w-full md:w-1/3">
              <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3">Contextual Interpretation</p>
              <div className="p-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white shadow-lg font-bold">
                Sarcastic Frustration
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Emotion Reasoning Flow */}
      <div className="card p-8 bg-white">
        <h3 className="text-lg font-bold text-primary mb-8 text-center">Emotion Reasoning Process</h3>
        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 text-sm font-semibold">
          <span className="badge badge-blue">Input</span>
          <ArrowRight size={14} className="text-muted" />
          <span className="badge badge-blue">Linguistic Cues</span>
          <ArrowRight size={14} className="text-muted" />
          <span className="badge badge-blue">Morphology</span>
          <ArrowRight size={14} className="text-muted" />
          <span className="badge badge-blue">Cultural Context</span>
          <ArrowRight size={14} className="text-muted" />
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-secondary text-white">Sarcasm</span>
          <ArrowRight size={14} className="text-muted" />
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-accent text-primary">FRUSTRATION</span>
        </div>
      </div>

      <div className="flex justify-center pt-6">
        <Link to="/analyze" className="btn-primary text-lg px-8 py-4">
          <RefreshCw size={20} className="mr-2" /> Analyze Another Text
        </Link>
      </div>
    </div>
  );
}
