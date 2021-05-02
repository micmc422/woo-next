import Layout from "../../src/components/Layout";
import client, { clientEng } from "../../src/components/ApolloClient";
import Product from "../../src/components/Product";
import {
  PRODUCT_BY_CATEGORY_SLUG,
  PRODUCT_CATEGORIES_SLUGS,
} from "../../src/queries/product-by-category";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";

export default function CategorySingle(props) {
  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { categoryName, products } = props;

  return (
    <Layout>
      <div className="container px-4 mx-auto my-32 product-categories-container xl:px-0">
        {categoryName ? (
          <h3 className="mb-5 text-2xl uppercase">{categoryName}</h3>
        ) : (
          ""
        )}
        <div className="grid grid-cols-2 gap-4 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {undefined !== products && products?.length
            ? products.map((product) => (
                <Product key={product?.id} product={product} />
              ))
            : ""}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const {
    params: { slug },
    locale,
  } = context;

  const apolloCli = locale === "fr" ? client : clientEng;
  const { data } = await apolloCli.query({
    query: PRODUCT_BY_CATEGORY_SLUG,
    variables: { slug },
  });

  return {
    props: {
      categoryName: data?.productCategory?.name || "",
      products: data?.productCategory?.products?.nodes || [],
    },
    revalidate: 1,
  };
}

export async function getStaticPaths({ locale }) {
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
      if (!isEmpty(productCategory?.slug)) {
        pathsData.push({
          params: {
            slug: productCategory?.slug.toString(),
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
            slug: productCategory?.slug.toString(),
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
