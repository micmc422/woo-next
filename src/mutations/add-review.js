import { gql } from "@apollo/client";

const ADD_REVIEW = gql`
  mutation writeReview($input: WriteReviewInput!) {
    writeReview(input: $input) {
      clientMutationId
      rating
      review {
        author {
          node {
            name
            email
          }
        }
      }
    }
  }
`;

export default ADD_REVIEW;
