// ── WEATHER MOOD MODULE ──
let weatherData = null;
let moodList    = [];
let speakAllIdx = 0;

const WEATHER_CONDITIONS = [
  { icon: '☀️',  temp: 30, cond: 'Sunny & Clear',   humid: '55%', wind: '8 km/h',  aqi: 'AQI 42' },
  { icon: '⛅',  temp: 27, cond: 'Partly Cloudy',    humid: '68%', wind: '14 km/h', aqi: 'AQI 51' },
  { icon: '🌧️', temp: 24, cond: 'Light Rain',        humid: '85%', wind: '18 km/h', aqi: 'AQI 35' },
  { icon: '🌤️', temp: 28, cond: 'Mostly Sunny',      humid: '62%', wind: '10 km/h', aqi: 'AQI 46' },
  { icon: '🌩️', temp: 25, cond: 'Thunderstorm',      humid: '90%', wind: '25 km/h', aqi: 'AQI 30' },
];

function loadWeather() {
  if (document.getElementById('weather-content').style.display === 'block') return;
  setTimeout(() => {
    weatherData = WEATHER_CONDITIONS[Math.floor(Math.random() * WEATHER_CONDITIONS.length)];
    document.getElementById('w-icon').textContent  = weatherData.icon;
    document.getElementById('w-temp').textContent  = weatherData.temp;
    document.getElementById('w-cond').textContent  = weatherData.cond;
    document.getElementById('w-humid').textContent = weatherData.humid;
    document.getElementById('w-wind').textContent  = weatherData.wind;
    document.getElementById('w-aqi').textContent   = weatherData.aqi;
    moodList = getMoods(weatherData);
    buildMoodCards();
    document.getElementById('weather-loading').style.display  = 'none';
    document.getElementById('weather-content').style.display  = 'block';
  }, 1000);
}

function getMoods(w) {
  const isSunny = w.temp > 29 && (w.icon.includes('☀') || w.icon.includes('🌤'));
  const isRainy = w.icon.includes('🌧') || w.icon.includes('🌩');
  const isStorm = w.icon.includes('🌩');

  if (isStorm) return [
    { emoji:'🥭', name:'Mango Tree',     msg:"Thunder rattles my branches! My roots grip tight. But I fear for the smaller trees around me. Please check on them after this storm passes.", tone:{ rate:0.78, pitch:0.7  } },
    { emoji:'🌴', name:'Coconut Palm',    msg:"My fronds are whipping in the wind! I am holding on tightly. I have survived many storms and I will survive this one too. Stay safe, dear friend!",   tone:{ rate:0.85, pitch:0.88 } },
    { emoji:'🌲', name:'Ashoka Tree',     msg:"The storm brings silence after. In this violent weather, I remain still at my core. My roots are my anchor. Nature always finds its balance.", tone:{ rate:0.80, pitch:0.80 } },
    { emoji:'🎋', name:'Indian Oak',      msg:"The water body beside me is rising. I am stabilising the bank with all my roots. This storm will pass and my ecosystem will be richer for it.",    tone:{ rate:0.82, pitch:0.78 } },
  ];
  if (isSunny) return [
    { emoji:'🥭', name:'Mango Tree',     msg:"The sun blazes today! I am sweating through my bark. My canopy is working overtime to cool the air below. Please water me soon, I am thirsty.", tone:{ rate:0.82, pitch:0.72 } },
    { emoji:'🌴', name:'Coconut Palm',    msg:"Ah, glorious sunshine! This is my favourite weather. My fronds are soaking up every single ray. I feel absolutely radiant today!", tone:{ rate:0.95, pitch:1.05 } },
    { emoji:'🌲', name:'Ashoka Tree',     msg:"This heat is intense. My roots are drawing deep water. I am releasing moisture to cool this street, but I need help soon before I get stressed.", tone:{ rate:0.80, pitch:0.75 } },
    { emoji:'🎋', name:'Indian Oak',      msg:"Warm days like this boost my photosynthesis. I am absorbing carbon dioxide at full speed today. The birds love resting in my shade right now.", tone:{ rate:0.90, pitch:0.88 } },
  ];
  if (isRainy) return [
    { emoji:'🥭', name:'Mango Tree',     msg:"Rain! Oh glorious rain! My roots are drinking deeply. I feel alive and refreshed. Every drop is a gift. This is the best day for me!", tone:{ rate:1.05, pitch:1.1  } },
    { emoji:'🌴', name:'Coconut Palm',    msg:"The rain cleanses my fronds and feeds my roots. Though too much water worries me a little — I prefer well drained soil. But today is lovely!", tone:{ rate:0.90, pitch:0.95 } },
    { emoji:'🌲', name:'Ashoka Tree',     msg:"The rain washes away the city dust from my leaves. Now I can breathe and photosynthesize at full capacity again. I feel renewed!", tone:{ rate:0.92, pitch:1.0  } },
    { emoji:'🎋', name:'Indian Oak',      msg:"Rainfall replenishes the water body beside me. My entire ecosystem thrives today. The frogs have returned to sing tonight! What joy!", tone:{ rate:0.88, pitch:0.85 } },
  ];
  // Default: mild/pleasant
  return [
    { emoji:'🥭', name:'Mango Tree',     msg:"A pleasant day! The temperature is comfortable and my soil moisture is balanced. Perfect conditions for growth. Come sit under my shade!", tone:{ rate:0.88, pitch:0.85 } },
    { emoji:'🌴', name:'Coconut Palm',    msg:"Lovely weather today! Warm enough for photosynthesis, cool enough for comfort. I am feeling very productive and happy today!", tone:{ rate:0.92, pitch:0.95 } },
    { emoji:'🌲', name:'Ashoka Tree',     msg:"The gentle breeze carries my pollen far and wide today. New seedlings will grow from my seeds across this city. The cycle of life continues.", tone:{ rate:0.85, pitch:0.88 } },
    { emoji:'🎋', name:'Indian Oak',      msg:"Mild weather is ideal for my slow and steady growth. I add a tiny ring to my trunk today, as I do every single year. Patience is my strength.", tone:{ rate:0.88, pitch:0.82 } },
  ];
}

