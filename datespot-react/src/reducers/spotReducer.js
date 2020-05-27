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
    default:
      return state;
  }
};
