<<<<<<< HEAD
=======
// ── TREE VOICE PERSONALITY ──
const TREE_VOICE_PROFILES = {
  "IBS-001": { lang: "en", pitch: 1.1, rate: 0.95, name: "friendly" },
  "IBS-002": { lang: "hi", pitch: 0.9, rate: 0.85, name: "calm" },
  "IBS-003": { lang: "en", pitch: 0.75, rate: 0.8, name: "wise" },

  "JIG-001": { lang: "en", pitch: 1.0, rate: 1.0, name: "energetic" },
  "JIG-002": { lang: "en", pitch: 1.2, rate: 1.05, name: "playful" },
  "JIG-003": { lang: "en", pitch: 0.65, rate: 0.75, name: "ancient" },

  "CA-001": { lang: "en", pitch: 0.9, rate: 0.9, name: "soft" },
  "CA-002": { lang: "en", pitch: 1.15, rate: 1.05, name: "chill" },
  "CA-003": { lang: "en", pitch: 0.85, rate: 0.9, name: "neutral" }
};

>>>>>>> 0266752 (Talking Trees - Smart City AI & IoT Project)
// ── TREE TALK MODULE ──
let currentTree = 0;
let ecoPoints = 240;

<<<<<<< HEAD
// Tree photos - Wikimedia public domain
const TREE_PHOTO_URLS = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Hapus_Mango.jpg/200px-Hapus_Mango.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Coconut_palm_at_Kovalam.jpg/200px-Coconut_palm_at_Kovalam.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Barringtonia_acutangula_flowers.jpg/200px-Barringtonia_acutangula_flowers.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Saraca_asoca_flowers.jpg/200px-Saraca_asoca_flowers.jpg',
];

const TREE_EMOJIS_TALK = ['🥭','🌴','🎋','🌸'];
=======
// 🔊 GLOBAL VOLUME
let globalVolume = 1;

document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("volumeSlider");
  if (slider) {
    slider.addEventListener("input", (e) => {
      globalVolume = parseFloat(e.target.value);
    });
  }
});

// ✅ SPEAK WITH PERSONALITY
function speakTreeWithPersonality(text, treeId, onEndCallback) {
  const profile = TREE_VOICE_PROFILES[treeId] || {};

  speakText(text, {
    lang: profile.lang || "en",
    pitch: profile.pitch ?? 1,
    rate: profile.rate ?? 1,
    volume: globalVolume,
    onend: onEndCallback
  });
}
>>>>>>> 0266752 (Talking Trees - Smart City AI & IoT Project)

function buildTreeTabs() {
  const container = document.getElementById('treeTabs');
  TREES.forEach((t, i) => {
    const btn = document.createElement('button');
    btn.className = 'ttab' + (i === 0 ? ' active' : '');
<<<<<<< HEAD
    // Show photo thumbnail in tab
    const photoUrl = TREE_PHOTO_URLS[i] || '';
    btn.innerHTML = `<img src="${photoUrl}" alt="${t.name}" 
      style="width:20px;height:20px;border-radius:4px;object-fit:cover;flex-shrink:0;vertical-align:middle"
      onerror="this.style.display='none'"/> ${t.name}`;
=======
    btn.textContent = t.emoji + ' ' + t.name;
>>>>>>> 0266752 (Talking Trees - Smart City AI & IoT Project)
    btn.onclick = () => selectTree(i, btn);
    container.appendChild(btn);
  });
}

function selectTree(i, btn) {
  stopSpeech();
  currentTree = i;
  const t = TREES[i];

<<<<<<< HEAD
  document.getElementById('treeName').textContent  = t.name;
  document.getElementById('treeLatin').textContent = t.latin;
  document.getElementById('treeAge').textContent   = t.age;
  document.getElementById('chatArea').innerHTML    = '';
  document.querySelectorAll('.ttab').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  // Update photo — show real image, fallback to emoji
  const photoEl = document.getElementById('treePhoto');
  const emojiEl = document.getElementById('treeEmoji');
  const photoUrl = TREE_PHOTO_URLS[i] || '';
  if (photoEl) {
    photoEl.src = photoUrl;
    photoEl.style.display = 'block';
    photoEl.onerror = () => {
      photoEl.style.display = 'none';
      if (emojiEl) { emojiEl.textContent = TREE_EMOJIS_TALK[i] || '🌳'; emojiEl.style.display = 'block'; }
    };
  }
  if (emojiEl) emojiEl.style.display = 'none';

  addEcoPoints(20);
  randomSensors();
=======
  document.getElementById('treeEmoji').textContent = t.emoji;
  document.getElementById('treeName').textContent = t.name;
  document.getElementById('treeLatin').textContent = t.latin;
  document.getElementById('treeAge').textContent = t.age;
  document.getElementById('chatArea').innerHTML = '';

  document.querySelectorAll('.ttab').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  addEcoPoints(20);
  randomSensors();

>>>>>>> 0266752 (Talking Trees - Smart City AI & IoT Project)
  setTimeout(() => addTreeMsg(t.greeting, true), 200);
}

