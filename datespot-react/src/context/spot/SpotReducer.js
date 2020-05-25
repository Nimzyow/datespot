import * as Types from "../Types";

export default (state, action) => {
  switch (action.type) {
    case Types.GET_LIKES:
      return {
        ...state,
        likes: action.payload,
      };
    case Types.GET_SPOTS:
      return {
        ...state,
        spots: action.payload,
      };
    case Types.ADD_FILTER_ID:
      return {
        ...state,
        filterId: action.payload,
      };
    case Types.GET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };
    case Types.ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    case Types.ADD_SPOT_DETAIL:
      return {
        ...state,
        spotDetail: action.payload
      }
    case Types.FILTER_SPOTS:
      return {
        ...state,
        filtered: state.spots.filter((spot) => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return spot.title.match(regex) || spot.description.match(regex);
        }),
      };
    case Types.FILTER_BY_SPOT_TAGS:
      return {
        ...state,
        filteredByTag: action.payload,
      };
    case Types.FILTER_BY_USER_LIKES:
      return {
        ...state,
        filteredByLiked: action.payload,
      };
    case Types.ADD_TO_LIKE_TABLE:
      const spotsToFilter = [...state.spots];
      const spotFiltered = spotsToFilter.filter((spot) => spot._id === action.payload.spot._id)

      const addLikeToSpotsFiltered =
        spotFiltered[0].likes = [...action.payload.likes]

      state.spots.filter((spot) => spot._id === action.payload.spot._id)[0].likes = addLikeToSpotsFiltered

      return {
        ...state,
      };
    case Types.REMOVE_FROM_LIKE_TABLE:
      const spotsToFilterForRemoval = [...state.spots]
      const spotFilteredForRemoval = spotsToFilterForRemoval.filter((spot) => spot._id === action.payload.spotId)

      const removeLikeFromSpotsFiltered =
        spotFilteredForRemoval[0].likes.filter((like) => like.userId !== action.payload.userId)

      state.spots.filter((spot) => spot._id === action.payload.spotId)[0].likes = removeLikeFromSpotsFiltered

      return {
        ...state
      };
    case Types.CLEAR_LIKED_ARRAY:
      return {
        ...state,
        filteredByLiked: null,
      };
    case Types.CLEAR_COMMENTS:
      return {
        ...state,
        comments: null,
      };
    case Types.CLEAR_FILTER_BY_SPOT_TAGS:
      return {
        ...state,
        filteredByTag: null,
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
    case Types.CLEAR_SPOT_DETAIL:
      return {
        ...state,
        spotDetail: null,
      };
    case Types.SPOTS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
