/**
 * ==========================================================================
 * VAAK-MITRA (वाक-मित्र) - Core Client Controller & Audio Intelligence Engine
 * ==========================================================================
 */

// Application State
const appState = {
  currentLang: 'hi',
  currentSound: 'क',
  currentImfTab: 'initial',
  currentModule: 'position',
  audioEnabled: true,
  isRecording: false,
  totalStars: 0,
  stats: {
    totalAttempts: 0,
    correctAttempts: 0,
    incorrectAttempts: 0,
    logs: []
  },
  customWords: [
    { word: "खिलौना", translit: "Khilona", emoji: "🧸", targetSound: "ख" },
    { word: "गुड़िया", translit: "Gudiya", emoji: "🪆", targetSound: "ग" }
  ],
  game: {
    active: false,
    score: 0,
    timer: 60,
    balloons: [],
    animationId: null,
    intervalId: null
  }
};

// Audio & Speech Recognition Objects
let speechRecognition = null;
let audioContext = null;
let analyserNode = null;
let microphoneStream = null;
let animationFrameId = null;

// ==========================================================================
// Initialization on Page Load
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initBubbleBackground();
  initSoundSelector();
  initSpeechRecognition();
  loadStoredStats();
  renderCurrentSoundAnatomy();
  renderImfCards();
  renderAllFlashcards();
  renderMinimalPairs();
  renderTongueTwisters();
  renderStories();
  renderOralGym();
  renderCustomWordsList();
  updateAnalyticsDashboard();
  updateMascotGreeting("welcome");
});

