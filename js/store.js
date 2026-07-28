/* ============================================================
   TFDrills — Local persistence layer (localStorage)
   This is a frontend-only prototype. Swap these functions for
   real API calls once a backend is connected — the rest of the
   app only talks to Store, never to localStorage directly.
   ============================================================ */

const Store = (() => {
  const KEYS = {
    PROFILE: "tfd_profile",
    FAVORITES: "tfd_favorites",
    CHALLENGES: "tfd_challenges",
    NOTIFICATIONS: "tfd_notifications",
    RESULTS: "tfd_results",
    MISSIONS: "tfd_missions",
    MISSION_WEEK: "tfd_mission_week",
    SEEDED: "tfd_seeded",
    CHAT: "tfd_chat"
  };

  function read(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }
  function write(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /* ---------- Profile ---------- */
  function getProfile() {
    return read(KEYS.PROFILE, null);
  }
  function setProfile(profile) {
    write(KEYS.PROFILE, profile);
  }
  function isOnboarded() {
    const p = getProfile();
    return !!(p && p.station && p.shift);
  }

  /* ---------- Favorites ---------- */
  function getFavorites() {
    return read(KEYS.FAVORITES, []);
  }
  function isFavorite(drillId) {
    return getFavorites().includes(drillId);
  }
  function toggleFavorite(drillId) {
    const favs = getFavorites();
    const idx = favs.indexOf(drillId);
    if (idx >= 0) favs.splice(idx, 1);
    else favs.push(drillId);
    write(KEYS.FAVORITES, favs);
    return favs.includes(drillId);
  }

  /* ---------- Results (completed drills, for missions/badges) ---------- */
  function getResults() {
    return read(KEYS.RESULTS, []);
  }
  function addResult(result) {
    const results = getResults();
    results.unshift({ ...result, ts: Date.now() });
    write(KEYS.RESULTS, results);
    bumpMissionProgress(result.category);
    return results;
  }

  /* ---------- Challenges ---------- */
  function getChallenges() {
    return read(KEYS.CHALLENGES, seedChallenges());
  }
  function addChallenge(challenge) {
    const list = getChallenges();
    const withId = { ...challenge, id: "c" + Date.now(), createdAt: Date.now(), status: "pending" };
    list.unshift(withId);
    write(KEYS.CHALLENGES, list);
    addNotification({
      title: "Challenge Sent",
      body: `You challenged ${challenge.toStation} ${challenge.toShift} to ${challenge.drillName}.`
    });
    return withId;
  }
  function respondChallenge(id, status) {
    const list = getChallenges();
    const c = list.find(c => c.id === id);
    if (c) c.status = status;
    write(KEYS.CHALLENGES, list);
    return c;
  }
  function seedChallenges() {
    const seeded = [
      {
        id: "seed1", fromStation: "Station 17", fromShift: "A Shift",
        toStation: "Station 5", toShift: "C Shift",
        drillName: "The Denver Drill", timeToBeat: "4:18",
        message: "We think you can beat this.", status: "pending",
        createdAt: Date.now() - 1000 * 60 * 60 * 3
      },
      {
        id: "seed2", fromStation: "Station 4", fromShift: "B Shift",
        toStation: "Station 12", toShift: "A Shift",
        drillName: "High-Performance CPR & AED", timeToBeat: "Score: 96%",
        message: "Beat our compression fraction!", status: "accepted",
        createdAt: Date.now() - 1000 * 60 * 60 * 24
      }
    ];
    write(KEYS.CHALLENGES, seeded);
    return seeded;
  }

  /* ---------- Notifications ---------- */
  function getNotifications() {
    return read(KEYS.NOTIFICATIONS, []);
  }
  function addNotification(notif) {
    const list = getNotifications();
    list.unshift({ ...notif, id: "n" + Date.now(), ts: Date.now(), read: false });
    write(KEYS.NOTIFICATIONS, list);
  }
  function unreadCount() {
    return getNotifications().filter(n => !n.read).length;
  }
  function markAllRead() {
    const list = getNotifications().map(n => ({ ...n, read: true }));
    write(KEYS.NOTIFICATIONS, list);
  }

  /* ---------- Weekly Missions ---------- */
  function currentWeekKey() {
    const d = new Date();
    const onejan = new Date(d.getFullYear(), 0, 1);
    const week = Math.ceil((((d - onejan) / 86400000) + onejan.getDay() + 1) / 7);
    return `${d.getFullYear()}-W${week}`;
  }
  function getMissionProgress() {
    const wk = currentWeekKey();
    const stored = read(KEYS.MISSION_WEEK, null);
    if (stored !== wk) {
      const fresh = {};
      WEEKLY_MISSION_TEMPLATE.forEach(m => (fresh[m.id] = 0));
      write(KEYS.MISSIONS, fresh);
      write(KEYS.MISSION_WEEK, wk);
      return fresh;
    }
    return read(KEYS.MISSIONS, {});
  }
  function bumpMissionProgress(category) {
    const progress = getMissionProgress();
    WEEKLY_MISSION_TEMPLATE.forEach(m => {
      if (m.category === category) {
        progress[m.id] = Math.min((progress[m.id] || 0) + 1, m.target);
      }
    });
    write(KEYS.MISSIONS, progress);
  }

  /* ---------- Random Chat ---------- */
  function seedChat() {
    const seeded = [
      { id: "cs1", sender: "Station 5 C Shift", text: "Anyone run the Denver Drill today? Trying to beat 4:15.", ts: Date.now() - 1000 * 60 * 40 },
      { id: "cs2", sender: "Station 12 A Shift", text: "We hit 4:09 this morning.", ts: Date.now() - 1000 * 60 * 25 },
      { id: "cs3", sender: "Station 4 B Shift", text: "Nice — sending the video to the board.", ts: Date.now() - 1000 * 60 * 10 },
      { id: "cs4", sender: "Station 17 A Shift", text: "Somebody beat that before shift change lol", ts: Date.now() - 1000 * 60 * 3 }
    ];
    write(KEYS.CHAT, seeded);
    return seeded;
  }
  function getChatMessages() {
    return read(KEYS.CHAT, null) || seedChat();
  }
  function addChatMessage(sender, text) {
    const list = getChatMessages();
    list.push({ id: "cm" + Date.now() + Math.random().toString(36).slice(2, 6), sender, text, ts: Date.now() });
    write(KEYS.CHAT, list);
    return list;
  }

  return {
    getProfile, setProfile, isOnboarded,
    getFavorites, isFavorite, toggleFavorite,
    getResults, addResult,
    getChallenges, addChallenge, respondChallenge,
    getNotifications, addNotification, unreadCount, markAllRead,
    getMissionProgress,
    getChatMessages, addChatMessage
  };
})();
