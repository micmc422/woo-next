import Layout from "../src/components/Layout";
import client, { clientEng } from "../src/components/ApolloClient";
import { GET_PAGE_BY_URI, GET_PAGES_URI } from "../src/queries/get-pages";
import { isEmpty } from "lodash";
import ContentParser from "../src/components/ContentParser";
import getMenu from "../src/get-menu-fallback";

export default function Home(props) {
  const { page, menu } = props;

  return (
    <Layout menu={menu}>
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
      menu,
      page: data?.page || [],
    },
    revalidate: 86400,
  };
}

export async function getStaticPaths() {
  const apolloCli = client;
  const apolloCliEng = clientEng;
  const { data } = await apolloCli.query({
    query: GET_PAGES_URI,
  });
  const { dataEn } = await apolloCliEng.query({
    query: GET_PAGES_URI,
  });

  const pathsData = [];

  data?.pages?.nodes &&
    data?.pages?.nodes.map(({ uri }) => {
      if (!isEmpty(uri)) {
        pathsData.push({
          params: {
            page: uri.toString(),
          },
          locale: "fr",
        });
      }
    });
  dataEn?.pages?.nodes &&
    dataEn?.pages?.nodes.map(({ uri }) => {
      if (!isEmpty(productCategory?.slug)) {
        pathsData.push({
          params: {
            page: uri.toString(),
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
