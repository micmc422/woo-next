import { gql } from "@apollo/client";

export const PRODUCT_BY_SLUG_QUERY = gql`
  query Product($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      id
      productId: databaseId
      averageRating
      slug
      shortDescription
      description
      name
      seo {
        fullHead
        schema {
          raw
        }
      }
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
      galleryImages {
        nodes {
          sourceUrl
          mediaItemUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
      ... on SimpleProduct {
        price
        id
        regularPrice
      }
      ... on VariableProduct {
        price
        id
        regularPrice
        variations(where: { orderby: { field: PRICE, order: DESC } }) {
          nodes {
            productId: databaseId
            name
            id
            price
          }
        }
      }
      ... on ExternalProduct {
        price
        id
        productId: databaseId
        regularPrice
        externalUrl
      }
      ... on GroupProduct {
        products {
          nodes {
            ... on SimpleProduct {
              id
              price
              regularPrice
            }
          }
        }
        id
      }
    }
  }
`;

export const PRODUCT_SLUGS = gql`
  query Products {
    products(first: 5000) {
      nodes {
        id
        slug
      }
    }
  }
`;
