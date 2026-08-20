"""
VAAK-MITRA (वाक-मित्र) - Backend API Server
FastAPI server serving therapy endpoints, ASR speech evaluation, and Gemini AI therapist.
"""

import os
import sys
from pathlib import Path
from typing import Dict, Any, Optional, List
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, FileResponse
from pydantic import BaseModel

# Add root project dir to Python path for importing AI modules
CURRENT_DIR = Path(__file__).resolve().parent
ROOT_DIR = CURRENT_DIR.parent
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from ai.speech_evaluator import HindiSpeechEvaluator
from ai.gemini_therapist import GeminiSpeechTherapist
from ai.hindi_phonetics import HINDI_PHONETIC_MATRIX

# Initialize App & AI Engines
app = FastAPI(
    title="वाक-मित्र (Vaak-Mitra) - Hindi Speech Therapy API",
    description="Speech and Articulation Therapy Suite for Children with Misarticulation",
    version="1.0.0"
)

# Enable CORS for cross-origin frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

evaluator = HindiSpeechEvaluator()
therapist = GeminiSpeechTherapist()

# Pydantic Request Models
class SpeechEvaluationRequest(BaseModel):
    spokenText: str
    targetWord: str
    targetSound: Optional[str] = ""

class AiTherapistRequest(BaseModel):
    query: str
    currentSound: Optional[str] = "क"
    language: Optional[str] = "hi"

class DrillGenerationRequest(BaseModel):
    targetSound: str
    difficulty: Optional[str] = "easy"

class SessionLog(BaseModel):
    time: str
    target: str
    spoken: str
    score: str
    status: str

class ClinicalReportRequest(BaseModel):
    childName: Optional[str] = "Child / विद्यार्थी"
    totalAttempts: int
    correctAttempts: int
    accuracyRate: str
    logs: List[SessionLog] = []

# API Endpoints
@app.get("/api/health")
def health_check():
    return {
        "status": "online",
        "app": "Vaak-Mitra (वाक-मित्र)",
        "version": "1.0.0",
        "gemini_active": therapist.client is not None
    }

@app.get("/api/phonemes")
def get_phonemes_matrix():
    """Returns the complete Hindi phonetic classification matrix."""
    return {"phonemes": HINDI_PHONETIC_MATRIX}

@app.post("/api/evaluate-speech")
def evaluate_speech(payload: SpeechEvaluationRequest):
    """
    Evaluates child's spoken utterance against the target Hindi word.
    Returns accuracy score, S.O.D.A categorization, star reward, and articulatory notes.
    """
    if not payload.spokenText or not payload.targetWord:
        raise HTTPException(status_code=400, detail="spokenText and targetWord are required.")
    
    result = evaluator.evaluate(
        spoken_text=payload.spokenText,
        target_word=payload.targetWord,
        target_sound=payload.targetSound or ""
    )
    return result

@app.post("/api/ai-therapist")
def consult_ai_therapist(payload: AiTherapistRequest):
    """
    Interfaces with Dr. Bol (Gemini AI Speech Therapist) for personalized clinical guidance.
    """
    if not payload.query:
        raise HTTPException(status_code=400, detail="Query cannot be empty.")
    
    guidance = therapist.get_therapeutic_guidance(
        query=payload.query,
        current_sound=payload.currentSound or "क",
        language=payload.language or "hi"
    )
    return guidance

@app.post("/api/generate-drills")
def generate_drills(payload: DrillGenerationRequest):
    """
    Generates dynamic custom Hindi carrier sentences and tongue twisters.
    """
    return therapist.generate_custom_drills(
        target_sound=payload.targetSound,
        difficulty=payload.difficulty or "easy"
    )

@app.post("/api/export-report")
def export_clinical_report(payload: ClinicalReportRequest):
    """Generates structured printable SLP assessment summary."""
    return {
        "reportId": "VM-RPT-2026",
        "patient": payload.childName,
        "metrics": {
            "totalWordsPracticed": payload.totalAttempts,
            "correctArticulations": payload.correctAttempts,
            "accuracyRate": payload.accuracyRate
        },
        "clinicalSummary": "उच्चारण अभ्यास में नियमित प्रगति दर्ज की गई है।",
        "logs": payload.logs
    }

# Mount and serve frontend static files
FRONTEND_DIR = ROOT_DIR / "frontend"
if FRONTEND_DIR.exists():
    app.mount("/static", StaticFiles(directory=str(FRONTEND_DIR)), name="static")

    @app.get("/")
    def serve_frontend_root():
        index_file = FRONTEND_DIR / "index.html"
        if index_file.exists():
            return FileResponse(str(index_file))
        return HTMLResponse("<h1>Vaak-Mitra Frontend Index not found</h1>", status_code=404)

    @app.get("/{full_path:path}")
    def serve_frontend_assets(full_path: str):
        asset_file = FRONTEND_DIR / full_path
        if asset_file.exists() and asset_file.is_file():
            return FileResponse(str(asset_file))
        index_file = FRONTEND_DIR / "index.html"
        if index_file.exists():
            return FileResponse(str(index_file))
        return HTMLResponse("<h1>Not Found</h1>", status_code=404)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)
