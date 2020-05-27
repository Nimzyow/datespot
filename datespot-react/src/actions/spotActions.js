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

export const addToLikeCount = (toAdd) => async (dispatch) => {
  console.log(toAdd);
  const { spotId, userId } = toAdd;
  const toSend = { userId };
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      `http://localhost:4000/api/spots/${spotId}/like`,
      toSend,
      config
    );
    console.log("RES", res.data);
    dispatch({
      type: Types.ADD_TO_LIKE_TABLE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: Types.LIKES_ERROR,
      payload: err,
    });
  }
};
