export function HeroSection(props) {
  var label = props.label || 'Featured';
  var title = props.title || '';
  var subtitle = props.subtitle || '';
  var ctaHref = props.ctaHref || '#';
  var ctaLabel = props.ctaLabel || 'View Score';
  var gradientFrom = props.gradientFrom || 'from-surface-container-lowest';
  var gradientVia = props.gradientVia || 'via-primary/20';
  var gradientTo = props.gradientTo || 'to-surface';
  var ctaIcon = props.ctaIcon || 'visibility';
  var badgeClass = props.badgeClass || 'bg-ncs-yellow';
  var hideCta = props.hideCta || false;
  var extraContent = props.extraContent || '';
  var ctaId = props.ctaId || '';
  var heroHeight = props.heroHeight || 'h-[300px] md:h-[400px]';
  var bgImage = props.bgImage || '';

  var ctaHtml = '';
  if (!hideCta) {
    ctaHtml = [
      '<div class="flex items-center gap-4">',
      '<a href="' + ctaHref + '"' + (ctaId ? ' id="' + ctaId + '"' : '') + ' class="inline-flex items-center gap-2 bg-primary-container hover:bg-primary text-on-primary-container rounded-full px-6 py-3 md:px-8 md:py-4 font-track-title text-track-title transition-all shadow-[0_0_20px_rgba(189,0,255,0.3)] hover:shadow-[0_0_30px_rgba(189,0,255,0.5)] hover:-translate-y-1">',
      '<span class="material-symbols-outlined" style="font-variation-settings: \'FILL\' 1;">' + ctaIcon + '</span>',
      ctaLabel,
      '</a>',
      '</div>',
    ].join('\n');
  } else if (extraContent) {
    ctaHtml = '<div class="flex items-center gap-4">' + extraContent + '</div>';
  }

  var subtitleHtml = subtitle ? '<p class="font-headline-md text-xl md:text-2xl text-primary mb-6 font-bold">' + subtitle + '</p>' : '';

  return [
    '<div class="px-margin-mobile md:px-margin-desktop pt-8 pb-4 max-w-[1600px] mx-auto w-full">',
    '<section class="relative w-full ' + heroHeight + ' flex flex-col justify-end flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl border border-white/10">',
    '<div class="absolute inset-0 overflow-hidden rounded-2xl">',
    bgImage ? '<img class="absolute inset-0 w-full h-full object-cover" src="' + bgImage + '" alt="">' : '',
    '<div class="absolute inset-0 bg-gradient-to-br ' + gradientFrom + ' ' + gradientVia + ' ' + gradientTo + '"></div>',
    '<div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>',
    '</div>',
    '<div class="relative z-10 px-8 md:px-12 pt-8 md:pt-12 pb-8 md:pb-12">',
    '<div class="max-w-4xl">',
    '<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-glass border border-white/10 mb-4">',
    '<span class="w-2 h-2 rounded-full ' + badgeClass + ' animate-pulse"></span>',
    '<span class="font-label-caps text-label-caps text-on-surface uppercase tracking-widest text-[10px]">' + label + '</span>',
    '</div>',
    '<h1 class="font-headline-lg text-4xl md:text-6xl font-black text-on-surface mb-2">' + title + '</h1>',
    subtitleHtml,
    ctaHtml,
    '</div>',
    '</div>',
    '</section>',
    '</div>',
  ].join('\n');
}

export function PieceCard(props) {
  var title = props.title || '';
  var artist = props.artist || '';
  var href = props.href || '#';
  var gradientFrom = props.gradientFrom || 'from-primary/30';
  var gradientVia = props.gradientVia || 'via-surface';
  var gradientTo = props.gradientTo || 'to-ncs-pink/20';
  var thumbnailUrl = props.thumbnailUrl || '';

  return [
    '<div class="flex-shrink-0 w-64 md:w-72 group cursor-pointer">',
    '<a href="' + href + '">',
    '<div class="relative aspect-square mb-4 overflow-hidden rounded-xl border border-white/10 group-hover:border-primary/50 transition-colors">',
    '<div class="w-full h-full bg-gradient-to-br ' + gradientFrom + ' ' + gradientVia + ' ' + gradientTo + '">' + (thumbnailUrl ? '<img class="w-full h-full object-cover" src="' + thumbnailUrl + '" alt="">' : '') + '</div>',
    '<div class="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">',
    '<span class="material-symbols-outlined text-primary text-6xl shadow-black drop-shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300" style="font-variation-settings: \'FILL\' 1;">visibility</span>',
    '</div>',
    '</div>',
    '<p class="font-track-title text-lg text-on-surface truncate group-hover:text-primary transition-colors font-bold mb-1">' + title + '</p>',
    '<p class="text-base text-on-surface-variant truncate">' + artist + '</p>',
    '</a>',
    '</div>',
  ].join('\n');
}

