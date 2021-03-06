// This example shows you how to set up React Stripe.js and use Elements.
// Learn how to accept a payment using the official Stripe docs.
// https://stripe.com/docs/payments/accept-a-payment#web

import { CardElement } from "@stripe/react-stripe-js";
import { uniqueId } from "lodash";
import React from "react";
import { AnimationValueChange } from "../../themeComponents";
import CountrySelection from "../CountrySelection";
import StatesSelection from "../StatesSelection";
import { FaTruck, FaHandHoldingUsd } from "react-icons/fa";
import { AnimateSharedLayout, motion } from "framer-motion";
const { flag } = require("country-emoji");

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#777",
      color: "#111827",
      fontWeight: 500,
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#6B7280",
      },
      "::placeholder": {
        color: "#9CA3AF",
      },
    },
    invalid: {
      iconColor: "#F87171",
      color: "#F87171",
    },
  },
};

const CardField = ({ onChange }) => (
  <div className="FormRow">
    <CardElement options={CARD_OPTIONS} onChange={onChange} />
  </div>
);

const Field = ({
  label,
  id,
  type,
  placeholder,
  required,
  autoComplete,
  value,
  onChange,
}) => (
  <div className="FormRow">
    <label htmlFor={id} className="FormRowLabel">
      {label}
    </label>
    {type === "textarea" ? (
      <textarea
        className="FormRowInput"
        id={id}
        name={id}
        type="textarea"
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
      />
    ) : (
      <input
        className="FormRowInput"
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
      />
    )}
  </div>
);

const SubmitButton = ({ processing, error, children, disabled }) => (
  <button
    className={`SubmitButton ${
      error ? "SubmitButton--error" : ""
    }  transition-all`}
    type="submit"
    disabled={processing || disabled}
  >
    {processing ? "Processing..." : children}
  </button>
);

const ErrorMessage = ({ children, onClick }) => (
  <div className="select-none ErrorMessage" role="alert" onClick={onClick}>
    <svg width="16" height="16" viewBox="0 0 17 17">
      <path
        fill="#FFF"
        d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
      />
      <path
        fill="#1F2937"
        d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
      />
    </svg>
    {children}
  </div>
);

const ResetButton = ({ onClick }) => (
  <button type="button" className="ResetButton" onClick={onClick}>
    <svg width="32px" height="32px" viewBox="0 0 32 32">
      <path
        fill="#FFF"
        d="M15,7.05492878 C10.5000495,7.55237307 7,11.3674463 7,16 C7,20.9705627 11.0294373,25 16,25 C20.9705627,25 25,20.9705627 25,16 C25,15.3627484 24.4834055,14.8461538 23.8461538,14.8461538 C23.2089022,14.8461538 22.6923077,15.3627484 22.6923077,16 C22.6923077,19.6960595 19.6960595,22.6923077 16,22.6923077 C12.3039405,22.6923077 9.30769231,19.6960595 9.30769231,16 C9.30769231,12.3039405 12.3039405,9.30769231 16,9.30769231 L16,12.0841673 C16,12.1800431 16.0275652,12.2738974 16.0794108,12.354546 C16.2287368,12.5868311 16.5380938,12.6540826 16.7703788,12.5047565 L22.3457501,8.92058924 L22.3457501,8.92058924 C22.4060014,8.88185624 22.4572275,8.83063012 22.4959605,8.7703788 C22.6452866,8.53809377 22.5780351,8.22873685 22.3457501,8.07941076 L22.3457501,8.07941076 L16.7703788,4.49524351 C16.6897301,4.44339794 16.5958758,4.41583275 16.5,4.41583275 C16.2238576,4.41583275 16,4.63969037 16,4.91583275 L16,7 L15,7 L15,7.05492878 Z M16,32 C7.163444,32 0,24.836556 0,16 C0,7.163444 7.163444,0 16,0 C24.836556,0 32,7.163444 32,16 C32,24.836556 24.836556,32 16,32 Z"
      />
    </svg>
  </button>
);

const DEFAULT_STATE = {
  error: null,
  cardComplete: false,
  processing: false,
  paymentMethod: null,
  email: "",
  phone: "",
  name: "",
  address1: "",
  city: "",
  postcode: "",
  country: "FR",
  coupon: "",
};

