import Layout from "src/components/Layout";
import Product from "src/components/Product";
import client, { clientEng } from "src/components/ApolloClient";
import PRODUCTS_AND_CATEGORIES_QUERY from "src/queries/product-and-categories";
import HeroCarousel from "src/components/home/hero-carousel";
import CategoryBlocs from "../../src/components/category/category-block/CategoryBlocs";
import ParentCategoriesBlock from "../../src/components/category/category-block/ParentCategoriesBlock";
import LargeSlider from "../../src/components/sections/LargeSlider";

import ShopLayout from "../../src/components/ShopLayout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { motion } from "framer-motion";
import getMenu from "../../src/get-menu-fallback";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Home(props) {
  const {
    products,
    productCategories,
    heroCarousel,
    bestSeller,
    cat,
    pageInfoStatic,
    menu,
  } = props;

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [pageInfo, setPageInfo] = useState(pageInfoStatic);
  const { query, locale } = useRouter();
  let formattedQuery = new URLSearchParams(query).toString();
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
    console.log(data?.products?.nodes);
    console.log(products);
    console.log(filteredProducts);
  }, [query, data?.products?.nodes, locale]);
  return (
    <Layout menu={menu}>
      {/*Hero Carousel*/}
      <HeroCarousel heroCarousel={heroCarousel} />
      {/*Products*/}
      <LargeSlider products={bestSeller} />
      <div className="container px-4 mx-auto my-32 products xl:px-0">
        <h2 className="mb-5 text-xl uppercase products-main-title main-title">
          <span className="main-title-inner">Products</span>
        </h2>
      </div>
      <ShopLayout
        categories={cat}
        pageInfo={pageInfo}
        setPageInfo={setPageInfo}
      >
        <motion.div
          className="grid grid-cols-2 gap-4 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4"
          layout
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
        </motion.div>
      </ShopLayout>{" "}
      {/*Categories*/}
      <div className="container px-4 mx-auto my-8 md:my-32 product-categories-container xl:px-0">
        <h2 className="mb-5 text-xl uppercase main-title">
          <span className="main-title-inner">Categories</span>
        </h2>
        <ParentCategoriesBlock productCategories={productCategories} />
      </div>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  const apolloCli = locale === "fr" ? client : clientEng;
  const { data } = await apolloCli.query({
    query: PRODUCTS_AND_CATEGORIES_QUERY,
  });
  const menu = (await getMenu(locale)) || [];

  return {
    props: {
      menu,
      productCategories: data?.productCategories?.nodes
        ? data.productCategories.nodes
        : [],
      products: data?.products?.nodes ? data.products.nodes : [],
      pageInfoStatic: data?.products?.pageInfo,
      bestSeller: data?.bestSeller?.nodes ? data.bestSeller.nodes : [],
      cat: data?.cat?.nodes ? data.cat.nodes : [],
    },
    revalidate: 1,
  };
}
