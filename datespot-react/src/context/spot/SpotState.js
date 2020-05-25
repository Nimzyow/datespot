import React, { useReducer, useContext } from "react";
import axios from "axios";
import SpotContext from "./SpotContext";
import SpotReducer from "./SpotReducer";
import * as Types from "../Types";

const SpotState = (props) => {
  const initialState = {
    spots: null,
    error: null,
    filtered: null,
    filteredByLiked: null,
    filteredByTag: null,
    filterId: null,
    spotDetail: null,
  };

  const [state, dispatch] = useReducer(SpotReducer, initialState);


  // set spotDetail

  const setSpotDetail = (id) => {
    const filterById = state.spots.filter((spot) => spot._id === id)
    dispatch({
      type: Types.ADD_SPOT_DETAIL,
      payload: filterById[0]
    })
  }

  // clear spotDetailId

  const clearSpotDetail = () => {
    dispatch({
      type: Types.CLEAR_SPOT_DETAIL
    })
  }

  //post comment

  const postComment = async (toSend) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        `/api/v1/spots/${toSend.spot_id}/comments`,
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

  const filterSpotsByTags = async (tagId, tag) => {
    try {
      const filterByTag = state.spots.filter((spot) => spot.tags.includes(tag))
      dispatch({
        type: Types.FILTER_BY_SPOT_TAGS,
        payload: filterByTag,
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

  const clearFilterSpotsByTags = () => {
    dispatch({
      type: Types.CLEAR_FILTER_ID,
    });
    dispatch({
      type: Types.CLEAR_FILTER_BY_SPOT_TAGS,
    });
  };

  const filterSpotsBasedOnLike = (user) => {
    let filterBasedOnUserLike = [];

    for (let i = 0; i < state.spots.length; i++) {
      state.spots[i].likes.map((like) => {
        if (like.userId === user._id) {
          filterBasedOnUserLike.push(state.spots[i])
        };
      });
    };

    dispatch({
      type: Types.FILTER_BY_USER_LIKES,
      payload: filterBasedOnUserLike,
    });
  };

  //filter spot
  const filterSpots = (text) => {
    dispatch({ type: Types.FILTER_SPOTS, payload: text });
  };

  //clear filter
  const clearFilter = () => {
    dispatch({ type: Types.CLEAR_FILTER });
  };

  const getSpots = async () => {
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

  const addToLikeCount = async (toAdd) => {
    const { spotId, userId } = toAdd;
    const toSend = { userId }
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(`http://localhost:4000/api/spots/${spotId}/like`, toSend, config);

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

  const removeFromLikeCount = async (toRemove) => {
    const { spotId, userId } = toRemove;

    const toSend = { userId }
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    try {
      await axios.post(`http://localhost:4000/api/spots/${spotId}/likeRemove`, toSend, config);
      dispatch({
        type: Types.REMOVE_FROM_LIKE_TABLE,
        payload: toRemove,
      });
      if (state.filteredByLiked.length === 0) {
        dispatch({
          type: Types.CLEAR_LIKED_ARRAY,
        });
      }
    } catch (err) {
      dispatch({
        type: Types.LIKES_ERROR,
        payload: err,
      });
    }
  };

  return (
    <SpotContext.Provider
      value={{
        spots: state.spots,
        filtered: state.filtered,
        filteredByTag: state.filteredByTag,
        filterId: state.filterId,
        filteredByLiked: state.filteredByLiked,
        spotDetail: state.spotDetail,
        clearSpotDetail,
        setSpotDetail,
        postComment,
        filterSpotsByTags,
        clearFilterSpotsByTags,
        filterSpots,
        clearFilter,
        getSpots,
        filterSpotsBasedOnLike,
        addToLikeCount,
        removeFromLikeCount,
      }}
    >
      {props.children}
    </SpotContext.Provider>
  );
};

export default SpotState;
