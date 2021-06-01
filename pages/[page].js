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

export default function Home(props) {
  const { page, menu,footer } = props;
  const seoData = page?.seo?.fullHead && parse(page?.seo?.fullHead);
  const seoSchema = page?.seo?.schema?.raw;
  // console.log(page);
  return (
    <Layout menu={menu} translations={page?.translations} footer={footer}>
      <Head>
        {seoData ? seoData : " "}{" "}
        <script type="application/ld+json">{`${seoSchema}`}</script>
      </Head>

      <ContentParser data={page?.content}></ContentParser>
    </Layout>
  );
}

export async function getStaticProps({ locale, params }) {
  const apolloCli = locale === "fr" ? client : clientEng;
  const { data } = await apolloCli.query({
    query: GET_PAGE_BY_URI,
    variables: { uri: params.page },
  });
  const menu = (await getMenu(locale)) || [];

  return {
    props: {
      footer: data?.getFooter,
      menu,
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
  const { dataEn } = await clientEng.query({
    query: GET_PAGES_URI,
  });

  const pathsData = [];

  data?.pages?.nodes &&
    data?.pages?.nodes.map(({ uri }) => {
      if (!isEmpty(uri) && !uri.includes("contact")) {
        pathsData.push({
          params: {
            page: uri,
          },
          locale: "fr",
        });
      }
    });
  dataEn?.pages?.nodes &&
    dataEn?.pages?.nodes.map(({ uri }) => {
      if (!isEmpty(uri) && !uri.includes("contact")) {
        pathsData.push({
          params: {
            page: uri,
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
