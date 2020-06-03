import authReducer from "../authReducer";
import * as types from "../../actions/types";

describe("authReducer", () => {
  let expectedState;
  beforeEach(() => {
    expectedState = {
      token: localStorage.getItem("token"),
      isAuthenticated: true,
      loading: false,
      user: null,
      error: null,
      spinner: false,
      spinnerComment: "",
    };
  });
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
    expectedState.user = action.payload;

    expect(authReducer(undefined, action)).toEqual(expectedState);
  });
  test("update state on authentication error", () => {
    const action = {
      type: types.AUTH_ERROR,
      payload: "some error",
    };
    expectedState.error = action.payload;
    expectedState.isAuthenticated = false;

    expect(authReducer(undefined, action)).toEqual(expectedState);
  });
  test("update state when user on successful registration", () => {
    const action = {
      type: types.REGISTER_SUCCESS,
      payload: { token: "token" },
    };
    expectedState.token = action.payload.token;
    expectedState.isAuthenticated = true;

    expect(authReducer(undefined, action)).toEqual(expectedState);
  });
  test("update state when user login is successful", () => {
    const action = {
      type: types.LOGIN_SUCCESS,
      payload: { token: "token" },
    };
    expectedState.token = action.payload.token;
    expectedState.isAuthenticated = true;

    expect(authReducer(undefined, action)).toEqual(expectedState);
  });
  test("update state when user fails to register", () => {
    const action = {
      type: types.REGISTER_FAIL,
      payload: "error",
    };
    expectedState.error = action.payload;
    expectedState.isAuthenticated = false;
    expectedState.token = null;

    expect(authReducer(undefined, action)).toEqual(expectedState);
  });
  test("update state when user login fails", () => {
    const action = {
      type: types.LOGIN_FAIL,
      payload: "error",
    };
    expectedState.isAuthenticated = false;
    expectedState.error = action.payload;

    expect(authReducer(undefined, action)).toEqual(expectedState);
  });
  test("update state when user logs out", () => {
    const action = {
      type: types.LOGOUT,
    };
    expectedState.isAuthenticated = false;
    expectedState.token = null;

    expect(authReducer(undefined, action)).toEqual(expectedState);
  });
  test("update state on clear errors action call", () => {
    const action = {
      type: types.CLEAR_ERRORS,
    };
    expectedState.isAuthenticated = null;
    expectedState.token = null;

    expect(authReducer(undefined, action)).toEqual(expectedState);
  });
  test("update state on spinner show", () => {
    const action = {
      type: types.SPINNER_SHOW,
    };
    expectedState.isAuthenticated = null;
    expectedState.token = null;
    expectedState.loading = true;
    expectedState.spinner = true;
    expectedState.spinnerComment = "loading";

    expect(authReducer(undefined, action)).toEqual(expectedState);
  });
  test("update state on spinner no-show", () => {
    const action = {
      type: types.SPINNER_NOSHOW,
    };
    expectedState.token = null;
    expectedState.isAuthenticated = null;
    expectedState.loading = false;

    expect(authReducer(undefined, action)).toEqual(expectedState);
  });
});
