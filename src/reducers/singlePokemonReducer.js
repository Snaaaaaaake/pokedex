import { singlePokemonInitialState as initialState } from "../store/initialStates";

const singlePokemonReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_POKEMON_REQUEST":
      return {
        pokemon: null,
        chain: null,
        isPokemonLoading: true,
        isChainLoading: true,
        error: null,
      };
    case "FETCH_POKEMON_SUCCESS":
      return {
        pokemon: action.payload,
        chain: null,
        isPokemonLoading: false,
        isChainLoading: true,
        error: null,
      };
    case "FETCH_POKEMON_FAILURE":
      return {
        pokemon: null,
        chain: null,
        isPokemonLoading: false,
        isChainLoading: false,
        error: action.payload,
      };
    case "FETCH_CHAIN_REQUEST":
      return {
        ...state,
        chain: null,
        isChainLoading: true,
        error: null,
      };
    case "FETCH_CHAIN_SUCCESS":
      return {
        ...state,
        chain: action.payload,
        isChainLoading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default singlePokemonReducer;
