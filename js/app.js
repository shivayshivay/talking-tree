// ── APP INIT & NAVIGATION ──

// ── DRAWER ──
function toggleDrawer() {
  const drawer  = document.getElementById('drawer');
  const overlay = document.getElementById('drawerOverlay');
  const btn     = document.getElementById('hamburgerBtn');
  const isOpen  = drawer.classList.contains('open');
  drawer.classList.toggle('open', !isOpen);
  overlay.classList.toggle('open', !isOpen);
  btn.classList.toggle('active', !isOpen);
}
function closeDrawer() {
  document.getElementById('drawer').classList.remove('open');
  document.getElementById('drawerOverlay').classList.remove('open');
  document.getElementById('hamburgerBtn').classList.remove('active');
}

// ── THEME ──
function toggleTheme() {
  const html = document.documentElement;
  const btn  = document.getElementById('themeBtn');
  const dark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', dark ? 'light' : 'dark');
  btn.innerHTML = dark ? '&#9788;' : '&#9790;';
  btn.title = dark ? 'Switch to dark mode' : 'Switch to light mode';
  localStorage.setItem('tt-theme', dark ? 'light' : 'dark');
  // Update Leaflet map tiles if map is visible
  if (leafletMap) leafletMap.invalidateSize();
}
// Apply saved theme
(function(){
  const saved = localStorage.getItem('tt-theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
    const btn = document.getElementById('themeBtn');
    if (btn) btn.innerHTML = saved === 'dark' ? '&#9790;' : '&#9788;';
  }
})();

// ── TAB CONFIG ──
const TAB_META = {
  talk:        { icon:'&#x1F333;', title:'Tree Talk',           sub:'Chat with trees in real time' },
  map:         { icon:'&#x1F5FA;', title:'City Map',            sub:'9 trees across 3 Bengaluru locations' },
  qr:          { icon:'&#x1F4F1;', title:'QR Scanner',          sub:'Scan, paste or upload a QR code' },
  weather:     { icon:'&#x1F326;', title:'Weather Mood',        sub:'Trees react to live weather' },
  carbon:      { icon:'&#x1F9EE;', title:'Carbon Calculator',   sub:'Calculate your CO\u2082 footprint' },
  community:   { icon:'&#x1F4E2;', title:'Community Reports',   sub:'Report tree issues, earn points' },
  leaf:        { icon:'&#x1F343;', title:'Leaf Diagnosis',      sub:'AI-powered leaf disease analysis' },
  ' },
  worldtrees:  { icon:'&#x1F30D;', title:'World Trees',         sub:'Encyclopedia of 25 global trees' },
  leaderboard: { icon:'&#x1F3C6;', title:'Leaderboard',         sub:'Eco champions ranking' },
};

function showTab(id, btn) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.getElementById('tab-' + id).classList.add('active');

  // Update drawer active state
  document.querySelectorAll('.drawer-item').forEach(b => b.classList.remove('active'));
  const di = document.getElementById('di-' + id);
  if (di) di.classList.add('active');

  // Update tab header
  const meta = TAB_META[id] || {};
  document.getElementById('tabHeaderIcon').innerHTML  = meta.icon  || '';
  document.getElementById('tabHeaderTitle').textContent = meta.title || '';
  document.getElementById('tabHeaderSub').textContent   = meta.sub   || '';

  stopSpeech();
  closeDrawer();

  if (id === 'weather')    loadWeather();
  if (id === 'leaderboard') buildLeaderboard('schools');
  if (id === 'map')        { initMap(); buildLocationCards(); }
  if (id === 'qr')         { buildQRChips(); buildLangGrid(); }
  if (id === 'worldtrees') initWorldTrees();
  if (id === 'treeid') document.getElementById('tab-treeid') && (document.getElementById('tab-treeid').innerHTML = '<div style="padding:40px;text-align:center;color:var(--text3)">This feature has been removed.</div>');
}

