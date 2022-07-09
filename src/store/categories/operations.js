import actions from "./actions";

const setCategories = (categories) => (dispatch, getState) => {
  dispatch(actions.setCategories(categories));
};

const operationsObj = { setCategories };

export default operationsObj;
