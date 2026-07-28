/* ============================================================
   View: "More" hub — notifications, videos, favorites, missions,
   settings, donate, send ideas, invite
   ============================================================ */

window.Views = window.Views || {};

const CASHAPP_HANDLE = "$TFDrills"; // TODO: replace with your real Cash App $cashtag
const IDEAS_EMAIL = "jwmap3apple@gmail.com";
const INVITE_MESSAGE = "Join our crew on TFDrills — drills, challenges, and the department leaderboard, all in one app: ";

Views.more = function () {
  const notifs = Store.getNotifications();

  return `
    <section>
      <div class="page-header"><h2>☰ More</h2></div>

      <div class="panel">
        <h3>Quick Links</h3>
        <div class="more-list">
          <button class="more-row" onclick="App.navigate('videos')"><span>📹 Training Videos</span><span>&rsaquo;</span></button>
          <button class="more-row" onclick="App.navigate('favorites')"><span>⭐ Favorites</span><span>&rsaquo;</span></button>
          <button class="more-row" onclick="App.navigate('missions')"><span>📆 Weekly Missions &amp; Badges</span><span>&rsaquo;</span></button>
          <button class="more-row" onclick="App.navigate('settings')"><span>⚙️ Settings</span><span>&rsaquo;</span></button>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header">
          <h3>🔔 Notifications</h3>
          ${notifs.length ? `<a class="link-small" onclick="Views.readAllNotifs()">Mark all read</a>` : ""}
        </div>
        ${notifs.length ? notifs.slice(0, 8).map(n => `
          <div class="notif-row ${n.read ? "" : "notif-unread"}">
            <div class="notif-title">${App.esc(n.title)}</div>
            <div class="notif-body">${App.esc(n.body)}</div>
          </div>
        `).join("") : `<p class="subtle">No notifications yet.</p>`}
      </div>

      <div class="panel">
        <h3>📣 Invite Your Crew</h3>
        <p class="subtle">Bring your crew into the training house.</p>
        <button class="btn btn-primary btn-block" onclick="Views.inviteCrew()">Invite to the Training House</button>
      </div>

      <div class="panel">
        <h3>💡 Send Ideas</h3>
        <p class="subtle">Got a drill, feature, or fix you want to see? Send it straight to the developer.</p>
        <a class="btn btn-outline btn-block" href="mailto:${IDEAS_EMAIL}?subject=TFDrills%20Idea">Send an Idea</a>
      </div>

      ${donateSectionHtml()}
    </section>
  `;
};

function donateSectionHtml() {
  return `
    <div class="panel donate-panel">
      <h3>❤️ Donate To The Cause</h3>
      <p class="subtle">
        This app is being developed on personal time and effort, not for profit, but to strengthen the love of our
        passions, and to protect the community we swore to serve. All proceeds are reinvested into this app exclusively.
        Donate only if your heart feels compelled to help this cause continue to grow.
      </p>
      <a class="btn btn-donate btn-block" href="https://cash.app/${CASHAPP_HANDLE.replace('$','')}" target="_blank" rel="noopener noreferrer">
        Donate via Cash App
      </a>

      <details class="transparency">
        <summary>Full Transparency — where donations go</summary>
        <p>
          As TFDrills grows with more users, more submitted video, and potentially more departments over time,
          our stored data and hosting costs grow with it. Donations go directly toward:
        </p>
        <ul class="plain-list">
          <li>Video and data storage as the video library grows</li>
          <li>Hosting and infrastructure to keep the app fast and reliable</li>
          <li>Ongoing development to keep adding drills, features, and department support</li>
        </ul>
        <p>TFDrills is committed to staying non-profit — donations sustain the tool, they don't monetize it.</p>
      </details>
    </div>
  `;
}

Views.readAllNotifs = function () {
  Store.markAllRead();
  App.render();
};

Views.inviteCrew = function () {
  const url = location.origin + location.pathname;
  const text = INVITE_MESSAGE + url;
  if (navigator.share) {
    navigator.share({ title: "TFDrills", text: INVITE_MESSAGE, url }).catch(() => {});
  } else {
    const smsUrl = "sms:?&body=" + encodeURIComponent(text);
    window.location.href = smsUrl;
  }
};

/* ---------------- Settings ---------------- */
Views.settings = function () {
  const profile = Store.getProfile();
  return `
    <section>
      <div class="page-header">
        <button class="back-btn" onclick="App.navigate('more')">&larr;</button>
        <h2>⚙️ Settings</h2>
      </div>

      <div class="panel">
        <h3>Your Assignment</h3>
        <form onsubmit="Views.saveSettings(event)">
          <label class="field">
            <span>Station</span>
            <select name="station" required>
              ${STATIONS.map(s => `<option value="${App.esc(s)}" ${profile.station === s ? "selected" : ""}>${s}</option>`).join("")}
            </select>
          </label>
          <label class="field">
            <span>Shift</span>
            <div class="shift-toggle">
              ${SHIFTS.map(sh => `
                <label class="shift-option">
                  <input type="radio" name="shift" value="${sh}" ${profile.shift === sh ? "checked" : ""} required />
                  <span>${sh}</span>
                </label>
              `).join("")}
            </div>
          </label>
          <label class="field">
            <span>Email</span>
            <input type="email" name="email" value="${App.esc(profile.email || "")}" />
          </label>
          <label class="field">
            <span>Name</span>
            <input type="text" name="name" value="${App.esc(profile.name || "")}" />
          </label>
          <button type="submit" class="btn btn-primary btn-block">Save Changes</button>
        </form>
      </div>

      <div class="panel">
        <p class="fine-print">
          Your station and shift are stored only on this device and are used for challenges and leaderboards.
          No personal information is required.
        </p>
      </div>
    </section>
  `;
};

