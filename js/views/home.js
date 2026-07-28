/* ============================================================
   View: Home — Frank's Nugget, Favorites, Recent Activity,
   and Your Current Stats
   (Drill Footage + Random Drill now live as floating icons)
   ============================================================ */

window.Views = window.Views || {};

Views.home = function () {
  const profile = Store.getProfile();
  const results = Store.getResults();
  const favorites = Store.getFavorites();
  const fireCount = results.filter(r => r.category === "fire").length;
  const emsCount = results.filter(r => r.category === "ems").length;
  const fitnessCount = results.filter(r => r.category === "fitness").length;
  const myRank = profile ? CREWS.find(c => c.station === profile.station && c.shift === profile.shift) : null;

  return `
    <section class="home-section home-section-centered">
      <h2 class="section-title">🧠 Frank's Nugget</h2>
      <div class="panel">
        <p class="subtle" style="margin-bottom:8px;">This week's piece of advice</p>
        <div class="coming-soon">Check back soon — Frank's weekly nugget of wisdom will drop here.</div>
      </div>
    </section>

    <section class="home-section home-section-centered">
      <h2 class="section-title">📣 Recent Activity</h2>
      <div class="panel">
        <div class="activity-feed">
          ${ACTIVITY_FEED.map(a => `
            <div class="activity-row">
              <div class="activity-dot"></div>
              <div>
                <div class="activity-text">${App.esc(a.text)}</div>
                <div class="activity-time">${App.esc(a.time)}</div>
              </div>
            </div>`).join("")}
        </div>
      </div>
    </section>

    <section class="home-section home-section-centered">
      <div class="side-panel-title">
        <h2 class="section-title">📊 Your Current Stats</h2>
        <a href="#/stats" class="link-small">Full stats</a>
      </div>
      <div class="dash-grid">
        <div class="dash-card" onclick="App.navigate('stats')">
          <div class="dash-card-label">Total Drills Logged</div>
          <div class="dash-card-main">${results.length}</div>
          <div class="dash-card-sub">All-time submissions</div>
        </div>
        <div class="dash-card" onclick="App.navigate('favorites')">
          <div class="dash-card-label">Favorites Saved</div>
          <div class="dash-card-main">${favorites.length}</div>
          <div class="dash-card-sub">Quick-access drills</div>
        </div>
        <div class="dash-card" onclick="App.navigate('stats')">
          <div class="dash-card-label">Fire / EMS / Fitness</div>
          <div class="dash-card-main">${fireCount} / ${emsCount} / ${fitnessCount}</div>
          <div class="dash-card-sub">Category breakdown</div>
        </div>
        <div class="dash-card" onclick="App.navigate('board')">
          <div class="dash-card-label">Crew Ranking</div>
          <div class="dash-card-main">${myRank ? "#" + myRank.rank + " Overall" : "Unranked"}</div>
          <div class="dash-card-sub">${myRank ? myRank.wins + "W - " + myRank.losses + "L" : "Complete a challenge to rank"}</div>
        </div>
      </div>
    </section>
  `;
};
