// ── COMMUNITY MODULE ──
let currentSev = 'low';
let allReports = [...SEED_REPORTS];

function buildFeed(reports) {
  const feed = document.getElementById('reportFeed');
  feed.innerHTML = '';
  reports.forEach(r => {
    const d = document.createElement('div');
    d.className = 'report-item';
    d.innerHTML = `
      <div class="ricon">${r.icon}</div>
      <div>
        <div class="rtitle">${r.title}</div>
        <div class="rmeta">${r.tree} · ${r.time}</div>
        <span class="rstatus ${r.status}">${r.statusText}</span>
      </div>
    `;
    feed.appendChild(d);
  });
}

function setSev(btn, sev) {
  document.querySelectorAll('.sev-btn').forEach(b => b.classList.remove('active-sev', 'warn-sev', 'bad-sev'));
  currentSev = sev;
  if (sev === 'low')    btn.classList.add('active-sev');
  else if (sev === 'medium') btn.classList.add('warn-sev');
  else                  btn.classList.add('bad-sev');
}

async function submitReport() {
  const treeSelect = document.getElementById('r-tree');
  const tree    = treeSelect.value.split(' — ')[0];
  const treeIds = ["IBS-001","WF-012","LB-007","MG-023"];
  const treeId  = treeIds[treeSelect.selectedIndex] || "IBS-001";
  const issue   = document.getElementById('r-issue').value.replace(/^[^\s]+\s/, '');
  const desc    = document.getElementById('r-desc').value.trim();

  // Try saving to MongoDB via backend
  const backendResult = await submitReportToBackend({
    tree_id: treeId, tree_name: tree,
    issue_type: issue, severity: currentSev,
    description: desc, reporter_name: "Demo User"
  });

  const newReport = {
    icon: getSevIcon(), title: issue + ' reported',
    tree: tree, time: 'Just now', status: 'rs-open', statusText: 'Open'
  };
  allReports.unshift(newReport);
  buildFeed(allReports);
  addEcoPoints(30);
  await addPointsToBackend("Demo User", "submit_report");
  document.getElementById('r-desc').value = '';

  const msg = backendResult && backendResult.success
    ? '✅ Report saved to MongoDB! +30 Eco Points earned. 🌳'
    : '✅ Report submitted! +30 Eco Points earned. 🌳';
  alert(msg);
}

function getSevIcon() {
  if (currentSev === 'high')   return '🚨';
  if (currentSev === 'medium') return '⚠️';
  return '📍';
}
