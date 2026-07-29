export function escapeHtml(str) {
  var div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

export function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function getLyPath(artistSlug, pieceSlug) {
  return 'musics/' + artistSlug + '/' + pieceSlug + '.ly';
}

export function getYoutubeChannelAvatarUrl(channelUrl) {
  if (!channelUrl) return null;
  var m = channelUrl.match(/(?:youtube\.com|youtu\.be)\/(?:channel\/)?([\w@-]+)/);
  return m ? 'https://unavatar.io/youtube/' + m[1] : null;
}

export function getYoutubeThumbnailUrl(youtubeUrl) {
  if (!youtubeUrl) return null;
  var match = youtubeUrl.match(/(?:youtu\.be\/|v=)([a-zA-Z0-9_-]{11})/);
  return match ? 'https://img.youtube.com/vi/' + match[1] + '/maxresdefault.jpg' : null;
}
