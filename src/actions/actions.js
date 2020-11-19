function thunkActionCreator(requestAction, successAction, failureAction) {
  return (service, fetchCondition, ...rest) => (dispatch) => {
    dispatch(requestAction());
    service(...rest)
      .then((data) => {
        if (!fetchCondition.canceled) {
          dispatch(successAction(data));
        }
      })
      .catch((error) => dispatch(failureAction(error)));
  };
}

const changeScreenAction = (data) => ({
  type: "CHANGE_SCREEN",
  payload: data,
});
const changeWidthAction = (data) => ({
  type: "CHANGE_WIDTH",
  payload: data,
});
const changeScreenThunkAction = (payload) => (dispatch, getState) => {
  const { screenState } = getState();
  const screen = {
    ...payload,
    HISTORY:
      screenState.history.length > 5
        ? [screenState.history[0], ...screenState.history.slice(2), payload]
        : [...screenState.history, payload],
  };
  dispatch(changeScreenAction(screen));
};
const changeScreenBackThunkAction = () => (dispatch, getState) => {
  const { screenState } = getState();
  const lastIndex = screenState.history.length - 1;
  const backIndex = screenState.history.length - 2;
  const screen = {
    PAGE: screenState.history[backIndex].PAGE,
    TITLE: screenState.history[backIndex].TITLE,
    PARAMS: screenState.history[backIndex].PARAMS || null,
    HISTORY: screenState.history.slice(0, lastIndex),
  };
  dispatch(changeScreenAction(screen));
};

const fetchPokemonRequestAction = () => ({
  type: "FETCH_POKEMON_REQUEST",
});
const fetchPokemonSuccessAction = (data) => ({
  type: "FETCH_POKEMON_SUCCESS",
  payload: data,
});
const fetchPokemonFailureAction = (data) => ({
  type: "FETCH_POKEMON_FAILURE",
  payload: data,
});
const fetchChainRequestAction = () => ({
  type: "FETCH_CHAIN_REQUEST",
});
const fetchChainSuccessAction = (data) => ({
  type: "FETCH_CHAIN_SUCCESS",
  payload: data,
});
const fetchPokemonThunkAction = thunkActionCreator(
  fetchPokemonRequestAction,
  fetchPokemonSuccessAction,
  fetchPokemonFailureAction
);
const fetchChainThunkAction = thunkActionCreator(
  fetchChainRequestAction,
  fetchChainSuccessAction,
  fetchPokemonFailureAction
);

const fetchPokemonListRequestAction = () => ({
  type: "FETCH_POKEMON_LIST_REQUEST",
});
const fetchPokemonListSuccessAction = (data) => ({
  type: "FETCH_POKEMON_LIST_SUCCESS",
  payload: data,
});
const fetchPokemonListFailureAction = (data) => ({
  type: "FETCH_POKEMON_LIST_FAILURE",
  payload: data,
});
const fetchPokemonListThunkAction = thunkActionCreator(
  fetchPokemonListRequestAction,
  fetchPokemonListSuccessAction,
  fetchPokemonListFailureAction
);
const fetchConcatPokemonListThunkAction = (service, oldList) => (dispatch) => {
  if (
    oldList.results.length < service.limitConcatPages * service.limitItemsPerPage &&
    oldList.page < oldList.pages
  ) {
    service
      .getList(oldList.page + 1)
      .then((newList) => {
        newList.results = [...oldList.results, ...newList.results];
        dispatch(fetchPokemonListSuccessAction(newList));
      })
      .catch((error) => dispatch(fetchPokemonListFailureAction(error)));
  }
};

export {
  changeScreenThunkAction,
  changeScreenBackThunkAction,
  changeWidthAction,
  fetchPokemonRequestAction,
  fetchPokemonSuccessAction,
  fetchPokemonThunkAction,
  fetchChainThunkAction,
  fetchPokemonListThunkAction,
  fetchConcatPokemonListThunkAction,
};
