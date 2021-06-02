import Layout from "../../src/components/Layout";
import { useRouter } from "next/router";
import client, { clientEng } from "../../src/components/ApolloClient";
import AddToCartButton from "../../src/components/cart/AddToCartButton";
import {
  PRODUCT_BY_SLUG_QUERY,
  PRODUCT_SLUGS,
} from "../../src/queries/product-by-slug";
import { isEmpty, uniqueId } from "lodash";
import RateBlock from "../../src/components/single-product/RateBlock";
import ColorSizeBlock from "../../src/components/single-product/ColorSizeBlock";
import ImageContainer from "../../src/components/single-product/ImageProduct";
import Link from "next/link";
import BlocPrix from "../../src/components/single-product/price/BlocPrix";
import { useEffect, useState } from "react";
import ContentParser from "../../src/components/ContentParser";
import getMenu from "../../src/get-menu-fallback";
import Head from "next/head";
import parse from "html-react-parser";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ProductCard from "../../src/components/Product";
import { Bouton } from "../../src/components/themeComponents";
import Loading from "../../src/components/Loading";
import { AnimatePresence, motion } from "framer-motion";
import Reviews from "../../src/components/single-product/reviews";

const parentListEl = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  exit: {},
};
const listEl = {
  initial: { y: -15, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: {},
};
export default function Product(props) {
  const { product, menu, footer } = props;
  const tmp = product?.variations?.nodes.slice();
  const orderredVariations = tmp?.sort(
    (a, b) => +a?.price?.replace(",00€", "") - +b?.price?.replace(",00€", "")
  );

  const seoData = product?.seo?.fullHead && parse(product?.seo?.fullHead);
  const seoSchema = product?.seo?.schema?.raw;
  const router = useRouter();
  const [activeVariations, setActiveVariations] = useState(
    orderredVariations ? orderredVariations[0] : null
  );
  const fullUpsellList = [
    ...(product?.upsell?.nodes || []),
    ...(product?.related?.nodes || []),
  ].slice(0, 8);
  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback || !product) {
    return <Loading />;
  }
  return (
    <Layout menu={menu} footer={footer}>
      <Head>
        {seoData ? seoData : ""}
        <script type="application/ld+json">{`${seoSchema}`}</script>
      </Head>
      <section className="px-5 py-4 mx-auto text-gray-600 body-font md:py-24">
        <div className="">
          <div className="flex flex-wrap mx-auto lg:w-4/5">
            <ImageContainer
              imgarray={[...product.galleryImages.nodes, product?.image]}
              slug={product.slug}
            />
            <div className="flex flex-col justify-center w-full mt-6 lg:w-1/2 lg:pl-10 lg:py-6 lg:mt-0">
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={parentListEl}
              >
                <div className="flex flex-row flex-wrap space-x-2 text-sm tracking-widest text-gray-300">
                  {product?.productCategories?.nodes.map(
                    ({ name, description, uri }) => {
                      return (
                        <motion.div variants={listEl}>
                          <Link
                            href={`${uri.replace("https://photo.paris", "")}`}
                            passHref
                            key={uniqueId(uri)}
                          >
                            <a className="uppercase transition-colors hover:text-gray-400">
                              {name}
                            </a>
                          </Link>
                        </motion.div>
                      );
                    }
                  )}
                </div>
              </motion.div>
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={parentListEl}
              >
                <div className="flex flex-row flex-wrap space-x-2 text-xs tracking-widest text-brand-500 title-font">
                  {product?.productTags?.nodes.map(
                    ({ name, description, uri }) => {
                      return (
                        <motion.div variants={listEl}>
                          <Link
                            href={`${uri.replace("https://photo.paris", "")}`}
                            passHref
                            key={uniqueId(uri)}
                          >
                            <a className="transition-colors hover:text-brand-800">
                              {name}
                            </a>
                          </Link>
                        </motion.div>
                      );
                    }
                  )}{" "}
                </div>
              </motion.div>
              <motion.h1
                initial={{ x: 50 }}
                animate={{ x: 0 }}
                exit={{ x: 50 }}
                className="my-1 text-3xl font-black text-gray-900 md:text-5xl lg:text-6xl title-font"
              >
                {product.name}
              </motion.h1>
              <RateBlock
                rating={product?.averageRating}
                reviewCount={product?.reviewCount}
                product={product}
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: product?.shortDescription,
                }}
              />
              <div className="flex flex-wrap">
                {product.variations && (
                  <ColorSizeBlock
                    setActiveVariations={setActiveVariations}
                    variations={orderredVariations}
                    activeVariations={activeVariations}
                    productName={product.name}
                  />
                )}
                <div className="sticky flex self-start px-6 py-2 ml-auto top-8">
                  <AddToCartButton
                    product={product}
                    variation={activeVariations}
                  >
                    <BlocPrix
                      price={product.price}
                      activeVariations={activeVariations}
                    />
                  </AddToCartButton>
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
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="max-w-screen-md pb-8 mx-auto">
        <Bouton>
          <div className="px-4 text-4xl md:text-8xl">à découvrir</div>
        </Bouton>
      </div>
      <div className="grid max-w-screen-lg grid-cols-2 gap-2 mx-auto md:gap-4 md:px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        <Upsell products={fullUpsellList} />
      </div>
      {<ProductDetails product={product} />}
    </Layout>
  );
}
const ProductDetails = ({ product }) => {
  const [activeTab, setActiveTab] = useState("description");
  return (
    <>
      <div
        className={`flex flex-row justify-center mx-auto space-x-3 border-bottom-2 border-gray-400 text-gray-500`}
      >
        <div
          onClick={() => setActiveTab("description")}
          className="cursor-pointer hover:text-black"
        >
          Description
        </div>
        <div
          onClick={() => setActiveTab("commentaires")}
          className="cursor-pointer hover:text-black"
        >
          Commentaires
        </div>
        <div
          onClick={() => setActiveTab("details")}
          className="cursor-pointer hover:text-black"
        >
          Détails
        </div>
        <div
          onClick={() => setActiveTab("artiste")}
          className="cursor-pointer hover:text-black"
        >
          Artistes
        </div>
      </div>
      <div className="container flex flex-col px-4 mx-auto mb-32 overflow-hidden single-product xl:px-0">
        <AnimatePresence>
          {activeTab === "description" && (
            <ContentParser data={product.description}></ContentParser>
          )}
          {activeTab === "commentaires" && (
            <Reviews reviews={product.reviews.nodes} />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
const Upsell = ({ products }) => {
  return (
    products &&
    products.map((product) => (
      <ProductCard product={product} noName key={uniqueId(product.id)} />
    ))
  );
};

export async function getStaticProps(context) {
  const {
    params: { slug },
    locale,
  } = context;

  const apolloCli = locale === "fr" ? client : clientEng;
  const menu = (await getMenu(locale)) || [];
  const { data } = await apolloCli.query({
    query: PRODUCT_BY_SLUG_QUERY,
    variables: { slug },
  });

  return {
    props: {
      menu,
      product: data?.product,
      footer: data?.getFooter,
      ...(await serverSideTranslations(locale, ["common", "footer", "shop"])),
    },
    revalidate: 86400,
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

  data?.products?.nodes &&
    data?.products?.nodes.map(({ slug }) => {
      if (!isEmpty(slug)) {
        pathsData.push({
          params: {
            slug: slug.toString(),
          },
          locale: "fr",
        });
      }
    });
  dataEn?.products?.nodes &&
    dataEn?.products?.nodes.map(({ slug }) => {
      if (!isEmpty(slug)) {
        pathsData.push({
          params: {
            slug: slug.toString(),
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
