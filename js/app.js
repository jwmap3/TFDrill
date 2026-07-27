/* ============================================================
   TFDrills — App shell, router, shared helpers
   ============================================================ */

const App = (() => {
  const root = () => document.getElementById("app");

  const NAV_ITEMS = [
    { path: "home", icon: "🏠", label: "Home" },
    { path: "random", icon: "🎲", label: "Random" },
    { path: "challenges", icon: "⚔️", label: "Challenges" },
    { path: "board", icon: "🏆", label: "Board" },
    { path: "more", icon: "☰", label: "More" }
  ];

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
          <a href="#/home" class="brand">
            <img src="assets/logo.png" alt="TFDrills" class="brand-logo" />
            <span class="brand-text">TFDRILLS</span>
          </a>
          <div class="header-right">
            ${profile ? `<span class="profile-chip">${esc(profile.station)} · ${esc(profile.shift)}</span>` : ""}
            <button class="icon-btn" onclick="App.navigate('more')" aria-label="Notifications">
              🔔${unread > 0 ? `<span class="badge-dot">${unread}</span>` : ""}
            </button>
          </div>
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
    onboarding: () => Views.onboarding(),
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

    if (!Store.isOnboarded() && page !== "onboarding") {
      location.hash = "#/onboarding";
      return;
    }
    if (Store.isOnboarded() && page === "onboarding" && params[0] !== "edit") {
      location.hash = "#/home";
      return;
    }

    const key = routeKey(page, params);
    const handler = ROUTES[key] || ROUTES[page];
    root().innerHTML = handler ? handler(params) : layout("home", `<div class="empty-state">Page not found.</div>`);
    window.scrollTo(0, 0);
    if (window.Views && Views.afterRender) Views.afterRender(key, params);
  }

  function init() {
    window.addEventListener("hashchange", render);
    render();
  }

  return { init, render, navigate, esc, toast };
})();

document.addEventListener("DOMContentLoaded", App.init);
