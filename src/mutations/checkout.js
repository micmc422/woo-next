import gql from "graphql-tag";

const CHECKOUT_MUTATION = gql`
  mutation CHECKOUT_MUTATION($input: CheckoutInput!) {
    checkout(input: $input) {
      clientMutationId
      order {
        id
        orderKey
        refunds {
          nodes {
            amount
          }
        }
        status
      }
      result
      redirect
    }
  }
`;

export const PUSH_ORDER_MUTATION = gql`
  mutation PUSH_ORDER_MUTATION($input: CreateOrderInput!) {
    __typename
    createOrder(input: $input) {
      clientMutationId
      order {
        cartHash
        billing {
          address1
          address2
          city
          company
          country
          email
          firstName
          lastName
          phone
          postcode
          state
        }
        transactionId
        lineItems {
          nodes {
            productId
          }
        }
      }
    }
  }
`;
export default CHECKOUT_MUTATION;
