/* ============================================================
   TFDrills — Stylesheet (light theme)
   Fast, clean, mobile-first. Palette pulled from the TFDrills mark:
   warm off-white background, fire red, steel blue, gold accents.
   ============================================================ */

:root {
  --bg: #f6f4f0;
  --bg-elevated: #ffffff;
  --bg-card: #ffffff;
  --border: #e4e0d8;
  --red: #e11d2e;
  --red-dark: #b3121f;
  --blue: #2f6fed;
  --blue-dark: #1f4dab;
  --white: #1a1a1d;
  --gray: #6b6d78;
  --gray-dim: #9a9ca6;
  --green: #1f9457;
  --amber: #b9790a;
  --radius: 14px;
  --radius-sm: 9px;
  --font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --shadow-card: 0 1px 2px rgba(30, 20, 10, 0.05), 0 1px 8px rgba(30, 20, 10, 0.04);
}

* { box-sizing: border-box; }

html, body {
  margin: 0;
  padding: 0;
  background: var(--bg);
  color: var(--white);
  font-family: var(--font);
  -webkit-font-smoothing: antialiased;
}

body {
  padding-bottom: 76px;
}

a { color: inherit; text-decoration: none; }
ul, ol { margin: 8px 0; padding-left: 20px; }
h1, h2, h3, h4 { margin: 0 0 10px; }

.subtle { color: var(--gray); font-size: 0.88rem; }
.fine-print { color: var(--gray-dim); font-size: 0.78rem; line-height: 1.5; margin-top: 12px; }
.link-small { color: var(--blue); font-size: 0.85rem; cursor: pointer; }

/* ---------------- Boot loader ---------------- */
.boot-loader {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.boot-loader img { width: 96px; opacity: 0.85; }

/* ---------------- Header ---------------- */
.tfd-header {
  position: sticky;
  top: 0;
  z-index: 20;
  background: rgba(246, 244, 240, 0.94);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border);
}
.tfd-header-inner {
  max-width: 720px;
  margin: 0 auto;
  position: relative;
  padding: 8px 16px 10px;
}
.header-utility {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2px;
}
.brand {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px 0 4px;
}
.brand-logo { height: 52px; width: auto; object-fit: contain; }
.header-right { display: flex; align-items: center; gap: 10px; }
.profile-chip {
  font-size: 0.72rem;
  color: var(--gray);
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  padding: 4px 10px;
  border-radius: 999px;
  white-space: nowrap;
}
.icon-btn {
  position: relative;
  background: none;
  border: none;
  color: var(--white);
  font-size: 1.15rem;
  cursor: pointer;
  padding: 4px;
  border-radius: 8px;
  transition: background 0.15s ease;
}
.icon-btn:hover { background: rgba(20, 20, 20, 0.06); }
.badge-dot {
  position: absolute;
  top: -2px;
  right: -6px;
  background: var(--red);
  color: white;
  font-size: 0.6rem;
  border-radius: 999px;
  padding: 1px 5px;
  font-weight: 700;
}

/* ---------------- Main / layout ---------------- */
.tfd-main {
  max-width: 720px;
  margin: 0 auto;
  padding: 16px;
}
.page-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}
.page-header h2 { font-size: 1.2rem; }
.back-btn {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  color: var(--white);
  width: 34px;
  height: 34px;
  border-radius: 999px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.15s ease, border-color 0.15s ease;
}
.back-btn:hover { background: rgba(20, 20, 20, 0.05); border-color: var(--gray-dim); }
.section-title { font-size: 1.15rem; margin: 20px 0 12px; }

/* ---------------- Bottom nav ---------------- */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  background: var(--bg-elevated);
  border-top: 1px solid var(--border);
  z-index: 20;
  padding-bottom: env(safe-area-inset-bottom);
}
.nav-item {
  flex: 1;
  background: none;
  border: none;
  color: var(--gray);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 9px 0 8px;
  cursor: pointer;
  font-family: inherit;
  transition: color 0.15s ease, background 0.15s ease;
}
.nav-item:hover { background: rgba(225, 29, 46, 0.06); }
.nav-item.active { color: var(--red); }
.nav-icon { font-size: 1.25rem; }
.nav-label { font-size: 0.64rem; font-weight: 600; letter-spacing: 0.02em; }

