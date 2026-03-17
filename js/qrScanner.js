// ── QR SCANNER & TREE LOOKUP MODULE ──
let qrStream = null;
let qrInterval = null;
let currentQRTree = null;

<<<<<<< HEAD
const SERVER_IP   = '10.182.189.80';
const SERVER_PORT = '3000';
const APP_URL     = `http://${SERVER_IP}:${SERVER_PORT}`;

// Tree descriptions for QR result page
const TREE_DESCRIPTIONS = {
  'IBS-001': 'The Mango Tree of Izee Business School has stood on this campus for 85 years. Known as the King of Fruits, Mangifera indica is sacred to India and absorbs 22 kg of CO₂ every year while providing shade, oxygen and fruit to the campus community.',
  'IBS-002': 'The Neem Tree at Izee Business School is a living pharmacy. Every part of Azadirachta indica — leaves, bark, seeds — has medicinal value. This 40-year-old tree purifies the air around it and keeps pests away naturally.',
  'IBS-003': 'This Peepal Tree is one of the oldest on campus at 60 years. Ficus religiosa is sacred in Hinduism, Buddhism and Jainism. It releases oxygen even at night — a rare trait — making it one of the most beneficial trees for urban environments.',
  'JIG-001': 'The Rain Tree in Jigani Industrial Area provides a massive canopy that filters industrial air pollution. Samanea saman can absorb up to 25 kg of CO₂ per year and its leaflets fold at night or before rain — hence the name.',
  'JIG-002': 'The Gulmohar here bursts into brilliant orange-red flowers every summer. Delonix regia, originally from Madagascar, has naturalized across India. Its broad canopy cools the industrial zone and its roots fix nitrogen into the soil.',
  'JIG-003': 'This ancient Banyan in Jigani is 70 years old. Ficus benghalensis — the National Tree of India — sends down aerial roots that become new trunks, creating a grove from a single tree. A symbol of eternal life.',
  'CAC-001': 'The Ashoka Tree at Christ Academy is a sacred species mentioned in the Ramayana. Saraca asoca blooms with fragrant orange flowers. Its 50-year presence on campus has made it a landmark for students and wildlife alike.',
  'CAC-002': 'The Coconut Palm at Christ Academy is the versatile Tree of Life. Cocos nucifera — every part is useful, from fruit to leaves to trunk. This 32-year-old palm also naturally air-conditions its surroundings through transpiration.',
  'CAC-003': 'The Indian Oak here blooms at night with pink flowers, attracting bats and moths. Barringtonia acutangula thrives near water bodies and supports 40+ species of birds and insects, making it a keystone biodiversity species.',
};

// Tree emojis for QR display
const TREE_EMOJIS = {
  'IBS-001':'🥭','IBS-002':'🌿','IBS-003':'🌳',
  'JIG-001':'🌲','JIG-002':'🌸','JIG-003':'🌳',
  'CAC-001':'🌲','CAC-002':'🌴','CAC-003':'🎋',
};

=======
// Extract tree ID from various scan formats (raw ID, full URL, etc.)
function matchTreeFromScan(rawData) {
  const data = rawData.trim();
  // Try to extract ?tree=XXX from URL
  try {
    const url = new URL(data);
    const treeParam = url.searchParams.get('tree');
    if (treeParam) {
      const id = treeParam.trim().toUpperCase();
      const tree = MAP_MARKERS.find(m => m.id === id);
      if (tree) return tree;
    }
  } catch(e) { /* not a URL, try direct match */ }
  // Direct ID match
  const upper = data.toUpperCase();
  return MAP_MARKERS.find(m => upper === m.id || upper.includes(m.id)) || null;
}


