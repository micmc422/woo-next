import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import axios from "axios";
import Router from "next/router";
import { CARD_OPTIONS } from "../../constants/stripe";

const StripeCheckoutForm = ({ orderData }) => {
  const { orderId, total, currency } = orderData || {};
  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();

  const stripe = useStripe();
  const elements = useElements();

  /**
   * The cardElements onChange prop can be used to
   * add a handler for setting any errors.
   * @param event
   */
  const handleCardDetailsChange = (event) => {
    event.error ? setCheckoutError(event.error.message) : setCheckoutError();
  };

  const handleFormSubmit = async (ev) => {
    ev.preventDefault();

    /**
     * We disable the form, until the stripe.js has finished
     * loading.
     */
    if (!stripe || !elements) {
      return;
    }

    const billingDetails = {
      name: "Imran Sayed",
      email: "codeytek@gmail.com",
      address: {
        city: "Pune",
        line1: "Address 1",
        state: "my state",
        postal_code: "2200",
      },
    };

    setProcessingTo(true);

    const cardElement = elements.getElement("card");

    try {
      const { data: clientSecret } = await axios.post(
        "/api/stripe-payment-intent",
        {
          amount: total * 100,
          currency: currency.toLowerCase(),
        }
      );

      const paymentMethodReq = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: billingDetails,
      });

      if (paymentMethodReq.error) {
        setCheckoutError(paymentMethodReq.error.message);
        setProcessingTo(false);
        return;
      }

      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: paymentMethodReq.paymentMethod.id,
        }
      );

      if (error) {
        setCheckoutError(error.message);
        setProcessingTo(false);
        return;
      }

      // On successful payment, redirect to thank you page.
      await Router.push("/thank-you");
    } catch (err) {
      setCheckoutError(err.message);
    }
  };

  return (
    <div className="stripe-form-container">
      <form
        onSubmit={handleFormSubmit}
        className="px-4 py-6 m-auto border stripe-form w-308px lg:w-600px lg:px-8 lg:py-10"
      >
        <h2 className="mb-6 text-white uppercase font-600">
          Stripe Payment: Pay with card
        </h2>
        <div className="mb-4">
          <h6 className="mb-1 text-sm text-white">Card Information</h6>
          <CardElement
            options={CARD_OPTIONS}
            onChange={handleCardDetailsChange}
          />
        </div>
        {checkoutError ? (
          <div className="my-4 text-sm text-white">{checkoutError}</div>
        ) : null}
        <button
          className="px-4 py-2 font-bold text-white bg-pink-400 hover:bg-pink-300"
          disabled={isProcessing || !stripe}
          aria-label={isProcessing ? "Processing..." : `Pay ${total}`}
        >
          {isProcessing ? "Processing..." : `Pay ${total}`}
        </button>
      </form>
    </div>
  );
};

export default StripeCheckoutForm;
