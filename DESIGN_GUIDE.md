# AstronomyBU — Design System & Style Reference
*Archival Brutalist & Celestial Stipple Editorial*

Based on the Noctra design reference: an archival, museum-grade astronomical observatory aesthetic combining high-contrast serif italic typography, stippled celestial illustrations, fine hairline borders, and a void/bone monochromatic palette.

## Color Palette (Void & Bone Monochromatic System)

```css
:root {
  --color-void: #09090b;             /* Pure cosmic void */
  --color-surface-base: #111113;     /* Primary card / section surface */
  --color-surface-elevated: #18181b; /* Elevated surfaces & cards */
  --color-surface-sunken: #050507;   /* Recessed wells */

  --color-hairline: rgba(245, 239, 235, 0.12); /* 1px structural grid lines */
  --color-hairline-strong: rgba(245, 239, 235, 0.25);

  --color-bone-pure: #fcfbf9;        /* Ultra-bright highlight */
  --color-bone-primary: #f5efeb;     /* Headings and primary copy */
  --color-bone-muted: #a39e93;       /* Subtitles and metadata */
  --color-bone-faint: #635e57;       /* Captions, numbers, coordinates */

  --color-accent-bone: #eae5d9;      /* Solid CTA button background */
  --color-accent-starlight: #d4af37; /* Stellar badge / status accent */
  --color-accent-alert: #e06c75;     /* Cloud cover alert */
}
```

## Typography System

1. **Hero & Display Headings**: High-contrast Serif with expressive Italic (e.g. *Instrument Serif*, *Cormorant Garamond*, or *Cinzel Decorative*).
2. **Metadata & Coordinate Tags**: Uppercase Monospace with wide tracking (`0.15em` to `0.25em`), e.g. *Geist Mono* or *JetBrains Mono*.
3. **Editorial Body**: Refined, readable Sans (*Geist Sans* / *Inter*) or Book Serif (*EB Garamond*) with generous line-height (`1.75`).
4. **Bracketed Badges & Catalog Indexing**: `[01]`, `[02]`, `[WORKSHOP]`, `[ARCHIVE]`, `[↗]`.

## Visual Elements
- **Stippled & Halftone Textures**: Pointillist star bands, vintage engraved lunar crater landscapes, etched observatory architecture.
- **Hairline Grid Layout**: Explicit 1px border lines separating editorial columns and rows.
- **Atmospheric Grain**: Subtle procedural grain overlay on the viewport.
- **Status Bar**: Displaying live Bennett University coordinates (`28.4595° N, 77.5046° E`), Greater Noida local time, and real-time calculated Moon phase.

