/**
 * @typedef {Object} RenderResult
 * @property {string[]} files - One SVG page string per page of the score.
 * @property {string} logs - LilyPond compilation logs.
 */

/**
 * Port: renders LySource into score SVG pages.
 * Implemented by concrete adapters (e.g. HacklilyScoreRenderer).
 *
 * @typedef {Object} ScoreRenderer
 * @property {function(string): Promise<RenderResult>} render
 */
export {};
