# WorCheat Sheet

A static SPA for browsing chord-and-melody scores rendered via LilyPond/Hacklily. Each artist has a set of pieces; each piece is a `.ly` file rendered on demand.

## Language

**Piece**:
A musical composition with chord names and melody, stored as a LilyPond `.ly` file.
_Avoid_: Track, song, music

**Artist**:
A composer or musician whose pieces are collected in the catalog.
_Avoid_: Performer, creator

**Score**:
The rendered SVG output of a piece's LilyPond source.
_Avoid_: Sheet music, tab

**Collection**:
The full set of artists and their pieces displayed on the home screen.
_Avoid_: Library, catalog, playlist

**View Score**:
The primary CTA on a piece detail page — navigates to the score render view.
_Avoid_: Play, listen, stream

**Render**:
The server-side LilyPond compilation of `.ly` source into SVG via the Hacklily WebSocket.
_Avoid_: Compile, generate

## Feature state

Features marked **inactive** exist in the UI as nav items/buttons but are not wired to functionality — they are visual placeholders for future implementation.

- **Trending** (inactive) — sidebar nav item
- **Help** (inactive) — sidebar bottom item
- **Settings** (inactive) — sidebar bottom item, top nav icon
- **Share** (inactive) — action button on piece detail
- **Search** — kept as a visual element, non-functional for now
- **Home, Artists** — active nav items

_Dropped_: Library, Playlists, Profile, Premium/Upgrade, Radio, Follow, Favorite, Browse, Discover
