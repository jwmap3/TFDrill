/* ============================================================
   View: Drill categories, list, detail, random, timer
   ============================================================ */

window.Views = window.Views || {};

const CATEGORY_META = {
  fire: { label: "Fire Drills", icon: "🚒" },
  ems: { label: "EMS Drills", icon: "🚑" },
  fitness: { label: "Crew Fitness", icon: "💪" }
};

function drillsByCategory(cat) {
  return ALL_DRILLS.filter(d => d.category === cat);
}
function findDrill(id) {
  return ALL_DRILLS.find(d => d.id === id);
}

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

Views.random = function () {
  return `
    <section>
      <div class="page-header">
        <button class="back-btn" onclick="App.navigate('home')">&larr;</button>
        <h2>🎲 Random Drill</h2>
      </div>
      <p class="subtle">Pick a pool, then let TFDrills choose your next drill.</p>
      <div class="random-pool-grid">
        <button class="btn btn-outline" onclick="Views.rollRandom('fire')">🚒 Fire</button>
        <button class="btn btn-outline" onclick="Views.rollRandom('ems')">🚑 EMS</button>
        <button class="btn btn-outline" onclick="Views.rollRandom('fitness')">💪 Fitness</button>
        <button class="btn btn-primary" onclick="Views.rollRandom('all')">🎲 All Drills</button>
      </div>
      <div id="random-result"></div>
    </section>
  `;
};

Views.rollRandom = function (pool) {
  const list = pool === "all" ? ALL_DRILLS : drillsByCategory(pool);
  const pick = list[Math.floor(Math.random() * list.length)];
  const el = document.getElementById("random-result");
  if (el) {
    el.innerHTML = `<div class="panel random-hit">${drillRowHtml(pick)}<button class="btn btn-primary btn-block" onclick="App.navigate('drill/${pick.id}')">Open Drill</button></div>`;
  }
};

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
