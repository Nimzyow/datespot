import * as Types from "./types";
import uuid from "uuid";

//Set Alert
export const setAlert = (msg, type, timeout = 5000) => (dispatch) => {
  const id = uuid.v4();
  dispatch({
    type: Types.SET_ALERT,
    payload: { msg, type, id },
  });

  setTimeout(
    () => dispatch({ type: Types.REMOVE_ALERT, payload: id }),
    timeout,
  );
};
