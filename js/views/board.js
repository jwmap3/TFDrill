/* ============================================================
   View: The Challenge Board (leaderboard) + Activity Feed
   ============================================================ */

window.Views = window.Views || {};

let _boardFilter = "overall";
let _boardScope = "all-time";

Views.board = function () {
  const profile = Store.getProfile();
  const ranked = [...CREWS].sort((a, b) => a.rank - b.rank);

  return `
    <section>
      <div class="page-header"><h2>🏆 The Challenge Board</h2></div>

      <div class="filter-row">
        ${["overall", "fire", "ems", "fitness"].map(f => `
          <button class="filter-chip ${_boardFilter === f ? "active" : ""}" onclick="Views.setBoardFilter('${f}')">${f[0].toUpperCase() + f.slice(1)}</button>
        `).join("")}
      </div>
      <div class="filter-row">
        ${["monthly", "all-time"].map(s => `
          <button class="filter-chip ${_boardScope === s ? "active" : ""}" onclick="Views.setBoardScope('${s}')">${s === "all-time" ? "All-Time" : "Monthly"}</button>
        `).join("")}
      </div>

      <div class="panel">
        <div class="board-list">
          ${ranked.map(c => boardRowHtml(c, profile)).join("")}
        </div>
      </div>

      <div class="panel">
        <h3>Live Department Activity</h3>
        <div class="activity-feed">
          ${ACTIVITY_FEED.map(a => `
            <div class="activity-row">
              <span class="activity-dot"></span>
              <div>
                <div class="activity-text">${App.esc(a.text)}</div>
                <div class="activity-time">${App.esc(a.time)}</div>
              </div>
            </div>`).join("")}
        </div>
      </div>
    </section>
  `;
};

function boardRowHtml(c, profile) {
  const isMe = profile && c.station === profile.station && c.shift === profile.shift;
  return `
    <div class="board-row ${isMe ? "board-row-me" : ""}">
      <div class="board-rank">#${c.rank}</div>
      <div class="board-main">
        <div class="board-crew">${App.esc(c.station)} <span class="subtle">${App.esc(c.shift)}</span></div>
        <div class="board-badges">${c.badges.map(b => badgeIcon(b)).join(" ")}</div>
      </div>
      <div class="board-stats">
        <div>${c.wins}W - ${c.losses}L</div>
        <div class="subtle">${c.streak > 0 ? "🔥 " + c.streak + " streak" : "—"}</div>
      </div>
    </div>`;
}

function badgeIcon(id) {
  const b = BADGES.find(b => b.id === id);
  return b ? `<span title="${App.esc(b.name)}">${b.icon}</span>` : "";
}

Views.setBoardFilter = function (f) {
  _boardFilter = f;
  App.render();
};
Views.setBoardScope = function (s) {
  _boardScope = s;
  App.render();
};
