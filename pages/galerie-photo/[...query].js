import Layout from "src/components/Layout";
import Product from "src/components/Product";
import client, { clientEng } from "src/components/ApolloClient";
import PRODUCTS_AND_CATEGORIES_QUERY from "src/queries/product-and-categories";
import HeroCarousel from "src/components/home/hero-carousel";
import ParentCategoriesBlock from "../../src/components/category/category-block/ParentCategoriesBlock";
import LargeSlider from "../../src/components/sections/LargeSlider";
import { PRODUCT_CATEGORIES_SLUGS } from "../../src/queries/product-by-category";
import { isEmpty } from "lodash";

export default function Home(props) {
  const { products, productCategories, heroCarousel, bestSeller } = props;
  console.log(heroCarousel);
  return (
    <Layout>
      {/*Hero Carousel*/}
      <HeroCarousel heroCarousel={heroCarousel} />
      {/*Products*/}
      <LargeSlider products={bestSeller} />
      <div className="container px-4 mx-auto my-32 products xl:px-0">
        <h2 className="mb-5 text-xl uppercase products-main-title main-title">
          <span className="main-title-inner">Products</span>
        </h2>
      </div>
      <div className="flex flex-row">
        <div className="flex-grow hidden lg:flex">test</div>
        <div className="container grid grid-cols-2 gap-4 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {products?.length
            ? products.map((product) => (
                <Product key={product.id} product={product} />
              ))
            : ""}
        </div>
        <div className="flex-grow hidden lg:flex">
          <div className="sticky top-0">test</div>
        </div>
      </div>
      {/*Categories*/}
      <div className="container px-4 mx-auto my-32 product-categories-container xl:px-0">
        <h2 className="mb-5 text-xl uppercase main-title">
          <span className="main-title-inner">Categories</span>
        </h2>
        <ParentCategoriesBlock productCategories={productCategories} />
      </div>
    </Layout>
  );
}

export async function getStaticProps({ params, locale }) {
  const apolloCli = locale === "fr" ? client : clientEng;
  const { data } = await apolloCli.query({
    query: PRODUCTS_AND_CATEGORIES_QUERY,
    variables: { search: params.query.toString().replace("-", " ") },
  });

  return {
    props: {
      productCategories: data?.productCategories?.nodes
        ? data.productCategories.nodes
        : [],
      products: data?.products?.nodes ? data.products.nodes : [],
      bestSeller: data?.bestSeller?.nodes ? data.bestSeller.nodes : [],
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
            query: [productCategory?.slug.toString()],
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
            query: [productCategory?.slug.toString()],
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
