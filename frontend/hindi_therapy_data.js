/**
 * VAAK-MITRA (वाक-मित्र) - Comprehensive Hindi Speech Therapy Dataset
 * Specially designed for Indian pediatric articulation therapy.
 * Categorized by:
 * 1. Place of Articulation (स्थान) & Manner of Articulation (प्रयत्न)
 * 2. Word Position Levels: Initial (आदि), Medial (मध्य), Final (अंतिम)
 * 3. Minimal Pairs (भेदकारी शब्द-युग्म)
 * 4. Oral-Motor Exercises (मुख व जीभ व्यायाम)
 * 5. Tongue Twisters (जीभ घुमाव पहेलियाँ)
 * 6. Sentence & Story generalization
 */

const HINDI_THERAPY_DATA = {
  // Trilingual UI Localization Strings
  translations: {
    hi: {
      appName: "वाक-मित्र",
      appTagline: "बच्चों के लिए हिंदी वाक् एवं उच्चारण थेरेपी",
      companionGreeting: "नमस्ते दोस्त! मैं हूँ बोलू तोता 🦜 चलो मिलकर बोलना सीखें!",
      tabPosition: "1. ध्वनि स्थान (Mouth Guide)",
      tabPhoneme: "2. वर्ण स्तर (IMF Words)",
      tabFlashcards: "3. चित्र कार्ड (Flashcards)",
      tabAsrScorer: "4. आवाज़ परीक्षण (Voice ASR)",
      tabMinimalPairs: "5. समान युग्म (Minimal Pairs)",
      tabBalloonGame: "6. गुब्बारा खेल (Balloon Game)",
      tabTongueTwisters: "7. जीभ घुमाव (Twisters)",
      tabStoryBuilder: "8. कहानी व वाक्य (Stories)",
      tabAiTherapist: "9. बोल मित्र AI (Dr. Bol)",
      tabAnalytics: "10. प्रगति रिपोर्ट (Dashboard)",
      tabSessionBuilder: "11. सत्र निर्माता (Custom)",
      tabOralGym: "12. मुख व्यायाम (Oral Gym)",
      selectSound: "ध्वनि चुनें (Select Target Sound):",
      positionInitial: "आदि (शुरुआत में)",
      positionMedial: "मध्य (बीच में)",
      positionFinal: "अंतिम (अंत में)",
      listenBtn: "सुनिए 🔊",
      recordBtn: "बोलिए 🎙️",
      recordingText: "सुन रहा हूँ... बोलिए!",
      stopBtn: "रोकें ⏹️",
      scoreTitle: "आपका उच्चारण स्कोर:",
      feedbackGreat: "शाबाश! बहुत बढ़िया उच्चारण! ⭐⭐⭐",
      feedbackGood: "अच्छा प्रयास! थोड़ा और अभ्यास करें! ⭐⭐",
      feedbackTryAgain: "कोई बात नहीं! फिर से कोशिश करें! ⭐",
      articulators: {
        lips: "होंठ (Lips)",
        tongue: "जीभ (Tongue)",
        teeth: "दाँत (Teeth)",
        palate: "तालु (Palate)",
        vocalCords: "स्वरयंत्र (Vocal Cords)"
      }
    },
    en: {
      appName: "Vaak-Mitra",
      appTagline: "Hindi Speech & Articulation Therapy for Children",
      companionGreeting: "Hello friend! I am Bolu the Parrot 🦜 Let's practice speaking together!",
      tabPosition: "1. Sound Position (Mouth Guide)",
      tabPhoneme: "2. Phoneme Level (IMF Words)",
      tabFlashcards: "3. Picture Cards (Flashcards)",
      tabAsrScorer: "4. Voice ASR Scorer",
      tabMinimalPairs: "5. Minimal Pairs",
      tabBalloonGame: "6. Balloon Game",
      tabTongueTwisters: "7. Tongue Twisters",
      tabStoryBuilder: "8. Sentence & Stories",
      tabAiTherapist: "9. Dr. Bol AI Therapist",
      tabAnalytics: "10. Progress Dashboard",
      tabSessionBuilder: "11. Custom Session",
      tabOralGym: "12. Oral Motor Gym",
      selectSound: "Select Target Sound:",
      positionInitial: "Initial Position",
      positionMedial: "Medial Position",
      positionFinal: "Final Position",
      listenBtn: "Listen 🔊",
      recordBtn: "Speak 🎙️",
      recordingText: "Listening... Speak now!",
      stopBtn: "Stop ⏹️",
      scoreTitle: "Your Pronunciation Score:",
      feedbackGreat: "Superb! Crystal clear pronunciation! ⭐⭐⭐",
      feedbackGood: "Good try! A little more practice! ⭐⭐",
      feedbackTryAgain: "Don't worry! Let's try once more! ⭐",
      articulators: {
        lips: "Lips",
        tongue: "Tongue",
        teeth: "Teeth",
        palate: "Hard/Soft Palate",
        vocalCords: "Vocal Cords"
      }
    },
    hinglish: {
      appName: "Vaak-Mitra",
      appTagline: "Bachhon ke liye Hindi Speech & Pronunciation Therapy",
      companionGreeting: "Namaste dost! Main hoon Bolu Tota 🦜 Chalo milkar bolna seekhein!",
      tabPosition: "1. Sound Position (Mouth Guide)",
      tabPhoneme: "2. Varn Level (IMF Words)",
      tabFlashcards: "3. Photo Cards (Flashcards)",
      tabAsrScorer: "4. Voice Test (ASR)",
      tabMinimalPairs: "5. Minimal Pairs (Same Sound)",
      tabBalloonGame: "6. Balloon Game",
      tabTongueTwisters: "7. Jeebh Ghumao (Twisters)",
      tabStoryBuilder: "8. Kahani & Vaakya (Stories)",
      tabAiTherapist: "9. Bolu AI Therapist",
      tabAnalytics: "10. Progress Report",
      tabSessionBuilder: "11. Session Builder",
      tabOralGym: "12. Face & Tongue Gym",
      selectSound: "Target Sound Chuniye:",
      positionInitial: "Start me (Initial)",
      positionMedial: "Beech me (Medial)",
      positionFinal: "Aakhir me (Final)",
      listenBtn: "Suno 🔊",
      recordBtn: "Bolo 🎙️",
      recordingText: "Sun raha hoon... Bolo!",
      stopBtn: "Roko ⏹️",
      scoreTitle: "Aapka Bolne ka Score:",
      feedbackGreat: "Wah! Shandar Pronunciation! ⭐⭐⭐",
      feedbackGood: "Accha try kiya! Thoda aur practice karein! ⭐⭐",
      feedbackTryAgain: "Koi baat nahi! Ek baar aur koshish karein! ⭐",
      articulators: {
        lips: "Honth (Lips)",
        tongue: "Jeebh (Tongue)",
        teeth: "Daant (Teeth)",
        palate: "Talu (Palate)",
        vocalCords: "Gale ki Doriyan"
      }
    }
  },

  // Sound Categories based on Place of Articulation (उच्चारण स्थान)
  categories: [
    {
      id: "velar",
      nameHi: "कण्ठ्य वर्ण (Velar Sounds - क, ख, ग, घ)",
      nameEn: "Velar Sounds (/k/, /kʰ/, /g/, /gʱ/)",
      description: "ध्वनि गले और जीभ के पिछले हिस्से (तालु के पिछले भाग) को छूने से निकलती है।",
      sounds: ["क", "ख", "ग", "घ"]
    },
    {
      id: "palatal",
      nameHi: "तालव्य वर्ण (Palatal Sounds - च, छ, ज, झ, श)",
      nameEn: "Palatal Sounds (/t͡ʃ/, /t͡ʃʰ/, /d͡ʒ/, /d͡ʒʱ/, /ʃ/)",
      description: "जीभ का मध्य भाग कठोर तालु (ऊपरी छत) को छूता है।",
      sounds: ["च", "छ", "ज", "झ", "श"]
    },
    {
      id: "retroflex",
      nameHi: "मूर्धन्य वर्ण (Retroflex Sounds - ट, ठ, ड, ढ, ड़, ढ़)",
      nameEn: "Retroflex Sounds (/ʈ/, /ʈʰ/, /ɖ/, /ɖʱ/, /ɽ/)",
      description: "जीभ की नोक मुड़कर तालु के सबसे ऊंचे हिस्से (मूर्धा) को छूती है।",
      sounds: ["ट", "ठ", "ड", "ढ", "ड़"]
    },
    {
      id: "dental",
      nameHi: "दन्त्य वर्ण (Dental Sounds - त, थ, द, ध, न, स)",
      nameEn: "Dental Sounds (/t̪/, /t̪ʰ/, /d̪/, /d̪ʱ/, /n/, /s/)",
      description: "जीभ की नोक ऊपरी सामने वाले दाँतों के पिछले हिस्से को छूती है।",
      sounds: ["त", "थ", "द", "ध", "न", "स"]
    },
    {
      id: "labial",
      nameHi: "ओष्ठ्य वर्ण (Labial Sounds - प, फ, ब, भ, म)",
      nameEn: "Labial / Bilabial Sounds (/p/, /pʰ/, /b/, /bʱ/, /m/)",
      description: "दोनों होंठ आपस में मिलकर या छूकर ध्वनि उत्पन्न करते हैं।",
      sounds: ["प", "फ", "ब", "भ", "म"]
    },
    {
      id: "liquids",
      nameHi: "अन्तस्थ व कम्पन ध्वनि (Liquids & Fricatives - र, ल, व, ह)",
      nameEn: "Liquids & Fricatives (/r/, /l/, /ʋ/, /h/)",
      description: "जीभ में कम्पन (र - Rhotic) अथवा जीभ के दोनों किनारों से हवा (ल - Lateral) निकलती है।",
      sounds: ["र", "ल", "व", "ह"]
    }
  ],

  // Comprehensive Sound Profiles with Articulation Guides and IMF Words
  soundsData: {
    "क": {
      phoneme: "क",
      ipa: "/k/",
      category: "velar",
      manner: "अल्पप्राण अघोष स्पर्श (Voiceless Unaspirated Velar Stop)",
      commonErrors: ["त (Dental substitution: 'केला' -> 'तेला')", "लोप (Omission: 'कमल' -> 'मल')"],
      anatomyGuide: {
        placement: "जीभ का पिछला हिस्सा ऊपर उठकर कोमल तालु (Soft Palate) को स्पर्श करता है। गले से हल्की रुकावट के साथ हवा छोड़ें।",
        visualCue: "गले में उंगली रखकर महसूस करें कि आवाज गले के पीछे से निकल रही है।",
        mouthState: "mouth_velar",
        tonguePosition: "Back Elevated to Soft Palate",
        lipPosition: "Neutral Open"
      },
      words: {
        initial: [
          { word: "केला", translit: "Kela", meaning: "Banana", emoji: "🍌", sentence: "मीठा केला खाओ।" },
          { word: "कमल", translit: "Kamal", meaning: "Lotus", emoji: "🪷", sentence: "कमल का फूल सुंदर है।" },
          { word: "किताब", translit: "Kitaab", meaning: "Book", emoji: "📖", sentence: "अपनी किताब खोलो।" },
          { word: "कुत्ता", translit: "Kutta", meaning: "Dog", emoji: "🐕", sentence: "कुत्ता भौंकता है।" },
          { word: "कार", translit: "Car", meaning: "Car", emoji: "🚗", sentence: "लाल कार चल रही है।" }
        ],
        medial: [
          { word: "मकान", translit: "Makaan", meaning: "House", emoji: "🏠", sentence: "यह मेरा मकान है।" },
          { word: "दुकान", translit: "Dukaan", meaning: "Shop", emoji: "🏪", sentence: "दुकान से फल लाओ।" },
          { word: "शिकारी", translit: "Shikaari", meaning: "Hunter", emoji: "🏹", sentence: "शिकारी जंगल गया।" },
          { word: "टोकरी", translit: "Tokri", meaning: "Basket", emoji: "🧺", sentence: "टोकरी में आम हैं।" }
        ],
        final: [
          { word: "नाक", translit: "Naak", meaning: "Nose", emoji: "👃", sentence: "नाक से सांस लो।" },
          { word: "दूध-पाक", translit: "Paak", meaning: "Cooked/Sweet", emoji: "🥛", sentence: "मीठा दूध पियो।" },
          { word: "सड़क", translit: "Sadak", meaning: "Road", emoji: "🛣️", sentence: "सड़क पर ध्यान से चलो।" },
          { word: "चमक", translit: "Chamak", meaning: "Shine", emoji: "✨", sentence: "सितारे में चमक है।" }
        ]
      }
    },

    "ख": {
      phoneme: "ख",
      ipa: "/kʰ/",
      category: "velar",
      manner: "महाप्राण अघोष स्पर्श (Voiceless Aspirated Velar Stop)",
      commonErrors: ["क (Deaspiration: 'खरगोश' -> 'करगोश')", "थ (Dental substitution)"],
      anatomyGuide: {
        placement: "जीभ का पिछला हिस्सा कोमल तालु पर लगाएं और मुंह से ज्यादा हवा (Puff of Air) छोड़ते हुए 'ख' बोलें।",
        visualCue: "हाथ को मुंह के आगे रखें और तेज गर्म हवा का झटका महसूस करें।",
        mouthState: "mouth_velar",
        tonguePosition: "Back Elevated + Strong Air Release",
        lipPosition: "Open"
      },
      words: {
        initial: [
          { word: "खरगोश", translit: "Khargosh", meaning: "Rabbit", emoji: "🐇", sentence: "सफेद खरगोश घास खाता है।" },
          { word: "खिड़की", translit: "Khidki", meaning: "Window", emoji: "🪟", sentence: "कमरे की खिड़की खोलो।" },
          { word: "खिलौना", translit: "Khilona", meaning: "Toy", emoji: "🧸", sentence: "नया खिलौना सुंदर है।" }
        ],
        medial: [
          { word: "मक्खन", translit: "Makkhan", meaning: "Butter", emoji: "🧈", sentence: "ताज़ा मक्खन खाओ।" },
          { word: "पालखी", translit: "Paalkhi", meaning: "Palanquin", emoji: "🛋️", sentence: "सुंदर पालखी आई।" }
        ],
        final: [
          { word: "पंख", translit: "Pankh", meaning: "Feather", emoji: "🪶", sentence: "मोर का रंगीन पंख।" },
          { word: "आंख", translit: "Aankh", meaning: "Eye", emoji: "👁️", sentence: "आंखों से दुनिया देखो।" }
        ]
      }
    },

    "र": {
      phoneme: "र",
      ipa: "/r/",
      category: "liquids",
      manner: "मूर्धन्य/वर्त्स्य लुंठित कम्पन (Alveolar/Retroflex Trill/Tap)",
      commonErrors: ["ल (Lateral substitution: 'रोटी' -> 'लोटी', 'राजा' -> 'लाजा')", "य (Approximant: 'रेल' -> 'येल')"],
      anatomyGuide: {
        placement: "जीभ की नोक को ऊपर के मसूड़े (दांतों के ठीक पीछे) हल्का छूकर हवा के दबाव से कम्पन (vibration / flap) कराएं।",
        visualCue: "गाड़ी के इंजन की आवाज निकालें: 'र्र्र्र्र्र...'। जीभ को ढीला और नोकदार रखें।",
        mouthState: "mouth_trill",
        tonguePosition: "Tip Flapping at Alveolar Ridge",
        lipPosition: "Slightly Spread"
      },
      words: {
        initial: [
          { word: "रोटी", translit: "Roti", meaning: "Bread", emoji: "🫓", sentence: "गरम रोटी खाओ।" },
          { word: "राजा", translit: "Raja", meaning: "King", emoji: "👑", sentence: "राजा महल में रहता है।" },
          { word: "रेल", translit: "Rail", meaning: "Train", emoji: "🚆", sentence: "छुक-छुक रेल आई।" },
          { word: "रंग", translit: "Rang", meaning: "Color", emoji: "🎨", sentence: "यह लाल रंग है।" },
          { word: "रात", translit: "Raat", meaning: "Night", emoji: "🌙", sentence: "रात में तारे चमकते हैं।" }
        ],
        medial: [
          { word: "तारा", translit: "Taara", meaning: "Star", emoji: "⭐", sentence: "आसमान में तारा चमका।" },
          { word: "सूरज", translit: "Suraj", meaning: "Sun", emoji: "☀️", sentence: "सूरज सुबह निकलता है।" },
          { word: "दरवाजा", translit: "Darwaaza", meaning: "Door", emoji: "🚪", sentence: "दरवाजा बंद करो।" },
          { word: "गाड़ी", translit: "Gaari", meaning: "Car", emoji: "🚙", sentence: "गाड़ी तेज चल रही है।" }
        ],
        final: [
          { word: "घर", translit: "Ghar", meaning: "Home", emoji: "🏡", sentence: "यह मेरा प्यारा घर है।" },
          { word: "शेर", translit: "Sher", meaning: "Lion", emoji: "🦁", sentence: "शेर जंगल का राजा है।" },
          { word: "मोर", translit: "Mor", meaning: "Peacock", emoji: "🦚", sentence: "मोर नाच रहा है।" },
          { word: "कार", translit: "Car", meaning: "Motorcar", emoji: "🚗", sentence: "कार स्टार्ट करो।" }
        ]
      }
    },

    "ल": {
      phoneme: "ल",
      ipa: "/l/",
      category: "liquids",
      manner: "दन्त्य-वर्त्स्य पार्श्विक (Voiced Alveolar Lateral)",
      commonErrors: ["र (substitution)", "य (substitution: 'लड़का' -> 'यड़का')"],
      anatomyGuide: {
        placement: "जीभ की नोक को ऊपर के दाँतों के पीछे चिपका कर रखें और हवा को जीभ के दोनों बगलों (sides) से निकलने दें।",
        visualCue: "गाना गाएं: 'ला-ला-ला-ला'। जीभ की नोक ऊपर टिकी रहे।",
        mouthState: "mouth_lateral",
        tonguePosition: "Tip firmly on Ridge, Air escapes sides",
        lipPosition: "Open Neutral"
      },
      words: {
        initial: [
          { word: "लड्डू", translit: "Laddu", meaning: "Sweet Ball", emoji: "🟡", sentence: "मीठा लड्डू खाओ।" },
          { word: "लाल", translit: "Laal", meaning: "Red", emoji: "🔴", sentence: "सेब का रंग लाल है।" },
          { word: "लड़का", translit: "Ladka", meaning: "Boy", emoji: "👦", sentence: "लड़का गेंद खेल रहा है।" },
          { word: "लोमड़ी", translit: "Lomdi", meaning: "Fox", emoji: "🦊", sentence: "लोमड़ी चालाक होती है।" }
        ],
        medial: [
          { word: "गुलाब", translit: "Gulaab", meaning: "Rose", emoji: "🌹", sentence: "गुलाब की खुशबू अच्छी है।" },
          { word: "तालाब", translit: "Taalaab", meaning: "Pond", emoji: "🌊", sentence: "तालाब में बतख तैरती है।" },
          { word: "कोयला", translit: "Koyla", meaning: "Coal", emoji: "⬛", sentence: "कोयला काला होता है।" }
        ],
        final: [
          { word: "फूल", translit: "Phool", meaning: "Flower", emoji: "🌸", sentence: "फूल खिला है।" },
          { word: "फल", translit: "Phal", meaning: "Fruit", emoji: "🍎", sentence: "ताज़ा फल खाओ।" },
          { word: "चावल", translit: "Chaawal", meaning: "Rice", emoji: "🍚", sentence: "गरम चावल खाओ।" },
          { word: "बादल", translit: "Baadal", meaning: "Cloud", emoji: "☁️", sentence: "काले बादल छाए हैं।" }
        ]
      }
    },

    "स": {
      phoneme: "स",
      ipa: "/s/",
      category: "dental",
      manner: "दन्त्य अघोष संघर्षी (Voiceless Dental/Alveolar Fricative)",
      commonErrors: ["श (Palatal substitution: 'सांप' -> 'शांप')", "थ (Lisp/Interdental: 'सेब' -> 'थेब')"],
      anatomyGuide: {
        placement: "दाँत हल्के से बंद करें, जीभ की नोक नीचे के दाँतों के पीछे रखें। बीच में से सीटी जैसी पतली ठंडी हवा 'स्स्स्स्स' निकालें।",
        visualCue: "साँप जैसी फुंकार आवाज निकालें: 'स्स्स्स्स'। हाथ आगे रखकर ठंडी हवा महसूस करें।",
        mouthState: "mouth_fricative_s",
        tonguePosition: "Behind Lower/Upper Teeth, Narrow Groove",
        lipPosition: "Slight Smile / Retracted"
      },
      words: {
        initial: [
          { word: "सेब", translit: "Seb", meaning: "Apple", emoji: "🍎", sentence: "रोज एक सेब खाओ।" },
          { word: "सूरज", translit: "Suraj", meaning: "Sun", emoji: "☀️", sentence: "सूरज चमक रहा है।" },
          { word: "साइकिल", translit: "Cycle", meaning: "Bicycle", emoji: "🚲", sentence: "साइकिल तेज चलाओ।" },
          { word: "सांप", translit: "Saanp", meaning: "Snake", emoji: "🐍", sentence: "सांप रेंगता है।" }
        ],
        medial: [
          { word: "किस्सा", translit: "Kissa", meaning: "Story", emoji: "📜", sentence: "दादी ने किस्सा सुनाया।" },
          { word: "पुस्तक", translit: "Pustak", meaning: "Book", emoji: "📚", sentence: "पुस्तक मेज पर है।" },
          { word: "रास्ता", translit: "Raasta", meaning: "Path", emoji: "🛣️", sentence: "सीधा रास्ता चुनो।" }
        ],
        final: [
          { word: "बस", translit: "Bus", meaning: "Bus", emoji: "🚌", sentence: "पीली बस आ गई।" },
          { word: "घास", translit: "Ghaas", meaning: "Grass", emoji: "🌱", sentence: "हरी घास पर चलो।" },
          { word: "गिलास", translit: "Gilaas", meaning: "Glass", emoji: "🥛", sentence: "पानी का गिलास लाओ।" }
        ]
      }
    },

    "श": {
      phoneme: "श",
      ipa: "/ʃ/",
      category: "palatal",
      manner: "तालव्य अघोष संघर्षी (Voiceless Palato-Alveolar Fricative)",
      commonErrors: ["स (Dental substitution: 'शेर' -> 'सेर')", "च (Stop substitution: 'शहद' -> 'चहद')"],
      anatomyGuide: {
        placement: "होंठों को हल्का गोल (pout) करें, जीभ का मध्य भाग तालु के पास ले जाएं और 'शू-शू' जैसी गर्म हवा बाहर निकालें।",
        visualCue: "चुप रहने का इशारा करें: 'श्श्श्श्श'। होंठ थोड़े आगे गोल होने चाहिए।",
        mouthState: "mouth_fricative_sh",
        tonguePosition: "Broad Flat near Hard Palate",
        lipPosition: "Rounded / Pouted"
      },
      words: {
        initial: [
          { word: "शेर", translit: "Sher", meaning: "Lion", emoji: "🦁", sentence: "शेर दहाड़ रहा है।" },
          { word: "शहद", translit: "Shahad", meaning: "Honey", emoji: "🍯", sentence: "मीठा शहद चखो।" },
          { word: "शंख", translit: "Shankh", meaning: "Conch", emoji: "🐚", sentence: "पूजा में शंख बजाओ।" },
          { word: "शरीफा", translit: "Shareefa", meaning: "Custard Apple", emoji: "🍈", sentence: "पका शरीफा खाओ।" }
        ],
        medial: [
          { word: "चश्मा", translit: "Chashma", meaning: "Spectacles", emoji: "👓", sentence: "दादाजी का चश्मा।" },
          { word: "रोशनी", translit: "Roshni", meaning: "Light", emoji: "💡", sentence: "कमरे में रोशनी करो।" },
          { word: "दिशा", translit: "Disha", meaning: "Direction", emoji: "🧭", sentence: "पूर्व दिशा में देखो।" }
        ],
        final: [
          { word: "आकाश", translit: "Aakash", meaning: "Sky", emoji: "🌌", sentence: "नीला आकाश देखो।" },
          { word: "मिश्रण", translit: "Mishran", meaning: "Mix", emoji: "🥣", sentence: "रंगों का मिश्रण।" },
          { word: "बरसात-कश", translit: "Kash", meaning: "Rain/Drop", emoji: "🌧️", sentence: "बारिश की बूंदें।" }
        ]
      }
    },

    "त": {
      phoneme: "त",
      ipa: "/t̪/",
      category: "dental",
      manner: "दन्त्य अल्पप्राण अघोष स्पर्श (Voiceless Dental Stop)",
      commonErrors: ["ट (Retroflex substitution: 'ताला' -> 'टाला')", "क (Velar substitution)"],
      anatomyGuide: {
        placement: "जीभ की नोक को सीधे ऊपरी सामने वाले दाँतों के पिछले हिस्से पर सटाएं और झटके से खोलें।",
        visualCue: "दांतों को हल्का दिखाएं और जीभ से दांतों को छूकर 'त-त-त' बोलें।",
        mouthState: "mouth_dental",
        tonguePosition: "Tip behind Upper Front Teeth",
        lipPosition: "Open Smile"
      },
      words: {
        initial: [
          { word: "ताला", translit: "Taala", meaning: "Lock", emoji: "🔒", sentence: "दरवाजे पर ताला लगाओ।" },
          { word: "तितली", translit: "Titli", meaning: "Butterfly", emoji: "🦋", sentence: "रंग-बिरंगी तितली उड़ी।" },
          { word: "तोता", translit: "Tota", meaning: "Parrot", emoji: "🦜", sentence: "हरा तोता मिर्ची खाता है।" },
          { word: "तरबूज", translit: "Tarbooj", meaning: "Watermelon", emoji: "🍉", sentence: "लाल तरबूज मीठा है।" }
        ],
        medial: [
          { word: "पतंग", translit: "Patang", meaning: "Kite", emoji: "🪁", sentence: "ऊंची पतंग उड़ाओ।" },
          { word: "जूता", translit: "Joota", meaning: "Shoe", emoji: "👞", sentence: "नया जूता पहनो।" },
          { word: "बोतल", translit: "Botal", meaning: "Bottle", emoji: "🍾", sentence: "पानी की बोतल भरो।" }
        ],
        final: [
          { word: "दांत", translit: "Daant", meaning: "Teeth", emoji: "🦷", sentence: "दांत साफ रखो।" },
          { word: "हाथ", translit: "Haath", meaning: "Hand", emoji: "✋", sentence: "हाथ धोकर खाना खाओ।" },
          { word: "रात", translit: "Raat", meaning: "Night", emoji: "🌙", sentence: "शुभ रात्रि।" }
        ]
      }
    },

    "ट": {
      phoneme: "ट",
      ipa: "/ʈ/",
      category: "retroflex",
      manner: "मूर्धन्य अल्पप्राण अघोष स्पर्श (Voiceless Retroflex Stop)",
      commonErrors: ["त (Dental substitution: 'टोपी' -> 'तोपी')", "च (Palatal substitution)"],
      anatomyGuide: {
        placement: "जीभ की नोक को पीछे की ओर मोड़ें (curl back) और तालु के गड्ढे में छूकर झटके से नीचे गिराएं।",
        visualCue: "घोड़े की टाप जैसी आवाज: 'टक-टक-टक'। जीभ ऊपर मुड़ी होनी चाहिए।",
        mouthState: "mouth_retroflex",
        tonguePosition: "Tip Curled Back against Hard Roof",
        lipPosition: "Neutral Open"
      },
      words: {
        initial: [
          { word: "टोपी", translit: "Topi", meaning: "Cap", emoji: "🧢", sentence: "सुंदर टोपी पहनो।" },
          { word: "टमाटर", translit: "Tamatar", meaning: "Tomato", emoji: "🍅", sentence: "लाल टमाटर ताजा है।" },
          { word: "टोकरी", translit: "Tokri", meaning: "Basket", emoji: "🧺", sentence: "फलों की टोकरी लाओ।" },
          { word: "ट्रेन", translit: "Train", meaning: "Train", emoji: "🚆", sentence: "ट्रेन प्लेटफार्म पर है।" }
        ],
        medial: [
          { word: "मटर", translit: "Matar", meaning: "Peas", emoji: "🫛", sentence: "हरी मटर के दाने।" },
          { word: "लोटा", translit: "Lota", meaning: "Pot", emoji: "🏺", sentence: "पीतल का लोटा।" },
          { word: "रोटी", translit: "Roti", meaning: "Bread", emoji: "🫓", sentence: "गरम-गरम रोटी।" }
        ],
        final: [
          { word: "ऊंट", translit: "Oont", meaning: "Camel", emoji: "🐪", sentence: "ऊंट रेगिस्तान का जहाज है।" },
          { word: "कपट", translit: "Kapat", meaning: "Deceit", emoji: "🎭", sentence: "सच्चाई से जियो।" },
          { word: "पेट", translit: "Pet", meaning: "Stomach", emoji: "🫃", sentence: "पेट भरकर खाओ।" }
        ]
      }
    },

    "प": {
      phoneme: "प",
      ipa: "/p/",
      category: "labial",
      manner: "ओष्ठ्य अल्पप्राण अघोष स्पर्श (Voiceless Bilabial Stop)",
      commonErrors: ["त (Dental substitution)", "फ (Aspiration error)"],
      anatomyGuide: {
        placement: "दोनों होंठों को आपस में कसकर बंद करें, मुँह में हवा रोकें और झटके से 'पॉप' जैसी आवाज के साथ होंठ खोलें।",
        visualCue: "कागज का टुकड़ा होंठों के आगे रखें और 'प' बोलने पर कागज हिलेगा।",
        mouthState: "mouth_bilabial",
        tonguePosition: "Resting Flat",
        lipPosition: "Compressed together, Pop open"
      },
      words: {
        initial: [
          { word: "पानी", translit: "Paani", meaning: "Water", emoji: "💧", sentence: "ठंडा पानी पियो।" },
          { word: "पतंग", translit: "Patang", meaning: "Kite", emoji: "🪁", sentence: "पतंग आसमान में उड़ी।" },
          { word: "पेड़", translit: "Ped", meaning: "Tree", emoji: "🌳", sentence: "पेड़ हमें छाया देता है।" },
          { word: "पपीता", translit: "Papeeta", meaning: "Papaya", emoji: "🍈", sentence: "मीठा पपीता काटो।" }
        ],
        medial: [
          { word: "कपड़ा", translit: "Kapda", meaning: "Cloth", emoji: "👕", sentence: "साफ कपड़ा पहनो।" },
          { word: "सपना", translit: "Sapna", meaning: "Dream", emoji: "💭", sentence: "मैंने प्यारा सपना देखा।" },
          { word: "दीपक", translit: "Deepak", meaning: "Lamp", emoji: "🪔", sentence: "मिट्टी का दीपक जलाओ।" }
        ],
        final: [
          { word: "सांप", translit: "Saanp", meaning: "Snake", emoji: "🐍", sentence: "सांप बिल में गया।" },
          { word: "चाप", translit: "Chaap", meaning: "Print/Impression", emoji: "👣", sentence: "कदमों की चाप।" },
          { word: "गुपचुप", translit: "Gupchup", meaning: "Pani Puri", emoji: "🍲", sentence: "चटपटे गुपचुप खाओ।" }
        ]
      }
    },

    "च": {
      phoneme: "च",
      ipa: "/t͡ʃ/",
      category: "palatal",
      manner: "तालव्य अल्पप्राण अघोष स्पर्श-संघर्षी (Voiceless Palato-Alveolar Affricate)",
      commonErrors: ["त (Dental substitution: 'चम्मच' -> 'तम्मत')", "स (Fricative: 'चाबी' -> 'साबी')"],
      anatomyGuide: {
        placement: "जीभ के आगे के हिस्से को ऊपरी मसूड़े के पीछे चिपकाएं और धीरे से हवा छोड़ते हुए फिसलाएं।",
        visualCue: "चिड़िया की आवाज निकालें: 'चीं-चीं-चीं'।",
        mouthState: "mouth_palatal",
        tonguePosition: "Blade at Post-Alveolar Ridge",
        lipPosition: "Neutral to Slightly Open"
      },
      words: {
        initial: [
          { word: "चाबी", translit: "Chaabi", meaning: "Key", emoji: "🔑", sentence: "ताले की चाबी कहां है?" },
          { word: "चम्मच", translit: "Chammach", meaning: "Spoon", emoji: "🥄", sentence: "चम्मच से खीर खाओ।" },
          { word: "चांद", translit: "Chaand", meaning: "Moon", emoji: "🌙", sentence: "चांद रात में चमकता है।" },
          { word: "चिड़िया", translit: "Chidiya", meaning: "Bird", emoji: "🐦", sentence: "चिड़िया दाना चुगती है।" }
        ],
        medial: [
          { word: "कचौड़ी", translit: "Kachori", meaning: "Pie", emoji: "🥟", sentence: "गरमा-गरम कचौड़ी।" },
          { word: "बच्चा", translit: "Bachha", meaning: "Child", emoji: "👶", sentence: "छोटा बच्चा हँस रहा है।" },
          { word: "मछली", translit: "Machhli", meaning: "Fish", emoji: "🐟", sentence: "मछली जल की रानी है।" }
        ],
        final: [
          { word: "नाच", translit: "Naach", meaning: "Dance", emoji: "💃", sentence: "मोर का सुंदर नाच।" },
          { word: "कांच", translit: "Kaanch", meaning: "Glass", emoji: "🪞", sentence: "कांच संभलकर पकड़ो।" },
          { word: "सच", translit: "Sach", meaning: "Truth", emoji: "✨", sentence: "हमेशा सच बोलो।" }
        ]
      }
    }
  },

  // Minimal Pairs for discrimination of common misarticulation patterns
  minimalPairs: [
    {
      pairId: "r_l",
      targetPhonemes: "र vs ल",
      descriptionHi: "/र/ की जगह /ल/ बोलना (ल-दोष / Rhotacism vs Lambdacism)",
      descriptionEn: "Distinguishing /r/ (Trill) vs /l/ (Lateral)",
      pairs: [
        { word1: "रोटी", emoji1: "🫓", word2: "लोटी", emoji2: "🥣", clue1: "खाने वाली गरम रोटी", clue2: "छोटा बर्तन/लोटा" },
        { word1: "राजा", emoji1: "👑", word2: "लाजा", emoji2: "🙈", clue1: "महल का राजा", clue2: "शर्म/लाज" },
        { word1: "तारा", emoji1: "⭐", word2: "ताला", emoji2: "🔒", clue1: "आसमान का सितारा", clue2: "दरवाजे का ताला" },
        { word1: "रंग", emoji1: "🎨", word2: "लंग", emoji2: "🦵", clue1: "होली का रंग", clue2: "पैर/लंगड़ा" },
        { word1: "रेल", emoji1: "🚆", word2: "तेल", emoji2: "🛢️", clue1: "छुक-छुक रेलगाड़ी", clue2: "सरसों का तेल" }
      ]
    },
    {
      pairId: "s_sh",
      targetPhonemes: "स vs श",
      descriptionHi: "/स/ और /श/ का भेद (Dental /s/ vs Palatal /ʃ/ Sigmatism)",
      descriptionEn: "Distinguishing Dental /s/ vs Palatal /ʃ/",
      pairs: [
        { word1: "सांप", emoji1: "🐍", word2: "शाम", emoji2: "🌆", clue1: "रेंगने वाला जीव", clue2: "दिन का ढलना (संध्या)" },
        { word1: "सात", emoji1: "7️⃣", word2: "शात", emoji2: "🤫", clue1: "संख्या सात (7)", clue2: "शांत/चुप" },
        { word1: "सेब", emoji1: "🍎", word2: "शेर", emoji2: "🦁", clue1: "लाल मीठा फल", clue2: "जंगल का राजा" },
        { word1: "साल", emoji1: "📅", word2: "शाल", emoji2: "🧣", clue1: "नया वर्ष (Year)", clue2: "ओढ़ने वाली गर्म शाल" }
      ]
    },
    {
      pairId: "t_T",
      targetPhonemes: "त vs ट",
      descriptionHi: "दन्त्य /त/ और मूर्धन्य /ट/ का भेद (Dental vs Retroflex Stop)",
      descriptionEn: "Distinguishing Dental /t̪/ vs Retroflex /ʈ/",
      pairs: [
        { word1: "ताला", emoji1: "🔒", word2: "टाला", emoji2: "🙅", clue1: "चाबी से खुलने वाला ताला", clue2: "काम आगे टाल दिया" },
        { word1: "तोता", emoji1: "🦜", word2: "टोटा", emoji2: "📦", clue1: "हरा पक्षी तोता", clue2: "कमी/घाटा" },
        { word1: "पतंग", emoji1: "🪁", word2: "पटांग", emoji2: "🎪", clue1: "हवा में उड़ती पतंग", clue2: "उलटी-सीधी बात" },
        { word1: "तप", emoji1: "🧘", word2: "टप", emoji2: "💧", clue1: "तपस्या करना", clue2: "पानी की टप-टप बूंद" }
      ]
    },
    {
      pairId: "p_ph",
      targetPhonemes: "प vs फ",
      descriptionHi: "अल्पप्राण /प/ और महाप्राण /फ/ का भेद (Unaspirated vs Aspirated Labial)",
      descriptionEn: "Distinguishing /p/ (Unaspirated) vs /pʰ/ (Aspirated)",
      pairs: [
        { word1: "पल", emoji1: "⏱️", word2: "फल", emoji2: "🍎", clue1: "समय का एक क्षण", clue2: "खाने वाला मीठा फल" },
        { word1: "पार", emoji1: "⛵", word2: "फार", emoji2: "📄", clue1: "नदी पार करना", clue2: "कागज फाड़ना" },
        { word1: "पूल", emoji1: "🏊", word2: "फूल", emoji2: "🌸", clue1: "स्विमिंग पूल", clue2: "सुगंधित फूल" }
      ]
    },
    {
      pairId: "k_t",
      targetPhonemes: "क vs त",
      descriptionHi: "कण्ठ्य /क/ की जगह दन्त्य /त/ का आना (Fronting: /k/ -> /t/)",
      descriptionEn: "Velar Fronting: /k/ replaced by Dental /t/",
      pairs: [
        { word1: "केला", emoji1: "🍌", word2: "तेला", emoji2: "🛢️", clue1: "पीला मीठा केला", clue2: "तेल वाला" },
        { word1: "कान", emoji1: "👂", word2: "तान", emoji2: "🎵", clue1: "सुनने वाला कान", clue2: "संगीत की मधुर तान" },
        { word1: "कल", emoji1: "🗓️", word2: "तल", emoji2: "🍳", clue1: "आने वाला कल", clue2: "कड़ाही का निचला तल" }
      ]
    }
  ],

  // Tongue Twisters (जीभ घुमाव अभ्यास)
  tongueTwisters: [
    {
      id: "twister_kh",
      target: "ख व ड़",
      text: "खड़क सिंह के खड़कने से खड़कती हैं खिड़कियां, खिड़कियों के खड़कने से खड़कता है खड़क सिंह!",
      translit: "Khadak Singh ke khadakne se khadakti hain khidkiyan...",
      difficulty: "मध्यम (Medium)",
      focus: "Velar Aspirate /kʰ/ & Flap /ɽ/"
    },
    {
      id: "twister_ch",
      target: "च व च",
      text: "चंदू के चाचा ने, चंदू की चाची को, चांदनी रात में, चांदी के चम्मच से चटनी चटाई!",
      translit: "Chandu ke chacha ne Chandu ki chachi ko...",
      difficulty: "सरल (Easy/Fun)",
      focus: "Palatal Affricate /t͡ʃ/"
    },
    {
      id: "twister_p_k",
      target: "प व क",
      text: "पके पेड़ पर पका पपीता, पका पेड़ या पका पपीता, पके पेड़ को पकड़े पिंकू, पिंकू पकड़े पका पपीता!",
      translit: "Pake ped par paka papeeta...",
      difficulty: "कठिन (Advanced)",
      focus: "Bilabial /p/ and Velar /k/"
    },
    {
      id: "twister_t_d",
      target: "त व ट",
      text: "तोता पेड़ पर बैठा था, तितली नीचे आई, तोते ने देखा तितली को, दोनों ने ताली बजाई!",
      translit: "Tota ped par baitha tha, titli neeche aayi...",
      difficulty: "सरल (Beginner)",
      focus: "Dental /t̪/ Rhythm"
    },
    {
      id: "twister_r_l",
      target: "र व ल",
      text: "लाल रेल चली, नीली रेल चली, राजा की रेल में रानी की रोटी मिली!",
      translit: "Laal rail chali, neeli rail chali...",
      difficulty: "लक्ष्य विशेष (/r/ vs /l/)",
      focus: "Rhotic /r/ and Lateral /l/ Alternation"
    }
  ],

  // Oral Motor & Articulatory Face Gym Exercises
  oralExercises: [
    {
      id: "gym_balloon",
      titleHi: "1. गाल फुलाना (Cheek Puff / Balloon Face)",
      titleEn: "Cheek Puff Exercise",
      target: "होंठों की ताकत और हवा का दबाव (Lip Strength & Intraoral Pressure)",
      steps: [
        "मुँह में हवा भरकर दोनों गालों को गुब्बारे की तरह फुलाएं।",
        "हवा को 5 सेकंड तक रोक कर रखें।",
        "धीरे से 'पॉप' की आवाज़ के साथ हवा बाहर छोड़ें।"
      ],
      reps: "5 बार दोहराएं",
      icon: "🎈"
    },
    {
      id: "gym_tongue_elevator",
      titleHi: "2. जीभ का लिफ्ट व्यायाम (Tongue Tip Elevation)",
      titleEn: "Tongue Tip Elevation",
      target: "मूर्धन्य (ट, ठ, ड) और कम्पन (र) ध्वनि के लिए",
      steps: [
        "मुँह खोलें और जीभ की नोक को ऊपर के दाँतों के पीछे तालु पर लगाएं।",
        "जीभ को तालु पर दबाकर 'टक' की आवाज़ निकालते हुए नीचे गिराएं (Clicking).",
        "घोड़े की चाल जैसी आवाज़ निकालें।"
      ],
      reps: "10 बार क्लिक करें",
      icon: "👅"
    },
    {
      id: "gym_lip_pout",
      titleHi: "3. 'ओ' और 'ई' का मुखाभ्यास (Lip Rounding & Smile)",
      titleEn: "Lip Retraction & Protrusion",
      target: "होंठों का लचीलापन (प, ब, श, ओ वर्ण हेतु)",
      steps: [
        "होंठों को आगे लाकर गोल करें और बोलें 'ओओओओ' (जैसे मोमबत्ती बुझा रहे हों)।",
        "फिर तुरंत चौड़ी मुस्कान बनाएं और बोलें 'ईईईई' (दांत दिखाकर)।",
        "ओ-ई-ओ-ई को बारी-बारी से करें।"
      ],
      reps: "8 बार दोहराएं",
      icon: "👄"
    },
    {
      id: "gym_straw_sip",
      titleHi: "4. कागज़ उड़ाओ फुहार (Breath Support & Blow)",
      titleEn: "Straw Blow & Paper Flutter",
      target: "महाप्राण (ख, छ, थ, फ) व संघर्षी (स, श) के लिए वायु प्रवाह",
      steps: [
        "हाथ पर एक छोटा कागज़ का टुकड़ा रखें।",
        "सीधे बैठकर गहरी सांस लें।",
        "फूंक मारकर कागज़ को दूर उड़ाएं।"
      ],
      reps: "5 बार",
      icon: "💨"
    }
  ],

  // Carrier Sentences and Mini-Stories for Generalization
  stories: [
    {
      id: "story_parrot",
      titleHi: "तोता और मीठा तरबूज (/त/ ध्वनि अभ्यास)",
      targetSound: "त",
      sentences: [
        "एक हरा **तोता** था।",
        "तोते ने मेज पर एक **ताज़ा** फल देखा।",
        "वह एक बड़ा लाल **तरबूज** था।",
        "तोते ने तरबूज को अपनी चोंच से **तोड़ा**।",
        "तोते ने खुशी से **ताली** बजाई!"
      ]
    },
    {
      id: "story_lion",
      titleHi: "राजा शेर और लाल गुलाब (/र/ व /ल/ अभ्यास)",
      targetSound: "र",
      sentences: [
        "जंगल में एक दयालु **राजा** शेर रहता था।",
        "शेर को **लाल** **गुलाब** बहुत पसंद था।",
        "एक दिन **लोमड़ी** उसके लिए सुंदर **फूल** लाई।",
        "शेर ने **रोटी** खाकर लोमड़ी को शुक्रिया कहा।",
        "दोनों मिलकर **रेलगाड़ी** की तरह दौड़े!"
      ]
    },
    {
      id: "story_apple",
      titleHi: "सोनू का सेब और साइकिल (/स/ ध्वनि अभ्यास)",
      targetSound: "स",
      sentences: [
        "**सोनू** सुबह अपनी **साइकिल** पर निकला।",
        "**सूरज** की किरणें चमक रही थीं।",
        "सोनू ने पेड़ से एक मीठा **सेब** तोड़ा।",
        "हरी **घास** पर बैठकर उसने सेब खाया।"
      ]
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = HINDI_THERAPY_DATA;
}
