import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  RESET_REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  SET_AUTH_LOADING,
  REMOVE_AUTH_LOADING,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  REFRESH_SUCCESS,
  REFRESH_FAIL,
  GITHUB_AUTH_FAIL,
  GITHUB_AUTH_SUCCESS,
  GOOGLE_AUTH_SUCCESS,
  GOOGLE_AUTH_FAIL
} from "../actions/types";


const initialState = {
  user: {},
  isAuthenticated: false,
  loading: false,
  register_success: false,
  reister_error: null,
  githubAuthSuccess: false,
  githubAuthFail: false,
  githubAuthError: null,
  googleAuthSuccess: false,
  googleAuthFail: false,
  googleAuthError: null,
};


const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      return { ...state, register_success: true };
    case REGISTER_FAIL:
      return { ...state, register_error: payload };
    case RESET_REGISTER_SUCCESS:
      return { ...state, register_success: false };
    case LOGIN_SUCCESS:
      return { ...state, isAuthenticated: true };
    case LOGIN_FAIL:
      return { ...state, isAuthenticated: false };
    case LOGOUT_SUCCESS:
      return { ...state, isAuthenticated: false, user: {} };
    case LOGOUT_FAIL:
      return { ...state };
    case LOAD_USER_SUCCESS:
      return { ...state, user: payload.user };
    case LOAD_USER_FAIL:
      return { ...state, user: null };
    case GITHUB_AUTH_SUCCESS:
      return { ...state, isAuthenticated: true, githubAuthSuccess: true, githubAuthFail: false, githubAuthError: null, };
    case GITHUB_AUTH_FAIL:
      return { ...state, isAuthenticated: false, githubAuthSuccess: false, githubAuthFail: true, githubAuthError: payload, };
    case GOOGLE_AUTH_SUCCESS:
      return { ...state, isAuthenticated: true, googleAuthSuccess: true, googleAuthFail: false, googleAuthError: null, };
    case GOOGLE_AUTH_FAIL:
      return { ...state, isAuthenticated: false, googleAuthSuccess: false, googleAuthFail: true, googleAuthError: payload, };
    case AUTHENTICATED_SUCCESS:
      return { ...state, isAuthenticated: true };
    case AUTHENTICATED_FAIL:
      return { ...state, isAuthenticated: false, user: null };
    case REFRESH_SUCCESS:
      return { ...state };
    case REFRESH_FAIL:
      return { ...state, isAuthenticated: false, user: null };
    case SET_AUTH_LOADING:
      return { ...state, loading: true };
    case REMOVE_AUTH_LOADING:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default authReducer;
