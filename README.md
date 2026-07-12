# Personal OS

> A premium personal digital home and bento-style dashboard.

Personal OS is a carefully designed digital identity platform that functions as a living online presence. Unlike a traditional resume or portfolio, this project focuses on authentic personal content combined with real-time online activity.

It acts as your central hub, giving visitors a premium, app-like experience to see what you are building, listening to, and vibing with right now.

---

## 🌟 Features

- **Live Discord Status**: Automatically syncs your real-time Discord presence (Online, Idle, DND) and status via Lanyard.
- **Spotify "Now Playing"**: Displays exactly what track you're listening to right now.
- **GitHub Statistics**: Showcases your public repositories, total followers, and contribution graphs.
- **Weather Widget**: Beautiful, real-time localized weather data.
- **Unique Visitor Analytics**: Built-in daily visitor tracking.
- **Photo Gallery**: An interactive gallery viewer with zoom capabilities.
- **Bento Grid UI**: A modern, responsive, glassmorphic layout.

---

## 🛠️ Technology Stack

This project was built to be lightweight, incredibly fast, and easy to maintain.

- **Framework:** Next.js 15 (React 19)
- **Styling:** Tailwind CSS v4
- **Deployment:** Docker & ZimaOS Ready
- **Data Configuration:** Hardcoded `site.config.ts` (No database required!)
- **APIs Used:** Spotify, Discord (Lanyard API), GitHub, OpenWeatherMap

---

## 🚀 Getting Started

### 1. Configure your Data

All personal content is managed in a single, easy-to-edit configuration file. Open `apps/web/config/site.config.ts` and replace the placeholder data with your own text, links, and profile details.

### 2. Environment Variables

Create a `.env.local` file in the `apps/web/` directory and populate it with your API keys:

```env
# Spotify Integration
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
SPOTIFY_REFRESH_TOKEN=your_refresh_token

# GitHub Integration
GITHUB_USERNAME=your_username
GITHUB_TOKEN=your_personal_access_token

# Discord (Lanyard)
DISCORD_ID=your_discord_id

# Weather
OPENWEATHER_API_KEY=your_openweather_key
OPENWEATHER_CITY=London
```

### 3. Run Locally (Development)

To run the application locally using Node/pnpm:

```bash
cd apps/web
pnpm install
pnpm dev
```
Your dashboard will be live at `http://localhost:3000`.

---

## 🐳 Deployment (Docker / ZimaOS)

Personal OS is perfectly optimized to be deployed on a home server (like ZimaOS) or any VPS via Docker.

To deploy using Docker Compose:

```bash
docker compose -f docker-compose.zimaos.yml up -d --build
```

This will build a highly optimized, lightweight standalone container.

---

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
