# AstronomyBU — The Living Celestial Archive
*Bennett University Premier Astronomy Club Official Web Platform*

Built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, and **TypeScript 5**.
Designed according to the **Archival Brutalist & Celestial Stipple Editorial** specification (Noctra-inspired aesthetic).

---

## The 5 Core Categories

1. **Landing (`/`)**
   - Real-time Celestial Status Bar tracking Bennett coordinates (`28.4595° N, 77.5046° E`), local sidereal time, and live calculated moon phases.
   - High-contrast Didone / Italic Serif headline typography with procedural 2D stippled starfield canvas.
   - The Four Observational Pillars: *Stories in the Sky, Immersive Viewing, Seasonal Rhythm, Archival Research*.
   - Tabular featured expedition index and brutalist observatory station showcase.

2. **Members & Heads (`/team`)**
   - Multi-tenure support (`2025–2026 Current`, `2024–2025 Archive`).
   - Executive Leadership spotlight (*Advisor, Secretary, Joint Secretary*).
   - Division breakdown across all 7 departments (*Tech & Research, Web & Development, Content, Management, PR & Outreach, Multimedia, Finance*).
   - Halftone portrait effects, personal astronomical quotes, and social links.

3. **Past Events & This Tenure (`/events`)**
   - Chronological archive spanning Astrophotography Workshop 4.0, Cosmology 101 Episodes 1 & 2 (with Dr. Pratyush Pranav), Stellar Vision (Uphoria 2025), Russian Cosmonauts Embassy Visit, and Halloween Stargazing.
   - Filterable by tenure and event discipline.
   - Interactive Dossier Lightbox for deep photo inspections and registration links.

4. **Blogs & Articles (`/journal`)**
   - Editorial articles: narrowband Bortle 6.5 exposure techniques, cultural constellation history, Dr. Pranav seminar debriefs, and cosmonaut symposia.
   - Full archival reader modal with dropped capital typography and tag filters.

5. **Cosmic Calendar (`/calendar`)**
   - Dual-horizon split: **Global Celestial Phenomena** (Perseids/Geminids meteor showers, lunar eclipses, planetary oppositions) vs **Bennett Campus Observations** (cricket ground telescope sessions, NLH 101 lectures).
   - Greater Noida Bortle 6.5 sky conditions card and direct Stellarium Web atlas launcher.

---

## Directory Architecture

```
astronomy_bu/
├── app/
│   ├── layout.tsx             # Root layout: Fonts, live StatusTicker, Navbar, Footer
│   ├── page.tsx               # Category 1: Landing
│   ├── globals.css            # Tailwind v4 theme, void & bone design tokens, grain styling
│   ├── team/page.tsx          # Category 2: Members & Heads
│   ├── events/page.tsx        # Category 3: Past Events & This Tenure
│   ├── journal/page.tsx       # Category 4: Blogs & Articles
│   └── calendar/page.tsx      # Category 5: Cosmic Calendar (Global + Bennett Split)
│
├── src/
│   ├── components/
│   │   ├── ui/                # Primitives: StippleCanvas, HairlineDivider, Badge, Icons
│   │   ├── layout/            # Shell: StatusTicker, Navbar, Footer
│   │   └── features/          # Domain Feature modules:
│   │       ├── landing/       # HeroSection, PillarsGrid, ProgramTable, ObservatoryArchitecture
│   │       ├── team/          # TeamShowcase, MemberCard
│   │       ├── events/        # EventsArchive, EventDossierModal
│   │       ├── journal/       # JournalShowcase, ArticleReaderModal
│   │       └── calendar/      # DualHorizonCalendar, SkyConditionsCard
│   │
│   ├── content/               # Strongly-typed data schemas (Easy to edit without touching UI code)
│   │   ├── team/              # tenure-2025-2026.ts, tenure-2024-2025.ts
│   │   ├── events/            # events-registry.ts
│   │   ├── journal/           # articles.ts
│   │   └── calendar/          # global-events.ts, bennett-events.ts
│   │
│   ├── types/                 # TypeScript interfaces: team, event, journal, calendar
│   └── lib/                   # Utilities: astronomy calculations (moon phase, sidereal time), constants
│
└── public/                    # Optimized assets: team portraits, event photos, stipples
```

---

## Getting Started

```bash
# Navigate to the project
cd e:\astronomyBU\website\astronomy_bu

# Run the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```
