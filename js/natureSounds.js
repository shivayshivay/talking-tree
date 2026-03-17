// ── NATURE SOUNDS ENGINE ──
// Generates ambient nature sounds using Web Audio API (no files needed!)
// Wind + Birds + River + Leaves — all synthesized in-browser

let natureCtx       = null;
let natureNodes     = [];
let naturePlaying   = false;
let masterGain      = null;
let fadeInterval    = null;

function initNatureAudio() {
  if (natureCtx) return;
  natureCtx  = new (window.AudioContext || window.webkitAudioContext)();
  masterGain = natureCtx.createGain();
  masterGain.gain.value = 0;
  masterGain.connect(natureCtx.destination);
}

// ── WIND — filtered white noise ──
function createWind(volume = 0.18) {
  const bufferSize = natureCtx.sampleRate * 3;
  const buffer     = natureCtx.createBuffer(1, bufferSize, natureCtx.sampleRate);
  const data       = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

  const source  = natureCtx.createBufferSource();
  source.buffer = buffer;
  source.loop   = true;

  // Low-pass filter for soft wind whoosh
  const filter      = natureCtx.createBiquadFilter();
  filter.type       = 'lowpass';
  filter.frequency.value = 400;
  filter.Q.value    = 0.5;

  // LFO for gentle wind variation
  const lfo       = natureCtx.createOscillator();
  const lfoGain   = natureCtx.createGain();
  lfo.frequency.value  = 0.08;
  lfoGain.gain.value   = 80;
  lfo.connect(lfoGain);
  lfoGain.connect(filter.frequency);
  lfo.start();

  const gain       = natureCtx.createGain();
  gain.gain.value  = volume;

  source.connect(filter);
  filter.connect(gain);
  gain.connect(masterGain);
  source.start();

  return [source, filter, lfo, lfoGain, gain];
}

// ── RIVER — brown noise (low-frequency) ──
function createRiver(volume = 0.12) {
  const bufferSize = natureCtx.sampleRate * 4;
  const buffer     = natureCtx.createBuffer(1, bufferSize, natureCtx.sampleRate);
  const data       = buffer.getChannelData(0);
  let lastOut = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    data[i]  = (lastOut + (0.02 * white)) / 1.02;
    lastOut  = data[i];
    data[i] *= 3.5;
  }

  const source  = natureCtx.createBufferSource();
  source.buffer = buffer;
  source.loop   = true;

  const filter      = natureCtx.createBiquadFilter();
  filter.type       = 'bandpass';
  filter.frequency.value = 600;
  filter.Q.value    = 0.8;

  const gain       = natureCtx.createGain();
  gain.gain.value  = volume;

  source.connect(filter);
  filter.connect(gain);
  gain.connect(masterGain);
  source.start();
  return [source, gain];
}

// ── LEAVES RUSTLE — high-freq filtered noise bursts ──
function createLeaves(volume = 0.08) {
  const gain      = natureCtx.createGain();
  gain.gain.value = volume;
  gain.connect(masterGain);
  const nodes = [gain];

  function rustleBurst() {
    if (!naturePlaying) return;
    const bufSize = natureCtx.sampleRate * 0.15;
    const buf     = natureCtx.createBuffer(1, bufSize, natureCtx.sampleRate);
    const d       = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) d[i] = (Math.random() * 2 - 1) * Math.sin(Math.PI * i / bufSize);
    const src     = natureCtx.createBufferSource();
    src.buffer    = buf;
    const f       = natureCtx.createBiquadFilter();
    f.type        = 'highpass';
    f.frequency.value = 2000;
    const g       = natureCtx.createGain();
    g.gain.value  = 0.3 + Math.random() * 0.4;
    src.connect(f); f.connect(g); g.connect(gain);
    src.start();
    setTimeout(rustleBurst, 800 + Math.random() * 2500);
  }
  setTimeout(rustleBurst, 500);
  return nodes;
}

