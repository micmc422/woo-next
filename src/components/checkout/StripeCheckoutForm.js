import { useState, useContext, useEffect } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import cx from "classnames";

import YourOrder from "./YourOrder";
import { AppContext } from "../context/AppContext";
import validateAndSanitizeCheckoutForm from "../../validator/checkout";
import { getFormattedCart, createCheckoutData } from "../../functions";
import OrderSuccess from "./OrderSuccess";
import GET_CART from "../../queries/get-cart";
import CHECKOUT_MUTATION from "../../mutations/checkout";
import Address from "./Address";
import {
  handleBillingDifferentThanShipping,
  handleCreateAccount,
  setStatesForCountry,
} from "../../utils/checkout";
import CheckboxField from "./form-elements/CheckboxField";
import CLEAR_CART_MUTATION from "../../mutations/clear-cart";
import { useRouter } from "next/dist/client/router";
import UPDATE_CUSTOMER from "../../mutations/update-customer";
import ADD_COUPON from "../../mutations/add-coupon";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import StripeInput from "./form-elements/stripe-checkout";
import CouponsList from "./form-elements/CouponsList";
import CheckoutFormStripeComplex from "./form-elements/stripe-checkout-complex";

// Use this for testing purposes, so you dont have to fill the checkout form over an over again.
// const defaultCustomerInfo = {
// 	firstName: 'Imran',
// 	lastName: 'Sayed',
// 	address1: '123 Abc farm',
// 	address2: 'Hill Road',
// 	city: 'Mumbai',
// 	country: 'IN',
// 	state: 'Maharastra',
// 	postcode: '221029',
// 	email: 'codeytek.academy@gmail.com',
// 	phone: '9883778278',
// 	company: 'The Company',
// 	errors: null
// }

const defaultCustomerInfo = {
  firstName: "",
  lastName: "",
  address1: "",
  address2: "",
  city: "",
  country: "",
  state: "",
  postcode: "",
  email: "",
  phone: "",
  company: "",
  errors: null,
};

