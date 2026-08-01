import { findPiece } from '../domain/entities.js';

export function viewPiece(collection, artistSlug, pieceSlug) {
  var found = findPiece(collection, artistSlug, pieceSlug);
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
