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
The rendered SVG output of a piece's LilyPond source. Produced by the RenderScore use case via the ScoreRenderer gateway; returned as an application-layer result with pages and logs.
_Avoid_: Sheet music, tab

**Collection**:
The full set of artists and their pieces displayed on the home screen.
_Avoid_: Library, catalog, playlist

**Catalog**:
The read-only local database the app reads at runtime: `data/artists.json` (the index) plus the `.ly` source files under `data/musics/`. It is fetched via repositories — never embedded in the UI code.
_Avoid_: backend, server, datastore

**View Score**:
The primary CTA on a piece detail page — triggers the Hacklily WebSocket render of the score SVG inline.
_Avoid_: Play, listen, stream

**Render**:
The server-side LilyPond compilation of `.ly` source into SVG via the Hacklily WebSocket.
_Avoid_: Compile, generate

## Architecture vocabulary

**LySource**:
The raw `.ly` file content fetched from the Catalog by the LySourceRepository. Explicitly **not** a domain entity — it is infrastructure data handed to the ScoreRenderer.
_Avoid_: Score source, source file

**Repository**:
A data-access boundary over the Catalog — one of CatalogRepository (index) or LySourceRepository (sources). The only reader of the Catalog.
_Avoid_: DAO, store

**Gateway**:
A boundary to an external service. Specifically the ScoreRenderer port, implemented by the HacklilyGateway adapter; the app never touches the WebSocket protocol directly.
_Avoid_: Service, client

**Presenter**:
A presentation-layer function that turns use-case output into a view model (formatted URLs, gradients, labels). Views never see entities directly.
_Avoid_: Controller, model

**View model**:
Plain data produced by a presenter and consumed by views/components. Maps 1:1 to future React component props.

**Use case**:
A function in the application layer orchestrating domain and infrastructure (e.g., LoadCatalog, ViewPiece, RenderScore). Receives its dependencies as arguments.
_Avoid_: Interactor, handler

## Feature state

Features marked **inactive** exist in the UI as nav items/buttons but are not wired to functionality — they are visual placeholders for future implementation.

- **Trending** (inactive) — sidebar nav item
- **Help** (inactive) — sidebar bottom item
- **Settings** (inactive) — sidebar bottom item, top nav icon
- **Share** (inactive) — action button on piece detail
- **Search** — kept as a visual element, non-functional for now
- **Home, Artists** — active nav items

_Dropped_: Library, Playlists, Profile, Premium/Upgrade, Radio, Follow, Favorite, Browse, Discover


**profileImageUrl**:
The URL of an artist's YouTube channel avatar image, resolved via `https://unavatar.io/youtube/{handle}` at render time — no runtime fetch needed since unavatar is an image CDN.
_Avoid_: avatar, pfp, photo
