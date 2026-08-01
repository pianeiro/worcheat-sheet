import { errorMessage } from './presentation/formatting.js';
import { createCatalogRepository } from './infrastructure/catalog-repository.js';
import { createLySourceRepository } from './infrastructure/ly-source-repository.js';
import { createHacklilyGateway } from './infrastructure/hacklily-gateway.js';
import { loadCatalog } from './application/load-catalog.js';
import { createRouteController } from './presentation/route-controller.js';

async function init() {
  try {
    var shellResp = await fetch('js/presentation/shell.html');
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

    var collection = await loadCatalog(createCatalogRepository());
    var scoreDeps = {
      lySourceRepository: createLySourceRepository(),
      scoreRenderer: createHacklilyGateway(),
    };

    history.scrollRestoration = 'manual';
    var routeController = createRouteController(collection, scoreDeps);
    window.addEventListener('hashchange', routeController.handleRoute);
    routeController.handleRoute();
  } catch (err) {
    var mainContent = document.getElementById('main-content');
    mainContent.innerHTML = errorMessage('Failed to load artists: ' + err.message);
  }
}

init();
