export class Piece {
  constructor({ slug, title, youtubeUrl }) {
    this.slug = slug;
    this.title = title;
    this.youtubeUrl = youtubeUrl || null;
    Object.freeze(this);
  }
}

export class Artist {
  constructor({ slug, name, youtubeChannelUrl, pieces }) {
    this.slug = slug;
    this.name = name;
    this.youtubeChannelUrl = youtubeChannelUrl || null;
    this.pieces = Object.freeze(pieces);
    Object.freeze(this);
  }
}

export class Collection {
  constructor(artists) {
    this.artists = Object.freeze(artists);
    Object.freeze(this);
  }

  findArtist(slug) {
    return this.artists.find(function (a) { return a.slug === slug; }) || null;
  }

  findPiece(artistSlug, pieceSlug) {
    var artist = this.findArtist(artistSlug);
    if (!artist) return null;
    var piece = artist.pieces.find(function (p) { return p.slug === pieceSlug; }) || null;
    return piece ? { artist: artist, piece: piece } : null;
  }
}
