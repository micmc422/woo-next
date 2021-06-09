import { gql } from "@apollo/client";

export const PRODUCT_BY_CATEGORY_SLUG = gql`
  query PRODUCT_BY_CATEGORY_SLUG($uri: ID!, $uriMenu: ID!) {
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
    cat: productCategory(id: $uriMenu, idType: URI) {
      children(first: 50) {
        nodes {
          id
          name
          slug
          uri
        }
      }
    }
    catBase: productCategories(first: 50, where: { parent: null }) {
      nodes {
        id
        databaseId
        name
        slug
        uri
      }
    }
    tagList: productTags(first: 100, where: { orderby: COUNT, order: DESC }) {
      nodes {
        id
        name
        slug
        uri
        count
      }
    }

    productCategory(id: $uri, idType: URI) {
      id
      name
      uri
      seo {
        fullHead
        schema {
          raw
        }
      }
      products(
        first: 24
        after: ""
        where: {
          orderby: { order: ASC, field: MENU_ORDER }
          status: "publish"
          visibility: VISIBLE
        }
      ) {
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
        nodes {
          id
          productId: databaseId

          averageRating
          slug
          description
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
    productCategories(first: 1000) {
      nodes {
        id
        slug
        uri
      }
    }
  }
`;