// Floating Bubbles Background Generator
function initBubbleBackground() {
  const container = document.getElementById('bubbleBg');
  if (!container) return;
  const colors = ['#ff85a1', '#4ecdc4', '#ffe66d', '#64b5f6', '#a06cd5'];
  for (let i = 0; i < 16; i++) {
    const bubble = document.createElement('div');
    bubble.className = 'floating-bubble';
    const size = Math.random() * 60 + 20;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${Math.random() * 95}%`;
    bubble.style.animationDuration = `${Math.random() * 10 + 10}s`;
    bubble.style.animationDelay = `${Math.random() * 5}s`;
    bubble.style.background = colors[Math.floor(Math.random() * colors.length)];
    container.appendChild(bubble);
  }
}

// Sound Selector Pills
function initSoundSelector() {
  const container = document.getElementById('soundPillsContainer');
  if (!container) return;
  container.innerHTML = '';
  const soundKeys = Object.keys(HINDI_THERAPY_DATA.soundsData);
  soundKeys.forEach(sound => {
    const btn = document.createElement('button');
    btn.className = `sound-pill ${sound === appState.currentSound ? 'active' : ''}`;
    btn.innerText = sound;
    btn.onclick = () => selectTargetSound(sound);
    container.appendChild(btn);
  });
}

function selectTargetSound(sound) {
  appState.currentSound = sound;
  initSoundSelector();
  renderCurrentSoundAnatomy();
  renderImfCards();
  renderAllFlashcards();
  updateAsrTargetWord();
  playTargetSoundSample();
}

// Language Switcher (Hindi / English / Hinglish)
function changeLanguage(lang) {
  appState.currentLang = lang;
  const t = HINDI_THERAPY_DATA.translations[lang] || HINDI_THERAPY_DATA.translations.hi;
  
  document.getElementById('appTitle').innerText = t.appName;
  document.getElementById('appTagline').innerText = t.appTagline;
  document.getElementById('companionText').innerText = t.companionGreeting;
  document.getElementById('labelSelectSound').innerText = t.selectSound;
  
  // Re-render UI views
  renderCurrentSoundAnatomy();
  renderImfCards();
  renderAllFlashcards();
  renderMinimalPairs();
  renderOralGym();
}

// Module Navigation
function switchModule(moduleId) {
  appState.currentModule = moduleId;
  document.querySelectorAll('.therapy-section').forEach(sec => sec.classList.remove('active'));
  const activeSec = document.getElementById(`module-${moduleId}`);
  if (activeSec) activeSec.classList.add('active');

  document.querySelectorAll('.nav-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === moduleId);
  });

  if (moduleId === 'balloon-game') {
    initBalloonCanvas();
  }
  playBeepSound(400, 0.05);
}

// ==========================================================================
// 1. Articulatory Position Anatomy Renderer & SVG Visualizer
// ==========================================================================
function renderCurrentSoundAnatomy() {
  const soundData = HINDI_THERAPY_DATA.soundsData[appState.currentSound];
  if (!soundData) return;

  const currentSoundTag = document.getElementById('currentSoundTag');
  if (currentSoundTag) currentSoundTag.innerText = `लक्ष्य वर्ण: ${soundData.phoneme} (${soundData.ipa})`;

  const anatomyTitle = document.getElementById('anatomySoundName');
  if (anatomyTitle) anatomyTitle.innerText = `${soundData.manner}`;

  const tongueDesc = document.getElementById('anatomyTongueDesc');
  if (tongueDesc) tongueDesc.innerText = soundData.anatomyGuide.placement;

  const lipDesc = document.getElementById('anatomyLipsDesc');
  if (lipDesc) lipDesc.innerText = `होंठ स्थिति: ${soundData.anatomyGuide.lipPosition} | जीभ: ${soundData.anatomyGuide.tonguePosition}`;

  const cueDesc = document.getElementById('anatomyCueDesc');
  if (cueDesc) cueDesc.innerText = soundData.anatomyGuide.visualCue;

  const errDesc = document.getElementById('anatomyCommonErrors');
  if (errDesc) errDesc.innerText = soundData.commonErrors.join(' | ');

  // Update SVG Mouth Articulator
  updateMouthSvg(soundData.anatomyGuide.mouthState);
}

function updateMouthSvg(state) {
  const tongue = document.getElementById('svgTongue');
  const upperLip = document.getElementById('svgUpperLip');
  const lowerLip = document.getElementById('svgLowerLip');
  if (!tongue) return;

  if (state === 'mouth_velar') {
    // Tongue back elevated towards soft palate
    tongue.setAttribute('d', 'M 115 130 Q 140 100 165 140 Q 200 170 210 165 Q 180 190 115 180 Z');
  } else if (state === 'mouth_trill') {
    // Tongue tip flapping at alveolar ridge
    tongue.setAttribute('d', 'M 120 165 Q 160 160 195 125 Q 212 110 215 120 Q 185 180 120 175 Z');
  } else if (state === 'mouth_lateral') {
    // Tongue tip firmly up against alveolar ridge
    tongue.setAttribute('d', 'M 120 165 Q 160 155 195 118 Q 212 108 214 125 Q 180 180 120 175 Z');
  } else if (state === 'mouth_fricative_s') {
    // Narrow groove behind lower/upper teeth
    tongue.setAttribute('d', 'M 120 165 Q 160 160 190 148 Q 208 140 210 150 Q 180 180 120 175 Z');
  } else if (state === 'mouth_fricative_sh') {
    // Rounded lips, tongue flat towards hard palate
    tongue.setAttribute('d', 'M 120 160 Q 155 125 185 120 Q 205 130 205 145 Q 175 180 120 175 Z');
    if (upperLip && lowerLip) {
      upperLip.setAttribute('d', 'M 218 100 Q 255 105 235 120');
      lowerLip.setAttribute('d', 'M 218 160 Q 255 150 235 140');
    }
  } else if (state === 'mouth_dental') {
    // Tongue tip touching upper front teeth
    tongue.setAttribute('d', 'M 120 165 Q 165 155 195 130 Q 218 115 215 130 Q 180 180 120 175 Z');
  } else if (state === 'mouth_retroflex') {
    // Tongue tip curled back towards palate
    tongue.setAttribute('d', 'M 120 165 Q 155 160 170 115 Q 185 105 190 125 Q 170 180 120 175 Z');
  } else if (state === 'mouth_bilabial') {
    // Both lips pressed together
    tongue.setAttribute('d', 'M 120 165 Q 160 160 190 155 Q 205 155 205 165 Q 175 180 120 175 Z');
    if (upperLip && lowerLip) {
      upperLip.setAttribute('d', 'M 218 105 Q 240 125 225 130');
      lowerLip.setAttribute('d', 'M 218 155 Q 240 135 225 130');
    }
  }
}

// ==========================================================================
// 2. Phoneme Level (Initial, Medial, Final) Explorer
// ==========================================================================
function switchImfTab(pos) {
  appState.currentImfTab = pos;
  document.getElementById('tabBtnInitial').classList.toggle('active', pos === 'initial');
  document.getElementById('tabBtnMedial').classList.toggle('active', pos === 'medial');
  document.getElementById('tabBtnFinal').classList.toggle('active', pos === 'final');
  renderImfCards();
}

function renderImfCards() {
  const container = document.getElementById('imfCardsContainer');
  if (!container) return;
  container.innerHTML = '';

  const soundData = HINDI_THERAPY_DATA.soundsData[appState.currentSound];
  if (!soundData || !soundData.words) return;

  const words = soundData.words[appState.currentImfTab] || [];
  words.forEach(item => {
    const card = document.createElement('div');
    card.className = 'flashcard';
    card.innerHTML = `
      <div class="card-emoji">${item.emoji}</div>
      <div class="card-word">${highlightTargetChar(item.word, appState.currentSound)}</div>
      <div class="card-translit">${item.translit} (${item.meaning})</div>
      <div class="card-sentence">"${item.sentence}"</div>
      <div class="card-actions">
        <button class="btn-card-action btn-listen" onclick="speakHindi('${item.word}')">सुनिए 🔊</button>
        <button class="btn-card-action btn-speak" onclick="testSingleWord('${item.word}', '${item.translit}')">अभ्यास 🎙️</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function highlightTargetChar(word, char) {
  return word.split(char).join(`<span class="highlight-char">${char}</span>`);
}

// ==========================================================================
// 3. Picture Flashcard Deck
// ==========================================================================
function renderAllFlashcards() {
  const container = document.getElementById('allFlashcardsContainer');
  if (!container) return;
  container.innerHTML = '';

  const soundData = HINDI_THERAPY_DATA.soundsData[appState.currentSound];
  if (!soundData) return;

  const allWords = [
    ...(soundData.words.initial || []),
    ...(soundData.words.medial || []),
    ...(soundData.words.final || [])
  ];

  allWords.forEach(item => {
    const card = document.createElement('div');
    card.className = 'flashcard';
    card.innerHTML = `
      <div class="card-emoji">${item.emoji}</div>
      <div class="card-word">${item.word}</div>
      <div class="card-translit">${item.translit}</div>
      <div class="card-sentence">"${item.sentence}"</div>
      <div class="card-actions">
        <button class="btn-card-action btn-listen" onclick="speakHindi('${item.word}')">🔊 बोलें</button>
        <button class="btn-card-action btn-speak" onclick="testSingleWord('${item.word}', '${item.translit}')">🎙️ टेस्ट</button>
      </div>
    `;
    container.appendChild(card);
  });
}

// ==========================================================================
// 4. Live Voice ASR & Phonetic Pronunciation Scorer
// ==========================================================================
let currentAsrTarget = { word: "केला", translit: "Kela" };

function updateAsrTargetWord() {
  const soundData = HINDI_THERAPY_DATA.soundsData[appState.currentSound];
  if (soundData && soundData.words.initial && soundData.words.initial.length > 0) {
    const target = soundData.words.initial[0];
    currentAsrTarget = { word: target.word, translit: target.translit };
    document.getElementById('asrTargetWordDisplay').innerText = target.word;
    document.getElementById('asrTargetTranslit').innerText = `(${target.translit} - ${target.meaning} ${target.emoji})`;
  }
}

function testSingleWord(word, translit) {
  currentAsrTarget = { word, translit };
  switchModule('asr');
  document.getElementById('asrTargetWordDisplay').innerText = word;
  document.getElementById('asrTargetTranslit').innerText = `(${translit})`;
  speakHindi(word);
}

function initSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    console.warn("SpeechRecognition not supported in this browser. Fallback phonetic mode enabled.");
    return;
  }
  speechRecognition = new SpeechRecognition();
  speechRecognition.continuous = false;
  speechRecognition.interimResults = false;
  speechRecognition.lang = 'hi-IN';

  speechRecognition.onstart = () => {
    appState.isRecording = true;
    const btn = document.getElementById('btnRecordAsr');
    if (btn) btn.classList.add('recording');
    document.getElementById('asrStatusText').innerText = "सुन रहा हूँ... अब बोलिए! 🎙️";
    startAudioVisualizer();
  };

  speechRecognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.trim();
    evaluateSpokenWord(transcript);
  };

  speechRecognition.onerror = (event) => {
    console.error("ASR Error:", event.error);
    stopRecordingUi();
    document.getElementById('asrStatusText').innerText = `त्रुटि: ${event.error}. फिर से कोशिश करें।`;
  };

  speechRecognition.onend = () => {
    stopRecordingUi();
  };
}

