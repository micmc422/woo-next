import { useState, useContext, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { AppContext } from "../context/AppContext";
import { getFormattedCart } from "../../functions";
import Link from "next/link";
import { v4 } from "uuid";
import GET_CART from "../../queries/get-cart";
import ADD_TO_CART from "../../mutations/add-to-cart";
import { Bouton } from "../themeComponents";
import { useTranslation } from "next-i18next";
import { AnimatePresence, motion } from "framer-motion";
import * as ga from "../../../src/lib/ga";

const AddToCart = (props) => {
  const { product, children, variation } = props;
  const { t } = useTranslation("shop");
  const productQryInput = {
    clientMutationId: v4(), // Generate a unique id.
    productId: product.productId,
    variationId: variation?.productId,
  };
  const [cart, setCart] = useContext(AppContext);
  const [showViewCart, setShowViewCart] = useState(false);
  const [requestError, setRequestError] = useState(null);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    if (open && !hovered) {
      const timeOut = setTimeout(() => {
        setOpen(false);
      }, 3000);
      return () => clearTimeout(timeOut);
    }
  }, [open, hovered]);

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
      if (addToCartError) {
        setRequestError(
          addToCartError.graphQLErrors[0]?.message ||
            "même pas de message d'erreur..."
        );
      }

      // On Success:
      // 1. Make the GET_CART query to update the cart with new values in React context.
      setOpen(true);
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
    setRequestError(null);
    addToCart();
    ga.event({
      action: "add_to_cart",
      params: {
        items: [{ ...product }],
      },
    });
    console.log({
      action: "add_to_cart",
      params: {
        items: [{ ...product }],
      },
    });
  };
  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="coupons-pop-up"
            initial={{
              opacity: 0,
              y: -100,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -100,
            }}
            className="absolute bottom-8 right-2"
            onClick={() => setOpen(false)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <div className="relative p-4 mb-4 text-white border-0 rounded shadow bg-brand-500">
              <div
                className="absolute inset-0 z-0 transition-all opacity-50 animate-rtl-linear-infinite"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a338' fill-opacity='0.4'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
              <div className="relative flex flex-col space-y-4">
                <div className="align-middle">
                  <b className="capitalize">Ajouté !</b> Merci, vous pouvez
                  valider votre commande.
                </div>
                <div className={`my-4 text-right`}>
                  <Link href={"/cart"}>
                    <a
                      className={` p-2 bg-white bg-opacity-25 hover:bg-opacity-50 rounded shadow `}
                    >
                      {t("voirpanier")}{" "}
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Bouton>
        <div className={` cursor-pointer `}>
          {/* Add To Cart Loading*/}
          {addToCartLoading ? (
            <div className="text-xs font-bold leading-3 text-gray-500">
              {t("patienter")} {children ? children : ""}
            </div>
          ) : (
            <div
              onClick={handleAddToCartClick}
              className="text-xs font-bold leading-3 text-brand-500 hover:text-brand-600"
            >
              {t("ajouter-au-panier")}
              {children ? children : ""}
            </div>
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
    </>
  );
};

export default AddToCart;
