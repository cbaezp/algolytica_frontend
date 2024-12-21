import {
  SET_LOADING_BOOKIES,
  REMOVE_LOADING_BOOKIES,
  SET_LOADING_SPORTS,
  REMOVE_LOADING_SPORTS,
} from "../actions/types";

export const loadingBookies = () => async (dispatch) => {
  dispatch({
    type: SET_LOADING_BOOKIES,
  });
};

export const removeLoadingBookies = () => async (dispatch) => {
  dispatch({
    type: REMOVE_LOADING_BOOKIES,
  });
};

export const loadingSports = () => async (dispatch) => {
  dispatch({
    type: SET_LOADING_SPORTS,
  });
};

export const removeLoadingSports = () => async (dispatch) => {
  dispatch({
    type: REMOVE_LOADING_SPORTS,
  });
};
