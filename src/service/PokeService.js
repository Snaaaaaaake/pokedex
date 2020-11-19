import getPokemonIdFromUrl from "../utils/getPokemonIdFromUrl";
import pokemonStatsTranslate from "../utils/pokemonStatsTranslate";

function resCheck(res) {
  if (!res.ok) {
    throw new Error(res.status);
  }
  return res.json();
}

function editFetchedPokemon(rawPokemon) {
  const pokemon = {};
  pokemon.id = rawPokemon.id;
  pokemon.name = rawPokemon.name;
  pokemon.speciesUrl = rawPokemon.species.url;
  pokemon.types = rawPokemon.types.map((item) => item.type.name);
  pokemon.stats = pokemonStatsTranslate(rawPokemon.stats);
  return pokemon;
}

export default class PokeService {
  constructor(apiUrl) {
    this.url = apiUrl || "https://pokeapi.co";
    this.pokemonAmount = 893;
    this.limitItemsPerPage = 10;
    this.limitConcatPages = 5;
  }

  _countPages = (listLength) => Math.floor(listLength / this.limitItemsPerPage);
  getPokemonImageUrl = (id) => `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;

  getInitialPokemonAmount = async () => {
    try {
      const data = await fetch(`${this.url}/api/v2/pokemon-species`).then(resCheck);
      this.pokemonAmount = +data.count;
      return this.pokemonAmount;
    } catch (err) {
      console.log(err.message);
    }
  };

  getRandomPokemon = () => {
    const random = Math.ceil(Math.random() * (this.pokemonAmount - 1));
    return this.getPokemon(random);
  };

  getPokemon = (id) => {
    if (id > this.pokemonAmount) {
      return null;
    }
    return fetch(`${this.url}/api/v2/pokemon/${id}`)
      .then(resCheck)
      .then((data) => editFetchedPokemon(data));
  };

  getList = async (page = 0) => {
    try {
      const offset = page * this.limitItemsPerPage;
      // В апи после списка покемонов идут непонятные данные, к ним доступ надо ограничить вручную
      const limit =
        offset + this.limitItemsPerPage > this.pokemonAmount
          ? this.pokemonAmount - offset
          : this.limitItemsPerPage;

      const listData = await fetch(`${this.url}/api/v2/pokemon/?offset=${offset}&limit=${limit}`).then(
        resCheck
      );
      const promiseArray = listData.results.map((item) => this.getPokemon(getPokemonIdFromUrl(item.url)));
      listData.results = await Promise.all(promiseArray);
      listData.page = +page;
      listData.pages = this._countPages(this.pokemonAmount);
      return listData;
    } catch (err) {
      throw err;
    }
  };

  getChain = async (speciesUrl) => {
    try {
      const species = await fetch(speciesUrl).then(resCheck);
      if (!species.evolution_chain) {
        return null;
      } else {
        const chainContainer = await fetch(species.evolution_chain.url).then(resCheck);
        return chainContainer.chain;
      }
    } catch (err) {
      throw err;
    }
  };
}
