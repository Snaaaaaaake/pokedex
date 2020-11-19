import SCREENS from "../constatnts/screens";

const screensInitialState = {
  page: SCREENS.MAIN.PAGE,
  title: SCREENS.MAIN.TITLE,
  params: null,
  width: 0,
  history: [SCREENS.MAIN],
};

const singlePokemonInitialState = {
  pokemon: null,
  chain: null,
  isPokemonLoading: true,
  isChainLoading: true,
  error: null,
};

const pokemonListInitialState = {
  list: null,
  isLoading: true,
  error: null,
};

export { screensInitialState, singlePokemonInitialState, pokemonListInitialState };