function toggleVoiceRecording() {
  if (!speechRecognition) {
    // Simulated speech evaluation for environments without web speech API
    simulateVoiceTest();
    return;
  }

  if (appState.isRecording) {
    speechRecognition.stop();
  } else {
    try {
      speechRecognition.start();
    } catch (e) {
      speechRecognition.stop();
    }
  }
}

function stopRecordingUi() {
  appState.isRecording = false;
  const btn = document.getElementById('btnRecordAsr');
  if (btn) btn.classList.remove('recording');
  stopAudioVisualizer();
}

function evaluateSpokenWord(spokenText) {
  const targetText = currentAsrTarget.word.trim();
  document.getElementById('recognizedSpeechText').innerText = spokenText;

  // Calculate Phonetic Similarity & S.O.D.A Classification
  const scoreResult = calculateHindiPhoneticScore(spokenText, targetText, appState.currentSound);
  
  displayScoreResults(scoreResult);
  logSessionAttempt(targetText, spokenText, scoreResult.score, scoreResult.isCorrect);

  if (scoreResult.score >= 80) {
    triggerCelebration();
    playSuccessSound();
    addStars(3);
  } else if (scoreResult.score >= 50) {
    playBeepSound(500, 0.15);
    addStars(1);
  } else {
    playBeepSound(250, 0.25);
  }
}

