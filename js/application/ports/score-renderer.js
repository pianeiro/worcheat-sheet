/**
 * @typedef {Object} RenderResult
 * @property {string[]} files - One page string per page of the score.
 * @property {string} logs - LilyPond compilation logs.
 */

/**
 * Port: renders LySource into score pages (SVG or PDF).
 * Abstract base class — extended by concrete adapters (e.g. HacklilyScoreRenderer).
 */
export class ScoreRenderer {
  constructor() {
    if (new.target === ScoreRenderer) {
      throw new TypeError('ScoreRenderer is abstract');
    }
  }

  /**
   * @abstract
   * @param {string} lySource
   * @param {'svg'|'pdf'} [backend='svg']
   * @param {string} [slug]
   * @returns {Promise<RenderResult>}
   */
  render(lySource, backend, slug) {
    throw new Error('ScoreRenderer.render() not implemented');
  }
}