function addTreeMsg(text, autoSpeak = false) {
  const area = document.getElementById('chatArea');
<<<<<<< HEAD
  const msg  = document.createElement('div'); msg.className = 'msg';
  const av   = document.createElement('div'); av.className = 'mavatar';

  // Avatar: tree photo thumbnail
  const photoUrl = TREE_PHOTO_URLS[currentTree] || '';
  if (photoUrl) {
    const img = document.createElement('img');
    img.src = photoUrl; img.alt = ''; img.style.cssText = 'width:100%;height:100%;object-fit:cover';
    img.onerror = () => { av.textContent = TREE_EMOJIS_TALK[currentTree] || '🌳'; };
    av.appendChild(img);
  } else {
    av.textContent = TREE_EMOJIS_TALK[currentTree] || '🌳';
  }

  const bub = document.createElement('div'); bub.className = 'mbubble';
  const speakBtn = document.createElement('button');
  speakBtn.className = 'speak-msg-btn'; speakBtn.textContent = '🔊';
  speakBtn.onclick = () => speakMsgBubble(text, speakBtn);
  const textNode = document.createTextNode('');
  bub.insertBefore(textNode, null);
  bub.appendChild(speakBtn);
  msg.appendChild(av); msg.appendChild(bub);
  area.appendChild(msg); area.scrollTop = area.scrollHeight;
=======

  const msg = document.createElement('div');
  msg.className = 'msg';

  const av = document.createElement('div');
  av.className = 'mavatar';
  av.textContent = TREES[currentTree].emoji;

  const bub = document.createElement('div');
  bub.className = 'mbubble';

  const speakBtn = document.createElement('button');
  speakBtn.className = 'speak-msg-btn';
  speakBtn.textContent = '🔊';
  speakBtn.onclick = () => speakMsgBubble(text, speakBtn);

  bub.appendChild(speakBtn);

  const textNode = document.createTextNode('');
  bub.insertBefore(textNode, speakBtn);

  msg.appendChild(av);
  msg.appendChild(bub);
  area.appendChild(msg);

  area.scrollTop = area.scrollHeight;
>>>>>>> 0266752 (Talking Trees - Smart City AI & IoT Project)

  let idx = 0;
  const ti = setInterval(() => {
    textNode.nodeValue = text.slice(0, idx++);
<<<<<<< HEAD
    area.scrollTop = area.scrollHeight;
    if (idx > text.length) { clearInterval(ti); if (autoSpeak) speakMsgBubble(text, speakBtn); }
=======
    if (idx > text.length) {
      clearInterval(ti);
      if (autoSpeak) speakMsgBubble(text, speakBtn);
    }
>>>>>>> 0266752 (Talking Trees - Smart City AI & IoT Project)
  }, 16);
}

