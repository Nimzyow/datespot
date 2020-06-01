import spotReducer from "../spotReducer";
import * as types from "../../actions/types";

describe("spotReducer", () => {
  let initialState;
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
  test("changes state on add spot detail action", () => {
    const action = {
      type: types.ADD_SPOT_DETAIL,
      payload: "oneId",
    };
    initialState.spots = [{ _id: action.payload }];

    const expectedState = {
      spots: [{ _id: action.payload }],
      error: null,
      filtered: null,
      filteredByLiked: null,
      filteredByTag: null,
      filterId: null,
      spotDetail: { _id: action.payload },
    };

    expect(spotReducer(initialState, action)).toEqual(expectedState);
  });
  test("changes state on add to like table", () => {
    const action = {
      type: types.ADD_TO_LIKE_TABLE,
      payload: { spot: { _id: "oneId", likes: [] }, likes: [{ _id: "twoId" }] },
    };
    initialState.spots = [{ _id: action.payload.spot._id, likes: [] }];

    const expectedState = {
      spots: [
        { _id: action.payload.spot._id, likes: [action.payload.likes[0]] },
      ],
      error: null,
      filtered: null,
      filteredByLiked: null,
      filteredByTag: null,
      filterId: null,
      spotDetail: null,
    };

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

    const expectedState = {
      spots: [
        {
          _id: action.payload.spot._id,
          comments: [action.payload.comments[0]],
        },
      ],
      error: null,
      filtered: null,
      filteredByLiked: null,
      filteredByTag: null,
      filterId: null,
      spotDetail: null,
    };

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
    const expectedState = {
      spots: [
        { _id: "oneId", tags: ["dragon"] },
        { _id: "twoId", tags: [action.payload] },
      ],
      error: null,
      filtered: null,
      filteredByLiked: null,
      filteredByTag: [{ _id: "twoId", tags: [action.payload] }],
      filterId: null,
      spotDetail: null,
    };

    expect(spotReducer(initialState, action)).toEqual(expectedState);
  });
});
