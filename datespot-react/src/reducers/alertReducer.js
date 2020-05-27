import * as Types from "../actions/types";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_ALERT:
      return [...state, action.payload];
    case Types.REMOVE_ALERT:
      return state.filter((alert) => alert.id !== action.payload);
    default:
      return state;
  }
};
