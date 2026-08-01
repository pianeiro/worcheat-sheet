import { state, mainContent } from './state.js';
import { escapeHtml } from './helpers.js';
import { createCatalogRepository } from './infrastructure/catalog-repository.js';
import { handleRoute } from './router.js';

async function init() {
  try {
    var shellResp = await fetch('partials/shell.html');
    var shellHtml = await shellResp.text();
    var tmp = document.createElement('div');
    tmp.innerHTML = shellHtml;

    var shellOutside = document.getElementById('shell-outside');
    var sidebar = tmp.querySelector('aside');
    if (shellOutside && sidebar) shellOutside.replaceWith(sidebar);

    var mainEl = document.querySelector('main');
    var bottomNav = tmp.querySelector('nav.bg-surface-glass');
    if (mainEl && bottomNav) mainEl.insertAdjacentElement('afterend', bottomNav);

    var shellInsideTop = document.getElementById('shell-inside-top');
    var header = tmp.querySelector('header');
    if (shellInsideTop && header) shellInsideTop.replaceWith(header);

    var shellInsideBottom = document.getElementById('shell-inside-bottom');
    var footer = tmp.querySelector('footer');
    if (shellInsideBottom && footer) shellInsideBottom.replaceWith(footer);

    var catalogRepository = createCatalogRepository();
    state.artists = await catalogRepository.load();

    history.scrollRestoration = 'manual';
    window.addEventListener('hashchange', handleRoute);
    handleRoute();
  } catch (err) {
    mainContent.innerHTML = '<div class="text-center py-16 text-red-400 text-body-md">Failed to load artists: ' + escapeHtml(err.message) + '</div>';
  }
}

init();
