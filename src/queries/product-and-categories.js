import { gql } from "@apollo/client";

/**
 * GraphQL categories and products query.
 */
const PRODUCTS_AND_CATEGORIES_QUERY = gql`
  query MyQuery($after: String, $search: String, $first: Int, $uri: ID!) {
    menu: menus(where: { location: PRIMARY }) {
      nodes {
        menuItems {
          edges {
            node {
              label
              title
              url
              path
            }
          }
        }
      }
    }
    megamenuCollection: page(id: "7666", idType: DATABASE_ID) {
      id
      content
      uri
      title
    }
    heroCarousel: posts(first: 10, where: { categoryIn: "1543" }) {
      nodes {
        id
        title
        slug
        databaseId
        excerpt
        uri
        featuredImage {
          node {
            id
            sourceUrl
            srcSet
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
        uri
        children {
          nodes {
            count
          }
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
        children {
          nodes {
            count
          }
        }
      }
    }
    seo: page(id: $uri, idType: URI) {
      seo {
        fullHead
      }
    }
    productCategories(where: { include: [1355, 1356, 1062] }) {
      nodes {
        id
        databaseId
        name
        slug
        uri
        image {
          id
          sourceUrl
          srcSet
        }
        products(first: 3) {
          nodes {
            galleryImages {
              nodes {
                sourceUrl
              }
            }
            image {
              sourceUrl
              altText
              srcSet
            }
          }
        }
      }
    }
    products(
      first: $first
      after: $after
      where: { search: $search, orderby: { order: ASC, field: MENU_ORDER } }
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
          id
          productId: databaseId
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
    }
    bestSeller: products(
      first: 8
      where: { orderby: { field: TOTAL_SALES }, categoryIdNotIn: 1063 }
    ) {
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
        }
        name
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
    }
  }
`;

export default PRODUCTS_AND_CATEGORIES_QUERY;
