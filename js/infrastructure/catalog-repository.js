import { createArtist } from '../domain/entities.js';

export function createCatalogRepository() {
  return {
    load: function () {
      return fetch('data/artists.json').then(function (resp) {
        if (!resp.ok) throw new Error('Failed to load catalog (' + resp.status + ')');
        return resp.json();
      }).then(function (rows) {
        return rows.map(createArtist);
      });
    },
  };
}
