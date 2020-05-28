import * as Types from "../actions/types";

const initialState = {
  alerts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_ALERT:
      return {
        ...state,
        alerts: [...state.alerts, action.payload],
      };
    case Types.REMOVE_ALERT:
      return {
        ...state,
        alerts: state.alerts.filter((alert) => alert.id !== action.payload),
      };
    default:
      return state;
  }
};
