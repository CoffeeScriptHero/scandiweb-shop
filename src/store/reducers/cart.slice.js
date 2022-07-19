import { createSlice } from "@reduxjs/toolkit";

const localeStorageCart = JSON.parse(localStorage.getItem("cart"));

export const cartSlice = createSlice({
  name: "cart",
  initialState: localeStorageCart || [],
  reducers: {
    productSave: (state, action) => {
      localStorage.setItem("cart", JSON.stringify([...state, action.payload]));
      state.push(action.payload);
    },
    productRemove: (state, action) => {
      const storageCart = JSON.parse(localStorage.getItem("cart"));

      localStorage.setItem(
        "cart",
        JSON.stringify(storageCart.filter((p) => p.id !== action.payload))
      );

      storageCart.forEach((p, i) => {
        if (p.id === action.payload) {
          state.splice(i, 1);
        }
      });
    },
  },
});

export const { productSave, productRemove } = cartSlice.actions;

export default cartSlice.reducer;
