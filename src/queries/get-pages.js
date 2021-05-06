import { gql } from "@apollo/client";

/**
 * GraphQL categories query.
 */
export const GET_PAGE_BY_URI = gql`
  query MyQuery($uri: ID!) {
    megamenuCollection: page(id: "7666", idType: DATABASE_ID) {
      id
      content
      uri
      title
    }
    menu: menus(first: 1, where: { id: 6 }) {
      nodes {
        menuItems {
          edges {
            node {
              label
              title
              url
            }
          }
        }
      }
    }
    page(id: $uri, idType: URI) {
      id
      content
    }
  }
`;

export const GET_PAGES_URI = gql`
  query {
    pages(first: 5000) {
      nodes {
        uri
      }
    }
  }
`;
