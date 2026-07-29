import { state } from './state.js';
import { getYoutubeThumbnailUrl, getYoutubeChannelAvatarUrl } from './helpers.js';
import { HeroSection, PieceCard, ArtistCard, PieceRow, ScoreFrame } from './components.js';

export function buildHomeView() {
  var pieces = state.artists.length > 0
    ? state.artists.reduce(function (acc, a) { return acc.concat(a.pieces.map(function (p) { return { piece: p, artist: a }; })); }, [])
    : [];

  var featuredPiece = pieces.length > 0 ? pieces[0] : null;
  var artists = state.artists;

  var heroHtml = featuredPiece
    ? HeroSection({
        label: 'Featured Score',
        title: featuredPiece.piece.title,
        subtitle: featuredPiece.artist.name,
        ctaHref: '#/' + featuredPiece.artist.slug + '/' + featuredPiece.piece.slug,
        ctaLabel: 'View Score',
        bgImage: getYoutubeThumbnailUrl(featuredPiece.piece.youtubeUrl),
      })
    : HeroSection({
        label: 'Featured Score',
        title: 'WorCheat Sheet',
        subtitle: 'Select an artist to browse pieces',
        ctaHref: '#/artists',
        ctaLabel: 'Browse Artists',
        gradientVia: 'via-primary/10',
      });

  var pieceCards = pieces.slice(0, 4).map(function (item, i) {
    var g = i % 2 === 0 ? 'from-primary/30 via-surface to-ncs-pink/20' : 'from-ncs-pink/30 via-surface to-primary/20';
    return PieceCard({
      title: item.piece.title,
      artist: item.artist.name,
      href: '#/' + item.artist.slug + '/' + item.piece.slug,
      thumbnailUrl: getYoutubeThumbnailUrl(item.piece.youtubeUrl),
      gradientFrom: g.split(' ')[0],
      gradientVia: g.split(' ')[1],
      gradientTo: g.split(' ')[2],
    });
  }).join('\n');

  var artistCards = artists.slice(0, 4).map(function (a, i) {
    var g = i % 2 === 0 ? 'from-primary/40 to-ncs-pink/20' : 'from-ncs-pink/40 to-primary/20';
    return ArtistCard({
      name: a.name,
      genre: 'CC',
      href: '#/' + a.slug,
      gradientFrom: g.split(' ')[0],
      gradientTo: g.split(' ')[1],
      profileImageUrl: getYoutubeChannelAvatarUrl(a.youtubeChannelUrl),
    });
  }).join('\n');

  return [
    heroHtml,
    '<div class="flex flex-col gap-stack-md px-margin-mobile md:px-margin-desktop pb-stack-lg max-w-[1600px] mx-auto w-full">',
    '<div class="flex flex-col gap-stack-md">',
    '<div class="flex items-center justify-between mb-2">',
    '<h2 class="font-headline-lg text-headline-lg font-bold text-on-surface">Featured Pieces</h2>',
    '<span class="text-primary font-track-title text-track-title pointer-events-none opacity-50">View All</span>',
    '</div>',
    '<div class="bg-surface-card rounded-2xl p-6 md:p-8 border border-white/5 shadow-lg">',
    '<div class="flex flex-row gap-6 overflow-x-auto pb-4 no-scrollbar">',
    pieceCards,
    '</div></div></div>',
    '<div class="flex flex-col gap-stack-lg">',
    '<div><div class="flex items-center justify-between mb-4">',
    '<h2 class="font-headline-lg text-headline-lg font-bold text-on-surface">Featured Artists</h2>',
    '</div><div class="grid grid-cols-2 md:grid-cols-4 gap-6">',
    artistCards,
    '<div class="h-24 lg:hidden"></div>',
    '</div></div></div></div>',
  ].join('\n');
}

