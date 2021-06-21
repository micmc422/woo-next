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
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";
import { Separator, ThemeH5 } from "../src/components/themeComponents";

export default function Home(props) {
  const [productsList, setProductsList] = useState("");
  const {
    products,
    productCategories,
    heroCarousel,
    bestSeller,
    menu,
    homepage,
    seoHead,
    seoSchema,
    footer,
    legal,
    coupons,
  } = props;
  // console.log(legal);
  const showProducts = () => {
    const liProd = [];
    products.map((p) => {
      liProd.push(<Product key={p.id} product={p} />);
    });
    setProductsList(liProd);
  };
  if (!productsList && products.length) {
    showProducts();
  }
  const seoData = seoHead && parse(seoHead);
  return (
    <Layout menu={menu} footer={footer} coupons={coupons} legal={legal}>
      <Head>{seoData ? seoData : ""}</Head>
      <script type="application/ld+json">{`${seoSchema}`}</script>
      {/*Hero Carousel*/}
      <HeroCarousel heroCarousel={heroCarousel} />
      {/*Categories*/}
      <HomePageSection homepage={homepage} products={products} />
      <Separator>Categories</Separator>
      <div className="container px-4 pt-8 mx-auto xl:px-0">
        <ParentCategoriesBlock productCategories={productCategories} />
      </div>
      {/*SectionSlider*/}
      <Separator>Populaires</Separator>
      <div className="pt-8" />
 <LargeSlider products={bestSeller} />
      {/*Products*/}

        <Separator>Products</Separator>
      <div className="container px-4 mx-auto my-8 products xl:px-0">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {productsList}
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
      legal: homepage.data?.legalmenu?.menuItems?.nodes || [],
      footer: homepage.data?.getFooter,
      coupons: homepage.data?.coupons.nodes,
      homepage: homepage.data.page,
      menu,
      productCategories: data?.productCategories?.nodes
        ? data.productCategories.nodes
        : [],
      products: data?.products?.nodes ? data.products.nodes : [],
      heroCarousel: data?.heroCarousel?.nodes ? data.heroCarousel.nodes : [],
      bestSeller: data?.bestSeller?.nodes ? data.bestSeller.nodes : [],
      seoHead: data?.seo?.seo?.fullHead || "",
      seoSchema: data?.seo?.seo?.schema?.raw || "",
      ...(await serverSideTranslations(locale, ["common", "shop"])),
    },
    revalidate: 86400,
  };
}
