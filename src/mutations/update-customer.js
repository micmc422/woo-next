import { gql } from "@apollo/client";

/**
 * Update Cart
 *
 * This query is used for both updating the items in the cart and delete a cart item.
 * When the cart item needs to be deleted, we should pass quantity as 0 in the input along with other fields.
 */
const UPDATE_CUSTOMER = gql`
  mutation UPDATE_CUSTOMER($input: UpdateCustomerInput!) {
    updateCustomer(input: $input) {
      customer {
        firstName
        shipping {
          country
        }
      }
    }
  }
`;

export default UPDATE_CUSTOMER;
