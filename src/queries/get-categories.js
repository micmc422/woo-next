import { gql } from "@apollo/client";

/**
 * GraphQL categories query.
 */
const GET_CATEGORIES_QUERY = gql`
  query {
    productCategories(first: 3) {
      nodes {
        id
        databaseId
        name
        slug
        image {
          sourceUrl
          srcSet
        }
      }
    }
  }
`;
export const GET_CATEGORIES_BASE = gql`
  query categoriesBase($parent: Int) {
    productCategories(first: 50, where: { parent: $parent }) {
      nodes {
        id
        databaseId
        name
        slug
        children {
          nodes {
            count
          }
        }
      }
    }
  }
`;

export default GET_CATEGORIES_QUERY;
