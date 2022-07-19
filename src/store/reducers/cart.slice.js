import { createSlice } from "@reduxjs/toolkit";
// import { client } from "../../index";

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    productAdd: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { productAdd } = cartSlice.actions;

export default cartSlice.reducer;
