// ── TREE IDENTIFIER MODULE ──
let tiUploadedFile = null;
let tiResultData   = null;
let tiActiveTab    = 'overview';

function handleTreeIDUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  tiUploadedFile = file;
  const reader = new FileReader();
  reader.onload = ev => {
    const preview = document.getElementById('tiPreview');
    preview.src = ev.target.result;
    preview.style.display = 'block';
    document.getElementById('tiAnalyzeBtn').style.display = 'block';
    document.getElementById('tiResult').style.display = 'none';
  };
  reader.readAsDataURL(file);
}

async function identifyTree() {
  const result = document.getElementById('tiResult');
  result.style.display = 'block';
  document.getElementById('tiName').textContent  = 'Identifying tree...';
  document.getElementById('tiLatin').textContent = '';
  document.getElementById('tiOrigin').textContent = '';
  document.getElementById('tiTabContent').innerHTML = `
    <div class="ai-thinking" style="justify-content:center;padding:20px">
      <div class="aidot"></div><div class="aidot"></div><div class="aidot"></div>
    </div>`;

  const reader = new FileReader();
  reader.onload = async ev => {
    const b64 = ev.target.result.split(',')[1];
    const mt  = tiUploadedFile.type || 'image/jpeg';
    try {
      const resp = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 2000,
          messages: [{
            role: 'user',
            content: [
              { type: 'image', source: { type: 'base64', media_type: mt, data: b64 } },
              { type: 'text', text: `You are a world-class botanist and tree expert AI. Analyze this tree image and provide comprehensive details.
Respond ONLY with a valid JSON object (no markdown, no backticks):
{
  "common_name": "string",
  "scientific_name": "string", 
  "family": "string",
  "emoji": "single tree emoji",
  "confidence": 92,
  "origin": "string (countries/continents of origin)",
  "climate_zone": "string",
  "overview": "3-4 sentence description of the tree",
  "height": "typical height range",
  "lifespan": "typical lifespan",
  "growth_rate": "slow/medium/fast",
  "carbon_absorption": "estimated kg CO2 per year",
  "medicinal": {
    "uses": ["use1", "use2", "use3"],
    "parts_used": "string",
    "traditional_medicine": "2-3 sentence description"
  },
  "climate": {
    "zones": "string",
    "temperature_range": "string",
    "rainfall": "string",
    "drought_tolerance": "low/medium/high",
    "environmental_benefits": ["benefit1", "benefit2", "benefit3"]
  },
  "uses": {
    "timber": "string or null",
    "food": "string or null", 
    "cultural": "string",
    "industrial": "string or null",
    "ornamental": "string"
  },
  "fun_facts": ["fact1", "fact2", "fact3", "fact4"],
  "care_tips": ["tip1", "tip2", "tip3"],
  "found_in_india": "string — which states/regions in India this tree is found",
  "conservation_status": "string"
}` }
            ]
          }]
        })
      });
      const data   = await resp.json();
      const text   = data.content.map(i => i.text || '').join('');
      const parsed = JSON.parse(text.replace(/```json|```/g, '').trim());
      tiResultData = parsed;
      renderTIResult(parsed);
    } catch (err) {
      document.getElementById('tiName').textContent = 'Could not identify';
      document.getElementById('tiTabContent').innerHTML = `
        <div style="color:rgba(255,255,255,0.5);font-size:13px;padding:16px;text-align:center">
          Add your Anthropic API key in js/leafAI.js to enable AI tree identification.<br><br>
          Make sure the photo clearly shows the tree trunk, leaves or overall shape.
        </div>`;
    }
  };
  reader.readAsDataURL(tiUploadedFile);
}

function renderTIResult(d) {
  document.getElementById('tiEmoji').textContent   = d.emoji || '🌳';
  document.getElementById('tiName').textContent    = d.common_name;
  document.getElementById('tiLatin').textContent   = d.scientific_name + ' · ' + d.family;
  document.getElementById('tiOrigin').textContent  = '📍 ' + d.origin;
  document.getElementById('tiConf').textContent    = d.confidence + '%';
  switchTITab('overview', document.querySelector('.ti-tab'));
  addEcoPoints(25);
}

