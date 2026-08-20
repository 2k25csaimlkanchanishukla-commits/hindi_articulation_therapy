# 🐙 GitHub Repository Push & Deployment Guide

This guide provides step-by-step instructions for pushing the 4 repository directories (`frontend/`, `backend/`, `ai/`, `docs/`) directly to your GitHub profile.

---

## 🛠️ Step 1: Initialize Git Repository

Open your terminal (PowerShell or Command Prompt) and navigate to the project directory:

```bash
cd "C:\Users\Hp\.gemini\antigravity\scratch\hindi_articulation_therapy"
```

Initialize the Git repository:
```bash
git init
```

---

## 🛠️ Step 2: Create `.gitignore`

Ensure standard Python and OS files are ignored by creating `.gitignore`:

```gitignore
# Python
__pycache__/
*.py[cod]
*$py.class
venv/
env/
.env

# OS
.DS_Store
Thumbs.db
```

---

## 🛠️ Step 3: Stage and Commit Files

```bash
git add .
git commit -m "feat: Initial commit of Vaak-Mitra Hindi Speech Therapy Suite with 12 modules, ASR, and Gemini AI"
```

---

## 🛠️ Step 4: Link to GitHub and Push

1. Go to [GitHub](https://github.com/new) and create a new public or private repository named `hindi-articulation-therapy` (or `vaak-mitra`).
2. Do **not** initialize with a README (we already have a complete one).
3. Copy the repository URL and run:

```bash
# Rename branch to main
git branch -M main

# Add your GitHub remote URL
git remote add origin https://github.com/YOUR_USERNAME/hindi-articulation-therapy.git

# Push the codebase
git push -u origin main
```

---

## 🌐 Free Web Hosting & Deployment Options

### Option A: GitHub Pages (Frontend Only - Instant & Free)
1. In your GitHub repository settings, navigate to **Pages**.
2. Select `main` branch and `/frontend` folder (or copy `frontend/*` to root).
3. Your live kid-friendly speech therapy web app will be accessible instantly worldwide!

### Option B: Render / Railway / Streamlit (Full-Stack Backend + Frontend)
- **Start Command**: `uvicorn backend.app:app --host 0.0.0.0 --port $PORT`
- **Environment Variable**: `GEMINI_API_KEY=your_key_here`
