// ── LEAF AI MODULE ──
// Replace with your Anthropic API key for real AI analysis
// For demo purposes, the demo samples work without an API key
const ANTHROPIC_API_KEY = 'YOUR_API_KEY_HERE';
let uploadedImage = null;

function handleLeafUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  uploadedImage = file;
  const reader = new FileReader();
  reader.onload = ev => {
    const img = document.getElementById('leafPreview');
    img.src = ev.target.result;
    img.style.display = 'block';
    document.getElementById('analyzeBtn').style.display = 'block';
    document.getElementById('aiResult').style.display   = 'none';
  };
  reader.readAsDataURL(file);
}

async function analyzeLeaf() {
  const result = document.getElementById('aiResult');
  result.style.display = 'block';
  document.getElementById('aiResultTitle').textContent = 'Analyzing...';
  document.getElementById('aiResultBody').innerHTML    = '<div class="ai-thinking"><div class="aidot"></div><div class="aidot"></div><div class="aidot"></div></div>';
  document.getElementById('aiStatusIcon').textContent = '🔬';

  const reader = new FileReader();
  reader.onload = async ev => {
    const b64 = ev.target.result.split(',')[1];
    const mt  = uploadedImage.type || 'image/jpeg';
    try {
      const resp = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: [
              { type: 'image', source: { type: 'base64', media_type: mt, data: b64 } },
              { type: 'text',  text: 'You are an expert botanist AI for the Talking Trees smart city project. Analyze this leaf image. Respond ONLY with valid JSON (no markdown, no backticks): {"status":"...","emoji":"...","diagnosis":"...","confidence":90,"tips":["...","..."]}' }
            ]
          }]
        })
      });
      const data   = await resp.json();
      const text   = data.content.map(i => i.text || '').join('');
      const parsed = JSON.parse(text.replace(/```json|```/g, '').trim());
      showLeafResult(parsed.emoji || '🍃', parsed.status, parsed.diagnosis, parsed.confidence, parsed.tips);
    } catch (err) {
      document.getElementById('aiResultTitle').textContent = 'Analysis Complete';
      document.getElementById('aiResultBody').innerHTML    = '<p>Could not connect to AI. Please check your API key in js/leafAI.js and try again, or use the demo samples below.</p>';
    }
  };
  reader.readAsDataURL(uploadedImage);
}

function runDemoLeaf(type) {
  const d = DEMO_LEAVES[type];
  showLeafResult(d.emoji, d.status, d.diagnosis, d.confidence, d.tips);
}

function showLeafResult(emoji, status, diagnosis, confidence, tips) {
  document.getElementById('aiResult').style.display    = 'block';
  document.getElementById('aiStatusIcon').textContent  = emoji;
  document.getElementById('aiResultTitle').textContent = status;
  document.getElementById('aiResultBody').innerHTML = `
    <p>${diagnosis}</p>
    <div class="conf-row">
      <span class="conf-label">Confidence</span>
      <div class="conf-bar"><div class="conf-fill" style="width:${confidence}%"></div></div>
      <span style="font-size:11px;color:rgba(255,255,255,0.5)">${confidence}%</span>
    </div>
    <div class="care-title">Care Tips</div>
    ${tips.map(t => `<div class="care-tip">• ${t}</div>`).join('')}
  `;
}
