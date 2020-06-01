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
});
