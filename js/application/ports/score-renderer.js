/**
 * @typedef {Object} RenderResult
 * @property {string[]} files - One SVG page string per page of the score.
 * @property {string} logs - LilyPond compilation logs.
 */

/**
 * Port: renders LySource into score SVG pages.
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
   * @returns {Promise<RenderResult>}
   */
  render(lySource) {
    throw new Error('ScoreRenderer.render() not implemented');
  }
}
