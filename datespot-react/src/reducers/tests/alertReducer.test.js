import { SET_ALERT, REMOVE_ALERT } from "../../actions/types";
import alertReducer from "../alertReducer";

describe("alertReducer", () => {
  test("returns default state when passed unrelated action type", () => {
    const unrelatedAction = {
      type: "unrelatedAction",
    };
    const expectedState = {
      alerts: [],
    };

    expect(alertReducer(undefined, unrelatedAction)).toEqual(expectedState);
  });
  test("SET_ALERT triggers change in state", () => {
    const expectedState = {
      alerts: [{ msg: "failure", type: "danger", id: "theId" }],
    };

    const action = {
      type: SET_ALERT,
      payload: expectedState.alerts[0],
    };

    expect(alertReducer(undefined, action)).toEqual(expectedState);
  });
  test("REMOVE_ALERT triggers change in state", () => {
    const initialState = {
      alerts: [
        { msg: "failure", type: "danger", id: "theId" },
        { msg: "kindOfFailure", type: "medium", id: "someId" },
      ],
    };
    const expectedState = {
      alerts: [{ msg: "failure", type: "danger", id: "theId" }],
    };

    const action = {
      type: REMOVE_ALERT,
      payload: "someId",
    };

    expect(alertReducer(initialState, action)).toEqual(expectedState);
  });
});
