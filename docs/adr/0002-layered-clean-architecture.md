# Layered clean architecture with functional dependency injection

`js/` is split into four layers — `domain` (entities, value objects), `application` (use cases), `infrastructure` (repositories, gateway), `presentation` (route controller, presenters, views, components) — with dependencies pointing inward and `app.js` as the composition root.

The motivation is threefold: readability, headroom for planned features (Search, Trending, Share, Settings are currently visual placeholders), and a future React + Next migration — presentation is the only layer that will be replaced, since entities, use cases, and repositories stay framework-agnostic. Use cases are plain functions receiving their dependencies as arguments (no classes, no container, no global state — the former `state.js` singleton was deleted; the loaded Collection is passed through the route controller). Presenters produce view models that map 1:1 to future React props.
