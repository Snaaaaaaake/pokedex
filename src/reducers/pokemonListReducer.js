import { pokemonListInitialState as initialState } from "../store/initialStates";

const pokemonListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_POKEMON_LIST_REQUEST":
      return {
        list: null,
        isLoading: true,
        error: null,
      };
    case "FETCH_POKEMON_LIST_SUCCESS":
      return {
        list: action.payload,
        isLoading: false,
        error: null,
      };
    case "FETCH_POKEMON_LIST_FAILURE":
      return {
        list: null,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default pokemonListReducer;
