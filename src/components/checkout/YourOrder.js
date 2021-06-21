import { Fragment } from "react";
import { BgPattern } from "../themeComponents";
import CheckoutCartItem from "./CheckoutCartItem";

const YourOrder = ({ cart }) => {
  return (
    <Fragment>
      {cart ? (
        <Fragment>
          {/*Product Listing*/}
          <table className="table w-full mb-10 checkout-cart table-hover">
            <thead className="relative">
              <BgPattern color={"c9a338"} />
              <tr className="text-left woo-next-cart-head-container bg-brand-400">
                <th className="woo-next-cart-heading-el" scope="col" />
                <th className="woo-next-cart-heading-el" scope="col">
                  Product
                </th>
                <th className="woo-next-cart-heading-el" scope="col">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="relative">
              <BgPattern />
              {cart.products.length &&
                cart.products.map((item) => (
                  <CheckoutCartItem key={item.productId} item={item} />
                ))}
              {/*Total*/}
              <tr className="bg-gray-200">
                <td className="" />
                <td className="text-xl font-normal woo-next-checkout-total">
                  Subtotal
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
    </Fragment>
  );
};

export default YourOrder;
