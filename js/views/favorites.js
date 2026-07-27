/* ============================================================
   View: Favorites
   ============================================================ */

window.Views = window.Views || {};

Views.favorites = function () {
  const favIds = Store.getFavorites();
  const drills = ALL_DRILLS.filter(d => favIds.includes(d.id));

  return `
    <section>
      <div class="page-header"><h2>⭐ Favorites</h2></div>
      ${drills.length ? `
        <div class="panel">
          <div class="drill-list">${drills.map(d => drillRowHtml(d)).join("")}</div>
        </div>
      ` : `<div class="empty-state">No favorites yet. Tap the star on any drill to save it here.</div>`}
    </section>
  `;
};
