// ── LANGUAGE MODULE ──
let currentLang = 'en';

const LANGUAGES = [
  { code:'en',    name:'English',    native:'English',   flag:'🇬🇧', voiceLang:'en-US'  },
  { code:'hi',    name:'Hindi',      native:'हिंदी',      flag:'🇮🇳', voiceLang:'hi-IN'  },
  { code:'kn',    name:'Kannada',    native:'ಕನ್ನಡ',      flag:'🇮🇳', voiceLang:'kn-IN'  },
  { code:'ta',    name:'Tamil',      native:'தமிழ்',       flag:'🇮🇳', voiceLang:'ta-IN'  },
  { code:'te',    name:'Telugu',     native:'తెలుగు',      flag:'🇮🇳', voiceLang:'te-IN'  },
  { code:'mr',    name:'Marathi',    native:'मराठी',       flag:'🇮🇳', voiceLang:'mr-IN'  },
  { code:'bn',    name:'Bengali',    native:'বাংলা',       flag:'🇮🇳', voiceLang:'bn-IN'  },
  { code:'gu',    name:'Gujarati',   native:'ગુજરાતી',     flag:'🇮🇳', voiceLang:'gu-IN'  },
  { code:'ml',    name:'Malayalam',  native:'മലയാളം',      flag:'🇮🇳', voiceLang:'ml-IN'  },
  { code:'pa',    name:'Punjabi',    native:'ਪੰਜਾਬੀ',      flag:'🇮🇳', voiceLang:'pa-IN'  },
  { code:'fr',    name:'French',     native:'Français',   flag:'🇫🇷', voiceLang:'fr-FR'  },
  { code:'es',    name:'Spanish',    native:'Español',    flag:'🇪🇸', voiceLang:'es-ES'  },
  { code:'de',    name:'German',     native:'Deutsch',    flag:'🇩🇪', voiceLang:'de-DE'  },
  { code:'zh',    name:'Chinese',    native:'中文',        flag:'🇨🇳', voiceLang:'zh-CN'  },
  { code:'ar',    name:'Arabic',     native:'العربية',     flag:'🇸🇦', voiceLang:'ar-SA'  },
  { code:'ja',    name:'Japanese',   native:'日本語',       flag:'🇯🇵', voiceLang:'ja-JP'  },
];

// Tree info translations for Indian languages
const TREE_TRANSLATIONS = {
  hi: {
    greeting: (t) => `नमस्ते! मैं ${t.name} हूँ, जो ${t.location} में स्थित हूँ। मेरी वैज्ञानिक प्रजाति ${t.species} है। मेरी उम्र ${t.age} है। मेरे आसपास का तापमान ${t.temp} डिग्री है, मिट्टी की नमी ${t.moist} प्रतिशत है। मैं हर साल ${t.co2} कार्बन डाइऑक्साइड अवशोषित करता हूँ। मुझे स्कैन करने के लिए धन्यवाद!`,
    healthy: 'स्वस्थ', moderate: 'मध्यम', stressed: 'तनावग्रस्त',
    temp: 'तापमान', moisture: 'मिट्टी नमी', aqi: 'वायु गुणवत्ता', age: 'आयु', co2: 'CO₂ अवशोषण'
  },
  kn: {
    greeting: (t) => `ನಮಸ್ಕಾರ! ನಾನು ${t.name}, ${t.location} ನಲ್ಲಿ ಇದ್ದೇನೆ. ನನ್ನ ವೈಜ್ಞಾನಿಕ ಹೆಸರು ${t.species}. ನನ್ನ ವಯಸ್ಸು ${t.age}. ನನ್ನ ಸುತ್ತಲಿನ ತಾಪಮಾನ ${t.temp} ಡಿಗ್ರಿ, ಮಣ್ಣಿನ ತೇವಾಂಶ ${t.moist} ಶೇಕಡಾ. ನಾನು ಪ್ರತಿ ವರ್ಷ ${t.co2} ಕಾರ್ಬನ್ ಡೈಆಕ್ಸೈಡ್ ಹೀರಿಕೊಳ್ಳುತ್ತೇನೆ. ಸ್ಕ್ಯಾನ್ ಮಾಡಿದ್ದಕ್ಕೆ ಧನ್ಯವಾದ!`,
    healthy: 'ಆರೋಗ್ಯಕರ', moderate: 'ಮಧ್ಯಮ', stressed: 'ಒತ್ತಡದಲ್ಲಿದೆ',
    temp: 'ತಾಪಮಾನ', moisture: 'ಮಣ್ಣಿನ ತೇವಾಂಶ', aqi: 'ಗಾಳಿ ಗುಣಮಟ್ಟ', age: 'ವಯಸ್ಸು', co2: 'CO₂ ಹೀರಿಕೆ'
  },
  ta: {
    greeting: (t) => `வணக்கம்! நான் ${t.name}, ${t.location} இல் உள்ளேன். என் அறிவியல் பெயர் ${t.species}. என் வயது ${t.age}. என்னைச் சுற்றியுள்ள வெப்பநிலை ${t.temp} டிகிரி, மண் ஈரப்பதம் ${t.moist} சதவீதம். நான் ஆண்டுதோறும் ${t.co2} கார்பன் டை ஆக்சைடு உறிஞ்சுகிறேன். என்னை ஸ்கேன் செய்ததற்கு நன்றி!`,
    healthy: 'ஆரோக்கியமான', moderate: 'மிதமான', stressed: 'மன அழுத்தம்',
    temp: 'வெப்பநிலை', moisture: 'மண் ஈரப்பதம்', aqi: 'காற்று தரம்', age: 'வயது', co2: 'CO₂ உறிஞ்சல்'
  },
  te: {
    greeting: (t) => `నమస్కారం! నేను ${t.name}, ${t.location} లో ఉన్నాను. నా శాస్త్రీయ పేరు ${t.species}. నా వయసు ${t.age}. నా చుట్టూ ఉన్న ఉష్ణోగ్రత ${t.temp} డిగ్రీలు, మట్టి తేమ ${t.moist} శాతం. నేను ప్రతి సంవత్సరం ${t.co2} కార్బన్ డయాక్సైడ్‌ ని శోషిస్తాను. స్కాన్ చేసినందుకు ధన్యవాదాలు!`,
    healthy: 'ఆరోగ్యకరమైన', moderate: 'మధ్యస్థ', stressed: 'ఒత్తిడిలో',
    temp: 'ఉష్ణోగ్రత', moisture: 'మట్టి తేమ', aqi: 'వాయు నాణ్యత', age: 'వయసు', co2: 'CO₂ శోషణ'
  },
};

