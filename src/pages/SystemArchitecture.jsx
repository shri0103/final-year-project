import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Server, MessageSquare, Code2, Waypoints, Sparkles, Brain, 
  ArrowDown, ArrowRight, GitBranch, RefreshCw, Cpu, Database, CheckCircle2, Award
} from 'lucide-react';
import { systemAPI } from '../services/api';

export default function SystemArchitecture() {
  const [benchmarks, setBenchmarks] = useState([]);
  const [healthInfo, setHealthInfo] = useState(null);

  useEffect(() => {
    systemAPI.getBenchmarks()
      .then(data => setBenchmarks(data))
      .catch(err => console.error('Benchmark fetch error:', err));

    systemAPI.getHealth()
      .then(data => setHealthInfo(data))
      .catch(err => console.error('Health fetch error:', err));
  }, []);

  const contributions = [
    { icon: <Code2 />, title: 'Morphology Awareness', desc: 'Segments agglutinative morphemes (-அல, -உம், -இட்டாங்க) into root and grammatical inflections.' },
    { icon: <Waypoints />, title: 'Cultural Understanding', desc: 'Grounds Tamil idioms and metaphors (e.g. வயித்துல அடித்தல், டவர் காலி) to exact emotional distress.' },
    { icon: <Sparkles />, title: 'Sarcasm Detection', desc: 'Identifies polarity mismatches between superficial praise and operational delay/failure tokens.' },
    { icon: <Brain />, title: 'Implicit Emotion Reasoning', desc: 'Infers unstated frustration from abandonment patterns (e.g. unanswered telephone attempts).' },
    { icon: <RefreshCw />, title: 'Continual Adaptation', desc: 'Evolves dynamically with newly emerging Tamil slang using EWC and replay buffers without catastrophic forgetting.' }
  ];

  return (
    <div className="animate-fade-in max-w-7xl mx-auto space-y-10 pb-12">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-3 border border-blue-200">
          <Database size={13} /> Fullstack Java Spring Boot + MongoDB Architecture
        </div>
        <h1 className="text-4xl font-extrabold text-primary mb-3">System Architecture & Empirical Benchmarks</h1>
        <p className="text-muted text-base">
          End-to-end morphology-aware reasoning pipeline with MongoDB persistence and continual model adaptation.
        </p>
      </div>

      {/* Main Pipeline & Contributions */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Main Pipeline */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold text-primary px-2 mb-4">Neural & Morphological Reasoning Pipeline</h3>
          
          <div className="card p-8 bg-gradient-to-b from-white to-blue-50/30 border-t-4 border-t-primary relative">
            <div className="flex flex-col items-center max-w-md mx-auto relative z-10">
              
              {/* Pipeline Nodes */}
              <div className="w-full card p-4 flex items-center gap-4 bg-white shadow-sm hover:border-secondary transition-colors group">
                <div className="p-3 bg-primary/5 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-primary">Tamil Customer Feedback Ingestion</h4>
                  <p className="text-xs text-muted">UTF-8 Unicode Tamil & Tanglish Code-Mixed String</p>
                </div>
              </div>

              <ArrowDown className="text-blue-400 my-2" size={24} />

              <div className="w-full card p-4 flex items-center gap-4 bg-white shadow-sm hover:border-secondary transition-colors group">
                <div className="p-3 bg-primary/5 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Cpu size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-primary">Spring Boot REST Controller Layer</h4>
                  <p className="text-xs text-muted">Validates payload, sanitizes tokens, passes to reasoning engine</p>
                </div>
              </div>

              <ArrowDown className="text-blue-400 my-2" size={24} />

              <div className="w-full card p-4 flex items-center gap-4 bg-white border-l-4 border-l-blue-500 shadow-md">
                <div className="p-3 bg-blue-50 rounded-lg text-blue-600"><Code2 size={20} /></div>
                <div>
                  <h4 className="font-bold text-primary">Tamil Morphology Decomposer</h4>
                  <p className="text-xs text-muted font-semibold">Isolates root stems, POS, and agglutinative suffixes</p>
                </div>
              </div>

              <ArrowDown className="text-blue-400 my-2" size={24} />

              <div className="w-full card p-4 flex items-center gap-4 bg-white border-l-4 border-l-indigo-500 shadow-md">
                <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600"><Waypoints size={20} /></div>
                <div>
                  <h4 className="font-bold text-primary">Tamil Cultural Idiom Graph & Sarcasm Remapper</h4>
                  <p className="text-xs text-muted font-semibold">Identifies semantic contradictions between delay and literal praise</p>
                </div>
              </div>

              <ArrowDown className="text-blue-400 my-2" size={24} />

              <div className="w-full p-4 flex items-center gap-4 rounded-xl shadow-lg transform scale-105" style={{background:'linear-gradient(135deg,#0D2137 0%,#1565C0 100%)',border:'1px solid rgba(33,150,243,0.3)'}}>
                <div className="p-3 bg-white/20 rounded-lg" style={{color:'#BBDEFB'}}><Brain size={24} /></div>
                <div>
                  <h4 className="font-bold text-white text-base">Emotion Reasoning & Baseline Contrast Engine</h4>
                  <p className="text-xs text-white/80 font-medium">Computes true emotion distribution, confidence, and explainability</p>
                </div>
              </div>

              <ArrowDown className="text-blue-400 my-2" size={24} />

              <div className="w-full card p-4 flex items-center gap-4 bg-white border-l-4 border-l-emerald-500 shadow-sm">
                <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600"><Database size={20} /></div>
                <div>
                  <h4 className="font-bold text-primary">MongoDB Document Persistence & Audit</h4>
                  <p className="text-xs text-muted">Persisted to MongoDB with indices, timestamps, and ticket actions</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Side Panel: Core Contributions */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-primary px-2 mb-4">Core Contributions</h3>
          
          <div className="grid gap-3.5">
            {contributions.map((item, idx) => (
              <div key={idx} className="card p-4 bg-white hover:-translate-y-0.5 transition-transform">
                <div className="flex gap-3.5">
                  <div className="mt-0.5 text-blue-600 shrink-0">
                    {React.cloneElement(item.icon, { size: 20 })}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm mb-0.5">{item.title}</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Backend Stack Card */}
          <div className="card p-5 bg-blue-50/50 border border-blue-200">
            <h4 className="font-bold text-blue-950 text-sm mb-3 flex items-center gap-2">
              <Server size={16} className="text-blue-600" /> Active Fullstack Environment
            </h4>
            <div className="space-y-2 text-xs text-blue-900 font-medium">
              <div className="flex justify-between py-1 border-b border-blue-100">
                <span>Backend Framework:</span>
                <span className="font-bold">Java 17 • Spring Boot 3.2.5</span>
              </div>
              <div className="flex justify-between py-1 border-b border-blue-100">
                <span>Database Engine:</span>
                <span className="font-bold">MongoDB 9.0.2 Community</span>
              </div>
              <div className="flex justify-between py-1 border-b border-blue-100">
                <span>Server Port:</span>
                <span className="font-bold">8080 (REST / JSON)</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Frontend:</span>
                <span className="font-bold">React 18 + Vite 5 + Tailwind</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Model Benchmark Comparison Table from Spring Boot */}
      <div className="card overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Award size={20} className="text-amber-500" />
            <div>
              <h3 className="text-base font-bold text-gray-900">Comparative Empirical Benchmarks (Low-Resource Tamil NLP)</h3>
              <p className="text-xs text-gray-500">Evaluated against state-of-the-art multilingual and Indic models</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            Empirically Validated
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase font-semibold border-b">
              <tr>
                <th className="px-6 py-3">Model Architecture</th>
                <th className="px-6 py-3">Overall Accuracy</th>
                <th className="px-6 py-3">Macro F1-Score</th>
                <th className="px-6 py-3">Sarcasm Precision</th>
                <th className="px-6 py-3">Agglutinative Morpheme Recall</th>
                <th className="px-6 py-3">Latency (ms)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {benchmarks.length > 0 ? (
                benchmarks.map((b, idx) => (
                  <tr key={idx} className={b.highlight ? 'bg-blue-50/60 font-semibold' : 'hover:bg-gray-50'}>
                    <td className="px-6 py-3.5 flex items-center gap-2">
                      {b.highlight && <Sparkles size={15} className="text-blue-600" />}
                      <span className={b.highlight ? 'text-blue-900 font-bold' : 'text-gray-800'}>{b.model}</span>
                    </td>
                    <td className="px-6 py-3.5 font-mono text-xs">{b.accuracy}%</td>
                    <td className="px-6 py-3.5 font-mono text-xs">{b.f1Score}%</td>
                    <td className="px-6 py-3.5 font-mono text-xs">
                      <span className={b.sarcasmPrecision > 80 ? 'text-emerald-700 font-bold' : 'text-gray-600'}>
                        {b.sarcasmPrecision}%
                      </span>
                    </td>
                    <td className="px-6 py-3.5 font-mono text-xs">
                      <span className={b.agglutinativeRecall > 80 ? 'text-emerald-700 font-bold' : 'text-gray-600'}>
                        {b.agglutinativeRecall}%
                      </span>
                    </td>
                    <td className="px-6 py-3.5 font-mono text-xs text-gray-500">{b.latencyMs} ms</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-xs text-gray-400">Loading benchmark evaluation matrix...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="flex justify-center pt-4">
        <Link to="/analyze" className="btn-primary text-base px-8 py-3.5 shadow-md flex items-center gap-2">
          <span>Test the Live Reasoning Engine</span>
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
