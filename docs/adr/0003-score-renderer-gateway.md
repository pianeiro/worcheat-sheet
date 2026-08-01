# Hacklily render behind a ScoreRenderer gateway

The LilyPond render service (Hacklily WebSocket RPC at `wss://render.hacklily.org/rpc`, 25s timeout) is an external-service seam: the application layer depends on a `ScoreRenderer` port — "render this LySource, return a Score" — implemented by `HacklilyGateway` in infrastructure.

The app never touches WebSocket or the RPC protocol; the RenderScore use case only orchestrates LySourceRepository + ScoreRenderer. This isolates a non-trivial external protocol and gives a single swap point for the future: in Next.js the gateway can be replaced by a call to our own API endpoint that renders server-side, with no changes to the domain or application layers. Alternatives considered — calling the WebSocket directly from the view (tight coupling, as before) and treating the render client as another repository — were rejected because the render is an external service, not data access to the Catalog.
