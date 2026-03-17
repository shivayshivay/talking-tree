// ── BACKEND API CONNECTOR ──
// Connects frontend to Flask + MongoDB backend
// If backend is offline, falls back to simulated data gracefully

const API_BASE = "http://localhost:5000/api";
let backendOnline = false;

// Check if backend is reachable
async function checkBackend() {
  try {
    const res = await fetch("http://localhost:5000/", { signal: AbortSignal.timeout(2000) });
    if (res.ok) {
      backendOnline = true;
      showBackendStatus(true);
      console.log("✅ Backend connected — Flask + MongoDB active");
    }
  } catch {
    backendOnline = false;
    showBackendStatus(false);
    console.warn("⚠️ Backend offline — using simulated data");
  }
}

function showBackendStatus(online) {
  // Inject a small status indicator into the topbar
  const existing = document.getElementById("backend-status");
  if (existing) existing.remove();
  const pill = document.createElement("span");
  pill.id = "backend-status";
  pill.style.cssText = `font-size:10px;padding:3px 9px;border-radius:20px;border:0.5px solid;
    background:${online ? "rgba(102,187,106,0.15)" : "rgba(255,183,77,0.15)"};
    color:${online ? "#a5d6a7" : "#ffe082"};
    border-color:${online ? "rgba(102,187,106,0.4)" : "rgba(255,183,77,0.4)"}`;
  pill.textContent = online ? "⚡ Backend Live" : "📡 Demo Mode";
  document.querySelector(".topbar-right").prepend(pill);
}

// ── SENSOR API ──
async function fetchSensorsFromBackend(treeId) {
  if (!backendOnline) return null;
  try {
    const res  = await fetch(`${API_BASE}/sensors/${treeId}`);
    const json = await res.json();
    return json.success ? json.data : null;
  } catch { return null; }
}

async function fetchAllSensorsFromBackend() {
  if (!backendOnline) return null;
  try {
    const res  = await fetch(`${API_BASE}/sensors/`);
    const json = await res.json();
    return json.success ? json.data : null;
  } catch { return null; }
}

// ── REPORTS API ──
async function fetchReportsFromBackend() {
  if (!backendOnline) return null;
  try {
    const res  = await fetch(`${API_BASE}/reports/`);
    const json = await res.json();
    return json.success ? json.data : null;
  } catch { return null; }
}

async function submitReportToBackend(reportData) {
  if (!backendOnline) return null;
  try {
    const res  = await fetch(`${API_BASE}/reports/`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(reportData),
    });
    const json = await res.json();
    return json;
  } catch { return null; }
}

// ── ECO POINTS API ──
async function addPointsToBackend(username, action) {
  if (!backendOnline) return null;
  try {
    const res  = await fetch(`${API_BASE}/ecopoints/add`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ username, action }),
    });
    const json = await res.json();
    return json;
  } catch { return null; }
}

async function fetchLeaderboardFromBackend(category = "users") {
  if (!backendOnline) return null;
  try {
    const res  = await fetch(`${API_BASE}/ecopoints/leaderboard?category=${category}`);
    const json = await res.json();
    return json.success ? json.leaderboard : null;
  } catch { return null; }
}

// Boot — check backend on page load
window.addEventListener("DOMContentLoaded", () => {
  checkBackend();
  // Re-check every 30 seconds
  setInterval(checkBackend, 30000);
});
