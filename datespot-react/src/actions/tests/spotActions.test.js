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
});
