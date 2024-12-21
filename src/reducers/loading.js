import {
  SET_LOADING_BOOKIES,
  REMOVE_LOADING_BOOKIES,
  SET_LOADING_SPORTS,
  REMOVE_LOADING_SPORTS,
} from "../actions/types";

const initialState = {
  loadingBookies: false,
  loadingSports: false,
};

const loadingReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_LOADING_BOOKIES:
      return { ...state, loadingBookies: true };
    case REMOVE_LOADING_BOOKIES:
      return { ...state, loadingBookies: false };
    case SET_LOADING_SPORTS:
      return { ...state, loadingSports: true };
    case REMOVE_LOADING_SPORTS:
      return { ...state, loadingSports: false };
    default:
      return state;
  }
};

export default loadingReducer;
