import Layout from "../src/components/Layout";
import Product from "../src/components/Product";
import client, { clientEng } from "../src/components/ApolloClient";
import ParentCategoriesBlock from "../src/components/category/category-block/ParentCategoriesBlock";
import PRODUCTS_AND_CATEGORIES_QUERY from "../src/queries/product-and-categories";
import HeroCarousel from "../src/components/home/hero-carousel";
import LargeSlider from "../src/components/sections/LargeSlider";

export default function Home(props) {
  const { products, productCategories, heroCarousel, bestSeller, menu } = props;
  console.log(menu);
  return (
    <Layout menu={menu}>
      {/*Hero Carousel*/}
      <HeroCarousel heroCarousel={heroCarousel} />
      {/*Categories*/}
      <div className="container px-4 mx-auto my-32 product-categories-container xl:px-0">
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
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
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
  });

  return {
    props: {
      menu: {
        collection: data?.megamenuCollection?.content,
        base: data.menu.nodes[0].menuItems.edges.map(({ node }) => node),
      },
      productCategories: data?.productCategories?.nodes
        ? data.productCategories.nodes
        : [],
      products: data?.products?.nodes ? data.products.nodes : [],
      heroCarousel: data?.heroCarousel?.nodes ? data.heroCarousel.nodes : [],
      bestSeller: data?.bestSeller?.nodes ? data.bestSeller.nodes : [],
    },
    revalidate: 1,
  };
}
