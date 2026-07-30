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

### Animation — Spin 2D (native after Launch)

HTML preview: [index.html](index.html). **Not** derived from the static PNG.

| Layer | Motion | Duration | Notes |
|-------|--------|----------|--------|
| Outer ring | CW `rotateZ` | **8 s** linear | Stroke gradient `#1a5a6e` → `#c9a86a`, width ~31 @1024, r≈420, center ~(512, 492) |
| Inner arcs | CCW `rotateZ` | **10 s** linear | Top arc thicker (~44), bottom (~22), r≈358; gold→teal gradients |
| Wordmark | none | — | «МОЙ» `#0e2436`, «TLS» `#1a5a6e`, two lines, same size |

- Launch Screen (storyboard): **static PNG only**
- Animated splash: first VC / SwiftUI / Lottie·Rive after launch (~**1.5–2 s** one-shot in app; preview loops)
- Geometry reference: [AppIcon-mint-light.svg](../LOGO/AppIcon-mint-light.svg) + SVG in preview

Native note: Launch Screen cannot animate. Do not expect iOS to “animate” the PNG.

## Auth backgrounds — 22 tourism variants

Master PNG: photo + atmospheric overlay only — **no** UI, **no** wordmark (title «МОЙ TLS» is app chrome).

Preview [auth.html](auth.html): HTML login chrome matching prod layout (back, **МОЙ TLS** one line + subtitle, phone, password, Войти glass, Face ID, footer pills). Each card has **Скачать** → full-size background PNG.

Sources: `BT/assets/auth/`. Export: `npm run export` (sharp + resvg).

| # | Name | # | Name |
|---|------|---|------|
| 01 | Private jet | 12 | Fine dining |
| 02 | Infinity pool | 13 | Beach dusk |
| 03 | Marina night | 14 | Volcanic coast |
| 04 | Desert dunes | 15 | Yacht dusk |
| 05 | Sky lounge | 16 | Cliff pool |
| 06 | Venice canal | 17 | Jet cabin |
| 07 | Maldives | 18 | Alpine chalet |
| 08 | Terrace brunch | 19 | Desert resort |
| 09 | Chauffeur hotel | 20 | Heli coast |
| 10 | Airport lounge | 21 | Overwater villa |
| 11 | Hotel suite | 22 | First-class lounge |

**Files:** `assets/auth-bg-01-…-22-1290x2796.png`  
**Index:** `src/auth-variants.json`

## Export

```bash
cd BT/Splash && npm install && npm run export
```

## Acceptance

- [x] Splash Mint light (not AS IS dark teal)
- [x] Splash PNG 1290×2796
- [x] Spin 2D preview on splash page
- [x] 22 tourism auth PNGs 1290×2796 (bg only); preview with login overlay + download
- [x] Nav + hub sections
- [x] This SPEC for Xcode / Asset Catalog
