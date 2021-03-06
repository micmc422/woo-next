import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const CartIcon = ({props}) => {
  const { t } = useTranslation("common");

  const [cart] = useContext(AppContext);
  const productsCount =
    null !== cart && Object.keys(cart).length ? cart.totalProductsCount : "";
  const totalPrice =
    null !== cart && Object.keys(cart).length ? cart.totalProductsPrice : "";

  return (
    <Link href="/cart">
      <a {...props} className="relative block mt-2 text-center text-gray-600 hover:text-black lg:mt-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="inline-block w-6 h-6"
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
        {productsCount ? (
          <div className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs text-white rounded-full bg-brand-500">
            <span className="">{productsCount}</span>
          </div>
        ) : (
          ""
        )}
        {/*{ totalPrice ? <span>{ totalPrice }</span> : '' } 
               <span className="hidden m-auto lg:block">{t("panier")}</span>
*/}
      </a>
    </Link>
  );
};

export default CartIcon;
