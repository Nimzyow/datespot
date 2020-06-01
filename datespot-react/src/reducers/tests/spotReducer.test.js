import spotReducer from "../spotReducer";
import * as types from "../../actions/types";

describe("spotReducer", () => {
  test("returns default state if non related action is passed", () => {
    const unrelatedAction = {
      type: "unrelatedAction",
    };

    const dummyState = {
      random: "state",
    };

    expect(spotReducer(dummyState, unrelatedAction)).toEqual(dummyState);
  });
  test("should ", () => {});
});
