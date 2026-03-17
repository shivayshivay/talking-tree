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
      })
    }).addTo(leafletMap);
  });

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