// Build clickable tree ID chips
>>>>>>> 0266752 (Talking Trees - Smart City AI & IoT Project)
function buildQRChips() {
  const box = document.getElementById('qrChips');
  if (!box) return;
  box.innerHTML = '';
  MAP_MARKERS.forEach(tree => {
    const chip = document.createElement('span');
    chip.className = 'qr-chip';
    chip.textContent = tree.id;
    chip.title = tree.name + ' — ' + tree.location;
    chip.onclick = () => {
      document.getElementById('qrManualInput').value = tree.id;
      lookupTree();
    };
    box.appendChild(chip);
  });
}

<<<<<<< HEAD
=======
// Look up a tree by ID
>>>>>>> 0266752 (Talking Trees - Smart City AI & IoT Project)
function lookupTree() {
  const input = document.getElementById('qrManualInput');
  const id    = input.value.trim().toUpperCase();
  const tree  = MAP_MARKERS.find(m => m.id === id);
  if (!tree) {
<<<<<<< HEAD
    alert('Tree ID not found! Try: IBS-001, IBS-002, IBS-003, JIG-001, JIG-002, JIG-003, CAC-001, CAC-002, CAC-003');
=======
    alert('Tree ID not found! Try one of the chips below, e.g. IBS-001');
>>>>>>> 0266752 (Talking Trees - Smart City AI & IoT Project)
    return;
  }
  showQRResult(tree);
  addEcoPoints(20);
}

function showQRResult(tree) {
  currentQRTree = tree;
<<<<<<< HEAD
  window._currentQRTree = tree;

  const color = tree.health === 'good' ? '#2e7d32' : tree.health === 'warn' ? '#e65100' : '#c62828';
  const label = tree.health === 'good' ? 'Healthy' : tree.health === 'warn' ? 'Moderate' : 'Stressed';

  // Show photo if available, else emoji
  const photoEl = document.getElementById('qrResultPhoto');
  const emojiEl = document.getElementById('qrResultEmoji');
  const photo   = TREE_PHOTOS && TREE_PHOTOS[tree.id];
  if (photoEl && photo) {
    photoEl.src   = photo;
    photoEl.style.display = 'block';
    if (emojiEl) emojiEl.style.display = 'none';
  } else {
    if (photoEl) photoEl.style.display = 'none';
    if (emojiEl) { emojiEl.style.display = 'block'; emojiEl.textContent = TREE_EMOJIS[tree.id] || tree.emoji || '🌳'; }
  }

=======
  window._currentQRTree = tree; // make accessible to language module
  const color = tree.health === 'good' ? '#66bb6a' : tree.health === 'warn' ? '#ffb74d' : '#ef5350';
  const label = tree.health === 'good' ? '✅ Healthy' : tree.health === 'warn' ? '⚠️ Moderate' : '🔴 Stressed';

  document.getElementById('qrEmoji').textContent   = tree.emoji;
>>>>>>> 0266752 (Talking Trees - Smart City AI & IoT Project)
  document.getElementById('qrName').textContent    = tree.name;
  document.getElementById('qrLoc').textContent     = '📍 ' + tree.location;
  document.getElementById('qrSpecies').textContent = tree.species;
  document.getElementById('qr-temp').textContent   = tree.temp + '°C';
  document.getElementById('qr-moist').textContent  = tree.moist + '%';
  document.getElementById('qr-aqi').textContent    = 'AQI ' + tree.aqi;
  document.getElementById('qr-age').textContent    = tree.age;
  document.getElementById('qr-co2').textContent    = tree.co2;
  document.getElementById('qr-id').textContent     = tree.id;

<<<<<<< HEAD
  // Show description
  const descEl = document.getElementById('qrDescription');
  if (descEl) descEl.textContent = TREE_DESCRIPTIONS[tree.id] || `${tree.name} at ${tree.location}. Species: ${tree.species}. Health: ${label}.`;

  const statusEl = document.getElementById('qrStatus');
  statusEl.textContent      = label;
  statusEl.style.background = color + '18';
  statusEl.style.color      = color;
  statusEl.style.border     = '1px solid ' + color;

  generateQRCode(tree);
  if (typeof buildLangGrid === 'function') buildLangGrid();

  document.getElementById('qrResult').style.display = 'block';
  document.getElementById('qrResult').scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  setTimeout(() => speakTreeQR(), 800);
}

