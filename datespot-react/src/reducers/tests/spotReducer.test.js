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
  test("changes state on get spots action", () => {
    const action = {
      type: types.GET_SPOTS,
      payload: "some sort of spots",
    };
    const expectedState = {
      spots: action.payload,
      error: null,
      filtered: null,
      filteredByLiked: null,
      filteredByTag: null,
      filterId: null,
      spotDetail: null,
    };

    expect(spotReducer(undefined, action)).toEqual(expectedState);
  });
  test("changes state on spots error action", () => {
    const action = {
      type: types.SPOTS_ERROR,
      payload: "some sort error",
    };
    const expectedState = {
      spots: null,
      error: action.payload,
      filtered: null,
      filteredByLiked: null,
      filteredByTag: null,
      filterId: null,
      spotDetail: null,
    };

    expect(spotReducer(undefined, action)).toEqual(expectedState);
  });
});
