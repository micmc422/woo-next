import Link from "next/link";
import AddToCartButton from "../components/cart/AddToCartButton";
import clientConfig from "../../client-config";
import { isEmpty } from "lodash";
import Price from "./single-product/price";
import Image from "next/image";
import { useState } from "react";
import { Bouton } from "./themeComponents";
import { AnimatePresence, motion } from "framer-motion";
import ImageWithFallback from "./ImageFallBack";

const Product = (props) => {
  const { product } = props;
  return (
    // @TODO Need to handle Group products differently.
    undefined !== product && "GroupProduct" !== product.__typename ? (
      <div className="mb-5 product">
        <Link href={`/photo/${product.slug}`} passHref>
          <a className="relative block h-96 md:h-64">
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
        <div className="text-center product-info">
          <h3 className="mt-3 font-medium text-gray-800 product-title">
            {product.name ? product.name : ""}
          </h3>
          <div className="flex flex-row flex-wrap items-center justify-around space-x-2">
            <AddToCartButton product={product}>
              Ajouter au pannier
              <Price
                salesPrice={product?.price}
                regularPrice={product?.regularPrice}
              />
            </AddToCartButton>
            <div className="flex flex-col -space-y-3">
              <Bouton circleClass={"bg-gray-300"} small={true}>
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
              </Bouton>
              <Bouton circleClass={"bg-gray-300"} small={true}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </Bouton>
            </div>
          </div>
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
      product.galleryImages?.nodes[0].mediaDetails.height
      ? "cover"
      : "contain"
    : product.image?.mediaDetails &&
      product.image.mediaDetails.width > product.image.mediaDetails.height
    ? "cover"
    : "contain";
  const imageUrlPrimaire = product.galleryImages?.nodes[0]
    ? product.galleryImages?.nodes[0].mediaItemUrl
    : product.image?.sourceUrl;
  const imageUrlSecondaire = product.image?.sourceUrl;
  // console.log(product.galleryImages, product.image);
  //  console.log(imageUrlPrimaire, imageUrlSecondaire);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence>
        {hovered ? (
          <motion.div
            key={`image-un`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ImageWithFallback
              src={imageUrlPrimaire}
              alt="Product image"
              layout="fill"
              objectFit={orientation}
            />
          </motion.div>
        ) : (
          <motion.div
            key={`image-deux`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ImageWithFallback
              src={imageUrlSecondaire}
              alt="Product image"
              layout="fill"
              objectFit={orientation}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
/*
					<div className="text-sm text-gray-700 product-description" dangerouslySetInnerHTML={{ __html: (product?.description)}}/>
*/
export default Product;
