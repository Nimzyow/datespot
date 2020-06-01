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
  test("changes state on filter spots", () => {
    const action = {
      type: types.FILTER_SPOTS,
      payload: "london",
    };
    initialState.spots = [
      { _id: "oneId", title: "london", description: "London spot" },
      {
        _id: "twoId",
        title: "somewhere else",
        description: "somewhere else spot",
      },
    ];
    expectedState.spots = initialState.spots;
    expectedState.filtered = [
      { _id: "oneId", title: "london", description: "London spot" },
    ];

    expect(spotReducer(initialState, action)).toEqual(expectedState);
  });
  test("changes state on filtered by user likes", () => {
    const action = {
      type: types.FILTER_BY_USER_LIKES,
      payload: { _id: "userId" },
    };
    initialState.spots = [
      { _id: "oneId", likes: [{ userId: action.payload._id }] },
      {
        _id: "twoId",
        likes: [{ userId: "threeId" }],
      },
    ];
    expectedState.spots = initialState.spots;
    expectedState.filteredByLiked = [
      { _id: "oneId", likes: [{ userId: action.payload._id }] },
    ];

    expect(spotReducer(initialState, action)).toEqual(expectedState);
  });
  test("changes state on clear filter", () => {
    const action = {
      type: types.CLEAR_FILTER,
    };
    initialState.filtered = [
      { _id: "oneId", likes: [{ userId: "userId" }] },
      {
        _id: "twoId",
        likes: [{ userId: "threeId" }],
      },
    ];

    expect(spotReducer(initialState, action)).toEqual(expectedState);
  });
  test("changes state on remove from like table", () => {
    const action = {
      type: types.REMOVE_FROM_LIKE_TABLE,
      payload: { spotId: "oneSpotId", userId: "oneUserId" },
    };
    initialState.spots = [
      {
        _id: action.payload.spotId,
        likes: [
          { userId: action.payload.userId },
          { userId: "action.payload.userId" },
        ],
      },
      { _id: "randomSpotId", likes: [{ userId: "randomUserId" }] },
    ];

    expectedState.spots = [
      {
        _id: action.payload.spotId,
        likes: [{ userId: "action.payload.userId" }],
      },
      { _id: "randomSpotId", likes: [{ userId: "randomUserId" }] },
    ];

    expect(spotReducer(initialState, action)).toEqual(expectedState);
  });
  test("changes state on likes error", () => {
    const action = {
      type: types.LIKES_ERROR,
      payload: "some sort error",
    };

    expectedState.error = action.payload;

    expect(spotReducer(undefined, action)).toEqual(expectedState);
  });
});