function speakMsgBubble(text, btn) {
<<<<<<< HEAD
  if (currentUtterance && activeMsgBtn === btn) { stopSpeech(); return; }
  stopSpeech();
  activeMsgBtn = btn; btn.classList.add('active');
  const vb = document.getElementById('voiceBar');
  vb.classList.add('show');
  document.getElementById('vbText').textContent = TREES[currentTree].name + ' is speaking...';
  speakText(text, {
    rate: 0.88, pitch: 0.82,
    onend: () => {
      vb.classList.remove('show');
      btn.textContent = '🔊'; btn.classList.remove('active');
      activeMsgBtn = null;
    }
=======
  if (currentUtterance && activeMsgBtn === btn) {
    stopSpeech();
    return;
  }

  stopSpeech();
  activeMsgBtn = btn;
  btn.classList.add('active');

  const vb = document.getElementById('voiceBar');
  vb.classList.add('show');

  const treeId = TREE_IDS[currentTree];
  const personality = TREE_VOICE_PROFILES[treeId]?.name || "voice";

  document.getElementById('vbText').textContent =
    TREES[currentTree].name + ' (' + personality + ') is speaking...';

  document.getElementById('treeEmoji').classList.add('speaking-anim');

  // ✅ USING PERSONALITY SYSTEM
  speakTreeWithPersonality(text, treeId, () => {
    vb.classList.remove('show');
    document.getElementById('treeEmoji').classList.remove('speaking-anim');

    btn.textContent = '🔊';
    btn.classList.remove('active');
    activeMsgBtn = null;
>>>>>>> 0266752 (Talking Trees - Smart City AI & IoT Project)
  });
}

function addUserMsg(text) {
  const area = document.getElementById('chatArea');
<<<<<<< HEAD
  const msg  = document.createElement('div'); msg.className = 'msg';
  const av   = document.createElement('div'); av.className = 'mavatar'; av.textContent = '🧑';
  const bub  = document.createElement('div'); bub.className = 'mbubble user'; bub.textContent = text;
  msg.appendChild(av); msg.appendChild(bub);
  area.appendChild(msg); area.scrollTop = area.scrollHeight;
}

const TREE_IDS = ['IBS-001','WF-012','LB-007','MG-023'];
=======

  const msg = document.createElement('div');
  msg.className = 'msg';

  const av = document.createElement('div');
  av.className = 'mavatar';
  av.textContent = '🧑';

  const bub = document.createElement('div');
  bub.className = 'mbubble user';
  bub.textContent = text;

  msg.appendChild(av);
  msg.appendChild(bub);

  area.appendChild(msg);
  area.scrollTop = area.scrollHeight;
}

// ⚠️ FIXED IDS (MATCH BACKEND)
const TREE_IDS = [
  "IBS-001",
  "IBS-002",
  "IBS-003",
  "JIG-001",
  "JIG-002",
  "JIG-003",
  "CA-001",
  "CA-002",
  "CA-003"
];
>>>>>>> 0266752 (Talking Trees - Smart City AI & IoT Project)

function sendMsg() {
  const inp = document.getElementById('chatInput');
  const val = inp.value.trim();
  if (!val) return;
<<<<<<< HEAD
  inp.value = ''; addUserMsg(val); addEcoPoints(10);
  setTimeout(() => {
    const t   = TREES[currentTree];
    const low = val.toLowerCase();
    const tid = TREE_IDS[currentTree];
    if (low.includes('code') || low.includes('qr') || low.includes('id') || low.includes('scan')) {
      showQRInChat(t, tid); return;
    }
    let response = t.responses.default;
    for (const key of Object.keys(t.responses)) {
      if (low.includes(key)) { response = t.responses[key]; break; }
    }
=======

  inp.value = '';
  addUserMsg(val);
  addEcoPoints(10);

  setTimeout(() => {
    const t = TREES[currentTree];
    const low = val.toLowerCase();
    const tid = TREE_IDS[currentTree];

    if (low.includes('code') || low.includes('qr') || low.includes('id')) {
      showQRInChat(t, tid);

      const spokenId = tid.split('').join(' ');
      addTreeMsg(`My ID is ${tid}. Spelled ${spokenId}`, true);
      return;
    }

    let response = t.responses.default;

    for (const key of Object.keys(t.responses)) {
      if (low.includes(key)) {
        response = t.responses[key];
        break;
      }
    }

>>>>>>> 0266752 (Talking Trees - Smart City AI & IoT Project)
    addTreeMsg(response, true);
  }, 700);
}

<<<<<<< HEAD
function showQRInChat(tree, treeId) {
  const area = document.getElementById('chatArea');
  const msg  = document.createElement('div'); msg.className = 'msg';
  const av   = document.createElement('div'); av.className = 'mavatar';
  const photoUrl = TREE_PHOTO_URLS[currentTree] || '';
  if (photoUrl) { const img = document.createElement('img'); img.src = photoUrl; img.style.cssText='width:100%;height:100%;object-fit:cover'; av.appendChild(img); }
  else av.textContent = TREE_EMOJIS_TALK[currentTree] || '🌳';
  const bub = document.createElement('div'); bub.className = 'mbubble';
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(treeId)}&color=2d6a2d&bgcolor=ffffff&margin=4`;
  bub.innerHTML = `<div style="display:flex;align-items:center;gap:10px;padding:2px 0">
    <div style="background:#fff;border-radius:6px;padding:5px;flex-shrink:0;border:1px solid var(--border)">
      <img src="${qrUrl}" width="72" height="72" style="display:block;border-radius:3px" onerror="this.style.display='none'"/>
    </div>
    <div>
      <div style="font-size:12px;font-weight:600;color:var(--text);margin-bottom:3px">My QR Code</div>
      <div style="font-family:monospace;font-size:13px;color:var(--green);font-weight:600;letter-spacing:1px">${treeId}</div>
      <div style="font-size:10px;color:var(--text4);margin-top:2px">Go to QR Scanner tab to scan</div>
    </div>
  </div>`;
  msg.appendChild(av); msg.appendChild(bub);
  area.appendChild(msg); area.scrollTop = area.scrollHeight;
  addTreeMsg(`My unique Tree ID is ${treeId}. You can scan the QR code above or go to the QR Scanner tab and enter this ID to see all my live data!`, true);
}

function addEcoPoints(pts) {
  ecoPoints += pts;
  document.getElementById('ecoNum').textContent = ecoPoints;
  const lbyNum = document.getElementById('lby-num');
  if (lbyNum) lbyNum.textContent = ecoPoints;
}

async function randomSensors() {
  const treeId = TREE_IDS[currentTree] || 'IBS-001';
  const live   = await fetchSensorsFromBackend(treeId);
  const temp   = live ? live.temperature   : Math.round(24 + Math.random() * 12);
  const moist  = live ? live.soil_moisture : Math.round(30 + Math.random() * 55);
  const aqi    = live ? live.aqi           : Math.round(20 + Math.random() * 80);
  const sun    = live ? live.sunlight_klux : parseFloat((3 + Math.random() * 8).toFixed(1));
  document.getElementById('s-temp').textContent  = temp;
  document.getElementById('s-moist').textContent = moist;
  document.getElementById('s-aqi').textContent   = 'AQI ' + aqi;
  document.getElementById('s-sun').textContent   = sun;
  document.getElementById('b-temp').style.width  = Math.min((temp/45)*100,100) + '%';
  document.getElementById('b-moist').style.width = moist + '%';
  document.getElementById('b-aqi').style.width   = Math.min(aqi,100) + '%';
  document.getElementById('b-sun').style.width   = Math.min((sun/12)*100,100) + '%';
  const dot = document.getElementById('hDot'), ht = document.getElementById('hText'), hs = document.getElementById('hSub');
  const alrt = document.getElementById('alertBox');
  if (moist < 35) { dot.className='hdot bad'; ht.textContent='Stressed'; hs.textContent='Low moisture'; alrt.classList.add('show'); }
  else if (aqi > 70 || temp > 34) { dot.className='hdot warn'; ht.textContent='Moderate'; hs.textContent='Monitor conditions'; alrt.classList.remove('show'); }
  else { dot.className='hdot good'; ht.textContent='Healthy'; hs.textContent='All vitals normal'; alrt.classList.remove('show'); }
}
=======
function addEcoPoints(pts) {
  ecoPoints += pts;
  document.getElementById('ecoNum').textContent = ecoPoints;
}

async function randomSensors() {
  const treeId = TREE_IDS[currentTree];

  const live = await fetchSensorsFromBackend(treeId);

  const temp = live ? live.temperature : Math.round(24 + Math.random() * 12);
  const moist = live ? live.soil_moisture : Math.round(30 + Math.random() * 55);
  const aqi = live ? live.aqi : Math.round(20 + Math.random() * 80);
  const sun = live ? live.sunlight_klux : (3 + Math.random() * 8).toFixed(1);

  document.getElementById('s-temp').textContent = temp;
  document.getElementById('s-moist').textContent = moist;
  document.getElementById('s-aqi').textContent = 'AQI ' + aqi;
  document.getElementById('s-sun').textContent = sun;
}
>>>>>>> 0266752 (Talking Trees - Smart City AI & IoT Project)
