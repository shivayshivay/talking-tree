<<<<<<< HEAD
// ── SPEECH ENGINE — Optimized for best browser voice quality ──
let currentUtterance = null;
let activeMsgBtn = null;
let allVoices = [];

// ── Best voice priority list per language ──
// Google voices are highest quality, then Apple, then Microsoft
const VOICE_PRIORITY = {
  'en': [
    'Google UK English Female', 'Google US English', 'Samantha',
    'Karen', 'Moira', 'Tessa', 'Microsoft Zira', 'Microsoft Hazel',
    'Google UK English Male'
  ],
  'hi': ['Google हिन्दी', 'Google Hindi', 'Lekha', 'Microsoft Hemant', 'Microsoft Kalpana'],
  'kn': ['Google ಕನ್ನಡ', 'Google Kannada'],
  'ta': ['Google தமிழ்', 'Google Tamil', 'Microsoft Valluvar'],
  'te': ['Google తెలుగు', 'Google Telugu'],
  'mr': ['Google मराठी', 'Google Marathi'],
  'bn': ['Google বাংলা', 'Google Bengali'],
  'gu': ['Google ગુજરાતી', 'Google Gujarati'],
  'ml': ['Google മലയാളം', 'Google Malayalam'],
  'pa': ['Google ਪੰਜਾਬੀ', 'Google Punjabi'],
  'fr': ['Google français', 'Thomas', 'Microsoft Julie', 'Microsoft Paul'],
  'es': ['Google español', 'Monica', 'Microsoft Helena'],
  'de': ['Google Deutsch', 'Anna', 'Microsoft Hedda'],
  'zh': ['Google 普通话（中国大陆）', 'Ting-Ting', 'Microsoft Huihui'],
  'ar': ['Google العربية', 'Maged', 'Microsoft Naayf'],
  'ja': ['Google 日本語', 'Kyoko', 'Microsoft Haruka'],
};

// ── OPTIMAL speech params per language for most natural sound ──
const LANG_PARAMS = {
  'en': { rate: 0.92, pitch: 1.0,  volume: 1.0 },
  'hi': { rate: 0.85, pitch: 0.95, volume: 1.0 },
  'kn': { rate: 0.82, pitch: 0.95, volume: 1.0 },
  'ta': { rate: 0.82, pitch: 0.95, volume: 1.0 },
  'te': { rate: 0.82, pitch: 0.95, volume: 1.0 },
  'mr': { rate: 0.85, pitch: 0.95, volume: 1.0 },
  'bn': { rate: 0.85, pitch: 1.0,  volume: 1.0 },
  'gu': { rate: 0.85, pitch: 0.95, volume: 1.0 },
  'ml': { rate: 0.80, pitch: 0.95, volume: 1.0 },
  'pa': { rate: 0.85, pitch: 1.0,  volume: 1.0 },
  'fr': { rate: 0.90, pitch: 1.0,  volume: 1.0 },
  'es': { rate: 0.90, pitch: 1.0,  volume: 1.0 },
  'de': { rate: 0.88, pitch: 0.95, volume: 1.0 },
  'zh': { rate: 0.85, pitch: 1.0,  volume: 1.0 },
  'ar': { rate: 0.82, pitch: 0.95, volume: 1.0 },
  'ja': { rate: 0.88, pitch: 1.0,  volume: 1.0 },
};

function loadVoices() {
  allVoices = window.speechSynthesis.getVoices();
  console.log('🔊 Loaded', allVoices.length, 'voices');
  // Log available Google voices for debugging
  const googleVoices = allVoices.filter(v => v.name.startsWith('Google'));
  if (googleVoices.length) console.log('✅ Google voices:', googleVoices.map(v => v.name + ' (' + v.lang + ')').join(', '));
  else console.warn('⚠️ No Google voices found. Install Google TTS on Android for better quality.');
}

