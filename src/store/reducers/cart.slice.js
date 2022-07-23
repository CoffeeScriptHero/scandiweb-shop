import { createSlice } from "@reduxjs/toolkit";

const localCart = JSON.parse(localStorage.getItem("cart"));

export const cartSlice = createSlice({
  name: "cart",
  initialState: localCart || [],
  reducers: {
    productSave: (state, action) => {
      localStorage.setItem("cart", JSON.stringify([...state, action.payload]));
      state.push(action.payload);
    },
    productRemove: (state, action) => {
      const localCart = JSON.parse(localStorage.getItem("cart"));

      const updatedCart = localCart.filter((p) => {
        if (p.id === action.payload.id) {
          for (let a in p.attributes) {
            if (p.attributes[a] !== action.payload.attributes[a]) return true;
          }
          return false;
        } else {
          return true;
        }
      });

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return [...updatedCart];
    },
    removeById: (state, action) => {
      const storageCart = JSON.parse(localStorage.getItem("cart"));
      const updatedCart = storageCart.filter((p) => p.id !== action.payload);

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return [...updatedCart];
    },
  },
});

export const { productSave, productRemove, removeById } = cartSlice.actions;

export default cartSlice.reducer;
