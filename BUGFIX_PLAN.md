# Bugfix Plan

## Bug 1: Featured Artists shows all artists

**Root cause:** `buildHomeView()` in `app.js:448` maps over `state.artists` without limiting — `artists.map(...)` iterates every artist in the database.

**Fix:** Add `.slice(0, 4)` to the artist mapping chain, matching the existing pattern used for Featured Pieces (`pieces.slice(0, 4)` at line 436).

**File:** `app.js`, line 448 — change `artists.map(...)` to `artists.slice(0, 4).map(...)`.

---

## Bug 2: Brand name is not a Home link

**Root cause:** The brand name "WorCheat Sheet" is a `<span>` in both the sidebar and top nav; it should navigate to `#/`.

**Fix:** Replace `<span>` with `<a href="#/">` in two locations, keeping all classes and content identical:

| Location | File | Line | Current | Change to |
|----------|------|------|---------|-----------|
| Sidebar (desktop) | `index.html` | 122 | `<span class="...">WorCheat Sheet</span>` | `<a href="#/" class="...">WorCheat Sheet</a>` |
| Top nav (mobile) | `index.html` | 157 | `<span class="...">WorCheat Sheet</span>` | `<a href="#/" class="...">WorCheat Sheet</a>` |

---

## Bug 3: Hero section clips content when piece title wraps

**Root cause:** The hero `<section>` has `overflow-hidden` and a fixed height (`h-[250px] md:h-[320px]`). When the piece title wraps to two lines, the content is taller than the hero and gets clipped at the bottom.

**Fix:** Two changes in `HeroSection` factory:
1. Wrap the gradient background layers in an `overflow-hidden rounded-2xl` container, removing `overflow-hidden` from the parent `<section>` so content can grow naturally.
2. In the piece view, change the hero height from fixed `h-[250px] md:h-[320px]` to `min-h-[250px] md:min-h-[320px] h-auto` so the hero grows to fit the title.

**Files:**
- `app.js` line 196 — wrap gradient divs in `overflow-hidden rounded-2xl` container
- `app.js` line ~595 — change heroHeight to `min-h-[250px] md:min-h-[320px] h-auto`
