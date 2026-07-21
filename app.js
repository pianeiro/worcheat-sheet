(function() {
  'use strict';

  // ---- State ----
  /** Application state.
   * @type {{ artists: Array, currentView: string, currentArtistSlug: string|null, currentPieceSlug: string|null }}
   */
  const state = {
    artists: [],
    currentView: 'artists',
    currentArtistSlug: null,
    currentPieceSlug: null,
  };

  const HACKLILY_URL = 'wss://render.hacklily.org/rpc';

  // ---- DOM refs ----
  const sidebarList = document.getElementById('sidebarList');
  const sidebarTitle = document.getElementById('sidebarTitle');
  const backBtn = document.getElementById('backBtn');
  const welcome = document.getElementById('welcome');
  const scoreView = document.getElementById('scoreView');
  const scoreTitle = document.getElementById('scoreTitle');
  const scoreArtist = document.getElementById('scoreArtist');
  const scoreContent = document.getElementById('scoreContent');

  // ---- Helpers ----

  /** Builds the filesystem path to a LilyPond .ly file. */
  function getLyPath(artistSlug, pieceSlug) {
    return `musics/${artistSlug}/${pieceSlug}.ly`;
  }

  /** Converts a string to a URL-safe slug. */
  function slugify(str) {
    return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  // ---- Hash routing ----

  /** Parses the URL hash into a route object {view, artistSlug, pieceSlug}. */
  function parseHash() {
    const hash = window.location.hash.replace(/^#/, '');
    const parts = hash.split('/').filter(Boolean);
    if (parts.length === 0) return { view: 'artists', artistSlug: null, pieceSlug: null };
    if (parts.length === 1) return { view: 'pieces', artistSlug: parts[0], pieceSlug: null };
    return { view: 'score', artistSlug: parts[0], pieceSlug: parts[1] };
  }

  /** Updates the URL hash to navigate to a specific view. */
  function navigate(view, artistSlug, pieceSlug) {
    if (!artistSlug) {
      window.location.hash = '';
    } else if (!pieceSlug) {
      window.location.hash = `#/${artistSlug}`;
    } else {
      window.location.hash = `#/${artistSlug}/${pieceSlug}`;
    }
  }

  // ---- WebSocket RPC ----

  /** Sends LilyPond source to the Hacklily WebSocket renderer.
   *  Returns a promise resolving to {files: string[], logs: string}.
   */
  function renderLy(src) {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(HACKLILY_URL);
      const id = 'rpc_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);

      ws.onopen = () => {
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

      ws.onmessage = (evt) => {
        try {
          const data = JSON.parse(evt.data);
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

      ws.onerror = () => reject(new Error('WebSocket connection failed'));
      ws.onclose = (evt) => {
        if (evt.code !== 1000 && evt.code !== 1005) {
          reject(new Error(`WebSocket closed unexpectedly (code ${evt.code})`));
        }
      };

      // Safety timeout
      setTimeout(() => {
        ws.close();
        reject(new Error('Render timed out'));
      }, 25000);
    });
  }

  // ---- Rendering ----

  /** Renders the artist list in the sidebar. */
  function renderSidebarArtists() {
    sidebarTitle.textContent = 'Artists';
    backBtn.classList.add('hidden');
    sidebarList.innerHTML = '';

    state.artists.forEach(artist => {
      const item = document.createElement('button');
      const classes = ['flex', 'items-center', 'gap-3', 'px-5', 'py-3', 'cursor-pointer', 'w-full', 'text-left', 'text-sm', 'hover:bg-gray-800'];
      if (state.currentArtistSlug === artist.slug) classes.push('bg-gray-800');
      item.className = classes.join(' ');
      item.innerHTML = `
        <div class="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white text-lg shrink-0">${escapeHtml(artist.name.charAt(0).toUpperCase())}</div>
        <div class="overflow-hidden">
          <div class="font-medium truncate">${escapeHtml(artist.name)}</div>
          <div class="text-xs text-gray-400 truncate">${artist.pieces.length} piece${artist.pieces.length !== 1 ? 's' : ''}</div>
        </div>
      `;
      item.addEventListener('click', () => navigate('pieces', artist.slug, null));
      sidebarList.appendChild(item);
    });
  }

  /** Renders the piece list for a given artist in the sidebar. */
  function renderSidebarPieces(artistSlug) {
    const artist = state.artists.find(a => a.slug === artistSlug);
    if (!artist) { renderSidebarArtists(); return; }

    sidebarTitle.textContent = artist.name;
    backBtn.classList.remove('hidden');
    sidebarList.innerHTML = '';

    artist.pieces.forEach(piece => {
      const item = document.createElement('button');
      const classes = ['flex', 'items-center', 'gap-3', 'px-5', 'py-3', 'cursor-pointer', 'w-full', 'text-left', 'text-sm', 'hover:bg-gray-800'];
      if (state.currentPieceSlug === piece.slug) classes.push('bg-gray-800');
      item.className = classes.join(' ');
      item.innerHTML = `
        <div class="w-10 h-10 rounded bg-gray-700 flex items-center justify-center text-gray-400 text-xs shrink-0">&#9835;</div>
        <div class="overflow-hidden">
          <div class="font-medium truncate">${escapeHtml(piece.title)}</div>
          <div class="text-xs text-gray-400 truncate">${escapeHtml(artist.name)}</div>
        </div>
      `;
      item.addEventListener('click', () => navigate('score', artist.slug, piece.slug));
      sidebarList.appendChild(item);
    });
  }

  /** Shows the welcome screen and hides the score viewer. */
  function renderWelcome() {
    welcome.classList.remove('hidden');
    scoreView.classList.add('hidden');
    scoreContent.innerHTML = '';
  }

  /** Fetches a .ly file, renders it via Hacklily, and displays the SVG score. */
  async function renderScore(artistSlug, pieceSlug) {
    const artist = state.artists.find(a => a.slug === artistSlug);
    const piece = artist ? artist.pieces.find(p => p.slug === pieceSlug) : null;
    if (!artist || !piece) { renderWelcome(); return; }

    welcome.classList.add('hidden');
    scoreView.classList.remove('hidden');
    scoreTitle.textContent = piece.title;
    scoreArtist.textContent = artist.name;
    scoreContent.innerHTML = '<div class="text-center py-16 text-gray-400"><div class="w-9 h-9 border-4 border-gray-600 border-t-green-500 rounded-full animate-spin mx-auto mb-4"></div>Compiling score...</div>';

    try {
      // Fetch .ly file
      const lyPath = getLyPath(artistSlug, pieceSlug);
      const lyResp = await fetch(lyPath);
      if (!lyResp.ok) throw new Error(`Failed to fetch .ly file (${lyResp.status})`);
      const lySrc = await lyResp.text();

      scoreContent.innerHTML = '<div class="text-center py-16 text-gray-400"><div class="w-9 h-9 border-4 border-gray-600 border-t-green-500 rounded-full animate-spin mx-auto mb-4"></div>Rendering via Hacklily...</div>';

      const result = await renderLy(lySrc);

      // Build HTML for SVGs
      let html = '';
      if (result.files && result.files.length > 0) {
        html = '<div class="bg-white rounded-lg p-4 overflow-x-auto">';
        result.files.forEach((svg) => {
          html += svg;
        });
        html += '</div>';
      } else {
        html = '<div class="text-center py-10 text-red-400">No SVG files returned.</div>';
      }

      // Add logs if present
      if (result.logs) {
        html += `<div class="bg-gray-900 border border-gray-700 rounded-md p-3 mt-3 font-mono text-xs text-gray-400 whitespace-pre-wrap overflow-y-auto max-h-36">${escapeHtml(result.logs)}</div>`;
      }

      scoreContent.innerHTML = html;
    } catch (err) {
      scoreContent.innerHTML = `<div class="text-center py-10 text-red-400">${escapeHtml(err.message)}</div>`;
    }
  }

  /** HTML-escapes a string. */
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ---- Router ----

  /** Reads the current URL hash and renders the appropriate view. */
  function handleRoute() {
    const route = parseHash();
    state.currentArtistSlug = route.artistSlug;
    state.currentPieceSlug = route.pieceSlug;

    if (route.view === 'artists') {
      renderSidebarArtists();
      renderWelcome();
    } else if (route.view === 'pieces') {
      renderSidebarPieces(route.artistSlug);
      renderWelcome();
    } else if (route.view === 'score') {
      renderSidebarPieces(route.artistSlug);
      renderScore(route.artistSlug, route.pieceSlug);
    }
  }

  // ---- Back button ----
  backBtn.addEventListener('click', () => {
    const route = parseHash();
    if (route.pieceSlug) {
      navigate('pieces', route.artistSlug, null);
    } else if (route.artistSlug) {
      navigate('artists', null, null);
    }
  });

  // ---- Init ----

  /** Fetches artists data, sets up hash listener, and renders initial view. */
  async function init() {
    try {
      const resp = await fetch('data/artists.json');
      state.artists = await resp.json();

      // Fill in slugs from names if missing
      state.artists.forEach(artist => {
        if (!artist.slug) artist.slug = slugify(artist.name);
        artist.pieces.forEach(piece => {
          if (!piece.slug) piece.slug = slugify(piece.title);
        });
      });

      window.addEventListener('hashchange', handleRoute);
      handleRoute();
    } catch (err) {
      sidebarList.innerHTML = `<div class="px-5 py-3 text-red-400 text-sm">Failed to load artists: ${escapeHtml(err.message)}</div>`;
    }
  }

  init();
})();
