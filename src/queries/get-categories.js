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
        uri
        image {
          sourceUrl
          srcSet
        }
      }
    }
  }
`;
export const GET_CATEGORIES_QUERY_FULL = gql`
  query {
    productCategories(first: 99) {
      nodes {
        id
        databaseId
        name
        slug
        uri
        image {
          sourceUrl
          srcSet
          mediaDetails {
              height
              width
            }
        }
        products {
          nodes {
            image {
              sourceUrl
              srcSet
              mediaDetails {
                height
                width
              }
            }
          }
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
        uri
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
