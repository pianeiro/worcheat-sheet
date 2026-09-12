/**
 * @typedef {import('./ports/ly-source-repository.js').LySourceRepository} LySourceRepository
 * @typedef {import('./ports/score-renderer.js').ScoreRenderer} ScoreRenderer
 */

export class RenderScore {
  /**
   * @param {{ lySourceRepository: LySourceRepository, scoreRenderer: ScoreRenderer }} deps
   */
  constructor({ lySourceRepository, scoreRenderer }) {
    this.lySourceRepository = lySourceRepository;
    this.scoreRenderer = scoreRenderer;
  }

  /**
   * @param {string} artistSlug
   * @param {string} pieceSlug
   * @param {'svg'|'pdf'} [backend='svg']
   * @returns {Promise<import('./ports/score-renderer.js').RenderResult>}
   */
  execute(artistSlug, pieceSlug, backend) {
    var repository = this.lySourceRepository;
    var renderer = this.scoreRenderer;
    var slug = artistSlug + '/' + pieceSlug;
    return repository.fetchLy(artistSlug, pieceSlug).then(function (lySource) {
      return renderer.render(lySource, backend, slug);
    });
  }
}
