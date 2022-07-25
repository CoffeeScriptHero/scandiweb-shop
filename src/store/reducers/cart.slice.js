import { createSlice } from "@reduxjs/toolkit";
import { deepEqual } from "../../services/helpers";

const localCart = JSON.parse(localStorage.getItem("cart"));

export const cartSlice = createSlice({
  name: "cart",
  initialState: localCart || [],
  reducers: {
    productSave: (state, action) => {
      localStorage.setItem("cart", JSON.stringify([...state, action.payload]));
      return [...state, action.payload];
    },
    productRemove: (state, action) => {
      const updatedState = state.filter(
        (p) =>
          p.id !== action.payload.id ||
          !deepEqual(p.attributes, action.payload.attributes)
      );

      localStorage.setItem("cart", JSON.stringify(updatedState));

      return [...updatedState];
    },
    removeById: (state, action) => {
      const updatedState = state.filter((p) => p.id !== action.payload);

      localStorage.setItem("cart", JSON.stringify(updatedState));
      return [...updatedState];
    },
    changeQuantity: (state, action) => {
      const { id, attributes, type } = action.payload;

      state.forEach((p) => {
        if (p.id === id && deepEqual(p.attributes, attributes)) {
          const value = type === "increment" ? 1 : -1;
          p.quantity += value;
        }
      });
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { productSave, productRemove, removeById, changeQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
