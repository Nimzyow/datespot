import * as Types from "./types";
import axios from "axios";
import setAuthToken from "../Utils/SetAuthToken";

// Load User
export const loadUser = () => async (dispatch) => {
  console.log("helo im in loadUSer?");

  return async (dispatch) => {
    setAuthToken(localStorage.token);
    try {
      const res = await axios.get("/api/auth");

      dispatch({
        type: Types.USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      console.error(err);
      dispatch({ type: Types.AUTH_ERROR });
    }
  };
};

// Register User
export const register = (formData) => async (dispatch) => {
  dispatch({ type: Types.SPINNER_SHOW });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post("/api/users", formData, config);

    dispatch({ type: Types.SPINNER_NOSHOW });

    dispatch({
      type: Types.REGISTER_SUCCESS,
      payload: res.data,
    });

    loadUser();
  } catch (err) {
    dispatch({
      type: Types.REGISTER_FAIL,
      payload: err.response.data.msg,
    });
  }
};

// Login User
export const login = (formData) => async (dispatch) => {
  showSpinner();
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  dispatch({ type: Types.SPINNER_SHOW });

  try {
    const res = await axios.post("/api/auth", formData, config);

    dispatch({
      type: Types.LOGIN_SUCCESS,
      payload: res.data,
    });
    //noShowSpinner();

    dispatch({ type: Types.SPINNER_NOSHOW });

    //loadUser();
    setAuthToken(localStorage.token);

    const resLoad = await axios.get("/api/auth");

    dispatch({
      type: Types.USER_LOADED,
      payload: resLoad.data,
    });
  } catch (err) {
    dispatch({
      type: Types.LOGIN_FAIL,
      payload: "Invalid Credentials",
    });
    dispatch({ type: Types.SPINNER_NOSHOW });
    //noShowSpinner();
  }
};

// Logout
export const logOut = () => (dispatch) => {
  dispatch({ type: Types.LOGOUT });
};

//show spinner
export const showSpinner = () => (dispatch) => {
  dispatch({ type: Types.SPINNER_SHOW });
};

//dont show spinner
export const noShowSpinner = () => (dispatch) => {
  dispatch({ type: Types.SPINNER_NOSHOW });
};

// Clear Errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type: Types.CLEAR_ERRORS });
};
