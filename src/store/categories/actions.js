import types from "./types";

const setCategories = (categories) => ({
  type: types.SET_CATEGORIES,
  payload: categories,
});

const actionsObj = { setCategories };

export default actionsObj;
