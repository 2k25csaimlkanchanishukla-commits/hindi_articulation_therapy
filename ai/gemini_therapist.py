"""
VAAK-MITRA (वाक-मित्र) - Gemini AI Speech Therapist & Clinical Prompt Engine
Integrates Google Gemini to provide conversational speech therapy coaching,
customized Hindi articulation drills, and clinician progress summaries.
"""

import os
import json
from typing import Dict, Any, Optional

class GeminiSpeechTherapist:
    """Conversational Speech-Language Pathologist AI Assistant ('Dr. Bol')."""

    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or os.getenv("GEMINI_API_KEY")
        self.client = None
        if self.api_key:
            try:
                from google import genai
                self.client = genai.Client(api_key=self.api_key)
            except Exception as e:
                print(f"Warning: google-genai library initialization note: {e}")

    def get_therapeutic_guidance(self, query: str, current_sound: str = "क", language: str = "hi") -> Dict[str, Any]:
        """
        Generates structured SLP clinical guidance tailored for pediatric Hindi misarticulation.
        Uses Gemini 2.5 Flash if API key is present, else employs structured clinical templates.
        """
        system_prompt = f"""
You are Dr. Bol (बोल मित्र), an empathetic, expert pediatric Speech-Language Pathologist (SLP) specializing in Hindi articulation therapy and Indian phonetics.
Target Sound Context: '{current_sound}'
Language Preference: '{language}'

Provide warm, encouraging, child- and parent-friendly advice covering:
1. Exact Articulatory Placement (जीभ, होंठ, तालु की स्थिति)
2. 3 Fun Home Practice Techniques (मजेदार खेल व व्यायाम)
3. 4 Target Practice Words in Initial, Medial, and Final positions
4. Encouraging words for the child.

Return response formatted in clean HTML (using <strong>, <ul>, <li>, <p> tags) suitable for display in the app.
"""
        if self.client:
            try:
                response = self.client.models.generate_content(
                    model='gemini-2.5-flash',
                    contents=f"{system_prompt}\n\nParent/Therapist Question: {query}"
                )
                if response and response.text:
                    return {
                        "replyHtml": response.text,
                        "speechSummary": "Dr. Bol ने आपके लिए नए अभ्यास तैयार किए हैं!",
                        "source": "gemini-2.5-flash"
                    }
            except Exception as err:
                print(f"Gemini API execution note (using clinical fallback): {err}")

        # Clinical SLP Rule-based Template Fallback
        return self._generate_rule_based_response(query, current_sound)

    def generate_custom_drills(self, target_sound: str, difficulty: str = "easy") -> Dict[str, Any]:
        """Dynamically generates custom alliterative Hindi articulation drills."""
        if self.client:
            try:
                prompt = f"""
Generate 3 brand new Hindi carrier sentences and 1 playful Hindi tongue twister specifically targeting the sound '{target_sound}' for a 6-year-old child.
Difficulty level: {difficulty}.
Return valid JSON with format:
{{
  "sentences": ["sentence 1", "sentence 2", "sentence 3"],
  "twister": "tongue twister text",
  "translit": "english transliteration"
}}
"""
                response = self.client.models.generate_content(
                    model='gemini-2.5-flash',
                    contents=prompt
                )
                cleaned = response.text.strip().replace("```json", "").replace("```", "")
                return json.loads(cleaned)
            except Exception as e:
                print(f"Gemini drill generation fallback: {e}")

        # Fallback generated drills
        return {
            "sentences": [
                f"{target_sound} से शुरू होने वाला प्यारा शब्द बोलें।",
                f"बोलू तोते ने {target_sound} ध्वनि को सुंदर बोला।",
                f"रोज अभ्यास करने से {target_sound} स्पष्ट हो जाता है।"
            ],
            "twister": f"प्यारा तोता पेड़ पर बैठा, {target_sound} ध्वनि का गीत सुनाया!",
            "translit": "Pyara tota ped par baitha, geet sunaya..."
        }

    def _generate_rule_based_response(self, query: str, target_sound: str) -> Dict[str, Any]:
        """Clinical knowledge response generator when offline."""
        return {
            "replyHtml": f"""
            <div style="line-height: 1.6;">
              <h4 style="color: #4338ca; margin-bottom: 8px;">👨‍⚕️ Dr. Bol (बोल मित्र) की क्लीनिकल सलाह:</h4>
              <p>बच्चे के <strong>/{target_sound}/ ध्वनि उच्चारण</strong> के लिए निम्नलिखित चरणों का पालन करें:</p>
              <ul>
                <li><strong>मुखाकृति संकेत (Visual Cue):</strong> बच्चे को आईने के सामने बैठाएं और जीभ की सही स्थिति दिखाएं।</li>
                <li><strong>आदि स्तर से शुरुआत:</strong> पहले शब्द के शुरू में ध्वनि (Initial Position) का अभ्यास कराएं।</li>
                <li><strong>प्रशंसा व पुरस्कार:</strong> हर सही प्रयास पर बच्चे को सितारे और शाबाशी दें।</li>
              </ul>
              <p style="margin-top: 8px; color: #059669;"><strong>सुझाव:</strong> 'गुब्बारा फोड़ो' और 'समान युग्म' खेल से अभ्यास को रुचिकर बनाएं!</p>
            </div>
            """,
            "speechSummary": "मैंने आपके लिए अभ्यास सुझाव तैयार किए हैं!",
            "source": "clinical_rule_engine"
        }
