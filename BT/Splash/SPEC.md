# Splash & Auth backgrounds — SPEC

## Master size (upload to app)

| Asset | Size | Notes |
|-------|------|--------|
| Launch / Splash (static) | **1290 × 2796** px | Portrait ≈ iPhone 15/16 Pro Max @3x |
| Auth background (each) | **1290 × 2796** px | Full-bleed under login UI |

- Color space: sRGB PNG
- Splash static: **no alpha** (opaque `#f7fcf9`)
- Auth masters: opaque PNG (photo + overlay + wordmark)

Do **not** confuse with App Icon **1024 × 1024** (`BT/LOGO/`).

## Splash — Mint light

Continues [AppIcon-mint-light](../LOGO/AppIcon-mint-light.svg):

| Token | Value |
|-------|--------|
| Background | `#f7fcf9` |
| Teal | `#1a5a6e` |
| Gold | `#c9a86a` |
| Wordmark | **МОЙ** / **TLS** |

**Static file:** `assets/splash-mint-light-1290x2796.png`

### Animation candidates (HTML preview)

On [index.html](index.html):

1. **Pulse Brand** — pulse of App Icon tile (iOS radius, teal→gold rings, ink wordmark).
2. **Orbit** — medium speed: outer ring `rotateY` (horizontal), inner arcs `rotateX` (vertical), 5.5 s loop; «МОЙ» slides from left, «TLS» from right.
3. **Assemble** — rings + wordmark fly in and settle.

Native note: Launch Screen (storyboard) is static only. Animated splash = first VC / SwiftUI / Lottie·Rive after launch (~1.5–2 s one-shot).

## Auth backgrounds — 30 tourism variants

Only atmosphere + **«МОЙ TLS»** — no phone / password / buttons.

Sources: `BT/assets/auth/` (generated travel stills + stories). Export: `npm run export` (sharp + resvg).

| # | Name | # | Name |
|---|------|---|------|
| 01 | Beach mint | 16 | Waterfall |
| 02 | Yacht coast | 17 | Chauffeur hotel |
| 03 | Santorini | 18 | Amalfi coast |
| 04 | Private jet | 19 | Airport lounge |
| 05 | Infinity pool | 20 | Hotel suite |
| 06 | Alpine lake | 21 | Fine dining |
| 07 | Marina night | 22 | City night |
| 08 | Tokyo glow | 23 | Maybach transfer |
| 09 | Desert dunes | 24 | Beach dusk |
| 10 | Sky lounge | 25 | Maldives air |
| 11 | Venice canal | 26 | Amalfi gold |
| 12 | Maldives | 27 | Dubai mint |
| 13 | Terrace brunch | 28 | Alps dusk |
| 14 | Ski resort | 29 | Pool teal |
| 15 | Dubai dusk | 30 | Santorini deep |

**Files:** `assets/auth-bg-01-…-30-1290x2796.png`  
**Index:** `src/auth-variants.json`

## Export

```bash
cd BT/Splash && npm install && npm run export
```

## Acceptance

- [x] Splash Mint light (not AS IS dark teal)
- [x] Splash PNG 1290×2796
- [x] Pulse + Assemble previews on splash page
- [x] 30 tourism auth PNGs 1290×2796; no login form on preview
- [x] Nav + hub sections
- [x] This SPEC for Xcode / Asset Catalog
