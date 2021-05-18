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
      <a className="relative inline-block mt-4 mr-10 text-center text-black lg:mt-0 hover:text-black">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="inline-block w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        <span className="hidden m-auto lg:block">{t("panier")}</span>
        {productsCount ? (
          <div class=" text-xs absolute top-0 right-0 -mt-2 -mr-2 px-2 bg-brand-500 text-white rounded-full">
            <span className="">{productsCount}</span>
          </div>
        ) : (
          ""
        )}
        {/*{ totalPrice ? <span>{ totalPrice }</span> : '' }*/}
      </a>
    </Link>
  );
};

export default CartIcon;
