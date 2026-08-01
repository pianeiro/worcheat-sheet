import { getYoutubeThumbnailUrl, getYoutubeChannelAvatarUrl } from '../formatting.js';

export function buildHomeViewModel(collection) {
  var pieces = collection.artists.length > 0
    ? collection.artists.reduce(function (acc, a) {
        return acc.concat(a.pieces.map(function (p) { return { piece: p, artist: a }; }));
      }, [])
    : [];

  var featured = pieces.length > 0 ? pieces[0] : null;

  return {
    featured: featured
      ? {
          label: 'Featured Score',
          title: featured.piece.title,
          subtitle: featured.artist.name,
          ctaHref: '#/' + featured.artist.slug + '/' + featured.piece.slug,
          ctaLabel: 'View Score',
          bgImage: getYoutubeThumbnailUrl(featured.piece.youtubeUrl),
          gradientVia: 'via-primary/20',
        }
      : {
          label: 'Featured Score',
          title: 'WorCheat Sheet',
          subtitle: 'Select an artist to browse pieces',
          ctaHref: '#/artists',
          ctaLabel: 'Browse Artists',
          gradientVia: 'via-primary/10',
        },
    featuredPieces: pieces.slice(0, 4).map(function (item, i) {
      return {
        title: item.piece.title,
        artist: item.artist.name,
        href: '#/' + item.artist.slug + '/' + item.piece.slug,
        thumbnailUrl: getYoutubeThumbnailUrl(item.piece.youtubeUrl),
        gradients: i % 2 === 0
          ? ['from-primary/30', 'via-surface', 'to-ncs-pink/20']
          : ['from-ncs-pink/30', 'via-surface', 'to-primary/20'],
      };
    }),
    artists: collection.artists.slice(0, 4).map(function (a, i) {
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
