import { Artist, Piece, Collection } from '../domain/entities.js';
import { slugify } from '../domain/value-objects.js';
import { CatalogRepository } from '../application/ports/catalog-repository.js';

export class JsonCatalogRepository extends CatalogRepository {
  load() {
    return fetch('data/artists.json').then(function (resp) {
      if (!resp.ok) throw new Error('Failed to load catalog (' + resp.status + ')');
      return resp.json();
    }).then(function (rows) {
      var artists = rows.map(function (row) {
        return new Artist({
          slug: row.slug || slugify(row.name),
          name: row.name,
          youtubeChannelUrl: row.youtubeChannelUrl || null,
          pieces: row.pieces.map(function (p) {
            return new Piece({
              slug: p.slug || slugify(p.title),
              title: p.title,
              youtubeUrl: p.youtubeUrl || null,
            });
          }),
        });
      });
      return new Collection(artists);
    });
  }
}