function simulateVoiceTest() {
  // Graceful test simulation if mic is unavailable
  const samples = [currentAsrTarget.word, currentAsrTarget.word.replace('क', 'त').replace('र', 'ल')];
  const chosen = samples[Math.floor(Math.random() * samples.length)];
  evaluateSpokenWord(chosen);
}

function calculateHindiPhoneticScore(spoken, target, targetSound) {
  const cleanSpoken = spoken.trim();
  const cleanTarget = target.trim();

  // Exact Match
  if (cleanSpoken === cleanTarget) {
    return { score: 100, isCorrect: true, category: 'सटीक (Accurate)', message: 'शाबाश! बिल्कुल सही उच्चारण! ⭐⭐⭐' };
  }

  // Levenshtein Similarity on Devanagari Unicode
  const dist = levenshteinDistance(cleanSpoken, cleanTarget);
  const maxLen = Math.max(cleanSpoken.length, cleanTarget.length);
  let score = Math.max(0, Math.round((1 - dist / maxLen) * 100));

  // Detect Substitution (e.g. /r/ -> /l/ or /k/ -> /t/)
  let category = 'विकृति (Distortion)';
  if (targetSound === 'र' && cleanSpoken.includes('ल')) {
    category = 'प्रतिस्थापन (Substitution: र -> ल)';
    score = Math.min(score, 60);
  } else if (targetSound === 'स' && cleanSpoken.includes('श')) {
    category = 'प्रतिस्थापन (Substitution: स -> श)';
    score = Math.min(score, 65);
  } else if (targetSound === 'क' && cleanSpoken.includes('त')) {
    category = 'प्रतिस्थापन (Substitution: क -> त)';
    score = Math.min(score, 55);
  } else if (cleanSpoken.length < cleanTarget.length) {
    category = 'लोप (Omission)';
  }

  const isCorrect = score >= 75;
  const message = isCorrect 
    ? 'बहुत अच्छा प्रयास! बहुत साफ आवाज़! ⭐⭐⭐' 
    : (score >= 50 ? 'अच्छा प्रयास! थोड़ा और सुधार करें! ⭐⭐' : 'फिर से कोशिश करें! बोलू आपके साथ है! ⭐');

  return { score, isCorrect, category, message };
}

function levenshteinDistance(a, b) {
  const matrix = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }
  return matrix[a.length][b.length];
}

function displayScoreResults(res) {
  const gauge = document.getElementById('scoreGauge');
  const scoreVal = document.getElementById('scoreValue');
  const stars = document.getElementById('scoreStars');
  const feedback = document.getElementById('scoreFeedbackText');
  const classification = document.getElementById('errorClassificationText');

  if (gauge) gauge.style.setProperty('--score-deg', `${res.score * 3.6}deg`);
  if (scoreVal) scoreVal.innerText = `${res.score}%`;
  if (classification) classification.innerText = res.category;
  if (feedback) feedback.innerText = res.message;

  if (stars) {
    if (res.score >= 80) stars.innerText = '⭐⭐⭐';
    else if (res.score >= 50) stars.innerText = '⭐⭐';
    else stars.innerText = '⭐';
  }
}

// Real-time Audio Visualizer
function startAudioVisualizer() {
  const canvas = document.getElementById('speechWaveCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
    microphoneStream = stream;
    const source = audioContext.createMediaStreamSource(stream);
    analyserNode = audioContext.createAnalyser();
    analyserNode.fftSize = 256;
    source.connect(analyserNode);

    const bufferLength = analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    function drawWave() {
      animationFrameId = requestAnimationFrame(drawWave);
      analyserNode.getByteTimeDomainData(dataArray);

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#4ecdc4';
      ctx.beginPath();

      const sliceWidth = canvas.width * 1.0 / bufferLength;
      let x = 0;
      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = v * canvas.height / 2;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        x += sliceWidth;
      }
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    }
    drawWave();
  }).catch(err => {
    console.log("Mic visualizer fallback:", err);
  });
}

function stopAudioVisualizer() {
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  if (microphoneStream) {
    microphoneStream.getTracks().forEach(track => track.stop());
  }
}

