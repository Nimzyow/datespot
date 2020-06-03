import { SET_ALERT } from "../types";
import { setAlert } from "../alertActions";
import uuid from "uuid";
jest.mock("uuid");

describe("alertActions", () => {
  test("setAlert triggers SET_ALERT action", async () => {
    uuid.v4.mockImplementationOnce(() => {
      return "idOfSomeSort";
    });

    const response = await setAlert("fail", "danger");
    let dispatch = jest.fn();
    await response(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: SET_ALERT,
      payload: { msg: "fail", type: "danger", id: "idOfSomeSort" },
    });
  });
});
