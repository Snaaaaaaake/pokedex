export default function getPokemonIdFromUrl(url) {
  return /\/([0-9]*)\/$/.exec(url)[1];
}
