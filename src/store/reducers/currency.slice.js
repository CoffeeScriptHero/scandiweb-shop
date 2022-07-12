import { createSlice } from "@reduxjs/toolkit";
import { GET_CATEGORIES_NAMES } from "../../queries/categories";
import { GET_ALL_CURRENCIES } from "../../queries/currencies";
import { client } from "../../index";

export const currencySlice = createSlice({
  name: "currency",
  initialState: {
    currencies: [],
  },
  reducers: {
    currenciesAdd: (state, action) => {
      state.currencies.push(...action.payload);
    },
  },
});

export const { currenciesAdd } = currencySlice.actions;

export const fetchCurrencies = () => (dispatch) => {
  client.query({ query: GET_ALL_CURRENCIES }).then((result) => {
    dispatch(currenciesAdd(result.data.currencies));
  });
};

export default currencySlice.reducer;
