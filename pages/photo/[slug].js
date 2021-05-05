import Layout from "../../src/components/Layout";
import { useRouter } from "next/router";
import client, { clientEng } from "../../src/components/ApolloClient";
import AddToCartButton from "../../src/components/cart/AddToCartButton";
import {
  PRODUCT_BY_SLUG_QUERY,
  PRODUCT_SLUGS,
} from "../../src/queries/product-by-slug";
import { isEmpty, uniqueId } from "lodash";
import Price from "../../src/components/single-product/price";
import RateBlock from "../../src/components/single-product/RateBlock";
import ColorSizeBlock from "../../src/components/single-product/ColorSizeBlock";
import ImageContainer from "../../src/components/single-product/ImageProduct";
import Link from "next/link";
import { AnimateSharedLayout, motion } from "framer-motion";
import BlocPrix from "../../src/components/single-product/price/BlocPrix";
import { useEffect, useState } from "react";
import ContentParser from "../../src/components/ContentParser";

export default function Product(props) {
  const { product } = props;

  const router = useRouter();
  const [activeVariations, setActiveVariations] = useState(
    product?.variations?.nodes[0]
  );
  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  useEffect(() => {});
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <Layout>
      <section className="overflow-hidden text-gray-600 body-font">
        <div className="px-5 py-24 mx-auto">
          <div className="flex flex-wrap mx-auto lg:w-4/5">
            <ImageContainer
              imgarray={[product?.image, ...product?.galleryImages.nodes]}
            />
            <AnimateSharedLayout>
              <motion.div
                className="flex flex-col justify-center w-full mt-6 lg:w-1/2 lg:pl-10 lg:py-6 lg:mt-0"
                layout
              >
                <h2 className="flex flex-row flex-wrap space-x-2 text-sm tracking-widest text-gray-500 title-font">
                  {product.productCategories.nodes.map(
                    ({ name, description, slug }) => {
                      return (
                        <Link
                          href={`/categorie/${slug}`}
                          passHref
                          key={uniqueId()}
                        >
                          <a className="transition-colors hover:text-gray-800">
                            {name}
                          </a>
                        </Link>
                      );
                    }
                  )}
                </h2>
                <h1 className="mb-1 text-3xl font-medium text-gray-900 title-font">
                  {product.name}
                </h1>
                <RateBlock
                  rating={product?.reviews?.averageRating}
                  reviewCount={product?.reviewCount}
                />
                <p className="leading-relaxed">
                  Fam locavore kickstarter distillery. Mixtape chillwave tumeric
                  sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo
                  juiceramps cornhole raw denim forage brooklyn. Everyday carry
                  +1 seitan poutine tumeric. Gastropub blue bottle austin
                  listicle pour-over, neutra jean shorts keytar banjo tattooed
                  umami cardigan.
                </p>
                <ColorSizeBlock
                  setActiveVariations={setActiveVariations}
                  variations={product.variations.nodes}
                  activeVariations={activeVariations}
                />
                <div className="flex">
                  <BlocPrix
                    price={product.price}
                    activeVariations={activeVariations}
                  />
                  <button className="flex px-6 py-2 ml-auto text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600">
                    Button
                  </button>
                  <button className="inline-flex items-center justify-center w-10 h-10 p-0 ml-4 text-gray-500 bg-gray-200 border-0 rounded-full">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                    </svg>
                  </button>
                </div>
              </motion.div>
            </AnimateSharedLayout>
          </div>
        </div>
      </section>
      {product ? (
        <div className="container px-4 mx-auto my-32 single-product xl:px-0">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col justify-center product-info">
              <h4 className="text-2xl uppercase products-main-title">
                {product.name}
              </h4>
              <Price
                salesPrice={product?.price}
                regularPrice={product?.regularPrice}
              />
              <AddToCartButton product={product} />
            </div>
          </div>
          <ContentParser data={product.description}></ContentParser>
          {false && (
            <div
              dangerouslySetInnerHTML={{
                __html: product.description,
              }}
              className="container mx-auto mb-5 product-description"
            />
          )}
        </div>
      ) : (
        ""
      )}
    </Layout>
  );
}

export async function getStaticProps(context) {
  const {
    params: { slug },
  } = context;

  const { data } = await client.query({
    query: PRODUCT_BY_SLUG_QUERY,
    variables: { slug },
  });

  return {
    props: {
      product: data?.product || {},
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const apolloCli = client;
  const apolloCliEng = clientEng;
  const { data } = await apolloCli.query({
    query: PRODUCT_SLUGS,
  });
  const { dataEn } = await apolloCliEng.query({
    query: PRODUCT_SLUGS,
  });

  const pathsData = [];

  data?.productCategories?.nodes &&
    data?.productCategories?.nodes.map((productCategory) => {
      if (!isEmpty(productCategory?.slug)) {
        pathsData.push({
          params: {
            slug: productCategory?.slug.toString(),
          },
          locale: "fr",
        });
      }
    });
  dataEn?.productCategories?.nodes &&
    dataEn?.productCategories?.nodes.map((productCategory) => {
      if (!isEmpty(productCategory?.slug)) {
        pathsData.push({
          params: {
            slug: productCategory?.slug.toString(),
          },
          locale: "en",
        });
      }
    });

  return {
    paths: pathsData,
    fallback: true,
  };
}
