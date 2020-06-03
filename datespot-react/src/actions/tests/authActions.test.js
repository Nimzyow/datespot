import { register, loadUser, login } from "../authActions";
import mockAxios from "axios";
import * as types from "../types";
jest.mock("axios");

describe("authActions", () => {
  let dispatch = jest.fn();
  let user;
  beforeEach(() => {
    jest.clearAllMocks();
    user = {
      username: "testy",
      email: "test@test.com",
      password: "123456",
    };
  });
  test("loads user", async () => {
    const expectedResult = {
      data: {
        user: {
          _id: "userId",
          username: "usery",
          email: "email@email.com",
          createdAt: "onceUponATime",
          updatedAt: "updateUponATime",
        },
      },
    };
    mockAxios.get.mockImplementationOnce(
      async () =>
        await Promise.resolve({
          ...expectedResult,
        }),
    );

    try {
      const response = await loadUser();

      await response(dispatch);

      expect(mockAxios.get).toHaveBeenCalledTimes(1);
      expect(mockAxios.get).toHaveBeenCalledWith("/api/auth");
      expect(dispatch).toHaveBeenCalledWith({
        type: types.USER_LOADED,
        payload: expectedResult.data,
      });
    } catch (err) {
      console.error(err);
    }
  });
  test("registers user", async () => {
    mockAxios.post.mockImplementationOnce(
      async () =>
        await Promise.resolve({ data: { token: "greatestTokenEver" } }),
    );

    try {
      const response = await register(user);

      await response(dispatch);

      expect(mockAxios.post).toHaveBeenCalledTimes(1);
      expect(mockAxios.post).toHaveBeenCalledWith("/api/users", user, {
        headers: { "Content-Type": "application/json" },
      });
      expect(dispatch).toHaveBeenCalledWith({
        type: types.REGISTER_SUCCESS,
        payload: { token: "greatestTokenEver" },
      });
    } catch (err) {
      console.error(err);
    }
  });
  test("REGISTER_FAIL is called with email that already exists in db", async () => {
    mockAxios.post.mockImplementationOnce(
      async () =>
        await Promise.reject({
          response: { data: { msg: "error" } },
        }),
    );

    try {
      const response = await register(user);

      await response(dispatch);

      expect(dispatch).toHaveBeenCalledWith({
        type: types.REGISTER_FAIL,
        payload: "error",
      });
    } catch (err) {
      console.error(err);
    }
  });
  test("login user", async () => {
    mockAxios.post.mockImplementationOnce(
      async () =>
        await Promise.resolve({ data: { token: "greatestTokenEver" } }),
    );
    delete user.username;

    const response = await login(user);

    await response(dispatch);

    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(mockAxios.post).toHaveBeenCalledWith("/api/auth", user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: types.LOGIN_SUCCESS,
      payload: { token: "greatestTokenEver" },
    });
  });
  test("login failure calls LOGIN_FAIL action", async () => {
    mockAxios.post.mockImplementationOnce(async () => await Promise.reject());
    delete user.username;

    const response = await login(user);

    await response(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: types.LOGIN_FAIL,
      payload: "Invalid Credentials",
    });
  });
});
