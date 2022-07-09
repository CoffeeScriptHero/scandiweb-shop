import { createSlice } from "@reduxjs/toolkit";

const categories = createSlice({
  name: "categories",
  initialState: [],
  reducers: {
    categoriesAdded(state, action) {
      state.push(...action.payload);
    },
  },
});

export const { categoriesAdded } = categories.actions;
export default categories.reducer;
