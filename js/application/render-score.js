export function renderScore(deps, artistSlug, pieceSlug) {
  return deps.lySourceRepository.fetchLy(artistSlug, pieceSlug).then(function (lySource) {
    return deps.scoreRenderer.render(lySource);
  });
}
