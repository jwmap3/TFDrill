/* ============================================================
   View: Drill categories, list, detail, random, timer, share
   ============================================================ */

window.Views = window.Views || {};

const CATEGORY_META = {
  fire: { label: "Fire Drills", icon: "🚒", accent: "#e11d2e" },
  ems: { label: "EMS Drills", icon: "🚑", accent: "#2f6fed" },
  fitness: { label: "Crew Fitness", icon: "💪", accent: "#45566b" }
};

function drillsByCategory(cat) {
  return ALL_DRILLS.filter(d => d.category === cat);
}
function findDrill(id) {
  return ALL_DRILLS.find(d => d.id === id);
}

/* ---------- Drills picker popup (Fire / EMS / Fitness) ---------- */
Views.openDrillsPicker = function () {
  Views.closeDrillsPicker();
  const el = document.createElement("div");
  el.id = "drills-picker-overlay";
  el.className = "modal-backdrop";
  el.innerHTML = `
    <div class="picker-sheet">
      <h3>🧰 Choose a drill type</h3>
      ${Object.entries(CATEGORY_META).map(([key, meta]) => `
        <button class="picker-option" style="--accent:${meta.accent}" onclick="Views.closeDrillsPicker(); App.navigate('drills/${key}')">
          <span class="picker-icon">${meta.icon}</span>
          <span>${meta.label}</span>
        </button>
      `).join("")}
      <button class="picker-close" onclick="Views.closeDrillsPicker()">Cancel</button>
    </div>
  `;
  el.addEventListener("click", (e) => { if (e.target === el) Views.closeDrillsPicker(); });
  document.body.appendChild(el);
};

Views.closeDrillsPicker = function () {
  const el = document.getElementById("drills-picker-overlay");
  if (el) el.remove();
};

Views.drillList = function (category) {
  const meta = CATEGORY_META[category];
  const drills = drillsByCategory(category);
  const subcats = [...new Set(drills.map(d => d.subcategory))];

  return `
    <section>
      <div class="page-header">
        <button class="back-btn" onclick="App.navigate('home')">&larr;</button>
        <h2>${meta.icon} ${meta.label}</h2>
      </div>

      ${subcats.map(sub => `
        <div class="panel">
          <h3 class="subcat-title">${App.esc(sub)}</h3>
          <div class="drill-list">
            ${drills.filter(d => d.subcategory === sub).map(d => drillRowHtml(d)).join("")}
          </div>
        </div>
      `).join("")}
    </section>
  `;
};

function drillRowHtml(d) {
  const fav = Store.isFavorite(d.id);
  return `
    <div class="drill-row" onclick="App.navigate('drill/${d.id}')">
      <div class="drill-row-main">
        <div class="drill-row-name">${App.esc(d.name)}</div>
        <div class="drill-row-meta">${App.esc(d.difficulty)} · Crew of ${App.esc(d.crewSize)} · ${App.esc(d.estTime)}</div>
      </div>
      <span class="fav-star ${fav ? "active" : ""}" onclick="event.stopPropagation(); Views.toggleFav('${d.id}')">${fav ? "★" : "☆"}</span>
    </div>`;
}

Views.toggleFav = function (id) {
  const active = Store.toggleFavorite(id);
  App.toast(active ? "Added to favorites" : "Removed from favorites");
  App.render();
};

/* ---------- Random Drill: hero pool picker -> dice shake -> centered reveal popup ---------- */
const RANDOM_POOLS = [
  { key: "fire", icon: "🚒", label: "Fire", accent: "#e11d2e" },
  { key: "ems", icon: "🚑", label: "EMS", accent: "#2f6fed" },
  { key: "fitness", icon: "💪", label: "Fitness", accent: "#45566b" },
  { key: "all", icon: "🎲", label: "All Drills", accent: "#16255c" }
];

Views.random = function () {
  return `
    <section class="random-hero">
      <div class="page-header">
        <button class="back-btn" onclick="App.navigate('home')">&larr;</button>
        <h2>Random Drill</h2>
      </div>
      <div class="dice-emoji" id="dice-emoji">🎲</div>
      <p class="subtle">Pick a pool and let TFDrills choose your next drill.</p>
      <div class="pool-grid-lg">
        ${RANDOM_POOLS.map(p => `
          <button class="pool-btn-lg" style="--accent:${p.accent}" onclick="Views.rollRandom('${p.key}')">
            <span>${p.icon}</span>${p.label}
          </button>
        `).join("")}
      </div>
    </section>
  `;
};

Views.rollRandom = function (pool) {
  const list = pool === "all" ? ALL_DRILLS : drillsByCategory(pool);
  const pick = list[Math.floor(Math.random() * list.length)];
  const dice = document.getElementById("dice-emoji");
  if (!dice) return;

  dice.classList.add("dice-shaking");

  setTimeout(() => {
    dice.classList.remove("dice-shaking");
    const accent = (RANDOM_POOLS.find(p => p.key === pool) || RANDOM_POOLS[3]).accent;

    const el = document.createElement("div");
    el.id = "random-reveal-overlay";
    el.className = "modal-backdrop";
    el.innerHTML = `
      <div class="reveal-card" style="--accent:${accent}">
        <button class="reveal-close" onclick="Views.closeRandomReveal()" aria-label="Close">✕</button>
        <div class="reveal-label">Your drill is...</div>
        <div class="reveal-name">${App.esc(pick.name)}</div>
        <div class="reveal-meta">${App.esc(pick.subcategory)} · ${App.esc(pick.difficulty)} · ${App.esc(pick.estTime)}</div>
        <button class="btn btn-primary" onclick="App.navigate('drill/${pick.id}')">View Full Details</button>
      </div>
    `;
    el.addEventListener("click", (e) => { if (e.target === el) Views.closeRandomReveal(); });
    document.body.appendChild(el);
  }, 2000);
};

