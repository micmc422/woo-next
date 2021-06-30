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
import { isEmpty, uniqueId } from "lodash";
import { useTranslation } from "react-i18next";
import { Cross } from "../../icons";
import { FaTrashAlt } from "react-icons/fa";
import { BgPattern, ThemePName } from "../../themeComponents";
import Image from "next/image";
import CartUpsell from "./CartUpsell";
import ProgressState from "../../checkout/ProgressState";

const CartItemsContainer = () => {
  const { t } = useTranslation("panier");
  // @TODO wil use it in future variations of the project.
  const [cart, setCart] = useContext(AppContext);
  const [requestError, setRequestError] = useState(null);
  const [upsell, setUpsell] = useState([]);

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
  //  console.log(cart)
  return (
    <div className="container px-4 mx-auto mt-8 cart product-cart-container xl:px-0">
      {cart ? (
        <div className="container woo-next-cart-wrapper">
          <div className="flex flex-row items-center justify-between">
            <ThemePName>{t("panier")}</ThemePName>
            <div className="grid-cols-2 gap-4 cart-header">
              {/*Clear entire cart*/}
              <div className="text-right clear-cart">
                <button
                  className="w-full px-4 py-1 text-white bg-red-400 rounded md:w-auto"
                  onClick={(event) => handleClearCart(event)}
                  disabled={clearCartProcessing}
                >
                  <span className="flex items-center py-2 space-x-2 text-center woo-next-cart">
                    <FaTrashAlt /> <span>{t("viderpanier")}</span>
                  </span>
                </button>
                {clearCartProcessing ? <p>{t("vidageencour")}</p> : ""}
                {updateCartProcessing ? <p>{t("miseajour")}</p> : null}
              </div>
            </div>
          </div>
          <ProgressState activeState={0} />
          <div className="relative hidden grid-cols-1 gap-2 pt-8 mb-5 md:grid xl:grid-cols-3 xl:gap-4">
            <div className="col-span-2">
              <table className="overflow-hidden text-left rounded table-fixed ring-1 ring-gray-200">
                <thead className="relative text-left">
                  <tr className="mb-2 bg-pattern-brand animate-rtl-linear-infinite bg-brand-300">
                    <th className="w-1/12" />
                    <th className="w-1/12" />
                    <th className="w-1/2 p-2">{t("photo")}</th>
                    <th className="w-1/12 p-2">{t("quantite")}</th>
                    <th className="w-1/12 p-2">{t("prix")}</th>
                    <th className="w-2/12 p-2">{t("soustotal")}</th>
                  </tr>
                </thead>
                <tbody className="flex-1 m-px sm:flex-none">
                  {cart.products.length &&
                    cart.products.map((item) => (
                      <CartItem
                        key={uniqueId(item.productId)}
                        item={item}
                        updateCartProcessing={updateCartProcessing}
                        products={cart.products}
                        handleRemoveProductClick={handleRemoveProductClick}
                        updateCart={updateCart}
                      />
                    ))}
                </tbody>
              </table>
            </div>
            {/*Cart Total*/}
            <div className="relative bg-gray-200 border row woo-next-cart-total-container">
              <BgPattern />
              <div className="p-5">
                {/* <h2 className="text-2xl">Cart Total</h2> */}
                <table className="table mb-5 table-auto table-hover">
                  <tbody>
                    <tr className="flex flex-col table-light">
                      <td className="text-2xl font-normal woo-next-cart-element-total">
                        {t("total")}
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
                <Link href="/commande">
                  <button
                    className="w-auto px-5 py-3 text-white rounded-sm cursor-pointer bg-brand-500 xl:w-full"
                    aria-label={t("finalisercommande")}
                  >
                    <span className="woo-next-cart-checkout-txt">
                      {t("finalisercommande")}
                    </span>
                    <i className="fas fa-long-arrow-alt-right" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:hidden">
            {cart.products.length &&
              cart.products.map((item) => (
                <div
                  className={`relative text-xs shadow-lg rounded p-1  bg-gray-100`}
                  key={uniqueId(item.productId)}
                >
                  <div className={`flex w-full mb-2 h-48 relative`}>
                    <Image
                      layout="fill"
                      objectFit="cover"
                      src={item.image.sourceUrl}
                      alt={item.image.title}
                    />
                    <div
                      className="absolute top-0 right-0 flex transform scale-90"
                      onClick={(event) =>
                        handleRemoveProductClick(
                          event,
                          item.cartKey,
                          cart.products
                        )
                      }
                    >
                      <Cross />
                    </div>
                  </div>
                  <div className={`flex w-full mb-1`}>
                    <div className="flex-shrink-0 w-1/6 p-1 text-gray-400 bg-gray-200 rounded">
                      {t("photo")}
                    </div>
                    <div className="relative flex w-5/6 p-1 font-bold">
                      <span>{item.name}</span>
                    </div>
                  </div>
                  <div className={`items-center flex justify-between`}>
                    <div className="p-1 text-gray-400 bg-gray-200 rounded">
                      {t("quantite")}
                    </div>
                    <div className="p-1 font-bold"> {item.qty} </div>
                    <div className="p-1 text-gray-400 bg-gray-200 rounded">
                      {t("prix")}
                    </div>
                    <div className="p-1 font-bold">
                      {"string" !== typeof item.price
                        ? item.price.toFixed(2)
                        : item.price}
                    </div>
                    <div className="p-1 text-gray-400 bg-gray-200 rounded">
                      {t("soustotal")}
                    </div>
                    <div className="p-1 font-bold">
                      {"string" !== typeof item.totalPrice
                        ? item.totalPrice.toFixed(2)
                        : item.totalPrice}
                    </div>
                  </div>
                </div>
              ))}
            <span className="block pt-4 text-right">
              <span className="text-gray-500">{t("total")} : </span>
              <span className="font-extrabold">
                {"string" !== typeof cart.totalProductsPrice
                  ? cart.totalProductsPrice.toFixed(2)
                  : cart.totalProductsPrice}
              </span>
            </span>
            <Link href="/commande">
              <button
                className="w-auto px-5 py-3 mt-5 text-white rounded-sm bg-brand-500 xl:w-full"
                aria-label={t("finalisercommande")}
              >
                <span className="woo-next-cart-checkout-txt">
                  {t("finalisercommande")}
                </span>
                <i className="fas fa-long-arrow-alt-right" />
              </button>
            </Link>
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
            <button
              className="px-5 py-3 text-white rounded-sm bg-brand-500"
              aria-label={t("ajouterphoto")}
            >
              <span className="woo-next-cart-checkout-txt">
                {t("ajouterphoto")}
              </span>
              <i className="fas fa-long-arrow-alt-right" />
            </button>
          </Link>
        </div>
      )}
      <div className="container mx-auto mb-8 md:mb-16 lg:mb-32">
        <CartUpsell cart={cart} />
      </div>
    </div>
  );
};

export default CartItemsContainer;
