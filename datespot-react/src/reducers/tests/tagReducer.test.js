import { GET_TAGS } from "../../actions/types";
import tagReducer from "../tagReducer";

describe("tagReducer", () => {
  test("returns default state when passed unrelated action type", () => {
    const unrelatedAction = {
      type: "unrelatedAction",
    };
    const expectedState = {
      tags: null,
      error: null,
      filteredTagsToSearch: null,
    };

    expect(tagReducer(undefined, unrelatedAction)).toEqual(expectedState);
  });
  test("GET_TAGS triggers change in state", () => {
    const expectedState = {
      tags: [{ tag: "adventure", tagId: "tagId" }],
      error: null,
      filteredTagsToSearch: null,
    };

    const action = {
      type: GET_TAGS,
      payload: expectedState.tags,
    };

    expect(tagReducer(undefined, action)).toEqual(expectedState);
  });
});
