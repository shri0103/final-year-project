import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles, MessageSquare, ShieldCheck,
  CheckCircle2, Zap, Globe2, ScanFace, BookType, Brain,
  Frown, SmilePlus, Database, AlertCircle
} from 'lucide-react';
import { emotionAPI } from '../services/api';

const SAMPLE_INPUTS = [
  { label: 'Sarcasm Contradiction', icon: <ScanFace size={16} />, color: '#F59E0B', text: 'ரொம்ப நல்லா சேவை செய்றீங்க! 3 வாரம் ஆச்சு, பொருளும் வரல, பணமும் திரும்ப வரல. சூப்பர் சிஸ்டம்!' },
  { label: 'Agglutinative Distress', icon: <Frown size={16} />, color: '#EF4444', text: 'என் வயித்துல அடிச்சுட்டீங்கப்பா! ஹோட்டல்ல ஆர்டர் பண்ணி 2 மணி நேரம் காக்க வச்சு கடைசியில கேன்சல் பண்ணிட்டீங்க.' },
  { label: 'Customer Delight', icon: <SmilePlus size={16} />, color: '#10B981', text: 'ரொம்ப நல்லா இருந்தது, சீக்கிரமா டெலிவரி பண்ணிட்டாங்க. அருமையான சர்வீஸ்!' },
  { label: 'Implicit Frustration', icon: <MessageSquare size={16} />, color: '#1565C0', text: 'போன் பண்ணா எடுக்கவே மாட்றாங்க...' },
];

const ANALYSIS_STEPS = [
  { icon: <BookType size={15} />, text: 'Agglutinative Tokenization & Morpheme Segmentation', color: '#1565C0' },
  { icon: <Globe2 size={15} />, text: 'Tamil Idiom Graph & Cultural Metaphor Matching', color: '#2196F3' },
  { icon: <ScanFace size={15} />, text: 'Contextual Sarcasm & Contradiction Resolution', color: '#1565C0' },
  { icon: <Brain size={15} />, text: 'Emotion Distribution & Baseline Model Comparison', color: '#2196F3' },
  { icon: <Database size={15} />, text: 'Persisting Analysis Result to MongoDB', color: '#10B981' },
];

export default function AnalyzeText() {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(-1);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const charCount = text.length;
  const hasText = text.trim().length > 0;

  const handleAnalyze = async () => {
    if (!hasText || isAnalyzing) return;
    setIsAnalyzing(true);
    setProgress(15);
    setActiveStep(0);
    setErrorMessage('');

    // Interval to advance progress visual
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev < 85) {
          const next = prev + 18;
          setActiveStep(Math.min(4, Math.floor(next / 20)));
          return next;
        }
        return prev;
      });
    }, 300);

    try {
      // Call real Spring Boot backend
      const result = await emotionAPI.analyze({
        text: text.trim(),
        channel: 'Web Console',
        brand: 'Tamil Customer Sentiment',
        username: JSON.parse(localStorage.getItem('tamil_ai_user') || '{}')?.username || 'researcher'
      });

      clearInterval(progressTimer);
      setProgress(100);
      setActiveStep(4);

      setTimeout(() => {
        navigate('/result', { state: { result, id: result.id, text } });
      }, 500);

    } catch (err) {
      clearInterval(progressTimer);
      console.error('Analysis failed:', err);
      setErrorMessage(err.message || 'Error communicating with Spring Boot backend.');
      setIsAnalyzing(false);
      setProgress(0);
      setActiveStep(-1);
    }
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
            Tokenizes agglutinative suffixes, resolves sarcasm contradictions, and persists results to MongoDB.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <Database size={14} className="text-emerald-600" /> Connected: Spring Boot + MongoDB
          </span>
        </div>
      </div>

      {/* ── Main Card ── */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-blue-100"
        style={{ borderLeft: '4px solid #2196F3' }}>

        {/* Card top bar */}
        <div className="px-6 py-4 flex items-center justify-between bg-blue-50/40 border-b border-blue-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-blue-100">
              <MessageSquare size={15} className="text-blue-700" />
            </div>
            <span className="font-bold text-xs uppercase tracking-wider text-gray-800">
              Tamil / Tanglish Input
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
            <ShieldCheck size={14} />
            <span>UTF-8 Tamil Script Supported</span>
          </div>
        </div>

        {/* Text Area */}
        <div className="p-6">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isAnalyzing}
            placeholder="தமிழ் பின்னூட்டத்தை இங்கே உள்ளிடவும்... (e.g. 'சூப்பர் சர்வீஸ்! 2 மணி நேரம் காக்க வச்சு கடைசியில கேன்சல் பண்ணிட்டீங்க.')"
            rows={5}
            className="w-full text-base font-tamil rounded-xl p-4 transition-all focus:outline-none resize-none border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            style={{ color: '#0D2137' }}
          />

          {/* Quick presets */}
          <div className="mt-4">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              Or Select Sample Feedback from Dataset:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SAMPLE_INPUTS.map((sample, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setText(sample.text)}
                  className="text-left p-2.5 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all flex items-start gap-2.5 text-xs group"
                >
                  <span className="p-1 rounded-md bg-gray-100 group-hover:bg-white text-blue-600 mt-0.5">
                    {sample.icon}
                  </span>
                  <div className="overflow-hidden">
                    <span className="font-bold text-gray-800 block">{sample.label}</span>
                    <span className="text-gray-500 font-tamil truncate block">{sample.text}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Error notice if backend failed */}
          {errorMessage && (
            <div className="mt-4 p-3.5 rounded-xl bg-red-50 text-red-700 border border-red-200 text-xs flex items-center gap-2">
              <AlertCircle size={16} />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Action bar */}
          <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-100">
            <span className="text-xs text-gray-400">
              {charCount} characters entered
            </span>
            <button
              onClick={handleAnalyze}
              disabled={!hasText || isAnalyzing}
              className="px-6 py-3 rounded-xl font-bold text-sm text-white flex items-center gap-2 transition-all shadow-md"
              style={{
                background: hasText && !isAnalyzing ? 'linear-gradient(135deg, #1565C0 0%, #2196F3 100%)' : '#9CA3AF',
                cursor: hasText && !isAnalyzing ? 'pointer' : 'not-allowed'
              }}
            >
              {isAnalyzing ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing with Spring Boot...</span>
                </>
              ) : (
                <>
                  <Zap size={16} />
                  <span>Run Morphology-Aware Reasoning</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Progress Pipeline Overlay ── */}
      {isAnalyzing && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 animate-fade-in space-y-4">
          <div className="flex justify-between items-center text-xs font-bold text-gray-700">
            <span>Neural Morphology Pipeline Execution</span>
            <span className="font-mono text-blue-600">{progress}%</span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2 pt-2">
            {ANALYSIS_STEPS.map((step, idx) => {
              const isDone = activeStep > idx;
              const isCurrent = activeStep === idx;
              return (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl border text-xs flex items-center gap-2 transition-all ${
                    isDone
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : isCurrent
                      ? 'bg-blue-50 border-blue-300 text-blue-800 font-bold shadow-sm'
                      : 'bg-gray-50 border-gray-100 text-gray-400'
                  }`}
                >
                  <span className={isDone ? 'text-emerald-600' : isCurrent ? 'text-blue-600' : 'text-gray-400'}>
                    {isDone ? <CheckCircle2 size={16} /> : step.icon}
                  </span>
                  <span className="line-clamp-2 leading-tight">{step.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
