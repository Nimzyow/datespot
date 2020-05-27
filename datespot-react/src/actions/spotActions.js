import * as Types from "./types";
import axios from "axios";

// get spots from server
export const getSpots = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:4000/api/spots");
    dispatch({
      type: Types.GET_SPOTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: Types.SPOTS_ERROR,
      payload: err,
    });
  }
};

export const addSpotDetail = (id) => (dispatch) => {
  dispatch({
    type: Types.ADD_SPOT_DETAIL,
    payload: id,
  });
};

export const clearSpotDetail = () => (dispatch) => {
  dispatch({
    type: Types.CLEAR_SPOT_DETAIL,
  });
};

export const clearFilter = () => (dispatch) => {
  dispatch({
    type: Types.CLEAR_FILTER,
  });
};