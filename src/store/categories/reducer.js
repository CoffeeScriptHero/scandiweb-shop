import types from "./types";

const initialState = {
  categories: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CATEGORIES: {
      return {
        ...state,
        categories: categories,
      };
    }
    default:
      return state;
  }
};

export default reducer;
