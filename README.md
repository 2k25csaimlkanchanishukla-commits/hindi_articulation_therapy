# 🦜 वाक-मित्र (Vaak-Mitra) - Hindi Speech & Misarticulation Therapy Suite

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.9+](https://img.shields.io/badge/python-3.9+-blue.svg)](https://www.python.org/downloads/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.109+-green.svg)](https://fastapi.tiangolo.com)
[![Web Speech API](https://img.shields.io/badge/Web%20Speech%20API-Supported-orange.svg)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
[![Gemini AI](https://img.shields.io/badge/AI-Google%20Gemini%202.5-purple.svg)](https://ai.google.dev/)

> **वाक-मित्र (Vaak-Mitra)** is an interactive, gamified, and clinically-backed Speech & Articulation Therapy Web Application designed specifically for children with misarticulation (तोतलाना / तुतलाना / उच्चारण दोष) in the **Indian linguistic context (Hindi & Multilingual)**.

---

## 🌟 Key Features

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

1. 🗣️ **Articulatory Position Level (ध्वनि स्थान व मुखाकृति)**: Interactive mouth/tongue/lips/teeth anatomical visualizer.
2. 🔤 **Phoneme IMF Explorer (आदि, मध्य, अंतिम स्तर)**: Initial, Medial, and Final Hindi word drills.
3. 🖼️ **Picture Flashcard Lab (चित्र कार्ड थेरेपी)**: Word-picture association with native TTS pronunciation.
4. 🎙️ **Live Voice Recording & ASR Phonetic Scorer (आवाज़ परीक्षण)**: Real-time speech evaluation gauge (0-100%).
5. ⚖️ **Minimal Pairs Challenge (समान युग्म भेद)**: Discrimination drills for /र/ vs /ल/, /स/ vs /श/, /त/ vs /ट/, /प/ vs /फ/.
6. 🎈 **Bubbly Balloon Pop Articulation Game (गुब्बारा फोड़ो)**: Speech-driven interactive gamified practice.
7. 🌀 **Tongue Twisters & Rhyme Drills (जीभ घुमाव पहेलियाँ)**: Alliterative drills for tongue agility.
8. 📖 **Story & Sentence Builder (वाक्य व कहानी स्तर)**: Contextual sentence practice for phoneme generalization.
9. 🤖 **AI Speech Therapist "Dr. Bol" (बोल मित्र AI)**: Gemini-powered virtual clinician.
10. 📊 **Clinician & Parent Analytics Dashboard (प्रगति रिपोर्ट)**: Tracking correct vs incorrect words, accuracy rate, printable report.
11. 📋 **Custom Session & Wordlist Builder (कस्टम सत्र निर्माण)**: Customized playlist creator.
12. 👅 **Oral Motor Face Gym (मुख व जीभ व्यायाम)**: Cheerful exercises for lips, tongue, jaw, and breath control.

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

### Option 1: Standalone Frontend Mode (No install needed)
Open `frontend/index.html` directly in any web browser (Chrome, Edge, Firefox, Safari).

### Option 2: Full-Stack Backend Mode
```bash
pip install -r backend/requirements.txt
python backend/run_server.py
```
Visit `http://127.0.0.1:8000`.

---

## 📄 License
MIT License. Created for parents, educators, and Speech-Language Pathologists across India.
