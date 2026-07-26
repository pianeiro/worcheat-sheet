# WorCheat Sheet

Static SPA that renders LilyPond scores via Hacklily WebSocket. No build, no bundler, no npm, no tests, no CI.

## Serve

```bash
python3 -m http.server 8000   # fetch() requires HTTP, not file://
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

Slugs are lowercase-hyphenated.

## Architecture

- **Layout shell** (`index.html`): sidebar (desktop), top nav, sticky footer, bottom nav (mobile) — hardcoded. Only `<main>` is swapped by JS.
- **`app.js`**: IIFE, no exports. Component factories are pure functions returning HTML strings. Routes (in `handleRoute()`) assign `innerHTML` then attach event listeners.
- **Lazy score render**: "View Score" button (`#piece-hero-cta`) calls `renderScore()` on click — no auto-render.
- **Hacklily WebSocket**: `wss://render.hacklily.org/rpc` — must be reachable. Timeout 25s (hardcoded). Scores compile `.ly` → SVG.
- **Design system**: Tailwind config inline in `index.html` (`#tailwind-config`). Key color tokens: `primary: #ecb2ff`, `primary-container: #bd00ff`, `surface: #131313`, `surface-card: #121212`.
- **No `.gitignore`** — create one if build artifacts appear.

## Constraints

- `.ly` files: LilyPond source with chord names + melody. Keys, time sigs, paper size set per-file.
- SVG output renders inside a white `<div>` — no per-page CSS needed.
- No audio playback. Pieces with `youtubeUrl` show "Watch on YouTube" in Credits.
- No project images — hero backgrounds use solid gradients, not photos.
- Glassmorphism (`backdrop-filter: blur()`) requires Chrome 76+, Firefox 103+, Safari 14+.
- Inactive (visual placeholder only): Trending, Help, Settings, Share, Search.

## Workflow

- All work on `develop`. At plan end, squash into one commit and merge to `main`.
- Commit messages: Conventional Commits (`feat`, `fix`, `refactor`, `docs`, `env`). Optional scope in parens.
- Implement one logical change at a time; get user approval before each commit.
