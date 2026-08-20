"""
VAAK-MITRA (वाक-मित्र) - Server Launcher
Runs the local Uvicorn FastAPI server and launches the web browser.
"""

import sys
import webbrowser
import uvicorn
from pathlib import Path

if __name__ == "__main__":
    port = 8000
    host = "127.0.0.1"
    url = f"http://{host}:{port}"
    print("=" * 60)
    print("🚀 Starting VAAK-MITRA (वाक-मित्र) Speech Therapy Server...")
    print(f"👉 Open in Browser: {url}")
    print("=" * 60)
    
    try:
        webbrowser.open(url)
    except Exception:
        pass

    uvicorn.run("app:app", host=host, port=port, reload=True)