function buildLangGrid() {
  const grid = document.getElementById('langGrid');
  if (!grid) return;
  grid.innerHTML = '';
  LANGUAGES.forEach(lang => {
    const btn = document.createElement('button');
    btn.className = 'lang-btn' + (lang.code === currentLang ? ' active' : '');
    btn.innerHTML = `<span class="lang-flag">${lang.flag}</span><span class="lang-native">${lang.native}</span>`;
    btn.title = lang.name;
    btn.onclick = () => switchLanguage(lang.code, btn);
    grid.appendChild(btn);
  });
}

function switchLanguage(code, btn) {
  currentLang = code;
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const tree = window._currentQRTree;
  if (!tree) return;

  stopSpeech();

  // Re-speak in selected language
  const lang = LANGUAGES.find(l => l.code === code);
  if (!lang) return;

  let text = '';
  const trans = TREE_TRANSLATIONS[code];
  if (trans) {
    text = trans.greeting(tree);
  } else {
    // For non-Indian languages use Google Translate TTS via browser
    text = `Hello! I am the ${tree.name}, located at ${tree.location}. 
      Scientific name: ${tree.species}. Age: ${tree.age}. 
      Temperature: ${tree.temp} degrees. Soil moisture: ${tree.moist} percent. 
      I absorb ${tree.co2} of carbon dioxide every year. Thank you for scanning me!`;
  }

  const btn2 = document.getElementById('qrSpeakBtn');
  if (btn2) { btn2.innerHTML = '⏹ Stop'; }

  // Get voice for this language
  const voice  = getBestVoice(code);
  const params = LANG_PARAMS[code] || LANG_PARAMS['en'];

  const utt   = new SpeechSynthesisUtterance(text);
  utt.lang    = lang.voiceLang;
  utt.rate    = params.rate;
  utt.pitch   = params.pitch;
  utt.volume  = params.volume || 1.0;
  if (voice) { utt.voice = voice; utt.lang = voice.lang; }
  utt.onend   = () => { if (btn2) btn2.innerHTML = '🔊 Hear this tree speak'; };
  currentUtterance = utt;
  window.speechSynthesis.cancel();
  setTimeout(() => window.speechSynthesis.speak(utt), 100);

  // Show language toast
  showLangToast(lang);
}

function showLangToast(lang) {
  const existing = document.getElementById('langToast');
  if (existing) existing.remove();
  const t = document.createElement('div');
  t.id = 'langToast';
  t.style.cssText = `position:fixed;bottom:24px;left:50%;transform:translateX(-50%);
    background:#2e7d32;color:#c8e6c9;padding:10px 20px;border-radius:20px;
    font-family:'DM Sans',sans-serif;font-size:13px;z-index:999;
    box-shadow:0 4px 20px rgba(0,0,0,0.4);animation:fadeIn 0.3s ease`;
  t.textContent = `${lang.flag} Speaking in ${lang.name} (${lang.native})`;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}
