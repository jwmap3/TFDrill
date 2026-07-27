/* ============================================================
   View: Onboarding
   ============================================================ */

window.Views = window.Views || {};

Views.onboarding = function () {
  const existing = Store.getProfile() || {};
  return `
    <div class="onboarding-screen">
      <div class="onboarding-card">
        <img src="assets/logo.png" alt="TFDrills" class="onboarding-logo" />
        <h1>Welcome to TFDrills</h1>
        <p class="subtle">Help personalize your experience.</p>

        <form id="onboarding-form" onsubmit="Views.submitOnboarding(event)">
          <label class="field">
            <span>Which station are you assigned to?</span>
            <select name="station" required>
              <option value="" disabled ${!existing.station ? "selected" : ""}>Select a station</option>
              ${STATIONS.map(s => `<option value="${App.esc(s)}" ${existing.station === s ? "selected" : ""}>${s}</option>`).join("")}
            </select>
          </label>

          <label class="field">
            <span>Which shift are you on?</span>
            <div class="shift-toggle">
              ${SHIFTS.map(sh => `
                <label class="shift-option">
                  <input type="radio" name="shift" value="${sh}" ${existing.shift === sh ? "checked" : ""} required />
                  <span>${sh}</span>
                </label>
              `).join("")}
            </div>
          </label>

          <label class="field">
            <span>Email <span class="subtle">(for challenge alerts)</span></span>
            <input type="email" name="email" placeholder="you@example.com" value="${App.esc(existing.email || "")}" />
          </label>

          <label class="field">
            <span>Name <span class="subtle">(optional)</span></span>
            <input type="text" name="name" placeholder="First name" value="${App.esc(existing.name || "")}" />
          </label>

          <button type="submit" class="btn btn-primary btn-block">Enter TFDrills</button>
        </form>

        <p class="fine-print">
          Your station and shift are stored only on this device and are used for challenges and leaderboards.
          No personal information is required.
        </p>
      </div>
    </div>
  `;
};

Views.submitOnboarding = function (event) {
  event.preventDefault();
  const form = event.target;
  const data = new FormData(form);
  const profile = {
    station: data.get("station"),
    shift: data.get("shift"),
    email: data.get("email") || "",
    name: data.get("name") || ""
  };
  Store.setProfile(profile);
  App.toast(`Welcome, ${profile.station} ${profile.shift}!`);
  App.navigate("home");
};
