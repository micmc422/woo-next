import { gql } from "@apollo/client";

/**
 * GraphQL categories query.
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
    } */
export const GET_PAGE_BY_URI = gql`
  query MyQuery($uri: ID!) {
    getFooter {
      sidebarOne
      sidebarTwo
    }

    page(id: $uri, idType: URI) {
      id
      title
      content
      seo {
        fullHead
        breadcrumbs {
          text
          url
        }
        schema {
          raw
        }
      }
    }
  }
`;

export const GET_PAGES_URI = gql`
  query {
    pages(where: { notIn: ["7414", " 5751"] }, first: 500) {
      nodes {
        uri
      }
    }
  }
`;