export function buildArtistsIndexView() {
  var artists = state.artists;
  var artistCards = artists.map(function (a, i) {
    var g = i % 2 === 0 ? 'from-primary/40 to-ncs-pink/20' : 'from-ncs-pink/40 to-primary/20';
    return ArtistCard({
      name: a.name,
      genre: 'CC',
      href: '#/' + a.slug,
      gradientFrom: g.split(' ')[0],
      gradientTo: g.split(' ')[1],
      profileImageUrl: getYoutubeChannelAvatarUrl(a.youtubeChannelUrl),
    });
  }).join('\n');
  return [
    '<div class="flex flex-col gap-stack-md px-margin-mobile md:px-margin-desktop pt-stack-lg pb-stack-lg max-w-[1600px] mx-auto w-full">',
    '<h2 class="font-headline-lg text-headline-lg font-bold text-on-surface mb-6">Artists</h2>',
    '<div class="grid grid-cols-2 md:grid-cols-4 gap-6">',
    artistCards,
    '<div class="h-24 lg:hidden"></div>',
    '</div></div>',
  ].join('\n');
}

export function buildArtistView(artistSlug) {
  var artist = state.artists.find(function (a) { return a.slug === artistSlug; });
  if (!artist) return '<div class="text-center py-16 text-red-400 text-body-md">Artist not found.</div>';

  var pieceRows = artist.pieces.map(function (p, i) {
    return PieceRow({
      index: i + 1,
      title: p.title,
      artist: artist.name,
      href: '#/' + artist.slug + '/' + p.slug,
      thumbnailUrl: getYoutubeThumbnailUrl(p.youtubeUrl),
      gradientFrom: i % 2 === 0 ? 'from-primary/30' : 'from-ncs-pink/30',
      gradientTo: i % 2 === 0 ? 'to-ncs-pink/20' : 'to-primary/20',
    });
  }).join('\n');

  return [
    HeroSection({
      label: 'Artist',
      title: artist.name,
      subtitle: '',
      ctaHref: '#',
      ctaLabel: '',
      ctaIcon: '',
      gradientFrom: 'from-surface-container-lowest',
      gradientVia: 'via-ncs-pink/20',
      gradientTo: 'to-surface',
      badgeClass: 'bg-primary',
      heroHeight: 'h-[250px] md:h-[320px]',
      hideCta: true,
      bgImage: getYoutubeChannelAvatarUrl(artist.youtubeChannelUrl),
    }),
    '<div class="flex flex-col gap-stack-md px-margin-mobile md:px-margin-desktop pb-stack-lg max-w-[1600px] mx-auto w-full">',
    '<div class="bg-surface-card rounded-2xl p-6 md:p-8 border border-white/5 shadow-lg">',
    '<div class="flex items-center justify-between mb-4">',
    '<h2 class="font-headline-lg text-headline-lg font-bold text-on-surface">Pieces</h2>',
    '</div>',
    '<div class="flex flex-col gap-2">',
    pieceRows,
    '<div class="h-24 lg:hidden"></div>',
    '</div></div></div>',
  ].join('\n');
}

