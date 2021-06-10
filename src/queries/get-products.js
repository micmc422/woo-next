import { gql } from "@apollo/client";

/**
 * GraphQL categories query.
 */
const GET_PRODUCTS_QUERY = gql`
  query getProduct(
    $first: Int
    $last: Int
    $after: String
    $before: String
    $search: String
    $category: String
    $categoryIn: [String]
    $maxPrice: Float
    $minPrice: Float
    $tagIn: [String]
    $tag: String
  ) {
    products(
      first: $first
      last: $last
      after: $after
      before: $before
      where: {
        status: "publish"
        visibility: VISIBLE
        search: $search
        category: $category
        categoryIn: $categoryIn
        tag: $tag
        tagIn: $tagIn
        maxPrice: $maxPrice
        minPrice: $minPrice
        orderby: { order: ASC, field: MENU_ORDER }
      }
    ) {
      nodes {
        id
        productId: databaseId
        averageRating
        reviewCount
        slug
        description
        reviewCount
        productCategories {
          nodes {
            name
            slug
            uri
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
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;

export default GET_PRODUCTS_QUERY;
