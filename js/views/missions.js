/* ============================================================
   View: Weekly Missions + Badges & Achievements
   ============================================================ */

window.Views = window.Views || {};

Views.missions = function () {
  const missions = Store.getMissionProgress();

  return `
    <section>
      <div class="page-header"><h2>📆 Weekly Missions</h2></div>

      <div class="panel">
        ${WEEKLY_MISSION_TEMPLATE.map(m => {
          const done = missions[m.id] || 0;
          const complete = done >= m.target;
          const pct = Math.round((done / m.target) * 100);
          return `
            <div class="mission-row-full ${complete ? "mission-complete" : ""}">
              <div class="mission-row-top">
                <span>${complete ? "✅" : "🔲"} ${m.label}</span>
                <span>${done}/${m.target}</span>
              </div>
              <div class="mission-bar"><div class="mission-fill" style="width:${pct}%"></div></div>
            </div>`;
        }).join("")}
        <p class="fine-print">Complete missions to earn XP, badges, and Challenge Board points. Resets weekly.</p>
      </div>

      <div class="page-header"><h2>🏅 Badges &amp; Achievements</h2></div>
      <div class="badge-grid">
        ${BADGES.map(b => `
          <div class="badge-card">
            <div class="badge-icon">${b.icon}</div>
            <div class="badge-name">${App.esc(b.name)}</div>
            <div class="badge-desc">${App.esc(b.desc)}</div>
          </div>
        `).join("")}
      </div>
    </section>
  `;
};
