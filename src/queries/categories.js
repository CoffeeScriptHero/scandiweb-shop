import { gql } from "@apollo/client";

export const GET_CATEGORIES_NAMES = gql`
  {
    categories {
      name
    }
  }
`;

export const GET_PRODUCTS = (categoryName) => {
  return gql`
     {
      category(input: { title: "${categoryName}" }) {
        products {
          id, name, brand, inStock, gallery, description, prices {
            currency {
              label, symbol
            } amount
          } attributes {
            id, name, type, items {
              displayValue, value, id
            } 
          }
        }
      }
    }
  `;
};

export const GET_PRODUCT = (productName) => {
  return gql`
     {
      product(id: "${productName}") {
         id, name, brand, inStock, category, gallery, description, attributes {
          name, type, items {
            value, id
          } 
        } prices {
          currency {
            label, symbol
          } amount
        }
      }
    }
  `;
};
