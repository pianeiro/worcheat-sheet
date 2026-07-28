# WorCheat Sheet

Static SPA that renders LilyPond scores via Hacklily WebSocket. No build, no bundler, no npm, no tests, no CI.

## Serve

```bash
python3 -m http.server 8000   # fetch() requires HTTP, not file://
node --check app.js            # syntax check (only verification gate)
```

## Routes

| Hash | View |
|------|------|
| `#/` | Home — featured piece + artists |
| `#/artists` | Artists index |
| `#/:slug` | Artist detail — piece list |
| `#/:slug/:pieceSlug` | Piece detail — score + credits + more pieces + similar artists |

## Adding a score

1. Add entry to `data/artists.json` — `{ slug, name, pieces: [{ slug, title, youtubeUrl? }] }`
2. Create `musics/{artist-slug}/{piece-slug}.ly`

Slugs are lowercase-hyphenated. Auto-generated from names if omitted in JSON (app.js handles fallback).

## Architecture

- **Shell is hardcoded in `index.html`** — sidebar (desktop), top nav, sticky footer, bottom nav (mobile). Only `<main>` is swapped by JS. The `Sidebar()`, `TopNav()`, `Footer()`, `BottomNav()` factories in `app.js` are unused dead code.
- **`app.js`**: IIFE, no exports. Routes in `handleRoute()` assign `innerHTML` then attach event listeners. Lazy score render: "View Score" button (`#piece-hero-cta`) calls `renderScore()` on click — no auto-render.
- **Hacklily WebSocket**: `wss://render.hacklily.org/rpc` — must be reachable. 25s timeout (hardcoded). Renders `.ly` → SVG inside a white `<div>`.
- **Tailwind**: CDN-loaded (not npm). Config inline in `index.html` (`#tailwind-config`).
- **Artist avatars**: resolved via `https://unavatar.io/youtube/{handle}` — image CDN, no runtime JS fetch.
- **YouTube thumbnails**: `https://img.youtube.com/vi/{id}/maxresdefault.jpg` — may 404 for some videos.

## Domain glossary

See `CONTEXT.md` for canonical terms (Piece, Artist, Score, Collection, View Score, Render). Use consistently.

## Constraints

- `.ly` files: LilyPond source with chord names + melody. Keys, time sigs, paper size set per-file.
- Inactive nav items (Trending, Help, Settings, Search, Share) are visual placeholders — not wired.
- No `.gitignore` — create one if build artifacts appear.

## Workflow

- All work on `develop`. At plan end, squash into one commit and merge to `main`.
- Commit messages: Conventional Commits (`feat`, `fix`, `refactor`, `docs`, `env`). Optional scope in parens.
- Implement one logical change at a time; get user approval before each commit.
