import { register } from "../authActions";
const mockAxios = require("axios");
import * as types from "../types";
jest.mock("axios");

describe("registerUser action", () => {
  test("registers user", async () => {
    mockAxios.post.mockImplementationOnce(
      async () =>
        await Promise.resolve({ data: { token: "greatestTokenEver" } })
    );
    //console.log();

    const user = {
      username: "nimzy",
      email: "n_soufiani@hotmail.com",
      password: "123456",
    };
    try {
      const response = await register(user);

      let dispatchResult;
      const dispatch = (action) => {
        dispatchResult = action;
      };

      await response(dispatch);
      //console.log("dispatchResult", dispatchResult);

      expect(mockAxios.post).toHaveBeenCalledTimes(1);
      expect(dispatchResult).toEqual({
        type: types.REGISTER_SUCCESS,
        payload: { token: "greatestTokenEver" },
      });
    } catch (err) {
      console.error(err);
    }
  });
});