function getBestVoice(langCode) {
  if (!allVoices.length) allVoices = window.speechSynthesis.getVoices();
  const preferred = VOICE_PRIORITY[langCode] || VOICE_PRIORITY['en'];

  // 1. Try exact preferred voice name match
  for (const name of preferred) {
    const v = allVoices.find(v => v.name === name);
    if (v) return v;
  }

  // 2. Try partial name match (e.g. "Google" voices)
=======
// ── ADVANCED SPEECH ENGINE (UPGRADED) ──

let currentUtterance = null;
let activeMsgBtn = null;
let allVoices = [];
let isPaused = false;

// ── VOICE PRIORITY ──
const VOICE_PRIORITY = {
  'en': ['Google UK English Female', 'Google US English', 'Samantha', 'Microsoft Zira'],
  'hi': ['Google हिन्दी', 'Microsoft Hemant'],
  'ml': ['Google Malayalam'],
};

// ── LANGUAGE PARAMS ──
const LANG_PARAMS = {
  'en': { rate: 0.92, pitch: 1.0, volume: 1.0 },
  'hi': { rate: 0.85, pitch: 0.95, volume: 1.0 },
  'ml': { rate: 0.80, pitch: 0.95, volume: 1.0 },
};

// ── LOAD VOICES ──
function loadVoices() {
  allVoices = window.speechSynthesis.getVoices();
}

// ── GET BEST VOICE ──
function getBestVoice(langCode) {
  const preferred = VOICE_PRIORITY[langCode] || VOICE_PRIORITY['en'];

>>>>>>> 0266752 (Talking Trees - Smart City AI & IoT Project)
  for (const name of preferred) {
    const v = allVoices.find(v => v.name.includes(name));
    if (v) return v;
  }

<<<<<<< HEAD
  // 3. Try any Google voice for this language
  const googleV = allVoices.find(v => v.name.startsWith('Google') && v.lang.startsWith(langCode));
  if (googleV) return googleV;

  // 4. Any voice matching the language code
  const langV = allVoices.find(v => v.lang.startsWith(langCode));
  if (langV) return langV;

  // 5. Fallback to best English voice
  return allVoices.find(v => v.name.includes('Google UK English Female'))
      || allVoices.find(v => v.lang.startsWith('en'))
      || allVoices[0];
}

// Legacy function kept for compatibility
function getVoice() {
  return getBestVoice('en');
}

function stopSpeech() {
  window.speechSynthesis.cancel();
  currentUtterance = null;
  // Fade out nature sounds too
  if (typeof stopNatureSounds === 'function' && naturePlaying) {
    stopNatureSounds();
  }
  const vb = document.getElementById('voiceBar');
  if (vb) vb.classList.remove('show');
  const te = document.getElementById('treeEmoji');
  if (te) te.classList.remove('speaking-anim');
  if (activeMsgBtn) {
    activeMsgBtn.textContent = '🔊';
    activeMsgBtn.classList.remove('active');
    activeMsgBtn = null;
  }
  document.querySelectorAll('.mood-speak-btn').forEach(b => {
    b.classList.remove('speaking');
    b.innerHTML = '🔊 Hear it speak';
  });
  document.querySelectorAll('.mood-card').forEach(c => c.classList.remove('currently-speaking'));
  const sab = document.getElementById('speakAllBtn');
  if (sab) sab.innerHTML = '🔊 Hear All Trees Talk in This Weather';
}

function speakText(text, opts = {}) {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported');
    return;
  }
  stopSpeech();

  // Clean text — remove emojis and special chars that cause robotic pauses
  const cleanText = text
    .replace(/[\u{1F300}-\u{1FFFF}]/gu, '')  // remove emoji
    .replace(/[🌳🌴🎋🌲🥭🌿🌸🌵]/g, '')
    .replace(/[•·→←↗]/g, ',')               // replace bullets with pauses
=======
  return allVoices.find(v => v.lang.startsWith(langCode))
    || allVoices.find(v => v.lang.startsWith('en'))
    || allVoices[0];
}

// ── STOP SPEECH ──
function stopSpeech() {
  speechSynthesis.cancel();
  currentUtterance = null;
  isPaused = false;

  updateVoiceUI("stopped");

  // stop nature sounds
  if (typeof stopNatureSounds === 'function' && window.naturePlaying) {
    stopNatureSounds();
  }
}

// ── PAUSE / RESUME ──
function togglePauseSpeech() {
  if (!currentUtterance) return;

  if (speechSynthesis.paused) {
    speechSynthesis.resume();
    isPaused = false;
    updateVoiceUI("playing");
  } else {
    speechSynthesis.pause();
    isPaused = true;
    updateVoiceUI("paused");
  }
}