export function buildPieceView(artistSlug, pieceSlug) {
  var artist = state.artists.find(function (a) { return a.slug === artistSlug; });
  var piece = artist ? artist.pieces.find(function (p) { return p.slug === pieceSlug; }) : null;
  if (!artist || !piece) return '<div class="text-center py-16 text-red-400 text-body-md">Piece not found.</div>';

  var otherPieces = artist.pieces.filter(function (p) { return p.slug !== pieceSlug; });
  var morePiecesHtml = otherPieces.length > 0
    ? otherPieces.map(function (p, i) {
        return PieceRow({
          index: i + 1,
          title: p.title,
          artist: artist.name,
          href: '#/' + artist.slug + '/' + p.slug,
          thumbnailUrl: getYoutubeThumbnailUrl(p.youtubeUrl),
          gradientFrom: i % 2 === 0 ? 'from-primary/30' : 'from-ncs-pink/30',
          gradientTo: i % 2 === 0 ? 'to-ncs-pink/20' : 'to-primary/20',
        });
      }).join('\n')
    : '<div class="text-center py-8 text-on-surface-variant text-body-md">More pieces coming soon.</div>';

  var otherArtists = state.artists.filter(function (a) { return a.slug !== artistSlug; });
  var similarArtistCards = otherArtists.map(function (a, i) {
    var g = i % 2 === 0 ? 'from-primary/40 to-ncs-pink/20' : 'from-ncs-pink/40 to-primary/20';
    return ArtistCard({
      name: a.name,
      genre: 'CC',
      href: '#/' + a.slug,
      gradientFrom: g.split(' ')[0],
      gradientTo: g.split(' ')[1],
      profileImageUrl: getYoutubeChannelAvatarUrl(a.youtubeChannelUrl),
    });
  }).join('\n');

  var watchYoutubeHtml = piece.youtubeUrl
    ? '<a href="' + piece.youtubeUrl + '" target="_blank" rel="noopener" class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-container hover:bg-primary text-on-primary-container text-sm font-semibold transition-all"><span class="material-symbols-outlined text-base">play_arrow</span>Watch on YouTube</a>'
    : '<span class="text-on-surface-variant text-sm pointer-events-none opacity-50">No video available</span>';

  return [
    HeroSection({
      label: 'Score',
      title: piece.title,
      subtitle: artist.name,
      ctaHref: '#',
      ctaLabel: 'View Score',
      ctaIcon: 'visibility',
      ctaId: 'piece-hero-cta',
      gradientFrom: 'from-surface-container-lowest',
      gradientVia: 'via-primary/20',
      gradientTo: 'to-ncs-pink/10',
      badgeClass: 'bg-primary',
      heroHeight: 'min-h-[250px] md:min-h-[320px] h-auto',
      bgImage: getYoutubeThumbnailUrl(piece.youtubeUrl),
    }),
    '<div class="flex flex-col gap-stack-md px-margin-mobile md:px-margin-desktop pb-stack-lg max-w-[1600px] mx-auto w-full">',
    ScoreFrame(),
    '<div class="bg-surface-card rounded-2xl p-6 md:p-8 border border-white/5 shadow-lg flex flex-col md:flex-row justify-between gap-8">',
    '<div class="flex-1">',
    '<h3 class="font-headline-md text-headline-md font-bold text-on-surface mb-6">Credits</h3>',
    '<div class="grid grid-cols-2 gap-6">',
    '<div><p class="text-xs text-on-surface-variant uppercase tracking-widest mb-1">Produced by</p><p class="text-on-surface font-semibold">--</p></div>',
    '<div><p class="text-xs text-on-surface-variant uppercase tracking-widest mb-1">Written by</p><p class="text-on-surface font-semibold">--</p></div>',
    '<div><p class="text-xs text-on-surface-variant uppercase tracking-widest mb-1">Released</p><p class="text-on-surface font-semibold">--</p></div>',
    '</div></div>',
    '<div class="flex flex-col items-start gap-4 justify-center md:items-end">',
    watchYoutubeHtml,
    '<span class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-on-surface-variant text-sm pointer-events-none opacity-50"><span class="material-symbols-outlined text-base">share</span>Share Track</span>',
    '</div></div>',
    '<div>',
    '<h3 class="font-headline-md text-headline-md font-bold text-on-surface mb-4">More like this</h3>',
    '<div class="bg-surface-card rounded-2xl p-6 md:p-8 border border-white/5 shadow-lg">',
    morePiecesHtml,
    '</div></div>',
    '<div>',
    '<h3 class="font-headline-md text-headline-md font-bold text-on-surface mb-4">Similar artists</h3>',
    '<div class="grid grid-cols-2 md:grid-cols-4 gap-6">',
    similarArtistCards,
    '</div></div>',
    '<div class="h-24 lg:hidden"></div>',
    '</div>',
  ].join('\n');
}
