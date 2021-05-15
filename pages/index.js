import Layout from "../src/components/Layout";
import Product from "../src/components/Product";
import client, { clientEng } from "../src/components/ApolloClient";
import ParentCategoriesBlock from "../src/components/category/category-block/ParentCategoriesBlock";
import PRODUCTS_AND_CATEGORIES_QUERY from "../src/queries/product-and-categories";
import HeroCarousel from "../src/components/home/hero-carousel";
import LargeSlider from "../src/components/sections/LargeSlider";
import getMenu from "../src/get-menu-fallback";
import HomePageSection from "../src/components/home/HomePageSection";
import { GET_PAGE_BY_URI } from "../src/queries/get-pages";
import Head from "next/head";
import parse from "html-react-parser";

export default function Home(props) {
  const {
    products,
    productCategories,
    heroCarousel,
    bestSeller,
    menu,
    homepage,
    seoHead,
    data,
  } = props;
  const seoData = seoHead && parse(seoHead);
  return (
    <Layout menu={menu} translations={homepage?.translations}>
      <Head>{seoData ? seoData : ""}</Head>
      {/*Hero Carousel*/}
      <HeroCarousel heroCarousel={heroCarousel} />
      {/*Categories*/}
      <HomePageSection homepage={homepage} products={products} />
      <div className="container px-4 mx-auto my-8 md:my-32 product-categories-container xl:px-0">
        <h2 className="mb-5 text-xl uppercase main-title">
          <span className="main-title-inner">Categories</span>
        </h2>
        <ParentCategoriesBlock productCategories={productCategories} />
      </div>
      {/*SectionSlider*/}
      <LargeSlider products={bestSeller} />
      {/*Products*/}
      <div className="container px-4 mx-auto my-32 products xl:px-0">
        <h2 className="mb-5 text-xl uppercase products-main-title main-title">
          <span className="main-title-inner">Products</span>
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {products.length
            ? products.map((product) => (
                <Product key={product.id} product={product} />
              ))
            : ""}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  const apolloCli = locale === "fr" ? client : clientEng;
  const { data } = await apolloCli.query({
    query: PRODUCTS_AND_CATEGORIES_QUERY,
    variables: { first: 8, uri: "/", uriMenu: "/" },
    //locale !== "fr" ? 6 : 49
  });
  const homepage = await apolloCli.query({
    query: GET_PAGE_BY_URI,
    variables: { uri: "/" },
  });
  /*
   */
  const menu = (await getMenu(locale)) || [];

  return {
    props: {
      data,
      homepage: homepage.data.page,
      menu,
      productCategories: data?.productCategories?.nodes
        ? data.productCategories.nodes
        : [],
      products: data?.products?.nodes ? data.products.nodes : [],
      heroCarousel: data?.heroCarousel?.nodes ? data.heroCarousel.nodes : [],
      bestSeller: data?.bestSeller?.nodes ? data.bestSeller.nodes : [],
      seoHead: data?.seo?.seo?.fullHead || "",
    },
    revalidate: 1,
  };
}
