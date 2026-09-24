export const TAMIL_SAMPLE_FEEDBACK = [
  {
    id: "sample-1",
    title: "Sarcastic E-Commerce Delay Feedback",
    text: "ரொம்ப நல்லா சேவை செய்றீங்க! 3 வாரம் ஆச்சு, பொருளும் வரல, பணமும் திரும்ப வரல. சூப்பர் சிஸ்டம்!",
    transliteration: "Romba nalla sevai seiringa! 3 vaaram aachu, porulum varala, panamum thirumba varala. Super system!",
    channel: "Zomato / E-Commerce Review",
    brand: "ExpressKart Tamil",
    explicitEmotion: "Joy / Praise (Literal text reads 'Super system' & 'Very good service')",
    actualEmotion: "Sarcasm & Extreme Frustration",
    confidence: 96.8,
    sarcasmDetected: true,
    urgency: "HIGH",
    morphologyBreakdown: [
      { token: "ரொம்ப", root: "ரொம்ப", pos: "Adverb", semantic: "Intensifier (Very)" },
      { token: "நல்லா", root: "நன்மை", pos: "Adjective", semantic: "Literal positive tag" },
      { token: "செய்றீங்க!", root: "செய்", pos: "Verb+Inflection", suffix: "-றீங்க (2nd Person Plural)", semantic: "Sarcastic praise marker" },
      { token: "3 வாரம்", root: "வாரம்", pos: "Noun+Numeral", semantic: "Temporal delay context (3 weeks)" },
      { token: "ஆச்சு,", root: "ஆகு", pos: "Past Verb", semantic: "Elapsed duration" },
      { token: "பொருளும்", root: "பொருள்", pos: "Noun+Suffix", suffix: "-உம் (Inclusive conjunction)", semantic: "Negative item condition" },
      { token: "வரல,", root: "வரு", pos: "Negative Verb", suffix: "-அல (Negative suffix)", semantic: "Non-delivery flag" },
      { token: "பணமும்", root: "பணம்", pos: "Noun+Suffix", suffix: "-உம் (Conjunction)", semantic: "Refund context" },
      { token: "திரும்ப", root: "திரும்பு", pos: "Adverb", semantic: "Return status" },
      { token: "வரல.", root: "வரு", pos: "Negative Verb", suffix: "-அல", semantic: "Refund failure" },
      { token: "சூப்பர்", root: "சூப்பர்", pos: "Colloquial Praise", semantic: "Sarcastic literal mismatch" },
      { token: "சிஸ்டம்!", root: "சிஸ்டம்", pos: "Noun", semantic: "Target entity" }
    ],
    idiomsIdentified: [
      { idiom: "ரொம்ப நல்லா... சூப்பர் சிஸ்டம்", meaning: "Used mockingly when service severely fails", polarity: "Inverted (Negative)" }
    ],
    emotionDistribution: {
      "Frustration": 65,
      "Sarcasm": 88,
      "Anger": 72,
      "Disappointment": 80,
      "Joy": 5,
      "Satisfaction": 2
    },
    baselineResult: {
      model: "MuRIL / mBERT Baseline",
      predictedEmotion: "Positive / Joy (Literal match on 'நல்லா', 'சூப்பர்')",
      correct: false
    },
    ourModelResult: {
      model: "Morphology-Aware Tamil Emotion Reasoner",
      predictedEmotion: "Sarcasm & High Frustration",
      correct: true,
      reasoning: "Contextual contradiction detected: Delay tokens ('3 வாரம் ஆச்சு', 'வரல') contradict superficial praise tokens ('நல்லா', 'சூப்பர்'). Morphological negative suffixes (-அல) trigger sarcasm remapper."
    },
    suggestedAction: "Immediate CS Escalation (Ticket Priority #1) & Refund Confirmation SMS in Tamil."
  },
  {
    id: "sample-2",
    title: "Idiomatic Deep Frustration (Agglutinative)",
    text: "என் வயித்துல அடிச்சுட்டீங்கப்பா! ஹோட்டல்ல ஆர்டர் பண்ணி 2 மணி நேரம் காக்க வச்சு கடைசியில கேன்சல் பண்ணிட்டீங்க.",
    transliteration: "En vayithula adichutteengappa! Hotella order panni 2 mani neram kaakka vachu kadaisiyila cancel pannitteenga.",
    channel: "Food Delivery App",
    brand: "Swiggy / Zomato Tamil",
    explicitEmotion: "Neutral / Action description",
    actualEmotion: "Deep Frustration & Distress",
    confidence: 94.2,
    sarcasmDetected: false,
    urgency: "CRITICAL",
    morphologyBreakdown: [
      { token: "என்", root: "நான்", pos: "Possessive Pronoun", semantic: "First person" },
      { token: "வயித்துல", root: "வயிறு", pos: "Noun+Locative", suffix: "-உல்+அ (Locative case)", semantic: "Idiomatic body part metaphor" },
      { token: "அடிச்சுட்டீங்கப்பா!", root: "அடி", pos: "Verb+Agglutinative Suffix", suffix: "-ச்சு-உட்டீங்க-அப்பா (Aspectual distress suffix)", semantic: "Cultural idiom for severe livelihood/hunger harm" },
      { token: "ஹோட்டல்ல", root: "ஹோட்டல்", pos: "Noun+Locative", suffix: "-இல்/ல", semantic: "Restaurant venue" },
      { token: "ஆர்டர் பண்ணி", root: "ஆர்டர்", pos: "Code-Mixed Verb", semantic: "Order event" },
      { token: "2 மணி நேரம்", root: "மணி நேரம்", pos: "Duration", semantic: "2 hours wait" },
      { token: "காக்க வச்சு", root: "கா", pos: "Causative Verb", semantic: "Forced delay" },
      { token: "கடைசியில", root: "கடைசி", pos: "Time Noun", semantic: "At last" },
      { token: "கேன்சல் பண்ணிட்டீங்க.", root: "கேன்சல்", pos: "Verb+Aspect", suffix: "-இட்டீங்க (Completed action)", semantic: "Unilateral order cancellation" }
    ],
    idiomsIdentified: [
      { idiom: "வயித்துல அடித்தல் (Vayithil Adithal)", meaning: "Literally 'striking the stomach' - culturally signifies severe injustice, destroying basic meal/livelihood expectations", polarity: "Deep Grief & Extreme Anger" }
    ],
    emotionDistribution: {
      "Frustration": 92,
      "Anger": 84,
      "Sadness": 76,
      "Sarcasm": 12,
      "Joy": 0,
      "Satisfaction": 0
    },
    baselineResult: {
      model: "Standard XLM-R",
      predictedEmotion: "Sadness (Misses agglutinative idiom 'வயித்துல அடிச்சுட்டீங்கப்பா')",
      correct: false
    },
    ourModelResult: {
      model: "Morphology-Aware Tamil Emotion Reasoner",
      predictedEmotion: "Severe Frustration & Distress",
      correct: true,
      reasoning: "Morpho-syntactic adapter isolated root 'வயிறு' + verb 'அடி' with emotional intensifier '-ப்பா'. Idiom Graph mapped 'வயித்துல அடித்தல்' to high-distress food cancellation event."
    },
    suggestedAction: "Full order refund + ₹150 apology voucher + Priority Call from Customer Operations Manager."
  },
  {
    id: "sample-3",
    title: "Implicit Frustration in Telecom Support",
    text: "நெட்வொர்க் சிக்னல் ரொம்பவே அருமை, வீட்டுக்குள்ள போனாலே டவர் காலி! கால் பண்ணா கட் ஆகுது.",
    transliteration: "Network signal rombave arumai, veettukkulla ponale tower kaali! Call panna cut aaguthu.",
    channel: "Telecom Feedback",
    brand: "Airtel / Jio Tamil",
    explicitEmotion: "Praise ('அருமை')",
    actualEmotion: "Sarcasm & Implicit Anger",
    confidence: 93.5,
    sarcasmDetected: true,
    urgency: "HIGH",
    morphologyBreakdown: [
      { token: "நெட்வொர்க்", root: "நெட்வொர்க்", pos: "Noun", semantic: "Target service" },
      { token: "சிக்னல்", root: "சிக்னல்", pos: "Noun", semantic: "Connectivity metric" },
      { token: "ரொம்பவே", root: "ரொம்ப", pos: "Adverb+Emphatic", suffix: "-ஏ (Emphatic suffix)", semantic: "Ironical exaggeration" },
      { token: "அருமை,", root: "அருமை", pos: "Adjective", semantic: "Literal 'Excellent' tag" },
      { token: "வீட்டுக்குள்ள", root: "வீடு", pos: "Noun+Dative+Locative", suffix: "-உக்கு-உள்ள (Inside the house)", semantic: "Spatial restriction" },
      { token: "போனாலே", root: "போ", pos: "Conditional Verb", suffix: "-ஆல்+ஏ (As soon as entered)", semantic: "Trigger condition" },
      { token: "டவர்", root: "டவர்", pos: "Noun", semantic: "Signal tower" },
      { token: "காலி!", root: "காலி", pos: "Colloquial Adjective", semantic: "Empty/Zero signal" },
      { token: "கால் பண்ணா", root: "கால்", pos: "Code-Mixed Verb", semantic: "Making phone call" },
      { token: "கட் ஆகுது.", root: "கட்", pos: "Verb+Present", suffix: "-ஆகுது (Continuous failure)", semantic: "Call drop failure" }
    ],
    idiomsIdentified: [
      { idiom: "டவர் காலி", meaning: "Colloquial term for complete loss of cellular signal strength", polarity: "Negative" }
    ],
    emotionDistribution: {
      "Sarcasm": 91,
      "Frustration": 86,
      "Anger": 64,
      "Joy": 4,
      "Neutral": 8
    },
    baselineResult: {
      model: "TF-IDF + FastText Baseline",
      predictedEmotion: "Positive (Scored high on 'அருமை')",
      correct: false
    },
    ourModelResult: {
      model: "Morphology-Aware Tamil Emotion Reasoner",
      predictedEmotion: "Sarcastic Complaint",
      correct: true,
      reasoning: "'அருமை' (Excellent) directly precedes immediate complaint 'வீட்டுக்குள்ள போனாலே டவர் காலி'. Sarcasm ratio flip score: +0.89."
    },
    suggestedAction: "Log Network Coverage Complaint for Pincode & Dispatch Field Technician."
  },
  {
    id: "sample-4",
    title: "Genuine Delight & Loyalty (Positive Control)",
    text: "வேற லெவல் சர்வீஸ்! சொன்ன நேரத்துக்கு முன்னாடியே டெலிவரி பண்ணிட்டாங்க. பேக்கிங் கூட செமையா இருந்துச்சு, தேங்க்ஸ்!",
    transliteration: "Vera level service! Sonna nerathukku munnadiye delivery pannittaanga. Packing kooda semaiya irundhuchu, thanks!",
    channel: "Product Review",
    brand: "Amazon Tamil",
    explicitEmotion: "High Delight & Gratitude",
    actualEmotion: "Genuine Joy & High Satisfaction",
    confidence: 98.1,
    sarcasmDetected: false,
    urgency: "LOW (Positive Feedback)",
    morphologyBreakdown: [
      { token: "வேற லெவல்", root: "வேற லெவல்", pos: "Slang Modifier", semantic: "High acclaim (Next Level)" },
      { token: "சர்வீஸ்!", root: "சர்வீஸ்", pos: "Noun", semantic: "Service entity" },
      { token: "சொன்ன", root: "சொல்", pos: "Relative Participle", semantic: "Promised" },
      { token: "நேரத்துக்கு", root: "நேரம்", pos: "Noun+Dative", suffix: "-உக்கு (To the time)", semantic: "Target time" },
      { token: "முன்னாடியே", root: "முன்", pos: "Adverb+Emphatic", suffix: "-ஆடியே (Even before)", semantic: "Early arrival praise" },
      { token: "டெலிவரி பண்ணிட்டாங்க.", root: "டெலிவரி", pos: "Verb+Honorific Past", suffix: "-இட்டாங்க (Respectful completion)", semantic: "Successful delivery" },
      { token: "பேக்கிங்", root: "பேக்கிங்", pos: "Noun", semantic: "Packaging quality" },
      { token: "கூட", root: "கூட", pos: "Particle", semantic: "Also" },
      { token: "செமையா", root: "செமை", pos: "Colloquial Adjective", semantic: "Superb / Awesome" },
      { token: "இருந்துச்சு,", root: "இரு", pos: "Past Verb", semantic: "Existed" },
      { token: "தேங்க்ஸ்!", root: "தேங்க்ஸ்", pos: "Gratitude", semantic: "Direct thanks" }
    ],
    idiomsIdentified: [
      { idiom: "வேற லெவல் / செமையா", meaning: "Popular contemporary Tamil slang for exceptional excellence", polarity: "Extremely Positive" }
    ],
    emotionDistribution: {
      "Joy": 94,
      "Satisfaction": 97,
      "Gratitude": 91,
      "Sarcasm": 0,
      "Frustration": 0,
      "Anger": 0
    },
    baselineResult: {
      model: "mBERT",
      predictedEmotion: "Positive (82%)",
      correct: true
    },
    ourModelResult: {
      model: "Morphology-Aware Tamil Emotion Reasoner",
      predictedEmotion: "High Loyalty & Joy (98.1%)",
      correct: true,
      reasoning: "Colloquial slang 'வேற லெவல்' & 'செமையா' matched in dynamic continual adaptation lexicon. Zero contradiction markers found."
    },
    suggestedAction: "Send automated loyalty reward points & request 5-star rating on App Store."
  },
  {
    id: "sample-5",
    title: "Evolving Tanglish Slang & Code-Mixed Frustration",
    text: "செம கடுப்பேத்துறாங்க பா! 3 times refund request பண்ணியும் auto-reject ஆகுது. மொக்க அப்ளிகேஷன், வொர்த்தே இல்ல!",
    transliteration: "Sema kaduppethuraanga pa! 3 times refund request panniyum auto-reject aaguthu. Mokka application, worthe illa!",
    channel: "App Store Review",
    brand: "FinTech App",
    explicitEmotion: "Extreme Displeasure",
    actualEmotion: "Anger & Frustration",
    confidence: 97.4,
    sarcasmDetected: false,
    urgency: "CRITICAL",
    morphologyBreakdown: [
      { token: "செம", root: "செம", pos: "Intensifier Slang", semantic: "Very high magnitude" },
      { token: "கடுப்பேத்துறாங்க", root: "கடுப்பு", pos: "Noun+Causative Verb", suffix: "-ஏத்து-றாங்க (Irritating verb inflection)", semantic: "Generating severe annoyance" },
      { token: "பா!", root: "அப்பா/பா", pos: "Colloquial Interjection", semantic: "Emphatic emotional strain" },
      { token: "3 times", root: "3 times", pos: "English Count", semantic: "Repetitive failure (3x)" },
      { token: "refund request", root: "refund", pos: "English Noun", semantic: "Target transaction" },
      { token: "பண்ணியும்", root: "பண்ணு", pos: "Concessive Verb", suffix: "-இஉம் (Even after doing)", semantic: "Unresolved effort" },
      { token: "auto-reject", root: "reject", pos: "English Verb", semantic: "Automated denial" },
      { token: "ஆகுது.", root: "ஆகு", pos: "Present Verb", semantic: "Happening continuously" },
      { token: "மொக்க", root: "மொக்க", pos: "Contemporary Slang", semantic: "Useless / Low Quality" },
      { token: "அப்ளிகேஷன்,", root: "அப்ளிகேஷன்", pos: "Noun", semantic: "Software application" },
      { token: "வொர்த்தே", root: "worth", pos: "English Noun+Emphatic", suffix: "-ஏ", semantic: "Value assertion" },
      { token: "இல்ல!", root: "இல்லை", pos: "Negative Verb", semantic: "Complete absence of value" }
    ],
    idiomsIdentified: [
      { idiom: "கடுப்பேத்துறாங்க / மொக்க / வொர்த்தே இல்ல", meaning: "Youth slang for extreme annoyance and zero value product", polarity: "High Negative Intensity" }
    ],
    emotionDistribution: {
      "Anger": 89,
      "Frustration": 95,
      "Disappointment": 88,
      "Sarcasm": 5,
      "Joy": 0,
      "Satisfaction": 0
    },
    baselineResult: {
      model: "Standard mBERT",
      predictedEmotion: "Neutral / Unclassified (Failed on code-mixed slang 'செம கடுப்பேத்துறாங்க', 'மொக்க')",
      correct: false
    },
    ourModelResult: {
      model: "Morphology-Aware Tamil Emotion Reasoner",
      predictedEmotion: "High Anger & Frustration",
      correct: true,
      reasoning: "Continual Adaptation Adapter identified recent Tamil youth slang ('மொக்க', 'கடுப்பேத்துறாங்க') + code-mixed English ('auto-reject', 'refund request'). Agglutinative suffix '-பண்ணியும்' recognized as unsuccessful attempt."
    },
    suggestedAction: "Trigger FinTech payment dispute audit & assign Senior Support Agent to manually process refund."
  }
];

export const EMOTION_TYPES = [
  { key: "Frustration", label: "Frustration (மன உளைச்சல்)", color: "#f59e0b", icon: "AlertTriangle" },
  { key: "Sarcasm", label: "Sarcasm / Irony (நையாண்டி)", color: "#ec4899", icon: "Zap" },
  { key: "Anger", label: "Anger (கோபம்)", color: "#ef4444", icon: "Flame" },
  { key: "Disappointment", label: "Disappointment (ஏமாற்றம்)", color: "#8b5cf6", icon: "ThumbsDown" },
  { key: "Sadness", label: "Sadness (வருத்தம்)", color: "#3b82f6", icon: "CloudRain" },
  { key: "Joy", label: "Joy & Delight (மகிழ்ச்சி)", color: "#10b981", icon: "Smile" },
  { key: "Satisfaction", label: "Satisfaction (திருப்தி)", color: "#06b6d4", icon: "CheckCircle2" }
];
