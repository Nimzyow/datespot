import * as Types from "../actions/types";

const initialState = {
  spots: null,
  error: null,
  filtered: null,
  filteredByLiked: null,
  filteredByTag: null,
  filterId: null,
  spotDetail: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_SPOTS:
      console.log("GET SPOTS");
      return {
        ...state,
        spots: action.payload,
      };
    case Types.SPOTS_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload,
      };
    case Types.ADD_SPOT_DETAIL:
      const filterById = state.spots.filter(
        (spot) => spot._id === action.payload
      );
      return {
        ...state,
        spotDetail: filterById[0],
      };
    case Types.ADD_TO_LIKE_TABLE:
      const spotsToFilter = [...state.spots];
      const spotFiltered = spotsToFilter.filter(
        (spot) => spot._id === action.payload.spot._id
      );

      const addLikeToSpotsFiltered = (spotFiltered[0].likes = [
        ...action.payload.likes,
      ]);

      state.spots.filter(
        (spot) => spot._id === action.payload.spot._id
      )[0].likes = addLikeToSpotsFiltered;

      return {
        ...state,
      };
    case Types.ADD_COMMENT:
      const spotsToFilterComment = [...state.spots];
      const spotFilteredComment = spotsToFilterComment.filter(
        (spot) => spot._id === action.payload.spot._id
      );
      const addCommentToSpotsFiltered = (spotFilteredComment[0].comments = [
        ...action.payload.comments,
      ]);

      state.spots.filter(
        (spot) => spot._id === action.payload.spot._id
      )[0].comments = addCommentToSpotsFiltered;

      return {
        ...state,
      };
    case Types.FILTER_BY_SPOT_TAGS:
      const filterByTag = state.spots.filter((spot) =>
        spot.tags.includes(action.payload)
      );
      return {
        ...state,
        filteredByTag: filterByTag,
      };
    case Types.ADD_FILTER_ID:
      return {
        ...state,
        filterId: action.payload,
      };
    case Types.FILTER_SPOTS:
      return {
        ...state,
        filtered: state.spots.filter((spot) => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return spot.title.match(regex) || spot.description.match(regex);
        }),
      };
    case Types.CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case Types.REMOVE_FROM_LIKE_TABLE:
      const spotsToFilterForRemoval = [...state.spots];
      const spotFilteredForRemoval = spotsToFilterForRemoval.filter(
        (spot) => spot._id === action.payload.spotId
      );

      const removeLikeFromSpotsFiltered = spotFilteredForRemoval[0].likes.filter(
        (like) => like.userId !== action.payload.userId
      );

      state.spots.filter(
        (spot) => spot._id === action.payload.spotId
      )[0].likes = removeLikeFromSpotsFiltered;
      return {
        ...state,
        filteredByLiked: null,
      };
    case Types.LIKES_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case Types.CLEAR_LIKED_ARRAY:
      if (state.filteredByLiked.length === 0) {
        return {
          ...state,
          filteredByLiked: null,
        };
      }
      return;
    case Types.CLEAR_SPOT_DETAIL:
      return {
        ...state,
        spotDetail: null,
      };
    case Types.CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case Types.CLEAR_FILTER_ID:
      return {
        ...state,
        filterId: null,
      };
    case Types.CLEAR_FILTER_BY_SPOT_TAGS:
      return {
        ...state,
        filteredByTag: null,
      };
    default:
      return state;
  }
};
