import { escapeHtml } from '../formatting.js';

var AUTO_HIDE_DELAY = 3000;
var SWIPE_THRESHOLD = 50;
var CARD_GAP = 24;

export function createPlayPresenter(containerEl, renderScore, artistSlug, pieceSlug) {
  var svgPages = [];
  var totalPages = 0;
  var focusedIndex = 0;
  var autoHideTimer = null;
  var destroyed = false;
  var cardEls = [];

  var handlers = {
    keydown: null,
    touchstart: null,
    touchend: null,
    pointerdown: null,
  };

  function hideShell() {
    var aside = document.querySelector('aside');
    var header = document.querySelector('header');
    var footer = document.querySelector('footer');
    var bottomNav = document.querySelector('nav.bg-surface-glass');
    var main = document.querySelector('main');
    if (aside) aside.style.display = 'none';
    if (header) header.style.display = 'none';
    if (footer) footer.style.display = 'none';
    if (bottomNav) bottomNav.style.display = 'none';
    if (main) {
      main.style.overflow = 'hidden';
      main.style.flex = '1';
    }
  }

  function restoreShell() {
    var aside = document.querySelector('aside');
    var header = document.querySelector('header');
    var footer = document.querySelector('footer');
    var bottomNav = document.querySelector('nav.bg-surface-glass');
    var main = document.querySelector('main');
    if (aside) aside.style.display = '';
    if (header) header.style.display = '';
    if (footer) footer.style.display = '';
    if (bottomNav) bottomNav.style.display = '';
    if (main) {
      main.style.overflow = '';
      main.style.flex = '';
    }
  }

  function showControlBar() {
    var bar = document.getElementById('play-control-bar');
    if (bar) {
      bar.style.opacity = '1';
      bar.style.pointerEvents = '';
    }
    resetAutoHide();
  }

  function hideControlBar() {
    var bar = document.getElementById('play-control-bar');
    if (bar) {
      bar.style.opacity = '0';
      bar.style.pointerEvents = 'none';
    }
  }

  function resetAutoHide() {
    clearTimeout(autoHideTimer);
    autoHideTimer = setTimeout(function () {
      if (!destroyed) hideControlBar();
    }, AUTO_HIDE_DELAY);
  }

  function sanitizeSvgIds(svg, pageIdx) {
    var suffix = '_p' + pageIdx;
    var ids = [];
    var idRegex = /\bid="([^"]+)"/g;
    var match;
    while ((match = idRegex.exec(svg)) !== null) {
      ids.push(match[1]);
    }
    var result = svg;
    ids.forEach(function (id) {
      var escapedId = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      result = result.replace(new RegExp('id="' + escapedId + '"', 'g'), 'id="' + id + suffix + '"');
      result = result.replace(new RegExp('#' + escapedId + '(?=[^\\w-])', 'g'), '#' + id + suffix);
      result = result.replace(new RegExp('href="#' + escapedId + '"', 'g'), 'href="#' + id + suffix + '"');
      result = result.replace(new RegExp('xlink:href="#' + escapedId + '"', 'g'), 'xlink:href="#' + id + suffix + '"');
    });
    return result;
  }

  function centerFocusedCard() {
    var track = document.getElementById('play-track');
    if (!track) return;
    var card = track.querySelector('.play-card-focused');
    if (!card) return;

    var viewportCenter = window.innerWidth / 2;
    var cardCenter = card.offsetLeft + card.offsetWidth / 2;
    var offset = cardCenter - viewportCenter;

    track.style.transform = 'translateX(' + (-offset) + 'px)';
  }

  function updateCards() {
    var start = Math.max(0, focusedIndex - 1);
    var end = Math.min(totalPages, focusedIndex + 2);

    for (var i = 0; i < cardEls.length; i++) {
      var card = cardEls[i];
      var isVisible = i >= start && i < end;
      var isFocused = i === focusedIndex;

      if (!isVisible) {
        card.style.display = 'none';
        card.className = 'play-card';
        continue;
      }

      card.style.display = '';
      card.style.opacity = isFocused ? '1' : '0.35';
      card.style.filter = isFocused ? 'none' : 'blur(4px)';
      card.style.transform = isFocused ? 'scale(1)' : 'scale(0.88)';
      card.style.zIndex = isFocused ? '2' : '1';
      card.className = 'play-card' + (isFocused ? ' play-card-focused' : '');
    }

    var prevBtn = document.getElementById('play-prev');
    var nextBtn = document.getElementById('play-next');
    if (prevBtn) prevBtn.disabled = focusedIndex === 0;
    if (nextBtn) nextBtn.disabled = focusedIndex === totalPages - 1;

    centerFocusedCard();
    showControlBar();
  }

  function showPage(idx) {
    if (idx < 0 || idx >= totalPages) return;
    focusedIndex = idx;
    updateCards();
  }

  function nextPage() {
    if (focusedIndex < totalPages - 1) showPage(focusedIndex + 1);
  }

  function prevPage() {
    if (focusedIndex > 0) showPage(focusedIndex - 1);
  }

  function firstPage() {
    showPage(0);
  }

  function lastPage() {
    showPage(totalPages - 1);
  }

  function exitPlay() {
    window.location.hash = '#/' + artistSlug + '/' + pieceSlug;
  }

  function onKeydown(e) {
    if (destroyed) return;
    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        nextPage();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        prevPage();
        break;
      case 'ArrowUp':
        e.preventDefault();
        firstPage();
        break;
      case 'ArrowDown':
        e.preventDefault();
        lastPage();
        break;
      case 'Escape':
        e.preventDefault();
        exitPlay();
        break;
    }
  }

  function onTouchStart(e) {
    if (destroyed) return;
    handlers.touchstartX = e.changedTouches[0].screenX;
    handlers.touchstartY = e.changedTouches[0].screenY;
  }

  function onTouchEnd(e) {
    if (destroyed || handlers.touchstartX == null) return;
    var deltaX = e.changedTouches[0].screenX - handlers.touchstartX;
    var deltaY = e.changedTouches[0].screenY - handlers.touchstartY;
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > SWIPE_THRESHOLD) {
      if (deltaX < 0) nextPage();
      else prevPage();
    }
    handlers.touchstartX = null;
    handlers.touchstartY = null;
  }

  function onPointerdown() {
    if (destroyed) return;
    showControlBar();
  }

  function wireEvents() {
    handlers.keydown = onKeydown;
    handlers.touchstart = onTouchStart;
    handlers.touchend = onTouchEnd;
    handlers.pointerdown = onPointerdown;

    document.addEventListener('keydown', handlers.keydown);

    var scoreArea = document.getElementById('play-score-area');
    if (scoreArea) {
      scoreArea.addEventListener('touchstart', handlers.touchstart, { passive: true });
      scoreArea.addEventListener('touchend', handlers.touchend, { passive: true });
      scoreArea.addEventListener('pointerdown', handlers.pointerdown);
    }

    var prevBtn = document.getElementById('play-prev');
    var nextBtn = document.getElementById('play-next');
    if (prevBtn) prevBtn.addEventListener('click', prevPage);
    if (nextBtn) nextBtn.addEventListener('click', nextPage);
  }

  function unwireEvents() {
    document.removeEventListener('keydown', handlers.keydown);
    var scoreArea = document.getElementById('play-score-area');
    if (scoreArea) {
      scoreArea.removeEventListener('touchstart', handlers.touchstart);
      scoreArea.removeEventListener('touchend', handlers.touchend);
      scoreArea.removeEventListener('pointerdown', handlers.pointerdown);
    }
    clearTimeout(autoHideTimer);
  }

  function renderScoreResult(result) {
    svgPages = result.files || [];
    totalPages = svgPages.length;
    focusedIndex = 0;

    var statusEl = document.getElementById('play-score-status');
    var track = document.getElementById('play-track');
    if (!statusEl || !track) return;

    if (totalPages === 0) {
      statusEl.innerHTML = '<div class="text-center py-10 text-red-400">No SVG files returned.</div>';
      return;
    }

    statusEl.classList.add('hidden');
    track.classList.remove('hidden');

    var style = document.createElement('style');
    style.id = 'play-view-styles';
    style.textContent =
      '#play-track {' +
      '  position: absolute; top: 0; left: 0; right: 0; bottom: 0;' +
      '  display: flex; align-items: center;' +
      '  gap: ' + CARD_GAP + 'px;' +
      '  transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);' +
      '}' +
      '.play-spacer { flex-shrink: 0; width: 50vw; }' +
      '.play-card {' +
      '  flex-shrink: 0;' +
      '  height: calc(100vh - 100px); max-width: 85vw;' +
      '  background: #fff; border-radius: 12px; overflow: hidden;' +
      '  box-shadow: 0 8px 32px rgba(0,0,0,0.4);' +
      '  display: flex; align-items: center; justify-content: center; padding: 24px;' +
      '  transition: opacity 0.4s ease, filter 0.4s ease, transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);' +
      '}' +
      '.play-card svg { display: block; width: auto; height: 100%; max-width: 100%; }';
    document.head.appendChild(style);

    track.innerHTML = '<div class="play-spacer"></div>';

    cardEls = [];
    for (var i = 0; i < totalPages; i++) {
      var card = document.createElement('div');
      card.className = 'play-card';
      card.dataset.page = i;
      card.innerHTML = sanitizeSvgIds(svgPages[i], i);
      var isInitialFocused = i === focusedIndex;
      var initialVisible = i >= 0 && i < Math.min(totalPages, 2);
      card.style.display = initialVisible ? '' : 'none';
      card.style.opacity = isInitialFocused ? '1' : '0.35';
      card.style.filter = isInitialFocused ? 'none' : 'blur(4px)';
      card.style.transform = isInitialFocused ? 'scale(1)' : 'scale(0.88)';
      card.style.zIndex = isInitialFocused ? '2' : '1';
      if (isInitialFocused) card.className = 'play-card play-card-focused';
      track.appendChild(card);
      cardEls.push(card);
    }

    wireEvents();
    updateCards();
  }

  return {
    init: function () {
      hideShell();
      var statusEl = document.getElementById('play-score-status');
      if (!statusEl) return;

      renderScore.execute(artistSlug, pieceSlug).then(function (result) {
        if (!destroyed) renderScoreResult(result);
      }).catch(function (err) {
        if (!destroyed) {
          statusEl.innerHTML = '<div class="text-center py-10 text-red-400">' + escapeHtml(err.message) + '</div>';
        }
      });
    },

    destroy: function () {
      destroyed = true;
      unwireEvents();
      var style = document.getElementById('play-view-styles');
      if (style) style.remove();
      restoreShell();
    },
  };
}
