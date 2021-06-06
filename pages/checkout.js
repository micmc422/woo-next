import Layout from "../src/components/Layout";
import CheckoutForm from "../src/components/checkout/CheckoutForm";
import GET_COUNTRIES from "../src/queries/get-countries";
import client, { clientEng } from "../src/components/ApolloClient";
import { GET_PAGE_BY_URI } from "../src/queries/get-pages";
import getMenu from "../src/get-menu-fallback";
import Head from "next/head";
import parse from "html-react-parser";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Checkout = ({ data, page, menu }) => (
  <Layout menu={menu}>
    <Head>{page?.seo?.fullHead ? parse(page?.seo?.fullHead) : ""}</Head>
    <div className="container px-4 mx-auto my-32 checkout xl:px-0">
      <h1 className="mb-5 text-2xl uppercase">Checkout Page</h1>
      <CheckoutForm countriesData={data?.wooCountries ?? {}} />
    </div>
  </Layout>
);

export default Checkout;

export async function getStaticProps({ locale, params }) {
  const country = await client.query({
    query: GET_COUNTRIES,
  });
  const apolloCli = locale === "fr" ? client : clientEng;
  const { data } = await apolloCli.query({
    query: GET_PAGE_BY_URI,
    variables: { uri: "/commande/" },
  });
  const menu = (await getMenu(locale)) || [];

  return {
    props: {
      data: country.data || {},
      menu,
      page: data?.page || [],
      ...(await serverSideTranslations(locale, [
        "common",
        "checkout",
      ])),
    },
    revalidate: 86400,
  };
}
