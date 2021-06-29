import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { trim } from "lodash";
import { useEffect, useState } from "react";
// import { wp_api_rest_push_order } from "../../lib/graphql-utils";

function StripeInput({ amount, commande, userInfo, setIsPaid, isValid }) {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  // console.log(parseFloat(amount.replace(",", ".")).toFixed(2));
  useEffect(() => {
    let isMounted = true;
    // Create PaymentIntent as soon as the page loads
    window
      .fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: parseFloat(amount.replace(",", ".")).toFixed(2),
        }),
      })
      .then((res) => {
        // console.log(res.json());

        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (isMounted) setClientSecret(data.client_secret);
      })
      .catch((err) => console.log(err));
    return () => {
      isMounted = false;
    };
  }, [amount]);

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
      setIsPaid(true);
    }
  };
  console.log(isValid);
  return (
    <>
      <form
        id="payment-form"
        // onSubmit={handleSubmit}
      >
        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
        />
        <button
          disabled={isValid || processing || disabled || succeeded}
          id="submit"
          type="bouton"
          onClick={handleSubmit}
        >
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
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

export default StripeInput;
