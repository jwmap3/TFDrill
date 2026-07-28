/* ============================================================
   TFDrills — App shell, router, shared helpers
   ============================================================ */

const App = (() => {
  const root = () => document.getElementById("app");

  const NAV_ITEMS = [
    { path: "home", icon: "🏠", label: "Home", onclick: "App.navigate('home')" },
    { path: "drills", icon: "🚒", label: "All Drills", onclick: "Views.openDrillsPicker()" },
    { path: "challenges", icon: "⚔️", label: "Challenge a Crew", onclick: "App.navigate('challenges')" },
    { path: "board", icon: "🏆", label: "Challenge Board", onclick: "App.navigate('board')" },
    { path: "more", icon: "☰", label: "More", onclick: "App.navigate('more')" }
  ];

  const FIRE_CLICK_SELECTOR =
    ".btn, .grid-btn, .dash-card, .drill-row, .fav-star, .filter-chip, " +
    ".more-row, .video-card, .badge-card, .board-row, .picker-option, " +
    ".pool-btn-lg, .back-btn, .challenge-card, .station-chip, " +
    ".sidebar-nav-item, .feed-card, .identity-card, .side-challenge-row, .floating-icon-btn, .home-bubble";

  const HELMET_ICON = `<img src="assets/helmet.png" alt="" class="helmet-icon" aria-hidden="true" />`;

  const CHAT_COLORS = ["#c8102e", "#2f6fed", "#16255c", "#45566b", "#1f9457", "#b9790a", "#7c3aed", "#0891b2"];
  function chatColor(sender) {
    let h = 0;
    for (let i = 0; i < sender.length; i++) h = (h * 31 + sender.charCodeAt(i)) >>> 0;
    return CHAT_COLORS[h % CHAT_COLORS.length];
  }
  let _chatOpen = false;

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

  function renderFloatingIcons() {
    const unread = Store.unreadCount();
    return `
      <div class="floating-icons">
        <a href="#/home" class="floating-icon-btn floating-logo-btn" aria-label="TFDrills home">
          <img src="assets/logo3.png" alt="TFDrills" class="floating-logo-img" />
        </a>
        <button class="floating-icon-btn" onclick="App.navigate('profile')" aria-label="Your profile">
          ${HELMET_ICON}
        </button>
        <button class="floating-icon-btn" onclick="App.navigate('notifications')" aria-label="Notifications">
          <span class="envelope-flame">✉️<span class="flame-badge">🔥</span></span>
          ${unread > 0 ? `<span class="badge-dot">${unread}</span>` : ""}
        </button>
        <button class="floating-icon-btn" onclick="Views.openFootagePicker()" aria-label="Drill Footage">
          <span class="floating-emoji">🎬</span>
        </button>
        <button class="floating-icon-btn" onclick="App.navigate('random')" aria-label="Random Drill">
          <span class="floating-emoji">🎲</span>
        </button>
        <button class="floating-icon-btn" onclick="App.toggleChat()" aria-label="Random Chat">
          <span class="floating-emoji">💬</span>
        </button>
      </div>`;
  }

  function renderSidebar(activePage) {
    return `
      <aside class="left-sidebar">
        <nav class="sidebar-nav">
          ${NAV_ITEMS.map(item => `
            <button class="sidebar-nav-item ${activePage === item.path ? "active" : ""}" onclick="${item.onclick}">
              <span class="sidebar-nav-icon">${item.icon}</span>
              <span class="sidebar-nav-label">${item.label}</span>
            </button>
          `).join("")}
        </nav>
        <div class="light-bar sidebar-lightbar"><span class="lb-red"></span><span class="lb-blue"></span></div>
      </aside>`;
  }

  function renderChatPanel() {
    const profile = Store.getProfile();
    const me = profile ? profile.station + " " + profile.shift : "You";
    const messages = Store.getChatMessages();
    return `
      <div class="chat-panel ${_chatOpen ? "open" : ""}" id="chat-panel">
        <div class="chat-panel-header">
          <span>💬 Random Chat</span>
          <button class="chat-close" onclick="App.toggleChat()" aria-label="Close chat">✕</button>
        </div>
        <div class="chat-messages" id="chat-messages">
          ${messages.map(m => `
            <div class="chat-bubble-row ${m.sender === me ? "chat-bubble-row-me" : ""}">
              <div class="chat-bubble" style="--bubble-color:${chatColor(m.sender)}">
                <div class="chat-bubble-sender">${esc(m.sender)}</div>
                <div class="chat-bubble-text">${esc(m.text)}</div>
              </div>
            </div>`).join("")}
        </div>
        <form class="chat-input-row" onsubmit="App.sendChatMessage(event)">
          <input type="text" id="chat-input" placeholder="Say something to the department..." autocomplete="off" />
          <button type="submit" class="chat-send-btn" aria-label="Send">&#10148;</button>
        </form>
      </div>`;
  }

  function toggleChat() {
    _chatOpen = !_chatOpen;
    render();
    if (_chatOpen) scrollChatToBottom();
  }

  function scrollChatToBottom() {
    setTimeout(() => {
      const box = document.getElementById("chat-messages");
      if (box) box.scrollTop = box.scrollHeight;
    }, 0);
  }

  function sendChatMessage(event) {
    event.preventDefault();
    const input = document.getElementById("chat-input");
    const text = input ? input.value.trim() : "";
    if (!text) return;
    const profile = Store.getProfile();
    const me = profile ? profile.station + " " + profile.shift : "You";
    Store.addChatMessage(me, text);
    render();
    scrollChatToBottom();
    const freshInput = document.getElementById("chat-input");
    if (freshInput) freshInput.focus();
  }

  function layout(page, contentHtml) {
    return `
      <div class="app-shell">
        ${renderSidebar(page)}
        <div class="app-content">
          <main class="tfd-main">${contentHtml}</main>
        </div>
      </div>
      ${renderFloatingIcons()}
      ${renderChatPanel()}
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
    "challenge-to": (params) => layout("challenges", Views.challengeToForm(params[0], params[1])),
    challenges: () => layout("challenges", Views.challenges()),
    board: () => layout("board", Views.board()),
    videos: (params) => layout("more", Views.videos(params[0])),
    favorites: () => layout("more", Views.favorites()),
    missions: () => layout("more", Views.missions()),
    settings: () => layout("more", Views.settings()),
    stats: () => layout("more", Views.stats()),
    more: () => layout("more", Views.more()),
    profile: () => layout("home", Views.profileMenu()),
    notifications: () => layout("home", Views.notificationsPage())
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

  function dismissSplash() {
    const splash = document.getElementById("splash");
    if (!splash || splash.classList.contains("splash-hide")) return;
    splash.classList.add("splash-hide");
    setTimeout(() => splash.remove(), 500);
  }

  function init() {
    window.addEventListener("hashchange", render);
    initFireClickEffect();
    render();
    setTimeout(dismissSplash, 1300);
  }

  return { init, render, navigate, esc, toast, fireBurst, toggleChat, sendChatMessage, dismissSplash };
})();

document.addEventListener("DOMContentLoaded", App.init);
