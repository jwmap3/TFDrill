/* ============================================================
   View: Challenge creation, list, notifications
   ============================================================ */

window.Views = window.Views || {};

function fullShiftFromLetter(letter) {
  const found = SHIFTS.find(s => s.charAt(0).toLowerCase() === String(letter).toLowerCase());
  return found || SHIFTS[0];
}

/* ---------- Start a New Challenge: station -> shift -> drill ---------- */
Views.openStationPicker = function () {
  Views.closeStationPicker();
  const el = document.createElement("div");
  el.id = "station-picker-overlay";
  el.className = "modal-backdrop";
  el.innerHTML = `<div class="picker-sheet picker-sheet-tall">${stationPickerStepHtml()}</div>`;
  el.addEventListener("click", (e) => { if (e.target === el) Views.closeStationPicker(); });
  document.body.appendChild(el);
};

Views.closeStationPicker = function () {
  const el = document.getElementById("station-picker-overlay");
  if (el) el.remove();
};

function stationPickerStepHtml() {
  // Any station is selectable, including your own — you just can't challenge your own shift.
  // (That single combo is disabled one step later, in the shift picker.)
  return `
    <h3>⚔️ Challenge Which Station?</h3>
    <div class="station-grid">
      ${STATIONS.map(s => `
        <button class="station-chip" onclick="Views.stepToShiftPicker('${s.replace("Station ", "")}')">${s.replace("Station ", "")}</button>
      `).join("")}
    </div>
    <button class="picker-close" onclick="Views.closeStationPicker()">Cancel</button>
  `;
}

Views.stepToShiftPicker = function (stationNum) {
  const el = document.getElementById("station-picker-overlay");
  if (!el) return;
  const sheet = el.querySelector(".picker-sheet");
  const profile = Store.getProfile();
  sheet.innerHTML = `
    <button class="picker-back" onclick="Views.stepBackToStations()">&larr; Back</button>
    <h3>⚔️ Station ${App.esc(stationNum)} — Which Shift?</h3>
    <div class="shift-grid-picker">
      ${SHIFTS.map(sh => {
        const isSelf = profile && profile.station === "Station " + stationNum && profile.shift === sh;
        return `
          <button class="picker-option" ${isSelf ? "disabled" : ""} onclick="Views.confirmChallengeTarget('${stationNum}','${sh.charAt(0)}')">
            <span class="picker-icon">🕐</span><span>${sh}</span>
          </button>`;
      }).join("")}
    </div>
    <button class="picker-close" onclick="Views.closeStationPicker()">Cancel</button>
  `;
};

Views.stepBackToStations = function () {
  const el = document.getElementById("station-picker-overlay");
  if (!el) return;
  el.querySelector(".picker-sheet").innerHTML = stationPickerStepHtml();
};

Views.confirmChallengeTarget = function (stationNum, shiftLetter) {
  Views.closeStationPicker();
  App.navigate(`challenge-to/${stationNum}/${shiftLetter}`);
};

Views.challengeToForm = function (stationNum, shiftLetter) {
  const toStation = "Station " + stationNum;
  const toShift = fullShiftFromLetter(shiftLetter);
  const profile = Store.getProfile();

  return `
    <section>
      <div class="page-header">
        <button class="back-btn" onclick="App.navigate('challenges')">&larr;</button>
        <h2>⚔️ Challenge ${App.esc(toStation)} ${App.esc(toShift)}</h2>
      </div>

      <div class="panel">
        <p class="subtle">From ${App.esc(profile ? profile.station : "")} ${App.esc(profile ? profile.shift : "")}</p>

        <form onsubmit="Views.submitChallengeTo(event, '${App.esc(stationNum)}', '${App.esc(shiftLetter)}')">
          <label class="field">
            <span>Drill to Challenge On</span>
            <select name="drillId" required>
              <option value="" disabled selected>Select a drill</option>
              <optgroup label="Fire">
                ${FIRE_DRILLS.map(d => `<option value="${d.id}">${App.esc(d.name)}</option>`).join("")}
              </optgroup>
              <optgroup label="EMS">
                ${EMS_DRILLS.map(d => `<option value="${d.id}">${App.esc(d.name)}</option>`).join("")}
              </optgroup>
              <optgroup label="Fitness">
                ${FITNESS_WORKOUTS.map(d => `<option value="${d.id}">${App.esc(d.name)}</option>`).join("")}
              </optgroup>
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

Views.submitChallengeTo = function (event, stationNum, shiftLetter) {
  event.preventDefault();
  const profile = Store.getProfile();
  const data = new FormData(event.target);
  const d = findDrill(data.get("drillId"));
  const toStation = "Station " + stationNum;
  const toShift = fullShiftFromLetter(shiftLetter);

  if (profile && toStation === profile.station && toShift === profile.shift) {
    App.toast("That's your own crew — pick a different shift or station.");
    return;
  }

  Store.addChallenge({
    fromStation: profile.station,
    fromShift: profile.shift,
    toStation,
    toShift,
    drillName: d ? d.name : "Unknown Drill",
    timeToBeat: data.get("timeToBeat"),
    message: data.get("message") || ""
  });

  App.toast("Challenge sent!");
  App.navigate("challenges");
};

/* ---------- Legacy entry: challenge from a drill's detail page ---------- */
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
        <p class="subtle">From ${App.esc(profile ? profile.station : "")} ${App.esc(profile ? profile.shift : "")}</p>

        <form onsubmit="Views.submitChallenge(event, '${d.id}')">
          <label class="field">
            <span>Challenge Station</span>
            <select name="toStation" required>
              <option value="" disabled selected>Select a station</option>
              ${STATIONS.map(s => `<option value="${App.esc(s)}">${s}</option>`).join("")}
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
  const toStation = data.get("toStation");
  const toShift = data.get("toShift");

  if (profile && toStation === profile.station && toShift === profile.shift) {
    App.toast("That's your own crew — pick a different shift or station.");
    return;
  }

  Store.addChallenge({
    fromStation: profile.station,
    fromShift: profile.shift,
    toStation,
    toShift,
    drillName: d.name,
    timeToBeat: data.get("timeToBeat"),
    message: data.get("message") || ""
  });

  App.toast("Challenge sent!");
  App.navigate("challenges");
};

/* ---------- Challenges list ---------- */
Views.challenges = function () {
  const profile = Store.getProfile();
  const all = Store.getChallenges();
  const received = profile ? all.filter(c => c.toStation === profile.station && c.toShift === profile.shift) : [];
  const sent = profile ? all.filter(c => c.fromStation === profile.station && c.fromShift === profile.shift) : [];
  const others = all.filter(c => !received.includes(c) && !sent.includes(c));

  return `
    <section>
      <div class="page-header">
        <h2>⚔️ Challenge a Crew</h2>
      </div>

      <button class="btn btn-primary btn-block" onclick="Views.openStationPicker()" style="margin-bottom:16px;">
        ⚔️ Start a New Challenge
      </button>

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
