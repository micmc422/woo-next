import { useState, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { AppContext } from "../context/AppContext";
import { getFormattedCart } from "../../functions";
import Link from "next/link";
import { v4 } from "uuid";
import GET_CART from "../../queries/get-cart";
import ADD_TO_CART from "../../mutations/add-to-cart";
import { Bouton } from "../themeComponents";
import { useTranslation } from "next-i18next";

const AddToCart = (props) => {
  const { product, children } = props;
  const { t } = useTranslation("shop");

  const productQryInput = {
    clientMutationId: v4(), // Generate a unique id.
    productId: product.productId,
  };
  const [cart, setCart] = useContext(AppContext);
  const [showViewCart, setShowViewCart] = useState(false);
  const [requestError, setRequestError] = useState(null);

  /**
   * @TODO will update this in future, when required.
   * Handles adding items to the cart.
   *
   * @return {void}
   */
  // const handleAddToCartLocalStorage = () => {
  //
  // 	// If component is rendered client side.
  // 	if ( process.browser ) {
  //
  // 		let existingCart = localStorage.getItem( 'woo-next-cart' );
  //
  // 		// If cart has item(s) already, update existing or add new item.
  // 		if ( existingCart ) {
  //
  // 			existingCart = JSON.parse( existingCart );
  //
  // 			const qtyToBeAdded = 1;
  //
  // 			const updatedCart = updateCart( existingCart, product, qtyToBeAdded );
  //
  // 			setCart( updatedCart );
  //
  // 		} else {
  // 			/**
  // 			 * If No Items in the cart, create an empty array and add one.
  // 			 * @type {Array}
  // 			 */
  // 			const newCart = addFirstProduct( product );
  // 			setCart( newCart );
  // 		}
  //
  // 		// Show View Cart Button
  // 		setShowViewCart( true )
  // 	}
  // };

  // Get Cart Data.
  const { loading, error, data, refetch } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      //console.warn("completed GET_CART");

      // Update cart in the localStorage.
      const updatedCart = getFormattedCart(data);
      localStorage.setItem("woo-next-cart", JSON.stringify(updatedCart));
      //  console.warn(localStorage);

      // Update cart data in React Context.
      setCart(updatedCart);
    },
  });

  // Add to Cart Mutation.
  const [
    addToCart,
    { data: addToCartRes, loading: addToCartLoading, error: addToCartError },
  ] = useMutation(ADD_TO_CART, {
    variables: {
      input: productQryInput,
    },
    onCompleted: () => {
      // console.warn( 'completed ADD_TO_CART' );

      // If error.
      if (addToCartError) {
        setRequestError(
          addToCartError.graphQLErrors[0]?.message ||
            "même pas de message d'erreur..."
        );
      }

      // On Success:
      // 1. Make the GET_CART query to update the cart with new values in React context.
      refetch();

      // 2. Show View Cart Button
      setShowViewCart(true);
    },
    onError: (error) => {
      if (error) {
        setRequestError(
          error.graphQLErrors[0]?.message || "même pas de message d'erreur..."
        );
      }
    },
  });

  const handleAddToCartClick = () => {
    // handleAddToCartLocalStorage();
    setRequestError(null);
    addToCart();
  };
  // console.log({ productQryInput, requestError });
  return (
    <Bouton>
      <div className={` cursor-pointer `}>
        {/* Add To Cart Loading*/}
        {!showViewCart ? (
          addToCartLoading ? (
            <div> Ajout en cour {children ? children : ""}</div>
          ) : (
            <div
              onClick={handleAddToCartClick}
              className="text-brand-500 hover:text-brand-700"
            >
              {t("ajouter-au-panier")}
              {children ? children : ""}
            </div>
          )
        ) : (
          <Bouton>
            <Link href="/cart">
              <button className="inline-block px-3 py-1 text-sm border border-current border-solid rounded-sm hover:bg-brand-500 hover:text-white hover:border-brand-500">
                {t("voirpanier")}
              </button>
            </Link>{" "}
          </Bouton>
        )}

        {/*	Check if its an external product then put its external buy link */}
        {"ExternalProduct" === product.__typename && (
          <a
            href={product.externalUrl}
            target="_blank"
            className="inline-block px-3 py-1 mr-3 text-sm border border-current border-solid rounded-sm hover:bg-purple-600 hover:text-white hover:border-purple-600"
          >
            Buy now
          </a>
        )}
      </div>
    </Bouton>
  );
};

export default AddToCart;
