import Link from "next/link";
import AddToCartButton from "../components/cart/AddToCartButton";
import clientConfig from "../../client-config";
import { isEmpty, uniqueId } from "lodash";
import Price from "./single-product/price";
import { useState } from "react";
import { Bouton } from "./themeComponents";
import { AnimatePresence, motion } from "framer-motion";
import ImageWithFallback from "./ImageFallBack";
import Skeleton from "react-loading-skeleton";
import { FaRegComments, FaRegHeart } from "react-icons/fa";
import { MdFiberNew, MdNewReleases } from "react-icons/md";
import { useTranslation } from "react-i18next";

const productCardAnimationContainer = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};
const Product = (props) => {
  const { product, noName } = props;
  const starBloc = [1, 2, 3, 4, 5];
  const { t } = useTranslation("shop");
  const dateToOld = new Date(new Date().setDate(new Date().getDate() - 60));
  const dateProd = new Date(product.date);
  const isNew = dateToOld < dateProd;
  return (
    // @TODO Need to handle Group products differently.
    <div className="w-full product" key={uniqueId()}>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={productCardAnimationContainer}
      >
        <Link
          href={product.slug ? `/galerie-photo/${product.slug}` : "./"}
          passHref
        >
          <a className="relative block h-48 md:h-64">
            <div className="absolute top-0 right-0 z-10 flex">
              {isNew && (
                <div
                  className={`m-2 p-1 text-brand-500 bg-white bg-opacity-25 rounded-full shadow`}
                >
                  <MdFiberNew />
                </div>
              )}
              {product.featured && (
                <div
                  className={`m-2 p-1 text-purple-500 bg-white bg-opacity-25 rounded-full shadow`}
                >
                  <FaRegHeart />
                </div>
              )}
            </div>
            {!isEmpty(product.image) ? (
              <VignettePhoto product={product} noName={noName} />
            ) : !isEmpty(clientConfig.productImagePlaceholder) ? (
              <div className="relative overflow-hidden">
                <Skeleton height={192} width={250} />
              </div>
            ) : null}
          </a>
        </Link>
        {!noName && (
          <div className="text-center cursor-pointer product-info">
            <Link href={product.slug ? `/galerie-photo/${product.slug}` : "./"}>
              <h3 className="pb-2 mt-3 text-xs font-thin leading-4 text-center text-gray-600 hover:text-gray-800 md:text-base">
                {product.name ? product.name : "Chargement..."}
              </h3>
            </Link>
            <div className="flex flex-row justify-between">
              {product.name && (
                <>
                  {product.__typename === "VariableProduct" ? (
                    <Bouton>
                      <Link
                        href={
                          product.slug ? `/galerie-photo/${product.slug}` : "./"
                        }
                        passHref
                      >
                        <a className="">
                          <Price
                            salesPrice={product?.price}
                            regularPrice={product?.regularPrice}
                          />
                        </a>
                      </Link>
                    </Bouton>
                  ) : (
                    <AddToCartButton product={product}>
                      <div className="">
                        <Price
                          salesPrice={product?.price}
                          regularPrice={product?.regularPrice}
                        />
                      </div>
                    </AddToCartButton>
                  )}
                  {false && (
                    <div className="flex flex-row md:flex-col">
                      <div className="hidden m-auto my-1 cursor-pointer lg:block">
                        <Bouton
                          circleClass={"neuromorphism-brand hover:ring-2"}
                          small={true}
                        >
                          <Link
                            href={
                              product.slug
                                ? `/galerie-photo/${product.slug}`
                                : "./"
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-6 h-6 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </Link>
                        </Bouton>
                      </div>
                    </div>
                  )}
                </>
              )}
              <div className="flex flex-col items-end">
                <div className="flex items-center">
                  <span className={``}>
                    {product.averageRating > 1 ? (
                      <>
                        <span
                          className="flex items-center"
                          onClick={() => setReviews(true)}
                        >
                          {starBloc.map((count) =>
                            count <= product.averageRating ? (
                              <svg
                                key={uniqueId(count)}
                                fill="currentColor"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="w-4 h-4 text-brand-500"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                              </svg>
                            ) : (
                              <svg
                                key={uniqueId(count)}
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="w-4 h-4 text-brand-500"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                              </svg>
                            )
                          )}
                        </span>
                      </>
                    ) : (
                      <></>
                    )}
                  </span>
                </div>
                {product.reviewCount > 0 && (
                  <div className="flex items-start px-1 pr-1 text-gray-400">
                    <span className="pr-1 text-sm text-bold">
                      {product.reviewCount}
                    </span>
                    <FaRegComments />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

const VignettePhoto = ({ product, noName }) => {
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

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence>
        {hovered ? (
          <motion.div
            className="absolute inset-0"
            key={uniqueId(product.id)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ImageWithFallback
              src={imageUrlPrimaire}
              slug={product.slug}
              alt={product?.image?.altText || product?.image?.title}
              layout="fill"
              objectfit={noName ? "cover" : orientation}
            />
          </motion.div>
        ) : (
          <motion.div
            className="absolute inset-0"
            key={uniqueId(product.id + "-alt")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ImageWithFallback
              src={imageUrlSecondaire}
              slug={product.slug}
              alt={product?.image?.altText || product?.image?.title}
              layout="fill"
              objectfit={noName ? "contain" : orientation}
              objectPosition
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default Product;
