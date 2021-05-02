import Link from "next/link";
import AddToCartButton from "../components/cart/AddToCartButton";
import clientConfig from "../../client-config";
import { isEmpty } from "lodash";
import Price from "./single-product/price";
import Image from "next/image";
import { useState } from "react";

const Product = (props) => {
  const { product } = props;
  console.log(product);
  return (
    // @TODO Need to handle Group products differently.
    undefined !== product && "GroupProduct" !== product.__typename ? (
      <div className="mb-5 product">
        <Link href={`/photo/${product.slug}`} passHref>
          <a className="relative block h-64">
            {!isEmpty(product.image) ? (
              <VignettePhoto product={product} />
            ) : !isEmpty(clientConfig.productImagePlaceholder) ? (
              <Image
                src={clientConfig.productImagePlaceholder}
                alt="Placeholder product image"
                height={300}
                width={250}
              />
            ) : null}
          </a>
        </Link>
        <div className="product-info">
          <h3 className="mt-3 font-medium text-gray-800 product-title">
            {product.name ? product.name : ""}
          </h3>
          <Price
            salesPrice={product?.price}
            regularPrice={product?.regularPrice}
          />
          <AddToCartButton product={product} />
        </div>
      </div>
    ) : (
      ""
    )
  );
};

const VignettePhoto = ({ product }) => {
  const [hovered, setHovered] = useState(false);
  const orientation = product.galleryImages?.nodes[0]
    ? product.galleryImages?.nodes[0].mediaDetails.width >
      product.image.mediaDetails.height
      ? "cover"
      : "contain"
    : product.image?.mediaDetails &&
      product.image.mediaDetails.width > product.image.mediaDetails.height
    ? "cover"
    : "contain";
  const imageUrlPrimaire = product.galleryImages?.nodes[0].sourceUrl
    ? product.galleryImages?.nodes[0].sourceUrl
    : product.image.sourceUrl;
  const imageUrlSecondaire = product.image?.sourceUrl
    ? product.image?.sourceUrl
    : clientConfig.productImagePlaceholder;
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered ? (
        <Image
          src={imageUrlPrimaire}
          alt="Product image"
          layout="fill"
          objectFit={orientation}
        />
      ) : (
        <Image
          src={imageUrlSecondaire}
          alt="Product image"
          layout="fill"
          objectFit={orientation}
        />
      )}
      <Image
        src={hovered ? imageUrlPrimaire : imageUrlSecondaire}
        alt="Product image"
        layout="fill"
        objectFit={orientation}
      />
    </div>
  );
};
/*
					<div className="text-sm text-gray-700 product-description" dangerouslySetInnerHTML={{ __html: (product?.description)}}/>
*/
export default Product;
