# TFDrills

**Forge Better Firefighters. One Drill at a Time.**

TFDrills is a department-wide training platform for fire, EMS, and crew fitness drills — built to strengthen crew proficiency, encourage friendly competition between stations/shifts, and make quality training effortless every shift.

This repo is a **fully working frontend prototype**: no build step, no backend, no signup. It runs entirely in the browser using `localStorage`, so it's easy to open, easy to demo, and easy to deploy to GitHub Pages today. A real backend (accounts, shared leaderboards across devices, video uploads) can be layered in later without changing the UI.

## Features in this prototype

- Onboarding flow (station, shift, optional email/name — stored locally only)
- Home dashboard (today's drill, current challenges, crew ranking, trending drill, weekly missions)
- Random Drill generator (Fire / EMS / Fitness / All)
- Fire, EMS, and Crew Fitness drill libraries with full drill detail pages (objectives, steps, equipment, performance standard, built-in stopwatch, submit result)
- Challenge system (challenge a station/shift, accept/decline, challenge cards with rules)
- The Challenge Board (department leaderboard + live activity feed, mock data)
- Training Video Library (search/sort, mock data — ready to wire to real uploads)
- Favorites, Weekly Missions, Badges & Achievements
- Settings (edit station/shift/name any time)
- Donate to the Cause (Cash App link + full transparency section)
- Send Ideas (mailto straight to the developer)
- Invite to the Training House (native share sheet / SMS fallback)

## Tech

Plain HTML/CSS/JavaScript — zero dependencies, zero build step. Works by just opening `index.html`, and deploys as-is to GitHub Pages, Netlify, or any static host.

## Run locally

Just open `index.html` in a browser. If your browser blocks `localStorage` on `file://` URLs, serve it locally instead:

```bash
# option 1 — Python (built in on most systems)
npm run serve

# option 2 — Node (via http-server, downloaded on first run)
npm run start
```

Then visit `http://localhost:8080`.

## Deploy to GitHub Pages

1. Push this repo to GitHub.
2. Repo Settings → Pages → Source: Deploy from branch → select `main` and `/ (root)`.
3. Your app will be live at `https://<your-username>.github.io/<repo-name>/`.

No build step required — GitHub Pages serves the static files directly.

## Project structure

```
tfdrills/
├── index.html            # App shell, loads all scripts/styles
├── css/
│   └── styles.css        # All styling (dark theme, mobile-first)
├── js/
│   ├── data.js            # Seed/demo data: drills, crews, videos, badges
│   ├── store.js           # localStorage persistence layer
│   ├── app.js              # Hash router + shared header/nav/toast
│   └── views/              # One file per screen
│       ├── onboarding.js
│       ├── home.js
│       ├── drills.js       # list, detail, random, timer
│       ├── challenges.js
│       ├── board.js
│       ├── videos.js
│       ├── favorites.js
│       ├── missions.js     # weekly missions + badges
│       └── more.js         # settings, donate, send ideas, invite
├── assets/
│   └── logo.png
└── package.json           # optional local-preview scripts only
```

## Before you go live — things to update

- **Cash App handle**: set the real `$cashtag` in `js/views/more.js` (`CASHAPP_HANDLE`).
- **Send Ideas email**: currently `jwmap3apple@gmail.com` in `js/views/more.js` (`IDEAS_EMAIL`) — confirm this is correct.
- **Station list**: `STATIONS` in `js/data.js` is a placeholder (Station 1–20) — replace with your department's real station list.
- **Drill/video/leaderboard data**: everything in `js/data.js` is seed/demo content so the app has something to show. Swap in real drills and, eventually, a real backend so challenges/leaderboards/videos sync across devices instead of living in each device's browser storage.

## Roadmap for a real backend

This is a frontend-only prototype by design. To make challenges, leaderboards, and video uploads sync across every firefighter's device, you'll want to add:

- A database (Firebase, Supabase, or a custom API) behind `js/store.js`
- Push notifications for challenge alerts
- Video upload/storage (with the "one continuous video, no edits" rule enforced or at least prompted)
- Real accounts if you want to prevent spoofed challenge submissions

The UI is already built to support all of this — only `store.js` needs to change from `localStorage` calls to real API calls.

---

*This app is being developed on personal time and effort, not for profit, but to strengthen the love of our passions, and to protect the community we swore to serve.*
