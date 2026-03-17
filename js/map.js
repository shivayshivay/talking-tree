<<<<<<< HEAD
// ── REAL GPS MAP MODULE (Leaflet.js) ──
let leafletMap = null;

function initMap() {
  if (leafletMap) return;

  leafletMap = L.map('real-map', { zoomControl: true }).setView([12.808, 77.640], 13);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap © CartoDB',
    subdomains: 'abcd', maxZoom: 19
  }).addTo(leafletMap);

  const locationGroups = {
    'Izee Business School, Jigani':      { label: 'IZEE BUSINESS SCHOOL', color: '#66bb6a' },
    'Jigani Industrial Area, Bangalore': { label: 'JIGANI INDUSTRIAL AREA', color: '#81d4fa' },
    'Christ Academy, Begur Koppa Road':  { label: 'CHRIST ACADEMY', color: '#ce93d8' },
  };

  Object.entries(locationGroups).forEach(([loc, info]) => {
    const trees = MAP_MARKERS.filter(m => m.location === loc);
    if (!trees.length) return;
    const avgLat = trees.reduce((s, t) => s + t.lat, 0) / trees.length;
    const avgLng = trees.reduce((s, t) => s + t.lng, 0) / trees.length;
    L.circle([avgLat, avgLng], {
      radius: 150, color: info.color, fillColor: info.color,
      fillOpacity: 0.07, weight: 1, dashArray: '4 4'
    }).addTo(leafletMap);
    L.marker([avgLat - 0.0012, avgLng], {
      icon: L.divIcon({
        className: '',
        html: `<div style="font-size:9px;color:${info.color};letter-spacing:1px;white-space:nowrap;font-family:sans-serif;font-weight:500;text-shadow:0 1px 3px #000">${info.label}</div>`,
        iconAnchor: [60, 0]
=======
// 🌍 REAL GPS MAP MODULE (FINAL AI + MOBILE READY)
let leafletMap = null;

// 🔥 CHANGE THIS IF USING NGROK
const API_BASE = "https://ngrok.com/docs/errors/err_ngrok_334";
// 👉 replace with: https://your-ngrok-url.ngrok-free.app

// 🌾 CROPS DATA
const CROPS = {
  "Izee Business School, Jigani": ["Ragi 🌾", "Vegetables 🥬"],
  "Jigani Industrial Area, Bangalore": ["Millets 🌾", "Groundnut 🥜"],
  "Christ Academy, Begur": ["Coconut 🥥", "Banana 🍌"],
  "Delhi Central Park": ["Wheat 🌾", "Mustard 🌼"],
  "Mumbai Marine Drive": ["Rice 🍚", "Mango 🥭"],
  "Chennai City Green Zone": ["Rice 🍚", "Sugarcane 🍬"]
};

// 🧠 AI TREE SPEAK FUNCTION (CONNECTED TO BACKEND)
async function handleTreeClick(tree) {
  try {
    const res = await fetch(`${API_BASE}/api/ai-tree-info`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: tree.name })
    });

    const data = await res.json();

    const text = data.response || `I am a ${tree.name}`;

    // 🎤 Personality voice
    if (typeof speakTreeWithPersonality === "function") {
      speakTreeWithPersonality(text, tree.id);
    } else {
      speakText(text);
    }

  } catch (err) {
    console.error("AI ERROR:", err);

    // fallback
    speakText(`I am a ${tree.name}. I help nature and humans.`);
  }
}

function initMap() {
  if (leafletMap) return;

  leafletMap = L.map('real-map', {
    zoomControl: true,
    zoomSnap: 0.25,
    zoomDelta: 0.5
  }).setView([20.5937, 78.9629], 5);

  // 🌍 REALISTIC TILE
  L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap',
    maxZoom: 19
  }).addTo(leafletMap);

  // 🌆 CITY GROUPS
  const locationGroups = {
    'Izee Business School, Jigani': { label: 'IZEE', color: '#66bb6a' },
    'Jigani Industrial Area, Bangalore': { label: 'JIGANI', color: '#4fc3f7' },
    'Christ Academy, Begur': { label: 'CHRIST', color: '#ba68c8' },
    'Delhi Central Park': { label: 'DELHI', color: '#ff8a65' },
    'Mumbai Marine Drive': { label: 'MUMBAI', color: '#ffd54f' },
    'Chennai City Green Zone': { label: 'CHENNAI', color: '#4db6ac' }
  };

  // 🌐 DRAW ZONES
  Object.entries(locationGroups).forEach(([loc, info]) => {
    const trees = MAP_MARKERS.filter(t => t.location === loc);
    if (!trees.length) return;

    const avgLat = trees.reduce((s, t) => s + t.lat, 0) / trees.length;
    const avgLng = trees.reduce((s, t) => s + t.lng, 0) / trees.length;

    L.circle([avgLat, avgLng], {
      radius: 300,
      color: info.color,
      fillColor: info.color,
      fillOpacity: 0.06
    }).addTo(leafletMap);

    L.marker([avgLat - 0.002, avgLng], {
      icon: L.divIcon({
        html: `<div style="
          font-size:11px;
          color:${info.color};
          font-weight:600;
          text-shadow:0 0 8px #000;
        ">${info.label}</div>`
>>>>>>> 0266752 (Talking Trees - Smart City AI & IoT Project)
      })
    }).addTo(leafletMap);
  });

<<<<<<< HEAD
  MAP_MARKERS.forEach((tree) => {
    const color = tree.health === 'good' ? '#66bb6a' : tree.health === 'warn' ? '#ffb74d' : '#ef5350';
    const ring  = tree.health === 'good' ? '#2e7d32' : tree.health === 'warn' ? '#e65100' : '#b71c1c';
    const icon = L.divIcon({
      className: '',
      html: `<div style="text-align:center;position:relative">
        <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:30px;height:30px;border-radius:50%;background:${color}33;border:1.5px solid ${color}"></div>
        <div style="font-size:22px;line-height:1;position:relative;z-index:2;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.7))">${tree.emoji}</div>
      </div>`,
      iconSize: [32, 32], iconAnchor: [16, 16]
    });
    const marker = L.marker([tree.lat, tree.lng], { icon }).addTo(leafletMap);
    const statusLabel = tree.health === 'good' ? '✅ Healthy' : tree.health === 'warn' ? '⚠️ Moderate' : '🔴 Stressed';
    marker.bindPopup(`
      <div style="font-family:sans-serif;min-width:180px">
        <div style="font-size:20px;margin-bottom:4px">${tree.emoji}</div>
        <div style="font-weight:500;font-size:14px;color:#1b5e20">${tree.name}</div>
        <div style="font-size:11px;color:#555;margin-bottom:4px;font-style:italic">${tree.species}</div>
        <div style="font-size:11px;color:#388e3c;margin-bottom:8px">📍 ${tree.location}</div>
        <table style="width:100%;font-size:12px;border-collapse:collapse">
          <tr><td style="padding:2px 0;color:#666">🌡️ Temp</td><td style="text-align:right;font-weight:500">${tree.temp}°C</td></tr>
          <tr><td style="padding:2px 0;color:#666">💧 Moisture</td><td style="text-align:right;font-weight:500">${tree.moist}%</td></tr>
          <tr><td style="padding:2px 0;color:#666">🌫️ AQI</td><td style="text-align:right;font-weight:500">${tree.aqi}</td></tr>
          <tr><td style="padding:2px 0;color:#666">🌿 CO₂/yr</td><td style="text-align:right;font-weight:500">${tree.co2}</td></tr>
          <tr><td style="padding:2px 0;color:#666">🎂 Age</td><td style="text-align:right;font-weight:500">${tree.age}</td></tr>
          <tr><td style="padding:2px 0;color:#666">🆔 ID</td><td style="text-align:right;font-weight:500">${tree.id}</td></tr>
        </table>
        <div style="margin-top:8px;padding:4px 8px;border-radius:12px;font-size:11px;text-align:center;background:${color}22;color:${ring};border:1px solid ${color}">${statusLabel}</div>
      </div>
    `, { maxWidth: 220 });
  });

  setTimeout(() => leafletMap.invalidateSize(), 100);
}
=======
  // 🌳 TREE MARKERS
  MAP_MARKERS.forEach((tree) => {

    const color =
      tree.health === 'good' ? '#66bb6a' :
        tree.health === 'warn' ? '#ffb74d' : '#ef5350';

    const icon = L.divIcon({
      html: `
        <div style="position:relative;text-align:center">
          <div style="
            position:absolute;
            top:50%;left:50%;
            transform:translate(-50%,-50%);
            width:45px;height:45px;
            border-radius:50%;
            background:${color}22;
            box-shadow:0 0 15px ${color};
          "></div>

          <div style="
            font-size:26px;
            position:relative;
            z-index:2;
          ">${tree.emoji}</div>
        </div>
      `,
      iconSize: [45, 45],
      iconAnchor: [22, 22]
    });

    const marker = L.marker([tree.lat, tree.lng], { icon }).addTo(leafletMap);

    // ✅ MOBILE SAFE CLICK (prevents double trigger)
    let clicked = false;
    marker.on('click', () => {
      if (clicked) return;
      clicked = true;
      handleTreeClick(tree);
      setTimeout(() => clicked = false, 500);
    });

    const crops = CROPS[tree.location] || ["Mixed 🌾"];

    const status =
      tree.health === 'good' ? '🟢 Healthy' :
        tree.health === 'warn' ? '🟡 Moderate' : '🔴 Stressed';

    // 💎 POPUP
    marker.bindPopup(`
      <div style="
        font-family:sans-serif;
        background:#111;
        color:#eee;
        border-radius:12px;
        padding:10px;
        min-width:220px;
      ">
        <div style="font-size:26px">${tree.emoji}</div>

        <div style="font-weight:600;font-size:15px">
          ${tree.name}
        </div>

        <div style="font-size:11px;color:#aaa">
          ${tree.species}
        </div>

        <div style="font-size:11px;color:#66bb6a;margin-bottom:6px">
          📍 ${tree.location}
        </div>

        <div style="font-size:12px">
          🌡️ ${tree.temp}°C | 💧 ${tree.moist}% <br>
          🌫️ AQI ${tree.aqi} <br>
          🌿 CO₂: ${tree.co2} <br>
          🎂 Age: ${tree.age}
        </div>

        <div style="
          margin-top:6px;
          font-size:11px;
          color:#81c784;
        ">
          🌾 Crops: ${crops.join(", ")}
        </div>

        <div style="
          margin-top:8px;
          padding:5px;
          border-radius:10px;
          text-align:center;
          font-size:11px;
          background:${color}22;
          border:1px solid ${color};
        ">
          ${status}
        </div>

        <div style="
          font-size:10px;
          margin-top:6px;
          text-align:right;
          color:#777;
        ">
          ID: ${tree.id}
        </div>
      </div>
    `);
  });

  setTimeout(() => leafletMap.invalidateSize(), 200);
}
>>>>>>> 0266752 (Talking Trees - Smart City AI & IoT Project)
