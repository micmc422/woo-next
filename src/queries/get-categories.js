import { gql } from "@apollo/client";

/**
 * GraphQL categories query.
 */
const GET_CATEGORIES_QUERY = gql`
  query {
    productCategories(first: 3) {
      nodes {
        id
        name
        slug
        image {
          sourceUrl
          altText
        }
      }
    }
  }
`;
export const GET_CATEGORIES_QUERY_FULL = gql`
  query {
    productCategories(first: 100) {
      nodes {
        id
        name
        slug
        image {
          id
          uri
          title
          srcSet
          sourceUrl
          mediaDetails {
            height
            width
          }
        }
        products {
          nodes {
            image {
              id
              uri
              title
              srcSet
              sourceUrl
              mediaDetails {
                height
                width
              }
            }

            galleryImages(first: 1) {
              nodes {
                id
                title
                altText
                mediaItemUrl
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
  }
`;

export default GET_CATEGORIES_QUERY;
