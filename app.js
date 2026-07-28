(function () {
  'use strict';

  // ---- State ----
  const state = {
    artists: [],
    currentArtistSlug: null,
    currentPieceSlug: null,
  };

  const HACKLILY_URL = 'wss://render.hacklily.org/rpc';

  // ---- Helpers ----

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function slugify(str) {
    return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  function getLyPath(artistSlug, pieceSlug) {
    return 'musics/' + artistSlug + '/' + pieceSlug + '.ly';
  }

  function getYoutubeChannelAvatarUrl(channelUrl) {
    if (!channelUrl) return null;
    var m = channelUrl.match(/(?:youtube\.com|youtu\.be)\/(?:channel\/)?([\w@-]+)/);
    return m ? 'https://unavatar.io/youtube/' + m[1] : null;
  }

  function getYoutubeThumbnailUrl(youtubeUrl) {
    if (!youtubeUrl) return null;
    var match = youtubeUrl.match(/(?:youtu\.be\/|v=)([a-zA-Z0-9_-]{11})/);
    return match ? 'https://img.youtube.com/vi/' + match[1] + '/maxresdefault.jpg' : null;
  }

  // ---- Component Factories ----

  function Sidebar(props) {
    var route = props.currentRoute || 'home';
    var artistSlug = props.currentArtistSlug || null;
    return [
      '<aside class="bg-surface-container-lowest hidden lg:flex flex-col h-screen w-64 shrink-0 p-6 space-y-8 z-40 relative">',
      '<div class="flex items-center gap-3 mb-4">',
      '<span class="font-headline-lg text-headline-lg font-black text-primary tracking-tighter">WorCheat Sheet</span>',
      '</div>',
      '<nav class="flex-1 flex flex-col space-y-2">',
      navLink('#/', 'home', 'home', 'Home', route === 'home'),
      navLink('#/artists', 'explore', 'person_search', 'Artists', route === 'artist' || route === 'piece'),
      navLink(null, 'bolt', 'bolt', 'Trending', false, null, null, true),
      '</nav>',
      '<div class="mt-auto">',
      '<nav class="flex flex-col space-y-2">',
      navLink(null, 'help', 'help', 'Help', false, null, null, true),
      navLink(null, 'settings', 'settings', 'Settings', false, null, null, true),
      '</nav>',
      '</div>',
      '</aside>',
    ].join('\n');
  }

  function navLink(href, id, icon, label, isActive, extraClass, fallbackHref, isInactive) {
    var activeClass = isActive
      ? 'text-primary font-bold bg-primary/10'
      : 'text-on-surface-variant hover:bg-surface-container-high';
    var fillAttr = isActive ? ' style="font-variation-settings: \'FILL\' 1;"' : '';
    var hrefAttr = href ? ' href="' + href + '"' : '';
    var inactiveAttr = isInactive ? ' pointer-events-none opacity-50' : '';
    var tag = href || fallbackHref ? 'a' : 'span';
    var hrefOut = href ? ' href="' + href + '"' : fallbackHref ? ' href="' + fallbackHref + '"' : '';
    return [
      '<' + tag + hrefOut + ' class="flex items-center gap-4 px-4 py-3 rounded-lg transition-all' + activeClass + inactiveAttr + '">',
      '<span class="material-symbols-outlined"' + fillAttr + '>' + icon + '</span>',
      '<span>' + label + '</span>',
      '</' + tag + '>',
    ].join('\n');
  }

  function TopNav(props) {
    var route = props.currentRoute || 'home';
    return [
      '<header class="bg-surface-glass backdrop-blur-md sticky top-0 z-50 border-b border-white/10 flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4">',
      '<div class="lg:hidden">',
      '<span class="font-display-hero-mobile text-display-hero-mobile font-black text-primary tracking-tighter">WorCheat Sheet</span>',
      '</div>',
      '<div class="flex items-center gap-4 md:gap-6 ml-auto lg:ml-0">',
      '<button class="text-on-surface-variant hover:text-primary transition-colors md:hidden pointer-events-none opacity-50"><span class="material-symbols-outlined">search</span></button>',
      '<button class="text-on-surface-variant hover:text-primary transition-colors pointer-events-none opacity-50"><span class="material-symbols-outlined">settings</span></button>',
      '</div>',
      '</header>',
    ].join('\n');
  }

  function BottomNav(props) {
    var route = props.currentRoute || 'home';
    return [
      '<nav class="bg-surface-glass backdrop-blur-xl lg:hidden fixed bottom-0 left-0 w-full flex justify-around items-center py-3 px-4 z-50 border-t border-white/5">',
      bottomNavItem('#/', 'home', 'Home', route === 'home'),
      bottomNavItem(null, 'search', 'Search', false, true),
      bottomNavItem('#/artists', 'person_search', 'Artists', route === 'artist' || route === 'piece'),
      bottomNavItem(null, 'settings', 'Settings', false, true),
      '</nav>',
    ].join('\n');
  }

  function bottomNavItem(href, icon, label, isActive, isInactive) {
    var activeClass = isActive ? ' text-primary' : ' text-on-surface-variant';
    var fillAttr = isActive ? ' style="font-variation-settings: \'FILL\' 1;"' : '';
    var tag = href ? 'a' : 'span';
    var hrefAttr = href ? ' href="' + href + '"' : '';
    var inactiveAttr = isInactive ? ' pointer-events-none opacity-50' : '';
    return [
      '<' + tag + hrefAttr + ' class="flex flex-col items-center justify-center' + activeClass + inactiveAttr + '">',
      '<span class="material-symbols-outlined mb-1"' + fillAttr + '>' + icon + '</span>',
      '<span class="text-[10px]">' + label + '</span>',
      '</' + tag + '>',
    ].join('\n');
  }

  function Footer() {
    return [
      '<footer class="bg-surface-container-lowest border-t border-white/5 pt-stack-lg pb-stack-md px-margin-mobile md:px-margin-desktop">',
      '<div class="max-w-[1600px] mx-auto">',
      '<div class="grid grid-cols-1 md:grid-cols-12 gap-stack-md mb-stack-lg">',
      '<div class="md:col-span-5">',
      '<span class="font-display-hero text-5xl md:text-6xl font-black text-primary tracking-tighter mb-6 block">WorCheat Sheet</span>',
      '<p class="text-on-surface-variant text-body-md max-w-sm mb-6">Chord sheets &amp; scores, rendered via LilyPond.</p>',
      '</div>',
      '<div class="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">',
      footerColumn('Browse', [
        footerLink('#/', 'Home'),
        footerLink('#/artists', 'Artists'),
      ]),
      footerColumn('About', [
        footerLink(null, 'LilyPond', true),
        footerLink(null, 'Hacklily', true),
      ]),
      footerColumn('Legal', [
        footerLink(null, 'Privacy', true),
        footerLink(null, 'Terms', true),
      ]),
      '</div>',
      '</div>',
      '<div class="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">',
      '<p class="text-xs text-on-surface-variant">Powered by LilyPond &amp; Hacklily</p>',
      '</div>',
      '</div>',
      '</footer>',
    ].join('\n');
  }

  function footerColumn(title, links) {
    var items = links.map(function (l) {
      return '<' + (l.href ? 'a href="' + l.href + '"' : 'span') + ' class="text-on-surface-variant hover:text-on-surface transition-colors' + (l.inactive ? ' pointer-events-none opacity-50' : '') + '">' + l.label + '</' + (l.href ? 'a' : 'span') + '>';
    }).join('\n');
    return [
      '<div class="flex flex-col gap-4">',
      '<h4 class="font-label-caps text-label-caps text-primary uppercase tracking-widest">' + title + '</h4>',
      '<nav class="flex flex-col gap-2">',
      items,
      '</nav>',
      '</div>',
    ].join('\n');
  }

  function footerLink(href, label, inactive) {
    return { href: href, label: label, inactive: inactive || false };
  }

  function HeroSection(props) {
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

  function PieceCard(props) {
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

  function ArtistCard(props) {
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

  function PieceRow(props) {
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

  function ScoreFrame() {
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

  // ---- WebSocket RPC ----

  function renderLy(src) {
    return new Promise(function (resolve, reject) {
      var ws = new WebSocket(HACKLILY_URL);
      var id = 'rpc_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);

      ws.onopen = function () {
        ws.send(JSON.stringify({
          id: id,
          jsonrpc: '2.0',
          method: 'render',
          params: {
            backend: 'svg',
            src: src,
            version: 'stable',
          },
        }));
      };

      ws.onmessage = function (evt) {
        try {
          var data = JSON.parse(evt.data);
          if (data.id !== id) return;
          ws.close();
          if (data.error) {
            reject(new Error(data.error.message || JSON.stringify(data.error)));
          } else if (data.result) {
            resolve(data.result);
          } else {
            reject(new Error('Unexpected response format'));
          }
        } catch (e) {
          reject(e);
        }
      };

      ws.onerror = function () { reject(new Error('WebSocket connection failed')); };
      ws.onclose = function (evt) {
        if (evt.code !== 1000 && evt.code !== 1005) {
          reject(new Error('WebSocket closed unexpectedly (code ' + evt.code + ')'));
        }
      };

      setTimeout(function () {
        ws.close();
        reject(new Error('Render timed out'));
      }, 25000);
    });
  }

  // ---- Hash routing ----

  function parseHash() {
    var hash = window.location.hash.replace(/^#/, '');
    var parts = hash.split('/').filter(Boolean);
    if (parts.length === 0) return { view: 'home', artistSlug: null, pieceSlug: null };
    if (parts.length === 1) return { view: 'artist', artistSlug: parts[0], pieceSlug: null };
    return { view: 'piece', artistSlug: parts[0], pieceSlug: parts[1] };
  }

  function navigate(view, artistSlug, pieceSlug) {
    if (!artistSlug) {
      window.location.hash = '';
    } else if (!pieceSlug) {
      window.location.hash = '#/' + artistSlug;
    } else {
      window.location.hash = '#/' + artistSlug + '/' + pieceSlug;
    }
  }

  // ---- DOM refs ----
  var mainContent = document.getElementById('main-content');

  // ---- Nav active state ----

  function updateNavActiveState(route) {
    var sidebarLinks = document.querySelectorAll('aside nav a');
    var bottomNavLinks = document.querySelectorAll('nav.lg\\:hidden a');

    function setActive(links, isActive) {
      links.forEach(function (el) {
        if (isActive(el)) {
          el.classList.add('text-primary', 'font-bold', 'bg-primary/10');
          el.classList.remove('text-on-surface-variant', 'hover:bg-surface-container-high');
        } else {
          el.classList.remove('text-primary', 'font-bold', 'bg-primary/10');
          el.classList.add('text-on-surface-variant', 'hover:bg-surface-container-high');
        }
      });
    }

    setActive(sidebarLinks, function (el) {
      var href = el.getAttribute('href');
      if (route.view === 'home') return href === '#/';
      if (route.view === 'artist' || route.view === 'piece') return href === '#/artists';
      return false;
    });

    bottomNavLinks.forEach(function (el) {
      var href = el.getAttribute('href');
      var isActive = (route.view === 'home' && href === '#/') || ((route.view === 'artist' || route.view === 'piece') && href === '#/artists');
      if (isActive) {
        el.classList.add('text-primary');
        el.classList.remove('text-on-surface-variant');
        el.querySelector('.material-symbols-outlined')?.setAttribute('style', 'font-variation-settings: \'FILL\' 1;');
      } else {
        el.classList.remove('text-primary');
        el.classList.add('text-on-surface-variant');
        var icon = el.querySelector('.material-symbols-outlined');
        if (icon) icon.removeAttribute('style');
      }
    });
  }

  // ---- View builders ----

  function buildHomeView() {
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

  function buildArtistsIndexView() {
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

  function buildArtistView(artistSlug) {
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

  function buildPieceView(artistSlug, pieceSlug) {
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

  // ---- Score rendering ----

  function renderScore(artistSlug, pieceSlug) {
    var artist = state.artists.find(function (a) { return a.slug === artistSlug; });
    var piece = artist ? artist.pieces.find(function (p) { return p.slug === pieceSlug; }) : null;
    if (!artist || !piece) return;

    var statusEl = document.getElementById('score-status');
    var contentEl = document.getElementById('score-content');
    if (!statusEl || !contentEl) return;

    statusEl.innerHTML = [
      '<div class="w-9 h-9 border-4 border-outline-variant border-t-primary rounded-full animate-spin mx-auto mb-4"></div>',
      '<p class="text-on-surface-variant text-body-md">Compiling score...</p>',
    ].join('\n');
    contentEl.classList.add('hidden');

    var lyPath = getLyPath(artistSlug, pieceSlug);

    fetch(lyPath).then(function (resp) {
      if (!resp.ok) throw new Error('Failed to fetch .ly file (' + resp.status + ')');
      return resp.text();
    }).then(function (lySrc) {
      statusEl.innerHTML = [
        '<div class="w-9 h-9 border-4 border-outline-variant border-t-primary rounded-full animate-spin mx-auto mb-4"></div>',
        '<p class="text-on-surface-variant text-body-md">Rendering via Hacklily...</p>',
      ].join('\n');
      return renderLy(lySrc);
    }).then(function (result) {
      var svgPages = result.files;
      var html = '';
      if (svgPages && svgPages.length > 0) {
        var totalPages = svgPages.length;
        html = '<style>#score-content .score-page svg{display:block;width:100%;height:auto;}</style>';
        html += '<div class="bg-white rounded-lg p-4">';
        html += '<div class="score-page">' + svgPages[0] + '</div>';
        html += '</div>';
        if (totalPages > 1) {
          html += '<div class="flex items-center justify-center gap-4 mt-4 pb-2">';
          html += '<button id="prev-page" class="flex items-center gap-1 px-3 py-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant text-sm font-semibold transition-all disabled:opacity-30 disabled:pointer-events-none"><span class="material-symbols-outlined text-base">chevron_left</span>Prev</button>';
          html += '<span id="page-indicator" class="text-sm text-on-surface-variant font-semibold">1 / ' + totalPages + '</span>';
          html += '<button id="next-page" class="flex items-center gap-1 px-3 py-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant text-sm font-semibold transition-all disabled:opacity-30 disabled:pointer-events-none">Next<span class="material-symbols-outlined text-base">chevron_right</span></button>';
          html += '</div>';
        }
      } else {
        html = '<div class="text-center py-10 text-red-400">No SVG files returned.</div>';
      }
      if (result.logs) {
        html += '<div class="bg-surface-container border border-outline-variant rounded-md p-3 mt-3 font-mono text-xs text-on-surface-variant whitespace-pre-wrap overflow-y-auto max-h-36">' + escapeHtml(result.logs) + '</div>';
      }
      statusEl.classList.add('hidden');
      contentEl.innerHTML = html;
      contentEl.classList.remove('hidden');
      if (svgPages && svgPages.length > 1) {
        var currentPage = 0;
        var totalPages = svgPages.length;
        var pageContainer = contentEl.querySelector('.score-page');
        var prevBtn = document.getElementById('prev-page');
        var nextBtn = document.getElementById('next-page');
        var indicator = document.getElementById('page-indicator');
        function showPage(idx) {
          pageContainer.innerHTML = svgPages[idx];
          currentPage = idx;
          if (indicator) indicator.textContent = (idx + 1) + ' / ' + totalPages;
          if (prevBtn) prevBtn.disabled = idx === 0;
          if (nextBtn) nextBtn.disabled = idx === totalPages - 1;
        }
        if (prevBtn) prevBtn.addEventListener('click', function () {
          if (currentPage > 0) showPage(currentPage - 1);
        });
        if (nextBtn) nextBtn.addEventListener('click', function () {
          if (currentPage < totalPages - 1) showPage(currentPage + 1);
        });
      }
    }).catch(function (err) {
      statusEl.innerHTML = '<div class="text-center py-10 text-red-400">' + escapeHtml(err.message) + '</div>';
    });
  }

  // ---- Route handler ----

  function handleRoute() {
    var route = parseHash();
    state.currentArtistSlug = route.artistSlug;
    state.currentPieceSlug = route.pieceSlug;

    updateNavActiveState(route);

    if (route.view === 'home') {
      mainContent.innerHTML = buildHomeView();
    } else if (route.view === 'artist' && route.artistSlug === 'artists') {
      mainContent.innerHTML = buildArtistsIndexView();
    } else if (route.view === 'artist') {
      mainContent.innerHTML = buildArtistView(route.artistSlug);
    } else if (route.view === 'piece') {
      mainContent.innerHTML = buildPieceView(route.artistSlug, route.pieceSlug);
      var cta = document.getElementById('piece-hero-cta');
      if (cta) {
        cta.addEventListener('click', function (e) {
          e.preventDefault();
          cta.classList.add('pointer-events-none', 'opacity-50');
          renderScore(route.artistSlug, route.pieceSlug);
        });
      }
    }
  }

  // ---- Init ----

  async function init() {
    try {
      var resp = await fetch('data/artists.json');
      state.artists = await resp.json();

      state.artists.forEach(function (artist) {
        if (!artist.slug) artist.slug = slugify(artist.name);
        artist.pieces.forEach(function (piece) {
          if (!piece.slug) piece.slug = slugify(piece.title);
        });
      });

      window.addEventListener('hashchange', handleRoute);
      handleRoute();
    } catch (err) {
      mainContent.innerHTML = '<div class="text-center py-16 text-red-400 text-body-md">Failed to load artists: ' + escapeHtml(err.message) + '</div>';
    }
  }

  init();
})();
