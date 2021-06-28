import { useContext } from "react";
import { useQuery } from "@apollo/client";
import GET_CART from "../../queries/get-cart";
import { getFormattedCart } from "../../functions";
import { AppContext } from "../context/AppContext";
import CartItemsList from "./CartItemsList";

const CartData = () => {
  const [cart, setCart] = useContext(AppContext);

  const { data } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      // Update cart in the localStorage.
      const updatedCart = getFormattedCart(data);
      localStorage.setItem("woo-next-cart", JSON.stringify(updatedCart));

      // Update cart data in React Context.
      setCart(updatedCart);
    },
  });
  return (
    <div>
      <CartItemsList cart={cart} />
    </div>
  );
};

export default CartData;
