import spotReducer from "../spotReducer";
import * as types from "../../actions/types";

describe("spotReducer", () => {
  let initialState;
  let expectedState;
  beforeEach(() => {
    initialState = {
      spots: null,
      error: null,
      filtered: null,
      filteredByLiked: null,
      filteredByTag: null,
      filterId: null,
      spotDetail: null,
    };

    expectedState = {
      spots: null,
      error: null,
      filtered: null,
      filteredByLiked: null,
      filteredByTag: null,
      filterId: null,
      spotDetail: null,
    };
  });
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
    expectedState.spots = action.payload;

    expect(spotReducer(undefined, action)).toEqual(expectedState);
  });
  test("changes state on spots error action", () => {
    const action = {
      type: types.SPOTS_ERROR,
      payload: "some sort error",
    };

    expectedState.error = action.payload;

    expect(spotReducer(undefined, action)).toEqual(expectedState);
  });
  test("changes state on add spot detail action", () => {
    const action = {
      type: types.ADD_SPOT_DETAIL,
      payload: "oneId",
    };
    initialState.spots = [{ _id: action.payload }];

    expectedState.spots = [{ _id: action.payload }];
    expectedState.spotDetail = { _id: action.payload };

    expect(spotReducer(initialState, action)).toEqual(expectedState);
  });
  test("changes state on add to like table", () => {
    const action = {
      type: types.ADD_TO_LIKE_TABLE,
      payload: { spot: { _id: "oneId", likes: [] }, likes: [{ _id: "twoId" }] },
    };
    initialState.spots = [{ _id: action.payload.spot._id, likes: [] }];

    expectedState.spots = [
      { _id: action.payload.spot._id, likes: [action.payload.likes[0]] },
    ];

    expect(spotReducer(initialState, action)).toEqual(expectedState);
  });
  test("changes state on add comment", () => {
    const action = {
      type: types.ADD_COMMENT,
      payload: {
        spot: { _id: "oneId", comments: [] },
        comments: [{ _id: "twoId" }],
      },
    };

    initialState.spots = [{ _id: action.payload.spot._id, comments: [] }];

    expectedState.spots = [
      {
        _id: action.payload.spot._id,
        comments: [action.payload.comments[0]],
      },
    ];

    expect(spotReducer(initialState, action)).toEqual(expectedState);
  });
  test("changes state on filter by spot tags", () => {
    const action = {
      type: types.FILTER_BY_SPOT_TAGS,
      payload: "adventure",
    };
    initialState.spots = [
      { _id: "oneId", tags: ["dragon"] },
      { _id: "twoId", tags: [action.payload] },
    ];
    expectedState.spots = initialState.spots;

    expectedState.filteredByTag = [{ _id: "twoId", tags: [action.payload] }];

    expect(spotReducer(initialState, action)).toEqual(expectedState);
  });
  test("changes state on add filter id", () => {
    const action = {
      type: types.ADD_FILTER_ID,
      payload: "filterId",
    };
    expectedState.filterId = action.payload;

    expect(spotReducer(undefined, action)).toEqual(expectedState);
  });
});
