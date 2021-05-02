import { gql } from "@apollo/client";

export const CORE_PRODUCT_FIELDS = gql`
  fragment CoreProductDetails on Product {
      
    id
    productId
    averageRating
    slug
    description
    name
    image {
      id
      uri
      title
      srcSet
      sourceUrl
    }
    ... on SimpleProduct {
      price
      regularPrice
      id
    }

    ... on VariableProduct {
      price
      id
      regularPrice
    }

    ... on ExternalProduct {
      price
      id
      externalUrl
      regularPrice
    }

    ... on GroupProduct {
      id
      products {
        nodes {
          ... on SimpleProduct {
            id
            price
            regularPrice
          }
        }
      }
    }
  }
`;
