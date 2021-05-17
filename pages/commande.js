import Layout from "../src/components/Layout";
import CheckoutForm from "../src/components/checkout/CheckoutForm";
import GET_COUNTRIES from "../src/queries/get-countries";
import client from "../src/components/ApolloClient";

const Checkout = ({ data }) => (
  <Layout>
    <div className="container px-4 mx-auto my-32 checkout xl:px-0">
      <h1 className="mb-5 text-2xl uppercase">Checkout Page</h1>
      <CheckoutForm countriesData={data?.wooCountries ?? {}} />
    </div>
  </Layout>
);

export default Checkout;

export async function getStaticProps() {
  const { data } = await client.query({
    query: GET_COUNTRIES,
  });

  return {
    props: {
      data: data || {},
    },
    revalidate: 1,
  };
}