Views.saveSettings = function (event) {
  event.preventDefault();
  const data = new FormData(event.target);
  Store.setProfile({
    station: data.get("station"),
    shift: data.get("shift"),
    email: data.get("email") || "",
    name: data.get("name") || ""
  });
  App.toast("Settings saved");
  App.navigate("more");
};

/* ---------------- Check Your Stats ---------------- */
Views.stats = function () {
  const results = Store.getResults();
  const favorites = Store.getFavorites();
  const fireCount = results.filter(r => r.category === "fire").length;
  const emsCount = results.filter(r => r.category === "ems").length;
  const fitnessCount = results.filter(r => r.category === "fitness").length;

  return `
    <section>
      <div class="page-header">
        <button class="back-btn" onclick="App.navigate('more')">&larr;</button>
        <h2>🎖 Check Your Stats</h2>
      </div>

      <div class="dash-grid">
        <div class="dash-card">
          <div class="dash-card-label">Total Drills Logged</div>
          <div class="dash-card-main">${results.length}</div>
          <div class="dash-card-sub">All-time submissions</div>
        </div>
        <div class="dash-card">
          <div class="dash-card-label">Favorites Saved</div>
          <div class="dash-card-main">${favorites.length}</div>
          <div class="dash-card-sub">Quick-access drills</div>
        </div>
        <div class="dash-card">
          <div class="dash-card-label">Fire / EMS / Fitness</div>
          <div class="dash-card-main">${fireCount} / ${emsCount} / ${fitnessCount}</div>
          <div class="dash-card-sub">Category breakdown</div>
        </div>
        <div class="dash-card" onclick="App.navigate('missions')">
          <div class="dash-card-label">Badges &amp; Missions</div>
          <div class="dash-card-main">View Progress</div>
          <div class="dash-card-sub">Tap to open</div>
        </div>
      </div>

      <div class="panel">
        <h3>Your Submitted Results</h3>
        ${results.length ? `
          <div class="drill-list">
            ${results.map(r => `
              <div class="drill-row">
                <div class="drill-row-main">
                  <div class="drill-row-name">${App.esc(r.drillName)}</div>
                  <div class="drill-row-meta">${App.esc(r.time)} · ${new Date(r.ts).toLocaleDateString()}</div>
                </div>
              </div>
            `).join("")}
          </div>
        ` : `<p class="subtle">No results submitted yet — complete a drill and hit "Submit Result" to see it here.</p>`}
      </div>
    </section>
  `;
};

/* ---------------- Profile menu (full page — replaces old header dropdown) ---------------- */
Views.profileMenu = function () {
  const profile = Store.getProfile();
  const stationNum = profile ? profile.station.replace("Station ", "") : "—";
  const shiftLetter = profile ? profile.shift.charAt(0) : "—";

  return `
    <section>
      <div class="page-header"><h2>Your Profile</h2></div>

      <div class="identity-card" style="margin-bottom:22px;">
        <img src="assets/helmet.png" alt="" class="helmet-icon" aria-hidden="true" />
        <div class="identity-card-info">
          <div class="identity-card-station">${App.esc(stationNum)} · ${App.esc(shiftLetter)}</div>
          <div class="subtle">${profile && profile.name ? App.esc(profile.name) : (profile ? "Assigned crew member" : "Profile not set up")}</div>
        </div>
      </div>

      <div class="button-grid" style="grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));">
        <button class="grid-btn" style="--accent:#2f6fed" onclick="App.navigate('stats')">
          <span class="grid-btn-icon-wrap">🎖</span>
          <span class="grid-btn-label">Check Your Stats</span>
        </button>
        <button class="grid-btn" style="--accent:#b9790a" onclick="App.navigate('favorites')">
          <span class="grid-btn-icon-wrap">⭐</span>
          <span class="grid-btn-label">Favorites</span>
        </button>
        <button class="grid-btn" style="--accent:#45566b" onclick="App.navigate('settings')">
          <span class="grid-btn-icon-wrap">⚙️</span>
          <span class="grid-btn-label">Settings</span>
        </button>
      </div>
    </section>
  `;
};

/* ---------------- Notifications (full page — replaces old envelope dropdown) ---------------- */
Views.notificationsPage = function () {
  const profile = Store.getProfile();
  const received = profile
    ? Store.getChallenges().filter(c => c.status === "pending" && c.toStation === profile.station && c.toShift === profile.shift)
    : [];
  const activity = typeof ACTIVITY_FEED !== "undefined" ? ACTIVITY_FEED : [];

  return `
    <section>
      <div class="page-header"><h2>🔥✉️ Announcements &amp; Challenges</h2></div>

      <div class="panel">
        <h3>Challenges Received</h3>
        ${received.length ? received.map(c => `
          <div class="side-challenge-row" onclick="App.navigate('challenges')">
            <span class="side-challenge-top">⚔️ ${App.esc(c.fromStation)} ${App.esc(c.fromShift)}</span>
            <span class="side-challenge-meta">${App.esc(c.drillName)} · beat ${App.esc(c.timeToBeat)}</span>
          </div>
        `).join("") : `<p class="subtle">No challenges waiting on you.</p>`}
      </div>

      <div class="panel">
        <h3>Recent Activity</h3>
        <div class="activity-feed">
          ${activity.map(a => `
            <div class="activity-row">
              <div class="activity-dot"></div>
              <div>
                <div class="activity-text">${App.esc(a.text)}</div>
                <div class="activity-time">${App.esc(a.time)}</div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    </section>
  `;
};
