"""
Test Suite for Vaak-Mitra Hindi Articulation & Speech AI Engine
"""

import unittest
import sys
from pathlib import Path

# Add root directory to sys.path
ROOT_DIR = Path(__file__).resolve().parent.parent
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from ai.hindi_phonetics import HINDI_PHONETIC_MATRIX, calculate_articulatory_distance, get_phonetic_features
from ai.speech_evaluator import HindiSpeechEvaluator
from ai.gemini_therapist import GeminiSpeechTherapist

class TestHindiPhonetics(unittest.TestCase):
    def setUp(self):
        self.evaluator = HindiSpeechEvaluator()

    def test_phonetic_matrix_presence(self):
        self.assertIn("क", HINDI_PHONETIC_MATRIX)
        self.assertIn("र", HINDI_PHONETIC_MATRIX)
        self.assertIn("ल", HINDI_PHONETIC_MATRIX)
        self.assertIn("स", HINDI_PHONETIC_MATRIX)
        self.assertIn("श", HINDI_PHONETIC_MATRIX)
        self.assertEqual(HINDI_PHONETIC_MATRIX["क"]["place"], "velar")
        self.assertEqual(HINDI_PHONETIC_MATRIX["र"]["manner"], "trill")

    def test_articulatory_distance(self):
        # /र/ and /ल/ should have distance due to manner (trill vs lateral)
        dist_r_l = calculate_articulatory_distance("र", "ल")
        self.assertGreater(dist_r_l, 0.0)

        # Same character should have 0 distance
        self.assertEqual(calculate_articulatory_distance("क", "क"), 0.0)

    def test_devanagari_segmentation(self):
        units = self.evaluator.segment_devanagari("केला")
        self.assertEqual(len(units), 2)
        self.assertEqual(units[0], "के")
        self.assertEqual(units[1], "ला")

        units2 = self.evaluator.segment_devanagari("तितली")
        self.assertEqual(len(units2), 3)

    def test_exact_speech_evaluation(self):
        res = self.evaluator.evaluate("रोटी", "रोटी", "र")
        self.assertEqual(res["score"], 100)
        self.assertTrue(res["is_correct"])
        self.assertEqual(res["stars"], 3)

    def test_substitution_speech_evaluation(self):
        # Substitution test: child says 'लोटी' instead of 'रोटी'
        res = self.evaluator.evaluate("लोटी", "रोटी", "र")
        self.assertLess(res["score"], 70)
        self.assertIn("प्रतिस्थापन", res["soda_category"])

    def test_gemini_therapist_fallback(self):
        therapist = GeminiSpeechTherapist()
        guidance = therapist.get_therapeutic_guidance("बच्चा र को ल बोलता है", "र", "hi")
        self.assertIn("replyHtml", guidance)
        self.assertIn("Dr. Bol", guidance["replyHtml"])

if __name__ == "__main__":
    unittest.main()
