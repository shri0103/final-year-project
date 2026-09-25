import React, { createContext, useContext, useState, useCallback } from 'react';
import { INITIAL_SLANG_LEXICON } from '../data/lexiconData';

/* ─── Shape of one analysis result ──────────────────────── */
// {
//   id, timestamp, inputText, emotion, confidence,
//   urgency, sarcasm, channel, brand,
//   emotionDistribution, reasoning, isCustom,
//   pipelineSteps: [{ id, active, processingTime }]
// }

const AppContext = createContext(null);

export function AppProvider({ children, navigateTo }) {
  /* Analysis history — accumulates every "Run Analysis" click */
  const [analysisHistory, setAnalysisHistory] = useState([]);

  /* Custom lexicon — Continual Learning terms, enriched with detection power */
  const [customLexicon, setCustomLexicon] = useState(INITIAL_SLANG_LEXICON);

  /* The most recent analysis result (for Architecture live trace) */
  const [lastAnalysis, setLastAnalysis] = useState(null);

  /* ── Add a new analysis result to history ─────────────── */
  const addAnalysis = useCallback((result) => {
    const entry = {
      ...result,
      id: `analysis-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    setAnalysisHistory(prev => [entry, ...prev]);
    setLastAnalysis(entry);
    return entry;
  }, []);

  /* ── Add new slang term to custom lexicon ─────────────── */
  const addToLexicon = useCallback((item) => {
    setCustomLexicon(prev => [item, ...prev]);
  }, []);

  /* ── Remove from lexicon ──────────────────────────────── */
  const removeFromLexicon = useCallback((idx) => {
    setCustomLexicon(prev => prev.filter((_, i) => i !== idx));
  }, []);

  /* ── Build pipeline trace steps for a given result ───── */
  const buildPipelineTrace = useCallback((result) => {
    return [
      {
        id: 'ingest',
        label: 'Text Ingestion',
        active: true,
        detail: `Received ${result.inputText.length} chars of ${result.isCustom ? 'custom' : 'preset'} Tamil/Tanglish text`,
        processingMs: 12,
      },
      {
        id: 'morpho',
        label: 'Morpho-Tokenizer',
        active: true,
        detail: result.morphologyTokenCount
          ? `Parsed ${result.morphologyTokenCount} tokens — isolated ${result.suffixCount || 0} inflectional suffixes`
          : 'Tokenized input for suffix and root extraction',
        processingMs: 38,
      },
      {
        id: 'sarcasm',
        label: 'Sarcasm Remapper',
        active: result.sarcasm,
        detail: result.sarcasm
          ? `Contradiction detected — praise tokens + negative context → polarity flipped`
          : 'No contradictory polarity signals found — pass-through',
        processingMs: result.sarcasm ? 56 : 8,
      },
      {
        id: 'ewc',
        label: 'EWC Adapter',
        active: result.lexiconHit,
        detail: result.lexiconHit
          ? `Custom lexicon hit: "${result.lexiconHit}" → boosted ${result.emotion} score`
          : 'No custom lexicon terms matched — base model used',
        processingMs: result.lexiconHit ? 22 : 4,
      },
      {
        id: 'classify',
        label: '7-Class Engine',
        active: true,
        detail: `Dominant: ${result.emotion} @ ${result.confidence}% — Urgency: ${result.urgency}`,
        processingMs: 18,
      },
      {
        id: 'escalate',
        label: 'Escalation Engine',
        active: result.urgency !== 'NORMAL',
        detail: result.urgency !== 'NORMAL'
          ? `${result.urgency} urgency triggered — auto-response generated in Tamil`
          : 'Normal urgency — standard acknowledgement queued',
        processingMs: result.urgency !== 'NORMAL' ? 15 : 5,
      },
    ];
  }, []);

  const value = {
    /* State */
    analysisHistory,
    customLexicon,
    lastAnalysis,
    /* Actions */
    addAnalysis,
    addToLexicon,
    removeFromLexicon,
    buildPipelineTrace,
    /* Navigation helper passed down from App */
    navigateTo,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
