import Link from "next/link";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { getFormattedCart, getUpdatedItems } from "../../../functions";
import CartItem from "./CartItem";
import { v4 } from "uuid";
import { useMutation, useQuery } from "@apollo/client";
import UPDATE_CART from "../../../mutations/update-cart";
import GET_CART from "../../../queries/get-cart";
import CLEAR_CART_MUTATION from "../../../mutations/clear-cart";
import { isEmpty } from "lodash";
import { useTranslation } from "react-i18next";

const CartItemsContainer = () => {
  const { t } = useTranslation("panier");
  // @TODO wil use it in future variations of the project.
  const [cart, setCart] = useContext(AppContext);
  const [requestError, setRequestError] = useState(null);

  // Get Cart Data.
  const { loading, error, data, refetch } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      // Update cart in the localStorage.
      const updatedCart = getFormattedCart(data);
      localStorage.setItem("woo-next-cart", JSON.stringify(updatedCart));

      // Update cart data in React Context.
      setCart(updatedCart);
    },
  });

  // Update Cart Mutation.
  const [
    updateCart,
    {
      data: updateCartResponse,
      loading: updateCartProcessing,
      error: updateCartError,
    },
  ] = useMutation(UPDATE_CART, {
    onCompleted: () => {
      refetch();
    },
    onError: (error) => {
      if (error) {
        const errorMessage = error?.graphQLErrors?.[0]?.message
          ? error.graphQLErrors[0].message
          : "";
        setRequestError(errorMessage);
      }
    },
  });

  // Update Cart Mutation.
  const [
    clearCart,
    { data: clearCartRes, loading: clearCartProcessing, error: clearCartError },
  ] = useMutation(CLEAR_CART_MUTATION, {
    onCompleted: () => {
      refetch();
    },
    onError: (error) => {
      if (error) {
        const errorMessage = !isEmpty(error?.graphQLErrors?.[0])
          ? error.graphQLErrors[0]?.message
          : "";
        setRequestError(errorMessage);
      }
    },
  });

  /*
   * Handle remove product click.
   *
   * @param {Object} event event
   * @param {Integer} Product Id.
   *
   * @return {void}
   */
  const handleRemoveProductClick = (event, cartKey, products) => {
    event.stopPropagation();
    if (products.length) {
      // By passing the newQty to 0 in updateCart Mutation, it will remove the item.
      const newQty = 0;
      const updatedItems = getUpdatedItems(products, newQty, cartKey);

      updateCart({
        variables: {
          input: {
            clientMutationId: v4(),
            items: updatedItems,
          },
        },
      });
    }
  };

  // Clear the entire cart.
  const handleClearCart = (event) => {
    event.stopPropagation();

    if (clearCartProcessing) {
      return;
    }

    clearCart({
      variables: {
        input: {
          clientMutationId: v4(),
          all: true,
        },
      },
    });
  };

  return (
    <div className="container px-4 mx-auto my-32 cart product-cart-container xl:px-0">
      {cart ? (
        <div className="container woo-next-cart-wrapper">
          <div className="grid grid-cols-2 gap-4 cart-header">
            <h1 className="mb-5 text-2xl uppercase">{t("panier")}</h1>
            {/*Clear entire cart*/}
            <div className="text-right clear-cart">
              <button
                className="w-auto px-4 py-1 text-white bg-gray-500 rounded-sm"
                onClick={(event) => handleClearCart(event)}
                disabled={clearCartProcessing}
              >
                <span className="woo-next-cart"> {t("viderpanier")}</span>
                <i className="fa fa-arrow-alt-right" />
              </button>
              {clearCartProcessing ? <p>{t("vidageencour")}</p> : ""}
              {updateCartProcessing ? <p>{t("miseajour")}</p> : null}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-0 mb-5 xl:grid-cols-4 xl:gap-4">
            <table className="w-full text-left whitespace-no-wrap table-auto">
              <thead className="text-left">
                <tr className="woo-next-cart-head-container">
                  <th
                    className="px-4 py-3 text-sm font-medium tracking-wider text-gray-900 bg-gray-100 rounded-tl rounded-bl title-font"
                    scope="col"
                  />
                  <th
                    className="px-4 py-3 text-sm font-medium tracking-wider text-gray-900 bg-gray-100 title-font hidden md:table"
                    scope="col"
                  />
                  <th
                    className="px-4 py-3 text-sm font-medium tracking-wider text-gray-900 bg-gray-100 title-font hidden md:table"
                    scope="col"
                  >
                    {t("photo")}
                  </th>
                  <th
                    className="px-4 py-3 text-sm font-medium tracking-wider text-gray-900 bg-gray-100 title-font"
                    scope="col"
                  >
                    {t("prix")}
                  </th>
                  <th
                    className="px-4 py-3 text-sm font-medium tracking-wider text-gray-900 bg-gray-100 title-font"
                    scope="col"
                  >
                    {t("quantite")}
                  </th>
                  <th
                    className="text-sm font-medium tracking-wider text-gray-900 bg-gray-100 rounded-tr rounded-br title-font"
                    scope="col"
                  >
                    {t("total")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart.products.length &&
                  cart.products.map((item) => (
                    <CartItem
                      key={item.productId}
                      item={item}
                      updateCartProcessing={updateCartProcessing}
                      products={cart.products}
                      handleRemoveProductClick={handleRemoveProductClick}
                      updateCart={updateCart}
                    />
                  ))}
              </tbody>
            </table>

            {/*Cart Total*/}
            <div className="p-5 bg-gray-200 border row woo-next-cart-total-container">
              <div className="">
                {/* <h2 className="text-2xl">Cart Total</h2> */}
                <table className="table mb-5 table-auto table-hover">
                  <tbody>
                    <tr className="flex flex-col table-light">
                      <td className="text-2xl font-normal woo-next-cart-element-total">
                        {t("soustotal")}
                      </td>
                      <td className="text-2xl font-bold woo-next-cart-element-amt">
                        <span>
                          {"string" !== typeof cart.totalProductsPrice
                            ? cart.totalProductsPrice.toFixed(2)
                            : cart.totalProductsPrice}
                        </span>{" "}
                      </td>
                    </tr>
                    {/* <tr className="table-light">
										<td className="woo-next-cart-element-total">Total</td>
										<td className="woo-next-cart-element-amt">{ ( 'string' !== typeof cart.totalProductsPrice ) ? cart.totalProductsPrice.toFixed(2) : cart.totalProductsPrice }</td>
									</tr> */}
                  </tbody>
                </table>
                <Link href="/checkout">
                  <button className="w-auto px-5 py-3 text-white rounded-sm bg-brand-500 xl:w-full">
                    <span className="woo-next-cart-checkout-txt">
                      {t("finalisercommande")}
                    </span>
                    <i className="fas fa-long-arrow-alt-right" />
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Display Errors if any */}
          {requestError ? (
            <div className="mt-5 row woo-next-cart-total-container">
              {" "}
              {requestError}{" "}
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="container px-4 mx-auto my-32 xl:px-0">
          <h2 className="mb-5 text-2xl">{t("pasdephoto")}</h2>
          <Link href="/">
            <button className="px-5 py-3 text-white rounded-sm bg-brand-500">
              <span className="woo-next-cart-checkout-txt">
                {t("ajouterphoto")}
              </span>
              <i className="fas fa-long-arrow-alt-right" />
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartItemsContainer;
