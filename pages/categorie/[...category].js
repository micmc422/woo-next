import Layout from "../../src/components/Layout";
import client, { clientEng } from "../../src/components/ApolloClient";
import {
  PRODUCT_BY_CATEGORY_SLUG,
  PRODUCT_CATEGORIES_SLUGS,
} from "../../src/queries/product-by-category";
import { isArray, isEmpty } from "lodash";
import { useRouter } from "next/router";
import ShopLayout from "../../src/components/ShopLayout";
import { useEffect, useState } from "react";
import useSWR from "swr";
import getMenu from "../../src/get-menu-fallback";
import { motion } from "framer-motion";
import Head from "next/head";
import parse from "html-react-parser";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18nextConfig from "../../next-i18next.config";
import DisplayProducts from "../../src/components/sections/DisplayProducts";

const fetch = require("@vercel/fetch-retry")(require("node-fetch"));

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function CategorySingle(props) {
  const router = useRouter();
  const { query, locale } = router;

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  const {
    categoryName,
    products,
    cat,
    catBase,
    pageInfoStatic,
    menu,
    seoHead,
    tagList,
    seoSchema,
    footer,
    coupons,
    legal,
  } = props;
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [pageInfo, setPageInfo] = useState(pageInfoStatic);
  if (isArray(query["category"])) {
    query["category"] = query["category"][query["category"]?.length - 1];
  }

  delete query.lang;
  const formattedQuery = new URLSearchParams(query).toString();
  // console.log(query?.category[query?.category.length - 1]);
  const asQuery =
    query?.category?.length > 0 &&
    formattedQuery !== `category=${categoryName}`;
  // query?.category?.join("%2C")
  console.log(`/api/products/?locale=${locale}&${formattedQuery}`);
  const { data, error } = useSWR(
    asQuery ? `/api/products/?locale=${locale}&${formattedQuery}` : null,
    fetcher
  );
  const isLoading = !data && !error && asQuery;
  useEffect(() => {
    if (data?.products?.nodes?.length > 0) {
      setPageInfo(data?.products?.pageInfo || {});
      setFilteredProducts(data.products.nodes);
    } else {
      setPageInfo(pageInfoStatic);
      setFilteredProducts(products);
    }
  }, [formattedQuery, data?.products, products]);
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const seoData = seoHead && parse(seoHead);
  return (
    <Layout menu={menu} footer={footer} coupons={coupons} legal={legal}>
      <Head>
        {seoData ? seoData : ""}{" "}
        <script type="application/ld+json">{`${seoSchema}`}</script>
      </Head>
      <div className="container px-4 mx-auto my-8 xl:px-0">
        {categoryName ? (
          <motion.h1
            key={categoryName}
            initial={{ x: -200 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="relative w-full mb-5 overflow-hidden text-2xl font-black uppercase lg:text-8xl md:text-5xl sm:text-4xl"
          >
            {categoryName}
          </motion.h1>
        ) : (
          ""
        )}
        <ShopLayout
          categories={cat}
          catBase={catBase}
          pageInfo={pageInfo}
          setPageInfo={setPageInfo}
          tagList={tagList}
        >
          <div className="relative grid w-full grid-cols-2 gap-4 mx-auto overflow-hidden sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
            <DisplayProducts
              isLoading={isLoading}
              filteredProducts={filteredProducts}
            />
          </div>{" "}
        </ShopLayout>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ params: { category }, locale }) {
  const apolloCli = locale === "fr" ? client : clientEng;
  const queryPath = `/categorie/${category[category.length - 1]}/`;
  const queryMenuPath = `/categorie/${category[0]}/`;
  const { data } = await apolloCli.query({
    query: PRODUCT_BY_CATEGORY_SLUG,
    variables: {
      uri: queryPath,
      uriMenu: queryMenuPath,
    },
  });

  const menu = (await getMenu(locale)) || [];

  return {
    props: {
      legal: data?.legalmenu?.menuItems?.nodes || [],
      footer: data?.getFooter,
      coupons: data?.coupons.nodes,
      menu,
      categoryName: data?.productCategory?.name || "",
      pageInfoStatic: data?.productCategory?.products?.pageInfo || {},
      products: data?.productCategory?.products?.nodes || [],
      cat: data?.cat?.children?.nodes.length
        ? data?.cat?.children?.nodes
        : data?.catBase?.nodes || [],
      catBase: data?.catBase?.nodes || [],
      tagList: data?.tagList?.nodes || [],
      seoHead: data?.productCategory?.seo?.fullHead || "",
      seoSchema: data?.productCategory?.seo?.schema?.raw || "",
      catData: data?.productCategory,
      ...(await serverSideTranslations(
        locale,
        ["shop", "common"],
        nextI18nextConfig
      )),
    },
    revalidate: 86400,
  };
}

export async function getStaticPaths({}) {
  const apolloCli = client;
  const apolloCliEng = clientEng;
  const { data } = await apolloCli.query({
    query: PRODUCT_CATEGORIES_SLUGS,
  });

  const dataEn = await apolloCliEng.query({
    query: PRODUCT_CATEGORIES_SLUGS,
  });

  const pathsData = [];

  data?.productCategories?.nodes &&
    data?.productCategories?.nodes.map((productCategory) => {
      if (!isEmpty(productCategory?.uri)) {
        const category = productCategory?.uri
          .replace("https://photo.paris", "")
          .split("/")
          .filter((e) => e !== "" && !e.includes("?lang="))
          .slice(1, 99);
        if (category.length > 0) {
          pathsData.push({
            params: {
              category: [...category],
            },
          });
        }
      }
    });
  dataEn?.data?.productCategories?.nodes &&
    dataEn?.data?.productCategories?.nodes.map((productCategory) => {
      if (!isEmpty(productCategory?.uri)) {
        const category = productCategory?.uri
          .replace("https://photo.paris", "")
          .split("/")
          .filter((e) => e !== "" && !e.includes("?lang="))
          .slice(1, 99);
        if (category.length > 1) {
          pathsData.push({
            params: {
              category: [...category],
              locale: "en",
            },
          });
        }
      }
    });
  return {
    paths: pathsData,
    fallback: true,
  };
}
