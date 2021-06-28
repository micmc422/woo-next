import Layout from "../src/components/Layout";
import CheckoutForm from "../src/components/checkout/CheckoutForm";
import GET_COUNTRIES from "../src/queries/get-countries";
import client, { clientEng } from "../src/components/ApolloClient";
import { GET_PAGE_BY_URI } from "../src/queries/get-pages";
import getMenu from "../src/get-menu-fallback";
import Head from "next/head";
import parse from "html-react-parser";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ThemePName } from "../src/components/themeComponents";
import { Elements, ElementsConsumer } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProgressState from "../src/components/checkout/ProgressState";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC);

const paiemement = ({ data, page, menu, footer, coupons, legal }) => {
  return (
    <Layout menu={menu} footer={footer} coupons={coupons} legal={legal}>
      <Head>{page?.seo?.fullHead ? parse(page?.seo?.fullHead) : ""}</Head>
      <div className="container px-4 mx-auto my-2 md:my-4 xl:px-0">
        <ThemePName>{page?.title}</ThemePName>
        <ProgressState activeState={2} />
      </div>

      <div className="container mx-auto mb-8 md:mb-16 lg:mb-32">
        <Elements stripe={stripePromise}>
          <InjectedCheckoutForm countriesData={data?.wooCountries ?? {}} />
        </Elements>
      </div>
    </Layout>
  );
};

const InjectedCheckoutForm = ({ countriesData }) => {
    return (
      <ElementsConsumer>
        {({ elements, stripe }) => (
          <CheckoutForm
            elements={elements}
            stripe={stripe}
            countriesData={countriesData ?? {}}
          />
        )}
      </ElementsConsumer>
    );
  };

  
export default paiemement;

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
      legal: data?.legalmenu?.menuItems?.nodes || [],
      footer: data?.getFooter,
      coupons: data?.coupons.nodes,
      page: data?.page || [],
      ...(await serverSideTranslations(locale, ["common", "checkout"])),
    },
    revalidate: 86400,
  };
}
