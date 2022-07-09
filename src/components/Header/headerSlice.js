import { createSlice } from "@reduxjs/toolkit";
import { GET_CATEGORIES_NAMES } from "../../queries/categories";
import { GET_ALL_CURRENCIES } from "../../queries/currencies";
import { client } from "../../index";

// .env
// **/node_modules
// package-lock.json

export const headerSlice = createSlice({
  name: "header",
  initialState: {
    categories: [],
    currencies: [],
  },
  reducers: {
    categoriesAdd: (state, action) => {
      state.categories.push(...action.payload);
    },
    currenciesAdd: (state, action) => {
      state.currencies.push(...action.payload);
    },
  },
});

export const { categoriesAdd, currenciesAdd } = headerSlice.actions;

export const fetchCategories = () => (dispatch) => {
  client.query({ query: GET_CATEGORIES_NAMES }).then((result) => {
    const categoriesNames = result.data.categories.map((c) => c.name);
    dispatch(categoriesAdd(categoriesNames));
  });
};

export const fetchCurrencies = () => (dispatch) => {
  client.query({ query: GET_ALL_CURRENCIES }).then((result) => {
    dispatch(currenciesAdd(result.data.currencies));
  });
};

export default headerSlice.reducer;
