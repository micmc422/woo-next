import { Fragment } from "react";
import CheckoutCartItem from "./CheckoutCartItem";

const YourOrder = ({ cart }) => {
 //  console.log(cart);
  return (
    <>
      {cart ? (
        <Fragment>
          {/*Product Listing*/}
          <table className="table w-full mb-10 checkout-cart table-hover">
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
            <tbody>
              {cart.products.length &&
                cart.products.map((item) => (
                  <CheckoutCartItem key={item.productId} item={item} />
                ))}
              {/*Shipping*/}
              <tr className="bg-gray-100">
                <td className="" />
                <td className="font-normal">shipping</td>
                <td className="text-purple-700">{cart.shippingTotal}</td>
              </tr>

              {/*coupon*/}
              <tr className="bg-gray-100">
                <td className="" />
                <td className="font-normal">coupon</td>
                <td className="text-green-700">-{cart.discountTotal}</td>
              </tr>

              {/*Total*/}
              <tr className="bg-gray-200">
                <td className="" />
                <td className="text-xl font-normal woo-next-checkout-total">
                  Total
                </td>
                <td className="text-xl font-bold woo-next-checkout-total">
                  {cart.totalProductsPrice}
                </td>
              </tr>
              {/* <tr className="">
							<td className=""/>
							<td className="woo-next-checkout-total">Total</td>
							<td className="woo-next-checkout-total">{ cart.totalProductsPrice }</td>
						</tr> */}
            </tbody>
          </table>
        </Fragment>
      ) : (
        ""
      )}
    </>
  );
};

export default YourOrder;
