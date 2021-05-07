import { gql } from "@apollo/client";

/**
 * GraphQL categories and products query.
 */
const PRODUCTS_AND_CATEGORIES_QUERY = gql`
  query MyQuery($after: String, $search: String) {
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
        children {
          nodes {
            count
          }
        }
      }
    }
    productCategories(where: { include: [1355, 1356, 1062] }) {
      nodes {
        id
        databaseId
        name
        slug
        image {
          id
          sourceUrl
          srcSet
        }
        products(first: 3) {
          nodes {
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
      first: 24
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
    bestSeller: products(first: 8, where: { categoryId: 1355 }) {
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