function generateQRCode(tree) {
  const container = document.getElementById('qrCodeImg');
  const mobileUrl = `${APP_URL}/?tree=${tree.id}`;
  const qrApiUrl  = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(mobileUrl)}&color=2d6a2d&bgcolor=ffffff&margin=6&ecc=M`;
  container.innerHTML = `
    <img src="${qrApiUrl}" alt="QR Code for ${tree.id}"
      style="width:150px;height:150px;border-radius:8px;display:block;margin:0 auto"
      onerror="this.outerHTML='<div style=padding:20px;text-align:center;font-size:12px;color:var(--text3)>QR: ${tree.id}</div>'"/>
    <div style="font-size:11px;font-family:monospace;text-align:center;margin-top:6px;color:var(--text3)">${tree.id} · ${tree.name}</div>
  `;
}

function speakTreeQR() {
  if (!currentQRTree) return;
  const t   = currentQRTree;
  const desc = TREE_DESCRIPTIONS[t.id] || '';
  const txt = `Hello! I am the ${t.name}, located at ${t.location}. ${desc} 
    My temperature is ${t.temp} degrees Celsius. Soil moisture is ${t.moist} percent. 
    Air quality index is ${t.aqi}. I absorb ${t.co2} of carbon dioxide every year. 
    My Tree ID is ${t.id.split('').join(' ')}. Thank you for scanning me!`;
  const btn = document.getElementById('qrSpeakBtn');
  if (currentUtterance) { stopSpeech(); if(btn) btn.innerHTML = 'Hear this tree speak'; return; }
  if(btn) btn.innerHTML = 'Stop Speaking';
  speakText(txt, { rate: 0.88, pitch: 0.82, onend: () => { if(btn) btn.innerHTML = 'Hear this tree speak'; } });
}

// ── PASTE / DROP / UPLOAD ──
=======
  const statusEl = document.getElementById('qrStatus');
  statusEl.textContent         = label;
  statusEl.style.background    = color + '22';
  statusEl.style.color         = color;
  statusEl.style.border        = '0.5px solid ' + color;

  // Generate real scannable QR code using Google Charts API
  generateQRCode(tree);

  document.getElementById('qrResult').style.display = 'block';
  if (typeof buildLangGrid === 'function') buildLangGrid();
  document.getElementById('qrResult').scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // Auto-speak the tree info when result appears
  setTimeout(() => speakTreeQR(), 600);
}

// ── NETWORK CONFIG — auto-detected from current page URL ──
const APP_URL = window.location.origin;

// ── REAL SCANNABLE QR CODE — encodes full mobile URL ──
function generateQRCode(tree) {
  const container = document.getElementById('qrCodeImg');
  // Full URL: scanning this opens the app on mobile and auto-loads the tree
  const mobileUrl = `${APP_URL}/?tree=${tree.id}`;
  const qrApiUrl  = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(mobileUrl)}&color=1b5e20&bgcolor=ffffff&margin=6&ecc=M`;

  container.innerHTML = `
    <img src="${qrApiUrl}" alt="QR for ${tree.id}"
      style="width:150px;height:150px;border-radius:8px;display:block;margin:0 auto"
      onerror="this.outerHTML=generateFallbackQR('${tree.id}')"/>
    <div style="font-size:10px;color:#2e7d32;font-family:monospace;text-align:center;margin-top:5px;font-weight:500">${tree.id} · ${tree.name}</div>
    <div style="font-size:9px;color:rgba(0,0,0,0.4);text-align:center;margin-top:2px;word-break:break-all;font-family:monospace">${mobileUrl}</div>
  `;
}

