import Home from "../galerie-photo/index";
import client, { clientEng } from "src/components/ApolloClient";
import PRODUCTS_AND_CATEGORIES_QUERY from "src/queries/product-and-categories";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import getMenu from "../../src/get-menu-fallback";
import nextI18nextConfig from "../../next-i18next.config.js";
const fetch = require("@vercel/fetch-retry")(require("node-fetch"));

const fetcher = (url) => fetch(url).then((r) => r.json());

const index = (props) => {
  return <Home {...props} />;
};

export default index;

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
      tagList: data?.tagList?.nodes || [],
      pageInfoStatic: data?.products?.pageInfo || {},
      bestSeller: data?.bestSeller?.nodes ? data.bestSeller.nodes : [],
      cat: data?.cat?.nodes ? data.cat.nodes : [],
      catBase: data?.catBase?.nodes || [],
      seoHead: data?.seo?.seo?.fullHead || "",
      seoSchema: data?.seo?.seo?.schema?.raw || "",
      ...(await serverSideTranslations(
        locale,
        ["shop", "common"],
        nextI18nextConfig
      )),
    },
    revalidate: 86400,
  };
}