export function ArtistCard(props) {
  var name = props.name || '';
  var genre = props.genre || '';
  var href = props.href || '#';
  var gradientFrom = props.gradientFrom || 'from-primary/40';
  var gradientTo = props.gradientTo || 'to-ncs-pink/20';

  return [
    '<a href="' + href + '" class="bg-surface-card rounded-2xl p-6 md:p-8 border border-white/5 shadow-lg hover:border-primary/50 hover:bg-surface-container transition-all duration-300 group cursor-pointer flex flex-col items-center text-center">',
    '<div class="relative w-32 h-32 md:w-40 md:h-40 mb-6">',
    '<div class="w-full h-full rounded-full bg-gradient-to-br ' + gradientFrom + ' ' + gradientTo + ' group-hover:shadow-[0_0_30px_rgba(189,0,255,0.4)] transition-all duration-500 group-hover:scale-105 overflow-hidden">' + (props.profileImageUrl ? '<img class="w-full h-full object-cover" src="' + props.profileImageUrl + '" alt="">' : '') + '</div>',
    '<div class="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-primary transition-colors duration-500"></div>',
    '</div>',
    '<h3 class="font-headline-md text-xl text-on-surface font-bold mb-2 truncate w-full group-hover:text-primary transition-colors">' + name + '</h3>',
    '<p class="text-xs text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-widest font-semibold">' + genre + '</p>',
    '</a>',
  ].join('\n');
}

export function PieceRow(props) {
  var index = props.index || 1;
  var title = props.title || '';
  var artist = props.artist || '';
  var href = props.href || '#';
  var gradientFrom = props.gradientFrom || 'from-primary/30';
  var gradientTo = props.gradientTo || 'to-ncs-pink/20';
  var thumbnailUrl = props.thumbnailUrl || '';

  return [
    '<div class="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-surface-container transition-colors group">',
    '<span class="text-on-surface-variant text-sm w-6 text-right shrink-0">' + index + '</span>',
    '<div class="w-12 h-12 rounded-lg bg-gradient-to-br ' + gradientFrom + ' ' + gradientTo + ' shrink-0 overflow-hidden">' + (thumbnailUrl ? '<img class="w-full h-full object-cover" src="' + thumbnailUrl + '" alt="">' : '') + '</div>',
    '<div class="flex-1 min-w-0">',
    '<p class="font-track-title text-track-title text-on-surface truncate group-hover:text-primary transition-colors">' + title + '</p>',
    '<p class="text-sm text-on-surface-variant truncate">' + artist + '</p>',
    '</div>',
    '<a href="' + href + '" class="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary-container hover:bg-primary text-on-primary-container text-sm font-semibold transition-all opacity-0 group-hover:opacity-100">',
    '<span class="material-symbols-outlined text-base" style="font-variation-settings: \'FILL\' 1;">visibility</span>',
    'View Score',
    '</a>',
    '</div>',
  ].join('\n');
}

export function ScoreFrame() {
  return [
    '<div class="bg-surface-card rounded-2xl p-6 md:p-8 border border-white/5 shadow-lg">',
    '<div id="score-status" class="text-center py-12">',
    '<span class="material-symbols-outlined text-5xl text-primary mb-4 block">visibility</span>',
    '<p class="text-on-surface-variant text-body-md">Click <span class="text-primary font-bold">View Score</span> above to render.</p>',
    '</div>',
    '<div id="score-content" class="hidden"></div>',
    '</div>',
  ].join('\n');
}
