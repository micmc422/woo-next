import Layout from "../../src/components/Layout";
import client, { clientEng } from "../../src/components/ApolloClient";
import Product from "../../src/components/Product";
import {
  PRODUCT_BY_CATEGORY_SLUG,
  PRODUCT_CATEGORIES_SLUGS,
} from "../../src/queries/product-by-category";
import { isEmpty } from "lodash";
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
import { GET_PAGE_BY_URI } from "../../src/queries/get-pages";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function CategorySingle(props) {
  const router = useRouter();
  const { query, locale } = useRouter();

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
    page,
  } = props;
  // console.log({ cat, catBase, query });
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [pageInfo, setPageInfo] = useState(pageInfoStatic);
  const catName = query?.category?.length
    ? query.category[query.category.length - 1]
    : "";
  delete query.category;
  const formattedQuery = new URLSearchParams(query).toString();
  const catInFilterred = cat?.filter(({ slug }) => slug === query?.categoryIn);
  //const categoryIn = catInFilterred?.length > 0 && catInFilterred[0].name;
  const { data, error } = useSWR(
    formattedQuery?.length > 0
      ? `/api/products/?locale=${locale}&category=${catName}&${formattedQuery}`
      : null,
    fetcher
  );
  const isLoading = !data && !error;

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
    <Layout menu={menu}>
      <Head>{seoData ? seoData : ""}</Head>
      <div className="container px-4 mx-auto my-8 xl:px-0">
        {categoryName ? (
          <motion.h3
            key={categoryName}
            initial={{ x: -200 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="mb-5 text-4xl font-black uppercase lg:text-8xl md:text-6xl"
          >
            {categoryName}
          </motion.h3>
        ) : (
          ""
        )}
        <ShopLayout
          categories={cat}
          catBase={catBase}
          pageInfo={pageInfo}
          setPageInfo={setPageInfo}
        >
          <div className="grid grid-cols-2 gap-4 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
            {isLoading
              ? filteredProducts.map((product) => (
                  <Product key={product?.id} product={product} />
                ))
              : [...Array(24).keys()].map((key) => (
                  <Product key={key} product={key} />
                ))}
          </div>{" "}
        </ShopLayout>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ params: { category }, locale }) {
  const apolloCli = locale === "fr" ? client : clientEng;
  // console.log({ category });
  const queryPath = `/categorie/${category[category.length - 1]}/`;
  const queryMenuPath = `/categorie/${category[0]}/`;
  // console.log({ queryPath, queryMenuPath });
  const { data } = await apolloCli.query({
    query: PRODUCT_BY_CATEGORY_SLUG,
    variables: {
      uri: queryPath,
      uriMenu: queryMenuPath,
    },
  });
  console.log(`categorie/${category.join("/")}`);

  const menu = (await getMenu(locale)) || [];

  return {
    props: {
      menu,
      categoryName: data?.productCategory?.name || "",
      pageInfoStatic: data?.productCategory?.products?.pageInfo || {},
      products: data?.productCategory?.products?.nodes || [],
      cat: data?.cat?.children?.nodes.length
        ? data?.cat?.children?.nodes
        : data?.catBase?.nodes || [],
      catBase: data?.catBase?.nodes || [],
      seoHead: data?.seo?.seo?.fullHead || "",
      ...(await serverSideTranslations(locale, ["shop"], nextI18nextConfig)),
    },
    revalidate: 1,
  };
}

export async function getStaticPaths({}) {
  const apolloCli = client;
  const apolloCliEng = clientEng;
  const { data } = await apolloCli.query({
    query: PRODUCT_CATEGORIES_SLUGS,
  });

  const { dataEn } = await apolloCliEng.query({
    query: PRODUCT_CATEGORIES_SLUGS,
  });

  const pathsData = [];

  data?.productCategories?.nodes &&
    data?.productCategories?.nodes.map((productCategory) => {
      /// console.log(data?.productCategories?.nodes);
      if (!isEmpty(productCategory?.uri)) {
        pathsData.push({
          params: {
            category: productCategory?.uri
              .split("/")
              .filter((e) => e !== "")
              .slice(1, 99),
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
            category: productCategory?.uri
              .split("/")
              .filter((e) => e !== "")
              .slice(1, 99),
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
