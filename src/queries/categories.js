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

// export const GET_CATEGORY = gql``;
