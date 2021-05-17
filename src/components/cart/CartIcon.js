import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const CartIcon = () => {
  const { t } = useTranslation("common");

  const [cart] = useContext(AppContext);
  const productsCount =
    null !== cart && Object.keys(cart).length ? cart.totalProductsCount : "";
  const totalPrice =
    null !== cart && Object.keys(cart).length ? cart.totalProductsPrice : "";

  return (
    <Link href="/cart">
      <a className="block mt-4 mr-10 text-black lg:inline-block lg:mt-0 hover:text-black">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="hidden m-auto lg:block"
          fill="none"
          viewBox="0 0 24 24"
          width="18"
          height="auto"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        {t("panier")}

        {productsCount ? <span className="ml-1">({productsCount})</span> : ""}
        {/*{ totalPrice ? <span>{ totalPrice }</span> : '' }*/}
      </a>
    </Link>
  );
};

export default CartIcon;