Views.closeRandomReveal = function () {
  const el = document.getElementById("random-reveal-overlay");
  if (el) el.remove();
};

/* ---------- Drill detail ---------- */
Views.drillDetail = function (id) {
  const d = findDrill(id);
  if (!d) return `<div class="empty-state">Drill not found.</div>`;
  const fav = Store.isFavorite(d.id);
  const isFitness = d.category === "fitness";

  return `
    <section>
      <div class="page-header">
        <button class="back-btn" onclick="history.back()">&larr;</button>
        <h2>${App.esc(d.name)}</h2>
      </div>

      <div class="panel drill-detail">
        <div class="chip-row">
          <span class="chip">${App.esc(d.difficulty)}</span>
          <span class="chip">Crew: ${App.esc(d.crewSize)}</span>
          <span class="chip">${App.esc(d.estTime)}</span>
          <span class="chip chip-cat">${App.esc(d.subcategory)}</span>
        </div>

        <h4>Equipment Needed</h4>
        <ul class="plain-list">${d.equipment.map(e => `<li>${App.esc(e)}</li>`).join("")}</ul>

        <h4>Objectives</h4>
        <ul class="plain-list">${d.objectives.map(o => `<li>${App.esc(o)}</li>`).join("")}</ul>

        <h4>Step-by-Step Instructions</h4>
        <ol class="plain-list">${d.steps.map(s => `<li>${App.esc(s)}</li>`).join("")}</ol>

        ${isFitness && d.why ? `<h4>Why It Matters</h4><p>${App.esc(d.why)}</p>` : ""}

        <h4>Performance Standard</h4>
        <p class="standard-text">${App.esc(d.standard)}</p>

        <h4>Video Walkthrough</h4>
        <div class="coming-soon">📺 A YouTube walkthrough for this drill is coming soon.</div>

        <h4>Department Protocol &amp; Timing Rules</h4>
        <div class="coming-soon">📋 Your department's official protocol and timing rules will appear here once added.</div>

        <div id="timer-box" class="timer-box">
          <div id="timer-display" class="timer-display">00:00.0</div>
          <div class="timer-controls">
            <button class="btn btn-outline" onclick="Views.timerToggle()">Start / Stop</button>
            <button class="btn btn-ghost" onclick="Views.timerReset()">Reset</button>
          </div>
        </div>

        <div class="action-grid">
          <button class="btn btn-outline">📹 Upload Video</button>
          <button class="btn btn-primary" onclick="Views.submitResult('${d.id}')">✅ Submit Result</button>
          <button class="btn btn-outline" onclick="App.navigate('challenge-new/${d.id}')">⚔️ Challenge a Crew</button>
          <button class="btn ${fav ? "btn-fav-active" : "btn-outline"}" onclick="Views.toggleFav('${d.id}'); Views.refreshFavBtn('${d.id}')" id="fav-btn">
            ${fav ? "★ Saved" : "☆ Save Favorite"}
          </button>
        </div>

        <div style="text-align:center;">
          <button class="btn-share" onclick="Views.shareDrill('${d.id}')">🔗 Share this drill</button>
        </div>
      </div>
    </section>
  `;
};

Views.refreshFavBtn = function (id) {
  const btn = document.getElementById("fav-btn");
  if (!btn) return;
  const fav = Store.isFavorite(id);
  btn.textContent = fav ? "★ Saved" : "☆ Save Favorite";
  btn.className = "btn " + (fav ? "btn-fav-active" : "btn-outline");
};

/* ---------- Share Drill ---------- */
Views.shareDrill = function (id) {
  const d = findDrill(id);
  if (!d) return;
  const url = location.origin + location.pathname + "#/drill/" + id;
  const text = `Check out this TFDrills drill: ${d.name} — ${url}`;

  if (navigator.share) {
    navigator.share({ title: d.name, text: `Check out this TFDrills drill: ${d.name}`, url }).catch(() => {});
    return;
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).catch(() => {});
  }
  App.toast("Link copied — opening messages...");
  window.location.href = "sms:?&body=" + encodeURIComponent(text);
};

/* ---------- Timer ---------- */
let _timerInterval = null;
let _timerStart = 0;
let _timerElapsed = 0;
let _timerRunning = false;

Views.timerToggle = function () {
  const display = document.getElementById("timer-display");
  if (!display) return;
  if (_timerRunning) {
    clearInterval(_timerInterval);
    _timerElapsed += Date.now() - _timerStart;
    _timerRunning = false;
  } else {
    _timerStart = Date.now();
    _timerRunning = true;
    _timerInterval = setInterval(() => {
      const total = _timerElapsed + (Date.now() - _timerStart);
      display.textContent = formatTime(total);
    }, 100);
  }
};

Views.timerReset = function () {
  clearInterval(_timerInterval);
  _timerRunning = false;
  _timerElapsed = 0;
  const display = document.getElementById("timer-display");
  if (display) display.textContent = "00:00.0";
};

function formatTime(ms) {
  const totalSec = ms / 1000;
  const min = Math.floor(totalSec / 60);
  const sec = Math.floor(totalSec % 60);
  const tenth = Math.floor((ms % 1000) / 100);
  return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}.${tenth}`;
}

Views.submitResult = function (id) {
  const d = findDrill(id);
  const display = document.getElementById("timer-display");
  const time = display ? display.textContent : "00:00.0";
  Store.addResult({ drillId: id, drillName: d.name, category: d.category, time });
  App.toast(`Result submitted: ${time}`);
  App.render();
};