// Fallback SVG QR if no internet
function generateFallbackQR(treeId) {
  const seed = treeId.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const size = 10, cs = 8, total = size * cs + 16;
  const corners = [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[6,0],[6,1],[6,2],[6,3],[6,4],[6,5],[6,6],[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[1,1],[1,2],[1,3],[1,4],[1,5],[2,5],[3,5],[4,5],[5,5],[5,4],[5,3],[5,2],[5,1],[2,2],[2,3],[2,4],[3,4],[4,4],[4,3],[4,2],[3,2],[3,3]];
  let svg = `<svg width="${total}" height="${total}" xmlns="http://www.w3.org/2000/svg"><rect width="${total}" height="${total}" fill="white" rx="4"/>`;
  for (let r = 0; r < size; r++) for (let c = 0; c < size; c++) {
    const isCorn = corners.some(([cr,cc]) => cr===r && cc===c);
    const v = isCorn ? 1 : ((seed*(r+1)*7+c*13+r*5)%3===0?1:0);
    if (v) svg += `<rect x="${c*cs+8}" y="${r*cs+8}" width="${cs-1}" height="${cs-1}" fill="#1b5e20" rx="1"/>`;
  }
  svg += `<text x="${total/2}" y="${total-2}" text-anchor="middle" font-size="8" fill="#2e7d32" font-family="monospace">${treeId}</text></svg>`;
  return svg;
}

// ── SPEAK TREE INFO ──
function speakTreeQR() {
  if (!currentQRTree) return;
  const t   = currentQRTree;
  const txt = `Hello! I am the ${t.name}, scientifically known as ${t.species}, located at ${t.location}. 
    I am ${t.age} old. My current health status is ${t.health === 'good' ? 'healthy' : t.health === 'warn' ? 'moderate, please monitor me' : 'stressed, I need urgent attention'}. 
    Temperature around me is ${t.temp} degrees Celsius. My soil moisture is ${t.moist} percent. 
    Air quality index is ${t.aqi}. I absorb ${t.co2} of carbon dioxide every year, helping fight climate change. 
    My unique tree identification code is ${t.id.split('').join(' ')}. Thank you for scanning and caring for me!`;
  const btn = document.getElementById('qrSpeakBtn');
  if (currentUtterance) { stopSpeech(); btn.innerHTML = '🔊 Hear this tree speak'; return; }
  btn.innerHTML = '⏹ Stop Speaking';
  speakText(txt, {
    rate: 0.88, pitch: 0.82,
    onend: () => { btn.innerHTML = '🔊 Hear this tree speak'; }
  });
}

// ── CAMERA QR SCANNER ──
async function startQRScan() {
  const video = document.getElementById('qr-video');
  const wrap  = document.getElementById('qr-video-wrap');

  // Check if jsQR library loaded
  if (typeof jsQR === 'undefined') {
    alert('QR scanning library not loaded. Please make sure you are running from a server (not by opening the file directly).');
    return;
  }

  try {
    qrStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 720 } }
    });
    video.srcObject = qrStream;
    await video.play();
    wrap.style.display = 'block';
    document.getElementById('qrStartBtn').style.display = 'none';
    document.getElementById('qrStopBtn').style.display  = 'inline-block';

    const canvas = document.createElement('canvas');
    const ctx    = canvas.getContext('2d', { willReadFrequently: true });

    qrInterval = setInterval(() => {
      if (video.readyState < video.HAVE_ENOUGH_DATA) return;
      canvas.width  = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      try {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert'
        });
        if (code && code.data) {
          const tree = matchTreeFromScan(code.data);
          if (tree) {
            stopQRScan();
            document.getElementById('qrManualInput').value = tree.id;
            showQRResult(tree);
            addEcoPoints(20);
          }
        }
      } catch(e) {}
    }, 200);

  } catch (err) {
    let msg = 'Camera not accessible.\n\n';
    if (err.name === 'NotAllowedError')  msg += '→ You denied camera permission. Click the camera icon in your browser address bar and allow it.';
    else if (err.name === 'NotFoundError') msg += '→ No camera found on this device.';
    else msg += '→ ' + err.message + '\n\nUse the manual lookup below instead.';
    alert(msg);
  }
}

