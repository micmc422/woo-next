import { NextApiRequest, NextApiResponse } from "next";

import { CURRENCY, MIN_AMOUNT, MAX_AMOUNT } from "../../config";

import Stripe from "stripe";
import { formatAmountForStripe } from "src/utils/stripe-helpers";
const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET}`, {
  //const stripe = new Stripe(  `pk_test_51HtCQlFIWeEGR1HAQFSJNZfBTbohYe6xZ8P3M4ftO5pbOUVodzBr9DNDCnlYL16wxRRy3UWEevPAXuTWhwhrnmMB007Xq5lzWP`,{

  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2020-08-27",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { amount }: { amount: number } = req.body;
    console.log(amount);
    try {
      // Validate the amount that was passed from the client.
      if (!(amount >= MIN_AMOUNT && amount <= MAX_AMOUNT)) {
        throw new Error("Invalid amount.");
      }
      // Create PaymentIntent from body params.
      const params: Stripe.PaymentIntentCreateParams = {
        payment_method_types: ["card"],
        amount: formatAmountForStripe(amount, CURRENCY),
        currency: CURRENCY,
      };
      const payment_intent: Stripe.PaymentIntent = await stripe.paymentIntents.create(
        params
      );

      res.status(200).json(payment_intent);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
