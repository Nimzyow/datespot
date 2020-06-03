import * as actionType from "../spotActions";
import * as types from "../types";
import mockAxios from "axios";
jest.mock("axios");

describe("spotActions", () => {
  test("getSpots dispatches to GET_SPOTS", async () => {
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
});