/* ---------------- Buttons ---------------- */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border-radius: var(--radius-sm);
  padding: 12px 16px;
  font-size: 0.92rem;
  font-weight: 700;
  border: 1px solid transparent;
  cursor: pointer;
  font-family: inherit;
  transition: transform 0.06s ease, opacity 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease;
}
.btn:active { transform: scale(0.97); }
.btn:hover { filter: brightness(1.03); box-shadow: var(--shadow-card); }
.btn-block { width: 100%; }
.btn-sm { padding: 8px 12px; font-size: 0.8rem; }
.btn-primary { background: linear-gradient(90deg, var(--red), var(--red-dark)); color: white; }
.btn-outline { background: var(--bg-elevated); border-color: var(--border); color: var(--white); }
.btn-ghost { background: transparent; border-color: var(--border); color: var(--gray); }
.btn-fav-active { background: var(--amber); color: #2a1a00; border-color: var(--amber); }
.btn-donate { background: linear-gradient(90deg, var(--green), #17794a); color: white; }
.btn-share {
  background: none;
  border: 1px dashed var(--border);
  color: var(--gray);
  font-size: 0.8rem;
  padding: 8px 14px;
  border-radius: 999px;
  cursor: pointer;
  font-family: inherit;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 10px;
  transition: border-color 0.15s ease, color 0.15s ease, background 0.15s ease;
}
.btn-share:hover { border-color: var(--blue); color: var(--blue); background: rgba(47, 111, 237, 0.06); }

/* ---------------- Modal / overlay (onboarding, pickers) ---------------- */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(20, 16, 10, 0.45);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 20px;
  animation: fadeIn 0.18s ease;
}
.modal-card {
  max-width: 420px;
  width: 100%;
  max-height: 88vh;
  overflow-y: auto;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 28px 24px;
  text-align: center;
  box-shadow: 0 12px 40px rgba(20, 16, 10, 0.18);
  animation: modalIn 0.22s cubic-bezier(0.2, 0.8, 0.3, 1);
}
.modal-logo { width: 76px; margin-bottom: 8px; }
.modal-card h1 { font-size: 1.25rem; }
.modal-card form { text-align: left; margin-top: 16px; }

.picker-sheet {
  max-width: 420px;
  width: 100%;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px;
  box-shadow: 0 12px 40px rgba(20, 16, 10, 0.18);
  animation: modalIn 0.22s cubic-bezier(0.2, 0.8, 0.3, 1);
}
.picker-sheet h3 { text-align: center; margin-bottom: 14px; }
.picker-option {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-left: 4px solid var(--accent, var(--red));
  border-radius: var(--radius-sm);
  padding: 14px 16px;
  margin-bottom: 10px;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.98rem;
  font-weight: 700;
  color: var(--white);
  transition: background 0.15s ease, transform 0.1s ease, box-shadow 0.15s ease;
}
.picker-option:hover { background: color-mix(in srgb, var(--accent, var(--red)) 8%, white); box-shadow: var(--shadow-card); transform: translateY(-1px); }
.picker-option .picker-icon { font-size: 1.4rem; }
.picker-close {
  width: 100%;
  background: none;
  border: none;
  color: var(--gray);
  padding: 10px;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.86rem;
}

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes modalIn { from { opacity: 0; transform: translateY(10px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }

/* ---------------- Onboarding form fields (used in modal) ---------------- */
.field { display: block; margin-bottom: 16px; }
.field > span { display: block; font-size: 0.82rem; color: var(--gray); margin-bottom: 6px; font-weight: 600; }
.field select, .field input[type="text"], .field input[type="email"], .field textarea {
  width: 100%;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  color: var(--white);
  border-radius: var(--radius-sm);
  padding: 11px 12px;
  font-size: 0.95rem;
  font-family: inherit;
  transition: border-color 0.15s ease;
}
.field select:focus, .field input:focus, .field textarea:focus { border-color: var(--blue); outline: none; }
.field textarea { resize: vertical; }

.shift-toggle { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.shift-option {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 10px 6px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: background 0.15s ease, border-color 0.15s ease;
}
.shift-option:hover { background: rgba(225, 29, 46, 0.05); }
.shift-option input { accent-color: var(--red); }
.shift-option:has(input:checked) { border-color: var(--red); background: rgba(225, 29, 46, 0.1); }

/* ---------------- Dashboard ---------------- */
.dash-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 16px;
}
.dash-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 14px;
  cursor: pointer;
  box-shadow: var(--shadow-card);
  transition: transform 0.12s ease, box-shadow 0.15s ease;
}
.dash-card:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(20, 16, 10, 0.09); }
.dash-card-label { font-size: 0.7rem; color: var(--gray-dim); text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 6px; }
.dash-card-main { font-weight: 700; font-size: 0.98rem; margin-bottom: 3px; }
.dash-card-sub { font-size: 0.76rem; color: var(--gray); }

.panel {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px;
  margin-bottom: 14px;
  box-shadow: var(--shadow-card);
}
.panel-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
.panel-header h3 { margin: 0; }

.mission-row { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
.mission-label { flex: 1 1 auto; font-size: 0.82rem; }
.mission-bar { flex: 1 1 80px; height: 6px; background: var(--bg); border-radius: 999px; overflow: hidden; }
.mission-fill { height: 100%; background: linear-gradient(90deg, var(--red), var(--blue)); }
.mission-count { font-size: 0.76rem; color: var(--gray); width: 34px; text-align: right; }

.mini-video-list { display: flex; flex-direction: column; gap: 8px; }
.mini-video-row { display: flex; justify-content: space-between; font-size: 0.82rem; }
.mini-video-drill { font-weight: 600; }
.mini-video-meta { color: var(--gray); font-size: 0.76rem; }

/* ---------------- Hero "Get Training" grid ---------------- */
.hero-grid-section { margin-top: 4px; }
.button-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.grid-btn {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  color: var(--white);
  font-family: inherit;
  box-shadow: var(--shadow-card);
  transition: transform 0.12s ease, box-shadow 0.15s ease, border-color 0.15s ease;
}
.grid-btn:hover {
  transform: translateY(-3px);
  border-color: var(--accent, var(--red));
  box-shadow: 0 8px 20px color-mix(in srgb, var(--accent, var(--red)) 22%, transparent);
}
.grid-btn-icon-wrap {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  background: color-mix(in srgb, var(--accent, var(--red)) 14%, white);
}
.grid-btn-label { font-size: 0.82rem; font-weight: 700; text-align: center; }

/* ---------------- Drill list / detail ---------------- */
.subcat-title { font-size: 0.85rem; color: var(--gray); text-transform: uppercase; letter-spacing: 0.03em; margin-bottom: 8px; }
.drill-list { display: flex; flex-direction: column; gap: 8px; }
.drill-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 12px;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease;
}
.drill-row:hover { background: rgba(47, 111, 237, 0.05); border-color: var(--blue); }
.drill-row-name { font-weight: 700; font-size: 0.92rem; }
.drill-row-meta { font-size: 0.76rem; color: var(--gray); margin-top: 2px; }
.fav-star { font-size: 1.3rem; color: var(--gray-dim); cursor: pointer; padding: 4px; transition: transform 0.15s ease, color 0.15s ease; }
.fav-star:hover { transform: scale(1.15); }
.fav-star.active { color: var(--amber); }

.drill-detail h4 { margin-top: 18px; font-size: 0.92rem; color: var(--blue); }
.chip-row { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 4px; }
.chip {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 0.74rem;
  color: var(--gray);
}
.chip-cat { color: var(--blue); border-color: var(--blue); }
.plain-list li { margin-bottom: 4px; font-size: 0.9rem; line-height: 1.4; }
.standard-text {
  font-size: 0.9rem;
  background: rgba(47, 111, 237, 0.08);
  border-left: 3px solid var(--blue);
  padding: 10px 12px;
  border-radius: 0 8px 8px 0;
}
.coming-soon {
  font-size: 0.85rem;
  color: var(--gray);
  background: var(--bg);
  border: 1px dashed var(--border);
  border-radius: var(--radius-sm);
  padding: 12px 14px;
}

.timer-box {
  margin-top: 20px;
  text-align: center;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px;
}
.timer-display { font-size: 2.2rem; font-weight: 800; font-variant-numeric: tabular-nums; margin-bottom: 10px; }
.timer-controls { display: flex; gap: 10px; justify-content: center; }

.action-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 16px; }

/* ---------------- Random Drill hero ---------------- */
.random-hero { text-align: center; }
.dice-emoji {
  font-size: 3.4rem;
  margin: 10px 0 4px;
  display: inline-block;
}
.dice-emoji.dice-shaking { animation: diceShake 0.35s ease-in-out infinite; }
@keyframes diceShake {
  0% { transform: rotate(0deg) translateX(0); }
  20% { transform: rotate(-14deg) translateX(-4px); }
  40% { transform: rotate(12deg) translateX(4px); }
  60% { transform: rotate(-10deg) translateX(-3px); }
  80% { transform: rotate(8deg) translateX(3px); }
  100% { transform: rotate(0deg) translateX(0); }
}
.pool-grid-lg {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin: 18px 0;
}
.pool-btn-lg {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 26px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  font-family: inherit;
  font-weight: 800;
  font-size: 0.95rem;
  color: var(--white);
  cursor: pointer;
  box-shadow: var(--shadow-card);
  transition: transform 0.12s ease, box-shadow 0.15s ease, border-color 0.15s ease;
}
.pool-btn-lg span { font-size: 1.9rem; }
.pool-btn-lg:hover {
  transform: translateY(-3px);
  border-color: var(--accent, var(--red));
  box-shadow: 0 8px 22px color-mix(in srgb, var(--accent, var(--red)) 25%, transparent);
}
.pool-btn-all { grid-column: 1 / -1; flex-direction: row; justify-content: center; padding: 18px; }

.reveal-wrap { margin-top: 8px; }
.reveal-card {
  background: var(--bg-card);
  border: 2px solid var(--accent, var(--red));
  border-radius: var(--radius);
  padding: 22px 18px;
  text-align: center;
  box-shadow: 0 10px 28px color-mix(in srgb, var(--accent, var(--red)) 20%, transparent);
  animation: revealIn 0.4s cubic-bezier(0.2, 0.8, 0.3, 1);
}
@keyframes revealIn {
  0% { opacity: 0; transform: scale(0.85) translateY(8px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}
.reveal-label { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--gray-dim); margin-bottom: 6px; }
.reveal-name { font-size: 1.3rem; font-weight: 800; margin-bottom: 6px; }
.reveal-meta { font-size: 0.84rem; color: var(--gray); margin-bottom: 16px; }

/* ---------------- Challenges ---------------- */
.callout {
  background: rgba(225, 29, 46, 0.07);
  border: 1px solid var(--red);
  border-radius: var(--radius-sm);
  padding: 10px 12px;
  font-size: 0.82rem;
  margin: 14px 0;
}
.challenge-drill-name { font-size: 1.1rem; font-weight: 800; }
.challenge-card {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 14px;
  margin-bottom: 10px;
  transition: box-shadow 0.15s ease;
}
.challenge-card:hover { box-shadow: var(--shadow-card); }
.challenge-card-top { display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 0.86rem; flex-wrap: wrap; }
.vs { color: var(--red); font-size: 0.72rem; }
.challenge-card-drill { margin-top: 6px; font-weight: 700; color: var(--blue); }
.challenge-card-time { font-size: 0.84rem; margin-top: 4px; }
.challenge-card-msg { font-size: 0.82rem; color: var(--gray); font-style: italic; margin-top: 6px; }
.challenge-card-bottom { display: flex; align-items: center; justify-content: space-between; margin-top: 10px; }
.status-pill { font-size: 0.72rem; padding: 3px 10px; border-radius: 999px; text-transform: capitalize; font-weight: 700; }
.status-pending { background: rgba(185, 121, 10, 0.14); color: var(--amber); }
.status-accepted { background: rgba(31, 148, 87, 0.14); color: var(--green); }
.status-declined { background: rgba(154, 156, 166, 0.14); color: var(--gray); }
.challenge-actions { display: flex; gap: 8px; }

/* ---------------- Board ---------------- */
.filter-row { display: flex; gap: 8px; margin-bottom: 10px; flex-wrap: wrap; }
.filter-chip {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  color: var(--gray);
  border-radius: 999px;
  padding: 7px 14px;
  font-size: 0.8rem;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}
.filter-chip:hover { border-color: var(--red); color: var(--red); }
.filter-chip.active { background: var(--red); color: white; border-color: var(--red); }

.board-list { display: flex; flex-direction: column; gap: 8px; }
.board-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  border-radius: var(--radius-sm);
  transition: background 0.15s ease;
}
.board-row:hover { background: var(--bg); }
.board-row-me { background: rgba(47, 111, 237, 0.08); border: 1px solid var(--blue); }
.board-rank { font-weight: 800; font-size: 1rem; width: 34px; color: var(--gray); }
.board-main { flex: 1; }
.board-crew { font-weight: 700; font-size: 0.9rem; }
.board-badges { font-size: 0.9rem; margin-top: 2px; }
.board-stats { text-align: right; font-size: 0.82rem; }

.activity-feed { display: flex; flex-direction: column; gap: 12px; }
.activity-row { display: flex; gap: 10px; align-items: flex-start; }
.activity-dot { width: 8px; height: 8px; border-radius: 999px; background: var(--red); margin-top: 6px; flex-shrink: 0; }
.activity-text { font-size: 0.86rem; }
.activity-time { font-size: 0.72rem; color: var(--gray-dim); }

/* ---------------- Videos ---------------- */
.search-input {
  width: 100%;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  color: var(--white);
  border-radius: var(--radius-sm);
  padding: 11px 14px;
  font-size: 0.9rem;
  margin-bottom: 12px;
  font-family: inherit;
  transition: border-color 0.15s ease;
}
.search-input:focus { border-color: var(--blue); outline: none; }
.video-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.video-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow-card);
  transition: transform 0.12s ease;
}
.video-card:hover { transform: translateY(-2px); }
.video-thumb {
  height: 76px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--red-dark), var(--blue-dark));
  font-size: 1.5rem;
  color: white;
}
.video-card-body { padding: 10px; }
.video-drill { font-weight: 700; font-size: 0.82rem; line-height: 1.3; }
.video-meta { font-size: 0.72rem; color: var(--gray); margin-top: 3px; }
.video-stats { font-size: 0.72rem; color: var(--gray-dim); margin-top: 4px; }

