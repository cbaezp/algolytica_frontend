import {
  LOAD_USER_SETTINGS 
} from "../actions/types";

const userSettingsAction = (data) => {
  return {
    type: LOAD_USER_SETTINGS,
    payload: data,
  };
};

export default userSettingsAction;
