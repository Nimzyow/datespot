import * as actionType from "../spotActions";
import * as types from "../types";
import mockAxios from "axios";
jest.mock("axios");

describe("spotActions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("getSpots function dispatches to GET_SPOTS", async () => {
    mockAxios.get.mockImplementationOnce(
      async () => await Promise.resolve({ data: "some spots" }),
    );
    const response = await actionType.getSpots();
    const dispatch = jest.fn();
    await response(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: types.GET_SPOTS,
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
    const dispatch = jest.fn();
    await response(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: types.SPOTS_ERROR,
      payload: { err: "some error for spots" },
    });
    expect(mockAxios.get).toHaveBeenCalledWith("/api/spots");
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  });
});
