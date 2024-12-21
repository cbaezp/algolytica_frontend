import { LOAD_USER_SETTINGS } from "../actions/types";

const INITIAL_STATE = {
  userSettings: {},
};

const userSettingsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_USER_SETTINGS:
      return action.payload;

    default:
      return state;
  }
};

export default userSettingsReducer;
