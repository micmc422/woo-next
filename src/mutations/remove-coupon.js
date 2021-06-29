import { gql } from "@apollo/client";

const REMOVE_COUPON = gql`
  mutation writeReview($input: RemoveCouponsInput!) {
    removeCoupons(input: $input) {
      clientMutationId
      cart {
      appliedCoupons {
        code
      }
    }
    }
  }
`;

export default REMOVE_COUPON;
