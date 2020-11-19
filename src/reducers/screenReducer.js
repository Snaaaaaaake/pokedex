import { screensInitialState as initialState } from "../store/initialStates";

const screenReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_SCREEN":
      return {
        ...state,
        page: action.payload.PAGE,
        title: action.payload.TITLE,
        params: action.payload.PARAMS || null,
        history: action.payload.HISTORY,
      };
    case "CHANGE_WIDTH":
      return {
        ...state,
        width: action.payload,
      };
    default:
      return state;
  }
};

export default screenReducer;
