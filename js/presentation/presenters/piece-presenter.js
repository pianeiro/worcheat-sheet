import { getYoutubeThumbnailUrl, getYoutubeChannelAvatarUrl } from '../formatting.js';

export function buildPieceViewModel(data) {
  var artist = data.artist;
  var piece = data.piece;

  return {
    title: piece.title,
    artistName: artist.name,
    artistSlug: artist.slug,
    bgImage: getYoutubeThumbnailUrl(piece.youtubeUrl),
    watchYoutubeUrl: piece.youtubeUrl,
    otherPieces: data.otherPieces.map(function (p, i) {
      return {
        index: i + 1,
        title: p.title,
        artist: artist.name,
        href: '#/' + artist.slug + '/' + p.slug,
        thumbnailUrl: getYoutubeThumbnailUrl(p.youtubeUrl),
        gradients: i % 2 === 0
          ? ['from-primary/30', 'to-ncs-pink/20']
          : ['from-ncs-pink/30', 'to-primary/20'],
      };
    }),
    similarArtists: data.otherArtists.map(function (a, i) {
      return {
        name: a.name,
        genre: 'CC',
        href: '#/' + a.slug,
        gradients: i % 2 === 0
          ? ['from-primary/40', 'to-ncs-pink/20']
          : ['from-ncs-pink/40', 'to-primary/20'],
        profileImageUrl: getYoutubeChannelAvatarUrl(a.youtubeChannelUrl),
      };
    }),
  };
}