// ==========================================================================
// 5. Minimal Pairs Discrimination Challenge
// ==========================================================================
function renderMinimalPairs() {
  const container = document.getElementById('minimalPairsContainer');
  if (!container) return;
  container.innerHTML = '';

  HINDI_THERAPY_DATA.minimalPairs.forEach(pairGroup => {
    const card = document.createElement('div');
    card.className = 'pair-card';
    
    let pairsHtml = '';
    pairGroup.pairs.forEach(p => {
      pairsHtml += `
        <div class="pair-versus">
          <div class="pair-item" onclick="speakHindi('${p.word1}')">
            <div style="font-size: 2.5rem;">${p.emoji1}</div>
            <strong style="font-size: 1.4rem; color: #1e293b;">${p.word1}</strong>
            <p style="font-size: 0.85rem; color: var(--text-muted);">${p.clue1}</p>
          </div>
          <div style="font-weight: 900; font-size: 1.3rem; color: #ff6b6b;">VS</div>
          <div class="pair-item" onclick="speakHindi('${p.word2}')">
            <div style="font-size: 2.5rem;">${p.emoji2}</div>
            <strong style="font-size: 1.4rem; color: #1e293b;">${p.word2}</strong>
            <p style="font-size: 0.85rem; color: var(--text-muted);">${p.clue2}</p>
          </div>
        </div>
      `;
    });

    card.innerHTML = `
      <h3 style="color: #4338ca; margin-bottom: 6px;">${pairGroup.targetPhonemes}</h3>
      <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 12px;">${pairGroup.descriptionHi}</p>
      ${pairsHtml}
    `;
    container.appendChild(card);
  });
}

// ==========================================================================
// 6. Bubbly Balloon Pop Articulation Game
// ==========================================================================
function initBalloonCanvas() {
  const canvas = document.getElementById('balloonCanvas');
  if (!canvas) return;
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight;
}

function startBalloonGame() {
  appState.game.active = true;
  appState.game.score = 0;
  appState.game.timer = 60;
  appState.game.balloons = [];
  document.getElementById('gameScoreDisplay').innerText = '0';
  document.getElementById('btnStartGame').innerText = '🔄 खेल पुनः शुरू करें';

  const canvas = document.getElementById('balloonCanvas');
  const ctx = canvas.getContext('2d');

  if (appState.game.intervalId) clearInterval(appState.game.intervalId);
  appState.game.intervalId = setInterval(() => {
    appState.game.timer--;
    document.getElementById('gameTimerDisplay').innerText = `${appState.game.timer}s`;
    if (appState.game.timer <= 0) {
      endBalloonGame();
    }
  }, 1000);

  // Spawn balloons
  const soundData = HINDI_THERAPY_DATA.soundsData[appState.currentSound];
  const wordList = soundData ? (soundData.words.initial || []) : [];

  function spawnBalloon() {
    if (!appState.game.active) return;
    const wordObj = wordList[Math.floor(Math.random() * wordList.length)] || { word: "तारा", emoji: "⭐" };
    const colors = ['#ff6b6b', '#4ecdc4', '#ffd166', '#a06cd5', '#ff85a1'];
    appState.game.balloons.push({
      x: Math.random() * (canvas.width - 100) + 50,
      y: canvas.height + 40,
      radius: 40,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 1.5 + 1.2,
      word: wordObj.word,
      emoji: wordObj.emoji
    });
    if (appState.game.active) setTimeout(spawnBalloon, 1800);
  }
  spawnBalloon();

  // Pick target word
  if (wordList.length > 0) {
    document.getElementById('gameTargetWord').innerText = wordList[0].word;
  }

  function gameLoop() {
    if (!appState.game.active) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = appState.game.balloons.length - 1; i >= 0; i--) {
      const b = appState.game.balloons[i];
      b.y -= b.speed;

      // Draw Balloon Body
      ctx.beginPath();
      ctx.ellipse(b.x, b.y, b.radius, b.radius * 1.2, 0, 0, Math.PI * 2);
      ctx.fillStyle = b.color;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();

      // String
      ctx.beginPath();
      ctx.moveTo(b.x, b.y + b.radius * 1.2);
      ctx.lineTo(b.x, b.y + b.radius * 1.2 + 25);
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();

      // Text / Word
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px Nunito';
      ctx.textAlign = 'center';
      ctx.fillText(b.word, b.x, b.y + 5);

      if (b.y < -60) {
        appState.game.balloons.splice(i, 1);
      }
    }
    appState.game.animationId = requestAnimationFrame(gameLoop);
  }
  gameLoop();

  // Canvas Click to Pop
  canvas.onclick = (e) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    for (let i = appState.game.balloons.length - 1; i >= 0; i--) {
      const b = appState.game.balloons[i];
      const dist = Math.hypot(clickX - b.x, clickY - b.y);
      if (dist < b.radius * 1.2) {
        // Pop!
        speakHindi(b.word);
        appState.game.score += 10;
        document.getElementById('gameScoreDisplay').innerText = appState.game.score;
        playPopSound();
        triggerCelebrationAt(e.clientX, e.clientY);
        appState.game.balloons.splice(i, 1);
        addStars(1);
        break;
      }
    }
  };
}

