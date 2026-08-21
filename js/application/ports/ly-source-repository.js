/**
 * Port: fetches LySource blobs from the Catalog.
 * Abstract base class — extended by concrete adapters (e.g. FileLySourceRepository).
 */
export class LySourceRepository {
  constructor() {
    if (new.target === LySourceRepository) {
      throw new TypeError('LySourceRepository is abstract');
    }
  }

  /**
   * @abstract
   * @param {string} artistSlug
   * @param {string} pieceSlug
   * @returns {Promise<string>}
   */
  fetchLy(artistSlug, pieceSlug) {
    throw new Error('LySourceRepository.fetchLy() not implemented');
  }
}