// ── LOCATION CARDS (Map tab) ──
const LOCATION_DATA = [
  {
    icon: '&#x1F3EB;',
    name: 'Izee Business School',
    coord: '12.7799°N, 77.6481°E',
    zone: 'Jigani, Bengaluru',
    soil: 'Red laterite soil',
    climate: 'Tropical semi-arid',
    rainfall: '900 mm/year',
    crops: ['Ragi', 'Coconut', 'Mango', 'Vegetables'],
    trees: ['Mango', 'Neem', 'Peepal'],
    treeCount: 3
  },
  {
    icon: '&#x1F3ED;',
    name: 'Jigani Industrial Area',
    coord: '12.7990°N, 77.6650°E',
    zone: 'Jigani, Anekal Taluk',
    soil: 'Sandy loam',
    climate: 'Tropical dry',
    rainfall: '850 mm/year',
    crops: ['Silk cotton', 'Tamarind', 'Eucalyptus'],
    trees: ['Rain Tree', 'Gulmohar', 'Banyan'],
    treeCount: 3
  },
  {
    icon: '&#x1F3EB;',
    name: 'Christ Academy',
    coord: '12.8244°N, 77.6209°E',
    zone: 'Begur Koppa Road, Bengaluru',
    soil: 'Black cotton soil',
    climate: 'Tropical moist',
    rainfall: '970 mm/year',
    crops: ['Paddy', 'Sugarcane', 'Banana', 'Betel'],
    trees: ['Ashoka', 'Coconut Palm', 'Indian Oak'],
    treeCount: 3
  }
];

function buildLocationCards() {
  const box = document.getElementById('locationCards');
  if (!box || box.children.length > 0) return;
  LOCATION_DATA.forEach(loc => {
    const card = document.createElement('div');
    card.className = 'location-card';
    card.innerHTML = `
      <div class="lc-header">
        <div class="lc-icon">${loc.icon}</div>
        <div>
          <div class="lc-name">${loc.name}</div>
          <div class="lc-coord">${loc.coord}</div>
        </div>
      </div>
      <hr class="lc-divider"/>
      <div class="lc-row"><span class="lc-label">Zone</span><span class="lc-val">${loc.zone}</span></div>
      <div class="lc-row"><span class="lc-label">Soil type</span><span class="lc-val">${loc.soil}</span></div>
      <div class="lc-row"><span class="lc-label">Climate</span><span class="lc-val">${loc.climate}</span></div>
      <div class="lc-row"><span class="lc-label">Rainfall</span><span class="lc-val">${loc.rainfall}</span></div>
      <div class="lc-row"><span class="lc-label">Trees registered</span><span class="lc-val">${loc.treeCount}</span></div>
      <div class="lc-tags">
        ${loc.crops.map(c => `<span class="lc-tag green">${c}</span>`).join('')}
        ${loc.trees.map(t => `<span class="lc-tag">${t}</span>`).join('')}
      </div>
    `;
    box.appendChild(card);
  });
}

// ── UPDATE CARBON DISPLAY ──
const _origUpdateCarbon = typeof updateCarbon === 'function' ? updateCarbon : null;

// ── BOOT ──
document.addEventListener('DOMContentLoaded', () => {
  buildTreeTabs();
  randomSensors();
  setInterval(randomSensors, 5000);
  setTimeout(() => addTreeMsg(TREES[0].greeting, true), 400);
  buildFeed(SEED_REPORTS);
  updateCarbon();
  buildLeaderboard('schools');

  // Handle mobile QR scan: ?tree=IBS-001
  const params    = new URLSearchParams(window.location.search);
  const treeParam = params.get('tree');
  if (treeParam) {
    const treeId = treeParam.trim().toUpperCase();
    const tree   = MAP_MARKERS.find(m => m.id === treeId);
    if (tree) {
      setTimeout(() => {
        const qrBtn = document.getElementById('di-qr');
        showTab('qr', qrBtn);
        buildQRChips();
        document.getElementById('qrManualInput').value = tree.id;
        showQRResult(tree);
        showMobileBanner(tree);
      }, 600);
    }
  }
  console.log('Talking Trees loaded successfully');
});

function showMobileBanner(tree) {
  const existing = document.getElementById('mobileBanner');
  if (existing) existing.remove();
  const banner = document.createElement('div');
  banner.id = 'mobileBanner';
  banner.style.cssText = `position:fixed;top:0;left:0;right:0;z-index:999;background:var(--green);color:#fff;padding:12px 16px;text-align:center;font-family:var(--font-ui);font-size:13px;box-shadow:0 2px 12px rgba(0,0,0,0.2);animation:fadeIn 0.4s ease`;
  banner.innerHTML = `<strong>QR Scanned:</strong> ${tree.name} &middot; ${tree.location} <button onclick="this.parentElement.remove()" style="position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;color:#fff;font-size:18px;cursor:pointer">&#x2715;</button>`;
  document.body.prepend(banner);
  setTimeout(() => { if (banner.parentElement) banner.remove(); }, 5000);
}