// ── BIRD CALLS — sine wave chirps ──
function createBirds() {
  const gain      = natureCtx.createGain();
  gain.gain.value = 0.15;
  gain.connect(masterGain);

  function chirp() {
    if (!naturePlaying) return;
    // Random bird type
    const types = [
      { freqs: [2400, 2800, 2200], dur: 0.12, pattern: 3 },  // small bird trill
      { freqs: [1200, 1600, 1400], dur: 0.18, pattern: 2 },  // medium bird
      { freqs: [800,  1000, 900],  dur: 0.25, pattern: 2 },  // cuckoo-like
      { freqs: [3200, 3500, 3100], dur: 0.08, pattern: 4 },  // warbler
    ];
    const type  = types[Math.floor(Math.random() * types.length)];
    const vol   = 0.15 + Math.random() * 0.25;

    for (let i = 0; i < type.pattern; i++) {
      setTimeout(() => {
        if (!naturePlaying) return;
        const osc  = natureCtx.createOscillator();
        const env  = natureCtx.createGain();
        const freq = type.freqs[i % type.freqs.length] + (Math.random() * 200 - 100);

        osc.type           = 'sine';
        osc.frequency.value = freq;
        env.gain.setValueAtTime(0, natureCtx.currentTime);
        env.gain.linearRampToValueAtTime(vol, natureCtx.currentTime + 0.01);
        env.gain.exponentialRampToValueAtTime(0.001, natureCtx.currentTime + type.dur);

        // Frequency sweep for natural chirp
        osc.frequency.setValueAtTime(freq * 0.9, natureCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(freq * 1.1, natureCtx.currentTime + type.dur * 0.5);
        osc.frequency.linearRampToValueAtTime(freq * 0.95, natureCtx.currentTime + type.dur);

        osc.connect(env);
        env.connect(gain);
        osc.start(natureCtx.currentTime);
        osc.stop(natureCtx.currentTime + type.dur + 0.02);
      }, i * (type.dur * 1000 + 60));
    }
    // Next chirp after random interval
    setTimeout(chirp, 1500 + Math.random() * 5000);
  }
  setTimeout(chirp, Math.random() * 2000);
  return [gain];
}

// ── DISTANT WATER DROPS — occasional drips ──
function createWaterDrops() {
  const gain      = natureCtx.createGain();
  gain.gain.value = 0.1;
  gain.connect(masterGain);

  function drop() {
    if (!naturePlaying) return;
    const osc   = natureCtx.createOscillator();
    const env   = natureCtx.createGain();
    const freq  = 600 + Math.random() * 400;
    osc.type    = 'sine';
    osc.frequency.setValueAtTime(freq, natureCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.3, natureCtx.currentTime + 0.3);
    env.gain.setValueAtTime(0.4, natureCtx.currentTime);
    env.gain.exponentialRampToValueAtTime(0.001, natureCtx.currentTime + 0.3);
    osc.connect(env); env.connect(gain);
    osc.start(natureCtx.currentTime);
    osc.stop(natureCtx.currentTime + 0.35);
    setTimeout(drop, 3000 + Math.random() * 8000);
  }
  setTimeout(drop, 2000);
  return [gain];
}

// ── START nature sounds ──
function startNatureSounds(volumeLevel = 0.6) {
  if (naturePlaying) return;
  try {
    initNatureAudio();
    if (natureCtx.state === 'suspended') natureCtx.resume();
    naturePlaying = true;

    // Create all layers
    const wind   = createWind(0.18);
    const river  = createRiver(0.12);
    const leaves = createLeaves(0.08);
    const birds  = createBirds();
    const drops  = createWaterDrops();
    natureNodes  = [...wind, ...river, ...leaves, ...birds, ...drops];

    // Fade in gently
    masterGain.gain.setValueAtTime(0, natureCtx.currentTime);
    masterGain.gain.linearRampToValueAtTime(volumeLevel, natureCtx.currentTime + 2.5);

    updateNatureUI(true);
  } catch(e) {
    console.warn('Nature sounds error:', e);
  }
}

// ── STOP nature sounds ──
function stopNatureSounds() {
  if (!naturePlaying || !masterGain) return;
  naturePlaying = false;

  // Fade out gently
  masterGain.gain.linearRampToValueAtTime(0, natureCtx.currentTime + 1.5);
  setTimeout(() => {
    natureNodes.forEach(n => { try { if (n.stop) n.stop(); if (n.disconnect) n.disconnect(); } catch(e){} });
    natureNodes = [];
    if (natureCtx) { natureCtx.close(); natureCtx = null; masterGain = null; }
  }, 1600);

  updateNatureUI(false);
}

// ── TOGGLE ──
function toggleNatureSounds() {
  if (naturePlaying) stopNatureSounds();
  else startNatureSounds();
}

function setNatureVolume(val) {
  if (!masterGain) return;
  masterGain.gain.linearRampToValueAtTime(parseFloat(val), natureCtx.currentTime + 0.3);
}

function updateNatureUI(playing) {
  document.querySelectorAll('.nature-toggle-btn').forEach(btn => {
    btn.classList.toggle('active', playing);
    btn.innerHTML = playing ? '🌿 Nature Sounds ON' : '🌿 Nature Sounds';
  });
  const slider = document.getElementById('natureVolSlider');
  if (slider) slider.style.display = playing ? 'block' : 'none';
}
