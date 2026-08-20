"""
VAAK-MITRA (वाक-मित्र) - Hindi Phonetics & Articulatory Classification Matrix
Provides Devanagari acoustic, articulatory, and place/manner classification for Indian Languages.
"""

from typing import Dict, List, Any, Optional

# Articulatory Feature Matrix for Devanagari Consonants
HINDI_PHONETIC_MATRIX = {
    "क": {"place": "velar", "manner": "stop", "voicing": "voiceless", "aspiration": "unaspirated", "ipa": "k"},
    "ख": {"place": "velar", "manner": "stop", "voicing": "voiceless", "aspiration": "aspirated", "ipa": "kʰ"},
    "ग": {"place": "velar", "manner": "stop", "voicing": "voiced", "aspiration": "unaspirated", "ipa": "ɡ"},
    "घ": {"place": "velar", "manner": "stop", "voicing": "voiced", "aspiration": "aspirated", "ipa": "ɡʱ"},
    "ङ": {"place": "velar", "manner": "nasal", "voicing": "voiced", "aspiration": "unaspirated", "ipa": "ŋ"},

    "च": {"place": "palatal", "manner": "affricate", "voicing": "voiceless", "aspiration": "unaspirated", "ipa": "t͡ʃ"},
    "छ": {"place": "palatal", "manner": "affricate", "voicing": "voiceless", "aspiration": "aspirated", "ipa": "t͡ʃʰ"},
    "ज": {"place": "palatal", "manner": "affricate", "voicing": "voiced", "aspiration": "unaspirated", "ipa": "d͡ʒ"},
    "झ": {"place": "palatal", "manner": "affricate", "voicing": "voiced", "aspiration": "aspirated", "ipa": "d͡ʒʱ"},
    "ञ": {"place": "palatal", "manner": "nasal", "voicing": "voiced", "aspiration": "unaspirated", "ipa": "ɲ"},

    "ट": {"place": "retroflex", "manner": "stop", "voicing": "voiceless", "aspiration": "unaspirated", "ipa": "ʈ"},
    "ठ": {"place": "retroflex", "manner": "stop", "voicing": "voiceless", "aspiration": "aspirated", "ipa": "ʈʰ"},
    "ड": {"place": "retroflex", "manner": "stop", "voicing": "voiced", "aspiration": "unaspirated", "ipa": "ɖ"},
    "ढ": {"place": "retroflex", "manner": "stop", "voicing": "voiced", "aspiration": "aspirated", "ipa": "ɖʱ"},
    "ण": {"place": "retroflex", "manner": "nasal", "voicing": "voiced", "aspiration": "unaspirated", "ipa": "ɳ"},
    "ड़": {"place": "retroflex", "manner": "flap", "voicing": "voiced", "aspiration": "unaspirated", "ipa": "ɽ"},
    "ढ़": {"place": "retroflex", "manner": "flap", "voicing": "voiced", "aspiration": "aspirated", "ipa": "ɽʱ"},

    "त": {"place": "dental", "manner": "stop", "voicing": "voiceless", "aspiration": "unaspirated", "ipa": "t̪"},
    "थ": {"place": "dental", "manner": "stop", "voicing": "voiceless", "aspiration": "aspirated", "ipa": "t̪ʰ"},
    "द": {"place": "dental", "manner": "stop", "voicing": "voiced", "aspiration": "unaspirated", "ipa": "d̪"},
    "ध": {"place": "dental", "manner": "stop", "voicing": "voiced", "aspiration": "aspirated", "ipa": "d̪ʱ"},
    "न": {"place": "dental", "manner": "nasal", "voicing": "voiced", "aspiration": "unaspirated", "ipa": "n"},

    "प": {"place": "bilabial", "manner": "stop", "voicing": "voiceless", "aspiration": "unaspirated", "ipa": "p"},
    "फ": {"place": "bilabial", "manner": "stop", "voicing": "voiceless", "aspiration": "aspirated", "ipa": "pʰ"},
    "ब": {"place": "bilabial", "manner": "stop", "voicing": "voiced", "aspiration": "unaspirated", "ipa": "b"},
    "भ": {"place": "bilabial", "manner": "stop", "voicing": "voiced", "aspiration": "aspirated", "ipa": "bʱ"},
    "म": {"place": "bilabial", "manner": "nasal", "voicing": "voiced", "aspiration": "unaspirated", "ipa": "m"},

    "य": {"place": "palatal", "manner": "approximant", "voicing": "voiced", "aspiration": "unaspirated", "ipa": "j"},
    "र": {"place": "alveolar", "manner": "trill", "voicing": "voiced", "aspiration": "unaspirated", "ipa": "r"},
    "ल": {"place": "alveolar", "manner": "lateral", "voicing": "voiced", "aspiration": "unaspirated", "ipa": "l"},
    "व": {"place": "labiodental", "manner": "approximant", "voicing": "voiced", "aspiration": "unaspirated", "ipa": "ʋ"},

    "श": {"place": "palatal", "manner": "fricative", "voicing": "voiceless", "aspiration": "unaspirated", "ipa": "ʃ"},
    "ष": {"place": "retroflex", "manner": "fricative", "voicing": "voiceless", "aspiration": "unaspirated", "ipa": "ʂ"},
    "स": {"place": "dental", "manner": "fricative", "voicing": "voiceless", "aspiration": "unaspirated", "ipa": "s"},
    "ह": {"place": "glottal", "manner": "fricative", "voicing": "voiced", "aspiration": "aspirated", "ipa": "ɦ"}
}

