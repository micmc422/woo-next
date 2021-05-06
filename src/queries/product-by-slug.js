import { gql } from "@apollo/client";

export const PRODUCT_BY_SLUG_QUERY = gql`
  query Product($slug: ID!) {
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
   product(id: $slug, idType: SLUG) {
      id
      productId
      averageRating
      slug
      description
	  reviewCount
      reviews {
        averageRating
      }
      galleryImages {
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
      productCategories {
        nodes {
          slug
          name
          description
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
      name
      ... on SimpleProduct {
        price
        id
        regularPrice
      }
      ... on VariableProduct {
        price
        id
        regularPrice
        variations {
          nodes {
            name
            price
            manageStock
            regularPrice
            salePrice
            stockQuantity
            status
            variationId
            id
          }
        }
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
