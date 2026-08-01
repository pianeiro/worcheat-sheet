import { HeroSection, PieceCard, ArtistCard, PieceRow, ScoreFrame } from './components.js';

export function buildHomeView(vm) {
  var hero = vm.featured;
  var heroHtml = HeroSection({
    label: hero.label,
    title: hero.title,
    subtitle: hero.subtitle,
    ctaHref: hero.ctaHref,
    ctaLabel: hero.ctaLabel,
    bgImage: hero.bgImage,
    gradientVia: hero.gradientVia,
  });

  var pieceCards = vm.featuredPieces.map(function (p) {
    return PieceCard({
      title: p.title,
      artist: p.artist,
      href: p.href,
      thumbnailUrl: p.thumbnailUrl,
      gradientFrom: p.gradients[0],
      gradientVia: p.gradients[1],
      gradientTo: p.gradients[2],
    });
  }).join('\n');

  var artistCards = vm.artists.map(function (a) {
    return ArtistCard({
      name: a.name,
      genre: a.genre,
      href: a.href,
      gradientFrom: a.gradients[0],
      gradientTo: a.gradients[1],
      profileImageUrl: a.profileImageUrl,
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

export function buildArtistsIndexView(vm) {
  var artistCards = vm.artists.map(function (a) {
    return ArtistCard({
      name: a.name,
      genre: a.genre,
      href: a.href,
      gradientFrom: a.gradients[0],
      gradientTo: a.gradients[1],
      profileImageUrl: a.profileImageUrl,
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

export function buildArtistView(vm) {
  var pieceRows = vm.pieces.map(function (p) {
    return PieceRow({
      index: p.index,
      title: p.title,
      artist: p.artist,
      href: p.href,
      thumbnailUrl: p.thumbnailUrl,
      gradientFrom: p.gradients[0],
      gradientTo: p.gradients[1],
    });
  }).join('\n');

  return [
    HeroSection({
      label: 'Artist',
      title: vm.name,
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
      bgImage: vm.profileImageUrl,
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

export function buildPieceView(vm) {
  var morePiecesHtml = vm.otherPieces.length > 0
    ? vm.otherPieces.map(function (p) {
        return PieceRow({
          index: p.index,
          title: p.title,
          artist: p.artist,
          href: p.href,
          thumbnailUrl: p.thumbnailUrl,
          gradientFrom: p.gradients[0],
          gradientTo: p.gradients[1],
        });
      }).join('\n')
    : '<div class="text-center py-8 text-on-surface-variant text-body-md">More pieces coming soon.</div>';

  var similarArtistCards = vm.similarArtists.map(function (a) {
    return ArtistCard({
      name: a.name,
      genre: a.genre,
      href: a.href,
      gradientFrom: a.gradients[0],
      gradientTo: a.gradients[1],
      profileImageUrl: a.profileImageUrl,
    });
  }).join('\n');

  var watchYoutubeHtml = vm.watchYoutubeUrl
    ? '<a href="' + vm.watchYoutubeUrl + '" target="_blank" rel="noopener" class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-container hover:bg-primary text-on-primary-container text-sm font-semibold transition-all"><span class="material-symbols-outlined text-base">play_arrow</span>Watch on YouTube</a>'
    : '<span class="text-on-surface-variant text-sm pointer-events-none opacity-50">No video available</span>';

  return [
    HeroSection({
      label: 'Score',
      title: vm.title,
      subtitle: vm.artistName,
      ctaHref: '#',
      ctaLabel: 'View Score',
      ctaIcon: 'visibility',
      ctaId: 'piece-hero-cta',
      gradientFrom: 'from-surface-container-lowest',
      gradientVia: 'via-primary/20',
      gradientTo: 'to-ncs-pink/10',
      badgeClass: 'bg-primary',
      heroHeight: 'min-h-[250px] md:min-h-[320px] h-auto',
      bgImage: vm.bgImage,
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
