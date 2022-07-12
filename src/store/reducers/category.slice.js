import { createSlice } from "@reduxjs/toolkit";
import { client } from "../../index";
import { GET_CATEGORIES_NAMES, GET_PRODUCTS } from "../../queries/categories";

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    products: [],
    currentCategory: null,
  },
  reducers: {
    categoriesAdd: (state, action) => {
      state.categories = action.payload;
    },
    productsAdd: (state, action) => {
      state.products = action.payload;
    },
    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
  },
});

export const { categoriesAdd, productsAdd, setCurrentCategory } =
  categorySlice.actions;

export const fetchCategories = () => (dispatch) => {
  client.query({ query: GET_CATEGORIES_NAMES }).then((result) => {
    const categoriesNames = result.data.categories.map((c) => c.name);
    dispatch(categoriesAdd(categoriesNames));
  });
};

export const fetchProducts = (categoryName) => async (dispatch) => {
  return client.query({ query: GET_PRODUCTS(categoryName) }).then((result) => {
    // dispatch(productsAdd(result.data.category.products));
    return result;
  });
};

export default categorySlice.reducer;
