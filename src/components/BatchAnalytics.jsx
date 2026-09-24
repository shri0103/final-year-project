import React, { useState } from 'react';
import { TAMIL_SAMPLE_FEEDBACK, EMOTION_TYPES } from '../data/tamilDataset';
import { 
  BarChart3, 
  Search, 
  Filter, 
  AlertTriangle, 
  CheckCircle2, 
  Zap, 
  ArrowUpRight, 
  TrendingUp, 
  MessageSquare, 
  Users, 
  ShieldAlert, 
  Flame,
  Download
} from 'lucide-react';

export default function BatchAnalytics() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('ALL');
  const [filterSarcasmOnly, setFilterSarcasmOnly] = useState(false);

  const filteredSamples = TAMIL_SAMPLE_FEEDBACK.filter(item => {
    const matchesSearch = item.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.actualEmotion.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesChannel = selectedChannel === 'ALL' || item.channel.includes(selectedChannel);
    const matchesSarcasm = !filterSarcasmOnly || item.sarcasmDetected;
    return matchesSearch && matchesChannel && matchesSarcasm;
  });

  return (
    <div className="space-y-8">
      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Customer Feedback</span>
            <MessageSquare className="w-5 h-5 text-teal-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">1,428 Feedback</div>
          <div className="flex items-center text-xs text-emerald-400 space-x-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+14.2% Tamil text traffic today</span>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Sarcasm & Implicit Alert</span>
            <Zap className="w-5 h-5 text-pink-400" />
          </div>
          <div className="text-2xl font-extrabold text-pink-400">312 Flagged</div>
          <div className="text-xs text-slate-400">
            <span className="text-pink-300 font-bold">21.8%</span> Sarcastic praise misread by baseline
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Escalation Saved</span>
            <ShieldAlert className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-amber-400">89 Critical Cases</div>
          <div className="text-xs text-slate-400">
            Prevented churn on order delays & cancellation
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Model Accuracy Advantage</span>
            <Flame className="w-5 h-5 text-violet-400" />
          </div>
          <div className="text-2xl font-extrabold text-violet-400">+18.0% Over mBERT</div>
          <div className="text-xs text-violet-300">
            Morphology-Aware Morpho-Syntactic Adapter
          </div>
        </div>
      </div>

      {/* Main Filter & Table Card */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-xl font-extrabold text-white flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-teal-400" />
              <span>Multi-Channel Tamil Customer Intelligence Stream</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Live feedback ingested from Zomato, Swiggy, Amazon, YouTube, and Telecom Support chats.
            </p>
          </div>

          {/* Action Export Button */}
          <button 
            onClick={() => alert("Exporting Tamil Emotion Dataset (CSV)...")}
            className="flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-700 hover:border-teal-500 text-slate-200 transition-all"
          >
            <Download className="w-4 h-4 text-teal-400" />
            <span>Export Flagged Log (CSV)</span>
          </button>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Tamil text, brand, or emotion..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="sm:col-span-3">
            <select
              value={selectedChannel}
              onChange={(e) => setSelectedChannel(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-teal-500"
            >
              <option value="ALL">All Channels</option>
              <option value="Food Delivery">Food Delivery (Zomato/Swiggy)</option>
              <option value="E-Commerce">E-Commerce (Amazon)</option>
              <option value="Telecom">Telecom (Airtel/Jio)</option>
              <option value="FinTech">FinTech / App Store</option>
            </select>
          </div>

          <div className="sm:col-span-3 flex items-center">
            <label className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={filterSarcasmOnly}
                onChange={(e) => setFilterSarcasmOnly(e.target.checked)}
                className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-cyan-500"
              />
              <span className="font-semibold text-pink-400">Filter Sarcasm Only</span>
            </label>
          </div>
        </div>

        {/* Feedback Records Table */}
        <div className="space-y-4">
          {filteredSamples.map((item) => (
            <div 
              key={item.id}
              className="glass-card rounded-xl p-5 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/60 pb-2.5">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-slate-900 text-cyan-300 border border-cyan-800/40">
                    {item.brand}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">• {item.channel}</span>
                </div>

                <div className="flex items-center space-x-2">
                  {item.sarcasmDetected && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-pink-950 text-pink-300 border border-pink-700/50">
                      <Zap className="w-3 h-3 mr-1 text-pink-400" /> Sarcastic Flip
                    </span>
                  )}
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                    item.urgency === 'CRITICAL' ? 'bg-red-950 text-red-300 border border-red-800' :
                    item.urgency === 'HIGH' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                    'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  }`}>
                    {item.urgency} Urgency
                  </span>
                </div>
              </div>

              {/* Text Snippet */}
              <div className="space-y-1">
                <p className="text-sm font-tamil text-slate-100 font-medium leading-relaxed">
                  "{item.text}"
                </p>
                <p className="text-xs text-slate-400 italic">
                  Transliteration: {item.transliteration}
                </p>
              </div>

              {/* Baseline vs Our Model Comparison Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Baseline Model Mistake:</span>
                    <span className="text-red-300 font-medium">{item.baselineResult.predictedEmotion}</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-lg border border-cyan-900/50 flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-cyan-400 uppercase font-semibold block">Our AI Reasoning ({item.confidence}%):</span>
                    <span className="text-emerald-300 font-medium">{item.ourModelResult.predictedEmotion}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
