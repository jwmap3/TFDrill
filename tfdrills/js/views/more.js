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