# Common Pediatric Misarticulation Process Rules in Hindi
PEDIATRIC_ERROR_PATTERNS = {
    ("र", "ल"): {
        "pattern": "Lambdacism / Lateralization",
        "description_hi": "/र/ के स्थान पर /ल/ बोलना",
        "description_en": "Replacing rhotic /r/ with lateral /l/",
        "placement_tip": "जीभ को दांत से चिपकाने के बजाय मसूड़े पर हल्का कम्पन (vibration) कराएं।"
    },
    ("स", "श"): {
        "pattern": "Palatalization / Sigmatism",
        "description_hi": "/स/ और /श/ का अंतःबदल",
        "description_en": "Dental /s/ replaced by Palatal /ʃ/",
        "placement_tip": "/स/ के लिए दाँत बंद रखें और सीटी जैसी ठंडी हवा निकालें।"
    },
    ("क", "त"): {
        "pattern": "Velar Fronting",
        "description_hi": "कण्ठ्य का दन्त्यीकरण (/क/ -> /त/)",
        "description_en": "Back sounds (velar) moved to front (dental)",
        "placement_tip": "जीभ की नोक को नीचे दबाकर गले के पिछले हिस्से से 'क' बोलें।"
    },
    ("ट", "त"): {
        "pattern": "Dentalization of Retroflex",
        "description_hi": "मूर्धन्य का दन्त्यीकरण (/ट/ -> /त/)",
        "description_en": "Retroflex /ʈ/ pronounced as dental /t̪/",
        "placement_tip": "जीभ की नोक को पीछे की ओर मोड़ें (curl back) और तालु के गड्ढे में स्पर्श करें।"
    }
}

def get_phonetic_features(char: str) -> Optional[Dict[str, str]]:
    """Retrieve phonetic articulatory features for a Hindi character."""
    return HINDI_PHONETIC_MATRIX.get(char)

def calculate_articulatory_distance(char1: str, char2: str) -> float:
    """
    Computes linguistic distance (0.0 to 1.0) between two Hindi phonemes
    based on Place, Manner, Voicing, and Aspiration differences.
    """
    if char1 == char2:
        return 0.0

    feat1 = HINDI_PHONETIC_MATRIX.get(char1)
    feat2 = HINDI_PHONETIC_MATRIX.get(char2)

    if not feat1 or not feat2:
        return 1.0  # Unknown or non-consonant difference

    penalty = 0.0
    if feat1["place"] != feat2["place"]:
        penalty += 0.4
    if feat1["manner"] != feat2["manner"]:
        penalty += 0.3
    if feat1["aspiration"] != feat2["aspiration"]:
        penalty += 0.2
    if feat1["voicing"] != feat2["voicing"]:
        penalty += 0.1

    return min(1.0, penalty)
