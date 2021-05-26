import { isEmpty } from "lodash";
import { PriceParse } from "../../themeComponents";

const Price = ({ regularPrice = 0, salesPrice }) => {
  if (isEmpty(salesPrice)) {
    return null;
  }

  /**
   * Get discount percent.
   *
   * @param {String} regularPrice
   * @param {String} salesPrice
   */
  const discountPercent = (regularPrice, salesPrice) => {
    if (isEmpty(regularPrice) || isEmpty(salesPrice)) {
      return null;
    }

    const formattedRegularPrice = parseInt(regularPrice?.substring(1));
    const formattedSalesPrice = parseInt(salesPrice?.substring(1));

    const discountPercent =
      ((formattedRegularPrice - formattedSalesPrice) / formattedRegularPrice) *
      100;

    return {
      discountPercent:
        formattedSalesPrice !== formattedRegularPrice
          ? `(${discountPercent.toFixed(2)}%) OFF`
          : null,
      strikeThroughClass:
        formattedSalesPrice < formattedRegularPrice
          ? "product-regular-price mr-2 line-through text-sm text-gray-600 font-normal"
          : "",
    };
  };

  const productMeta = discountPercent(regularPrice, salesPrice);

  return (
    <h6 className="mb-5 mr-3 font-semibold text-gray-800 product-price">
      {/* Regular price */}
      {productMeta?.discountPercent ? (
        <span className="mr-2 product-price">{salesPrice}</span>
      ) : null}

      {/* Discounted price */}
      <span className={productMeta?.strikeThroughClass}>
        <PriceParse price={regularPrice} />
      </span>

      {/* Discount percent */}
      <span className="text-sm font-bold text-green-600 product-discount">
        {productMeta?.discountPercent}
      </span>
    </h6>
  );
};

export default Price;
