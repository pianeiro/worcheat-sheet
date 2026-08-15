import { errorMessage } from './formatting.js';
import { buildHomeView, buildArtistsIndexView, buildArtistView, buildPieceView } from './views.js';
import { buildHomeViewModel } from './presenters/home-presenter.js';
import { buildArtistsIndexViewModel } from './presenters/artists-index-presenter.js';
import { buildArtistViewModel } from './presenters/artist-presenter.js';
import { buildPieceViewModel } from './presenters/piece-presenter.js';
import { createScorePresenter } from './presenters/score-presenter.js';

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

export class RouteController {
  constructor({ collection, viewArtist, viewPiece, renderScore, mainContent }) {
    this.collection = collection;
    this.viewArtist = viewArtist;
    this.viewPiece = viewPiece;
    this.renderScore = renderScore;
    this.mainContent = mainContent;
  }

  handleRoute() {
    document.querySelector('main').scrollTo(0, 0);
    var route = parseHash();
    updateNavActiveState(route);

    if (route.view === 'home') {
      this.mainContent.innerHTML = buildHomeView(buildHomeViewModel(this.collection));
    } else if (route.view === 'artist' && route.artistSlug === 'artists') {
      this.mainContent.innerHTML = buildArtistsIndexView(buildArtistsIndexViewModel(this.collection));
    } else if (route.view === 'artist') {
      var artist = this.viewArtist.execute(this.collection, route.artistSlug);
      this.mainContent.innerHTML = artist
        ? buildArtistView(buildArtistViewModel(artist))
        : errorMessage('Artist not found.');
    } else if (route.view === 'piece') {
      var data = this.viewPiece.execute(this.collection, route.artistSlug, route.pieceSlug);
      if (!data) {
        this.mainContent.innerHTML = errorMessage('Piece not found.');
        return;
      }
      this.mainContent.innerHTML = buildPieceView(buildPieceViewModel(data));
      this.wireScoreCta(route);
    }
  }

  wireScoreCta(route) {
    var cta = document.getElementById('piece-hero-cta');
    if (!cta) return;
    var self = this;
    cta.addEventListener('click', function (e) {
      e.preventDefault();
      cta.classList.add('pointer-events-none', 'opacity-50');
      var statusEl = document.getElementById('score-status');
      var contentEl = document.getElementById('score-content');
      if (!statusEl || !contentEl) return;
      var scorePresenter = createScorePresenter(statusEl, contentEl);
      scorePresenter.renderWith(self.renderScore.execute(route.artistSlug, route.pieceSlug));
    });
  }
}
