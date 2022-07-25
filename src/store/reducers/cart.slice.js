import { createSlice } from "@reduxjs/toolkit";
import { deepEqual } from "../../services/helpers";

const localCart = JSON.parse(localStorage.getItem("cart"));

export const cartSlice = createSlice({
  name: "cart",
  initialState: { cart: localCart || [], totalPrice: 0 },
  reducers: {
    productSave: (state, action) => {
      const newCart = [...state.cart, action.payload];
      localStorage.setItem("cart", JSON.stringify(newCart));
      state.cart = newCart;
    },
    productRemove: (state, action) => {
      const newCart = state.cart.filter(
        (p) =>
          p.id !== action.payload.id ||
          !deepEqual(p.attributes, action.payload.attributes)
      );
      localStorage.setItem("cart", JSON.stringify(newCart));
      state.cart = newCart;
    },
    removeById: (state, action) => {
      const newCart = state.cart.filter((p) => p.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(newCart));
      state.cart = newCart;
    },
    changeQuantity: (state, action) => {
      const { id, attributes, type } = action.payload;

      const newCart = state.cart.map((p) => {
        if (p.id === id && deepEqual(p.attributes, attributes)) {
          const value = type === "increment" ? 1 : -1;
          p.quantity += value;
        }
        return p;
      });
      localStorage.setItem("cart", JSON.stringify(newCart));
      state.cart = newCart;
    },
  },
});

export const { productSave, productRemove, removeById, changeQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
