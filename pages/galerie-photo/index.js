import Layout from "src/components/Layout";
import Product from "src/components/Product";
import client, { clientEng } from "src/components/ApolloClient";
import PRODUCTS_AND_CATEGORIES_QUERY from "src/queries/product-and-categories";
import ParentCategoriesBlock from "../../src/components/category/category-block/ParentCategoriesBlock";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import nextI18NextConfig from "../../next-i18next.config.js";

import ShopLayout from "../../src/components/ShopLayout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { motion } from "framer-motion";
import getMenu from "../../src/get-menu-fallback";
import Head from "next/head";
import parse from "html-react-parser";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Home(props) {
  const {
    products,
    productCategories,
    catBase,
    cat,
    pageInfoStatic,
    menu,
    seoHead,
    seoSchema,
  } = props;
  const seoData = seoHead && parse(seoHead);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [pageInfo, setPageInfo] = useState(pageInfoStatic);
  const { query, locale } = useRouter();
  let formattedQuery = new URLSearchParams(query)?.toString();
  const { data, error } = useSWR(
    formattedQuery.length > 0
      ? `/api/products/?locale=${locale}&${formattedQuery}`
      : null,
    fetcher
  );
  const isLoading = !data && !error && formattedQuery.length;
  useEffect(() => {
    if (data?.products?.nodes?.length > 0) {
      setPageInfo(data?.products?.pageInfo);
      setFilteredProducts(data.products.nodes);
    } else {
      setPageInfo(pageInfoStatic);
      setFilteredProducts(products);
    }
  }, [query, data?.products?.nodes, locale]);
  return (
    <Layout menu={menu}>
      <Head>
        {seoData ? seoData : ""}{" "}
        <script type="application/ld+json">{`${seoSchema}`}</script>
      </Head>
      <div className="container px-4 mx-auto my-8 xl:px-0">
        <motion.h3
          initial={{ x: -200 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          className="mb-5 text-4xl font-black uppercase lg:text-8xl md:text-6xl"
        >
          PARIS EST UNE PHOTO
        </motion.h3>
        <ShopLayout
          categories={cat}
          pageInfo={pageInfo}
          setPageInfo={setPageInfo}
          catBase={catBase}
        >
          <div
            className="grid grid-cols-2 gap-4 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4"
          >
            {!isLoading ? (
              filteredProducts?.length > 0 ? (
                filteredProducts.map((product) => (
                  <Product key={product?.id} product={product} />
                ))
              ) : (
                <div> aucun résultat</div>
              )
            ) : (
              [...Array(24).keys()].map((key) => (
                <Product key={key} product={key} />
              ))
            )}
          </div>
        </ShopLayout>{" "}
        {/*Categories*/}
        <div className="container px-4 mx-auto my-8 md:my-32 product-categories-container xl:px-0">
          <h2 className="mb-5 text-xl uppercase main-title">
            <span className="main-title-inner">Categories</span>
          </h2>
          <ParentCategoriesBlock productCategories={productCategories} />
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  const apolloCli = locale === "fr" ? client : clientEng;
  const uriMenu = locale === "fr" ? "/categorie/" : "/categorie/";
  const uri = locale === "fr" ? "/galerie-photo/" : "/gallery/";
  const { data } = await apolloCli.query({
    query: PRODUCTS_AND_CATEGORIES_QUERY,
    variables: { uri, uriMenu, first: 24 },
  });
  const menu = (await getMenu(locale)) || [];

  return {
    props: {
      menu,
      productCategories: data?.productCategories?.nodes
        ? data.productCategories.nodes
        : [],
      products: data?.products?.nodes ? data.products.nodes : [],
      pageInfoStatic: data?.products?.pageInfo || {},
      bestSeller: data?.bestSeller?.nodes ? data.bestSeller.nodes : [],
      cat: data?.cat?.nodes ? data.cat.nodes : [],
      catBase: data?.catBase?.nodes || [],
      seoHead: data?.seo?.seo?.fullHead || "",
      seoSchema: data?.seo?.seo?.schema?.raw || "",
      ...(await serverSideTranslations(locale, ["shop", "common"], nextI18nextConfig)),
    },
    revalidate: 86400,
  };
}
