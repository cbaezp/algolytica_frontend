import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  RESET_REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  REFRESH_SUCCESS,
  REFRESH_FAIL,
  SET_AUTH_LOADING,
  REMOVE_AUTH_LOADING,
  GITHUB_AUTH_FAIL,
  GITHUB_AUTH_SUCCESS,
  GOOGLE_AUTH_SUCCESS,
  GOOGLE_AUTH_FAIL
} from "./types";
import Cookie from "js-cookie";
import Router from "next/router";
import useUserSettings from "../hooks/useUserSettings";
import axios from 'axios';

export const load_user = () => async (dispatch) => {
  try {
    const res = await fetch("/api/account/user", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    const data = await res.json();
    if (res.status === 200) {
      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: data,
      });

      window.localStorage.setItem("clientId", JSON.stringify(data.user.id));
    } else {
      dispatch({
        type: LOAD_USER_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: LOAD_USER_FAIL,
    });
  }
};

export const check_auth_status = () => async (dispatch) => {
  try {
    const res = await fetch("/api/account/verify", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    if (res.status === 200) {
      dispatch({
        type: AUTHENTICATED_SUCCESS,
      });
      Cookie.set("isAuthenticated", "true");
      dispatch(load_user());
    } else {
      dispatch({
        type: AUTHENTICATED_FAIL,
      });
      Cookie.set("isAuthenticated", "false");
    }
  } catch (err) {
    dispatch({
      type: AUTHENTICATED_FAIL,
    });
    Cookie.set("isAuthenticated", "false");
  }
};

export const request_refresh = () => async (dispatch) => {
  try {
    const res = await fetch("/api/account/refresh", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (res.status === 200) {
      dispatch({
        type: REFRESH_SUCCESS,
      });
      dispatch(check_auth_status());
    } else {
      dispatch({
        type: REFRESH_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: REFRESH_FAIL,
    });
  }
};

export const register =
  (username, email, password, password_confirm) => async (dispatch) => {
    const body = JSON.stringify({
      username,
      email,
      password,
      password_confirm,
    });

    dispatch({
      type: SET_AUTH_LOADING,
    });

    try {
      const res = await fetch("/api/account/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: body,
      });

      const data = await res.json();

      if (res.status === 201) {
        dispatch({
          type: REGISTER_SUCCESS,
        });
      } else {
        dispatch({
          type: REGISTER_FAIL,
          payload: data,
        });
      }
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
      });
    }

    dispatch({
      type: REMOVE_AUTH_LOADING,
    });
  };

export const reset_register_success = () => (dispatch) => {
  dispatch({
    type: RESET_REGISTER_SUCCESS,
  });
};

export const login = (username, password) => async (dispatch) => {
  const body = JSON.stringify({
    username,
    password,
  });

  dispatch({
    type: SET_AUTH_LOADING,
  });

  try {
    const res = await fetch("/api/account/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    });

    if (res.status === 200) {
      dispatch({
        type: LOGIN_SUCCESS,
      });
      dispatch(load_user());
      Cookie.set("isAuthenticated", "true");
      Router.push("/dashboard");
    }
    if (res.status === 401) {
      dispatch({
        type: LOGIN_FAIL,
      });
      Cookie.set("isAuthenticated", "unauthorized");
    } else {
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }

  dispatch({
    type: REMOVE_AUTH_LOADING,
  });
};

export const logout = () => async (dispatch) => {
  try {
    const res = await fetch("/api/account/logout", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    });

    if (res.status === 200) {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
      Cookie.set("isAuthenticated", "false");
    } else {
      dispatch({
        type: LOGOUT_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: LOGOUT_FAIL,
    });
  }
};




export const githubAuth = (code) => async (dispatch) => {

  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/dj-rest-auth/github/`, { code });
    const { access, refresh, user } = res.data;

    // Store tokens in cookies
    Cookie.set("access", access);
    Cookie.set("refresh", refresh || "");
    Cookie.set("user", JSON.stringify(user));
    Cookie.set("isAuthenticated", "true");

    // Dispatch GITHUB_AUTH_SUCCESS
    dispatch({
      type: GITHUB_AUTH_SUCCESS,
      payload: res.data,
    });

    // Update isAuthenticated in Redux
    dispatch({
      type: LOGIN_SUCCESS, // Use the same action as a regular login
    });


  } catch (err) {

    dispatch({
      type: GITHUB_AUTH_FAIL,
      payload: err.response?.data || { error: err.message },
    });

    // Update isAuthenticated cookie
    Cookie.set("isAuthenticated", "false");
  }
};


// Google Auth

export const googleAuth = (code) => async (dispatch) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/dj-rest-auth/google/`, { code });
    const { access, refresh, user } = res.data;

    // Store tokens in cookies
    Cookie.set('access', access);
    Cookie.set('refresh', refresh || '');
    Cookie.set('user', JSON.stringify(user));
    Cookie.set('isAuthenticated', 'true');

    dispatch({
      type: GOOGLE_AUTH_SUCCESS,
      payload: res.data,
    });



    dispatch({
      type: LOGIN_SUCCESS, // Update Redux isAuthenticated state
    });

  } catch (err) {
    dispatch({
      type: GOOGLE_AUTH_FAIL,
      payload: err.response?.data || { error: err.message },
    });
    Cookie.set('isAuthenticated', 'false');
  }
};



