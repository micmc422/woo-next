import { useState, useContext, useEffect } from "react";
import Billing from "./Billing";
import YourOrder from "./YourOrder";
import PaymentModes from "./PaymentModes";
import { AppContext } from "../context/AppContext";
import validateAndSanitizeCheckoutForm from "../../validator/checkout";
import { useMutation, useQuery } from "@apollo/client";
import { getFormattedCart, createCheckoutData } from "../../functions";
import OrderSuccess from "./OrderSuccess";
import GET_CART from "../../queries/get-cart";
import CHECKOUT_MUTATION from "../../mutations/checkout";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckoutForm from "./StripeCheckout";

const promise = loadStripe(
  "pk_test_51HtCQlFIWeEGR1HAQFSJNZfBTbohYe6xZ8P3M4ftO5pbOUVodzBr9DNDCnlYL16wxRRy3UWEevPAXuTWhwhrnmMB007Xq5lzWP"
);

const CheckoutForm = () => {
  const defaultCustomerInfo = {
    firstName: "",
    lastName: "",
    company: "",
    country: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postcode: "",
    phone: "",
    email: "",
    createAccount: false,
    orderNotes: "",
    paymentMethod: "STRIPE",
    errors: null,
  };
  // Use this for testing purposes, so you dont have to fill the checkout form over an over again.
  // const initialState = {
  // 	firstName: 'Imran',
  // 	lastName: 'Sayed',
  // 	address1: '109 Hills Road Valley',
  // 	address2: 'Station Road',
  // 	city: 'Pune',
  // 	state: 'Maharastra',
  // 	country: 'ID',
  // 	postcode: '400298',
  // 	phone: '9959338989',
  // 	email: 'imran@gmail.com',
  // 	company: 'Tech',
  // 	createAccount: false,
  // 	orderNotes: '',
  // 	paymentMethod: 'cod',
  // 	errors: null
  // };
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
    paymentMethod: "Stripe",
  };
  const [isValid, setIsValid] = useState(false);
  const [cart, setCart] = useContext(AppContext);
  const [input, setInput] = useState(initialState);
  const [orderData, setOrderData] = useState(null);
  const [requestError, setRequestError] = useState(null);
  // console.log(input);

  // Get Cart Data.
  const { loading, error, data, refetch } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      // console.warn( 'completed GET_CART' );

      // Update cart in the localStorage.
      const updatedCart = getFormattedCart(data);
      localStorage.setItem("woo-next-cart", JSON.stringify(updatedCart));

      // Update cart data in React Context.
      setCart(updatedCart);
    },
  });

  /*
   * Handle onchange input.
   *
   * @param {Object} event Event Object.
   *
   * @return {void}
   */
  const handleOnChange = (event) => {
    if ("createAccount" === event.target.name) {
      const newState = { ...input, [event.target.name]: !input.createAccount };
      setInput(newState);
    } else {
      const newState = { ...input, [event.target.name]: event.target.value };
      setInput(newState);
    }
  };

  useEffect(() => {
    if (null !== orderData) {
      // Call the checkout mutation when the value for orderData changes/updates.
      // checkout();
      // console.log(orderData);
    }
  }, [orderData]);

  useEffect(() => {
    if (null !== input) {
      const result = validateAndSanitizeCheckoutForm(input);
      setIsValid(result.isValid);
      if (result.isValid) {
        const checkOutData = createCheckoutData(input);
        setOrderData(checkOutData);
        setRequestError(null);
      }
    }
    //console.log(orderData);
  }, [input]);
  // console.log(orderData);
  return (
    <>
      {cart ? (
        <div className="grid grid-cols-1 gap-20 md:grid-cols-2">
          <form className="woo-next-checkout-form">
            <div>
              {/*Billing Details*/}
              <div className="billing-details">
                <h2 className="mb-4 text-xl font-medium">Billing Details</h2>
                <Billing input={input} handleOnChange={handleOnChange} />
              </div>
              {/* Order & Payments*/}
            </div>
          </form>
          <div>
            {" "}
            <div className="your-orders">
              {/*	Order*/}
              <h2 className="mb-4 text-xl font-medium">Your Order</h2>
              <YourOrder cart={cart} />
              <div className="max-w-md mx-auto">
                {" "}
                {isValid && orderData ? (
                  <Elements stripe={promise}>
                    <StripeCheckoutForm
                      amount={cart.totalProductsPrice
                        .replace("€", "")
                        .replace(",", ".")}
                      orderData={orderData}
                      cart={cart}
                    />
                  </Elements>
                ) : (
                  <div>Info manquantes</div>
                )}
              </div>
              {/*Payment              <PaymentModes input={input} handleOnChange={handleOnChange} />   
              <div className="max-w-md mx-auto">
                <button
                  className="w-auto px-5 py-3 text-white rounded-sm bg-brand-600 xl:w-full"
                  type="submit"
                >
                  Place Order
                </button>
              </div>  */}
              {/* Checkout Loading*/}
              {requestError && (
                <p>Error : {requestError} :( Please try again</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default CheckoutForm;
