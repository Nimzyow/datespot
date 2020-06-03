import { GET_TAGS, TAGS_ERROR } from "../types";
import { getTags } from "../tagActions";
import mockAxios from "axios";
jest.mock("axios");

describe("tagActions", () => {
  test("getTags function calls GET_TAGS action", async () => {
    mockAxios.get.mockImplementationOnce(
      async () => await Promise.resolve({ data: { tags: "someTags" } }),
    );
    const response = await getTags();
    const dispatch = jest.fn();
    await response(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: GET_TAGS,
      payload: { tags: "someTags" },
    });
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith("/api/tags");
  });
  test("getTags function failure calls TAGS_ERROR action", async () => {
    mockAxios.get.mockImplementationOnce(
      async () => await Promise.reject({ err: { msg: "someFailure" } }),
    );
    const response = await getTags();
    const dispatch = jest.fn();
    await response(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: TAGS_ERROR,
      payload: { err: { msg: "someFailure" } },
    });
  });
});
