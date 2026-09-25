import React from 'react';
import { Link } from 'react-router-dom';
import { Server, MessageSquare, Code2, Waypoints, Sparkles, Brain, ArrowDown, ArrowRight, GitBranch, RefreshCw, Cpu } from 'lucide-react';

export default function SystemArchitecture() {
  const contributions = [
    { icon: <Code2 />, title: 'Morphology Awareness', desc: 'Handles agglutinative nature of Tamil' },
    { icon: <Waypoints />, title: 'Cultural Understanding', desc: 'Maps idioms to emotion context' },
    { icon: <Sparkles />, title: 'Sarcasm Detection', desc: 'Identifies polarity mismatches' },
    { icon: <Brain />, title: 'Implicit Emotion', desc: 'Reasoning beyond explicit keywords' },
    { icon: <RefreshCw />, title: 'Continual Adaptation', desc: 'Evolves with new slang' }
  ];

  return (
    <div className="animate-fade-in max-w-7xl mx-auto space-y-10 pb-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold text-primary mb-4">System Architecture</h1>
        <p className="text-muted text-lg">Text-based Tamil emotion reasoning pipeline</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Main Pipeline */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold text-primary px-2 mb-4">Reasoning Pipeline</h3>
          
          <div className="card p-8 bg-gradient-to-b from-white to-bg-primary/50 border-t-4 border-t-primary relative">
            <div className="flex flex-col items-center max-w-md mx-auto relative z-10">
              
              {/* Pipeline Nodes */}
              <div className="w-full card p-4 flex items-center gap-4 bg-white shadow-sm hover:border-secondary transition-colors group">
                <div className="p-3 bg-primary/5 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors"><MessageSquare size={20} /></div>
                <div>
                  <h4 className="font-bold text-primary">Tamil Customer Feedback</h4>
                  <p className="text-xs text-muted">Raw text input</p>
                </div>
              </div>

              <ArrowDown className="text-secondary/40 my-2" size={24} />

              <div className="w-full card p-4 flex items-center gap-4 bg-white shadow-sm hover:border-secondary transition-colors group">
                <div className="p-3 bg-primary/5 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors"><Cpu size={20} /></div>
                <div>
                  <h4 className="font-bold text-primary">Text Preprocessing</h4>
                  <p className="text-xs text-muted">Cleaning, tokenization</p>
                </div>
              </div>

              <ArrowDown className="text-secondary/40 my-2" size={24} />

              <div className="w-full card p-4 flex items-center gap-4 bg-white border-l-4 border-l-accent shadow-md">
                <div className="p-3 bg-accent/10 rounded-lg text-secondary"><Code2 size={20} /></div>
                <div>
                  <h4 className="font-bold text-primary">Tamil Linguistic Processing</h4>
                  <p className="text-xs text-muted font-semibold">Morphology-Aware Representation</p>
                </div>
              </div>

              <ArrowDown className="text-secondary/40 my-2" size={24} />

              <div className="w-full card p-4 flex items-center gap-4 bg-white border-l-4 border-l-secondary shadow-md">
                <div className="p-3 bg-secondary/10 rounded-lg text-secondary"><Waypoints size={20} /></div>
                <div>
                  <h4 className="font-bold text-primary">Context Extraction</h4>
                  <p className="text-xs text-muted font-semibold">Cultural / Idiom Context & Sarcasm Detection</p>
                </div>
              </div>

              <ArrowDown className="text-secondary/40 my-2" size={24} />

              <div className="w-full p-4 flex items-center gap-4 rounded-xl shadow-lg transform scale-105" style={{background:'linear-gradient(135deg,#0D2137 0%,#1565C0 100%)',border:'1px solid rgba(33,150,243,0.3)'}}>
                <div className="p-3 bg-white/20 rounded-lg" style={{color:'#BBDEFB'}}><Brain size={24} /></div>
                <div>
                  <h4 className="font-bold text-white text-lg">Emotion Reasoning</h4>
                  <p className="text-xs text-white/80 font-medium">Emotion + Confidence + Explanation</p>
                </div>
              </div>

              <ArrowDown className="text-secondary/40 my-2" size={24} />

              <div className="w-full card p-4 flex items-center gap-4 bg-white border-l-4 border-l-highlight shadow-sm">
                <div className="p-3 bg-highlight/20 rounded-lg text-secondary"><RefreshCw size={20} /></div>
                <div>
                  <h4 className="font-bold text-primary">Continual Adaptation</h4>
                  <p className="text-xs text-muted">User Feedback Loop</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-primary px-2 mb-4">Core Contributions</h3>
          
          <div className="grid gap-4">
            {contributions.map((item, idx) => (
              <div key={idx} className="card p-5 bg-white hover:-translate-y-1 transition-transform group">
                <div className="flex gap-4">
                  <div className="mt-1 text-secondary group-hover:text-accent transition-colors">
                    {React.cloneElement(item.icon, { size: 24 })}
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1">{item.title}</h4>
                    <p className="text-sm text-secondary font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="card p-6 border border-accent/20 bg-accent/5 mt-8">
            <h4 className="font-bold text-primary mb-4 flex items-center gap-2">
              <GitBranch size={18} className="text-secondary" /> Research Flow
            </h4>
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-card-border before:to-transparent">
              
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-white bg-primary text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10"></div>
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-1.5rem)] card p-3 shadow-sm bg-white">
                  <div className="font-bold text-primary text-sm">Base Approach</div>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-white bg-secondary text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10"></div>
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-1.5rem)] card p-3 shadow-sm bg-white">
                  <div className="font-bold text-primary text-sm">Identified Limitations</div>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-white bg-accent text-primary shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10"></div>
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-1.5rem)] card p-3 shadow-sm bg-white">
                  <div className="font-bold text-primary text-sm">Proposed Approach</div>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-white bg-highlight text-primary shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10"></div>
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-1.5rem)] p-3 rounded-lg shadow-sm" style={{background:'#0D2137'}}>
                  <div className="font-bold text-sm text-white">Tamil Emotion Reasoning</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center pt-8">
        <Link to="/analyze" className="btn-primary text-lg px-8 py-4">
          Test the Architecture <ArrowRight className="ml-2" size={20} />
        </Link>
      </div>
    </div>
  );
}
