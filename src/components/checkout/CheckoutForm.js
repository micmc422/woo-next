import { useState, useContext, useEffect } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import cx from "classnames";

import YourOrder from "./YourOrder";
import PaymentModes from "./PaymentModes";
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

const CheckoutForm = ({ countriesData }) => {
  const route = useRouter();
  const { billingCountries, shippingCountries } = countriesData || {};

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
      //  console.log(data);
      localStorage.setItem("woo-next-cart", JSON.stringify(updatedCart));

      // Update cart data in React Context.
      
      (updatedCart);
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
    onError: (error) => {
      if (error) {
        //  console.log(error?.graphQLErrors);

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
    onCompleted: (res) => {
      console.log(res);
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
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
    //   console.log(input.shipping);
    /**
     * Validate Billing and Shipping Details
     *
     * Note:
     * 1. If billing is different than shipping address, only then validate billing.
     * 2. We are passing theBillingStates?.length and theShippingStates?.length, so that
     * the respective states should only be mandatory, if a country has states.
     */
    /*
    const billingValidationResult = input?.billingDifferentThanShipping
      ? validateAndSanitizeCheckoutForm(
          input?.billing,
          theBillingStates?.length
        )
      : { errors: null, isValid: true };
    const shippingValidationResult = validateAndSanitizeCheckoutForm(
      input?.shipping,
      theShippingStates?.length
    );

    if (!shippingValidationResult.isValid || !billingValidationResult.isValid) {
      setInput({
        ...input,
        billing: { ...input.billing, errors: billingValidationResult.errors },
        shipping: {
          ...input.shipping,
          errors: shippingValidationResult.errors,
        },
      });

      return;
    }
    setCustomerData(customerClean(input.shipping));
    // console.log(customerData);

    await customerUpdate();
    return null;

    if ("stripe" === input.paymentMethod) {
      const createdOrderData = await handleStripeCheckout(
        input,
        cart?.products,
        setRequestError,
        clearCartMutation,
        setIsStripeOrderProcessing,
        setCreatedOrderData
      );
      console.log(createdOrderData);
      return null;
    }
    return null;

    const checkOutData = createCheckoutData(input);
    setRequestError(null);
    */
    /**
     *  When order data is set, checkout mutation will automatically be called,
     *  because 'orderData' is added in useEffect as a dependency.
     */
    /**
    setOrderData(checkOutData);
    return null;
     */
  };

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

    if ("createAccount" === target.name) {
      handleCreateAccount(input, setInput, target);
    } else if ("billingDifferentThanShipping" === target.name) {
      handleBillingDifferentThanShipping(input, setInput, target);
    } else if (isBillingOrShipping) {
      if (isShipping) {
        await handleShippingChange(target);
      } else {
        await handleBillingChange(target);
      }
    } else {
      const newState = { ...input, [target.name]: target.value };

      setInput(newState);
    }
    //  console.log(input);
  };

  const handleShippingChange = async (target) => {
    const newState = {
      ...input,
      shipping: { ...input?.shipping, [target.name]: target.value },
    };
    setInput(newState);
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
      checkout();
    }
  }, [orderData]);

  useEffect(async () => {
    setRequestError(null);

    if (customerResponse || applyCouponResponse) {
      await getCart();
    }
  }, [customerResponse, applyCouponResponse]);

  useEffect(async () => {
    console.log(isPaid);
    if (isPaid) {
      const checkOutData = createCheckoutData(input);
      checkOutData.isPaid = isPaid;
      setRequestError(null);
      console.log(checkOutData);
      setOrderData(checkOutData);
    }
  }, [isPaid]);

  useEffect(async () => {
    const shippingValidationResult = validateAndSanitizeCheckoutForm(
      input?.shipping,
      theShippingStates?.length
    );
    setIsValid(shippingValidationResult.isValid);
    console.log(shippingValidationResult);
    if (shippingValidationResult.isValid) {
      setCustomerData(customerClean(input?.shipping));
      await customerUpdate();
    }
  }, [input]);

  // Loading state
  const isOrderProcessing =
    checkoutLoading || isStripeOrderProcessing || customerLoading;
  //  console.log({ cart });
  return (
    <>
      {cart ? (
        <form onSubmit={handleFormSubmit} className="woo-next-checkout-form">
          <div className="grid grid-cols-1 gap-20 md:grid-cols-2">
            <div>
              {/*Shipping Details*/}
              <div className="billing-details">
                <h2 className="mb-4 text-xl font-medium">Shipping Details</h2>
                <Address
                  states={theShippingStates}
                  countries={shippingCountries}
                  input={input?.shipping}
                  handleOnChange={(event) => handleOnChange(event, true, true)}
                  isFetchingStates={isFetchingShippingStates}
                  isShipping
                  isBillingOrShipping
                />
              </div>
              <div>
                <CheckboxField
                  name="billingDifferentThanShipping"
                  type="checkbox"
                  checked={input?.billingDifferentThanShipping}
                  handleOnChange={handleOnChange}
                  label="Billing different than shipping"
                  containerClassNames="mb-4 pt-4"
                />
              </div>
              {/*Billing Details*/}
              {input?.billingDifferentThanShipping ? (
                <div className="billing-details">
                  <h2 className="mb-4 text-xl font-medium">Billing Details</h2>
                  <Address
                    states={theBillingStates}
                    countries={billingCountries}
                    input={input?.billing}
                    handleOnChange={(event) =>
                      handleOnChange(event, false, true)
                    }
                    isFetchingStates={isFetchingBillingStates}
                    isShipping={false}
                    isBillingOrShipping
                  />
                </div>
              ) : null}
            </div>
            {/* Order & Payments*/}
            <div className="your-orders">
              {/*	Order*/}
              <h2 className="mb-4 text-xl font-medium">Your Order</h2>
              <YourOrder cart={cart} />

              {/*Payment
              <PaymentModes input={input} handleOnChange={handleOnChange} />
*/}
              {cart?.appliedCoupons && (
                <CouponsList coupons={cart?.appliedCoupons} getCart={getCart} />
              )}
              <div className="flex flex-row w-10/12 mx-auto my-5">
                <input
                  onChange={handleCouponChange}
                  // value={inputValue}
                  placeholder={"code"}
                  type={"bouton"}
                  name={"coupon"}
                  className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-gray-100 bg-opacity-50 border-0 border-b-2 border-gray-300 outline-none focus:bg-transparent focus:border-gray-500"
                  id={"coupon-field"}
                />
                <button
                  disabled={applyCouponLoading}
                  className={cx(
                    "bg-brand-500 text-white ml-4 px-5 py-2 rounded xl:w-full max-w-max align-middle inline-block",
                    { "opacity-50": isOrderProcessing }
                  )}
                  type="button"
                  onClick={applyCouponBtn}
                >
                  Apply
                </button>
              </div>
              <StripeInput
                amount={cart.totalProductsPrice}
                setIsPaid={setIsPaid}
              />

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
        </form>
      ) : null}
      {/*	Show message if Order Success*/}
      <OrderSuccess response={checkoutResponse} />
    </>
  );
};

export default CheckoutForm;
