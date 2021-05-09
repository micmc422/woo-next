import Layout from "../src/components/Layout";
import client from "../src/components/ApolloClient";
import ParentCategoriesBlock from "../src/components/category/category-block/ParentCategoriesBlock";
import { GET_CATEGORIES_QUERY_FULL } from "../src/queries/get-categories";

export default function Categories(props) {
  const { productCategories } = props;

  return (
    <Layout>
      {/*Categories*/}
      <div className="container px-4 mx-auto my-8 md:my-32 categories product-categories-container xl:px-0">
        <h2 className="mb-5 text-2xl uppercase">Categories</h2>
        <ParentCategoriesBlock productCategories={productCategories} />
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: GET_CATEGORIES_QUERY_FULL,
  });

  return {
    props: {
      productCategories: data?.productCategories?.nodes || [],
    },
    revalidate: 1,
  };
}
