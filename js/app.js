/* ============================================================
   TFDrills — App shell, router, shared helpers
   ============================================================ */

const App = (() => {
  const root = () => document.getElementById("app");

  const NAV_ITEMS = [
    { path: "home", icon: "🏠", label: "Home" },
    { path: "random", icon: "🎲", label: "Random" },
    { path: "challenges", icon: "⚔️", label: "Challenge" },
    { path: "board", icon: "🏆", label: "Board" },
    { path: "more", icon: "☰", label: "More" }
  ];

  const FIRE_CLICK_SELECTOR =
    ".btn, .grid-btn, .nav-item, .dash-card, .drill-row, .fav-star, .filter-chip, " +
    ".more-row, .icon-btn, .video-card, .badge-card, .board-row, .picker-option, " +
    ".pool-btn-lg, .back-btn, .challenge-card";

  function esc(str) {
    return String(str ?? "").replace(/[&<>"']/g, (m) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[m]));
  }

  function toast(msg) {
    let t = document.getElementById("toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "toast";
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove("show"), 2400);
  }

  function fireBurst(x, y) {
    const el = document.createElement("div");
    el.className = "fire-burst";
    el.style.left = x + "px";
    el.style.top = y + "px";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 550);
  }

  function navigate(path) {
    location.hash = "#/" + path;
  }

  function parseRoute() {
    const raw = location.hash.replace(/^#\/?/, "");
    const parts = raw.split("/").filter(Boolean);
    return { page: parts[0] || "home", params: parts.slice(1) };
  }

  function renderHeader() {
    const profile = Store.getProfile();
    const unread = Store.unreadCount();
    return `
      <header class="tfd-header">
        <div class="tfd-header-inner">
          <div class="header-utility">
            ${profile ? `<span class="profile-chip">${esc(profile.station)} · ${esc(profile.shift)}</span>` : `<span></span>`}
            <button class="icon-btn" onclick="App.navigate('more')" aria-label="Notifications">
              🔔${unread > 0 ? `<span class="badge-dot">${unread}</span>` : ""}
            </button>
          </div>
          <a href="#/home" class="brand">
            <img src="assets/logo.png" alt="TFDrills" class="brand-logo" />
          </a>
        </div>
      </header>`;
  }

  function renderNav(activePage) {
    return `
      <nav class="bottom-nav">
        ${NAV_ITEMS.map(item => `
          <button class="nav-item ${activePage === item.path ? "active" : ""}" onclick="App.navigate('${item.path}')">
            <span class="nav-icon">${item.icon}</span>
            <span class="nav-label">${item.label}</span>
          </button>
        `).join("")}
      </nav>`;
  }

  function layout(page, contentHtml) {
    return `
      ${renderHeader()}
      <main class="tfd-main">${contentHtml}</main>
      ${renderNav(page)}
    `;
  }

  const ROUTES = {
    home: () => layout("home", Views.home()),
    random: () => layout("random", Views.random()),
    "drills-fire": () => layout("home", Views.drillList("fire")),
    "drills-ems": () => layout("home", Views.drillList("ems")),
    "drills-fitness": () => layout("home", Views.drillList("fitness")),
    drill: (params) => layout("home", Views.drillDetail(params[0])),
    "challenge-new": (params) => layout("challenges", Views.challengeNew(params[0])),
    challenges: () => layout("challenges", Views.challenges()),
    board: () => layout("board", Views.board()),
    videos: () => layout("more", Views.videos()),
    favorites: () => layout("more", Views.favorites()),
    missions: () => layout("more", Views.missions()),
    settings: () => layout("more", Views.settings()),
    more: () => layout("more", Views.more())
  };

  function routeKey(page, params) {
    if (page === "drills" && params[0]) return "drills-" + params[0];
    return page;
  }

  function render() {
    const { page, params } = parseRoute();
    const key = routeKey(page, params);
    const handler = ROUTES[key] || ROUTES.home;

    let html;
    try {
      html = handler(params);
    } catch (e) {
      html = layout("home", Views.home());
    }
    if (!Store.isOnboarded()) {
      html += Views.onboardingModal();
    }

    root().innerHTML = html;
    window.scrollTo(0, 0);
    if (window.Views && Views.afterRender) Views.afterRender(key, params);
  }

  function initFireClickEffect() {
    document.addEventListener("click", (e) => {
      const target = e.target.closest(FIRE_CLICK_SELECTOR);
      if (!target) return;
      fireBurst(e.clientX, e.clientY);
    });
  }

  function init() {
    window.addEventListener("hashchange", render);
    initFireClickEffect();
    render();
  }

  return { init, render, navigate, esc, toast, fireBurst };
})();

document.addEventListener("DOMContentLoaded", App.init);
