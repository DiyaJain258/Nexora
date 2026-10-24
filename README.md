# NEXORA — Multi-Platform IPTV & Live Streaming Platform

NEXORA is a high-performance, multi-platform IPTV and VOD streaming platform engineered for Web Admin, iOS & Android Mobile, and Android TV / Google TV.

---

## 1. Architecture & Technology Stack

The platform is organized as an enterprise monorepo using npm workspaces:

```
Nexora/
├── packages/
│   └── shared/                 # Shared TypeScript models, design tokens & mock datasets
│       ├── src/theme/tokens.ts # #070912, #0B1020, #111827, #8B5CF6, #22D3EE, #F8FAFC
│       ├── src/types/          # ContentItem, Channel, EpgProgram, User, Device, Analytics
│       └── src/mock/           # 4K channels, VOD movies, series, EPG schedules, telemetry
├── apps/
│   ├── web-admin/              # Web Admin Portal (React, Vite, TypeScript, Responsive CSS)
│   ├── mobile/                 # Shared Mobile App (React Native, TypeScript, Android & iOS)
│   └── tv/                     # Android TV & Google TV (React Native TV, 10-foot UI, D-Pad engine)
└── package.json                # Workspaces root
```

### Technology Matrix

| Application | Mandatory Stack | Platform Target | Active Port / Command |
|---|---|---|---|
| **Web Admin Panel** | React 18, Vite, TypeScript, Modular CSS | Desktop & Tablet Browsers | `npm run dev:admin` (Port 5173) |
| **Mobile Applications** | React Native, TypeScript, Shared Codebase | Android (APK) & iOS (IPA) + Web Simulator | `npm run dev:mobile` (Port 5174) |
| **Android TV & Google TV** | React Native TV, D-Pad Remote Focus, Leanback UI | Android TV / Google TV + 10-foot Simulator | `npm run dev:tv` (Port 5175) |
| **Native TV Media Engine** | Kotlin + Android Media3 / ExoPlayer | Hardware Decoders (HEVC Main 10, Dolby Atmos) | Documented in `apps/tv/docs/` |

---

## 2. NEXORA Design System Tokens

- **Background**: `#070912`
- **Secondary Background**: `#0B1020`
- **Cards & Surfaces**: `#111827`
- **Violet Accent**: `#8B5CF6`
- **Cyan Accent**: `#22D3EE`
- **Primary Text**: `#F8FAFC`
- **Muted Text**: `#94A3B8`

---

## 3. How to Run Each Application

### Quick Start (All Workspaces Installed)
```bash
# 1. Run Web Admin Panel
npm run dev:admin
# Access: http://localhost:5173

# 2. Run Android & iOS Mobile App Simulator
npm run dev:mobile
# Access: http://localhost:5174

# 3. Run Android TV & Google TV 10-Foot Simulator with Remote Control
npm run dev:tv
# Access: http://localhost:5175
```

### Building for Production
```bash
# Build all workspaces
npm run build:all

# Or build individual applications
npm run build:admin
npm run build:mobile
npm run build:tv
```

---

## 4. Application Feature Highlights

### Web Admin Panel (`apps/web-admin`)
1. **Dashboard & Analytics**: Real-time concurrent viewer metrics (142,850+), egress bandwidth (482.6 Gbps), edge node clusters (FRA-01, LON-02, NYC-01, SGP-01, NRT-01), hardware NVENC/QuickSync load meters.
2. **Live TV Channel Management**: Table listing, category filter, HLS origin stream URL config, live status toggling (Active / Degraded / Offline), live stream preview player modal, add/edit/delete channels.
3. **Movies & Series Management**: VOD catalog, multi-genre filtering, posters/backdrops, age rating, 4K HDR badges, create new title modal.
4. **Seasons & Episodes**: Episode upload manager, season switcher, runtimes, air dates.
5. **Categories & Genres**: Slug editor, live TV vs. VOD assignment, display priority.
6. **EPG Schedules**: Visual timeline grid, XMLTV ingestion trigger (`https://epg.nexora.io/guide.xml`), time slot allocation.
7. **Users & Device Sessions**: Active session tokens, remote revoke / kick device button, concurrency monitor (active screens / max screens).
8. **Subscription Plans**: Monthly and annual pricing toggles, screen concurrency limits, 4K HDR vs. FHD tier checklist.
9. **Push Notifications**: Multi-platform broadcaster targeting Android TV, Google TV, Mobile, or Web.
10. **Reports & Settings**: HLS segment length (2s / 4s / 6s), LL-HLS chunked transfer, AES-128 token rotation, CSV export.

### Mobile Applications (`apps/mobile`)
1. **Home Screen**: Featured hero banner, Continue Watching rail with progress bars, Top Live Channels with real-time on-air program info, Trending 4K Blockbusters, Popular Series.
2. **Live TV Screen**: Categorized channel browser with mini-preview card and quick tune action.
3. **Catalog Screens**: Dedicated views for Movies, Series, Live Sports, and Kids animation.
4. **Interactive Search**: Real-time query search across both VOD titles and live channels simultaneously.
5. **My List / Watchlist**: Save favorites, remove titles, resume playback.
6. **Content Details Modal**: Synopsis, starring cast, director, audio stream specs (Dolby Atmos 7.1), episode selector.
7. **Video Player HUD**: Play/pause, 10s back/forward, scrubbing bar with buffering indicator, stream quality selector (4K HDR / 1080p / 720p / Auto), subtitle selector.
8. **Profile & Device Settings**: Active subscription details, offline downloads Wi-Fi toggle, streaming quality preferences.

### Android TV & Google TV Application (`apps/tv`)
1. **D-Pad Focus Engine**: Full remote control spatial navigation (ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Enter/OK, Back/Escape).
2. **On-Screen Remote Simulator**: Built-in interactive TV remote control widget with D-Pad and shortcuts.
3. **Collapsible 10-Foot Side Dock**: Expands seamlessly when moving left or hovering.
4. **Dynamic 10-Foot Hero Showcase**: Cinematic backdrop dynamically updates with high-resolution artwork as the user browses through rails!
5. **Interactive Fullscreen EPG Grid Guide**: Channels on Y-axis, time slots on X-axis, schedule cells with active focus rings, one-click tuning.
6. **TV Player OSD (On-Screen Display)**:
   - Quick Channel Zapper (switch channels with Left/Right without exiting the video).
   - "Stats for Nerds" stream telemetry overlay (Bitrate, Resolution, FPS, Buffer Health, Audio Passthrough, Edge Node).
7. **Native Android TV Configuration**: `AndroidManifest.xml` with `LEANBACK_LAUNCHER`, touchscreen optional, and complete Kotlin Media3 / ExoPlayer architecture documentation in `apps/tv/docs/NativeTVArchitecture.md`.
