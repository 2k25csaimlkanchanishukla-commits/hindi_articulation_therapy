# 🦜 वाक-मित्र (Vaak-Mitra) - Hindi Speech & Misarticulation Therapy Suite

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.9+](https://img.shields.io/badge/python-3.9+-blue.svg)](https://www.python.org/downloads/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.109+-green.svg)](https://fastapi.tiangolo.com)
[![Web Speech API](https://img.shields.io/badge/Web%20Speech%20API-Supported-orange.svg)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
[![Gemini AI](https://img.shields.io/badge/AI-Google%20Gemini%202.5-purple.svg)](https://ai.google.dev/)

> **वाक-मित्र (Vaak-Mitra)** is an interactive, gamified, and clinically-backed Speech & Articulation Therapy Web Application designed specifically for children with misarticulation (तोतलाना / तुतलाना / उच्चारण दोष) in the **Indian linguistic context (Hindi & Multilingual)**.

---

## 🌟 Key Highlights & Design Philosophy

1. **Live, Bubbly & Kid-Friendly Aesthetic**:
   - Pastel candy rainbow theme, bouncing mascot companion *"बोलू तोता (Bolu the Parrot)"*, floating bubbles, celebratory star rewards, sound effects, and confetti bursts.
2. **Automated Speech Recognition (ASR) & Real-Time Phonetic Scoring**:
   - Live microphone capture, Devanagari acoustic alignment, Levenshtein distance matching, and S.O.D.A. (Substitution, Omission, Distortion, Addition) classification.
3. **AI Speech Therapist ("Dr. Bol")**:
   - Google Gemini AI-driven clinical coaching assistant providing customized articulation exercises, placement cues, and parent guidance.
4. **12 Complete Therapeutic Processing Modules**:
   - Comprehensive multi-stage therapy workflow covering phonetic isolation, syllables, word levels, sentences, minimal pairs, and oral motor agility.
5. **Trilingual Language Switcher**:
   - Instant switching between **Hindi (हिन्दी)**, **English**, and **Hinglish**.

---

## 🧩 12 Therapeutic Processing Modules

| # | Module Name | Description | Clinical Purpose |
|---|-------------|-------------|------------------|
| **1** | 🗣️ **Articulatory Position Level** | Dynamic anatomical visualizer showing tongue, lip, teeth, and palate placement for Hindi varnas. | Place & Manner awareness |
| **2** | 🔤 **Phoneme IMF Explorer** | Structured word banks across **Initial (आदि)**, **Medial (मध्य)**, and **Final (अंतिम)** positions. | Positional sound mastery |
| **3** | 🖼️ **Picture Flashcard Lab** | High-contrast visual flashcards with Devanagari labels, English transliterations, and native TTS. | Word-picture association |
| **4** | 🎙️ **Voice ASR Scorer** | Real-time speech recognition with circular score gauge (0-100%), star ratings, and waveform visualizer. | Acoustic self-monitoring |
| **5** | ⚖️ **Minimal Pairs Challenge** | Discrimination drills for common substitutions (/र/ vs /ल/, /स/ vs /श/, /त/ vs /ट/, /प/ vs /फ/). | Phonological contrast |
| **6** | 🎈 **Bubbly Balloon Pop Game** | Speech-driven gamified practice where children pop floating balloons by pronouncing target words. | Gamified automatization |
| **7** | 🌀 **Tongue Twisters & Rhymes** | Alliterative Hindi tongue twisters for oral agility (जीभ घुमाव पहेलियाँ). | Motor speed & fluency |
| **8** | 📖 **Story & Sentence Builder** | Carrier phrases and contextual mini-stories with highlighted target phonemes. | Conversational generalization |
| **9** | 🤖 **AI Speech Therapist (Dr. Bol)** | Conversational Gemini AI assistant offering customized drills and parent advice. | Virtual clinician guidance |
| **10** | 📊 **Analytics Dashboard** | Real-time tracking of correct vs. incorrect word counts, accuracy rate, and printable PDF report. | Clinical progress tracking |
| **11** | 📋 **Custom Session Builder** | Allows SLPs and parents to add custom words and assemble personalized therapy playlists. | Individualized therapy |
| **12** | 👅 **Oral Motor Face Gym** | Gamified exercises for lip rounding, cheek puffing, tongue elevation, and breath support. | Oral musculature strength |

---

## 📁 Repository Structure

```
hindi_articulation_therapy/
├── frontend/                     # Interactive Web Application
│   ├── index.html                # Single-page app with all 12 modules & bubbly UI
│   ├── styles.css                # Kid-friendly theme, gradients, animations, SVG styles
│   ├── app.js                    # ASR speech engine, TTS, game loop, WebAudio synthesizer
│   └── hindi_therapy_data.js     # Devanagari phoneme dataset, IMF word banks & minimal pairs
│
├── backend/                      # FastAPI Python Backend
│   ├── app.py                    # REST APIs for ASR scoring, AI clinician, static server
│   ├── requirements.txt          # Python dependencies
│   └── run_server.py             # Server launcher script
│
├── ai/                           # AI & Phonetics Intelligence Core
│   ├── speech_evaluator.py       # Devanagari akshara segmentation & S.O.D.A scoring
│   ├── gemini_therapist.py       # Google Gemini LLM integration for Dr. Bol
│   └── hindi_phonetics.py        # Indian phonetic classification matrix (स्थान, प्रयत्न)
│
└── docs/                         # Comprehensive Documentation
    ├── README.md                 # Main overview & setup guide
    ├── CLINICAL_GUIDE.md         # Speech-Language Pathology (SLP) Hindi clinical guide
    ├── ARCHITECTURE.md           # System design & data flow specifications
    └── GITHUB_SETUP.md           # Git repository setup and GitHub push instructions
```

---

## 🚀 Quick Start Guide

### Option 1: Standalone Frontend Mode (No installation required)
Simply double click or open `frontend/index.html` in any modern web browser (Google Chrome, Microsoft Edge, Safari). It works immediately with local Web Speech recognition, WebAudio synthesis, and offline clinical knowledge engine!

### Option 2: Full-Stack Backend Mode (FastAPI + AI API)
1. **Navigate to the project directory:**
   ```bash
   cd hindi_articulation_therapy
   ```

2. **Install Python dependencies:**
   ```bash
   pip install -r backend/requirements.txt
   ```

3. **(Optional) Set your Gemini API Key:**
   ```bash
   # Windows PowerShell
   $env:GEMINI_API_KEY="your-gemini-api-key-here"

   # Linux/macOS
   export GEMINI_API_KEY="your-gemini-api-key-here"
   ```

4. **Start the server:**
   ```bash
   python backend/run_server.py
   ```
   The app will automatically open at `http://127.0.0.1:8000`.

---

## 🔬 Clinical Classification for Hindi Phonemes

Vaak-Mitra classifies Hindi varnas according to Paninian and modern IPA articulatory phonetics:
- **कण्ठ्य (Velar)**: क (/k/), ख (/kʰ/), ग (/ɡ/), घ (/ɡʱ/)
- **तालव्य (Palatal)**: च (/t͡ʃ/), छ (/t͡ʃʰ/), ज (/d͡ʒ/), झ (/d͡ʒʱ/), श (/ʃ/)
- **मूर्धन्य (Retroflex)**: ट (/ʈ/), ठ (/ʈʰ/), ड (/ɖ/), ढ (/ɖʱ/), ड़ (/ɽ/)
- **दन्त्य (Dental)**: त (/t̪/), थ (/t̪ʰ/), द (/d̪/), ध (/d̪ʱ/), स (/s/)
- **ओष्ठ्य (Labial)**: प (/p/), फ (/pʰ/), ब (/b/), भ (/bʱ/), म (/m/)
- **अन्तस्थ व कम्पन (Liquids)**: र (/r/ - Trill/Tap), ल (/l/ - Lateral)

---

## 📄 License & Attribution
Developed with ❤️ for children, parents, and Speech-Language Pathologists in India.
Licensed under the [MIT License](LICENSE).
