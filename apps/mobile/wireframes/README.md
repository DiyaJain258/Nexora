# NEXORA Mobile App — Wireframe Reference & Architecture Guide

This document defines the structural blueprint and layout specifications for the **NEXORA Android and iOS Mobile Application** (Developer 1).

---

## 1. Directory Structure

All 17 genuine screen wireframes are organized below with corresponding mobile platform specs:

```
apps/mobile/wireframes/
├── README.md
├── 01-splash-screen.png
├── 02-home-screen.png
├── 03-live-tv-screen.png
├── 04-movies-screen.png
├── 05-series-screen.png
├── 06-sports-screen.png
├── 07-kids-screen.png
├── 08-search-screen.png
├── 09-movie-details-screen.png
├── 10-series-details-screen.png
├── 11-episodes-screen.png
├── 12-my-list-screen.png
├── 13-continue-watching-screen.png
├── 14-video-player-screen.png
├── 15-profile-screen.png
├── 16-settings-screen.png
└── 17-device-activation-screen.png
```

---

## 2. Screen Specifications & Hierarchy

### `01-splash-screen.png` — Splash & Initial Launch
- **Purpose**: Brand introduction, security handoff, token validation, and initial cache hydration.
- **Layout**: Centered brand monogram (`NX`), wordmark (`NEXORA`), subtitle (`IPTV & STREAMING`), and horizontal indeterminate loading bar.
- **Footer**: Version badge (`v1.0.0 Build 412 • 4K HDR Certified`).
- **Timing**: 1.2s - 1.8s auto-dismiss into the main Home experience.

### `02-home-screen.png` — Main Home Screen
- **Purpose**: Primary discovery hub for movies, series, live broadcasts, and resume queues.
- **Components**:
  - **Top Navigation Bar**: Brand logo, global search toggle, profile avatar trigger.
  - **Category Pills**: Horizontal scroll filter (`All`, `Live TV`, `Movies`, `Series`, `Sports`, `Kids`).
  - **Hero Spotlight**: 380px cinematic artwork container with gradient vignette, quality badge (`4K HDR`), title, rating, genre meta, and primary CTA (`▶ Watch Now`).
  - **Continue Watching Rail**: Horizontal card row (180x100px) with progress scrub indicators and play overlays.
  - **Trending Blockbusters**: 2:3 vertical poster rail (120x170px) with rating badges.

### `03-live-tv-screen.png` — Live TV & EPG Guide
- **Purpose**: Real-time channel browsing, electronic program schedule (EPG), and direct feed tuning.
- **Components**:
  - **Live Preview Card**: Active channel header with resolution/FPS metrics and full-screen tune button.
  - **Genre Tabs**: Instant filtering by Sports, News, Movies, Entertainment, Kids.
  - **Channel List Items**: Channel logo, broadcast frequency `#CH`, current airing program, time boundaries, and quick-tune icon.

### `04-movies-screen.png` — Movies Catalog & Filter
- **Purpose**: Full VOD movie directory with genre facets.
- **Components**:
  - **Facet Chips**: Action, Sci-Fi, Drama, Thriller, Horror, Comedy.
  - **2-Column Responsive Grid**: Optimized for single-thumb scrolling with poster artwork, year, genre, and star ratings.

### `05-series-screen.png` — TV Series Showcase
- **Purpose**: Episodic content discovery and binge-watching rails.
- **Components**:
  - **Series Spotlight Banner**: Trending original series callout.
  - **Series Directory Cards**: Season counts, total episode tallies, match score percentages, and synopsis peek.

### `06-sports-screen.png` — Sports Arena & Live Matches
- **Purpose**: Real-time scores, match schedules, live streams, and league tournaments.
- **Components**:
  - **Match Scorecard Header**: Live game timer (`72' LIVE`), team crests, score readout (`2 - 1`), venue, and HD broadcast source.
  - **Upcoming Broadcast Schedule**: Fixture rows with "Set Alert" push notification triggers.

### `07-kids-screen.png` — Kids Wonderland & Safe Zone
- **Purpose**: Family-friendly curation with parental control enforcement.
- **Components**:
  - **Parental Lock Indicator**: PIN protection status.
  - **Age Tier Selectors**: `Ages 2-4`, `Ages 5-7`, `Ages 8-12`.
  - **Kid-Friendly Poster Carousel**: High-contrast animated character spotlight.

### `08-search-screen.png` — Search & Filter Facets
- **Purpose**: Instant keyword lookup across live channels, VOD movies, actors, and categories.
- **Components**:
  - **Search Input Field**: Auto-focused input with clear button (`✕`) and red cursor.
  - **Categorized Results Matrix**: Multi-type grouping (`Live Channels` vs `Movies & Series`).

### `09-movie-details-screen.png` — Movie Metadata & Cast
- **Purpose**: Deep-dive title synopsis, crew roster, audio/video specs, and bookmarking.
- **Components**:
  - **Backdrop Canvas**: Panoramic key art with close button and favorite toggle.
  - **Metadata Specs**: Age rating (`PG-13`), runtime, release year, Dolby Vision / Atmos badges.
  - **Primary CTAs**: `▶ Play Movie` and offline download trigger.
  - **Cast Carousel**: Circular portrait avatars with character names.

