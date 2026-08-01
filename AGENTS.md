# WorCheat Sheet

Static SPA that renders LilyPond scores via Hacklily WebSocket. No build, no bundler, no npm, no tests, no CI.

## Serve

```bash
python3 -m http.server 8000   # fetch() requires HTTP, not file://
node --input-type=module --check < js/app.js   # syntax check (ES module entrypoint)
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
2. Create `data/musics/{artist-slug}/{piece-slug}.ly`

Slugs are lowercase-hyphenated. Auto-generated from names if omitted in JSON (domain factories handle fallback).

## Architecture gotchas

- **Scroll container is `<main>`, not `window`** — it has `overflow-y-auto`. On route change, `document.querySelector('main').scrollTo(0, 0)` must be called. Also `history.scrollRestoration = 'manual'` is set in `init()` to prevent browser override on hashchange.
- **Multi-page scores**: LilyPond SVGs contain duplicate IDs (`page1`, `system1`, etc.). Only one page SVG can be in the DOM at a time — swap via innerHTML on pagination (`showPage` in `renderScore`).
- **Score SVGs overflow without CSS**: Inline style `#score-content .score-page svg{display:block;width:100%;height:auto;}` is injected per render to keep SVGs inside the container.
- **Shell is hardcoded in `index.html`** — sidebar (desktop), top nav, sticky footer, bottom nav (mobile). Only `<main>` is swapped by JS.
- **Layered ES modules in `js/`**, imported by `js/app.js` (single entrypoint, `type="module"`, no build). Dependencies point inward; `app.js` is the composition root:
  - `domain/` — pure entities + value objects (`entities.js` — Artist/Piece/Collection factories, findArtist/findPiece; `value-objects.js` — slugify)
  - `application/` — use cases, plain functions with explicit injection: `load-catalog.js`, `view-artist.js`, `view-piece.js`, `render-score.js`
  - `infrastructure/` — `catalog-repository.js` (data/artists.json), `ly-source-repository.js` (data/musics/**), `hacklily-gateway.js` (implements the ScoreRenderer port)
  - `presentation/` — `route-controller.js` (hash parsing, dispatch, CTA wiring), `presenters/` (home, artists-index, artist, piece, score), `views.js` (page builders consuming view models), `components.js` (dumb HTML factories), `formatting.js` (escapeHtml, YouTube URL builders, errorMessage)
- **No global state** — the Collection is loaded once by `loadCatalog` and passed through the route controller into use cases. `currentArtistSlug/currentPieceSlug` are derived from the route.
- **Catalog (the DB)**: `data/artists.json` is the index; `data/musics/` holds `.ly` blobs. Read-only, accessed only via repositories. `musics/` does not exist at repo root.
- **Hacklily WebSocket**: `wss://render.hacklily.org/rpc` — must be reachable. 25s timeout (hardcoded in `hacklily-gateway.js`). Renders `.ly` → SVG inside a white `<div>`.
- **Tailwind**: CDN-loaded (not npm). Config inline in `index.html` (`#tailwind-config`).
- **Inactive nav/UI items** (Trending, Help, Settings, Search, Share) — visual placeholders, not wired. See `CONTEXT.md` for the full list.
- **YouTube thumbnails**: `https://img.youtube.com/vi/{id}/maxresdefault.jpg` — may 404 for some videos.
- **Artist avatars**: resolved via `https://unavatar.io/youtube/{handle}` — image CDN, no runtime JS fetch.

## Domain glossary

See `CONTEXT.md` for canonical terms (Piece, Artist, Score, Collection, Catalog, View Score, Render). Use consistently.

## Design tokens

See `DESIGN.md` for the color palette, typography scale, spacing, and shape system.

## Workflow

- All work on `develop`. Merge to `main` at plan end.
- Commit messages: Conventional Commits (`feat`, `fix`, `refactor`, `docs`, `env`). Optional scope in parens.
- Implement one logical change at a time; get user approval before each commit.
