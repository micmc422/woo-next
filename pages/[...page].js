import Layout from "../src/components/Layout";
import client, { clientEng } from "../src/components/ApolloClient";
import { GET_PAGE_BY_URI, GET_PAGES_URI } from "../src/queries/get-pages";
import { isEmpty } from "lodash";
import ContentParser from "../src/components/ContentParser";
import getMenu from "../src/get-menu-fallback";
import Head from "next/head";
import parse from "html-react-parser";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18nextConfig from "../next-i18next.config";
import { useRouter } from "next/router";
import Loading from "../src/components/Loading";
import GET_PRODUCTS_QUERY from "../src/queries/get-products";

export default function Home(props) {
  const { page, menu, footer, coupons, customProducts } = props;
  const seoData = page?.seo?.fullHead && parse(page?.seo?.fullHead);
  const seoSchema = page?.seo?.schema?.raw;
  const router = useRouter();

  if (router.isFallback || !page) {
    return <Loading />;
  }
  return (
    <Layout menu={menu} footer={footer} coupons={coupons}>
      <Head>
        {seoData ? seoData : " "}
        <script type="application/ld+json">{`${seoSchema}`}</script>
      </Head>

      {page?.content && (
        <ContentParser
          data={page?.content}
          products={customProducts}
        ></ContentParser>
      )}
    </Layout>
  );
}

export async function getStaticProps({ locale, params }) {
  console.log(params.page);
  // const apolloCli = client;
  const apolloCli = locale === "fr" ? client : clientEng;
  const { data } = await apolloCli.query({
    query: GET_PAGE_BY_URI,
    variables: { uri: params.page.join("/").replace("?lang=en", "") },
  });
  const menu = (await getMenu(locale)) || [];
  const paramsQuery = {
    first: 24,
    after: undefined,
    before: undefined,
    search: undefined,
    exclude: undefined,
    locale: undefined,
    category: "creations-originales",
    tag: undefined,
    // categoryIn: categoryIn ? categoryIn : category ? category : null,
  };

  const customProducts = await apolloCli.query({
    query: GET_PRODUCTS_QUERY,
    variables: paramsQuery,
  });

  return {
    props: {
      footer: data?.getFooter,
      coupons: data?.coupons.nodes,
      menu,
      customProducts: customProducts?.data?.products?.nodes,
      page: data?.page || [],
      ...(await serverSideTranslations(
        locale,
        ["shop", "common"],
        nextI18nextConfig
      )),
    },
    revalidate: 86400,
  };
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: GET_PAGES_URI,
  });
  const dataEng = await clientEng.query({
    query: GET_PAGES_URI,
  });
  const pathsData = [];

  data?.pages?.nodes &&
    data?.pages?.nodes.map(({ uri }) => {
      if (
        !isEmpty(uri) &&
        // !uri.includes("contact") &&
        !uri.includes("galerie-photo") &&
        !uri.includes("commande") &&
        !uri.includes("cart") &&
        !uri.includes("my-account") &&
        !uri.includes("checkout") &&
        !uri.includes("mon-compte") &&
        !uri.includes("panier") &&
        !uri.includes("home") &&
        !uri.includes("gallery") &&
        !uri.includes("contemporary-photographs")
      ) {
        const parsedUri = uri
          ?.replace("?lang=en", "")
          ?.split("/")
          .filter((item) => item !== "" && item !== "/");
        parsedUri.length > 0 &&
          pathsData.push({
            params: {
              page: parsedUri,
            },
            locale: uri.includes("?lang=en") ? "en" : "fr",
          });
      }
    });
  dataEng?.data?.pages?.nodes &&
    dataEng?.data?.pages?.nodes.map(({ uri }) => {
      if (
        !isEmpty(uri) &&
        // !uri.includes("contact") &&
        !uri.includes("galerie-photo") &&
        !uri.includes("commande") &&
        !uri.includes("cart") &&
        !uri.includes("my-account") &&
        !uri.includes("checkout") &&
        !uri.includes("mon-compte") &&
        !uri.includes("panier") &&
        !uri.includes("home") &&
        !uri.includes("gallery") &&
        !uri.includes("contemporary-photographs")
      ) {
        const parsedUri = uri
          ?.replace("?lang=en", "")
          ?.split("/")
          .filter((item) => item !== "" && item !== "/");
        parsedUri.length > 0 &&
          pathsData.push({
            params: {
              page: parsedUri,
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
