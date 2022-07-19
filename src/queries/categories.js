import { gql } from "@apollo/client";

export const GET_ALL_CATEGORIES = gql`
  query {
    categories {
      name
      products {
        name
      }
    }
  }
`;

export const GET_CATEGORIES_NAMES = gql`
  query {
    categories {
      name
    }
  }
`;

export const GET_PRODUCTS = (categoryName) => {
  return gql`
    query {
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
    query {
      product(id: "${productName}") {
         name, brand, inStock, category, gallery, description, attributes {
          id, name, type, items {
            displayValue, value, id
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
