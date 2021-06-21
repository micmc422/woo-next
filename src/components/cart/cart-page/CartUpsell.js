import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import GET_UPSELL_QUERY from "../../../queries/get-upsell";
import Product from "../../Product";
import { Bouton, ThemeH3 } from "../../themeComponents";

const CartUpsell = () => {
  // Get Upsell Data.
  const [upsellProducts, setUpsellProduct] = useState(false);
  const { loading, error, data } = useQuery(GET_UPSELL_QUERY, {
    // notifyOnNetworkStatusChange: true,
    variables: { first: 8 },
    onCompleted: () => {
      // Update cart in the localStorage.
      // const updatedCart = getFormattedCart(data);
      // localStorage.setItem("woo-next-cart", JSON.stringify(updatedCart));
      // Update cart data in React Context.
      // setCart(updatedCart);
      setUpsellProduct(data.products.nodes);
    },
  });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  // console.log(upsellProducts);

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className={`p-4`}>
          <ThemeH3>Suggestions</ThemeH3>
          <p className="font-serif">Suggestions, de produits.</p>
        </div>
        <div className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 md:flex-grow">
          {upsellProducts.length
            ? upsellProducts.map((product) => (
                <Product key={product.id} product={product} noName cover/>
              ))
            : ""}
        </div>
      </div>
    </>
  );
};

export default CartUpsell;
