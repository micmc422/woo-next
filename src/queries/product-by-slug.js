import { gql } from "@apollo/client";

export const PRODUCT_BY_SLUG_QUERY = gql`
  query Product($slug: ID!) {
    getFooter {
      sidebarOne
      sidebarTwo
    }
    coupons {
      nodes {
        amount
        code
        dateExpiry
        description
        discountType
        excludeSaleItems
        freeShipping
        individualUse
        maximumAmount
        minimumAmount
        usageCount
        usageLimit
        usageLimitPerUser
      }
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
          description
          uri
        }
      }
      productTags {
        nodes {
          name
          description
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
        paPrintSizes {
          nodes {
            name
            uri
          }
        }
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
