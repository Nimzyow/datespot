import * as actionType from "../spotActions";
import * as Types from "../types";
import mockAxios from "axios";
jest.mock("axios");

describe("spotActions", () => {
  let dispatch;
  beforeEach(() => {
    jest.clearAllMocks();
    dispatch = jest.fn();
  });
  test("getSpots function dispatches to GET_SPOTS", async () => {
    mockAxios.get.mockImplementationOnce(
      async () => await Promise.resolve({ data: "some spots" }),
    );
    const response = await actionType.getSpots();
    await response(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: Types.GET_SPOTS,
      payload: "some spots",
    });
    expect(mockAxios.get).toHaveBeenCalledWith("/api/spots");
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  });
  test("getSpots function dispatches to SPOTS_ERROR on getSpots failure", async () => {
    mockAxios.get.mockImplementationOnce(
      async () => await Promise.reject({ err: "some error for spots" }),
    );
    const response = await actionType.getSpots();
    await response(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: Types.SPOTS_ERROR,
      payload: { err: "some error for spots" },
    });
    expect(mockAxios.get).toHaveBeenCalledWith("/api/spots");
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  });
  test("addSpotDetail function dispatches to ADD_SPOT_DETAIL", async () => {
    const spotDetail = {
      id: "greatId",
    };
    const response = actionType.addSpotDetail(spotDetail.id);
    await response(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: Types.ADD_SPOT_DETAIL,
      payload: spotDetail.id,
    });
  });
  test("clearSpotDetail function triggers CLEAR_SPOT_DETAIL", async () => {
    const response = actionType.clearSpotDetail();
    await response(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: Types.CLEAR_SPOT_DETAIL,
    });
  });
  test("addToLikeCount function dispatches to ADD_TO_LIKE_TABLE", async () => {
    mockAxios.post.mockImplementationOnce(
      async () => await Promise.resolve({ data: "some likes" }),
    );
    const toAdd = {
      spotId: "spotId",
      userId: { _id: "user_id" },
    };
    const toSend = {
      userId: toAdd.userId,
    };
    const response = await actionType.addToLikeCount(toAdd);
    await response(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: Types.ADD_TO_LIKE_TABLE,
      payload: "some likes",
    });
    expect(mockAxios.post).toHaveBeenCalledWith(
      `/api/spots/${toAdd.spotId}/like`,
      toSend,
      {
        headers: { "Content-Type": "application/json" },
      },
    );
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
  });
  test("addToLikeCount function failure dispatches to LIKES_ERROR", async () => {
    mockAxios.post.mockImplementationOnce(
      async () => await Promise.reject({ err: { msg: "some error" } }),
    );
    const toAdd = {
      spotId: "spotId",
      userId: { _id: "user_id" },
    };
    const response = await actionType.addToLikeCount(toAdd);
    await response(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: Types.LIKES_ERROR,
      payload: { err: { msg: "some error" } },
    });
  });
  test("removeFromLikeCount function dispatches to REMOVE_FROM_LIKE_TABLE", async () => {
    mockAxios.post.mockImplementationOnce(
      async () => await Promise.resolve({ data: "some likes" }),
    );
    const toAdd = {
      spotId: "spotId",
      userId: { _id: "user_id" },
    };
    const toSend = {
      userId: toAdd.userId,
    };
    const response = await actionType.removeFromLikeCount(toAdd);
    await response(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: Types.REMOVE_FROM_LIKE_TABLE,
      payload: toAdd,
    });
    expect(mockAxios.post).toHaveBeenCalledWith(
      `/api/spots/${toAdd.spotId}/likeRemove`,
      toSend,
      {
        headers: { "Content-Type": "application/json" },
      },
    );
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
  });
  test("removeFromLikeCount function failure dispatches to LIKES_ERROR", async () => {
    mockAxios.post.mockImplementationOnce(
      async () => await Promise.reject({ err: { msg: "some error" } }),
    );
    const toAdd = {
      spotId: "spotId",
      userId: { _id: "user_id" },
    };
    const response = await actionType.removeFromLikeCount(toAdd);
    await response(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: Types.LIKES_ERROR,
      payload: { err: { msg: "some error" } },
    });
  });
  test("filterSpots function dispatches to FILTER_SPOTS", async () => {
    const response = await actionType.filterSpots("text");
    await response(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: Types.FILTER_SPOTS,
      payload: "text",
    });
  });
  test("clearFilter function dispatches to CLEAR_FILTER", async () => {
    const response = await actionType.clearFilter();
    await response(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: Types.CLEAR_FILTER,
    });
  });
  test("postComment function dispatches to ADD_COMMENT", async () => {
    mockAxios.post.mockImplementationOnce(
      async () => await Promise.resolve({ data: "some comment" }),
    );
    const toAdd = {
      comment: "comment",
      userId: "userId",
    };
    const response = await actionType.postComment(toAdd);
    await response(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: Types.ADD_COMMENT,
      payload: "some comment",
    });
    expect(mockAxios.post).toHaveBeenCalledWith(
      `/api/spots/${toAdd.spotId}/comments`,
      toAdd,
      {
        headers: { "Content-Type": "application/json" },
      },
    );
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
  });
  test("filterSpotsByTags function dispatches to FILTER_BY_SPOT_TAGS", async () => {
    const response = await actionType.filterSpotsByTags("tagId", "tag");
    await response(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: Types.FILTER_BY_SPOT_TAGS,
      payload: "tag",
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: Types.ADD_FILTER_ID,
      payload: "tagId",
    });
  });
  test("clearFilterSpotsByTags function dispatches to CLEAR_FILTER_ID", async () => {
    const response = await actionType.clearFilterSpotsByTags();
    await response(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: Types.CLEAR_FILTER_ID,
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: Types.CLEAR_FILTER_BY_SPOT_TAGS,
    });
  });
  test("filterSpotsBasedOnLike function dispatches to FILTER_BY_USER_LIKES", async () => {
    const user = {
      user: { _id: "userId" },
    };
    const response = await actionType.filterSpotsBasedOnLike(user);
    await response(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: Types.FILTER_BY_USER_LIKES,
      payload: user,
    });
  });
});
