import * as Types from "./types";
import axios from "axios";

export const getTags = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/tags");
    dispatch({
      type: Types.GET_TAGS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: Types.TAGS_ERROR,
      payload: err,
    });
  }
};
