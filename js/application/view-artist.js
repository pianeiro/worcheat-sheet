/**
 * @typedef {import('../domain/entities.js').Collection} Collection
 * @typedef {import('../domain/entities.js').Artist} Artist
 */

export class ViewArtist {
  /**
   * @param {Collection} collection
   * @param {string} artistSlug
   * @returns {Artist|null}
   */
  execute(collection, artistSlug) {
    return collection.findArtist(artistSlug);
  }
}
