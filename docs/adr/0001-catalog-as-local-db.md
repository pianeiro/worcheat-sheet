# Catalog as a local read-only database

The app reads `data/artists.json` (the index) and `.ly` source files under `data/musics/` as if they were database tables, accessed only through the CatalogRepository and LySourceRepository in the infrastructure layer.

This framing was chosen because the site is statically hosted with no build step or server: `fetch()` can read both JSON and text files directly, and the same directory layout can later be served by Next.js routes or an API with zero changes to the domain layer. We rejected embedding the catalog as a JS module (no lazy loading, not fetchable), an API server (no backend today), and IndexedDB (write access we don't need). The repositories normalize the data on read — slug fallbacks are derived in the domain factories, never mutated in place.
