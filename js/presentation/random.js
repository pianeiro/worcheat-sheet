export function sampleIndexes(count, total) {
  var indexes = [];
  for (var i = 0; i < total; i++) indexes.push(i);
  var take = Math.min(count, total);
  for (var i = 0; i < take; i++) {
    var j = i + Math.floor(Math.random() * (total - i));
    var tmp = indexes[i];
    indexes[i] = indexes[j];
    indexes[j] = tmp;
  }
  return indexes.slice(0, take);
}
