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

export const removeFromLikeCount = (toRemove) => async (dispatch) => {
  const { spotId, userId } = toRemove;

  const toSend = { userId };
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    await axios.post(
      `http://localhost:4000/api/spots/${spotId}/likeRemove`,
      toSend,
      config
    );
    dispatch({
      type: Types.REMOVE_FROM_LIKE_TABLE,
      payload: toRemove,
    });
  } catch (err) {
    dispatch({
      type: Types.LIKES_ERROR,
      payload: toRemove,
    });
  }
};

//filter spot

export const filterSpots = (text) => (dispatch) => {
  dispatch({ type: Types.FILTER_SPOTS, payload: text });
};

//clear filter
export const clearFilter = () => (dispatch) => {
  dispatch({ type: Types.CLEAR_FILTER });
};

//post comment

export const postComment = (data) => async (dispatch) => {
  const toSend = {
    comment: data.comment,
    userId: data.userId,
  };
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(
      `http://localhost:4000/api/spots/${data.spotId}/comments`,
      toSend,
      config
    );
    dispatch({
      type: Types.ADD_COMMENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: Types.SPOTS_ERROR,
      payload: err,
    });
  }
};

//filter spot based on tags

export const filterSpotsByTags = (tagId, tag) => async (dispatch) => {
  try {
    dispatch({
      type: Types.FILTER_BY_SPOT_TAGS,
      payload: tag,
    });
    dispatch({
      type: Types.ADD_FILTER_ID,
      payload: tagId,
    });
  } catch (err) {
    console.error(err);
  }
};

// clear filter spot based on tags

export const clearFilterSpotsByTags = () => (dispatch) => {
  dispatch({
    type: Types.CLEAR_FILTER_ID,
  });
  dispatch({
    type: Types.CLEAR_FILTER_BY_SPOT_TAGS,
  });
};

export const filterSpotsBasedOnLike = (user) => (dispatch) => {
  dispatch({
    type: Types.FILTER_BY_USER_LIKES,
    payload: user,
  });
};
