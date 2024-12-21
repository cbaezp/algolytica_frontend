import { combineReducers } from "redux";
import authReducer from "./auth";
import betReducer from "./betData";
import loadingReducer from "./loading";
import userSettingsReducer from "./userSettings";

export default combineReducers({
  auth: authReducer,
  bet: betReducer,
  loading: loadingReducer,
  userSettings: userSettingsReducer,
});