function stopQRScan() {
  if (qrStream)   { qrStream.getTracks().forEach(t => t.stop()); qrStream = null; }
  if (qrInterval) { clearInterval(qrInterval); qrInterval = null; }
  const wrap = document.getElementById('qr-video-wrap');
  if (wrap) wrap.style.display = 'none';
  document.getElementById('qrStartBtn').style.display = 'inline-block';
  document.getElementById('qrStopBtn').style.display  = 'none';
}

// ── PASTE / DROP / UPLOAD QR IMAGE ──

// Listen for Ctrl+V paste anywhere on QR tab
>>>>>>> 0266752 (Talking Trees - Smart City AI & IoT Project)
document.addEventListener('paste', (e) => {
  const qrTab = document.getElementById('tab-qr');
  if (!qrTab || !qrTab.classList.contains('active')) return;
  const items = e.clipboardData && e.clipboardData.items;
  if (!items) return;
  for (let i = 0; i < items.length; i++) {
<<<<<<< HEAD
    if (items[i].type.startsWith('image/')) { readQRFromImageFile(items[i].getAsFile(), 'pasted'); break; }
  }
});
=======
    if (items[i].type.startsWith('image/')) {
      const blob = items[i].getAsFile();
      readQRFromImageFile(blob, 'pasted');
      break;
    }
  }
});

// Handle drag & drop
>>>>>>> 0266752 (Talking Trees - Smart City AI & IoT Project)
function handleQRDrop(e) {
  e.preventDefault();
  document.getElementById('qrPasteBox').classList.remove('drag-over');
  const file = e.dataTransfer.files[0];
<<<<<<< HEAD
  if (file && file.type.startsWith('image/')) readQRFromImageFile(file, 'dropped');
  else setQRPasteStatus('error', 'Please drop an image file (PNG, JPG)');
}
function handleQRFile(e) { const f = e.target.files[0]; if(f) readQRFromImageFile(f,'uploaded'); e.target.value=''; }
function readQRFromImageFile(file, source) {
  setQRPasteStatus('loading', 'Reading QR code...');
  const reader = new FileReader();
  reader.onload = ev => {
    const img = new Image(); img.onload = () => {
      const canvas = document.getElementById('qrPasteCanvas');
      canvas.width = img.width; canvas.height = img.height;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(img, 0, 0);
      if (typeof jsQR === 'undefined') { setQRPasteStatus('error','Run from http://localhost:3000'); return; }
      const code = jsQR(ctx.getImageData(0,0,canvas.width,canvas.height).data, canvas.width, canvas.height, { inversionAttempts:'attemptBoth' });
      if (code && code.data) {
        const scanned = code.data.trim().toUpperCase();
        const tree = MAP_MARKERS.find(m => scanned === m.id || scanned.includes(m.id));
        if (tree) {
          setQRPasteStatus('success', 'QR decoded! Found: ' + tree.name + ' (' + tree.id + ')');
          document.getElementById('qrManualInput').value = tree.id;
          showQRResult(tree); addEcoPoints(20);
        } else { setQRPasteStatus('warn', 'QR decoded (' + scanned + ') but tree not found in system.'); }
      } else { setQRPasteStatus('error', 'No QR code found in image. Make sure the QR is clear and not blurry.'); }
    };
=======
  if (file && file.type.startsWith('image/')) {
    readQRFromImageFile(file, 'dropped');
  } else {
    setQRPasteStatus('error', '❌ Please drop an image file (PNG, JPG, etc.)');
  }
}

// Handle file upload via button
function handleQRFile(e) {
  const file = e.target.files[0];
  if (file) readQRFromImageFile(file, 'uploaded');
  e.target.value = ''; // reset input so same file can be re-uploaded
}

// Core: read QR code from any image file
function readQRFromImageFile(file, source) {
  setQRPasteStatus('loading', '🔍 Reading QR code...');

  const reader = new FileReader();
  reader.onload = (ev) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.getElementById('qrPasteCanvas');
      canvas.width  = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      if (typeof jsQR === 'undefined') {
        setQRPasteStatus('error', '❌ QR library not loaded. Run from a local server, not by opening the file directly.');
        return;
      }

      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'attemptBoth'
      });

      if (code && code.data) {
        const tree = matchTreeFromScan(code.data);
        if (tree) {
          setQRPasteStatus('success', `✅ QR decoded! Found: ${tree.name} (${tree.id})`);
          document.getElementById('qrManualInput').value = tree.id;
          showQRResult(tree);
          addEcoPoints(20);
        } else {
          // QR decoded but ID not in system
          setQRPasteStatus('warn', `⚠️ QR decoded (${code.data}) but tree not found in system. Try IBS-001, JIG-001 or CAC-001.`);
        }
      } else {
        setQRPasteStatus('error', '❌ No QR code found in image. Make sure the QR is clear and not blurry.');
      }
    };
    img.onerror = () => setQRPasteStatus('error', '❌ Could not load image.');
