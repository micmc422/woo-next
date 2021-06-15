import Image from "next/image";
import { useState } from "react";
import { v4 } from "uuid";
import { getUpdatedItems } from "../../../functions";
import { Cross, Loading } from "../../icons";

const CartItem = ({
  item,
  products,
  updateCartProcessing,
  handleRemoveProductClick,
  updateCart,
}) => {
  const [productCount, setProductCount] = useState(item.qty);

  /*
   * When user changes the qty from product input update the cart in localStorage
   * Also update the cart in global context
   *
   * @param {Object} event event
   *
   * @return {void}
   */
  const handleQtyChange = (event, cartKey) => {
    if (process.browser) {
      event.stopPropagation();

      // If the previous update cart mutation request is still processing, then return.
      if (updateCartProcessing) {
        return;
      }

      // If the user tries to delete the count of product, set that to 1 by default ( This will not allow him to reduce it less than zero )
      const newQty = event.target.value
        ? parseInt(event.target.value)
        : parseInt(event.target.value);

      // Set the new qty in state.
      setProductCount(newQty);

      if (products.length) {
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
    }
  };
  return (
    <tr className="flex flex-col mb-2 bg-white border-t border-gray-200 rounded-l-lg flex-nowrap sm:table-row sm:rounded-none sm:mb-0">
      <th className="w-2 text-red-400 cursor-pointer hover:bg-gray-100 hover:text-red-600 hover:font-medium">
        {/* Remove item */}
        <div
          className="flex justify-center cursor-pointer woo-next-cart-close-icon"
          onClick={(event) =>
            handleRemoveProductClick(event, item.cartKey, products)
          }
        >
          <Cross />
        </div>
      </th>
      <th className="truncate border-l border-grey-light hover:bg-gray-100">
        <div className="relative w-32 h-24">
          <Image
            layout="fill"
            objectFit="scale-down"
            src={item.image.sourceUrl}
            alt={item.image.title}
          />
        </div>
      </th>
      <th className="px-4 border-l border-grey-light hover:bg-gray-100 w-44">
        {item.name}
      </th>
      <th className="px-1 truncate border-l border-grey-light hover:bg-gray-100">
        <input
          type="number"
          min="1"
          data-cart-key={item.cartKey}
          className={`w-full text-center  ${
            updateCartProcessing ? "opacity-25 cursor-not-allowed" : ""
          } `}
          value={productCount}
          onChange={(event) => handleQtyChange(event, item.cartKey)}
        />
      </th>
      <th className="px-1 text-center truncate border-l border-grey-light hover:bg-gray-100">
        {item.price.toFixed(2)}€
      </th>
      <th className="px-1 text-center truncate border-l hover:bg-gray-100 border-grey-light">
        {"string" !== typeof item.totalPrice
          ? item.totalPrice.toFixed(2)
          : item.totalPrice}
      </th>
    </tr>
  );
  return (
    <tr key={item.productId}>
      <th className="px-0 py-3 border-t-2 border-gray-200 md:px-4">
        {/* Remove item */}
        <span
          className="cursor-pointer woo-next-cart-close-icon"
          onClick={(event) =>
            handleRemoveProductClick(event, item.cartKey, products)
          }
        >
          <Cross />
        </span>
      </th>
      <td className="hidden px-4 py-3 border-t-2 border-gray-200 md:table">
        <div className="relative w-32 h-24">
          <Image
            layout="fill"
            objectFit="scale-down"
            src={item.image.sourceUrl}
            alt={item.image.title}
          />
        </div>
      </td>
      <td className="px-4 py-3 border-t-2 border-gray-200">{item.name}</td>
      <td className="hidden px-4 py-3 border-t-2 border-gray-200 md:table">
        {"string" !== typeof item.price ? item.price.toFixed(2) : item.price}
      </td>

      {/* Qty Input */}
      <td className="px-4 py-3 border-t-2 border-gray-200">
        {/* @TODO Need to update this with graphQL query */}
        <input
          type="number"
          min="1"
          data-cart-key={item.cartKey}
          className={`w-8 ${
            updateCartProcessing ? "opacity-25 cursor-not-allowed" : ""
          } `}
          value={productCount}
          onChange={(event) => handleQtyChange(event, item.cartKey)}
        />
      </td>
      <td className="px-4 py-3 border-t-2 border-gray-200">
        {"string" !== typeof item.totalPrice
          ? item.totalPrice.toFixed(2)
          : item.totalPrice}
      </td>
    </tr>
  );
};

export default CartItem;
