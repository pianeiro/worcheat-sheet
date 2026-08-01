import { escapeHtml } from '../formatting.js';

function spinnerHtml(text) {
  return [
    '<div class="w-9 h-9 border-4 border-outline-variant border-t-primary rounded-full animate-spin mx-auto mb-4"></div>',
    '<p class="text-on-surface-variant text-body-md">' + text + '</p>',
  ].join('\n');
}

function buildScoreHtml(result) {
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
  return html;
}

function wirePagination(contentEl, svgPages) {
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

export function createScorePresenter(statusEl, contentEl) {
  return {
    renderWith: function (promise) {
      statusEl.innerHTML = spinnerHtml('Compiling score...');
      contentEl.classList.add('hidden');

      promise.then(function (result) {
        statusEl.classList.add('hidden');
        contentEl.innerHTML = buildScoreHtml(result);
        contentEl.classList.remove('hidden');
        var svgPages = result.files;
        if (svgPages && svgPages.length > 1) wirePagination(contentEl, svgPages);
      }).catch(function (err) {
        statusEl.innerHTML = '<div class="text-center py-10 text-red-400">' + escapeHtml(err.message) + '</div>';
      });
    },
  };
}
