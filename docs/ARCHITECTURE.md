# 🏗️ System Architecture & Engineering Specifications: Vaak-Mitra

## 1. System Overview

**Vaak-Mitra** is designed with a decoupled 4-tier modular architecture:
1. **Frontend Presentation & Audio Client (`frontend/`)**
2. **REST API & Static Delivery Backend (`backend/`)**
3. **Phonetic Scoring & Gemini AI Intelligence Engine (`ai/`)**
4. **Clinical & Deployment Documentation (`docs/`)**

```
+-------------------------------------------------------------------+
|                        FRONTEND CLIENT                            |
|  +-------------------+  +-------------------+  +---------------+  |
|  | Bubbly UI Theme   |  | Web Speech API    |  | Web Audio API |  |
|  | (HTML5/CSS3)      |  | Speech Recognition|  | Visualizer    |  |
|  +-------------------+  +-------------------+  +---------------+  |
|  +-------------------+  +-------------------+  +---------------+  |
|  | Balloon Game Loop |  | Trilingual Switch |  | Local Storage |  |
|  +-------------------+  +-------------------+  +---------------+  |
+-------------------------------------------------------------------+
                                  |
                                  | REST / JSON
                                  v
+-------------------------------------------------------------------+
|                       FASTAPI BACKEND                             |
|  +-------------------+  +-------------------+  +---------------+  |
|  | /api/evaluate-    |  | /api/ai-therapist |  | /api/export-  |  |
|  | speech            |  | (Gemini SLP)      |  | report        |  |
|  +-------------------+  +-------------------+  +---------------+  |
+-------------------------------------------------------------------+
                                  |
                                  | Native Python
                                  v
+-------------------------------------------------------------------+
|                      AI & PHONETICS ENGINE                        |
|  +-------------------------------------------------------------+  |
|  | HindiSpeechEvaluator (Devanagari Akshara Parser + Distance)  |  |
|  | HINDI_PHONETIC_MATRIX (Place, Manner, Voicing, Aspiration)  |  |
|  | GeminiSpeechTherapist (google-genai 2.5-flash SLP Prompts)   |  |
|  +-------------------------------------------------------------+  |
+-------------------------------------------------------------------+
```

---

## 2. Audio & Speech Processing Pipeline

1. **Microphone Capture**:
   - Captured via `navigator.mediaDevices.getUserMedia()` for real-time waveform visualization with `AnalyserNode`.
   - Web Speech Recognition (`webkitSpeechRecognition`) tuned to `hi-IN` (Hindi - India) with phonetic fallback.

2. **Devanagari Akshara Parsing**:
   - Consonant-Vowel syllables (अक्षर) are segmented preserving matras (मात्राएं), halanta (हलन्त), and conjuncts.

3. **Linguistic Distance Formula**:
   $$\text{Articulatory Distance} = w_p \cdot \Delta_{\text{place}} + w_m \cdot \Delta_{\text{manner}} + w_a \cdot \Delta_{\text{aspiration}} + w_v \cdot \Delta_{\text{voicing}}$$
   where weights $w_p=0.4, w_m=0.3, w_a=0.2, w_v=0.1$.

4. **S.O.D.A Classification Logic**:
   - Automatically cross-referenced with known substitution mappings (e.g. $r \to l$, $s \to \int$, $k \to t$).

---

## 3. API Contract Specifications

### `POST /api/evaluate-speech`
**Request**:
```json
{
  "spokenText": "लोटी",
  "targetWord": "रोटी",
  "targetSound": "र"
}
```
**Response**:
```json
{
  "score": 60,
  "is_correct": false,
  "stars": 2,
  "soda_category": "प्रतिस्थापन (Substitution: /r/ -> /l/)",
  "pattern_notes": "Lambdacism: जीभ मसूड़े पर कम्पन करने के बजाय बगल से हवा छोड़ रही है।",
  "feedback_hi": "अच्छा प्रयास! थोड़ा और अभ्यास करने पर और अच्छा होगा! ⭐⭐",
  "feedback_en": "Good effort! Needs a little more placement drill! ⭐⭐"
}
```

### `POST /api/ai-therapist`
**Request**:
```json
{
  "query": "बच्चा स को श बोलता है, मैं घर पर क्या अभ्यास कराऊँ?",
  "currentSound": "स",
  "language": "hi"
}
```
**Response**:
```json
{
  "replyHtml": "<strong>👨‍⚕️ Dr. Bol की सलाह:</strong>...",
  "speechSummary": "मैंने आपके लिए अभ्यास सुझाव तैयार किए हैं!",
  "source": "gemini-2.5-flash"
}
```
