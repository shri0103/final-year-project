export const INITIAL_SLANG_LEXICON = [
  { term: "மொக்க", category: "Slang", sentiment: "Extremely Negative", meaning: "Useless / Low Quality", addedInEpoch: "Task Step 1", memoryWeight: 0.94 },
  { term: "கடுப்பேத்துறாங்க", category: "Agglutinative Verb", sentiment: "High Frustration", meaning: "Deliberately annoying / aggravating", addedInEpoch: "Task Step 1", memoryWeight: 0.96 },
  { term: "வேற லெவல்", category: "Code-Mixed Idiom", sentiment: "High Delight", meaning: "Next Level / Unmatched Excellence", addedInEpoch: "Task Step 2", memoryWeight: 0.98 },
  { term: "செமையா", category: "Colloquial Adjective", sentiment: "Positive Praise", meaning: "Superb / Top Notch", addedInEpoch: "Task Step 2", memoryWeight: 0.92 },
  { term: "வொர்த்தே இல்ல", category: "Tanglish Code-Mix", sentiment: "Disappointment", meaning: "Zero value for money", addedInEpoch: "Task Step 3", memoryWeight: 0.95 },
  { term: "டவர் காலி", category: "Domain Idiom", sentiment: "Implicit Frustration", meaning: "Complete signal loss", addedInEpoch: "Task Step 3", memoryWeight: 0.91 },
  { term: "வயித்துல அடித்தல்", category: "Cultural Idiom", sentiment: "Severe Grief/Anger", meaning: "Depriving livelihood/meal", addedInEpoch: "Core Memory", memoryWeight: 0.99 },
  { term: "சூப்பர் சிஸ்டம் (In Context)", category: "Sarcasm Marker", sentiment: "Inverted (Negative)", meaning: "Ironic mockery of failure", addedInEpoch: "Core Memory", memoryWeight: 0.97 }
];

export const MORPHOLOGICAL_SUFFIX_RULES = [
  { suffix: "-அல (-ala)", function: "Negative verb suffix", example: "வரல (varala) -> Didn't come", emotionImpact: "Elevates Frustration & Dissatisfaction score (+0.35)" },
  { suffix: "-உம் (-um)", function: "Inclusive / Concessive particle", example: "பணமும் (panamum) -> Money also", emotionImpact: "Triggers escalation when attached to unfulfilled demands" },
  { suffix: "-இட்டாங்க (-ittaanga)", function: "Aspectual honorific past", example: "பண்ணிட்டாங்க -> Completed action", emotionImpact: "Action completion tag" },
  { suffix: "-உல்+அ (-ulla)", function: "Locative case marker", example: "வீட்டுக்குள்ள -> Inside house", emotionImpact: "Spatial boundary indicator for network failures" },
  { suffix: "-ஏ (-ae)", function: "Emphatic suffix", example: "ரொம்பவே -> Exaggerated emphasis", emotionImpact: "Sarcasm indicator when paired with opposite sentiment root" }
];

export const CONTINUAL_LEARNING_STATS = {
  activeVocabularyCount: 14820,
  replayBufferCapacity: "5,000 Samples",
  ewcPenaltyLambda: 400.0,
  catastrophicForgettingProtection: "98.4%",
  adaptationEpochs: 14,
  lastAdaptedTime: "2026-09-24 18:45:00 UTC"
};