class CheckoutFormStripeComplex extends React.Component {
  constructor(props) {
    super(props);
    this.state = DEFAULT_STATE;
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { stripe, elements } = this.props;
    const {
      email,
      phone,
      name,
      error,
      address1,
      postcode,
      city,
      country,
      coupon,
      cardComplete,
    } = this.state;
    console.log(this.state);
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    if (error) {
      card.focus();
      return;
    }

    if (cardComplete) {
      this.setState({ processing: true });
    }

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card,
      billing_details: {
        email,
        phone,
        name,
        address1,
        postcode,
        city,
        country,
        state,
        coupon,
      },
    });

    this.setState({ processing: false });

    if (payload.error) {
      this.setState({ error: payload.error });
    } else {
      this.setState({ paymentMethod: payload.paymentMethod });
    }
  };

  reset = () => {
    this.setState(DEFAULT_STATE);
  };

  render() {
    const {
      error,
      processing,
      paymentMethod,
      name,
      email,
      phone,
      address1,
      postcode,
      city,
      country,
      isShipping,
      coupon,
    } = this.state;
    const {
      stripe,
      countriesData: { shippingCountries },
      theShippingStates,
      amount,
      handleOnChange,
      isValid,
      input,
      cart,
      states,
      isFetchingStates,
    } = this.props;
    console.log(!isValid && (processing || !stripe));
    return paymentMethod ? (
      <div className="Result">
        <div className="ResultTitle" role="alert">
          Payment successful
        </div>
        <div className="ResultMessage">
          Thanks for trying Stripe Elements. No money was charged, but we
          generated a PaymentMethod: {paymentMethod.id}
        </div>
        <ResetButton onClick={this.reset} />
      </div>
    ) : (
      <>
        <form className="relative Form" onSubmit={this.handleSubmit}>
          <fieldset className="FormGroup">
            <Field
              label="Name"
              id="name"
              type="text"
              placeholder="Jane Doe"
              required
              autoComplete="name"
              value={name}
              onChange={(event) => {
                this.setState({ name: event.target.value });
                handleOnChange(event, true, true);
              }}
            />
            <Field
              label="Email"
              id="email"
              type="email"
              placeholder="janedoe@gmail.com"
              required
              autoComplete="email"
              value={email}
              onChange={(event) => {
                this.setState({ email: event.target.value });
                handleOnChange(event, true, true);
              }}
            />
            <Field
              label="adresse"
              id="address1"
              type="textarea"
              placeholder="votre adresse"
              required
              autoComplete="address"
              value={address1}
              onChange={(event) => {
                this.setState({ address1: event.target.value });
                handleOnChange(event, true, true);
              }}
            />
            <Field
              label="Ville"
              id="city"
              type="text"
              placeholder="city"
              required
              autoComplete="locality"
              value={city}
              onChange={(event) => {
                this.setState({ city: event.target.value });
                handleOnChange(event, true, true);
              }}
            />
            <Field
              label="CP"
              id="postcode"
              type="postcode"
              placeholder="code postal"
              required
              autoComplete="postal-code"
              value={postcode}
              onChange={(event) => {
                this.setState({ postcode: event.target.value });
                handleOnChange(event, true, true);
              }}
            />
            {/*
          <DropDownField
            label="country"
            id="country"
            placeholder="selectionner votre pays"
            required
            autoComplete="country"
            value={country}
            enumList={shippingCountries}
            onChange={(event) => {
              this.setState({ country: event.target.value });
              handleOnChange(event, true, true);
            }}
          />
          */}
            <CountrySelection
              input={input}
              onChange={(event) => {
                this.setState({ country: event.target.value });
                handleOnChange(event, true, true);
              }}
              countries={shippingCountries}
              isShipping={isShipping}
            />

            <StatesSelection
              input={input}
              onChange={(event) => {
                this.setState({ state: event.target.value });
                handleOnChange(event, true, true);
              }}
              states={theShippingStates}
              isShipping={isShipping}
              isFetchingStates={isFetchingStates}
            />
            <Field
              label="Phone"
              id="phone"
              type="tel"
              placeholder="(941) 555-0123"
              required
              autoComplete="tel"
              value={phone}
              onChange={(event) => {
                this.setState({ phone: event.target.value });
                handleOnChange(event, true, true);
              }}
            />
            <Field
              label="Code"
              id="coupon"
              type="text"
              placeholder="Votre code promo"
              // autoComplete="code-promo"
              value={coupon}
              onChange={(event) => {
                this.setState({ coupon: event.target.value });
                handleOnChange(event, true, true);
              }}
            />
          </fieldset>
          <div className="flex justify-end pb-4">
            <button className="ResetButton ">reset</button>
          </div>
          <fieldset className="FormGroup">
            <CardField
              onChange={(event) => {
                this.setState({
                  error: event.error,
                  cardComplete: event.complete,
                });
              }}
            />
          </fieldset>
          {error && (
            <ErrorMessage
              onClick={() => {
                this.setState({
                  error: null,
                });
              }}
            >
              {error.message}
            </ErrorMessage>
          )}
          <SubmitButton
            processing={processing}
            error={error}
            disabled={!stripe}
          >
            Pay {amount}
          </SubmitButton>
        </form>
        <div className="fixed bottom-0 z-10 block w-full bg-white shadow lg:hidden">
          <div className="flex py-1 space-x-8 text-right">
            <SubmitButton
              processing={processing}
              error={error}
              disabled={!isValid && !stripe}
            >
              Pay {amount}
            </SubmitButton>

            <div className="flex flex-col items-center justify-center">
              <div className="flex flex-col px-2 space-x-2 font-semibold text-gray-600">
                {cart?.shippingTotal !== "0,00€" && (
                  <div className="relative ">
                    <AnimationValueChange>
                      <div className="flex px-1 rounded shadow">
                        <span className="text-xs">{cart.shippingTotal}</span>
                        <FaTruck className="inline ml-1 text-red-400" />
                      </div>
                    </AnimationValueChange>
                  </div>
                )}
                {cart?.discountTotal !== "0,00€" && (
                  <div className="relative ">
                    <AnimationValueChange>
                      <div className="flex px-1 rounded shadow">
                        <span className="text-xs">-{cart.discountTotal}</span>
                        <FaHandHoldingUsd className="inline ml-1 text-green-700" />
                      </div>
                    </AnimationValueChange>
                  </div>
                )}
              </div>
            </div>
            <div className="w-16"></div>
          </div>
        </div>
      </>
    );
  }
}
export default CheckoutFormStripeComplex;
