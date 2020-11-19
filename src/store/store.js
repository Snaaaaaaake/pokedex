import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import screenReducer from "../reducers/screenReducer";
import singlePokemonReducer from "../reducers/singlePokemonReducer";
import pokemonListReducer from "../reducers/pokemonListReducer";

const rootReducer = combineReducers({
  screenState: screenReducer,
  singlePokemonState: singlePokemonReducer,
  pokemonListState: pokemonListReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
