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
import getMenu from "../../src/get-menu-fallback";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function CategorySingle(props) {
  const router = useRouter();
  const { query, locale } = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  const { categoryName, products, cat, pageInfoStatic, menu } = props;
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [pageInfo, setPageInfo] = useState(pageInfoStatic);
  const formattedQuery = new URLSearchParams(query).toString();
  const { data, error } = useSWR(
    formattedQuery.length > 0
      ? `/api/products/?locale=${locale}&${formattedQuery}`
      : null,
    fetcher
  );
  const isLoading = !data && !error && formattedQuery.length;

  useEffect(() => {
    if (data?.products) {
      setPageInfo(data?.products?.pageInfo || {});
      setFilteredProducts(data.products.nodes);
    } else {
      setPageInfo(pageInfoStatic);
      setFilteredProducts(products);
    }
  }, [data]);
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Layout menu={menu}>
      <div className="container px-4 mx-auto my-8 xl:px-0">
        {categoryName ? (
          <h3 className="mb-5 text-4xl font-black uppercase lg:text-8xl md:text-6xl">{categoryName}</h3>
        ) : (
          ""
        )}
        <ShopLayout
          categories={cat}
          pageInfo={pageInfo}
          setPageInfo={setPageInfo}
        >
          <div className="grid grid-cols-2 gap-4 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
            {!isLoading && filteredProducts.length
              ? filteredProducts.map((product) => (
                  <Product key={product?.id} product={product} />
                ))
              : [...Array(24).keys()].map((key) => (
                  <Product key={key} product={key} />
                ))}
          </div>{" "}
        </ShopLayout>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ params: { category }, locale }) {
  const apolloCli = locale === "fr" ? client : clientEng;
  const { data } = await apolloCli.query({
    query: PRODUCT_BY_CATEGORY_SLUG,
    variables: { slug: category },
  });
  const menu = (await getMenu(locale)) || [];

  return {
    props: {
      menu,
      categoryName: data?.productCategory?.name || "",
      pageInfoStatic: data?.productCategory?.products?.pageInfo,
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
            category: productCategory?.slug.toString(),
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
            category: productCategory?.slug.toString(),
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