const StripeCheckoutForm = ({ countriesData }) => {
  const initialState = {
    billing: {
      ...defaultCustomerInfo,
    },
    shipping: {
      ...defaultCustomerInfo,
    },
    createAccount: false,
    orderNotes: "",
    billingDifferentThanShipping: false,
    paymentMethod: "stripe",
  };

  const [couponCode, setCouponCode] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [cart, setCart] = useContext(AppContext);
  const [input, setInput] = useState(initialState);
  const [orderData, setOrderData] = useState(null);
  const [customerData, setCustomerData] = useState(null);
  const [requestError, setRequestError] = useState(null);
  const [theShippingStates, setTheShippingStates] = useState([]);
  const [isFetchingShippingStates, setIsFetchingShippingStates] = useState(
    false
  );
  const [theBillingStates, setTheBillingStates] = useState([]);
  const [isFetchingBillingStates, setIsFetchingBillingStates] = useState(false);
  const [isStripeOrderProcessing, setIsStripeOrderProcessing] = useState(false);
  const [createdOrderData, setCreatedOrderData] = useState({});

  const stripe = useStripe();
  const elements = useElements();
  // Get Cart Data.
  const [getCart, { data }] = useLazyQuery(GET_CART, {
    fetchPolicy: "no-cache",
    nextFetchPolicy: "no-cache",
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      // Update cart in the localStorage.
      const updatedCart = getFormattedCart(data);
      // console.log({ getCard: data });
      localStorage.setItem("woo-next-cart", JSON.stringify(updatedCart));

      // Update cart data in React Context.

      setCart(updatedCart);
    },
  });

  // Create New order: Checkout Mutation.
  const [
    checkout,
    { data: checkoutResponse, loading: checkoutLoading },
  ] = useMutation(CHECKOUT_MUTATION, {
    variables: {
      input: orderData,
    },
    onCompleted: () => {
      console.log("checkout completed");
    },
    onError: (error) => {
      if (error) {
        setRequestError(error?.graphQLErrors?.[0]?.message ?? "");
      }
    },
  });
  function customerClean(raw) {
    delete raw.errors;
    delete raw.createAccount;
    delete raw.orderNotes;
    // setCustomerData(input.shipping);
    //  console.log(raw);
    const cleaned = raw;
    return cleaned;
  }
  const [
    customerUpdate,
    { data: customerResponse, loading: customerLoading },
  ] = useMutation(UPDATE_CUSTOMER, {
    variables: {
      input: {
        billing: customerClean(input.shipping),
        shipping: customerClean(input.shipping),
      },
    },
    onCompleted: async (data) => {
      await getCart();
    },
    onError: (error) => {
      if (error) {
        console.log(error?.graphQLErrors);

        setRequestError(error?.graphQLErrors?.[0]?.message ?? "");
      }
    },
  });
  const [
    applyCoupon,
    { data: applyCouponResponse, loading: applyCouponLoading },
  ] = useMutation(ADD_COUPON, {
    variables: {
      input: {
        code: couponCode,
      },
    },
    onCompleted: async (res) => {
      console.log(res);
      await getCart();
    },
    onError: (error) => {
      if (error) {
        //  console.log(error?.graphQLErrors);

        setRequestError(error?.graphQLErrors?.[0]?.message ?? "");
      }
    },
  });

  const [clearCartMutation] = useMutation(CLEAR_CART_MUTATION);

  /*
   * Handle form submit.
   *
   * @param {Object} event Event Object.
   *
   * @return {void}
   */
  /*
   * Handle onchange input.
   *
   * @param {Object} event Event Object.
   * @param {bool} isShipping If this is false it means it is billing.
   * @param {bool} isBillingOrShipping If this is false means its standard input and not billing or shipping.
   *
   * @return {void}
   */
  const handleOnChange = async (
    event,
    isShipping = false,
    isBillingOrShipping = false
  ) => {
    const { target } = event || {};
    if (target.name === "name") {
      const name = target.value.split(" ");
      const newState = {
        ...input,
        shipping: {
          ...input.shipping,
          firstName: name[0],
          lastName: name.slice(1).toString(),
        },
        billing: {
          ...input.billing,
          firstName: name[0],
          lastName: name.slice(1).toString(),
        },
      };

      setInput(newState);

      return;
    }
    if ("createAccount" === target.name) {
      handleCreateAccount(input, setInput, target);
    } else if (
      "billingDifferentThanShipping" === target.name &&
      target.value === true
    ) {
      handleBillingDifferentThanShipping(input, setInput, target);
    } else if (isBillingOrShipping) {
      if (isShipping) {
        await handleShippingChange(target);
      } else {
        await handleBillingChange(target);
      }
    } else {
      const newState = {
        ...input,
        [target.name]: target.value,
      };

      setInput(newState);
    }
    //  console.log(input);
  };

  const handleShippingChange = async (target) => {
    const newState = {
      ...input,
      shipping: { ...input?.shipping, [target.name]: target.value },
    };
    console.log(target.value);
    !input.billingDifferentThanShipping
      ? (newState.billing = newState.shipping)
      : null;

    setInput(newState);
    console.log(target.name);
    await setStatesForCountry(
      target,
      setTheShippingStates,
      setIsFetchingShippingStates
    );
  };

  const handleBillingChange = async (target) => {
    const newState = {
      ...input,
      billing: { ...input?.billing, [target.name]: target.value },
    };
    console.log({ newState });
    setInput(newState);
    await setStatesForCountry(
      target,
      setTheBillingStates,
      setIsFetchingBillingStates
    );
  };

  function handleCouponChange(e) {
    console.log(e.target.value);
    setCouponCode(e.target.value);
  }
  async function applyCouponBtn(e) {
    console.log("applyCouponBtn");
    console.log(couponCode);
    await applyCoupon();
  }

  useEffect(async () => {
    await getCart();
    if (null !== orderData) {
      const checkOutRes = await checkout();
      console.log(checkOutRes);
    }
  }, [orderData]);
  /*
  useEffect(async () => {
    setRequestError(null);

    if (customerResponse || applyCouponResponse) {
      await getCart();
    }
  }, [customerResponse, applyCouponResponse]);
   */

  useEffect(() => {
    //  console.log(isPaid);
    if (isPaid) {
      const checkOutData = createCheckoutData(input);
      checkOutData.isPaid = isPaid;
      setRequestError(null);
      console.log(checkOutData);
      setOrderData(checkOutData);
    }
  }, [isPaid]);

  useEffect(async () => {
    //   console.log(input?.shipping);
    const shippingValidationResult = validateAndSanitizeCheckoutForm(
      input?.shipping,
      theShippingStates?.length
    );
    setIsValid(shippingValidationResult.isValid);
    setCustomerData(customerClean(input?.shipping));
    if (shippingValidationResult.isValid) {
      await customerUpdate();
    }
  }, [input]);

  // Loading state
  const isOrderProcessing =
    checkoutLoading || isStripeOrderProcessing || customerLoading;
  return (
    <>
      {cart ? (
        <div className="woo-next-checkout-form">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <CheckoutFormStripeComplex
              stripe={stripe}
              amount={cart.totalProductsPrice}
              setIsPaid={setIsPaid}
              isValid={!isValid || isOrderProcessing}
              countriesData={countriesData}
              theShippingStates={theShippingStates}
              handleOnChange={handleOnChange}
              isShipping={true}
              input={input}
              isFetchingStates={isFetchingBillingStates}
            />
            <div className={`w-full md:w-2/3 mx-auto`}>
              {" "}
              <div className="your-orders">
                {/*	Order*/}
                <h2 className="mb-4 text-xl font-medium">Your Order</h2>
                <YourOrder cart={cart} />

                {/*Payment
              <PaymentModes input={input} handleOnChange={handleOnChange} />
*/}
                {cart?.appliedCoupons && (
                  <CouponsList
                    coupons={cart?.appliedCoupons}
                    getCart={getCart}
                  />
                )}

                <div className="mt-5 woo-next-place-order-btn-wrap">
                  <button
                    disabled={!isValid || isOrderProcessing}
                    className={cx(
                      "bg-purple-600 text-white px-5 py-3 rounded-sm w-auto xl:w-full",
                      { "opacity-50": !isValid || isOrderProcessing }
                    )}
                    type="submit"
                  >
                    Place Order
                  </button>
                </div>
                {/* Checkout Loading*/}
                {isOrderProcessing && <p>Processing Order...</p>}
                {requestError && (
                  <p>Error : {requestError} :( Please try again</p>
                )}
              </div>
            </div>
            {/* Order & Payments*/}
          </div>
        </div>
      ) : null}
      {/*	Show message if Order Success*/}
      <OrderSuccess response={checkoutResponse} />
    </>
  );
};

export default StripeCheckoutForm;