// ── MAIN SPEAK FUNCTION ──
function speakText(text, opts = {}) {
  if (!('speechSynthesis' in window)) return;

  stopSpeech();

  const cleanText = text
    .replace(/[\u{1F300}-\u{1FFFF}]/gu, '')
>>>>>>> 0266752 (Talking Trees - Smart City AI & IoT Project)
    .replace(/\s+/g, ' ')
    .trim();

  const langCode = opts.lang || 'en';
<<<<<<< HEAD
  const params   = LANG_PARAMS[langCode] || LANG_PARAMS['en'];

  const utt    = new SpeechSynthesisUtterance(cleanText);
  utt.rate     = opts.rate   !== undefined ? opts.rate   : params.rate;
  utt.pitch    = opts.pitch  !== undefined ? opts.pitch  : params.pitch;
  utt.volume   = opts.volume !== undefined ? opts.volume : params.volume;
  utt.lang     = opts.voiceLang || 'en-US';

  const voice  = getBestVoice(langCode);
  if (voice) {
    utt.voice = voice;
    utt.lang  = voice.lang; // use exact voice lang for best pronunciation
  }

  currentUtterance = utt;
  utt.onstart = () => {
    if (opts.onstart) opts.onstart();
    // Auto-start nature sounds softly when tree speaks
    if (typeof startNatureSounds === 'function' && !naturePlaying) {
      startNatureSounds(0.35); // softer volume while speaking
    } else if (typeof setNatureVolume === 'function' && naturePlaying) {
      setNatureVolume(0.25); // duck volume while speaking
    }
  };
  utt.onend = () => {
    currentUtterance = null;
    if (opts.onend) opts.onend();
    // Raise nature volume back after speech ends
    if (typeof setNatureVolume === 'function' && naturePlaying) {
      setTimeout(() => setNatureVolume(0.6), 300);
    }
  };
  utt.onerror = (e) => {
    console.warn('Speech error:', e.error);
    currentUtterance = null;
    if (opts.onend) opts.onend();
    if (typeof setNatureVolume === 'function' && naturePlaying) {
      setTimeout(() => setNatureVolume(0.6), 300);
    }
  };

  // Small delay on mobile to prevent cut-off
  setTimeout(() => window.speechSynthesis.speak(utt), 100);
}

// ── SHOW AVAILABLE VOICES (debug helper) ──
function showAvailableVoices() {
  const voices = window.speechSynthesis.getVoices();
  console.table(voices.map(v => ({ name: v.name, lang: v.lang, local: v.localService })));
  return voices.length + ' voices available. Google voices: ' + voices.filter(v => v.name.startsWith('Google')).length;
}

// ── LOAD VOICES ──
window.speechSynthesis.onvoiceschanged = loadVoices;
setTimeout(loadVoices, 500); // fallback for browsers that don't fire onvoiceschanged
=======
  const params = LANG_PARAMS[langCode] || LANG_PARAMS['en'];

  const utt = new SpeechSynthesisUtterance(cleanText);
  utt.rate = opts.rate ?? params.rate;
  utt.pitch = opts.pitch ?? params.pitch;
  utt.volume = opts.volume ?? params.volume;

  const voice = getBestVoice(langCode);
  if (voice) {
    utt.voice = voice;
    utt.lang = voice.lang;
  }

  currentUtterance = utt;
  isPaused = false;

  utt.onstart = () => {
    updateVoiceUI("playing");

    if (typeof startNatureSounds === 'function') {
      startNatureSounds(0.3);
    }
  };

  utt.onend = () => {
    currentUtterance = null;
    isPaused = false;
    updateVoiceUI("stopped");
  };

  utt.onerror = () => {
    currentUtterance = null;
    updateVoiceUI("stopped");
  };

  setTimeout(() => speechSynthesis.speak(utt), 100);
}

// ── UI CONTROL (IMPORTANT) ──
function updateVoiceUI(state) {
  const btn = document.getElementById("voiceBtn");

  if (!btn) return;

  if (state === "playing") {
    btn.innerHTML = "⏸ Pause";
  } else if (state === "paused") {
    btn.innerHTML = "▶️ Resume";
  } else {
    btn.innerHTML = "🔊 Play";
  }
}

// ── BUTTON HANDLER ──
function handleVoiceControl() {
  if (!currentUtterance) return;

  togglePauseSpeech();
}

// ── DEBUG ──
function showAvailableVoices() {
  console.table(allVoices.map(v => ({
    name: v.name,
    lang: v.lang
  })));
}

// ── INIT ──
window.speechSynthesis.onvoiceschanged = loadVoices;
setTimeout(loadVoices, 500);
>>>>>>> 0266752 (Talking Trees - Smart City AI & IoT Project)
