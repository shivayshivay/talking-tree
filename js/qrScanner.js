// ── QR SCANNER & TREE LOOKUP MODULE ──
let qrStream = null;
let qrInterval = null;
let currentQRTree = null;

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

function lookupTree() {
  const input = document.getElementById('qrManualInput');
  const id    = input.value.trim().toUpperCase();
  const tree  = MAP_MARKERS.find(m => m.id === id);
  if (!tree) {
    alert('Tree ID not found! Try: IBS-001, IBS-002, IBS-003, JIG-001, JIG-002, JIG-003, CAC-001, CAC-002, CAC-003');
    return;
  }
  showQRResult(tree);
  addEcoPoints(20);
}

function showQRResult(tree) {
  currentQRTree = tree;
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

  document.getElementById('qrName').textContent    = tree.name;
  document.getElementById('qrLoc').textContent     = '📍 ' + tree.location;
  document.getElementById('qrSpecies').textContent = tree.species;
  document.getElementById('qr-temp').textContent   = tree.temp + '°C';
  document.getElementById('qr-moist').textContent  = tree.moist + '%';
  document.getElementById('qr-aqi').textContent    = 'AQI ' + tree.aqi;
  document.getElementById('qr-age').textContent    = tree.age;
  document.getElementById('qr-co2').textContent    = tree.co2;
  document.getElementById('qr-id').textContent     = tree.id;

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
document.addEventListener('paste', (e) => {
  const qrTab = document.getElementById('tab-qr');
  if (!qrTab || !qrTab.classList.contains('active')) return;
  const items = e.clipboardData && e.clipboardData.items;
  if (!items) return;
  for (let i = 0; i < items.length; i++) {
    if (items[i].type.startsWith('image/')) { readQRFromImageFile(items[i].getAsFile(), 'pasted'); break; }
  }
});
function handleQRDrop(e) {
  e.preventDefault();
  document.getElementById('qrPasteBox').classList.remove('drag-over');
  const file = e.dataTransfer.files[0];
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
    img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
}
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
