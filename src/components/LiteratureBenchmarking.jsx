import React, { useState } from 'react';
import { BASE_PAPERS, BENCHMARK_METRICS, MODEL_COMPARISON_CHART_DATA } from '../data/basePapers';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid, 
  Cell 
} from 'recharts';
import { 
  BookOpen, 
  Award, 
  CheckCircle2, 
  XCircle, 
  ExternalLink, 
  BarChart2, 
  Layers, 
  Sparkles,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export default function LiteratureBenchmarking() {
  const [activePaperId, setActivePaperId] = useState(BASE_PAPERS[0].id);
  const activePaper = BASE_PAPERS.find(p => p.id === activePaperId) || BASE_PAPERS[0];

  return (
    <div className="space-y-8">
      {/* Literature Header */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-extrabold text-white">Literature Review & Base Paper Benchmarks</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Rigorous academic benchmarking against 10 peer-reviewed journals including IEEE Access, Springer, and Expert Systems with Applications.
            </p>
          </div>

          <div className="inline-flex items-center px-3 py-1.5 rounded-xl bg-amber-950/80 border border-amber-800/60 text-amber-300 text-xs font-bold">
            <Award className="w-4 h-4 mr-1.5 text-amber-400" />
            <span>Journal Base Paper: Prakash & Vijay (2025)</span>
          </div>
        </div>

        {/* Selected Base Paper Spotlight */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-5 rounded-xl border border-cyan-900/40 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center space-x-1.5">
              <Award className="w-4 h-4" />
              <span>Selected Primary Base Paper</span>
            </span>
            <span className="text-xs text-slate-400 font-mono">DOI: 10.1007/s10579-024-09804-1</span>
          </div>

          <h3 className="text-lg font-bold text-white">
            "{BASE_PAPERS[0].title}"
          </h3>
          
          <div className="text-xs text-slate-300">
            <span className="font-semibold text-cyan-300">{BASE_PAPERS[0].authors}</span> • {BASE_PAPERS[0].journal} ({BASE_PAPERS[0].year})
          </div>

          <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/80 p-3 rounded-lg border border-slate-800 font-sans">
            <strong className="text-cyan-400">Proposed Framework:</strong> {BASE_PAPERS[0].proposedFramework}. <br/>
            {BASE_PAPERS[0].keyFeatures}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
            <div className="bg-red-950/30 p-3 rounded-lg border border-red-900/40 space-y-1">
              <span className="font-bold text-red-400 block flex items-center space-x-1">
                <XCircle className="w-4 h-4" />
                <span>Base Paper Limitations Identified:</span>
              </span>
              <ul className="list-disc list-inside text-red-200/80 text-[11px] space-y-1">
                {BASE_PAPERS[0].limitationsIdentified.map((lim, idx) => (
                  <li key={idx}>{lim}</li>
                ))}
              </ul>
            </div>

            <div className="bg-emerald-950/30 p-3 rounded-lg border border-emerald-900/40 space-y-1">
              <span className="font-bold text-emerald-400 block flex items-center space-x-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>How Our Proposed Model Solves It:</span>
              </span>
              <p className="text-emerald-200/90 text-[11px] leading-relaxed">
                {BASE_PAPERS[0].howOurModelImproves}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Model Benchmark Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Chart: Accuracy & Sarcasm Comparison (7 cols) */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <BarChart2 className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base font-bold text-white">Baseline vs Proposed Model Metrics</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">Higher is Better (%)</span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MODEL_COMPARISON_CHART_DATA} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 10 }} interval={0} angle={-15} textAnchor="end" />
                <YAxis domain={[0, 100]} stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc', fontSize: '12px' }} 
                  formatter={(val) => [`${val}%`]}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="Accuracy" fill="#38bdf8" name="Overall Accuracy (%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="SarcasmF1" fill="#ec4899" name="Sarcasm F1-Score (%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="SuffixRobustness" fill="#a855f7" name="Morphological Suffix Parsing (%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Table: Metrics Summary Matrix (5 cols) */}
        <div className="lg:col-span-5 glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Quantitative Evaluation Matrix</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 px-2">Metric</th>
                  <th className="py-2.5 px-2">Baseline XLM</th>
                  <th className="py-2.5 px-2">IMSD 2025</th>
                  <th className="py-2.5 px-2 text-cyan-300">Our Model</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {BENCHMARK_METRICS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/60 transition-colors">
                    <td className="py-2.5 px-2 font-semibold text-slate-200">{row.metric}</td>
                    <td className="py-2.5 px-2 text-slate-400">{row.baselineXLM}</td>
                    <td className="py-2.5 px-2 text-purple-300">{row.basePaperIMSD}</td>
                    <td className="py-2.5 px-2 font-bold text-cyan-400">{row.ourModel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
