import Layout from "../src/components/Layout";
import CartItemsContainer from "../src/components/cart/cart-page/CartItemsContainer";
import client, { clientEng } from "../src/components/ApolloClient";
import getMenu from "../src/get-menu-fallback";
import Head from "next/head";
import parse from "html-react-parser";
import { GET_PAGE_BY_URI } from "../src/queries/get-pages";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Cart = ({ page, menu, footer, coupons, legal }) => (
  <Layout menu={menu} footer={footer} coupons={coupons} legal={legal}>
    <Head>{page?.seo?.fullHead ? parse(page?.seo?.fullHead) : ""}</Head>
    <CartItemsContainer />
  </Layout>
);

export default Cart;

export async function getStaticProps({ locale, params }) {
  const apolloCli = locale === "fr" ? client : clientEng;
  const { data } = await apolloCli.query({
    query: GET_PAGE_BY_URI,
    variables: { uri: "/panier/" },
  });
  const menu = (await getMenu(locale)) || [];

  return {
    props: {
      menu,
      legal: data?.legalmenu?.menuItems?.nodes || [],
      footer: data?.getFooter,
      coupons: data?.coupons.nodes,
      page: data?.page || [],
      ...(await serverSideTranslations(locale, ["common", "panier"])),
    },
    revalidate: 86400,
  };
}
