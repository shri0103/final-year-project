# Comprehensive Project Audit: Morphology-Aware Tamil Emotion Reasoner & Continual Adaptation System

**Audit Date**: October 1, 2026  
**Repository**: [shri0103/final-year-project](https://github.com/shri0103/final-year-project)  
**Workspace**: `d:\FINAL YEAR PROJECT`  
**Auditor**: Senior AI & Full-Stack Systems Architect  
**Objective**: Deep codebase verification to determine what is **Real / Functional**, **Partially Implemented**, **Hardcoded**, **Mock**, **Simulated**, or **Missing** across ML, NLP, Security, Backend, and Frontend layers.

---

## 1. Executive Summary & Verdict Matrix

The project presents itself as an advanced **Deep Learning & Continual Learning NLP Research Project** capable of morphology-aware decomposition, transformer cross-lingual baseline evaluation (mBERT, XLM-RoBERTa, IndicBERT), cultural idiom graph mapping, and Elastic Weight Consolidation (EWC) continual learning.

### Ground Truth Finding:
- **Full-Stack Application Layer (UI + Spring Boot + MongoDB)**: **REAL / FUNCTIONAL**  
  The React frontend communicates via real HTTP REST calls to a Spring Boot 3.2.5 backend, which performs real CRUD operations and queries against a real MongoDB 9.0 instance running on `localhost:27017`.
- **Machine Learning & Deep Learning Inference**: **MISSING**  
  There is **no model file** (`.pt`, `.bin`, `.onnx`, `.h5`, `.pkl`), **no Python ML service**, **no PyTorch/TensorFlow runtime**, and **no transformer inference** whatsoever.
- **Linguistic & Morphological Analysis**: **HARDCODED / MOCK (Heuristic Rules)**  
  Tokens are matched against a static map of 38 hardcoded words. Suffixes are stripped using five basic string `endsWith()` checks. There is no real morphological parser or Finite State Transducer (FST).
- **Emotion & Sarcasm Classification**: **MOCK / HEURISTIC RULES**  
  Classifications are made using basic `String.contains()` checks on keyword lists. Confidence scores (`94.8%`, `96.2%`) and emotion distribution maps are hardcoded integer constants.
- **Continual Adaptation & EWC**: **SIMULATED**  
  There is **zero** Fisher Information Matrix calculation, **zero** neural parameter regularization, and **zero** replay buffer sampling. Clicking "Run Simulation" increments an integer counter in MongoDB and returns static text strings describing training logs.
- **Authentication & Security**: **MOCK / INSECURE**  
  JWT is a pseudo-token (`"jwt-" + UUID.randomUUID()`) with **no cryptographic signing or validation**. Passwords are stored and checked in **plain text**. APIs are **100% unprotected**.

---

## 2. Feature-by-Feature Status Breakdown

| Component / Feature | Declared In UI / Readme | Actual Implementation in Code | Verdict |
|---|---|---|---|
| **Frontend UI (React 18 + Vite)** | Modern SaaS Dashboard | 8 pages, Tailwind CSS, Recharts, Lucide icons, responsive layout | **REAL / FUNCTIONAL** |
| **Backend REST API (Spring Boot 3)** | Spring Boot 3.2.5 REST services | 6 REST Controllers, 5 Services, 6 Mongo Repositories | **REAL / FUNCTIONAL** |
| **Database Persistence (MongoDB 9)** | Document storage (`tamilemotedb`) | Real MongoDB connection via Spring Data, 6 collections | **REAL / FUNCTIONAL** |
| **User Authentication (Login/Register)** | Secure JWT Authentication | Pseudo-token UUID string; plain-text password comparison; no API route guards | **MOCK / INSECURE** |
| **Password Encryption (BCrypt)** | Implied enterprise security | Plain text `user.getPassword().equals(password)` | **MISSING** |
| **API Protection / Authorization** | Protected researcher endpoints | Zero Spring Security filters; all `/api/*` endpoints are open to public | **MISSING** |
| **Tamil Morphological Tokenization** | Agglutinative morpheme segmentation | Static Map of 38 words + 5 `endsWith()` heuristics in Java | **HARDCODED / HEURISTIC** |
| **Emotion Classification Engine** | Deep neural emotion reasoning | 4 `if-else` branches checking `contains()` on ~25 keywords | **MOCK / HEURISTIC** |
| **Confidence Scores & Distributions** | Dynamic softmax probabilities | Hardcoded constants (`94.8`, `96.2`, `89.4`) and fixed maps; `Math.random()` in legacy UI | **HARDCODED** |
| **Sarcasm Contradiction Engine** | Multi-head attention contradiction | Boolean: `(hasPraise && hasFailure)` or `text.contains("சூப்பர்") && (...)` | **MOCK / HEURISTIC** |
| **Cultural Idiom Detection** | Tamil Idiom Knowledge Graph | Hardcoded checks for exactly 4 expressions | **HARDCODED** |
| **Tanglish / Code-Mixed Processing** | Multilingual subword tokenization | Substring checks for a few English words (`cancel`, `delay`, `super`, `problem`) | **PARTIALLY IMPLEMENTED (Trivial)** |
| **Baseline Model Comparison (mBERT/XLM-R)** | Real-time comparative evaluation | Hardcoded string fields (`"mBERT Baseline"`, `"Positive / Joy (Fooled by literal...)"`) | **MOCK / HARDCODED** |
| **Continual Learning (EWC)** | Elastic Weight Consolidation ($\lambda=400$) | Integer increment (`epoch++`, `vocab += 14`) + hardcoded log strings | **SIMULATED** |
| **Fisher Information Matrix (FIM)** | FIM diagonal regularization | Zero mathematical calculation; static log message | **SIMULATED** |
| **Replay Buffer Sampling** | Memory buffer pseudo-labeling | Zero replay tensor operations; static text in log DTO | **SIMULATED** |
| **Slang Lexicon Management** | Dynamic dictionary in MongoDB | Real CRUD operations in MongoDB collection `slang_lexicon` | **REAL / FUNCTIONAL** |
| **Analytics Dashboard** | Live customer intelligence | Real MongoDB aggregation for totals; hardcoded array `{120, 180...}` for weekly line chart | **PARTIALLY IMPLEMENTED** |
| **Empirical Research Benchmarks** | Academic benchmark matrix | Hardcoded static JSON map in `SystemController.java` & `basePapers.js` | **HARDCODED** |

---

## 3. Technology Stack & Actual Architecture

### Current Stack
- **Client**: React 18.3.1, Vite 5.4.2, Tailwind CSS 3.4.10, React Router 7.18.4, Recharts 2.12.7, Lucide React 0.460.0
- **Server**: Java 17.0.20 (Eclipse Adoptium), Spring Boot 3.2.5, Spring Data MongoDB, Apache Maven 3.9.6
- **Database**: MongoDB Community Edition 9.0.2 running locally on `localhost:27017`
- **Missing Infrastructure**: No Python environment, PyTorch, Hugging Face transformers, ONNX Runtime, or Spring Security.

### Actual Architecture Flow
```
[User Browser (React 18 + Vite)]
      │
      │ HTTP REST (fetch / JSON)
      ▼
[Spring Boot 3.2.5 REST Controllers (Port 8080)]
      │
      ├──> AuthController ──────> AuthService (Plain-text verification, fake UUID token)
      │
      ├──> EmotionAnalysisController
      │       ▼
      │    TamilEmotionReasoningService
      │       ├──> TamilMorphologyService (38-word static map + 5 suffix if-statements)
      │       ├──> identifyIdioms() (4 hardcoded string.contains checks)
      │       └──> Rule-based if-else decision tree (hardcoded percentages & baseline text)
      │       ▼
      │    EmotionAnalysisRepository (MongoRepository)
      │       ▼
      │    MongoDB Collection: 'emotion_analyses'
      │
      ├──> DashboardController ──> DashboardService (Real counts from MongoDB, hardcoded weekly curve)
      │
      ├──> ContinualAdaptationController
      │       ▼
      │    ContinualAdaptationService (epoch += 1, vocab += 14, static log strings)
      │       ▼
      │    MongoDB Collections: 'slang_lexicon', 'continual_adaptation_stats'
      │
      └──> SystemController ────> Returns hardcoded benchmark metrics map
```

---

## 4. In-Depth Component Analysis

### 4.1. Authentication & Security
- **File**: [`backend/src/main/java/com/tamilemotion/service/AuthService.java`](file:///d:/FINAL%20YEAR%20PROJECT/backend/src/main/java/com/tamilemotion/service/AuthService.java)
- **Token Generation**:
  ```java
  String token = "jwt-" + UUID.randomUUID().toString();
  ```
  *Defect*: This is not a JWT. It lacks Header, Payload (claims), and HMAC/RSA Signature.
- **Token Validation**:
  *Defect*: **Zero endpoints validate this token.** There are no Spring Security filters, Interceptors, or `@RequestHeader` checks. Any HTTP client can call any endpoint without sending any token.
- **Password Storage & Checking**:
  ```java
  if (user.getPassword().equals(password)) { ... }
  ```
  *Defect*: Passwords are stored in plain text inside MongoDB (`users` collection). No hashing algorithm (BCrypt, Argon2, PBKDF2) is applied.
- **Default Backdoors**:
  ```java
  if ("admin".equalsIgnoreCase(username) || "demo".equalsIgnoreCase(username) || "researcher".equalsIgnoreCase(username)) {
      User newUser = new User(username, username + "@tamilemotion.ai", password, "RESEARCHER", username.toUpperCase() + " AI Lab");
      userRepository.save(newUser);
  ```
  *Defect*: If the user does not exist, entering username `admin` with *any* password automatically registers and logs in the user.

### 4.2. Tamil Morphology Service
- **File**: [`backend/src/main/java/com/tamilemotion/service/TamilMorphologyService.java`](file:///d:/FINAL%20YEAR%20PROJECT/backend/src/main/java/com/tamilemotion/service/TamilMorphologyService.java)
- **Implementation**:
  - Contains a static `HashMap<String, TokenProfile> KNOWN_TOKENS` containing exactly **38 hardcoded Tamil words** (e.g., `ரொம்ப`, `நல்லா`, `செய்றீங்க`, `வரல`, `பணமும்`, `சூப்பர்`, `வயித்துல`).
  - Fallback logic (`inferMorphology`):
    ```java
    if (clean.endsWith("இட்டாங்க") || clean.endsWith("ிட்டீங்க")) { ... }
    else if (clean.endsWith("வரல") || clean.endsWith("ஆகல") || clean.endsWith("அல")) { ... }
    else if (clean.endsWith("உம்")) { ... }
    else if (clean.endsWith("இல்") || clean.endsWith("ல")) { ... }
    else if (clean.endsWith("வே") || clean.endsWith("ஏ")) { ... }
    ```
  - *Defect*: Any Tamil word not in the 38-word list or not ending in one of these 5 suffixes is labeled with generic fallback `pos = "Content Word"` and `semantic = "General Tamil context token"`. There is no sandhi-splitting, morphological analysis, or root stemming.

### 4.3. Emotion Reasoning & Sarcasm Detection
- **File**: [`backend/src/main/java/com/tamilemotion/service/TamilEmotionReasoningService.java`](file:///d:/FINAL%20YEAR%20PROJECT/backend/src/main/java/com/tamilemotion/service/TamilEmotionReasoningService.java)
- **Keyword Lists**:
  - `PRAISE_KEYWORDS`: 11 words (`நல்லா`, `சூப்பர்`, `அருமை`, `நன்றி`, `மகிழ்ச்சி`, `super`, `thanks`, `great`, `excellent`, `wonderful`, `செமையா`)
  - `FAILURE_KEYWORDS`: 17 words (`வரல`, `ஆகல`, `கேன்சல்`, `இல்லை`, `காசு வேஸ்ட்`, `வேஸ்ட்`, `காத்திருக்க`, `மணி நேரம்`, `மாட்றாங்க`, `எடுக்கவே`, `பிரச்சனை`, `problem`, `issue`, `delay`, `late`, `வயித்துல`, `மொக்க`, `கடுப்பு`)
  - `ANGER_KEYWORDS`: 9 words (`கோபம்`, `கடுப்பு`, `fraud`, `cheat`, `scam`, `worst`, `hate`, `கடுப்பேத்துறாங்க`, `அடிச்சுட்டீங்க`)
- **Sarcasm Detection**:
  ```java
  boolean isSarcastic = (hasPraise && hasFailure) ||
      (text.contains("சூப்பர்") && (text.contains("காத்திருக்க") || text.contains("வரல") || text.contains("ஆச்சு")));
  ```
  *Defect*: If an input text contains both a word from `PRAISE_KEYWORDS` and a word from `FAILURE_KEYWORDS`, it flags sarcasm regardless of syntactic structure.
- **Emotion Distribution Map**:
  - Hardcoded distributions:
    - Sarcastic: `{ Frustration: 88, Sarcasm: 92, Anger: 74, Disappointment: 82, Satisfaction: 4, Joy: 3 }` (Confidence: `94.8%`)
    - Distress/Anger: `{ Frustration: 91, Anger: 95, Sadness: 72, Disappointment: 85, Satisfaction: 0, Joy: 0 }` (Confidence: `96.2%`)
    - General Failure: `{ Frustration: 84, Disappointment: 76, Anger: 55, Sadness: 42, Satisfaction: 8, Joy: 2 }` (Confidence: `89.4%`)
    - Praise: `{ Satisfaction: 92, Joy: 88, Frustration: 4, Anger: 2, Sarcasm: 3, Disappointment: 5 }` (Confidence: `93.5%`)
    - Default: `{ Satisfaction: 50, Frustration: 30, Joy: 25, Anger: 15 }` (Confidence: `78.0%`)
  *Defect*: Scores are constant templates rather than model output probabilities.
- **Baseline Comparison ("mBERT / MuRIL Baseline")**:
  - Creates a `ModelComparisonResult` object filled with hardcoded strings explaining why mBERT failed. Neither mBERT nor MuRIL is executed.

### 4.4. Continual Adaptation & Simulation
- **File**: [`backend/src/main/java/com/tamilemotion/service/ContinualAdaptationService.java`](file:///d:/FINAL%20YEAR%20PROJECT/backend/src/main/java/com/tamilemotion/service/ContinualAdaptationService.java)
- **Simulation Execution**:
  ```java
  int newEpoch = stats.getAdaptationEpochs() + 1;
  int newVocab = stats.getActiveVocabularyCount() + 14;
  stats.setAdaptationEpochs(newEpoch);
  stats.setActiveVocabularyCount(newVocab);
  stats.setCatastrophicForgettingProtection("98.9%");
  ```
  *Defect*: The method merely increments the epoch counter by 1, increments the vocabulary count by 14, updates timestamps, and returns hardcoded log lines. No gradient descent, no parameter freezing, and no Fisher Information computation occurs.

### 4.5. Legacy Frontend Emotion Detector
- **File**: [`src/components/EmotionDetector.jsx`](file:///d:/FINAL%20YEAR%20PROJECT/src/components/EmotionDetector.jsx)
- **Random Confidence Generator**:
  ```javascript
  const conf = 75 + Math.floor(Math.random() * 18);
  ```
  *Defect*: The standalone component generates pseudo-random numbers between 75% and 92% to represent AI confidence.

---

## 5. Catalog of Hardcoded & Fabricated Research Data

### 5.1. Academic Benchmark Metrics
- **Location**: [`backend/src/main/java/com/tamilemotion/controller/SystemController.java`](file:///d:/FINAL%20YEAR%20PROJECT/backend/src/main/java/com/tamilemotion/controller/SystemController.java) & [`src/data/basePapers.js`](file:///d:/FINAL%20YEAR%20PROJECT/src/data/basePapers.js)
- **Fabricated Data Table**:
  - `mBERT (Multilingual BERT)`: Accuracy: `68.4%`, F1: `66.1%`, Sarcasm Precision: `41.2%`, Morpheme Recall: `52.8%`, Latency: `48 ms`
  - `XLM-RoBERTa (Base)`: Accuracy: `74.2%`, F1: `72.8%`, Sarcasm Precision: `53.0%`, Morpheme Recall: `61.4%`, Latency: `56 ms`
  - `IndicBERT (Pre-trained)`: Accuracy: `78.6%`, F1: `77.3%`, Sarcasm Precision: `59.8%`, Morpheme Recall: `70.2%`, Latency: `42 ms`
  - `Morphology-Aware Reasoner (Ours)`: Accuracy: `91.8%`, F1: `90.7%`, Sarcasm Precision: `94.6%`, Morpheme Recall: `93.5%`, Latency: `34 ms`
- **Origin**: Hand-typed into source code. No evaluation script or test suite produced these numbers.

### 5.2. Continual Learning Metrics
- **Location**: [`src/data/lexiconData.js`](file:///d:/FINAL%20YEAR%20PROJECT/src/data/lexiconData.js) & [`backend/src/main/java/com/tamilemotion/initializer/DataInitializer.java`](file:///d:/FINAL%20YEAR%20PROJECT/backend/src/main/java/com/tamilemotion/initializer/DataInitializer.java)
- **Fabricated Constants**:
  - `activeVocabularyCount: 14820`
  - `replayBufferCapacity: "5,000 Samples"`
  - `ewcPenaltyLambda: 400.0`
  - `catastrophicForgettingProtection: "98.4%"`
  - `adaptationEpochs: 14`
  - `ewcLoss: 0.042`
  - `stabilityMetric: 98.9`

### 5.3. Dashboard Weekly Trends
- **Location**: [`backend/src/main/java/com/tamilemotion/service/DashboardService.java`](file:///d:/FINAL%20YEAR%20PROJECT/backend/src/main/java/com/tamilemotion/service/DashboardService.java)
- **Hardcoded Counts**:
  - `Mon: 120, Tue: 180, Wed: 150, Thu: 210, Fri: 250, Sat: 190, Sun: 184`

---

## 6. Database (MongoDB) Structure

**Database Name**: `tamilemotedb`  
**Host**: `localhost:27017`

### Collections Schema:
1. `users`
   - Fields: `id` (ObjectId), `username` (unique indexed), `email`, `password` (plain text), `role`, `fullName`, `createdAt`
2. `emotion_analyses`
   - Fields: `id` (ObjectId), `rawText`, `transliteration`, `channel`, `brand`, `primaryEmotion`, `secondaryEmotion`, `confidence` (Double), `sarcasmDetected` (boolean), `implicitEmotionDetected` (boolean), `urgency`, `emotionDistribution` (Map), `morphologyBreakdown` (Array of subdocuments), `idiomsIdentified` (Array of subdocuments), `baselineResult` (Subdocument), `ourModelResult` (Subdocument), `suggestedAction`, `analyzedBy`, `createdAt`
3. `slang_lexicon`
   - Fields: `id` (ObjectId), `term` (String), `category`, `sentiment`, `meaning`, `addedInEpoch`, `memoryWeight` (Double), `status` (`PENDING`, `REVIEWED`, `ADAPTED`), `createdAt`
4. `morphological_rules`
   - Fields: `id` (ObjectId), `suffix`, `functionName`, `example`, `emotionImpact`
5. `continual_adaptation_stats`
   - Fields: `id` (ObjectId), `activeVocabularyCount`, `replayBufferCapacity`, `ewcPenaltyLambda`, `catastrophicForgettingProtection`, `adaptationEpochs`, `lastAdaptedTime`
6. `sample_feedback`
   - Fields: `id` (ObjectId), `sampleCode`, `title`, `text`, `transliteration`, `channel`, `brand`, `explicitEmotion`, `actualEmotion`, `confidence`, `sarcasmDetected`, `urgency`, `morphologyBreakdown`, `idiomsIdentified`, `emotionDistribution`, `baselineResult`, `ourModelResult`, `suggestedAction`

---

## 7. Complete API Endpoint List & Status

| Method | Endpoint | Description | Implementation Quality |
|---|---|---|---|
| `POST` | `/api/auth/login` | User login | **MOCK** (plain text check, UUID token) |
| `POST` | `/api/auth/register` | User registration | **PARTIAL** (saves plain text password in MongoDB) |
| `GET` | `/api/auth/status` | Auth status | **MOCK** (returns static JSON) |
| `POST` | `/api/analyze` | Analyze Tamil text | **MOCK / HEURISTIC** (keyword matching; saves to Mongo) |
| `GET` | `/api/analyze/history` | List recent analyses | **REAL** (queries `emotion_analyses` from Mongo) |
| `GET` | `/api/analyze/{id}` | Get analysis by ID | **REAL** (queries single document by Mongo ID) |
| `GET` | `/api/dashboard/stats` | Aggregated dashboard stats | **PARTIAL** (real counts from Mongo, hardcoded weekly curve) |
| `GET` | `/api/adaptation/stats` | Continual adaptation stats | **HARDCODED** (reads seeded document from Mongo) |
| `POST` | `/api/adaptation/simulate`| Trigger adaptation cycle | **SIMULATED** (increments integers, returns static strings) |
| `GET` | `/api/lexicon/slang` | Get dynamic slang list | **REAL** (reads `slang_lexicon` collection from Mongo) |
| `POST` | `/api/lexicon/slang` | Add emerging slang | **REAL** (inserts new slang into Mongo) |
| `PUT` | `/api/lexicon/slang/{id}/status` | Update slang status | **REAL** (updates status in Mongo) |
| `GET` | `/api/lexicon/morphological-rules` | Get suffix rules | **HARDCODED** (seeded static rules from Mongo) |
| `GET` | `/api/dataset/samples` | Get sample dataset | **REAL** (retrieves seeded samples from Mongo) |
| `GET` | `/api/dataset/samples/{code}` | Get sample by code | **REAL** (queries by `sampleCode`) |
| `GET` | `/api/system/health` | Backend + DB health check | **REAL** (pings Spring Boot & MongoDB) |
| `GET` | `/api/system/benchmarks` | Comparative model benchmarks | **HARDCODED** (static in-memory map) |

---

## 8. Defect Severity & Classification

### P0 — Critical Architectural & Research Flaws
1. **No Machine Learning or Transformer Model**: The system claims to be an advanced AI NLP model surpassing mBERT and IndicBERT, but uses string equality and keyword lists. Evaluators inspecting code will immediately notice the absence of ML inference.
2. **Plain-Text Passwords**: User passwords are saved unhashed in MongoDB, posing an immediate data security hazard.
3. **Fake Authentication**: The token is an arbitrary string (`jwt-<uuid>`). No endpoint verifies it, leaving the entire backend unauthenticated.
4. **Fabricated Research Metrics**: Benchmark values (`91.8% accuracy`, `94.6% sarcasm precision`, `98.9% stability`) have no underlying evaluation scripts or datasets.

### P1 — Important Deficiencies
1. **Rule-Based Morphological Analyzer**: The Tamil analyzer only recognizes 38 predefined words and 5 suffix rules. Real colloquial feedback with standard Tamil agglutination fails to parse.
2. **Sarcasm Contradiction is Fragile**: Triggered solely by keyword overlap, leading to high false-positive and false-negative rates on arbitrary sentences.
3. **Simulated Continual Learning**: EWC and Fisher Information calculations are simulated with hardcoded text logs rather than numerical optimization.
4. **Hardcoded Dashboard Trends**: The weekly volume line chart displays static numbers `{120, 180, 150...}` rather than time-bucketed aggregation queries.

### P2 — Later Improvements
1. **Batch Feedback Processing**: Inability to upload CSV/Excel files for bulk review analysis.
2. **Export Capabilities**: Lack of PDF/CSV export for generated reports.
3. **Database Indexing**: Missing compound indexes on `createdAt` and `primaryEmotion` in MongoDB.
4. **Cross-Site Scripting (XSS) Sanitization**: Text input stored directly in MongoDB without sanitization.

---

## 9. Recommended Real Architecture

To transform this into a genuine, defensible final-year research project:

```
[React 18 Frontend]
        │
        │ HTTPS REST / Bearer JWT
        ▼
[Spring Boot 3 Backend]
   ├── Spring Security + Real JJWT Filter + BCrypt Password Encoder
   ├── MongoDB (Users, Feedback Records, Lexicon Store)
   │
   │ Microservice Call / ONNX Runtime / Python FastApi Bridge
   ▼
[Inference Engine (Python FastAPI / ONNX)]
   ├── Model: Fine-tuned IndicBERT / MuRIL or XLM-R on DravidianCodeMix / Tamil Emotion Dataset
   ├── Tamil Morphological Tokenizer: Open-Tamil or Indic-NLP Tokenizer
   ├── Sarcasm Classifier: Dual-encoder polarity contradiction model
   └── Continual Learning Module: Real PyTorch EWC regularizer on newly added slang samples
```

---

## 10. Recommended Development Order

1. **Step 1: Security & Real Authentication (P0)**
   - Add `spring-boot-starter-security` and `jjwt-api` / `jjwt-impl`.
   - Implement `BCryptPasswordEncoder` for hashing passwords in MongoDB.
   - Implement real signed JWT generation and a `JwtAuthenticationFilter` to guard `/api/*` endpoints.

2. **Step 2: Real Tamil NLP / Morphological Integration (P0 / P1)**
   - Integrate a true Tamil morphological analyzer (e.g., Open-Tamil, Tamil Stemmer, or an ONNX/Python model service).
   - Expand root-word dictionary and support inflectional case markers, tense markers, and negative verbs systematically.

3. **Step 3: Genuine Machine Learning Inference for Emotion & Sarcasm (P0)**
   - Connect the backend to a real ML classifier (either via an ONNX model loaded directly in Java with `onnxruntime` or a lightweight local Python FastAPI service running fine-tuned IndicBERT/MuRIL).
   - Generate true softmax output distributions and dynamic confidence scores.

4. **Step 4: True Continual Learning Implementation (P1)**
   - Implement actual fine-tuning steps or adapter updates with replay samples.
   - Compute real loss values rather than hardcoded log outputs.

5. **Step 5: Dynamic Dashboard Analytics (P1 / P2)**
   - Replace the static `{120, 180...}` weekly trend with MongoDB aggregation pipelines grouped by date.

---

*Audit completed. Full documentation recorded in [`PROJECT_AUDIT.md`](file:///d:/FINAL%20YEAR%20PROJECT/PROJECT_AUDIT.md).*
