import { AnimatePresence, motion } from "framer-motion";
import { Fragment } from "react";
import { AnimationValueChange } from "../themeComponents";
import CheckoutCartItem from "./CheckoutCartItem";

const YourOrder = ({ cart }) => {
  //  console.log(cart);
  return (
    <>
      {cart ? (
        <div className="hidden px-4 lg:block">
          {/*Product Listing*/}
          <table className="table w-full mb-10 overflow-hidden rounded shadow-2xl checkout-cart table-hover">
            <thead>
              <tr className="text-left woo-next-cart-head-container">
                <th className="woo-next-cart-heading-el" scope="col" />
                <th className="woo-next-cart-heading-el" scope="col">
                  Product
                </th>
                <th className="woo-next-cart-heading-el" scope="col">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="px-8">
              {cart.products.length &&
                cart.products.map((item) => (
                  <CheckoutCartItem key={item.productId} item={item} />
                ))}
              {/*Shipping*/}
              <tr className="bg-gray-100">
                <td className="" />
                <td className="font-normal">shipping</td>
                <td className="relative text-red-400">
                  <AnimationValueChange>
                    {cart.shippingTotal}
                  </AnimationValueChange>
                </td>
              </tr>
              {/*coupon*/}
              <tr className="bg-gray-100">
                <td className="" />
                <td className="font-normal">coupon</td>
                <td className="relative text-green-700">
                  <AnimationValueChange>
                    -{cart.discountTotal}
                  </AnimationValueChange>
                </td>
              </tr>
              {/*Total*/}
              <tr className="bg-gray-200">
                <td className="" />
                <td className="text-xl font-normal woo-next-checkout-total">
                  Total
                </td>
                <td className="relative text-xl font-bold woo-next-checkout-total">
                  <AnimationValueChange>
                    {cart.totalProductsPrice}
                  </AnimationValueChange>
                </td>
              </tr>
              {/* <tr className="">
							<td className=""/>
							<td className="woo-next-checkout-total">Total</td>
							<td className="woo-next-checkout-total">{ cart.totalProductsPrice }</td>
						</tr> */}
            </tbody>
          </table>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default YourOrder;