/* ---------------- Missions / Badges ---------------- */
.mission-row-full { margin-bottom: 14px; }
.mission-row-full.mission-complete .mission-row-top { color: var(--green); }
.mission-row-top { display: flex; justify-content: space-between; font-size: 0.88rem; margin-bottom: 6px; }

.badge-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.badge-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 14px;
  text-align: center;
  box-shadow: var(--shadow-card);
  transition: transform 0.12s ease;
}
.badge-card:hover { transform: translateY(-2px); }
.badge-icon { font-size: 1.8rem; margin-bottom: 6px; }
.badge-name { font-weight: 700; font-size: 0.85rem; }
.badge-desc { font-size: 0.72rem; color: var(--gray); margin-top: 4px; }

/* ---------------- More / notifications / donate ---------------- */
.more-list { display: flex; flex-direction: column; gap: 4px; }
.more-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  color: var(--white);
  padding: 12px 8px;
  border-bottom: 1px solid var(--border);
  cursor: pointer;
  font-family: inherit;
  font-size: 0.9rem;
  border-radius: 8px;
  transition: background 0.15s ease;
}
.more-row:hover { background: var(--bg); }
.more-row:last-child { border-bottom: none; }

.notif-row { padding: 10px 0; border-bottom: 1px solid var(--border); }
.notif-row:last-child { border-bottom: none; }
.notif-title { font-weight: 700; font-size: 0.86rem; }
.notif-body { font-size: 0.8rem; color: var(--gray); margin-top: 2px; }
.notif-unread .notif-title::before { content: "● "; color: var(--red); }

