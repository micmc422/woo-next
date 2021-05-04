import Layout from "../../src/components/Layout";
import client, { clientEng } from "../../src/components/ApolloClient";
import Product from "../../src/components/Product";
import {
  PRODUCT_BY_CATEGORY_SLUG,
  PRODUCT_CATEGORIES_SLUGS,
} from "../../src/queries/product-by-category";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import ShopLayout from "../../src/components/ShopLayout";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function CategorySingle(props) {
  const router = useRouter();
  const { query } = router;

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  const { categoryName, products, cat } = props;
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [pageInfo, setPageInfo] = useState({});
  const formattedQuery = new URLSearchParams(query).toString();
  const { data, error } = useSWR(`/api/products/?${formattedQuery}`, fetcher);
  useEffect(() => {
    if (data?.products) {
      setPageInfo(data?.products?.pageInfo || {});
      setFilteredProducts(data.products.nodes);
    }
  }, [data]);
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="px-4 mx-auto my-32 xl:px-0">
        {categoryName ? (
          <h3 className="mb-5 text-2xl uppercase">{categoryName}</h3>
        ) : (
          ""
        )}
        <ShopLayout categories={cat}>
          <div className="grid grid-cols-1 gap-4 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
            {undefined !== products && products?.length
              ? products.map((product) => (
                  <Product key={product?.id} product={product} />
                ))
              : ""}
          </div>{" "}
        </ShopLayout>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ params: { slug }, locale }) {
  const apolloCli = locale === "fr" ? client : clientEng;
  const { data } = await apolloCli.query({
    query: PRODUCT_BY_CATEGORY_SLUG,
    variables: { slug },
  });

  return {
    props: {
      categoryName: data?.productCategory?.name || "",
      products: data?.productCategory?.products?.nodes || [],
      cat: data?.cat?.nodes || [],
    },
    revalidate: 1,
  };
}

export async function getStaticPaths({}) {
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
