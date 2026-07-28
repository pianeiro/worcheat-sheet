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

Slugs are lowercase-hyphenated. Auto-generated from names if omitted in JSON.

## Architecture gotchas

- **Scroll container is `<main>`, not `window`** — it has `overflow-y-auto`. On route change, `document.querySelector('main').scrollTo(0, 0)` must be called. Also `history.scrollRestoration = 'manual'` is set in `init()` to prevent browser override on hashchange.
- **Multi-page scores**: LilyPond SVGs contain duplicate IDs (`page1`, `system1`, etc.). Only one page SVG can be in the DOM at a time — swap via innerHTML on pagination (`showPage` in `renderScore`).
- **Score SVGs overflow without CSS**: Inline style `#score-content .score-page svg{display:block;width:100%;height:auto;}` is injected per render to keep SVGs inside the container.
- **Shell is hardcoded in `index.html`** — sidebar (desktop), top nav, sticky footer, bottom nav (mobile). Only `<main>` is swapped by JS. The `Sidebar()`, `TopNav()`, `Footer()`, `BottomNav()` factories in `app.js` are unused dead code.
- **app.js** is an IIFE with no exports. `handleRoute()` assigns `innerHTML` then attaches listeners. Score rendering is lazy: "View Score" button (`#piece-hero-cta`) calls `renderScore()` on click.
- **Hacklily WebSocket**: `wss://render.hacklily.org/rpc` — must be reachable. 25s timeout. Renders `.ly` → SVG.
- **Tailwind**: CDN-loaded (not npm). Config inline in `index.html` (`#tailwind-config`).
- **Inactive nav/UI items** (Trending, Help, Settings, Search, Share) — visual placeholders, not wired. See `CONTEXT.md` for the full list.
- **YouTube thumbnails**: `https://img.youtube.com/vi/{id}/maxresdefault.jpg` — may 404 for some videos.
- **Artist avatars**: resolved via `https://unavatar.io/youtube/{handle}` — image CDN, no runtime JS fetch.

## Domain glossary

See `CONTEXT.md` for canonical terms (Piece, Artist, Score, Collection, View Score, Render). Use consistently.

## Design tokens

See `DESIGN.md` for the color palette, typography scale, spacing, and shape system.

## Workflow

- All work on `develop`. Merge to `main` at plan end.
- Commit messages: Conventional Commits (`feat`, `fix`, `refactor`, `docs`, `env`). Optional scope in parens.
- Implement one logical change at a time; get user approval before each commit.
