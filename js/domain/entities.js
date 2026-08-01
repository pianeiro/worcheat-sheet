import { slugify } from './value-objects.js';

export function createPiece(piece) {
  return Object.freeze({
    slug: piece.slug || slugify(piece.title),
    title: piece.title,
    youtubeUrl: piece.youtubeUrl || null,
  });
}

export function createArtist(artist) {
  return Object.freeze({
    slug: artist.slug || slugify(artist.name),
    name: artist.name,
    youtubeChannelUrl: artist.youtubeChannelUrl || null,
    pieces: Object.freeze(artist.pieces.map(createPiece)),
  });
}

export function createCollection(artists) {
  return Object.freeze({
    artists: Object.freeze(artists.map(createArtist)),
  });
}

export function findArtist(collection, slug) {
  return collection.artists.find(function (a) { return a.slug === slug; }) || null;
}

export function findPiece(collection, artistSlug, pieceSlug) {
  var artist = findArtist(collection, artistSlug);
  if (!artist) return null;
  var piece = artist.pieces.find(function (p) { return p.slug === pieceSlug; }) || null;
  return piece ? { artist: artist, piece: piece } : null;
}
