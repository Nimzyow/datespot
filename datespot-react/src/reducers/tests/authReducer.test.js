import authReducer from "../authReducer";
import * as types from "../../actions/types";

describe("authReducer", () => {
  test("should return default state if unrelated action is passed in", () => {
    const fakeState = {
      random: "randomState",
    };
    const unrelatedAction = {
      type: "UNRELATED_ACTION",
    };

    expect(authReducer(fakeState, unrelatedAction)).toEqual(fakeState);
  });
  test("update state when user has successfully loaded", () => {
    const action = {
      type: types.USER_LOADED,
      payload: "user information",
    };

    const expectedState = {
      token: localStorage.getItem("token"),
      isAuthenticated: true,
      loading: false,
      user: action.payload,
      error: null,
      spinner: false,
      spinnerComment: "",
    };

    expect(authReducer(undefined, action)).toEqual(expectedState);
  });
  test("update state on authentication error", () => {
    const action = {
      type: types.AUTH_ERROR,
      payload: "some error",
    };
    const expectedState = {
      token: null,
      isAuthenticated: false,
      loading: false,
      user: null,
      error: action.payload,
      spinner: false,
      spinnerComment: "",
    };

    expect(authReducer(undefined, action)).toEqual(expectedState);
  });
  test("update state when user on successful registration", () => {
    const action = {
      type: types.REGISTER_SUCCESS,
      payload: { token: "token" },
    };
    const expectedState = {
      token: action.payload.token,
      isAuthenticated: true,
      loading: false,
      user: null,
      error: null,
      spinner: false,
      spinnerComment: "",
    };

    expect(authReducer(undefined, action)).toEqual(expectedState);
  });
  test("update state when user login is successful", () => {
    const action = {
      type: types.LOGIN_SUCCESS,
      payload: { token: "token" },
    };
    const expectedState = {
      token: action.payload.token,
      isAuthenticated: true,
      loading: false,
      user: null,
      error: null,
      spinner: false,
      spinnerComment: "",
    };

    expect(authReducer(undefined, action)).toEqual(expectedState);
  });
  test("update state when user fails to register", () => {
    const action = {
      type: types.REGISTER_FAIL,
      payload: "error",
    };
    const expectedState = {
      token: null,
      isAuthenticated: false,
      loading: false,
      user: null,
      error: action.payload,
      spinner: false,
      spinnerComment: "",
    };

    expect(authReducer(undefined, action)).toEqual(expectedState);
  });
  test("update state when user login fails", () => {
    const action = {
      type: types.LOGIN_FAIL,
      payload: "error",
    };
    const expectedState = {
      token: null,
      isAuthenticated: false,
      loading: false,
      user: null,
      error: action.payload,
      spinner: false,
      spinnerComment: "",
    };

    expect(authReducer(undefined, action)).toEqual(expectedState);
  });
  test("update state when user logs out", () => {
    const action = {
      type: types.LOGOUT,
    };
    const expectedState = {
      token: null,
      isAuthenticated: false,
      loading: false,
      user: null,
      error: null,
      spinner: false,
      spinnerComment: "",
    };

    expect(authReducer(undefined, action)).toEqual(expectedState);
  });
  test("update state on clear errors action call", () => {
    const action = {
      type: types.CLEAR_ERRORS,
    };
    const expectedState = {
      token: null,
      isAuthenticated: null,
      loading: false,
      user: null,
      error: null,
      spinner: false,
      spinnerComment: "",
    };

    expect(authReducer(undefined, action)).toEqual(expectedState);
  });
  test("update state on spinner show", () => {
    const action = {
      type: types.SPINNER_SHOW,
    };
    const expectedState = {
      token: null,
      isAuthenticated: null,
      loading: true,
      user: null,
      error: null,
      spinner: true,
      spinnerComment: "loading",
    };

    expect(authReducer(undefined, action)).toEqual(expectedState);
  });
  test("update state on spinner no-show", () => {
    const action = {
      type: types.SPINNER_NOSHOW,
    };
    const expectedState = {
      token: null,
      isAuthenticated: null,
      loading: false,
      user: null,
      error: null,
      spinner: false,
      spinnerComment: "",
    };

    expect(authReducer(undefined, action)).toEqual(expectedState);
  });
});
