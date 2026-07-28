/* ============================================================
   View: Drill Footage Library
   ============================================================ */

window.Views = window.Views || {};

let _videoSort = "newest";
let _videoQuery = "";
let _videoCategory = "all";

const VIDEO_CATS = [
  { key: "all", label: "All Footage", icon: "🎬" },
  { key: "fire", label: "Fire", icon: "🚒" },
  { key: "ems", label: "EMS", icon: "🚑" },
  { key: "fitness", label: "Workouts", icon: "💪" }
];

function videoCategory(v) {
  const d = ALL_DRILLS.find(dr => dr.name === v.drill);
  return d ? d.category : null;
}

function filteredVideos() {
  let list = [...VIDEOS];
  if (_videoCategory !== "all") list = list.filter(v => videoCategory(v) === _videoCategory);
  if (_videoQuery) {
    const q = _videoQuery.toLowerCase();
    list = list.filter(v =>
      v.drill.toLowerCase().includes(q) ||
      v.station.toLowerCase().includes(q) ||
      v.shift.toLowerCase().includes(q)
    );
  }
  if (_videoSort === "fastest") list.sort((a, b) => (a.time > b.time ? 1 : -1));
  if (_videoSort === "rated") list.sort((a, b) => b.rating - a.rating);
  if (_videoSort === "viewed") list.sort((a, b) => b.views - a.views);
  return list;
}

function videoGridHtml(list) {
  return list.length ? list.map(v => `
    <div class="video-card">
      <div class="video-thumb">▶</div>
      <div class="video-card-body">
        <div class="video-drill">${App.esc(v.drill)}</div>
        <div class="video-meta">${App.esc(v.station)} ${App.esc(v.shift)}</div>
        <div class="video-stats">⏱ ${App.esc(v.time)} · 👁 ${v.views} · ⭐ ${v.rating}</div>
      </div>
    </div>
  `).join("") : `<div class="empty-state">No footage matches your search.</div>`;
}

/* ---------- Drill Footage subcategory picker (opened from Home) ---------- */
Views.openFootagePicker = function () {
  Views.closeFootagePicker();
  const el = document.createElement("div");
  el.id = "footage-picker-overlay";
  el.className = "modal-backdrop";
  el.innerHTML = `
    <div class="picker-sheet">
      <h3>🎬 Browse Drill Footage</h3>
      ${VIDEO_CATS.map(c => `
        <button class="picker-option" onclick="Views.closeFootagePicker(); App.navigate('${c.key === "all" ? "videos" : "videos/" + c.key}')">
          <span class="picker-icon">${c.icon}</span>
          <span>${c.label}</span>
        </button>
      `).join("")}
      <button class="picker-close" onclick="Views.closeFootagePicker()">Cancel</button>
    </div>
  `;
  el.addEventListener("click", (e) => { if (e.target === el) Views.closeFootagePicker(); });
  document.body.appendChild(el);
};

Views.closeFootagePicker = function () {
  const el = document.getElementById("footage-picker-overlay");
  if (el) el.remove();
};

Views.videos = function (category) {
  _videoCategory = category || "all";
  const meta = VIDEO_CATS.find(c => c.key === _videoCategory) || VIDEO_CATS[0];

  return `
    <section>
      <div class="page-header">
        <button class="back-btn" onclick="App.navigate('home')">&larr;</button>
        <h2>🎬 Drill Footage${_videoCategory !== "all" ? " — " + meta.label : ""}</h2>
      </div>

      <div class="filter-row">
        ${VIDEO_CATS.map(c => `
          <button class="filter-chip ${_videoCategory === c.key ? "active" : ""}" onclick="Views.setVideoCategory('${c.key}')">${c.icon} ${c.label}</button>
        `).join("")}
      </div>

      <input type="search" class="search-input" placeholder="Search by drill, station, or shift..."
        value="${App.esc(_videoQuery)}" oninput="Views.setVideoQuery(this.value)" />

      <div class="filter-row">
        ${[["newest", "Newest"], ["fastest", "Fastest Time"], ["rated", "Highest Rated"], ["viewed", "Most Viewed"]].map(([val, label]) => `
          <button class="filter-chip ${_videoSort === val ? "active" : ""}" onclick="Views.setVideoSort('${val}')">${label}</button>
        `).join("")}
      </div>

      <div class="video-grid">${videoGridHtml(filteredVideos())}</div>
    </section>
  `;
};

Views.setVideoCategory = function (val) {
  App.navigate(val === "all" ? "videos" : "videos/" + val);
};

Views.setVideoQuery = function (val) {
  _videoQuery = val;
  const grid = document.querySelector(".video-grid");
  if (grid) grid.innerHTML = videoGridHtml(filteredVideos());
};

Views.setVideoSort = function (val) {
  _videoSort = val;
  App.render();
};
