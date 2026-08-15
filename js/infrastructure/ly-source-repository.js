export class FileLySourceRepository {
  fetchLy(artistSlug, pieceSlug) {
    var path = 'data/musics/' + artistSlug + '/' + pieceSlug + '.ly';
    return fetch(path).then(function (resp) {
      if (!resp.ok) throw new Error('Failed to fetch .ly file (' + resp.status + ')');
      return resp.text();
    });
  }
}