function endBalloonGame() {
  appState.game.active = false;
  clearInterval(appState.game.intervalId);
  cancelAnimationFrame(appState.game.animationId);
  alert(`खेल समाप्त! आपका कुल स्कोर है: ${appState.game.score} अंक! 🎈🎉`);
}

// ==========================================================================
// 7. Tongue Twisters & Alliteration Drills
// ==========================================================================
function renderTongueTwisters() {
  const container = document.getElementById('twistersContainer');
  if (!container) return;
  container.innerHTML = '';

  HINDI_THERAPY_DATA.tongueTwisters.forEach(item => {
    const card = document.createElement('div');
    card.className = 'twister-card';
    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span class="section-tag">${item.difficulty} | ध्वनि: ${item.target}</span>
        <button class="btn-card-action btn-listen" onclick="speakHindi('${item.text}')">धीमी गति में सुनें 🔊</button>
      </div>
      <div class="twister-text">"${item.text}"</div>
      <p style="color: var(--text-muted); font-size: 0.95rem;">${item.translit}</p>
      <div style="margin-top: 10px;">
        <button class="btn-bubbly" onclick="testSingleWord('${item.target}', 'Twister Practice')">🎙️ बोलकर अभ्यास करें</button>
      </div>
    `;
    container.appendChild(card);
  });
}

// ==========================================================================
// 8. Sentence & Story Level Generalization
// ==========================================================================
function renderStories() {
  const container = document.getElementById('storiesContainer');
  if (!container) return;
  container.innerHTML = '';

  HINDI_THERAPY_DATA.stories.forEach(story => {
    const card = document.createElement('div');
    card.className = 'twister-card';
    card.style.background = 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)';
    card.style.borderColor = '#86efac';

    let sentencesHtml = '';
    story.sentences.forEach(s => {
      sentencesHtml += `
        <div style="display: flex; justify-content: space-between; align-items: center; background: white; padding: 10px 16px; border-radius: 14px; margin-bottom: 8px;">
          <span style="font-size: 1.1rem;">${s.replace(/\*\*(.*?)\*\*/g, '<strong style="color: #059669;">$1</strong>')}</span>
          <button class="btn-card-action btn-listen" onclick="speakHindi('${s.replace(/\*\*/g, '')}')">🔊</button>
        </div>
      `;
    });

    card.innerHTML = `
      <h3 style="color: #065f46; margin-bottom: 12px;">📖 ${story.titleHi}</h3>
      ${sentencesHtml}
    `;
    container.appendChild(card);
  });
}

// ==========================================================================
// 9. AI Speech Therapist "Dr. Bol" (Local Clinical Knowledge + Backend Proxy)
// ==========================================================================
function handleChatKey(e) {
  if (e.key === 'Enter') sendAiMessage();
}

async function sendAiMessage() {
  const input = document.getElementById('aiChatInput');
  const query = input.value.trim();
  if (!query) return;

  const messagesContainer = document.getElementById('chatMessagesContainer');
  
  // Append User Bubble
  const userBubble = document.createElement('div');
  userBubble.className = 'chat-bubble user';
  userBubble.innerText = query;
  messagesContainer.appendChild(userBubble);
  input.value = '';
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  // Append Loading Bot Bubble
  const botBubble = document.createElement('div');
  botBubble.className = 'chat-bubble bot';
  botBubble.innerHTML = '<em>बोल मित्र सोच रहा है... 🤔</em>';
  messagesContainer.appendChild(botBubble);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  try {
    // Attempt backend API call
    const res = await fetch('/api/ai-therapist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, currentSound: appState.currentSound, language: appState.currentLang })
    });
    if (res.ok) {
      const data = await res.json();
      botBubble.innerHTML = data.replyHtml || data.reply;
      speakHindi(data.speechSummary || "नमस्ते दोस्त!");
      return;
    }
  } catch (err) {
    console.log("Backend offline, utilizing built-in Clinical SLP Knowledge Engine");
  }

  // Built-in Pediatric Speech Therapy SLP Knowledge Engine
  setTimeout(() => {
    const reply = generateLocalSlpResponse(query);
    botBubble.innerHTML = reply;
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }, 700);
}

function generateLocalSlpResponse(query) {
  const q = query.toLowerCase();
  if (q.includes('र') || q.includes('ल') || q.includes('rotacism')) {
    return `
      <strong>💡 Dr. Bol की थेरेपी सलाह (/र/ ध्वनि सुधार):</strong><br>
      1. <strong>जीभ का कम्पन व्यायाम:</strong> बच्चे को 'मोटरसाइकिल की आवाज' (र्र्र्र्र्र) निकालने को कहें।<br>
      2. <strong>तारा vs ताला अभ्यास:</strong> समान युग्म शब्दों में अंतर समझाएं।<br>
      3. <strong>जीभ की स्थिति:</strong> जीभ की नोक को ऊपर के मसूड़े के पास रखें, चिपकाएं नहीं।
    `;
  } else if (q.includes('स') || q.includes('श') || q.includes('lisp')) {
    return `
      <strong>💡 Dr. Bol की थेरेपी सलाह (/स/ व /श/ भेद):</strong><br>
      1. <strong>/स/ के लिए:</strong> दाँत बंद रखें, जीभ नीचे और सीटी जैसी ठंडी हवा निकालें ('सांप की फुंकार')।<br>
      2. <strong>/श/ के लिए:</strong> होंठ थोड़े गोल करें और 'चुप' करने वाली गर्म हवा छोड़ें ('श्श्श्श')।
    `;
  } else if (q.includes('क') || q.includes('त') || q.includes('fronting')) {
    return `
      <strong>💡 Dr. Bol की थेरेपी सलाह (Fronting /क/ -> /त/):</strong><br>
      1. बच्चे की जीभ की नोक को नीचे की ओर रखें और गले के पीछे से 'क' की आवाज निकालने का इशारा करें।<br>
      2. गले पर हाथ रखकर हल्के कंपन को महसूस कराएं।
    `;
  } else {
    return `
      <strong>💡 Dr. Bol के सामान्य सुझाव:</strong><br>
      - बच्चे को रोज 15 मिनट <em>'ध्वनि स्थान'</em> और <em>'चित्र कार्ड'</em> का अभ्यास कराएं।<br>
      - 'गुब्बारा फोड़ो खेल' से बच्चे का उत्साह बढ़ाएं!<br>
      - किसी भी विशेष ध्वनि (जैसे र, ल, क, स, त) के बारे में पूछने के लिए वर्ण का नाम लिखें।
    `;
  }
}

// ==========================================================================
// 10. Clinician & Parent Analytics Dashboard
// ==========================================================================
function logSessionAttempt(targetWord, spokenWord, score, isCorrect) {
  appState.stats.totalAttempts++;
  if (isCorrect) appState.stats.correctAttempts++;
  else appState.stats.incorrectAttempts++;

  const timeStr = new Date().toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' });
  appState.stats.logs.unshift({
    time: timeStr,
    target: targetWord,
    spoken: spokenWord,
    score: `${score}%`,
    status: isCorrect ? 'सही ✅' : 'सुधार की आवश्यकता ❌'
  });

  saveStoredStats();
  updateAnalyticsDashboard();
}

function updateAnalyticsDashboard() {
  document.getElementById('statTotalWords').innerText = appState.stats.totalAttempts;
  document.getElementById('statCorrectWords').innerText = appState.stats.correctAttempts;
  document.getElementById('statIncorrectWords').innerText = appState.stats.incorrectAttempts;

  const rate = appState.stats.totalAttempts > 0 
    ? Math.round((appState.stats.correctAttempts / appState.stats.totalAttempts) * 100)
    : 0;
  document.getElementById('statAccuracyRate').innerText = `${rate}%`;

  const tbody = document.getElementById('sessionHistoryBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  appState.stats.logs.slice(0, 8).forEach(log => {
    const row = document.createElement('tr');
    row.style.borderBottom = '1px solid #e2e8f0';
    row.innerHTML = `
      <td style="padding: 8px;">${log.time}</td>
      <td style="padding: 8px; font-weight: bold;">${log.target}</td>
      <td style="padding: 8px;">${log.spoken}</td>
      <td style="padding: 8px;">${log.score}</td>
      <td style="padding: 8px;">${log.status}</td>
    `;
    tbody.appendChild(row);
  });
}

function exportClinicalReport() {
  window.print();
}

function loadStoredStats() {
  try {
    const saved = localStorage.getItem('vaak_mitra_stats');
    if (saved) appState.stats = JSON.parse(saved);
    const stars = localStorage.getItem('vaak_mitra_stars');
    if (stars) {
      appState.totalStars = parseInt(stars);
      document.getElementById('totalStarsCount').innerText = appState.totalStars;
    }
  } catch (e) {
    console.log("LocalStorage not active");
  }
}

function saveStoredStats() {
  try {
    localStorage.setItem('vaak_mitra_stats', JSON.stringify(appState.stats));
    localStorage.setItem('vaak_mitra_stars', appState.totalStars.toString());
  } catch (e) {}
}

function addStars(num) {
  appState.totalStars += num;
  const el = document.getElementById('totalStarsCount');
  if (el) el.innerText = appState.totalStars;
  saveStoredStats();
}

// ==========================================================================
// 11. Custom Therapy Session Builder
// ==========================================================================
function renderCustomWordsList() {
  const container = document.getElementById('customWordsList');
  if (!container) return;
  container.innerHTML = '';

  appState.customWords.forEach((item, index) => {
    const li = document.createElement('li');
    li.style.cssText = 'display: flex; justify-content: space-between; align-items: center; background: #f8fafc; padding: 10px 14px; border-radius: 14px; border: 1px solid #e2e8f0;';
    li.innerHTML = `
      <div>
        <span style="font-size: 1.4rem;">${item.emoji}</span>
        <strong style="font-size: 1.1rem; margin-left: 8px;">${item.word}</strong>
        <span style="color: var(--text-muted); font-size: 0.9rem;">(${item.translit})</span>
      </div>
      <div>
        <button class="btn-card-action btn-speak" onclick="testSingleWord('${item.word}', '${item.translit}')">अभ्यास 🎙️</button>
      </div>
    `;
    container.appendChild(li);
  });
}

function addCustomWord() {
  const wordInp = document.getElementById('customWordInput');
  const translitInp = document.getElementById('customTranslitInput');
  const emojiInp = document.getElementById('customEmojiInput');

  const word = wordInp.value.trim();
  if (!word) return;

  appState.customWords.push({
    word: word,
    translit: translitInp.value.trim() || word,
    emoji: emojiInp.value.trim() || '🌟'
  });

  wordInp.value = '';
  translitInp.value = '';
  emojiInp.value = '';

  renderCustomWordsList();
}

// ==========================================================================
// 12. Oral Motor Face Gym
// ==========================================================================
function renderOralGym() {
  const container = document.getElementById('oralGymContainer');
  if (!container) return;
  container.innerHTML = '';

  HINDI_THERAPY_DATA.oralExercises.forEach(item => {
    const card = document.createElement('div');
    card.className = 'gym-card';
    
    let stepsHtml = item.steps.map(s => `<li style="margin-bottom: 6px;">${s}</li>`).join('');

    card.innerHTML = `
      <div>
        <div class="gym-icon">${item.icon}</div>
        <h3 style="color: #c2410c; margin-bottom: 6px;">${item.titleHi}</h3>
        <p style="color: #9a3412; font-weight: 700; font-size: 0.95rem; margin-bottom: 12px;">🎯 ${item.target}</p>
        <ol style="padding-left: 20px; font-size: 0.95rem; color: #431407; line-height: 1.4;">
          ${stepsHtml}
        </ol>
      </div>
      <div style="margin-top: 14px; display: flex; justify-content: space-between; align-items: center;">
        <span class="section-tag">${item.reps}</span>
        <button class="btn-bubbly" onclick="triggerGymCelebration()">पूरा हुआ! 🌟</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function triggerGymCelebration() {
  playSuccessSound();
  triggerCelebration();
  addStars(2);
  alert("शाबाश! आपने यह व्यायाम पूरा किया! ⭐⭐");
}

// ==========================================================================
// Audio Synthesis & Confetti Helpers
// ==========================================================================
function speakHindi(text) {
  if (!appState.audioEnabled || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'hi-IN';
  utterance.rate = 0.85; // slightly slower for pediatric clarity
  utterance.pitch = 1.1; // cheerful higher pitch
  window.speechSynthesis.speak(utterance);
}

function playTargetSoundSample() {
  speakHindi(appState.currentSound);
}

function toggleAudio() {
  appState.audioEnabled = !appState.audioEnabled;
  const btn = document.getElementById('soundToggleBtn');
  if (btn) btn.innerText = appState.audioEnabled ? '🔊' : '🔇';
}

function playBeepSound(freq, duration) {
  if (!appState.audioEnabled) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {}
}

function playPopSound() {
  playBeepSound(600, 0.08);
}

function playSuccessSound() {
  playBeepSound(523.25, 0.1);
  setTimeout(() => playBeepSound(659.25, 0.1), 100);
  setTimeout(() => playBeepSound(783.99, 0.2), 200);
}

function triggerCelebration() {
  if (typeof confetti === 'function') {
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
  }
}

function triggerCelebrationAt(x, y) {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { x: x / window.innerWidth, y: y / window.innerHeight }
    });
  }
}

function updateMascotGreeting(type) {
  const el = document.getElementById('companionText');
  if (!el) return;
  if (type === 'welcome') {
    el.innerText = HINDI_THERAPY_DATA.translations[appState.currentLang].companionGreeting;
  }
}
