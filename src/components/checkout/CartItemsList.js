import { uniqueId } from "lodash";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import { getUpdatedItems, updateCart } from "../../functions";
import { Cross } from "../icons";

const CartItemsList = ({ cart }) => {
  const { t } = useTranslation("shop");
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
  console.log(cart);
  console.log(!cart?.products.length);
  if (!cart?.products.length) {
    return <div></div>;
  }
  return (
    <div className="flex flex-col md:hidden">
      {cart.products.map((item) => (
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
                handleRemoveProductClick(event, item.cartKey, cart.products)
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
      <Link href="/checkout">
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
  );
};

export default CartItemsList;
