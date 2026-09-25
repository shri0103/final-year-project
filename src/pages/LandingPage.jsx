import React from 'react';
import { Link } from 'react-router-dom';
import { BrainCircuit, BookType, Globe2, ScanFace, Sparkles, ArrowRight, MessageSquare, ShieldAlert, Cpu } from 'lucide-react';

export default function LandingPage() {
  const features = [
    { icon: <BookType className="w-6 h-6 text-accent" />, title: "Morphology-Aware", desc: "Understands root words and complex Tamil suffixes." },
    { icon: <Globe2 className="w-6 h-6 text-accent" />, title: "Cultural Context", desc: "Recognizes local idioms and cultural nuances." },
    { icon: <ScanFace className="w-6 h-6 text-accent" />, title: "Sarcasm Detection", desc: "Identifies contradictions between literal and actual meaning." },
    { icon: <MessageSquare className="w-6 h-6 text-accent" />, title: "Implicit Emotion", desc: "Uncovers emotions hidden between the lines." },
    { icon: <Cpu className="w-6 h-6 text-accent" />, title: "Continual Adaptation", desc: "Evolves with new slang and expressions." }
  ];

  return (
    <div className="min-h-screen bg-primary">
      {/* Navbar */}
      <nav className="border-b border-card-border bg-white/80 backdrop-blur-md fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-accent shadow-lg shadow-accent/20">
              <Sparkles size={24} />
            </div>
            <span className="text-2xl font-bold text-primary tracking-tight">
              TamilEmotion<span className="text-accent">AI</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-primary font-medium hover:text-accent transition-colors">Home</Link>
            <Link to="/analyze" className="text-muted font-medium hover:text-primary transition-colors">Analyze</Link>
            <Link to="/dashboard" className="text-muted font-medium hover:text-primary transition-colors">Dashboard</Link>
            <Link to="/architecture" className="text-muted font-medium hover:text-primary transition-colors">Architecture</Link>
            <Link to="/analyze" className="btn-primary ml-4">
              Start Analysis <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute bottom-0 left-20 w-72 h-72 bg-highlight/20 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent font-semibold text-sm border border-accent/30">
              <Sparkles size={16} /> Final-Year Project Demonstration
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
              Understand Tamil Emotion <span className="text-gradient-light">Beyond Words.</span>
            </h1>
            <p className="text-lg text-white/70 max-w-xl leading-relaxed">
              Culturally grounded Tamil emotion reasoning with morphology-aware analysis, contextual understanding, sarcasm detection and continual adaptation.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/analyze" className="btn-primary text-base px-8 py-4">
                Analyze Tamil Text
              </Link>
              <Link to="/architecture" className="btn-secondary text-base px-8 py-4">
                Explore Architecture
              </Link>
            </div>
          </div>

          {/* Abstract AI Visualization */}
          <div className="relative h-[500px] flex items-center justify-center animate-fade-in delay-200">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl border border-white shadow-xl overflow-hidden backdrop-blur-sm">
              <div className="node-tree p-12 h-full justify-center">
                <div className="px-6 py-3 text-sm node-card shadow-lg rounded-full bg-white/10 border border-accent/40 text-accent font-semibold">Tamil Text</div>
                <div className="node-connector" />
                <div className="px-6 py-3 text-sm node-card shadow-lg rounded-full bg-white/10 border border-white/20 text-white font-semibold">Morphology</div>
                <div className="node-connector" />
                <div className="px-6 py-3 text-sm node-card shadow-lg rounded-full bg-white/10 border border-white/20 text-white font-semibold">Cultural Context</div>
                <div className="node-connector" />
                <div className="px-6 py-3 text-sm node-card shadow-lg rounded-full bg-white/10 border border-white/20 text-white font-semibold">Sarcasm</div>
                <div className="node-connector" />
                <div className="px-8 py-4 text-base node-card shadow-xl rounded-full bg-gradient-to-r from-accent to-highlight text-primary font-bold pulse-icon">
                  Emotion Reasoning
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">Core Capabilities</h2>
            <p className="text-muted">Advanced linguistic techniques tailored specifically for the Tamil language.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="card p-6 hover:-translate-y-2 group">
                <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-accent/10 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">{feature.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-primary relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-white/60">A systematic pipeline to extract deep emotional meaning.</p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-accent/20 to-highlight/20 -translate-y-1/2 z-0" />
            
            {['Tamil Feedback', 'Linguistic Processing', 'Morphological Understanding', 'Contextual Reasoning', 'Emotion Detection'].map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center gap-4 group w-full md:w-auto">
                <div className="w-16 h-16 rounded-2xl bg-white/10 border-2 border-white/20 shadow-lg flex items-center justify-center text-xl font-bold text-white group-hover:border-accent group-hover:text-accent transition-all">
                  {idx + 1}
                </div>
                <span className="text-sm font-semibold text-center text-white/80 w-32">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="card-gradient rounded-3xl p-12 shadow-2xl">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to understand Tamil emotion differently?</h2>
            <p className="text-white/80 mb-10 text-lg max-w-2xl mx-auto">
              Experience the morphology-aware emotion reasoning model in action.
            </p>
            <Link to="/analyze" className="btn-primary bg-white text-primary hover:bg-bg-primary hover:text-primary shadow-xl shadow-black/10 px-8 py-4 text-lg">
              Analyze Tamil Text <ArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
