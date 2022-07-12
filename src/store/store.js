import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from "./reducers/currency.slice";
import categoryReducer from "./reducers/category.slice";

export default configureStore({
  reducer: {
    currency: currencyReducer,
    category: categoryReducer,
  },
});
