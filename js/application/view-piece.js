/**
 * @typedef {import('../domain/entities.js').Collection} Collection
 */

export class ViewPiece {
  /**
   * @param {Collection} collection
   * @param {string} artistSlug
   * @param {string} pieceSlug
   * @returns {{ artist: import('../domain/entities.js').Artist, piece: import('../domain/entities.js').Piece, otherPieces: import('../domain/entities.js').Piece[], otherArtists: import('../domain/entities.js').Artist[] }|null}
   */
  execute(collection, artistSlug, pieceSlug) {
    var found = collection.findPiece(artistSlug, pieceSlug);
    if (!found) return null;
    var otherPieces = found.artist.pieces.filter(function (p) { return p.slug !== pieceSlug; });
    var otherArtists = collection.artists.filter(function (a) { return a.slug !== artistSlug; });
    return {
      artist: found.artist,
      piece: found.piece,
      otherPieces: otherPieces,
      otherArtists: otherArtists,
    };
  }
}
