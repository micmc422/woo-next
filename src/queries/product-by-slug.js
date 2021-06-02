import { gql } from "@apollo/client";

export const PRODUCT_BY_SLUG_QUERY = gql`
  query Product($slug: ID!) {
    getFooter {
      sidebarOne
      sidebarTwo
    }
    product(id: $slug, idType: SLUG) {
      id
      productId: databaseId
      averageRating
      slug
      shortDescription
      description
      name
      reviewCount
      seo {
        fullHead
        schema {
          raw
        }
      }
      reviews {
        nodes {
          content
          date
          author {
            node {
              name
            }
          }
        }
      }
      image {
        id
        uri
        title
        srcSet
        sourceUrl
        altText
        mediaDetails {
          height
          width
        }
      }
      galleryImages {
        nodes {
          id
          sourceUrl
          mediaItemUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
      productCategories {
        nodes {
          name
          uri
        }
      }
      productTags {
        nodes {
          name
          uri
        }
      }
      related(first: 8) {
        nodes {
          name
          image {
            sourceUrl
            altText
          }
          slug
        }
      }
      upsell {
        nodes {
          name
          image {
            sourceUrl
            altText
          }
          slug
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
