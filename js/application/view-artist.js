import { findArtist } from '../domain/entities.js';

export function viewArtist(collection, artistSlug) {
  return findArtist(collection, artistSlug);
}
