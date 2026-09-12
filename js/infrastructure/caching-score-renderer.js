import { ScoreRenderer } from '../application/ports/score-renderer.js';

var CACHE_TTL_MS = 60 * 60 * 1000;
var CACHE_PREFIX = 'hacklily:';

export class CachingScoreRenderer extends ScoreRenderer {
  constructor(inner) {
    super();
    this.inner = inner;
  }

  render(lySource, backend, slug) {
    if (!slug) return this.inner.render(lySource, backend);

    var key = CACHE_PREFIX + slug + ':' + (backend || 'svg');
    var cached = this.read(key);
    if (cached) return Promise.resolve(cached);

    var self = this;
    return this.inner.render(lySource, backend, slug).then(function (result) {
      self.write(key, result);
      return result;
    });
  }

  read(key) {
    try {
      var raw = localStorage.getItem(key);
      if (!raw) return null;
      var entry = JSON.parse(raw);
      if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
        localStorage.removeItem(key);
        return null;
      }
      return entry.result;
    } catch (e) {
      return null;
    }
  }

  write(key, result) {
    try {
      localStorage.setItem(key, JSON.stringify({ result: result, timestamp: Date.now() }));
    } catch (e) {
      // quota exceeded or private browsing — silently ignore
    }
  }
}