.donate-panel { border-color: var(--green); margin-top: 4px; }
.transparency { margin-top: 12px; font-size: 0.82rem; color: var(--gray); }
.transparency summary { cursor: pointer; color: var(--green); font-weight: 600; margin-bottom: 8px; }

/* ---------------- Misc ---------------- */
.empty-state {
  text-align: center;
  color: var(--gray-dim);
  padding: 40px 20px;
  font-size: 0.9rem;
}

#toast {
  position: fixed;
  bottom: 88px;
  left: 50%;
  transform: translateX(-50%) translateY(20px);
  background: #1a1a1d;
  border: 1px solid #2a2a2d;
  color: white;
  padding: 10px 18px;
  border-radius: 999px;
  font-size: 0.84rem;
  opacity: 0;
  transition: opacity 0.2s ease, transform 0.2s ease;
  pointer-events: none;
  z-index: 150;
  white-space: nowrap;
}
#toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }

/* ---------------- Fire click effect ---------------- */
.fire-burst {
  position: fixed;
  width: 26px;
  height: 26px;
  margin-left: -13px;
  margin-top: -13px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 180, 60, 0.9) 0%, rgba(225, 29, 46, 0.6) 55%, rgba(225, 29, 46, 0) 75%);
  pointer-events: none;
  z-index: 9999;
  animation: fireBurst 0.5s ease-out forwards;
}
@keyframes fireBurst {
  0% { opacity: 0.9; transform: scale(0.3) translateY(0); }
  70% { opacity: 0.5; }
  100% { opacity: 0; transform: scale(1.6) translateY(-14px); }
}

/* ---------------- Desktop widening ---------------- */
@media (min-width: 720px) {
  .bottom-nav { max-width: 720px; left: 50%; transform: translateX(-50%); border-radius: var(--radius) var(--radius) 0 0; border-left: 1px solid var(--border); border-right: 1px solid var(--border); }
}
