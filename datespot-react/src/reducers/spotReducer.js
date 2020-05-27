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
        spotDetail: filterById,
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
