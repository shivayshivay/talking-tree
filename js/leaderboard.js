// ── LEADERBOARD MODULE ──
let currentLbType = 'schools';
const RANK_MEDALS  = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];

async function buildLeaderboard(type) {
  currentLbType = type;
  const list = document.getElementById('lb-list');
  list.innerHTML = '<div style="padding:20px;text-align:center;color:rgba(255,255,255,0.4);font-size:12px">Loading...</div>';

  // Try backend first, fall back to static data
  const backendData = await fetchLeaderboardFromBackend(type);
  const items = backendData || LB_DATA[type];
  list.innerHTML = '';
  items.forEach((item, i) => {
    const div = document.createElement('div');
    div.className = 'lb-item' + (i === 0 ? ' gold' : i === 1 ? ' silver' : i === 2 ? ' bronze' : '');
    const name = item.name || item.username;
    const meta = item.meta || (item.actions_count ? `${item.actions_count} actions` : '');
    div.innerHTML = `
      <div class="lb-rank">${RANK_MEDALS[i] || (i + 1)}</div>
      <div class="lb-avatar">${item.avatar || '🌱'}</div>
      <div class="lb-info">
        <div class="lb-name">${name}</div>
        <div class="lb-meta">${meta}</div>
        <span class="lb-badge">${item.badge || ''}</span>
      </div>
      <div class="lb-pts">${(item.pts || item.points || 0).toLocaleString()} pts</div>
    `;
    list.appendChild(div);
  });

  const userRank = Math.floor(Math.random() * 10) + 10;
  const lbyRank  = document.getElementById('lby-rank');
  if (lbyRank) lbyRank.textContent = userRank;
}

function switchLb(type, btn) {
  document.querySelectorAll('.lb-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  buildLeaderboard(type);
}
