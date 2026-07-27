/* ============================================================
   View: Home (button grid) + Dashboard
   ============================================================ */

window.Views = window.Views || {};

const HOME_BUTTONS = [
  { icon: "🎲", label: "Random Drill", action: "random" },
  { icon: "🚒", label: "Fire Drills", action: "drills/fire" },
  { icon: "🚑", label: "EMS Drills", action: "drills/ems" },
  { icon: "💪", label: "Crew Fitness", action: "drills/fitness" },
  { icon: "⚔️", label: "Challenges", action: "challenges" },
  { icon: "🏆", label: "The Challenge Board", action: "board" },
  { icon: "📹", label: "Training Videos", action: "videos" },
  { icon: "⭐", label: "Favorites", action: "favorites" }
];

Views.home = function () {
  const profile = Store.getProfile();
  const missions = Store.getMissionProgress();
  const missionHtml = WEEKLY_MISSION_TEMPLATE.map(m => {
    const done = missions[m.id] || 0;
    const pct = Math.round((done / m.target) * 100);
    return `
      <div class="mission-row">
        <div class="mission-label">${m.label}</div>
        <div class="mission-bar"><div class="mission-fill" style="width:${pct}%"></div></div>
        <div class="mission-count">${done}/${m.target}</div>
      </div>`;
  }).join("");

  const todayDrill = ALL_DRILLS[new Date().getDate() % ALL_DRILLS.length];
  const pendingChallenges = Store.getChallenges().filter(c => c.status === "pending" && c.toStation === profile.station && c.toShift === profile.shift);
  const myRank = CREWS.find(c => c.station === profile.station && c.shift === profile.shift);
  const newestVideos = VIDEOS.slice(0, 3);
  const trending = VIDEOS.slice().sort((a, b) => b.views - a.views)[0];

  return `
    <section class="dashboard">
      <h2 class="section-title">Welcome back${profile.name ? ", " + App.esc(profile.name) : ""}</h2>

      <div class="dash-grid">
        <div class="dash-card" onclick="App.navigate('drill/${todayDrill.id}')">
          <div class="dash-card-label">Today's Random Drill</div>
          <div class="dash-card-main">${App.esc(todayDrill.name)}</div>
          <div class="dash-card-sub">${App.esc(todayDrill.subcategory)} · ${App.esc(todayDrill.difficulty)}</div>
        </div>

        <div class="dash-card" onclick="App.navigate('challenges')">
          <div class="dash-card-label">Current Challenges</div>
          <div class="dash-card-main">${pendingChallenges.length} Pending</div>
          <div class="dash-card-sub">${pendingChallenges.length ? "Tap to respond" : "You're all caught up"}</div>
        </div>

        <div class="dash-card" onclick="App.navigate('board')">
          <div class="dash-card-label">Crew Ranking</div>
          <div class="dash-card-main">${myRank ? "#" + myRank.rank + " Overall" : "Unranked"}</div>
          <div class="dash-card-sub">${myRank ? myRank.wins + "W - " + myRank.losses + "L" : "Complete a challenge to rank"}</div>
        </div>

        <div class="dash-card" onclick="App.navigate('videos')">
          <div class="dash-card-label">Trending Drill</div>
          <div class="dash-card-main">${App.esc(trending.drill)}</div>
          <div class="dash-card-sub">${trending.views} views · ${trending.station} ${trending.shift}</div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header">
          <h3>Weekly Mission Progress</h3>
          <a href="#/missions" class="link-small">View badges</a>
        </div>
        ${missionHtml}
      </div>

      <div class="panel">
        <div class="panel-header"><h3>Newest Videos</h3><a href="#/videos" class="link-small">See all</a></div>
        <div class="mini-video-list">
          ${newestVideos.map(v => `
            <div class="mini-video-row">
              <span class="mini-video-drill">${App.esc(v.drill)}</span>
              <span class="mini-video-meta">${App.esc(v.station)} ${App.esc(v.shift)} · ${v.time}</span>
            </div>`).join("")}
        </div>
      </div>
    </section>

    <section>
      <h2 class="section-title">Get Training</h2>
      <div class="button-grid">
        ${HOME_BUTTONS.map(b => `
          <button class="grid-btn" onclick="App.navigate('${b.action}')">
            <span class="grid-btn-icon">${b.icon}</span>
            <span class="grid-btn-label">${b.label}</span>
          </button>`).join("")}
      </div>
    </section>
  `;
};