function switchTITab(tab, btn) {
  tiActiveTab = tab;
  document.querySelectorAll('.ti-tab').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const d = tiResultData;
  if (!d) return;
  const content = document.getElementById('tiTabContent');

  if (tab === 'overview') {
    content.innerHTML = `
      <div class="ti-section">${d.overview}</div>
      <div class="ti-stats-grid">
        <div class="ti-stat"><div class="ti-stat-v">${d.height}</div><div class="ti-stat-l">Height</div></div>
        <div class="ti-stat"><div class="ti-stat-v">${d.lifespan}</div><div class="ti-stat-l">Lifespan</div></div>
        <div class="ti-stat"><div class="ti-stat-v">${d.growth_rate}</div><div class="ti-stat-l">Growth Rate</div></div>
        <div class="ti-stat"><div class="ti-stat-v">${d.carbon_absorption}</div><div class="ti-stat-l">CO₂/year</div></div>
      </div>
      <div class="ti-info-row"><span class="ti-label">🗺️ Found in India</span><span class="ti-val">${d.found_in_india}</span></div>
      <div class="ti-info-row"><span class="ti-label">🛡️ Conservation</span><span class="ti-val">${d.conservation_status}</span></div>
      <div class="ti-care-title">🌱 Care Tips</div>
      ${d.care_tips.map(t => `<div class="ti-care-tip">• ${t}</div>`).join('')}
    `;
  } else if (tab === 'medicinal') {
    content.innerHTML = `
      <div class="ti-section">${d.medicinal.traditional_medicine}</div>
      <div class="ti-info-row"><span class="ti-label">🌿 Parts Used</span><span class="ti-val">${d.medicinal.parts_used}</span></div>
      <div class="ti-care-title">Medicinal Uses</div>
      ${d.medicinal.uses.map(u => `<div class="ti-med-item">💊 ${u}</div>`).join('')}
    `;
  } else if (tab === 'climate') {
    content.innerHTML = `
      <div class="ti-stats-grid">
        <div class="ti-stat"><div class="ti-stat-v">${d.climate.zones}</div><div class="ti-stat-l">Climate Zone</div></div>
        <div class="ti-stat"><div class="ti-stat-v">${d.climate.temperature_range}</div><div class="ti-stat-l">Temp Range</div></div>
        <div class="ti-stat"><div class="ti-stat-v">${d.climate.rainfall}</div><div class="ti-stat-l">Rainfall</div></div>
        <div class="ti-stat"><div class="ti-stat-v">${d.climate.drought_tolerance}</div><div class="ti-stat-l">Drought Tolerance</div></div>
      </div>
      <div class="ti-care-title">🌍 Environmental Benefits</div>
      ${d.climate.environmental_benefits.map(b => `<div class="ti-care-tip">🌱 ${b}</div>`).join('')}
    `;
  } else if (tab === 'uses') {
    content.innerHTML = `
      ${d.uses.timber  ? `<div class="ti-info-row"><span class="ti-label">🪵 Timber</span><span class="ti-val">${d.uses.timber}</span></div>` : ''}
      ${d.uses.food    ? `<div class="ti-info-row"><span class="ti-label">🍎 Food</span><span class="ti-val">${d.uses.food}</span></div>` : ''}
      ${d.uses.cultural? `<div class="ti-info-row"><span class="ti-label">🏛️ Cultural</span><span class="ti-val">${d.uses.cultural}</span></div>` : ''}
      ${d.uses.industrial?`<div class="ti-info-row"><span class="ti-label">🏭 Industrial</span><span class="ti-val">${d.uses.industrial}</span></div>`:''}
      <div class="ti-info-row"><span class="ti-label">🌸 Ornamental</span><span class="ti-val">${d.uses.ornamental}</span></div>
    `;
  } else if (tab === 'facts') {
    content.innerHTML = d.fun_facts.map((f, i) =>
      `<div class="ti-fact"><span class="ti-fact-num">${i+1}</span><span>${f}</span></div>`
    ).join('');
  }
}

function speakTreeID() {
  if (!tiResultData) return;
  const d   = tiResultData;
  const btn = document.getElementById('tiSpeakBtn');
  if (currentUtterance) { stopSpeech(); btn.innerHTML = '🔊 Hear Full Details'; return; }
  const txt = `This tree is the ${d.common_name}, scientifically known as ${d.scientific_name} of the ${d.family} family. 
    ${d.overview} 
    It originated in ${d.origin} and grows in ${d.climate.zones} climate zones. 
    It can grow up to ${d.height} tall and lives for ${d.lifespan}. 
    It absorbs approximately ${d.carbon_absorption} of carbon dioxide every year. 
    In India, it is found in ${d.found_in_india}. 
    Medicinally, ${d.medicinal.traditional_medicine} 
    Some fun facts: ${d.fun_facts.slice(0,2).join('. ')}.`;
  btn.innerHTML = '⏹ Stop';
  speakText(txt, { rate: 0.88, pitch: 0.85, onend: () => { btn.innerHTML = '🔊 Hear Full Details'; } });
}
