/* ============================================================
   View: Training Video Library
   ============================================================ */

window.Views = window.Views || {};

let _videoSort = "newest";
let _videoQuery = "";

function filteredVideos() {
  let list = [...VIDEOS];
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
  `).join("") : `<div class="empty-state">No videos match your search.</div>`;
}

Views.videos = function () {
  return `
    <section>
      <div class="page-header"><h2>📹 Training Video Library</h2></div>

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

Views.setVideoQuery = function (val) {
  _videoQuery = val;
  const grid = document.querySelector(".video-grid");
  if (grid) grid.innerHTML = videoGridHtml(filteredVideos());
};

Views.setVideoSort = function (val) {
  _videoSort = val;
  App.render();
};
