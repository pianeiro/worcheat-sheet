# WorCheat Sheet

Static SPA that renders LilyPond scores via Hacklily WebSocket. No build, no bundler, no npm, no tests, no CI.

## Serve

```bash
python3 -m http.server 8000   # fetch() requires HTTP, not file://
# Only verification available (no tests/lint/CI): per-file syntax check —
# `node --check` validates only the file piped in, imports are resolved at runtime.
for f in $(find js -name '*.js'); do node --input-type=module --check < "$f" || exit 1; done
```

## Routes

| Hash | View |
|------|------|
| `#/` | Home — featured piece + artists |
| `#/artists` | Artists index |
| `#/:slug` | Artist detail — piece list |
| `#/:slug/:pieceSlug` | Piece detail — score + credits + more pieces + similar artists |
| `#/:slug/:pieceSlug/play` | Play — full-screen score reading (hides shell, keyboard/swipe nav) |
| `#/about` | About — author, technologies, contributing |

## Adding a score

1. Add entry to `data/artists.json` — `{ slug, name, pieces: [{ slug, title, youtubeUrl? }] }`
2. Create `data/musics/{artist-slug}/{piece-slug}.ly`

Slugs are lowercase-hyphenated. Auto-generated from names if omitted in JSON (`JsonCatalogRepository` normalizes raw rows via `slugify`).

## Architecture gotchas

- **Scroll container is `<main>`, not `window`** — it has `overflow-y-auto`. On route change, `document.querySelector('main').scrollTo(0, 0)` must be called. Also `history.scrollRestoration = 'manual'` is set in `init()` to prevent browser override on hashchange.
- **Multi-page scores**: LilyPond SVGs contain duplicate IDs (`page1`, `system1`, etc.). Only one page SVG can be in the DOM at a time — swap via innerHTML on pagination (`showPage` inside `wirePagination` in `js/presentation/presenters/score-presenter.js`). The render result is `{ files: [svgPageStrings], logs }`.
- **Score render is lazy**: opening a piece detail does NOT render anything — the Hacklily call fires only when the user clicks the "View Score" CTA (`wireScoreCta` in `route-controller.js`), and that CTA stays disabled after one click per page load.
- **Score SVGs overflow without CSS**: Inline style `#score-content .score-page svg{display:block;width:100%;height:auto;}` is injected per render to keep SVGs inside the container.
- **Shell markup lives in `js/presentation/shell.html`** — sidebar (desktop), top nav, sticky footer, bottom nav (mobile). `index.html` holds placeholder divs (`#shell-outside`, `#shell-inside-top`, `#shell-inside-bottom`); `app.js` fetches and injects them at boot. Shell parts have no IDs — `app.js` matches them by element type (`aside`, `header`, `footer`, `nav.bg-surface-glass`), so renaming elements in `shell.html` silently breaks injection. Only `<main>` is swapped by JS.
- **Layered ES modules in `js/`**, imported by `js/app.js` (single entrypoint, `type="module"`, no build). Dependencies point inward; `app.js` is the composition root:
  - `domain/` — entities as classes + value objects (`entities.js` — Piece/Artist/Collection, frozen at construction, `Collection.findArtist`/`findPiece`; `value-objects.js` — `slugify`). Entities require complete slug data — no normalization inside.
  - `application/` — use case classes with constructor DI, data via `execute()`: `load-catalog.js`, `view-artist.js`, `view-piece.js`, `render-score.js`; plus `ports/` — abstract base classes (CatalogRepository, LySourceRepository, ScoreRenderer) that the use cases depend on and adapters extend
  - `infrastructure/` — concrete adapter classes extending the ports: `catalog-repository.js` (JsonCatalogRepository, maps `data/artists.json` rows → Collection), `ly-source-repository.js` (FileLySourceRepository, `data/musics/**`), `hacklily-gateway.js` (HacklilyScoreRenderer)
  - `presentation/` — `route-controller.js` (RouteController class: hash parsing, dispatch, CTA wiring), `presenters/` (home, artists-index, artist, piece, score), `views.js` (page builders consuming view models), `components.js` (dumb HTML factories), `shell.html` (sidebar, nav, header, footer), `formatting.js` (escapeHtml, YouTube URL builders, errorMessage)
- **No global state** — the Collection is loaded once by `LoadCatalog.execute()` in the `app.js` composition root and passed through the RouteController into `ViewArtist`/`ViewPiece`. `currentArtistSlug/currentPieceSlug` are derived from the route.
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
- ADRs in `docs/adr/` document architectural decisions (ports-as-abstract-classes, clean-architecture layers).
