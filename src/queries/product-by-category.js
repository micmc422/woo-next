import { gql } from "@apollo/client";

export const PRODUCT_BY_CATEGORY_SLUG = gql`
  query PRODUCT_BY_CATEGORY_SLUG($slug: ID!) {
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
    cat: productCategories(first: 50, where: { parent: null }) {
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
    productCategory(id: $slug, idType: SLUG) {
      id
      databaseId
      name
      products(first: 50) {
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
        nodes {
          id
          productId
          averageRating
          slug
          description
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
          name
          ... on SimpleProduct {
            price
            regularPrice
            id
          }
          ... on VariableProduct {
            price
            regularPrice
            id
          }
          ... on ExternalProduct {
            price
            id
            regularPrice
            externalUrl
          }
          ... on GroupProduct {
            products {
              nodes {
                ... on SimpleProduct {
                  id
                  regularPrice
                  price
                }
              }
            }
            id
          }
        }
      }
    }
  }
`;

export const PRODUCT_CATEGORIES_SLUGS = gql`
  query PRODUCT_CATEGORIES_SLUGS {
    productCategories {
      nodes {
        id
        slug
      }
    }
  }
`;
