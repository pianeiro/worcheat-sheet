import { getYoutubeChannelAvatarUrl } from '../formatting.js';

export function buildArtistsIndexViewModel(collection) {
  return {
    artists: collection.artists.map(function (a, i) {
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