>>>>>>> 0266752 (Talking Trees - Smart City AI & IoT Project)
    img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
}
<<<<<<< HEAD
function setQRPasteStatus(type, msg) {
  const el = document.getElementById('qrPasteStatus');
  el.textContent = msg; el.className = 'qr-paste-status ' + type; el.style.display = 'block';
  if (type === 'success') setTimeout(() => { el.style.display = 'none'; }, 4000);
}

// ── CAMERA QR SCANNER ──
async function startQRScan() {
  if (typeof jsQR === 'undefined') { alert('Run from http://localhost:3000 to use camera scanner'); return; }
  const video = document.getElementById('qr-video');
  const wrap  = document.getElementById('qr-video-wrap');
  try {
    qrStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' } } });
    video.srcObject = qrStream; await video.play();
    wrap.style.display = 'block';
    document.getElementById('qrStartBtn').style.display = 'none';
    document.getElementById('qrStopBtn').style.display  = 'inline-block';
    const canvas = document.createElement('canvas');
    const ctx    = canvas.getContext('2d', { willReadFrequently: true });
    qrInterval   = setInterval(() => {
      if (video.readyState < video.HAVE_ENOUGH_DATA) return;
      canvas.width = video.videoWidth; canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0);
      try {
        const code = jsQR(ctx.getImageData(0,0,canvas.width,canvas.height).data, canvas.width, canvas.height, { inversionAttempts:'dontInvert' });
        if (code && code.data) {
          const scanned = code.data.trim().toUpperCase();
          const tree = MAP_MARKERS.find(m => scanned === m.id || scanned.includes(m.id));
          if (tree) { stopQRScan(); document.getElementById('qrManualInput').value = tree.id; showQRResult(tree); addEcoPoints(20); }
        }
      } catch(e) {}
    }, 200);
  } catch(err) {
    let msg = 'Camera not accessible.\n';
    if (err.name === 'NotAllowedError') msg += 'Allow camera permission in browser settings.';
    else msg += err.message + '\nUse manual lookup below instead.';
    alert(msg);
  }
}
function stopQRScan() {
  if (qrStream) { qrStream.getTracks().forEach(t => t.stop()); qrStream = null; }
  if (qrInterval) { clearInterval(qrInterval); qrInterval = null; }
  const wrap = document.getElementById('qr-video-wrap');
  if (wrap) wrap.style.display = 'none';
  document.getElementById('qrStartBtn').style.display  = 'inline-block';
  document.getElementById('qrStopBtn').style.display   = 'none';
}
=======

function setQRPasteStatus(type, msg) {
  const el = document.getElementById('qrPasteStatus');
  el.textContent = msg;
  el.className   = 'qr-paste-status ' + type;
  el.style.display = 'block';
  if (type === 'success') setTimeout(() => { el.style.display = 'none'; }, 4000);
}
>>>>>>> 0266752 (Talking Trees - Smart City AI & IoT Project)
