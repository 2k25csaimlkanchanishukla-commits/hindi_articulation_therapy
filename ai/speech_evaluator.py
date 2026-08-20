"""
VAAK-MITRA (वाक-मित्र) - Speech & Phonetic Alignment Evaluator
Evaluates spoken Hindi speech transcripts against target therapeutic words.
Provides S.O.D.A (Substitution, Omission, Distortion, Addition) classification,
articulatory accuracy percentages, and clinical recommendations.
"""

from typing import Dict, Any, List, Tuple
from .hindi_phonetics import HINDI_PHONETIC_MATRIX, PEDIATRIC_ERROR_PATTERNS, calculate_articulatory_distance

class HindiSpeechEvaluator:
    """Intelligent Hindi Speech Recognition & Phonetic Pronunciation Evaluator."""

    def __init__(self):
        self.error_rules = PEDIATRIC_ERROR_PATTERNS

    def segment_devanagari(self, text: str) -> List[str]:
        """
        Segments a Hindi Devanagari string into logical aksharas / phonetic units.
        Handles matras, virama, and halant conjuncts.
        """
        units = []
        current = ""
        # Devanagari Unicode Range: 0x0900 to 0x097F
        # Dependent vowel signs (Matras): 0x093E to 0x094C, 0x0962, 0x0963
        # Virama: 0x094D
        # Signs: 0x0901, 0x0902, 0x0903
        MATRAS_AND_SIGNS = {
            '\u0901', '\u0902', '\u0903', '\u093e', '\u093f', '\u0940',
            '\u0941', '\u0942', '\u0943', '\u0944', '\u0947', '\u0948',
            '\u094b', '\u094c', '\u094d', '\u0962', '\u0963'
        }

        for char in text.strip():
            if char in MATRAS_AND_SIGNS and current:
                current += char
            else:
                if current:
                    units.append(current)
                current = char
        if current:
            units.append(current)
        return units

    def evaluate(self, spoken_text: str, target_word: str, target_sound: str = "") -> Dict[str, Any]:
        """
        Evaluates spoken utterance against target word.
        Returns accuracy percentage, SODA category, star count, and clinical guidance.
        """
        clean_spoken = spoken_text.strip()
        clean_target = target_word.strip()

        # 1. Exact Match
        if clean_spoken == clean_target:
            return {
                "score": 100,
                "is_correct": True,
                "stars": 3,
                "soda_category": "सटीक (Accurate)",
                "feedback_hi": "शाबाश! बिल्कुल शुद्ध और स्पष्ट उच्चारण! ⭐⭐⭐",
                "feedback_en": "Superb! Crystal clear and accurate pronunciation! ⭐⭐⭐",
                "articulatory_notes": "ध्वनि का स्थान और प्रयत्न पूर्णतः सही है।"
            }

        spoken_units = self.segment_devanagari(clean_spoken)
        target_units = self.segment_devanagari(clean_target)

        # 2. Compute Levenshtein Phonetic Distance
        base_score, alignment = self._align_and_score(spoken_units, target_units)

        # 3. Classify S.O.D.A Error
        soda_cat, pattern_notes = self._classify_soda_error(clean_spoken, clean_target, target_sound)

        # Penalize if target sound was substituted
        if "प्रतिस्थापन" in soda_cat:
            base_score = min(base_score, 65)

        is_correct = base_score >= 75
        stars = 3 if base_score >= 80 else (2 if base_score >= 50 else 1)

        if is_correct:
            fb_hi = "बहुत बढ़िया प्रयास! उच्चारण काफी स्पष्ट है! ⭐⭐⭐"
            fb_en = "Great job! Speech is quite intelligible! ⭐⭐⭐"
        elif base_score >= 50:
            fb_hi = "अच्छा प्रयास! थोड़ा और अभ्यास करने पर और अच्छा होगा! ⭐⭐"
            fb_en = "Good effort! Needs a little more placement drill! ⭐⭐"
        else:
            fb_hi = "कोई बात नहीं! बोलू के साथ फिर से कोशिश करें! ⭐"
            fb_en = "Keep practicing! Listen carefully to the sample sound! ⭐"

        return {
            "score": base_score,
            "is_correct": is_correct,
            "stars": stars,
            "soda_category": soda_cat,
            "pattern_notes": pattern_notes,
            "feedback_hi": fb_hi,
            "feedback_en": fb_en,
            "spoken_transcription": clean_spoken,
            "target_transcription": clean_target
        }

    def _align_and_score(self, spoken_units: List[str], target_units: List[str]) -> Tuple[int, List[Tuple[str, str]]]:
        """Calculates distance alignment and produces an accuracy percentage (0-100)."""
        m, n = len(spoken_units), len(target_units)
        dp = [[0.0] * (n + 1) for _ in range(m + 1)]

        for i in range(m + 1):
            dp[i][0] = float(i)
        for j in range(n + 1):
            dp[0][j] = float(j)

        for i in range(1, m + 1):
            for j in range(1, n + 1):
                u1 = spoken_units[i - 1][0] if spoken_units[i - 1] else ""
                u2 = target_units[j - 1][0] if target_units[j - 1] else ""
                art_dist = calculate_articulatory_distance(u1, u2)
                
                cost = 0.0 if spoken_units[i - 1] == target_units[j - 1] else (0.5 + 0.5 * art_dist)
                dp[i][j] = min(
                    dp[i - 1][j] + 1.0,      # Insertion / Addition
                    dp[i][j - 1] + 1.0,      # Deletion / Omission
                    dp[i - 1][j - 1] + cost  # Substitution / Match
                )

        max_len = max(m, n)
        if max_len == 0:
            return 100, []

        normalized_err = dp[m][n] / max_len
        score = max(0, min(100, int((1.0 - normalized_err) * 100)))
        return score, []

    def _classify_soda_error(self, spoken: str, target: str, target_sound: str) -> Tuple[str, str]:
        """Classifies error into S.O.D.A categories: Substitution, Omission, Distortion, Addition."""
        # Check known common substitution patterns
        if target_sound == "र" and "ल" in spoken and "र" not in spoken:
            return "प्रतिस्थापन (Substitution: /r/ -> /l/)", "Lambdacism: जीभ मसूड़े पर कम्पन करने के बजाय बगल से हवा छोड़ रही है।"
        if target_sound == "स" and "श" in spoken and "स" not in spoken:
            return "प्रतिस्थापन (Substitution: /s/ -> /ʃ/)", "Palatalization: जीभ तालु की ओर ज्यादा पीछे जा रही है।"
        if target_sound == "क" and "त" in spoken and "क" not in spoken:
            return "प्रतिस्थापन (Substitution: /k/ -> /t/)", "Velar Fronting: गले के स्थान पर दांतों का उपयोग।"
        if target_sound == "ट" and "त" in spoken and "ट" not in spoken:
            return "प्रतिस्थापन (Substitution: /ʈ/ -> /t̪/)", "Dentalization: जीभ ऊपर मोड़ने के बजाय दांतों से टकरा रही है।"

        if len(spoken) < len(target):
            return "लोप (Omission)", "ध्वनि अथवा मात्रा का शब्द में से छूट जाना।"
        elif len(spoken) > len(target):
            return "आगम (Addition)", "अतिरिक्त ध्वनि अथवा स्वर का जुड़ना।"
        else:
            return "विकृति (Distortion)", "अस्पष्ट अथवा विकृत उच्चारण।"
