import { gql } from "@apollo/client";

const ADD_COUPON = gql`
  mutation writeReview($input: ApplyCouponInput!) {
    applyCoupon(input: $input) {
      clientMutationId
      applied {
        code
        discountAmount
        discountTax
      }

      cart {
        appliedCoupons {
          code
          discountAmount
          discountTax
        }
      }
    }
  }
`;

export default ADD_COUPON;
