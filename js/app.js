import { errorMessage } from './presentation/formatting.js';
import { JsonCatalogRepository } from './infrastructure/catalog-repository.js';
import { FileLySourceRepository } from './infrastructure/ly-source-repository.js';
import { HacklilyScoreRenderer } from './infrastructure/hacklily-gateway.js';
import { CachingScoreRenderer } from './infrastructure/caching-score-renderer.js';
import { CatalogRepository } from './application/ports/catalog-repository.js';
import { LySourceRepository } from './application/ports/ly-source-repository.js';
import { ScoreRenderer } from './application/ports/score-renderer.js';
import { LoadCatalog } from './application/load-catalog.js';
import { ViewArtist } from './application/view-artist.js';
import { ViewPiece } from './application/view-piece.js';
import { RenderScore } from './application/render-score.js';
import { RouteController } from './presentation/route-controller.js';

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

    var catalogRepository = new JsonCatalogRepository();
    var lySourceRepository = new FileLySourceRepository();
    var scoreRenderer = new CachingScoreRenderer(new HacklilyScoreRenderer());
    if (!(catalogRepository instanceof CatalogRepository)) {
      throw new TypeError('catalogRepository is not a CatalogRepository');
    }
    if (!(lySourceRepository instanceof LySourceRepository)) {
      throw new TypeError('lySourceRepository is not a LySourceRepository');
    }
    if (!(scoreRenderer instanceof ScoreRenderer)) {
      throw new TypeError('scoreRenderer is not a ScoreRenderer');
    }

    var loadCatalog = new LoadCatalog({ catalogRepository: catalogRepository });
    var viewArtist = new ViewArtist();
    var viewPiece = new ViewPiece();
    var renderScore = new RenderScore({
      lySourceRepository: lySourceRepository,
      scoreRenderer: scoreRenderer,
    });

    var collection = await loadCatalog.execute();

    history.scrollRestoration = 'manual';
    var routeController = new RouteController({
      collection: collection,
      viewArtist: viewArtist,
      viewPiece: viewPiece,
      renderScore: renderScore,
      mainContent: document.getElementById('main-content'),
    });
    window.addEventListener('hashchange', routeController.handleRoute.bind(routeController));
    routeController.handleRoute();
  } catch (err) {
    var mainContent = document.getElementById('main-content');
    mainContent.innerHTML = errorMessage('Failed to load artists: ' + err.message);
  }
}

init();
