import { client } from "../index";
import { GET_PRODUCT, GET_PRODUCTS } from "../queries/categories";

export const getProducts = async (categoryName) => {
  const response = await client.query({ query: GET_PRODUCTS(categoryName) });
  return response;
};

export const getProduct = async (productName) => {
  const response = await client.query({ query: GET_PRODUCT(productName) });
  return response;
};