function buildMoodCards() {
  const g = document.getElementById('moodGrid');
  g.innerHTML = '';
  moodList.forEach((m, i) => {
    const d = document.createElement('div');
    d.className = 'mood-card' + (i === 0 ? ' active-mood' : '');
    d.innerHTML = `
      <div class="mood-tree">${m.emoji}</div>
      <div class="mood-title">${m.name}</div>
      <div class="mood-msg">"${m.msg}"</div>
      <button class="mood-speak-btn" id="msb-${i}" onclick="speakMoodCard(${i})">🔊 Hear it speak</button>
    `;
    g.appendChild(d);
  });
}

function speakMoodCard(i) {
  const m   = moodList[i];
  const btn = document.getElementById('msb-' + i);
  const card = btn.closest('.mood-card');
  if (btn.classList.contains('speaking')) { stopSpeech(); return; }
  stopSpeech();
  btn.classList.add('speaking');
  btn.innerHTML = '⏹ Stop';
  card.classList.add('currently-speaking');
  speakText(m.msg, {
    rate:  m.tone.rate,
    pitch: m.tone.pitch,
    onend: () => {
      btn.classList.remove('speaking');
      btn.innerHTML = '🔊 Hear it speak';
      card.classList.remove('currently-speaking');
    }
  });
}

function speakAllMoods() {
  const btn = document.getElementById('speakAllBtn');
  if (currentUtterance) { stopSpeech(); btn.innerHTML = '🔊 Hear All Trees Talk in This Weather'; return; }
  speakAllIdx = 0;
  btn.innerHTML = '⏹ Stop All Trees';
  speakNextMood(btn);
}

function speakNextMood(btn) {
  if (speakAllIdx >= moodList.length) {
    btn.innerHTML = '🔊 Hear All Trees Talk in This Weather';
    return;
  }
  const m       = moodList[speakAllIdx];
  const cardBtn = document.getElementById('msb-' + speakAllIdx);
  const card    = cardBtn.closest('.mood-card');
  document.querySelectorAll('.mood-card').forEach(c => c.classList.remove('currently-speaking'));
  document.querySelectorAll('.mood-speak-btn').forEach(b => { b.classList.remove('speaking'); b.innerHTML = '🔊 Hear it speak'; });
  cardBtn.classList.add('speaking');
  cardBtn.innerHTML = '🔊 Speaking...';
  card.classList.add('currently-speaking');
  const intro = m.name + ' says: ' + m.msg;
  speakText(intro, {
    rate:  m.tone.rate,
    pitch: m.tone.pitch,
    onend: () => {
      cardBtn.classList.remove('speaking');
      cardBtn.innerHTML = '🔊 Hear it speak';
      card.classList.remove('currently-speaking');
      speakAllIdx++;
      setTimeout(() => speakNextMood(btn), 500);
    }
  });
}