### `10-series-details-screen.png` — Series Overview
- **Purpose**: Multi-season episodic overview with resume point tracking.
- **Components**:
  - **Show Synopsis & Badges**: Seasons count, release year, age rating.
  - **Active Episode Callout**: Jump-in button for next unviewed episode.
  - **Season Dropdown Picker**: Quick switcher for Season 1, 2, 3, etc.

### `11-episodes-screen.png` — Episode Selector
- **Purpose**: Detailed list of episodes with thumbnails, titles, runtimes, and plot summaries.
- **Components**:
  - **Season Tab Switcher**: Horizontal pill switcher between active seasons.
  - **Episode Cards**: 16:9 thumbnail, episode number, title, progress bar, runtime, and synopsis.

### `12-my-list-screen.png` — Saved Watchlist
- **Purpose**: Personal bookmark collection synced across mobile, TV, and web.
- **Components**:
  - **Segment Filter**: Filter between All, Movies, and TV Series.
  - **Saved Cards**: Quick resume button, title info, and removal action (`🗑`).

### `13-continue-watching-screen.png` — In-Depth Resume Queue
- **Purpose**: Comprehensive view of all in-progress titles with exact timecodes.
- **Components**:
  - **Wide Thumbnail Cards**: Large 16:9 frame preview with scrub progress bar.
  - **Progress Data**: `Watched 1h 42m • 28m remaining`.

### `14-video-player-screen.png` — Fullscreen Video Player
- **Purpose**: Adaptive streaming playback engine with touch gesture controls.
- **Components**:
  - **Top HUD**: Title, back button, audio stream codec, stream quality settings toggle.
  - **Center Controls**: 10s skip back, large 60px play/pause button, 10s skip forward.
  - **Bottom Timeline**: Buffered segment bar, dual-red playback progress scrub, timestamp elapsed/remaining, audio mute, and subtitle selector.

### `15-profile-screen.png` — User Profile & Membership
- **Purpose**: Subscriber account overview and plan management.
- **Components**:
  - **Avatar & Plan Tier**: VIP 4K tier badge, active account badge, user email.
  - **Profile Management**: Multi-profile switcher (up to 4 profiles).
  - **Storage Management**: Offline download storage gauge.

### `16-settings-screen.png` — App Preferences & Streaming
- **Purpose**: Fine-grained network and playback configuration.
- **Components**:
  - **Mobile Data Usage**: Auto-adaptive vs data saver.
  - **Download Toggles**: Wi-Fi only download switch.
  - **Audio Settings**: Dolby Atmos eARC passthrough toggle.

### `17-device-activation-screen.png` — Smart TV Hardware Pairing
- **Purpose**: Link Android TV or Google TV client to mobile account via 6-character code or QR scan.
- **Components**:
  - **Code Input Boxes**: 6 segmented monospace character blocks for alphanumeric code (`NX-8492`).
  - **Authorize Button**: Red CTA to pair the living room TV in real-time.
  - **Camera QR Scanner**: Alternate visual scanner button.

---

## 3. UI Theme Mapping & Color Tokens

While the wireframes focus on layout and ergonomics, the live mobile application implements the mandatory **Red & Black Theme**:

| Element | Theme Value | Usage in Mobile App |
| :--- | :--- | :--- |
| **Main Background** | `#050505` | Device canvas & viewport background |
| **Secondary Background** | `#0D0D0D` | Bottom navigation dock, top header |
| **Card Background** | `#151515` | Content posters, channel cells, modal panels |
| **Elevated Panels** | `#1C1C1C` | Quality flyout, settings menus |
| **Primary Red** | `#E50914` | Play buttons, active category pills, brand accents |
| **Bright Red** | `#FF2B36` | Active tab highlights, on-air pulses |
| **Dark Red Gradient** | `#7F0000` | Scrub timeline fills, button gradients |
| **Primary Text** | `#FFFFFF` | Headings, card titles, hero typography |
| **Secondary Text** | `#B3B3B3` | Metadata, year, genres, descriptions |
| **Borders** | `#303030` | Structural card separations, dividers |

---

## 4. Reusable Component Architecture

The mobile application source code (`apps/mobile/src/`) maintains strict modular separation:

```
apps/mobile/src/
├── components/
│   ├── MobileHeader.tsx          # Top bar with search & profile triggers
│   ├── MobileBottomNav.tsx       # 5-tab fixed navigation dock
│   ├── ContentDetailsModal.tsx   # Movie & Series modal with episode selector
│   └── VideoPlayerModal.tsx      # Fullscreen media playback HUD
├── screens/
│   ├── HomeScreen.tsx            # Hero spotlight, continue watching, rails
│   ├── LiveTvScreen.tsx          # Channel matrix, preview card, EPG list
│   ├── CatalogScreen.tsx         # Movies, Series, Sports, and Kids directory
│   ├── SearchScreen.tsx          # Instant search with multi-category results
│   ├── MyListScreen.tsx          # Bookmarked watchlist management
│   └── ProfileSettingsScreen.tsx # User account, settings & TV device pairing
└── App.tsx                       # Main coordinator with stateful view routing
```
