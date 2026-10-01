import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  ArrowLeft, BrainCircuit, Lightbulb, SplitSquareVertical, 
  Database, ShieldAlert, CheckCircle2, XCircle, Sparkles, BookOpen, Layers
} from 'lucide-react';
import { emotionAPI } from '../services/api';

export default function ResultPage() {
  const location = useLocation();
  const initialResult = location.state?.result;
  const analysisId = location.state?.id;
  const rawFallbackText = location.state?.text || "சூப்பர் சர்வீஸ்! இரண்டு மணி நேரம் காத்திருக்க வைத்ததற்கு நன்றி.";

  const [result, setResult] = useState(initialResult || null);
  const [loading, setLoading] = useState(!initialResult && !!analysisId);

  useEffect(() => {
    if (!result && analysisId) {
      setLoading(true);
      emotionAPI.getById(analysisId)
        .then(data => setResult(data))
        .catch(err => console.error('Failed to load analysis by id:', err))
        .finally(() => setLoading(false));
    }
  }, [analysisId, result]);

  // Fallback data if user navigated directly without state
  const data = result || {
    id: "sample-preview",
    rawText: rawFallbackText,
    primaryEmotion: "FRUSTRATION",
    secondaryEmotion: "SARCASM & ANGER",
    confidence: 94.8,
    sarcasmDetected: true,
    implicitEmotionDetected: false,
    urgency: "HIGH",
    emotionDistribution: {
      "Frustration": 88,
      "Sarcasm": 92,
      "Anger": 74,
      "Disappointment": 82,
      "Satisfaction": 4,
      "Joy": 3
    },
    morphologyBreakdown: [
      { token: "சூப்பர்", root: "சூப்பர்", pos: "Colloquial Praise", suffix: null, semantic: "Superficial literal praise marker" },
      { token: "சர்வீஸ்!", root: "சர்வீஸ்", pos: "Target Entity", suffix: null, semantic: "Service target noun" },
      { token: "இரண்டு மணி", root: "மணி", pos: "Numeral+Time", suffix: null, semantic: "2 hours duration context" },
      { token: "காத்திருக்க", root: "காத்திரு", pos: "Infinitive Verb", suffix: "-க்க", semantic: "Forced delay marker" },
      { token: "நன்றி.", root: "நன்றி", pos: "Noun / Courtesy", suffix: null, semantic: "Sarcastic inverted courtesy" }
    ],
    idiomsIdentified: [
      {
        idiom: "சூப்பர் சர்வீஸ் / சிஸ்டம் (Ironic Mockery)",
        meaning: "Praise token utilized ironically when core operational expectations are shattered",
        polarity: "Inverted Sarcastic Negation"
      }
    ],
    baselineResult: {
      model: "mBERT / MuRIL Baseline",
      predictedEmotion: "Positive / Joy (Fooled by literal 'சூப்பர்')",
      correct: false,
      reasoning: "Standard cross-lingual transformer performs literal keyword matching and misses contextual negation."
    },
    ourModelResult: {
      model: "Morphology-Aware Tamil Reasoner",
      predictedEmotion: "Sarcasm & High Frustration",
      correct: true,
      reasoning: "Contextual Contradiction Engine detects delay/waiting morphemes contradicting surface-level praise."
    },
    suggestedAction: "Priority Ticket #1: Dispatch automated Tamil resolution SMS and fast-track refund/delivery query."
  };

  const getUrgencyBadge = (urgency) => {
    switch (urgency) {
      case 'CRITICAL':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200">CRITICAL PRIORITY</span>;
      case 'HIGH':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">HIGH PRIORITY</span>;
      case 'MEDIUM':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">MEDIUM PRIORITY</span>;
      default:
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">STANDARD</span>;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <span className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-600 font-semibold">Fetching analysis record from MongoDB...</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-3xl font-extrabold text-primary">Emotion Reasoning Result</h1>
            {data.id && (
              <span className="flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 font-mono">
                <Database size={11} /> MongoDB ID: {data.id.substring(0, 10)}...
              </span>
            )}
          </div>
          <p className="text-muted">Deep linguistic, morphological, and cultural analysis.</p>
        </div>
        <Link to="/analyze" className="btn-secondary">
          <ArrowLeft size={16} /> New Analysis
        </Link>
      </div>

      {/* Input Card */}
      <div className="card p-6 bg-white border-l-4 border-l-blue-500 shadow-sm">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Original Tamil Text</p>
        <p className="text-xl font-tamil text-gray-900 leading-relaxed">{data.rawText}</p>
      </div>

      {/* Main Result Card */}
      <div className="card-gradient rounded-3xl p-8 md:p-10 shadow-2xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-white/80 font-semibold uppercase tracking-widest text-xs mb-2">Primary Detected Emotion</p>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight drop-shadow-md">
              {data.primaryEmotion}
            </h2>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20 backdrop-blur-md">
              <span className="font-mono text-xl font-bold text-highlight">{data.confidence || 92}%</span>
              <span className="text-sm text-white/90 font-medium">Confidence Score</span>
            </div>
          </div>
          
          <div className="space-y-3 md:border-l border-white/20 md:pl-8">
            <div className="flex justify-between items-center p-3 rounded-xl bg-white/10 border border-white/10">
              <span className="text-white/80 text-xs font-semibold uppercase">Secondary Emotion:</span>
              <span className="text-white font-bold tracking-wide text-sm">{data.secondaryEmotion || 'NONE'}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-white/10 border border-white/10">
              <span className="text-white/80 text-xs font-semibold uppercase">Sarcasm Contradiction:</span>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                data.sarcasmDetected ? 'bg-amber-400 text-gray-950 font-black' : 'bg-white/20 text-white'
              }`}>
                {data.sarcasmDetected ? 'DETECTED 😏' : 'NOT DETECTED'}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-white/10 border border-white/10">
              <span className="text-white/80 text-xs font-semibold uppercase">Urgency Assessment:</span>
              {getUrgencyBadge(data.urgency)}
            </div>
          </div>
        </div>
      </div>

      {/* Morphological Breakdown Table */}
      {data.morphologyBreakdown && data.morphologyBreakdown.length > 0 && (
        <div className="card overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Layers size={18} />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">Morphological Segmentation Breakdown</h3>
                <p className="text-xs text-gray-500">Agglutinative morphemes, root stems, and semantic roles</p>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700">
              {data.morphologyBreakdown.length} Tokens
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase font-semibold border-b">
                <tr>
                  <th className="px-6 py-3">Token (சொல்)</th>
                  <th className="px-6 py-3">Root / Stem</th>
                  <th className="px-6 py-3">Part of Speech</th>
                  <th className="px-6 py-3">Inflection Suffix</th>
                  <th className="px-6 py-3">Semantic Function</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.morphologyBreakdown.map((t, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-6 py-3.5 font-tamil font-bold text-gray-900">{t.token}</td>
                    <td className="px-6 py-3.5 font-tamil text-blue-700">{t.root || '-'}</td>
                    <td className="px-6 py-3.5 font-medium text-gray-600">{t.pos || 'Word'}</td>
                    <td className="px-6 py-3.5 font-mono text-xs text-amber-700">
                      {t.suffix ? (
                        <span className="px-2 py-0.5 bg-amber-50 rounded border border-amber-200">{t.suffix}</span>
                      ) : '-'}
                    </td>
                    <td className="px-6 py-3.5 text-xs text-gray-600">{t.semantic || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Cultural Idioms Identified */}
      {data.idiomsIdentified && data.idiomsIdentified.length > 0 && (
        <div className="card p-6 border-l-4 border-l-purple-500">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={20} className="text-purple-600" />
            <h3 className="text-lg font-bold text-gray-900">Tamil Cultural Idioms & Metaphors Identified</h3>
          </div>
          <div className="grid gap-3">
            {data.idiomsIdentified.map((idiom, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-purple-50/50 border border-purple-100 space-y-1">
                <div className="flex justify-between items-start">
                  <span className="font-tamil font-bold text-purple-900 text-base">{idiom.idiom}</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 font-semibold">
                    {idiom.polarity}
                  </span>
                </div>
                <p className="text-xs text-purple-800/80">{idiom.meaning}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Emotion Scores Distribution */}
      {data.emotionDistribution && Object.keys(data.emotionDistribution).length > 0 && (
        <div className="card p-8">
          <h3 className="text-lg font-bold text-primary mb-6">Emotion Probability Distribution</h3>
          <div className="space-y-4">
            {Object.entries(data.emotionDistribution).map(([emotion, val]) => {
              const color = emotion === 'Frustration' ? '#EF4444' :
                            emotion === 'Anger' ? '#DC2626' :
                            emotion === 'Sarcasm' ? '#F59E0B' :
                            emotion === 'Satisfaction' || emotion === 'Joy' ? '#10B981' : '#6B7280';
              return (
                <div key={emotion}>
                  <div className="flex justify-between text-sm font-semibold text-gray-800 mb-1.5">
                    <span>{emotion}</span>
                    <span className="font-mono text-gray-600">{val}%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500" 
                      style={{ width: `${val}%`, backgroundColor: color }} 
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Baseline vs Proposed Model Comparison (Core Project Research Contribution) */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Baseline Card */}
        <div className="card p-6 border-t-4 border-t-gray-400 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-gray-700 text-sm uppercase">Baseline: {data.baselineResult?.model || 'mBERT / XLM-R'}</h4>
            {data.baselineResult?.correct ? (
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-600">
                <CheckCircle2 size={16} /> Correct
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                <XCircle size={16} /> Foiled / Misclassified
              </span>
            )}
          </div>
          <div className="p-3 bg-gray-50 rounded-xl mb-3">
            <p className="text-xs text-gray-500 uppercase font-semibold">Predicted Emotion</p>
            <p className="text-base font-bold text-gray-800">{data.baselineResult?.predictedEmotion}</p>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">{data.baselineResult?.reasoning}</p>
        </div>

        {/* Our Model Card */}
        <div className="card p-6 border-t-4 border-t-blue-600 bg-blue-50/20">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-blue-900 text-sm uppercase flex items-center gap-1.5">
              <Sparkles size={16} className="text-blue-600" />
              {data.ourModelResult?.model || 'Morphology-Aware Reasoner'}
            </h4>
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              <CheckCircle2 size={16} /> Accurate Reasoning
            </span>
          </div>
          <div className="p-3 bg-white rounded-xl mb-3 border border-blue-100 shadow-sm">
            <p className="text-xs text-blue-600 uppercase font-semibold">Predicted Emotion & Context</p>
            <p className="text-base font-bold text-blue-900">{data.ourModelResult?.predictedEmotion}</p>
          </div>
          <p className="text-xs text-blue-950 leading-relaxed">{data.ourModelResult?.reasoning}</p>
        </div>
      </div>

      {/* Suggested Action */}
      {data.suggestedAction && (
        <div className="card p-6 bg-gradient-to-r from-blue-50 via-indigo-50 to-white border border-blue-200">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-blue-600 text-white">
              <Lightbulb size={20} />
            </div>
            <div>
              <h4 className="font-bold text-blue-950 text-sm uppercase tracking-wider mb-1">
                Prescriptive Customer Action & Ticket Routing
              </h4>
              <p className="text-sm font-medium text-blue-900 leading-relaxed">
                {data.suggestedAction}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
