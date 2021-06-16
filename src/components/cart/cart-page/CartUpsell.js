import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import GET_UPSELL_QUERY from "../../../queries/get-upsell";
import Product from "../../Product";
import { Bouton } from "../../themeComponents";

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
      <div className="p-4">
      </div>
      <div className="flex">
        <div className="w-full md:w-1/2">
        <Bouton small circleClass="bg-brand-500">
          <h2 className="text-4xl">Suggestions</h2>
        </Bouton>
        <p className="font-serif">Suggestions, de produits.</p>
        </div>
        <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 md:w-1/2">
          {upsellProducts.length
            ? upsellProducts.map((product) => (
                <Product key={product.id} product={product} noName />
              ))
            : ""}
        </div>
      </div>
    </>
  );
};

export default CartUpsell;
