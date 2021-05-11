/**
 * This is a singleton to ensure we only instantiate Stripe once.
 */
 import { Stripe, loadStripe } from "@stripe/stripe-js";
 // console.log(process.env.STRIPE_SECRET_KEY)
 
 let stripePromise: Promise<Stripe | null>;
 const getStripe = () => {
   if (!stripePromise) {
     stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
   }
   return stripePromise;
 };
 
 export default getStripe;