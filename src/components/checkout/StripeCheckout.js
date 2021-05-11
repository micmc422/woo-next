import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import client from "../../components/ApolloClient";
import { PUSH_ORDER_MUTATION } from "../../mutations/checkout";

async function pushOrder(input) {
  console.log(input);
  const { clientMutationId, shipping, lineItems } = input;
  console.log({ clientMutationId, shipping, lineItems });
  try {
    const { data } = await client.mutate({
      mutation: PUSH_ORDER_MUTATION,
      variables: {
        input: {
          clientMutationId,
          billing: shipping,
          shipping,
          lineItems,
          isPaid: true,
          paymentMethodTitle: "STRIPE",
        },
      },
    });
    return await {
      data,
    };
  } catch (error) {
    console.log(error);
    return error;
  }
  /*
   */
}

export default function StripeCheckoutForm({ amount, orderData, cart }) {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  // console.log(orderData);
  useEffect(() => {
    let isMounted = true;
    // Create PaymentIntent as soon as the page loads
    window
      .fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.statusCode === 500) console.log(data.message);

        if (isMounted && data.client_secret)
          setClientSecret(data.client_secret);
      });
    return () => {
      isMounted = false;
    };
  }, [amount]);

  useEffect(() => {
    console.log(cart?.products);
    const orderToPush = {
      ...orderData,
      lineItems: cart?.products.map((item) => {
        return {
          productId: item.productId,
          variationId: item.variationId,
          quantity: item.qty,
          // subtotal: +item.price,
          total: item.totalPrice,
        };
      }),
    };
    // Envoi la commande si le paiement est validée
    succeeded && pushOrder(orderToPush);
  }, [succeeded]);
  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };
  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    // console.log(clientSecret);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };
  return (
    <>
      <form id="payment-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
        />
        <button disabled={processing || disabled || succeeded} id="submit">
          <span id="button-text">
            {processing ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Commander"
            )}
          </span>
        </button>
        {/* Show any error that happens when processing the payment */}
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        {/* Show a success message upon completion */}
        <p className={succeeded ? "result-message" : "result-message hidden"}>
          Payment succeeded, see the result in your
          <a href={`https://dashboard.stripe.com/test/payments`}>
            {" "}
            Stripe dashboard.
          </a>{" "}
          Refresh the page to pay again.
        </p>
      </form>
    </>
  );
}
