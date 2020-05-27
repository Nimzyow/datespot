import * as Types from "../actions/types";

const initialState = {
  tags: null,
  error: null,
  filteredTagsToSearch: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_TAGS:
      return {
        ...state,
        tags: action.payload,
      };
    default:
      return state;
  }
};
