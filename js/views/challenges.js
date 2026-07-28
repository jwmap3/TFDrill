/* ============================================================
   View: Challenge creation, list, notifications
   ============================================================ */

window.Views = window.Views || {};

Views.challengeNew = function (drillId) {
  const d = findDrill(drillId);
  const profile = Store.getProfile();
  if (!d) return `<div class="empty-state">Drill not found.</div>`;

  return `
    <section>
      <div class="page-header">
        <button class="back-btn" onclick="history.back()">&larr;</button>
        <h2>⚔️ Challenge a Crew</h2>
      </div>

      <div class="panel">
        <div class="challenge-drill-name">${App.esc(d.name)}</div>
        <p class="subtle">From ${App.esc(profile.station)} ${App.esc(profile.shift)}</p>

        <form onsubmit="Views.submitChallenge(event, '${d.id}')">
          <label class="field">
            <span>Challenge Station</span>
            <select name="toStation" required>
              <option value="" disabled selected>Select a station</option>
              ${STATIONS.filter(s => s !== profile.station).map(s => `<option value="${App.esc(s)}">${s}</option>`).join("")}
            </select>
          </label>

          <label class="field">
            <span>Challenge Shift</span>
            <select name="toShift" required>
              <option value="" disabled selected>Select a shift</option>
              ${SHIFTS.map(s => `<option value="${App.esc(s)}">${s}</option>`).join("")}
            </select>
          </label>

          <label class="field">
            <span>Time / Score to Beat</span>
            <input type="text" name="timeToBeat" placeholder="e.g. 4:18" required />
          </label>

          <label class="field">
            <span>Optional Message</span>
            <textarea name="message" rows="3" placeholder="We think you can beat this."></textarea>
          </label>

          <div class="callout">
            <strong>Challenge Rules:</strong> one continuous video, no edits, entire drill shown,
            timer visible or built into the app.
          </div>

          <button type="submit" class="btn btn-primary btn-block">Send Challenge</button>
        </form>
      </div>
    </section>
  `;
};

Views.submitChallenge = function (event, drillId) {
  event.preventDefault();
  const profile = Store.getProfile();
  const data = new FormData(event.target);
  const d = findDrill(drillId);

  Store.addChallenge({
    fromStation: profile.station,
    fromShift: profile.shift,
    toStation: data.get("toStation"),
    toShift: data.get("toShift"),
    drillName: d.name,
    timeToBeat: data.get("timeToBeat"),
    message: data.get("message") || ""
  });

  App.toast("Challenge sent!");
  App.navigate("challenges");
};

Views.challenges = function () {
  const profile = Store.getProfile();
  const all = Store.getChallenges();
  const received = all.filter(c => c.toStation === profile.station && c.toShift === profile.shift);
  const sent = all.filter(c => c.fromStation === profile.station && c.fromShift === profile.shift);
  const others = all.filter(c => !received.includes(c) && !sent.includes(c));

  return `
    <section>
      <div class="page-header">
        <h2>⚔️ Challenge a Crew</h2>
      </div>

      <div class="panel">
        <h3>🚨 Received</h3>
        ${received.length ? received.map(c => challengeCardHtml(c, true)).join("") : `<p class="subtle">No challenges waiting on you.</p>`}
      </div>

      <div class="panel">
        <h3>Sent by You</h3>
        ${sent.length ? sent.map(c => challengeCardHtml(c, false)).join("") : `<p class="subtle">You haven't sent any challenges yet.</p>`}
      </div>

      <div class="panel">
        <h3>Department-Wide</h3>
        ${others.map(c => challengeCardHtml(c, false)).join("")}
      </div>
    </section>
  `;
};

function challengeCardHtml(c, allowAccept) {
  const statusClass = c.status === "pending" ? "status-pending" : c.status === "accepted" ? "status-accepted" : "status-declined";
  return `
    <div class="challenge-card">
      <div class="challenge-card-top">
        <span>${App.esc(c.fromStation)} ${App.esc(c.fromShift)}</span>
        <span class="vs">vs</span>
        <span>${App.esc(c.toStation)} ${App.esc(c.toShift)}</span>
      </div>
      <div class="challenge-card-drill">${App.esc(c.drillName)}</div>
      <div class="challenge-card-time">Time / Score to Beat: <strong>${App.esc(c.timeToBeat)}</strong></div>
      ${c.message ? `<div class="challenge-card-msg">"${App.esc(c.message)}"</div>` : ""}
      <div class="challenge-card-bottom">
        <span class="status-pill ${statusClass}">${c.status}</span>
        ${allowAccept && c.status === "pending" ? `
          <div class="challenge-actions">
            <button class="btn btn-sm btn-primary" onclick="Views.respondChallenge('${c.id}', 'accepted')">Accept</button>
            <button class="btn btn-sm btn-ghost" onclick="Views.respondChallenge('${c.id}', 'declined')">Decline</button>
          </div>` : ""}
      </div>
    </div>`;
}

Views.respondChallenge = function (id, status) {
  Store.respondChallenge(id, status);
  App.toast(status === "accepted" ? "Challenge accepted — good luck!" : "Challenge declined");
  App.render();
};
