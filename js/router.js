import { state, mainContent } from './state.js';
import { buildHomeView, buildArtistsIndexView, buildArtistView, buildPieceView } from './views.js';
import { renderScore } from './score.js';

export function parseHash() {
  var hash = window.location.hash.replace(/^#/, '');
  var parts = hash.split('/').filter(Boolean);
  if (parts.length === 0) return { view: 'home', artistSlug: null, pieceSlug: null };
  if (parts.length === 1) return { view: 'artist', artistSlug: parts[0], pieceSlug: null };
  return { view: 'piece', artistSlug: parts[0], pieceSlug: parts[1] };
}

export function navigate(view, artistSlug, pieceSlug) {
  if (!artistSlug) {
    window.location.hash = '';
  } else if (!pieceSlug) {
    window.location.hash = '#/' + artistSlug;
  } else {
    window.location.hash = '#/' + artistSlug + '/' + pieceSlug;
  }
}

export function updateNavActiveState(route) {
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

export function handleRoute() {
  document.querySelector('main').scrollTo(0, 0);
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
