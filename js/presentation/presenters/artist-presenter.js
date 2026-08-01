import { getYoutubeThumbnailUrl, getYoutubeChannelAvatarUrl } from '../formatting.js';

export function buildArtistViewModel(artist) {
  return {
    name: artist.name,
    profileImageUrl: getYoutubeChannelAvatarUrl(artist.youtubeChannelUrl),
    pieces: artist.pieces.map(function (p, i) {
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
  };
}
