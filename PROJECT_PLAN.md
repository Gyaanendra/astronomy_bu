# AstronomyBU Next.js Website — Comprehensive Architecture & Plan

## Five Core Modules
1. **Landing (The Celestial Sanctuary)**
   - Status Bar with live Bennett coordinates (`28.4595° N, 77.5046° E`), Sidereal/Local Time, Moon Phase.
   - Grand Italic Serif Hero with etched stippled artwork.
   - Typographic Manifesto on human curiosity and cosmic exploration.
   - Four Core Pillars: Observe, Research, Educate, Capture.
   - Tabular Featured Program index with hover preview and `[↗]` links.

2. **Members and Heads (Tenure System)**
   - Interactive tenure switcher (`2025–26 (Current)`, `2024–25`, `Archive`).
   - Executive Leadership Spotlight: Advisor (Shardul Dhekane [𝙎𝙋𝙄𝙍𝙄𝙏]), Secretary (Kaavya Kumar Yadav), Joint Secretary (Abhimanyu Narang).
   - Structured Department Grids with halftone portrait effects, quotes, and social handles:
     - Tech & Research (Vivan Joshi, Dhruv Kukreja, Madhav, Vihan Rastogi)
     - Content (Kanak Rana, Palak Aggarwal, Yashaswini Mohanty)
     - Management (Yaditi Arora, Riya Bansal, Anand Dev Bhadouriya)
     - PR & Outreach (Yatishi Agarwal, Aaryyamaa Singh, Mahi Tiwari, Saksham Yadav, Syed Emadullah, Japtej Singh Bhullar)
     - Multimedia (Arnav Tyagi, Daksh Tomar, Istuti Gusain)
     - Finance (Caesar Rudra Singh, Manish Konda)
     - Web & Development (Aryan Singh, Moksha Sharma, Aviral Srivastava, Mrigank Bhatnagar, Abhinay Chaudhary, Daksh Rathore, Yashashvi Singh, Vijval Kumar, Surya Varshney, Utkarsh Singh, Aayush Vashistha, Ansh Goyal).

3. **Past Events & This Tenure (Archive & Timeline)**
   - Current Tenure 2026: Astrophotography Workshop 4.0 (Guest: Virendra Adhikari), Cosmology 101 Ep 2.
   - Archive 2025: Stellar Vision, Russian Cosmonauts in New Delhi, Cosmology 101 Ep 1, Halloween 2025.
   - Archive 2024: Astrophotography Workshop 3.0, Halloween 2024.
   - Editorial Row layout with photo gallery lightbox modal and registration links.

4. **Blogs / Articles (Observation Journal)**
   - Field Astrophotography logs (exposure settings, equipment).
   - Cosmology research notes & lecture series summaries (Dr. Pratyush Pranav).
   - Stargazing logs & NASA APOD curated daily feed.

5. **Cosmic Calendar (Dual Horizon Engine: Global + Bennett Split)**
   - **Global Horizon**: Meteor Showers (Perseids, Geminids, Quadrantids), Eclipses, Planetary Oppositions, Solstices/Equinoxes.
   - **Bennett Horizon**: Ground/Terrace telescope stargazing nights, NLH 101 sessions, indoor dome simulations.
   - **Local Sky Conditions Widget**: Greater Noida Bortle index (~6-7), cloud cover advisory, moon illumination calculator, Stellarium Web direct launcher.

## Scalable Folder Structure (Next.js 16 + React 19 + Tailwind v4 + TypeScript)

```
astronomy_bu/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── team/page.tsx
│   ├── events/page.tsx
│   ├── journal/page.tsx
│   ├── calendar/page.tsx
│   └── api/
├── src/
│   ├── components/
│   │   ├── ui/ (button, hairline-divider, stipple-canvas, badge, modal, grain-overlay)
│   │   ├── layout/ (navbar, footer, status-ticker)
│   │   └── features/ (landing, team, events, journal, calendar)
│   ├── content/
│   │   ├── team/ (tenure-2025-2026.ts, tenure-2024-2025.ts)
│   │   ├── events/ (events-registry.ts, gallery-data.ts)
│   │   ├── journal/ (articles.ts)
│   │   └── calendar/ (global-events.ts, bennett-events.ts)
│   ├── types/ (team.types.ts, event.types.ts, journal.types.ts, calendar.types.ts)
│   ├── lib/ (astronomy.ts, utils.ts, constants.ts)
│   └── hooks/ (use-moon-phase.ts, use-celestial-time.ts, use-active-tenure.ts)
└── public/
    ├── images/ (stipple, team, events)
    └── fonts/
```

